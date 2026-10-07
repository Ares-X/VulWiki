#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const CONTENT_ROOTS = ['Web安全', '系统安全', 'IOT安全'];
const STRUCTURAL = new Set(['parse_error', 'empty_code', 'fence_in_heading']);
const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');

function readFrontmatter(source) {
  const start = source.startsWith('\uFEFF') ? 1 : 0;
  const text = source.slice(start);
  if (!text.startsWith('---\n') && !text.startsWith('---\r\n')) return { body: source, lines: 0 };
  const prefix = text.startsWith('---\r\n') ? 5 : 4;
  const tail = text.slice(prefix);
  const match = tail.match(/^[\s\S]*?^---[ \t]*(?:\r?\n|$)/m);
  if (!match) return { body: source, lines: 0 };
  const front = source.slice(0, start + prefix + match[0].length);
  return { body: source.slice(front.length), lines: front.split(/\r?\n/).length - 1 };
}

function lineAt(source, index) { return source.slice(0, index).split('\n').length; }
function walkTokens(tokens, visit) {
  for (const token of tokens || []) {
    visit(token, tokens);
    if (Array.isArray(token.tokens)) walkTokens(token.tokens, visit);
    if (token.type === 'table') {
      for (const cell of token.header || []) walkTokens(cell.tokens, visit);
      for (const row of token.rows || []) for (const cell of row) walkTokens(cell.tokens, visit);
    }
    if (token.items) for (const item of token.items) walkTokens(item.tokens, visit);
  }
}

function locate(source, raw, from = 0) {
  if (!raw) return -1;
  const at = source.indexOf(raw, from);
  return at;
}

// Marked normalizes line endings; older versions also expand leading tabs.
// Map both token.raw forms back to offsets without changing archived bytes.
function normalizedBlockSource(source, expandLeadingTabs = true) {
  const text = [], starts = [], ends = [];
  let leading = true;
  function append(value, start, end) {
    for (const char of value) { text.push(char); starts.push(start); ends.push(end); }
  }
  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    if (char === '\r') {
      const end = source[i + 1] === '\n' ? i + 2 : i + 1;
      append('\n', i, end); i = end - 1; leading = true;
    } else if (char === '\n') {
      append(char, i, i + 1); leading = true;
    } else if (char === '\t' && leading && expandLeadingTabs) {
      append('    ', i, i + 1);
    } else {
      // One UTF-16 code unit at a time preserves JavaScript source offsets.
      append(char, i, i + 1);
      if (char !== ' ') leading = false;
    }
  }
  return { text: text.join(''), starts, ends };
}

function tableCells(row) {
  let cells = 0, escaped = false;
  for (let i = 0; i < row.length; i++) {
    const c = row[i];
    if (escaped) { escaped = false; continue; }
    if (c === '\\') { escaped = true; continue; }
    if (c === '|') cells++;
  }
  return Math.max(1, cells + 1 - (row.trimStart().startsWith('|') ? 1 : 0) - (row.trimEnd().endsWith('|') ? 1 : 0));
}

function pushCandidate(items, rule, raw, line, extra = {}) {
  if (!raw) return;
  items.push({ rule, raw, line, ...extra });
}

function auditArticle({ path: articlePath, source, sourceBytes, marked }) {
  const { body, lines: frontmatterLines } = readFrontmatter(source);
  const fileSha256 = sha256(sourceBytes || Buffer.from(source, 'utf8'));
  const candidates = [];
  let tokens;
  let html = '';
  try {
    tokens = marked.lexer(body, { ...marked.defaults, mangle: false });
    html = marked.parser(tokens, { ...marked.defaults, mangle: false });
  } catch (error) {
    pushCandidate(candidates, 'parse_error', String(error && error.message || error), 1 + frontmatterLines);
    tokens = [];
  }

  const codeTokens = [];
  const codespans = [];
  const htmlTokens = [];
  const headingTokens = [];
  const links = [];
  const tables = [];
  const tokenSiblings = new WeakMap();
  walkTokens(tokens, (token, siblings) => {
    tokenSiblings.set(token, siblings);
    if (token.type === 'code') codeTokens.push(token);
    if (token.type === 'codespan') codespans.push(token);
    if (token.type === 'html') htmlTokens.push(token);
    if (token.type === 'heading') headingTokens.push(token);
    if (token.type === 'link' || token.type === 'image') links.push(token);
    if (token.type === 'table') tables.push(token);
  });

  let headingCursor = 0;
  for (const token of headingTokens) {
    const offset = locate(body, token.raw, headingCursor);
    if (offset >= 0) headingCursor = offset + token.raw.length;
    if (/```/.test(token.raw || '')) pushCandidate(candidates, 'fence_in_heading', token.raw, offset < 0 ? null : frontmatterLines + lineAt(body, offset));
  }

  let codeCursor = 0;
  for (const token of codeTokens) {
    const raw = token.raw || '';
    const tokenOffset = locate(body, raw, codeCursor);
    if (tokenOffset >= 0) codeCursor = tokenOffset + raw.length;
    const startLine = tokenOffset < 0 ? null : frontmatterLines + lineAt(body, tokenOffset);
    if (!String(token.text || '').trim()) pushCandidate(candidates, 'empty_code', raw, startLine);
    if (token.lang === '{=html}' && /^\s*<!--\s*-->\s*$/.test(token.text || '')) {
      pushCandidate(candidates, 'pandoc_comment_fence', raw, startLine);
    }
    const headingInside = String(token.text || '').split(/\r?\n/).find((line) => /^\s*(?:#{1,6}\s*)?(?:修复|参考|披露|后续说明|修复建议|参考资料|披露时间|后续进展)\s*[:：]?\s*$/.test(line));
    if (headingInside) pushCandidate(candidates, 'prose_heading_in_code', raw, startLine, { heading: headingInside.trim() });
    if (/!\[[^\]]*\]\([^)]+\)/.test(String(token.text || '')) && /[\u4e00-\u9fff]{10}/.test(token.text || '')) pushCandidate(candidates, 'prose_images_in_code', raw, startLine);
    if (/复制代码|复制全文|javascript:void\(0\)|^12345678910/m.test(String(token.text || ''))) pushCandidate(candidates, 'code_web_controls', raw, startLine);
    const firstLine = String(token.text || '').split(/\r?\n/, 1)[0] || '';
    const requestFirstLine = /^\s*(?:GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\s+\S+\s+HTTP\/\d(?:\.\d)?\s*$/i.test(firstLine);
    if (requestFirstLine && token.lang && !/^(?:http|https|rest|raw|text|plain|plaintext|txt)$/i.test(token.lang.trim())) {
      pushCandidate(candidates, 'requests_wrong_language', raw, startLine, { language: token.lang });
    }
    const requestHeaders = String(token.text || '').split(/\r?\n/).slice(1).filter((line) => line.trim());
    const headersOnly = requestHeaders.length && requestHeaders.every((line) => /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\s*:/.test(line));
    if (requestFirstLine && /^(?:POST|PUT|PATCH|DELETE|OPTIONS)\s/.test(firstLine) && headersOnly && /^(?:http|https|rest|raw|text|plain|plaintext|txt)?$/i.test((token.lang || '').trim())) {
      const siblings = tokenSiblings.get(token) || [];
      let nextIndex = siblings.indexOf(token) + 1;
      let next = siblings[nextIndex];
      while (next && next.type === 'space') next = siblings[++nextIndex];
      if (next && next.type === 'paragraph' && !(next.tokens || []).some((x) => x.type === 'image' || x.type === 'link') && /^(?:\s*\{[\s\S]*\}|\s*<\?xml|\s*<[^>]+>|\s*------[-\w]+|\s*Content-Disposition:|\s*\w+\s*=)/.test(next.text || '')) {
        const bodyOffset = locate(body, next.raw || next.text, tokenOffset < 0 ? 0 : tokenOffset + raw.length);
        pushCandidate(candidates, 'http_body_outside_fence', next.raw || next.text, bodyOffset < 0 ? null : frontmatterLines + lineAt(body, bodyOffset), { request_raw: raw, body_raw: next.raw || next.text });
      }
    }
  }
  // Only Marked codespans qualify; fenced code contents are deliberately ignored.
  let codespanCursor = 0;
  for (const token of codespans) {
    const offset = locate(body, token.raw, codespanCursor);
    if (offset >= 0) codespanCursor = offset + token.raw.length;
    if (/\n/.test(token.raw || '') && /```/.test(token.raw || '')) {
      pushCandidate(candidates, 'inline_triple_fence', token.raw, offset < 0 ? null : frontmatterLines + lineAt(body, offset));
    }
  }
  // HTTP request lines outside fenced-code token ranges are prompts; ordinary URLs are references.
  const codeRanges = [];
  let codeSearchFrom = 0;
  let normalizedSources;
  const needsBlockNormalization = /[\r\t]/.test(body);
  function blockRange(raw, from, to = body.length) {
    if (!raw) return null;
    const offset = locate(body, raw, from);
    let range = offset >= 0 && offset + raw.length <= to ? [offset, offset + raw.length] : null;
    if (needsBlockNormalization) {
      normalizedSources ||= [normalizedBlockSource(body, false), normalizedBlockSource(body)];
      for (const { text, starts, ends } of normalizedSources) {
        let low = 0, high = starts.length;
        while (low < high) {
          const middle = Math.floor((low + high) / 2);
          if (starts[middle] < from) low = middle + 1; else high = middle;
        }
        const at = text.indexOf(raw, low);
        if (at >= 0) {
          const end = ends[at + raw.length - 1];
          if (end <= to && (!range || starts[at] < range[0])) range = [starts[at], end];
        }
      }
    }
    return range;
  }
  // Advance through complete top-level tokens first. A fence-shaped substring
  // in an earlier HTML block must not impersonate a later real code token.
  const codeScopes = new WeakMap();
  let blockCursor = 0;
  for (const token of tokens) {
    const range = blockRange(token.raw, blockCursor);
    if (!range) continue;
    blockCursor = range[1];
    walkTokens([token], (child) => { if (child.type === 'code') codeScopes.set(child, range); });
  }
  for (const token of codeTokens) {
    const scope = codeScopes.get(token);
    const offset = locate(body, token.raw, codeSearchFrom);
    const range = scope
      ? blockRange(token.raw, Math.max(codeSearchFrom, scope[0]), scope[1])
      : offset >= 0 ? [offset, offset + token.raw.length] : null;
    if (range) { codeRanges.push(range); codeSearchFrom = range[1]; }
  }
  function rangesFor(tokens) {
    const ranges = [];
    let cursor = 0;
    for (const token of tokens) {
      const offset = locate(body, token.raw, cursor);
      if (offset >= 0) { ranges.push([offset, offset + token.raw.length]); cursor = offset + token.raw.length; }
    }
    return ranges;
  }
  const inlineRanges = [...rangesFor(codespans), ...rangesFor(links)].sort((a, b) => a[0] - b[0]);
  const overlaps = (ranges, start, end) => ranges.some(([a, b]) => a < end && start < b);
  for (const match of body.matchAll(/^ {0,3}(?:GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\s+\S+\s+HTTP\/\d(?:\.\d)?[^\r\n]*$/gm)) {
    if (!overlaps(codeRanges, match.index, match.index + match[0].length) && !overlaps(inlineRanges, match.index, match.index + match[0].length)) {
      pushCandidate(candidates, 'unfenced_http', match[0], frontmatterLines + lineAt(body, match.index));
    }
  }
  let htmlCursor = 0;
  for (const token of htmlTokens) {
    const raw = token.raw || '';
    const offset = locate(body, raw, htmlCursor);
    if (offset >= 0) htmlCursor = offset + raw.length;
    if (!/<\/?[A-Za-z][^>]*>/.test(raw)) continue;
    if (overlaps(codeRanges, offset, offset + raw.length) || overlaps(inlineRanges, offset, offset + raw.length)) continue;
    const stripped = raw.replace(/<!--[^]*?-->/g, '').replace(/<[^>]*>/g, '').trim();
    const tableBoundary = raw.match(/<\/table>[ \t]*(?:\r?\n)?([^\s][\s\S]*)/i);
    if (tableBoundary && !/^<\/?[A-Za-z!][^>]*>|^<!--/.test(tableBoundary[1])) {
      // Marked can keep the rest of this raw HTML block as HTML, including a fence opener.
      pushCandidate(candidates, 'html_markdown_boundary', raw, offset < 0 ? null : frontmatterLines + lineAt(body, offset));
      continue;
    }
    const boundary = raw.match(/<\/[A-Za-z][^>]*>\s*(?:#{1,6}\s+[^\n]+|[^\n]+\n[=-]{3,})/);
    if (boundary) pushCandidate(candidates, 'html_markdown_boundary', boundary[0], offset < 0 ? null : frontmatterLines + lineAt(body, offset));
    else if (stripped && !/^\s*<table\b[\s\S]*<\/table>\s*$/i.test(raw)) pushCandidate(candidates, 'unknown_html_literal', raw, offset < 0 ? null : frontmatterLines + lineAt(body, offset));
  }
  const sourceParagraphs = [];
  walkTokens(tokens, (token) => { if (token.type === 'paragraph') sourceParagraphs.push(token); });
  let sourceCursor = 0;
  for (const token of sourceParagraphs) {
    const offset = locate(body, token.raw, sourceCursor);
    if (offset >= 0) sourceCursor = offset + token.raw.length;
    if (/^\s*[\w.-]+\.(?:png|jpe?g|gif)\s*$/i.test(token.text || '')) {
      pushCandidate(candidates, 'bare_image_filename', token.raw,
        offset < 0 ? null : frontmatterLines + lineAt(body, offset));
    }
    for (const match of token.raw.matchAll(/^ {0,3}(?:package\s+[\w.]+;|import\s+[\w.]+;|public\s+(?:class|interface)\s|#include\s*[<"]|<\?php|def\s+\w+\([^)]*\)\s*:|function\s+\w+\([^)]*\)\s*\{)[^\r\n]*$/gm)) {
      const at = offset < 0 ? -1 : offset + match.index;
      if (at < 0 || !overlaps(inlineRanges, at, at + match[0].length)) {
        pushCandidate(candidates, 'unfenced_source', match[0], at < 0 ? null : frontmatterLines + lineAt(body, at));
      }
    }
  }
  let tableCursor = 0;
  for (const table of tables) {
    const expected = table.header.length;
    for (const raw of table.raw.split(/\r?\n/).slice(2).filter(Boolean)) {
      const actual = tableCells(raw);
      if (actual !== expected && !/^[\s|:-]+$/.test(raw)) {
        const offset = locate(body, raw, tableCursor);
        if (offset >= 0) tableCursor = offset + raw.length;
        pushCandidate(candidates, 'table_column_mismatch', raw, offset < 0 ? null : frontmatterLines + lineAt(body, offset), { expected, actual });
      }
    }
  }
  // Literal link syntax is suspicious only outside links, images and codespans.
  function hasRenderedLink(tokens) {
    for (const token of tokens || []) {
      if (token.type === 'link' || token.type === 'image') return true;
      if (token.type === 'codespan' && /!?\[[^\]]+\]\s*\(/.test(token.text || '')) return true;
      if (token.type !== 'codespan' && hasRenderedLink(token.tokens)) return true;
    }
    return false;
  }
  let paragraphCursor = 0;
  const paragraphs = [];
  walkTokens(tokens, (token) => { if (token.type === 'paragraph') paragraphs.push(token); });
  for (const token of paragraphs) {
    if (/[!]?\[[^\]]+\]\s*\(/.test(token.text || '') && !hasRenderedLink(token.tokens)) {
      const offset = locate(body, token.raw, paragraphCursor);
      if (offset >= 0) paragraphCursor = offset + token.raw.length;
      pushCandidate(candidates, 'lost_markdown_link_literal', token.raw, offset < 0 ? null : frontmatterLines + lineAt(body, offset));
    }
  }
  const codeCount = codeTokens.length;
  const imageCount = links.filter((t) => t.type === 'image').length;
  const tableCount = tables.length;
  let emptyTargetCursor = 0;
  for (const token of links) {
    if (token.href !== '') continue;
    const offset = locate(body, token.raw, emptyTargetCursor);
    if (offset >= 0) emptyTargetCursor = offset + token.raw.length;
    pushCandidate(candidates, token.type === 'image' ? 'empty_image_target' : 'empty_link_target',
      token.raw, offset < 0 ? null : frontmatterLines + lineAt(body, offset));
  }
  const occurrence = new Map();
  const enriched = candidates.map((candidate) => {
    const key = `${candidate.rule}\0${articlePath}\0${candidate.raw}`;
    const n = occurrence.get(key) || 0;
    occurrence.set(key, n + 1);
    return { id: sha256(`${candidate.rule}\0${articlePath}\0${candidate.raw}\0${n}`), path: articlePath,
      file_sha256: fileSha256, ...candidate };
  });
  return { inventory: { path: articlePath, file_sha256: fileSha256, render_hash: sha256(html), bytes: (sourceBytes || Buffer.from(source, 'utf8')).length, code_blocks: codeCount, images: imageCount, tables: tableCount }, candidates: enriched };
}

function collectMarkdown(root) {
  const found = [];
  const visit = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) visit(file);
      else if (entry.isFile() && entry.name.endsWith('.md')) found.push(file);
    }
  };
  for (const rootName of CONTENT_ROOTS) visit(path.join(root, rootName));
  return found.sort((a, b) => {
    const left = path.relative(root, a), right = path.relative(root, b);
    return left < right ? -1 : left > right ? 1 : 0;
  });
}

function run({ root, out, markedModule }) {
  const markedPath = require.resolve(markedModule ? path.resolve(markedModule) : 'marked');
  const marked = require(markedPath);
  let markedVersion = null;
  for (let dir = path.dirname(markedPath); ; dir = path.dirname(dir)) {
    const packageFile = path.join(dir, 'package.json');
    if (fs.existsSync(packageFile)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
        if (pkg.name === 'marked') { markedVersion = pkg.version || null; break; }
      } catch { /* ignore package metadata that cannot be read */ }
    }
    if (path.dirname(dir) === dir) break;
  }
  const absoluteRoot = path.resolve(root);
  const articles = collectMarkdown(absoluteRoot).map((file) => {
    const sourceBytes = fs.readFileSync(file);
    const source = sourceBytes.toString('utf8');
    return auditArticle({ path: path.relative(absoluteRoot, file).split(path.sep).join('/'), source, sourceBytes, marked });
  });
  const inventory = articles.map((x) => x.inventory);
  if (!inventory.length) throw new Error(`no article Markdown found under ${absoluteRoot}`);
  const candidates = articles.flatMap((x) => x.candidates);
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'inventory.jsonl'), inventory.map((x) => JSON.stringify(x)).join('\n') + (inventory.length ? '\n' : ''), 'utf8');
  fs.writeFileSync(path.join(out, 'candidates.jsonl'), candidates.map((x) => JSON.stringify(x)).join('\n') + (candidates.length ? '\n' : ''), 'utf8');
  const summary = { files: inventory.length, candidates: candidates.length, by_rule: Object.fromEntries([...new Set(candidates.map((x) => x.rule))].sort().map((rule) => [rule, candidates.filter((x) => x.rule === rule).length])), structural_failures: candidates.filter((x) => STRUCTURAL.has(x.rule)).length, marked: { module: markedPath, version: markedVersion } };
  fs.writeFileSync(path.join(out, 'summary.json'), JSON.stringify(summary, null, 2) + '\n', 'utf8');
  return summary;
}

function parseArgs(argv) {
  const result = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--root') result.root = argv[++i];
    else if (argv[i] === '--out') result.out = argv[++i];
    else if (argv[i] === '--marked-module') result.markedModule = argv[++i];
    else throw new Error(`unknown argument: ${argv[i]}`);
  }
  if (!result.root || !result.out) throw new Error('usage: node scripts/render-audit.cjs --root <repo> --out <dir> [--marked-module <cjs>]');
  return result;
}

if (require.main === module) {
  try {
    const summary = run(parseArgs(process.argv.slice(2)));
    console.log(JSON.stringify(summary));
    if (summary.structural_failures) process.exitCode = 1;
  } catch (error) { console.error(error.message); process.exitCode = 2; }
}

module.exports = { auditArticle, collectMarkdown, run, readFrontmatter, tableCells };
