"""Offline regression fixtures; never executes article payloads or contacts hosts."""
import contextlib
import importlib.util
import io
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

SPEC = importlib.util.spec_from_file_location('wiki', Path(__file__).parents[1] / 'scripts/wiki.py')
wiki = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = wiki
SPEC.loader.exec_module(wiki)


class WikiTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        subprocess.run(['git', 'init', '-q', str(self.root)], check=True)

    def article(self, name='entry', body='# Example\n\nArticle text.\n', **fields):
        meta = dict(id='article-' + name, product='Example Product', record_type='analysis',
                    review_status='text-reviewed', verification_status='not-reproduced',
                    content_status='needs-review', source_url='https://example.invalid/advisory')
        meta.update(fields)
        path = self.root / 'Web安全' / '测试' / 'Example Product' / (name + '.md')
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text('---\n' + ''.join(k + ': ' + json.dumps(v, ensure_ascii=False) + '\n' for k, v in meta.items()) + '---\n\n' + body, encoding='utf-8')
        return path.relative_to(self.root).as_posix()

    def scan(self):
        return wiki.scan(self.root)

    def run_cli(self, *args):
        out, err = io.StringIO(), io.StringIO()
        with contextlib.redirect_stdout(out), contextlib.redirect_stderr(err):
            code = wiki.main(['--root', str(self.root), *args])
        return code, out.getvalue(), err.getvalue()

    def test_body_mentions_never_become_primary(self):
        self.article(body='推荐阅读 CVE-2025-12345, CVE-2024-9999.\n')
        r = self.scan()[0]
        self.assertEqual(r.primary, [])
        self.assertNotIn('2025 年', wiki.render_outputs([r])['INDEX-CVE.md'])

    def test_legacy_cve_is_candidate(self):
        self.article(cve='CVE-2025-12345')
        r = self.scan()[0]
        self.assertEqual(r.primary, [])
        self.assertEqual(r.candidates, ['CVE-2025-12345'])

    def test_explicit_legacy_reference(self):
        self.article(cve='CVE-2025-12345', identifier_role='reference')
        r = self.scan()[0]
        self.assertEqual(r.candidates, [])
        self.assertEqual(r.references, ['CVE-2025-12345'])

    def test_explicit_legacy_primary(self):
        self.article(cve='CVE-2025-12345', identifier_role='primary')
        self.assertEqual(self.scan()[0].primary, ['CVE-2025-12345'])

    def test_primary_and_references_separated(self):
        self.article(primary_identifiers='CVE-2025-12345; CNVD-2025-12345', referenced_identifiers='CVE-2020-5555')
        r = self.scan()[0]
        self.assertEqual(len(r.primary), 2)
        self.assertEqual(r.references, ['CVE-2020-5555'])
        self.assertNotIn('2020.md', wiki.render_outputs([r])['INDEX-CVE.md'])

    def test_explicit_candidates_project_without_becoming_primary(self):
        self.article(primary_identifiers='CVE-2025-26319', cve='CVE-2025-26319',
                     identifier_role='primary', identifier_candidates='CVE-2024-26319; CVE-2024-26319')
        record = self.scan()[0]
        projected = wiki.catalog_record(record)
        self.assertEqual(projected['primary_identifiers'], ['CVE-2025-26319'])
        self.assertEqual(projected['identifier_candidates'], ['CVE-2024-26319'])
        self.assertNotIn('2024.md', wiki.render_outputs([record])['INDEX-CVE.md'])
        self.assertFalse(any(i.code == 'identifier_role_unknown' for i in record.issues))

    def test_explicit_invalid_candidate_excluded_with_error(self):
        self.article(identifier_candidates='CVE-2024-12; CVE-2024-26319')
        record = self.scan()[0]
        self.assertEqual(record.candidates, ['CVE-2024-26319'])
        self.assertTrue(any(i.code == 'identifier_format' and i.severity == 'error' for i in record.issues))

    def test_explicit_nonprimary_roles_override_legacy_primary_fallback(self):
        for field, role in [('identifier_candidates', 'candidate'), ('referenced_identifiers', 'reference')]:
            path = self.article(role, cve='CVE-2025-12345', identifier_role='primary',
                                primary_identifiers='', **{field: 'CVE-2025-12345'})
            record = next(r for r in self.scan() if r.path == path)
            self.assertEqual(record.primary, [])
            self.assertEqual(wiki.catalog_record(record)[field], ['CVE-2025-12345'])
            self.assertNotIn('2025.md', wiki.render_outputs([record])['INDEX-CVE.md'])

    def test_explicit_candidate_resolves_legacy_unknown_role(self):
        self.article(cve='CVE-2025-12345', identifier_role='unknown',
                     identifier_candidates='CVE-2025-12345')
        record = self.scan()[0]
        self.assertEqual(record.primary, [])
        self.assertEqual(record.candidates, ['CVE-2025-12345'])
        self.assertFalse(any(i.code == 'identifier_role_unknown' for i in record.issues))

    def test_namespaces_and_case_not_conflated(self):
        self.article(primary_identifiers='cve-2025-12345; CNVD-C-2023-76801; TALOS-2024-1967; WSO2-2019-0598; AVD-2026-1850319')
        r = self.scan()[0]
        self.assertIn('CVE-2025-12345', r.primary)
        self.assertIn('CNVD-C-2023-76801', r.primary)
        self.assertIn('TALOS-2024-1967', r.primary)
        self.assertEqual(sum(i.code == 'unrecognized_identifier_namespace' for i in r.issues), 3)
        self.assertFalse(any(i.code == 'identifier_format' for i in r.issues))

    def test_wrong_namespace_and_malformed_primary_excluded(self):
        self.article(cve='CNVD-2025-12345', primary_identifiers='CVE-2025-12; CVE-2025-12345')
        r = self.scan()[0]
        self.assertEqual(r.primary, ['CVE-2025-12345'])
        self.assertEqual(sum(i.code == 'identifier_format' for i in r.issues), 2)

    def test_legacy_primary_validated_in_its_declared_namespace(self):
        self.article(identifier_role='primary', cve='CNVD-2025-12345',
                     cnvd='CNVD-2025-67890')
        record = self.scan()[0]
        self.assertEqual(record.primary, ['CNVD-2025-67890'])
        self.assertTrue(any(i.code == 'identifier_format' for i in record.issues))
        self.assertNotIn('CNVD-2025-12345', wiki.catalog_record(record)['primary_identifiers'])

    def test_rejected_identifier_not_indexed(self):
        self.article(primary_identifiers='CVE-2025-12345', identifier_status='rejected')
        r = self.scan()[0]
        self.assertEqual(wiki.catalog_record(r)['primary_identifiers'], [])
        self.assertNotIn('2025.md', wiki.render_outputs([r])['INDEX-CVE.md'])

    def test_quarantined_document_kept_only_in_queue(self):
        path = self.article(content_status='quarantined', primary_identifiers='CVE-2025-12345')
        outputs = wiki.render_outputs(self.scan())
        self.assertEqual(outputs['docs/generated/records.jsonl'], '')
        self.assertIn(path, outputs['docs/generated/excluded.jsonl'])
        self.assertIn('entry', outputs['docs/REVIEW-QUEUE.md'])

    def test_confirmed_index_category_changes_navigation_without_moving_article(self):
        body = '# Analysis\n\n![source](.resource/source.png)\n'
        path = self.article(body=body, index_category='系统安全/Linux',
                            category_recommendation='IOT安全/其他设备')
        resources = (self.root / path).parent / '.resource'
        resources.mkdir()
        (resources / 'source.png').write_bytes(b'fixture')
        records = self.scan()
        self.assertTrue(records[0].eligible)
        outputs = wiki.render_outputs(records)
        self.assertIn('Example Product', outputs['INDEX/Linux.md'])
        self.assertNotIn('INDEX/测试.md', outputs)
        self.assertNotIn('INDEX/其他设备.md', outputs)
        source = json.loads(outputs['docs/generated/sources.jsonl'])
        entry = json.loads(outputs['docs/generated/records.jsonl'])
        self.assertEqual(source['path'], path)
        self.assertEqual(entry['path'], path)
        self.assertEqual(source['index_category'], '系统安全/Linux')
        self.assertEqual(entry['index_category'], '系统安全/Linux')
        self.assertEqual(wiki.parse_frontmatter((self.root / path).read_text())[1], '\n' + body)

    def test_category_recommendation_does_not_implicitly_change_navigation(self):
        self.article(category_recommendation='系统安全/Linux')
        outputs = wiki.render_outputs(self.scan())
        self.assertIn('INDEX/测试.md', outputs)
        self.assertNotIn('INDEX/Linux.md', outputs)

    def test_root_article_keeps_existing_navigation_category(self):
        path = self.article()
        destination = self.root / '系统安全' / 'entry.md'
        destination.parent.mkdir()
        (self.root / path).rename(destination)
        outputs = wiki.render_outputs(self.scan())
        self.assertIn('INDEX/系统安全.md', outputs)
        self.assertNotIn('INDEX/entry.md.md', outputs)

    def test_invalid_confirmed_index_category_blocks_projection(self):
        for number, category in enumerate(['', 'Linux', '外部/Linux', '系统安全/../Linux',
                                           '系统安全/..', '系统安全/Linux/extra', '系统安全\\Linux',
                                           '系统安全/ Linux', '系统安全/Linux ']):
            self.article(str(number), index_category=category)
        for record in self.scan():
            self.assertFalse(record.eligible)
            self.assertTrue(any(issue.code == 'index_category' for issue in record.issues))

    def test_missing_verification_never_defaults_to_reproduced(self):
        path = self.article()
        (self.root / path).write_text('---\nproduct: Example\n---\n# Title\n')
        self.assertEqual(wiki.catalog_record(self.scan()[0])['verification_status'], 'not-reproduced')

    def test_reproduced_requires_evidence(self):
        self.article(verification_status='reproduced')
        r = self.scan()[0]
        self.assertFalse(r.eligible)
        self.assertEqual(sum(i.code == 'verification_evidence' for i in r.issues), 3)

    def test_invalid_enum_blocks(self):
        self.article(record_type='exploitable')
        self.assertFalse(self.scan()[0].eligible)

    def test_duplicate_stable_id_blocks(self):
        self.article('one', id='same-article')
        self.article('two', id='same-article')
        self.assertTrue(all(not r.eligible for r in self.scan()))

    def test_scalar_frontmatter_preserves_body(self):
        body = "\n```python\nprint('x\\ny')\n```\n"
        text = "---\nfoo: \"a: b\"\nbar: 'it''s OK'\n---\n" + body
        meta, actual, errors = wiki.parse_frontmatter(text)
        self.assertEqual(meta, {'foo': 'a: b', 'bar': "it's OK"})
        self.assertEqual(actual, body)
        self.assertEqual(errors, [])

    def test_yaml_scalar_syntax_cannot_pass_as_a_different_string(self):
        for value in ("'foo'bar'", 'bad: scalar', '*undefined_anchor',
                      '&anchor value', 'title # silently omitted by YAML'):
            meta, body, errors = wiki.parse_frontmatter('---\ntitle: ' + value + '\n---\nBody')
            self.assertNotIn('title', meta, value)
            self.assertEqual(errors[0][0], 'field_type', value)
            self.assertEqual(body, 'Body')
        meta, _, errors = wiki.parse_frontmatter('---\nsource_url: https://example.invalid/a#heading\n---\nBody')
        self.assertEqual(errors, [])
        self.assertEqual(meta['source_url'], 'https://example.invalid/a#heading')

    def test_collections_numbers_and_duplicate_keys_rejected(self):
        meta, _, errors = wiki.parse_frontmatter('---\nx: false\ny: [a,b]\nz: 10\na: "ok"\na: "second"\n---\nbody')
        self.assertEqual(len(errors), 4)
        self.assertEqual(meta, {'a': 'ok'})

    def test_fingerprint_conservative_grammar(self):
        for query in ['body="Example"', '(app="Example" || title="Portal") && port=443', 'icon_hash="-123"', '!(country="CN")']:
            self.assertTrue(wiki.fingerprint_valid(query), query)
        for query in ['body=', '搜索语句', 'body=""', 'body="x" &&', 'title="broken', '(app="x"', 'body="x" unexpected', 'body="x"; curl bad']:
            self.assertFalse(wiki.fingerprint_valid(query), query)

    def test_platforms_separated_and_bad_query_omitted(self):
        self.article(fofa='body=', hunter='web.title="Example"')
        r = self.scan()[0]
        self.assertNotIn('fofa', r.fingerprints)
        self.assertIn('hunter', r.fingerprints)

    def test_local_encoded_image_and_spaced_link(self):
        path = self.article(body='![a](.resource/image%20%281%29.png)\n[other](<other file.md>)\n')
        parent = (self.root / path).parent
        (parent / '.resource').mkdir()
        (parent / '.resource/image (1).png').write_bytes(b'fixture')
        (parent / 'other file.md').write_text('text')
        r = next(r for r in self.scan() if r.path == path)
        self.assertFalse(any(i.code in {'image_missing', 'link_missing'} for i in r.issues))

    def test_encoded_fragment_and_query_characters_are_filename_parts(self):
        path = self.article(body='![hash](.resource/a%23b.png)\n![query](.resource/a%3Fb.png)\n')
        resources = (self.root / path).parent / '.resource'
        resources.mkdir()
        for name in ('a#b.png', 'a?b.png'):
            (resources / name).write_bytes(b'fixture')
        self.assertFalse(any(i.code == 'image_missing' for i in self.scan()[0].issues))
        self.assertEqual(wiki.local_target(path, '.resource/a%23b.png#anchor'),
                         str(Path(path).parent / '.resource/a#b.png'))
        self.assertEqual(wiki.local_target('Web安全/a.md', '%2e%2e/%2e%2e/outside.md'), '!outside')

    def test_fenced_payload_links_ignored(self):
        self.article(body='```html\n<img src="missing.png">\n![fake](missing.png)\n```\n')
        self.assertFalse(any(i.code.endswith('missing') for i in self.scan()[0].issues))

    def test_reference_and_html_images(self):
        links = wiki.markdown_links('![a][pic]\n[pic]: .resource/a.png\n<img src=".resource/b.png">\n')
        self.assertIn(('.resource/a.png', True), links)
        self.assertIn(('.resource/b.png', True), links)

    def test_nested_image_description_checks_outer_destination(self):
        raw = '![[转存失败(img-public-1586504452408)(./images/0.png)]](附件/CVE-2020-10560.png)'
        self.article(body=raw + '\n')
        self.assertEqual(wiki.markdown_links(raw), [('附件/CVE-2020-10560.png', True)])
        missing = [i for i in self.scan()[0].issues if i.code == 'image_missing']
        self.assertEqual(len(missing), 1)
        self.assertTrue(missing[0].detail.endswith('附件/CVE-2020-10560.png'))
        self.assertGreater(missing[0].line, 1)

    def test_balanced_labels_preserve_nested_image_and_reference(self):
        prose = '[![preview](image.png)](article.md)\n![a [b]][pic]\n[pic]: .resource/a.png\n'
        self.assertEqual(wiki.markdown_links(prose), [
            ('image.png', True), ('article.md', False), ('.resource/a.png', True)])
        self.assertEqual(wiki.markdown_links(r'![a \[b\]](image%20(1).png)'),
                         [('image%20(1).png', True)])

    def test_nested_copy_control_active_link_remains_detectable(self):
        raw = '[![](https://example.invalid/copycode.gif)](javascript:void(0); "复制代码")'
        self.article(body=raw + '\n')
        issues = [i for i in self.scan()[0].issues if i.code == 'active_html_example']
        self.assertEqual(len(issues), 1)
        self.assertEqual(wiki.markdown_links(raw), [
            ('https://example.invalid/copycode.gif', True), ('javascript:void(0);', False)])

    def test_escaped_opening_brackets_are_literal_not_active_links(self):
        raw = r'\[example](javascript:alert(1)) !\[image](missing.png)'
        self.assertEqual(wiki.markdown_links(raw), [])
        self.article(body=raw + '\n')
        self.assertFalse(any(i.code in {'active_html_example', 'image_missing'}
                             for i in self.scan()[0].issues))
        self.assertEqual(wiki.markdown_links(r'\![a](article.md)'), [('article.md', False)])

    def test_soft_line_break_wrapped_image_checks_outer_link(self):
        raw = '[\n![preview](image.png)\n](javascript:void(0))'
        self.assertEqual(wiki.markdown_links(raw, with_lines=True), [
            ('image.png', True, 2), ('javascript:void(0)', False, 1)])
        self.assertEqual(wiki.markdown_links('[example\n\ntext](article.md)'), [])
        self.assertEqual(wiki.markdown_links('[example\r\n\r\ntext](javascript:alert(1))'), [])
        self.article(body=raw + '\n')
        self.assertEqual(sum(i.code == 'active_html_example' for i in self.scan()[0].issues), 1)

    def test_sparse_git_image_but_not_deleted_regular_file(self):
        path = self.article(body='![a](.resource/a.png)\n![b](.resource/b.png)\n')
        parent = (self.root / path).parent / '.resource'
        parent.mkdir()
        for name in ('a.png', 'b.png'):
            (parent / name).write_bytes(b'fixture')
        subprocess.run(['git', 'add', '.'], cwd=self.root, check=True)
        subprocess.run(['git', '-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-qm', 'fixture'], cwd=self.root, check=True)
        subprocess.run(['git', 'update-index', '--skip-worktree', '--', (parent / 'a.png').relative_to(self.root).as_posix()], cwd=self.root, check=True)
        (parent / 'a.png').unlink()
        (parent / 'b.png').unlink()
        issues = [i for i in self.scan()[0].issues if i.code == 'image_missing']
        self.assertEqual(len(issues), 1)
        self.assertTrue(issues[0].detail.endswith('b.png'))

    def test_missing_image_reports_position(self):
        self.article(body='![a](.resource/missing.png)\n')
        issues = [i for i in self.scan()[0].issues if i.code == 'image_missing']
        self.assertEqual(len(issues), 1)
        self.assertGreater(issues[0].line, 1)

    def test_canonical_self_and_retained_duplicate(self):
        main = 'Web安全/测试/Example Product/main.md'
        self.article('main', canonical=main, entity_id='entity-example')
        duplicate = self.article('source', canonical=main, relation_type='duplicate_of', entity_id='entity-example')
        outputs = wiki.render_outputs(self.scan())
        self.assertEqual(len(outputs['docs/generated/records.jsonl'].splitlines()), 1)
        self.assertEqual(len(outputs['docs/generated/sources.jsonl'].splitlines()), 2)
        self.assertIn('关联来源', outputs['INDEX/测试.md'])
        self.assertEqual(json.loads(outputs['docs/generated/entities.jsonl'])['source_record_ids'], ['article-main', 'article-source'])
        self.assertTrue((self.root / duplicate).exists())

    def test_canonical_cycle_rejected(self):
        one, two = 'Web安全/测试/Example Product/one.md', 'Web安全/测试/Example Product/two.md'
        self.article('one', canonical=two, relation_type='duplicate_of')
        self.article('two', canonical=one, relation_type='duplicate_of')
        self.assertTrue(all(not r.eligible for r in self.scan()))

    def test_other_relations_keep_independent_cves(self):
        main = self.article('main', primary_identifiers='CVE-2025-12345')
        for n, relation in enumerate(('analysis_of', 'chained_with', 'patch_bypass_of', 'supersedes')):
            self.article('related' + str(n), canonical=main, relation_type=relation, primary_identifiers='CVE-2025-6789' + str(n))
        outputs = wiki.render_outputs(self.scan())
        self.assertEqual(len(outputs['docs/generated/records.jsonl'].splitlines()), 5)
        self.assertIn('CVE-2025-67892', outputs['INDEX-CVE/year/2025.md'])

    def test_default_search_labels_legacy_candidate(self):
        self.article(cve='CVE-2025-12345')
        wiki.build(self.root, self.scan())
        code, out, _ = self.run_cli('search', 'CVE-2025-12345')
        self.assertEqual(code, 0)
        self.assertEqual(json.loads(out)['identifier_matches'][0]['role'], 'candidate-non-primary')

    def test_shared_cve_does_not_merge_or_create_entity(self):
        self.article('one', primary_identifiers='CVE-2025-12345')
        self.article('two', primary_identifiers='CVE-2025-12345')
        outputs = wiki.render_outputs(self.scan())
        self.assertEqual(len(outputs['docs/generated/records.jsonl'].splitlines()), 2)
        self.assertEqual(outputs['docs/generated/entities.jsonl'], '')
        self.assertTrue(any(x['basis'] == 'shared-primary-identifier' for x in json.loads(outputs['docs/generated/duplicate-candidates.json'])))

    def test_build_determinism_and_source_immutability(self):
        path = self.article(body="```sh\nprintf 'keep exact\\n'\n```\n")
        before = (self.root / path).read_bytes()
        records = self.scan()
        self.assertTrue(wiki.build(self.root, records))
        self.assertEqual(wiki.build(self.root, records, check=True), [])
        self.assertEqual(wiki.build(self.root, records), [])
        self.assertEqual((self.root / path).read_bytes(), before)

    def test_stale_index_keeps_url_without_stale_identifier(self):
        file = self.root / 'INDEX-CVE/year/1999.md'
        file.parent.mkdir(parents=True)
        file.write_text('# stale CVE-1999-9999\n')
        wiki.build(self.root, [])
        self.assertTrue(file.exists())
        self.assertNotIn('CVE-1999-9999', file.read_text())
        self.assertEqual(wiki.build(self.root, [], check=True), [])

    def test_baseline_delta_counts_new_and_resolved(self):
        old = wiki.Issue('a.md', 'test', 'same', line=1)
        moved = wiki.Issue('a.md', 'test', 'same', line=100)
        new = wiki.Issue('b.md', 'test', 'new')
        file = self.root / 'baseline.json'
        wiki.write_baseline(file, [old], 'fixture')
        baseline = json.loads(file.read_text())
        added, resolved = wiki.baseline_delta([moved, new], baseline)
        self.assertEqual(sum(added.values()), 1)
        self.assertEqual(sum(resolved.values()), 0)
        _, resolved = wiki.baseline_delta([], baseline)
        self.assertEqual(sum(resolved.values()), 1)

    def test_active_html_candidate_and_payload_preservation(self):
        payload = '<img src=x onerror="alert(1)"><a href="javascript:alert(2)">test</a>'
        path = self.article(body=payload + '\n')
        before = (self.root / path).read_text()
        r = self.scan()[0]
        self.assertEqual(sum(i.code == 'active_html_example' for i in r.issues), 2)
        self.assertTrue(all(i.line > 1 for i in r.issues if i.code == 'active_html_example'))
        self.assertEqual((self.root / path).read_text(), before)
        for body in ('```html\n' + payload + '\n```\n', '`' + payload + '`\n'):
            self.article(body=body)
            self.assertFalse(any(i.code == 'active_html_example' for i in self.scan()[0].issues))

    def test_raw_pre_and_code_do_not_make_nested_html_inert(self):
        for tag in ('pre', 'code'):
            self.article(body=f'<{tag}><img src=x onerror="alert(1)"></{tag}>\n')
            self.assertFalse(self.scan()[0].eligible)
        self.article(body='<pre>&lt;img src=x onerror="alert(1)"&gt;</pre>\n')
        self.assertTrue(self.scan()[0].eligible)

    def test_active_markdown_links_are_not_publishable_examples(self):
        for body in ('[example](javascript:alert(1))\n',
                     '[example][demo]\n\n[demo]: javascript:alert(1)\n'):
            self.article(body=body)
            record = self.scan()[0]
            self.assertFalse(record.eligible)
            self.assertTrue(any(i.code == 'active_html_example' for i in record.issues))
        self.article(body='`[example](javascript:alert(1))`\n')
        self.assertTrue(self.scan()[0].eligible)

    def test_indented_html_and_jnlp_online_not_events(self):
        self.article(body='Response:\n\n    HTTP/1.1 200 OK\n    <img src=x onerror="alert(1)">\n\n<shortcut online="true"></shortcut>\n')
        self.assertFalse(any(i.code == 'active_html_example' for i in self.scan()[0].issues))

    def test_normal_html_layout_not_active(self):
        self.article(body='<table><tr><td><a href="https://example.invalid">Reference</a><a href="javascript.js">File</a></td></tr></table>')
        self.assertFalse(any(i.code == 'active_html_example' for i in self.scan()[0].issues))

    def test_legacy_draft_tags_compatible(self):
        meta, _, errors = wiki.parse_frontmatter("---\ndraft: false\ntags: ['legacy']\n---\nBody")
        self.assertEqual(errors, [])
        self.assertEqual(meta['draft'], 'false')

    def test_bad_fingerprint_quotes_do_not_exclude_article(self):
        path = self.article()
        file = self.root / path
        file.write_text(file.read_text().replace('---\n', '---\nfofa: "\\_bad"\n', 1))
        r = self.scan()[0]
        self.assertTrue(r.eligible)
        self.assertEqual(r.fingerprints, {})

    def test_labelled_source_links_are_unverified(self):
        self.article(body='## 参考来源\n[原文](https://example.invalid/original)\n', ref='https://example.invalid/archive')
        r = self.scan()[0]
        self.assertEqual(len(r.source_links), 3)
        self.assertTrue(all(x['verification_status'] == 'unverified-link' for x in r.source_links))

    def test_scheme_links_not_repository_escapes(self):
        for target in ('javascript:void(0)', 'data:image/png;base64,AAAA', 'https://example.invalid/a'):
            self.assertIsNone(wiki.local_target('Web安全/a.md', target))
        self.assertEqual(wiki.local_target('Web安全/a.md', '../../escape.md'), '!outside')

    def test_source_urls_preserve_values_and_encoding_without_rewriting_article(self):
        urls = (
            'https://example.invalid/ref?token=abc123456789&topic=example',
            'https://user:password@example.invalid/ref?code=a%2Fb&code=a+b&empty=#part',
        )
        for url in urls:
            path = self.article(source_url=url, verification_source=url)
            original = (self.root / path).read_bytes()
            result = wiki.catalog_record(self.scan()[0])
            self.assertEqual(result['source']['url'], url)
            self.assertEqual(result['verification_source'], url)
            self.assertIn(url, [link['url'] for link in result['source']['links']])
            self.assertEqual((self.root / path).read_bytes(), original)

    def test_link_diagnostic_preserves_full_destination(self):
        target = '/archive/' + 'test-value-' * 24 + '?token=example#fragment'
        self.article(body=f'[original route]({target})\n')
        issue = next(i for i in self.scan()[0].issues if i.code == 'site_relative_link')
        self.assertIn(target, issue.detail)

    def test_active_html_excluded_from_effective_indexes(self):
        self.article(body='<img src=x onerror="alert(1)">')
        r = self.scan()[0]
        self.assertFalse(r.eligible)
        self.assertEqual(wiki.render_outputs([r])['docs/generated/records.jsonl'], '')

    def test_command_in_version_excluded(self):
        self.article(version='curl https://example.invalid')
        self.assertNotIn('affected_version_claim', wiki.catalog_record(self.scan()[0]))

    def test_strict_check_reports_debt_not_pass(self):
        self.article(fofa='body=')
        self.assertEqual(self.run_cli('check')[0], 1)

    def test_v1_explicit_missing_source_allowed_but_warned(self):
        for status in ('unknown', 'missing'):
            self.article(schema_version='1', title='Example title', prerequisites='unknown', side_effects='unknown', source_url='', source_status=status, ref='https://example.invalid/secondary')
            record = self.scan()[0]
            self.assertTrue(record.eligible)
            self.assertTrue(any(i.code == 'source_missing' for i in record.issues))
            self.assertEqual(wiki.catalog_record(record)['source']['status'], status)
        self.article(schema_version='1', title='Example title', prerequisites='unknown', side_effects='unknown', source_url='', source_status='recorded')
        self.assertFalse(self.scan()[0].eligible)

    def test_fatal_baseline_refused_without_overwriting_existing(self):
        file = self.root / 'baseline.json'
        file.write_text('existing reviewed baseline')
        with self.assertRaises(ValueError):
            wiki.write_baseline(file, [wiki.Issue('a.md', 'active_html_example', 'event', 'error')], 'must refuse')
        self.assertEqual(file.read_text(), 'existing reviewed baseline')
        self.article(record_type='invalid')
        self.assertEqual(self.run_cli('baseline', '--reason', 'must refuse')[0], 2)
        self.assertFalse((self.root / 'docs/quality-baseline.json').exists())

    def test_forged_legacy_baseline_cannot_allow_fatal(self):
        self.article(body='<img src=x onerror="alert(1)">')
        issues, _ = wiki.issue_summary(self.scan())
        file = self.root / 'baseline.json'
        file.write_text(json.dumps({'issues': [{'key': i.key, 'count': 1} for i in issues]}))
        code, out, _ = self.run_cli('check', '--baseline', str(file))
        self.assertEqual(code, 1)
        summary = json.loads(out)
        self.assertEqual(summary['new_issues'], 0)
        self.assertGreater(summary['fatal_issues'], 0)

    def test_generated_markdown_single_final_newline(self):
        self.article(primary_identifiers='CVE-2025-12345')
        for name, text in wiki.render_outputs(self.scan()).items():
            if name.endswith('.md'):
                self.assertTrue(text.endswith('\n'), name)
                self.assertFalse(text.endswith('\n\n'), name)

    def test_corrected_title_in_every_display_index(self):
        self.article('old-title', title='Corrected title', primary_identifiers='CVE-2025-12345', fofa='app="Example"')
        outputs = wiki.render_outputs(self.scan())
        for name in ('INDEX/测试.md', 'INDEX-CVE/year/2025.md', 'INDEX-FOFA.md'):
            self.assertIn('[Corrected title]', outputs[name])
            self.assertNotIn('[old-title]', outputs[name])
        self.assertEqual(json.loads(outputs['docs/generated/records.jsonl'])['title'], 'Corrected title')


if __name__ == '__main__':
    unittest.main()
