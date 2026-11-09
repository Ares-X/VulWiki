"""Focused fixtures for the offline local-image byte audit."""
import importlib.util
import json
from pathlib import Path
import contextlib
import io
import hashlib
import tempfile
import unittest

ROOT = Path(__file__).parents[1]
SPEC = importlib.util.spec_from_file_location("resource_audit", ROOT / "scripts/resource-audit.py")
audit_tool = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(audit_tool)


class ResourceAuditTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.article_dir = self.root / "Web安全" / "测试"
        self.article_dir.mkdir(parents=True)
        self.resource_dir = self.article_dir / ".resource"
        self.resource_dir.mkdir()

    def article(self, body):
        (self.article_dir / "entry.md").write_text("---\ntitle: fixture\n---\n\n" + body, encoding="utf-8")

    def test_zero_and_html_have_failure_status(self):
        (self.resource_dir / "empty.png").write_bytes(b"")
        (self.resource_dir / "bad.jpg").write_text("<!doctype html><title>Error response</title><h1>404</h1>", encoding="utf-8")
        self.article("![empty](.resource/empty.png)\n\n![bad](.resource/bad.jpg)\n")
        result = audit_tool.audit(self.root)
        self.assertEqual({f["status"] for f in result["files"]}, {"zero_byte", "html_error_page"})
        self.assertEqual(result["counts"]["zero_byte"], 1)
        self.assertEqual(result["counts"]["html_error_page"], 1)

    def test_magic_recognition_and_duplicate_reference_mapping(self):
        png = b"\x89PNG\r\n\x1a\n" + b"fixture"
        (self.resource_dir / "pic.png").write_bytes(png)
        self.article("![one](.resource/pic.png) and ![two](.resource/pic.png)\n")
        result = audit_tool.audit(self.root)
        self.assertEqual(len(result["files"]), 1)
        item = result["files"][0]
        self.assertEqual(item["detected_format"], "PNG")
        self.assertEqual(item["sha256"], __import__("hashlib").sha256(png).hexdigest())
        self.assertEqual(item["reference_count"], 2)
        self.assertEqual(result["scope"]["image_reference_occurrences"], 2)

    def test_fenced_fake_image_is_not_collected(self):
        self.article("```markdown\n![fake](.resource/missing.png)\n```\n")
        result = audit_tool.audit(self.root)
        self.assertEqual(result["files"], [])
        self.assertEqual(result["counts"]["missing"], 0)

    def test_missing_local_image_is_reported(self):
        self.article("![missing](.resource/missing.png)\n")
        result = audit_tool.audit(self.root)
        self.assertEqual(result["files"][0]["status"], "missing")

    def test_offline_archive_rejects_remote_images_without_rewriting_source_urls(self):
        target = "https://images.example.invalid/raw.png?token=public-test-value&part=one"
        self.article('![remote](' + target + ')\n\n<img src="//images.example.invalid/other.png">\n')
        report = self.root / "report.json"
        with contextlib.redirect_stdout(io.StringIO()):
            code = audit_tool.main(["--root", str(self.root), "--report", str(report), "--require-local"])
        result = json.loads(report.read_text())
        self.assertEqual(code, 1)
        self.assertEqual(result["counts"]["remote_images"], 2)
        self.assertEqual(result["remote_images"][0]["target"], target)
        self.assertIn(target, (self.article_dir / "entry.md").read_text())

    def test_offline_archive_preserves_remote_sources_and_code_examples(self):
        target = "https://images.example.invalid/raw.png"
        self.article('[原文](' + target + ')\n\n`![example](' + target + ')`\n\n'
                     + '```markdown\n![example](' + target + ')\n```\n')
        report = self.root / "report.json"
        with contextlib.redirect_stdout(io.StringIO()):
            code = audit_tool.main(["--root", str(self.root), "--report", str(report), "--require-local"])
        self.assertEqual(code, 0)
        self.assertEqual(json.loads(report.read_text())["remote_images"], [])

    def test_responsive_image_candidates_cannot_load_remote_assets(self):
        self.article('<picture><source srcset="https://images.example.invalid/a.png 1x, '
                     '//images.example.invalid/b.png 2x"><img srcset="https://images.example.invalid/c.png 2x"></picture>\n'
                     '<video><source src="https://media.example.invalid/movie.webm"></video>\n')
        result = audit_tool.audit(self.root)
        self.assertEqual([row["target"] for row in result["remote_images"]], [
            'https://images.example.invalid/a.png', '//images.example.invalid/b.png',
            'https://images.example.invalid/c.png',
        ])

    def test_missing_local_srcset_candidates_fail_offline_gate(self):
        self.article('<picture><source srcset=".resource/missing-wide.png 800w">'
                     '<img srcset=".resource/missing.png 1x, .resource/missing2.png 2x"></picture>\n')
        article = self.article_dir / 'entry.md'
        original = article.read_bytes()
        report = self.root / 'report.json'
        with contextlib.redirect_stdout(io.StringIO()):
            code = audit_tool.main(['--root', str(self.root), '--report', str(report), '--require-local'])
        result = json.loads(report.read_text())
        self.assertEqual(code, 1)
        self.assertEqual(result['counts']['missing'], 3)
        self.assertEqual({ref['target'] for item in result['files'] for ref in item['references']}, {
            '.resource/missing-wide.png', '.resource/missing.png', '.resource/missing2.png',
        })
        self.assertEqual(article.read_bytes(), original)

    def test_local_srcset_candidates_are_inspected_with_full_reference_values(self):
        for name in ('small.png', 'wide,large.png', 'image #2.png'):
            (self.resource_dir / name).write_bytes(b'\x89PNG\r\n\x1a\nfixture')
        targets = ['.resource/small.png', '.resource/wide,large.png?size=wide,large&part=one',
                   '.resource/image%20%232.png']
        self.article('<picture><source srcset="' + targets[1] + ' 800w">'
                     '<img srcset="' + targets[0] + ' 1x,\n' + targets[2] + ' 2x"></picture>\n')
        report = self.root / 'report.json'
        with contextlib.redirect_stdout(io.StringIO()):
            code = audit_tool.main(['--root', str(self.root), '--report', str(report), '--require-local'])
        result = json.loads(report.read_text())
        self.assertEqual(code, 0)
        self.assertEqual(result['counts']['recognized_container'], 3)
        self.assertEqual({ref['target'] for item in result['files'] for ref in item['references']}, set(targets))
        self.assertEqual(result['scope']['image_reference_occurrences'], 3)

    def test_local_srcset_candidates_receive_normal_byte_checks(self):
        (self.resource_dir / 'empty.png').write_bytes(b'')
        (self.resource_dir / 'error.png').write_text('<!doctype html><title>Error</title>')
        self.article('<img srcset=".resource/empty.png 1x, .resource/error.png 2x">\n')
        report = self.root / 'report.json'
        with contextlib.redirect_stdout(io.StringIO()):
            code = audit_tool.main(['--root', str(self.root), '--report', str(report), '--require-local'])
        result = json.loads(report.read_text())
        self.assertEqual(code, 1)
        self.assertEqual(result['counts']['zero_byte'], 1)
        self.assertEqual(result['counts']['html_error_page'], 1)

    def test_srcset_remote_urls_keep_commas_and_complete_query_strings(self):
        targets = ['https://images.example.invalid/a,b.png?parts=one,two&token=public-test-value',
                   '//images.example.invalid/image.png?part=three,four']
        self.article('<img srcset="' + targets[0] + ' 1x, ' + targets[1] + ' 2x">\n')
        result = audit_tool.audit(self.root)
        self.assertEqual([row['target'] for row in result['remote_images']], targets)

    def test_srcset_data_url_does_not_create_a_fake_remote_candidate(self):
        embedded = 'data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22/%3E'
        (self.resource_dir / 'pic.png').write_bytes(b'\x89PNG\r\n\x1a\nfixture')
        self.article('<img srcset="' + embedded + ' 1x, .resource/pic.png 2x">\n')
        report = self.root / 'report.json'
        with contextlib.redirect_stdout(io.StringIO()):
            code = audit_tool.main(['--root', str(self.root), '--report', str(report), '--require-local'])
        result = json.loads(report.read_text())
        self.assertEqual(code, 0)
        self.assertEqual(result['remote_images'], [])
        self.assertEqual(result['counts']['recognized_container'], 1)

    def test_srcset_url_token_boundaries(self):
        cases = [
            (' \t,\n a.png, b.png 2x, ', ['a.png', 'b.png']),
            ('a.png,b.png 1x', ['a.png,b.png']),
            ('data:image/png;base64,AAAA 1x, b.png 2x', ['data:image/png;base64,AAAA', 'b.png']),
            ('a.png example(foo,bar), b.png 2x', ['a.png', 'b.png']),
            ('a.png example(foo,bar, b.png 2x', ['a.png']),
            ('a.png\f1x,\rb.png\t2x', ['a.png', 'b.png']),
            ('image\u00a0name.png 1x', ['image\u00a0name.png']),
            (', , \t', []),
        ]
        for value, expected in cases:
            with self.subTest(value=value):
                self.assertEqual(list(audit_tool.srcset_urls(value)), expected)

    def test_srcset_examples_and_nonpicture_sources_are_not_image_dependencies(self):
        self.article('`<img srcset=".resource/inline.png 1x">`\n\n'
                     '```html\n<img srcset=".resource/fenced.png 1x">\n```\n'
                     '<!-- <img srcset=".resource/comment.png 1x"> -->\n'
                     '<source srcset=".resource/outside-picture.png 1x">\n'
                     '<video><source srcset=".resource/video.png 1x"></video>\n')
        result = audit_tool.audit(self.root)
        self.assertEqual(result['files'], [])
        self.assertEqual(result['remote_images'], [])

    def test_srcset_without_candidates_is_not_a_browser_source(self):
        self.article('<img srcset=", , ">\n')
        report = self.root / 'report.json'
        with contextlib.redirect_stdout(io.StringIO()):
            code = audit_tool.main(['--root', str(self.root), '--report', str(report), '--require-local'])
        self.assertEqual(code, 1)
        self.assertEqual(json.loads(report.read_text())['counts']['unusable_image_tags'], 1)

    def test_offline_mode_requires_resolvable_repository_image_paths(self):
        self.article('![site](/assets/image.png)\n')
        report = self.root / "report.json"
        with contextlib.redirect_stdout(io.StringIO()):
            code = audit_tool.main(["--root", str(self.root), "--report", str(report), "--require-local"])
        self.assertEqual(code, 1)
        self.assertEqual(json.loads(report.read_text())["counts"]["missing"], 0)

    def test_wechat_lazy_reference_is_checked_and_needs_a_browser_source(self):
        target = 'https://images.example.invalid/lazy.png?original=full'
        self.article('<img data-src="' + target + '">\n'
                     '`<img data-src="' + target + '">`\n'
                     '```html\n<img data-src="' + target + '">\n```\n')
        result = audit_tool.audit(self.root)
        self.assertEqual([row['target'] for row in result['remote_images']], [target])
        self.assertEqual(result['counts']['unusable_image_tags'], 1)
        (self.resource_dir / 'pic.png').write_bytes(b'\x89PNG\r\n\x1a\nfixture')
        self.article('<img src=".resource/pic.png" data-src=".resource/pic.png">\n')
        result = audit_tool.audit(self.root)
        self.assertEqual(result['counts']['remote_images'], 0)
        self.assertEqual(result['counts']['unusable_image_tags'], 0)

    def test_empty_html_image_cannot_pass_offline_gate(self):
        self.article('<img>\n<img src="">\n<!-- <img> -->\n`<img>`\n')
        report = self.root / 'report.json'
        with contextlib.redirect_stdout(io.StringIO()):
            code = audit_tool.main(['--root', str(self.root), '--report', str(report), '--require-local'])
        self.assertEqual(code, 1)
        self.assertEqual(json.loads(report.read_text())['counts']['unusable_image_tags'], 2)

    def test_local_thumbnail_cannot_hide_remote_full_image_link(self):
        (self.resource_dir / "pic.png").write_bytes(b"\x89PNG\r\n\x1a\nfixture")
        self.article('[![preview](.resource/pic.png)](https://images.example.invalid/full.png)\n'
                     '[![author](.resource/pic.png)](https://author.example.invalid/article.html)\n'
                     '[source](https://images.example.invalid/source.png)\n')
        result = audit_tool.audit(self.root)
        self.assertEqual([row["target"] for row in result["remote_images"]], [
            'https://images.example.invalid/full.png',
        ])

    def test_html_code_markdown_example_is_literal_but_html_img_still_loads(self):
        self.article('<table><tr><td><code>![a](/uploads/example/../../etc/passwd)</code></td></tr></table>\n'
                     '<pre><code>![example](https://images.example.invalid/literal.png)</code></pre>\n'
                     '<pre><code><img src="https://images.example.invalid/active.png"></code></pre>\n')
        result = audit_tool.audit(self.root)
        self.assertEqual(result["reference_review"], [])
        self.assertEqual([row["target"] for row in result["remote_images"]], [
            'https://images.example.invalid/active.png',
        ])

    def test_identical_opaque_original_link_is_an_image_resource(self):
        target = 'https://images.example.invalid/open?id=42'
        self.article('[![image](' + target + ')](' + target + ')\n')
        result = audit_tool.audit(self.root)
        self.assertEqual([row["target"] for row in result["remote_images"]], [target, target])

    def test_local_svg_cannot_load_external_image_or_css(self):
        for source in ['<svg><image href="https://images.example.invalid/remote.png"/></svg>',
                       '<svg><style>.pic {fill:url(//images.example.invalid/remote.png)}</style></svg>']:
            with self.subTest(source=source):
                (self.resource_dir / 'local.svg').write_text(source)
                self.article('![svg](.resource/local.svg)\n')
                report = self.root / 'report.json'
                with contextlib.redirect_stdout(io.StringIO()):
                    code = audit_tool.main(['--root', str(self.root), '--report', str(report), '--require-local'])
                self.assertEqual(code, 1)
                self.assertEqual(json.loads(report.read_text())['counts']['external_image_dependencies'], 1)

    def test_svg_namespace_and_embedded_image_are_offline(self):
        (self.resource_dir / 'local.svg').write_text(
            '<svg xmlns="http://www.w3.org/2000/svg"><image href="data:image/png;base64,fixture"/></svg>')
        self.article('![svg](.resource/local.svg)\n')
        report = self.root / 'report.json'
        with contextlib.redirect_stdout(io.StringIO()):
            code = audit_tool.main(['--root', str(self.root), '--report', str(report), '--require-local'])
        self.assertEqual(code, 0)
        self.assertEqual(json.loads(report.read_text())['counts']['external_image_dependencies'], 0)

    def test_svg_presentation_attributes_cannot_load_external_resources(self):
        attributes = ('fill', 'stroke', 'filter', 'clip-path', 'mask', 'marker',
                      'marker-start', 'marker-mid', 'marker-end', 'cursor')
        values = ('url(https://images.example.invalid/defs.svg#paint)',
                  "URL( '//images.example.invalid/defs.svg#paint' )",
                  'url(&quot;https://images.example.invalid/defs.svg?part=one&amp;mode=two#paint&quot;)')
        report = self.root / 'report.json'
        for attribute in attributes:
            for value in values:
                with self.subTest(attribute=attribute, value=value):
                    source = ('<svg xmlns="http://www.w3.org/2000/svg"><rect '
                              + attribute + '="' + value + '"/></svg>').encode()
                    resource = self.resource_dir / 'local.svg'
                    resource.write_bytes(source)
                    self.article('![svg](.resource/local.svg)\n')
                    with contextlib.redirect_stdout(io.StringIO()):
                        code = audit_tool.main(['--root', str(self.root), '--report',
                                                str(report), '--require-local'])
                    result = json.loads(report.read_text())
                    self.assertEqual(code, 1)
                    self.assertEqual(result['counts']['external_image_dependencies'], 1)
                    self.assertEqual(resource.read_bytes(), source)
                    self.assertEqual(result['files'][0]['sha256'], hashlib.sha256(source).hexdigest())

    def test_svg_definition_and_path_references_are_resource_dependencies(self):
        elements = ('linearGradient', 'radialGradient', 'pattern', 'textPath', 'mpath')
        for element in elements:
            for attribute in ('href', 'xlink:href'):
                with self.subTest(element=element, attribute=attribute):
                    source = ('<svg xmlns="http://www.w3.org/2000/svg" '
                              'xmlns:xlink="http://www.w3.org/1999/xlink"><' + element + ' '
                              + attribute + '="https://images.example.invalid/defs.svg#example"/></svg>')
                    (self.resource_dir / 'local.svg').write_text(source)
                    self.article('![svg](.resource/local.svg)\n')
                    result = audit_tool.audit(self.root)
                    self.assertEqual(result['counts']['external_image_dependencies'], 1)

    def test_svg_fragment_paint_and_definition_references_stay_offline(self):
        (self.resource_dir / 'local.svg').write_text(
            '<svg xmlns="http://www.w3.org/2000/svg">'
            '<defs><linearGradient id="paint"/><linearGradient href="#paint"/>'
            '<radialGradient href="#paint"/><pattern href="#pattern"/></defs>'
            '<rect fill="url(#paint)" stroke="url(\'#paint\')" filter="url(#filter)" '
            'clip-path="url(#clip)" mask="url(#mask)" marker-start="url(#marker)"/>'
            '<textPath href="#path"/><mpath href="#motion"/>'
            '<image href="data:image/png;base64,fixture"/></svg>')
        self.article('![svg](.resource/local.svg)\n')
        report = self.root / 'report.json'
        with contextlib.redirect_stdout(io.StringIO()):
            code = audit_tool.main(['--root', str(self.root), '--report', str(report), '--require-local'])
        self.assertEqual(code, 0)
        self.assertEqual(json.loads(report.read_text())['counts']['external_image_dependencies'], 0)

    def test_svg_descriptive_attributes_are_not_resource_dependencies(self):
        (self.resource_dir / 'local.svg').write_text(
            '<svg xmlns="http://www.w3.org/2000/svg">'
            '<!-- <rect fill="url(https://images.example.invalid/comment.svg#paint)"/> -->'
            '<rect data-example="url(https://images.example.invalid/example.svg#paint)" '
            'aria-label="url(https://images.example.invalid/label.svg#paint)"/>'
            '<a href="https://author.example.invalid/article"><text>source</text></a></svg>')
        self.article('![svg](.resource/local.svg)\n')
        result = audit_tool.audit(self.root)
        self.assertEqual(result['counts']['external_image_dependencies'], 0)

    def test_svg_source_anchor_and_url_example_text_are_not_loaded_images(self):
        (self.resource_dir / 'local.svg').write_text(
            '<svg><text>fill:url(https://images.example.invalid/example.png)</text>'
            '<a href="https://author.example.invalid/article"><text>source</text></a></svg>')
        self.article('![svg](.resource/local.svg)\n')
        report = self.root / 'report.json'
        with contextlib.redirect_stdout(io.StringIO()):
            code = audit_tool.main(['--root', str(self.root), '--report', str(report), '--require-local'])
        self.assertEqual(code, 0)
        self.assertEqual(json.loads(report.read_text())['counts']['external_image_dependencies'], 0)

    def test_nonfatal_format_review_and_full_html_text_in_report(self):
        png = b"\x89PNG\r\n\x1a\nfull-signature-fixture"
        unknown = b"\x00opaque non-image signature fixture"
        (self.resource_dir / "actual-png.jpg").write_bytes(png)
        (self.resource_dir / "unknown.bin").write_bytes(unknown)
        self.article("![png](.resource/actual-png.jpg) ![unknown](.resource/unknown.bin)\n")
        report = self.root / "report.json"
        with contextlib.redirect_stdout(io.StringIO()):
            code = audit_tool.main(["--root", str(self.root), "--report", str(report)])
        payload = json.loads(report.read_text(encoding="utf-8"))
        png_item, unknown_item = payload["files"]
        self.assertEqual(code, 0)
        self.assertEqual(png_item["detected_format"], "PNG")
        self.assertTrue(png_item["extension_mismatch"])
        self.assertEqual(png_item["sha256"], hashlib.sha256(png).hexdigest())
        self.assertEqual(unknown_item["status"], "unknown")
        self.assertEqual(unknown_item["sha256"], hashlib.sha256(unknown).hexdigest())

        long_url = "https://example.invalid/" + "path-segment/" * 50 + "tail-value"
        html = "<!doctype html><html><body>" + ("x" * 600) + long_url + "</body></html>"
        (self.resource_dir / "error.png").write_text(html, encoding="utf-8")
        self.article("![error](.resource/error.png)\n")
        result = audit_tool.audit(self.root)
        html_item = result["files"][0]
        self.assertEqual(html_item["status"], "html_error_page")
        self.assertEqual(html_item["text"], html)
        self.assertIn(long_url, html_item["text"])

    def test_site_and_outside_images_are_reviewed_without_becoming_missing(self):
        self.article("![site](/assets/image.png) ![outside](../../../outside.png)\n")
        result = audit_tool.audit(self.root)
        self.assertEqual(result["counts"]["missing"], 0)
        self.assertEqual([row["reason"] for row in result["reference_review"]], [
            "site_root_relative_image_requires_site_context",
            "relative_image_resolves_outside_repository",
        ])
        self.assertEqual([row["target"] for row in result["reference_review"]], [
            "/assets/image.png", "../../../outside.png",
        ])

    def test_nonexistent_root_is_a_cli_error(self):
        missing = self.root / "does-not-exist"
        with contextlib.redirect_stderr(io.StringIO()), self.assertRaises(SystemExit) as raised:
            audit_tool.main(["--root", str(missing), "--report", str(self.root / "report.json")])
        self.assertEqual(raised.exception.code, 2)


if __name__ == "__main__":
    unittest.main()
