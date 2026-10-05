#!/usr/bin/env python3
"""Offline audit of local Markdown image references and referenced file bytes.

The tool reads source Markdown and resource bytes only. It does not execute,
render, decode raster data, contact, or modify articles or resources. Magic signatures
identify likely containers, not complete structural validity or renderability.
"""
from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import subprocess
import sys
from collections import defaultdict
from html.parser import HTMLParser
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET

ROOTS = ("Web安全", "系统安全", "IOT安全")
LIMITATIONS = [
    "Image signatures identify likely containers only; they do not prove full structural validity or renderability.",
    "Unknown formats are reported for review and are not treated as invalid images.",
    "SVG is checked statically as XML/text for selected external-resource and active-content patterns; this is not a sanitizer.",
]


def load_wiki():
    path = Path(__file__).with_name("wiki.py")
    spec = importlib.util.spec_from_file_location("vulwiki_resource_audit_wiki", path)
    if spec is None or spec.loader is None:
        raise RuntimeError("cannot load scripts/wiki.py")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


wiki = load_wiki()


class ResponsiveImageSources(HTMLParser):
    """Additional browser image candidates outside the ordinary img src."""
    def __init__(self):
        super().__init__()
        self.picture_depth = 0
        self.links = []
        self.unusable_images = []

    def handle_starttag(self, tag, attrs):
        if tag == "picture":
            self.picture_depth += 1
        if tag != "img" and not (tag == "source" and self.picture_depth):
            return
        if tag == "img" and not any(key in {"src", "srcset"} and value and value.strip()
                                    for key, value in attrs):
            self.unusable_images.append((self.get_starttag_text(), self.getpos()[0]))
        for key, value in attrs:
            if not value:
                continue
            if tag == "source" and key == "src":
                self.links.append((value, True, self.getpos()[0]))
            if tag == "img" and key == "data-src":
                self.links.append((value, True, self.getpos()[0]))
            if key == "srcset":
                # Remote candidates have no unescaped spaces/commas. Embedded
                # data-image candidates remain local and are not requested.
                for match in re.finditer(r"(?:https?://|//)[^\s,]+", value, re.I):
                    self.links.append((match[0], True, self.getpos()[0]))

    def handle_endtag(self, tag):
        if tag == "picture":
            self.picture_depth = max(0, self.picture_depth - 1)


def image_format(data: bytes) -> str | None:
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return "PNG"
    if data.startswith(b"\xff\xd8\xff"):
        return "JPEG"
    if data.startswith((b"GIF87a", b"GIF89a")):
        return "GIF"
    if len(data) >= 12 and data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return "WebP"
    if data.startswith(b"BM"):
        return "BMP"
    if data.startswith(b"\x00\x00\x01\x00"):
        return "ICO"
    if data.startswith((b"II*\x00", b"MM\x00*")):
        return "TIFF"
    if len(data) >= 12 and data[4:8] == b"ftyp" and data[8:12] in {b"avif", b"heic", b"heix", b"mif1"}:
        return "AVIF/HEIF"
    return None


EXT_FORMATS = {
    ".png": {"PNG"}, ".jpg": {"JPEG"}, ".jpeg": {"JPEG"},
    ".gif": {"GIF"}, ".webp": {"WebP"}, ".bmp": {"BMP"},
    ".ico": {"ICO"}, ".tif": {"TIFF"}, ".tiff": {"TIFF"},
    ".avif": {"AVIF/HEIF"}, ".heic": {"AVIF/HEIF"},
}


def inspect_file(root: Path, relative: str) -> dict:
    path = root / relative
    item = {"path": relative, "exists": path.exists(), "references": []}
    if not path.exists():
        item.update({"bytes": None, "sha256": None, "detected_format": "missing", "status": "missing"})
        return item
    if not path.is_file():
        item.update({"bytes": None, "sha256": None, "detected_format": "not-regular-file", "status": "missing"})
        return item
    data = path.read_bytes()
    item.update({"bytes": len(data), "sha256": hashlib.sha256(data).hexdigest()})
    if not data:
        item.update({"detected_format": "empty", "status": "zero_byte"})
        return item
    signature = image_format(data)
    text = data.lstrip(b"\xef\xbb\xbf\x00\t\r\n ")
    sample = text[:8192]
    lower = sample.lower()
    if lower.startswith((b"<!doctype html", b"<html", b"<head", b"<body")) or (b"<html" in lower[:2048] and (b"<title" in lower or b"<body" in lower)):
        document = data.decode("utf-8", errors="replace")
        item.update({"detected_format": "HTML/error-page-text", "status": "html_error_page", "text": document})
        return item
    if signature:
        ext = path.suffix.lower()
        allowed = EXT_FORMATS.get(ext)
        mismatch = bool(allowed and signature not in allowed)
        item.update({"detected_format": signature, "status": "recognized_container", "extension_mismatch": mismatch})
        if mismatch:
            item["extension_expected"] = sorted(allowed)
        return item
    lower_text = sample.lower()
    if b"<svg" in lower_text[:512] or b"<?xml" in lower_text[:256]:
        source = data.decode("utf-8", errors="replace")
        flags = []
        checks = ((r"<\s*script\b", "script_element"), (r"\bon[a-z]+\s*=", "event_attribute"),
                  (r"(?:href|src)\s*=\s*[\"']\s*(?:https?:|javascript:|//)", "external_or_active_reference"),
                  (r"<!ENTITY\b", "entity_declaration"))
        for pattern, label in checks:
            if re.search(pattern, source, re.I):
                flags.append(label)
        try:
            svg = ET.fromstring(source)
            for element in svg.iter():
                name = element.tag.rsplit("}", 1)[-1].lower()
                attrs = {key.rsplit("}", 1)[-1].lower(): value for key, value in element.attrib.items()}
                if name in {"image", "feimage", "use", "script", "font-face-uri", "link"}:
                    if any(re.match(r"(?:https?:|//)", attrs.get(key, "").strip(), re.I)
                           for key in ("href", "src")):
                        flags.append("external_image_dependency")
                css = attrs.get("style", "")
                if name == "style":
                    css += "".join(element.itertext())
                if re.search(r'''(?:url\s*\(\s*["']?\s*|@import\s*["']\s*)(?:https?:|//)''', css, re.I):
                    flags.append("external_image_dependency")
        except ET.ParseError as error:
            flags.append("svg_xml_parse_error: " + str(error))
        flags = sorted(set(flags))
        item.update({"detected_format": "SVG-text", "status": "unknown", "svg_safety_flags": flags})
        return item
    item.update({"detected_format": "unknown", "status": "unknown"})
    return item


def audit(root: Path) -> dict:
    references = defaultdict(list)
    reference_review = []
    remote_images = []
    unusable_images = []
    article_hashes = {}
    for folder in ROOTS:
        content_root = root / folder
        if not content_root.exists():
            continue
        for article in sorted(content_root.rglob("*.md")):
            if ".resource" in article.parts:
                continue
            rel_article = article.relative_to(root).as_posix()
            raw = article.read_bytes()
            article_hashes[rel_article] = hashlib.sha256(raw).hexdigest()
            text = raw.decode("utf-8", errors="replace")
            _, body, _ = wiki.parse_frontmatter(text)
            prose, _ = wiki.prose_and_fences(body)
            responsive = ResponsiveImageSources()
            # Match wiki.markdown_links' code-span exclusion before feeding HTML.
            responsive.feed(re.sub(r"(`+).*?\1", "", prose))
            unusable_images.extend({"article": rel_article, "line": line, "raw_tag": tag}
                                   for tag, line in responsive.unusable_images)
            for target, is_image, line in [*wiki.markdown_links(prose, with_lines=True, check_image_links=True), *responsive.links]:
                if not is_image:
                    continue
                try:
                    parsed = urlsplit(target)
                    if parsed.scheme in {"http", "https"} or (not parsed.scheme and parsed.netloc):
                        remote_images.append({"article": rel_article, "line": line, "target": target})
                        continue
                    local = wiki.local_target(rel_article, target)
                except ValueError as error:
                    reference_review.append({"article": rel_article, "line": line, "target": target,
                                             "reason": "local_target_parse_error: " + str(error)})
                    continue
                if local is None:
                    continue
                if local == "!site":
                    reference_review.append({"article": rel_article, "line": line, "target": target,
                                             "reason": "site_root_relative_image_requires_site_context"})
                    continue
                if local == "!outside":
                    reference_review.append({"article": rel_article, "line": line, "target": target,
                                             "reason": "relative_image_resolves_outside_repository"})
                    continue
                references[local].append({"article": rel_article, "line": line, "target": target})
    files = []
    for relative, refs in sorted(references.items()):
        item = inspect_file(root, relative)
        item["references"] = sorted(refs, key=lambda r: (r["article"], r["line"], r["target"]))
        item["reference_count"] = len(refs)
        files.append(item)
    counts = {key: sum(f["status"] == key for f in files) for key in ("missing", "zero_byte", "html_error_page", "recognized_container", "unknown")}
    counts["extension_mismatch"] = sum(bool(f.get("extension_mismatch")) for f in files)
    counts["remote_images"] = len(remote_images)
    counts["unusable_image_tags"] = len(unusable_images)
    counts["external_image_dependencies"] = sum(
        "external_image_dependency" in f.get("svg_safety_flags", []) for f in files)
    try:
        head = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=root, text=True, stderr=subprocess.DEVNULL).strip()
    except (OSError, subprocess.CalledProcessError):
        head = None
    return {
        "scope": {"root": str(root.resolve()), "head": head, "articles_roots": list(ROOTS),
                  "article_files": len(article_hashes), "article_sha256": article_hashes, "unique_resources": len(files),
                  "image_reference_occurrences": sum(f["reference_count"] for f in files),
                  "method": "Offline source parsing and byte/signature checks; no rendering or execution."},
        "counts": counts, "files": files, "reference_review": reference_review,
        "remote_images": remote_images,
        "unusable_image_tags": unusable_images,
        "limitations": LIMITATIONS,
    }


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--report", type=Path, required=True)
    parser.add_argument("--require-local", action="store_true",
                        help="Reject active remote images in this offline knowledge archive; code examples and source links are not images")
    args = parser.parse_args(argv)
    root = args.root.resolve()
    if not root.is_dir():
        parser.error("--root must be an existing directory: " + str(root))
    result = audit(root)
    args.report.parent.mkdir(parents=True, exist_ok=True)
    args.report.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"report": str(args.report), "counts": result["counts"]}, ensure_ascii=False))
    return int(any(result["counts"][key] for key in ("missing", "zero_byte", "html_error_page"))
               or (args.require_local and (result["counts"]["remote_images"] > 0
                                          or result["counts"]["unusable_image_tags"] > 0
                                          or result["counts"]["external_image_dependencies"] > 0
                                          or bool(result["reference_review"]))))


if __name__ == "__main__":
    raise SystemExit(main())
