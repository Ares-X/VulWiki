'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { marked } = require('marked');
const { auditArticle, run, readFrontmatter } = require('../scripts/render-audit.cjs');

function audit(source, articlePath = '样例/文章.md') {
  return auditArticle({ path: articlePath, source, marked });
}

function has(result, rule) { return result.candidates.some((candidate) => candidate.rule === rule); }

test('detects a Setext heading that swallowed a triple fence marker as structural', () => {
  const result = audit('说明 ```\n---\n\necho preserved\n');
  assert.ok(has(result, 'fence_in_heading'));
  assert.equal(result.inventory.code_blocks, 0);
});

test('Pandoc separators render as comments while the neighboring code remains exact', () => {
  const broken = '- command:\n\n```{=html}\n<!-- -->\n```\n    echo preserved\n';
  assert.ok(has(audit(broken), 'pandoc_comment_fence'));
  const repaired = '- command:\n\n<!-- -->\n\n    echo preserved\n';
  assert.equal(has(audit(repaired), 'pandoc_comment_fence'), false);
  const code = marked.lexer(repaired).filter((token) => token.type === 'code');
  assert.deepEqual(code.map((token) => token.text), ['echo preserved']);
  assert.equal(has(audit('```html\n<!-- -->\n```\n'), 'pandoc_comment_fence'), false);
});

test('bare image filenames are review candidates without treating code or real images as missing', () => {
  assert.ok(has(audit('1.png\n'), 'bare_image_filename'));
  assert.equal(has(audit('![1.png](actual.png)\n'), 'bare_image_filename'), false);
  assert.equal(has(audit('```text\n1.png\n```\n'), 'bare_image_filename'), false);
});

test('detects WPS style adjacent triple backticks and a Markdown boundary after HTML', () => {
  const result = audit('``\n第一行```\n第二行\n``\n\n<div>内容</div># 后续标题\n');
  assert.ok(has(result, 'inline_triple_fence'));
  assert.ok(has(result, 'html_markdown_boundary'));
});

test('finds prose/code swallowed after an HTML table but preserves code payload after a blank line', () => {
  const table = '<table><tr><td>值</td></tr></table>';
  const payload = 'printf "原样保留"\necho done';
  const swallowed = audit(`${table}\n后续说明\n\`\`\`sh\n${payload}\n\`\`\`\n`);
  assert.ok(has(swallowed, 'html_markdown_boundary'));
  assert.equal(swallowed.inventory.code_blocks, 0);
  assert.ok(swallowed.candidates.find((item) => item.rule === 'html_markdown_boundary').raw.includes(`\n\`\`\`sh\n${payload}`));

  const separated = audit(`${table}\n\n后续说明\n\n\`\`\`sh\n${payload}\n\`\`\`\n`);
  assert.equal(has(separated, 'html_markdown_boundary'), false);
  const code = marked.lexer(`\`\`\`sh\n${payload}\n\`\`\`\n`).find((token) => token.type === 'code');
  assert.equal(code.text, payload);
  assert.equal(separated.inventory.code_blocks, 1);
});

test('does not flag continued HTML or text separated by a blank line after a table', () => {
  assert.equal(has(audit('<table><tr><td>x</td></tr></table></section>\n'), 'html_markdown_boundary'), false);
  assert.equal(has(audit('<table><tr><td>x</td></tr></table>\n\n普通段落\n'), 'html_markdown_boundary'), false);
});

test('detects a table that consumed a following heading', () => {
  const result = audit('| A | B |\n| --- | --- |\n| x | y |\n| # 标题 |\n');
  assert.ok(has(result, 'table_column_mismatch'));
  assert.ok(result.candidates.find((candidate) => candidate.rule === 'table_column_mismatch').raw.includes('# 标题'));
});

test('records Marked 4.3 table splitting for an unescaped pipe inside inline code', () => {
  const source = '| A | B |\n| --- | --- |\n| `a|b` | tail |\n';
  const table = marked.lexer(source).find((token) => token.type === 'table');
  assert.deepEqual(table.rows[0].map((cell) => cell.text), ['`a', 'b`']);
  const result = audit(source);
  assert.ok(has(result, 'table_column_mismatch'));
  assert.equal(result.candidates.find((candidate) => candidate.rule === 'table_column_mismatch').raw, '| `a|b` | tail |');
});

test('detects an HTTP request body left in the adjacent paragraph', () => {
  const result = audit('```http\nPOST /api HTTP/1.1\nHost: example.invalid\n```\n\n{"raw":"完整值"}\n');
  assert.ok(has(result, 'http_body_outside_fence'));
  const candidate = result.candidates.find((item) => item.rule === 'http_body_outside_fence');
  assert.equal(candidate.raw, '{"raw":"完整值"}\n');
  assert.equal(candidate.request_raw, '```http\nPOST /api HTTP/1.1\nHost: example.invalid\n```');
  assert.equal(candidate.body_raw, '{"raw":"完整值"}\n');
});

test('finds prose headings embedded in code as advisory candidates', () => {
  const result = audit('```text\n源码段落\n# 参考资料\n链接说明\n```\n');
  assert.ok(has(result, 'prose_heading_in_code'));
  assert.equal(result.candidates.find((item) => item.rule === 'prose_heading_in_code').heading, '# 参考资料');
});

test('counts tokens nested in links, images, table cells and list items exactly once', () => {
  const source = '> [![linked image](asset.png)](https://example.invalid)\n\n| ![table image](table.png) | cell |\n| --- | --- |\n\n- item\n  \n  ```js\n  const x = 1\n  ```\n';
  const result = audit(source);
  assert.equal(result.inventory.code_blocks, 1);
  assert.equal(result.inventory.images, 2);
  assert.equal(result.inventory.tables, 1);
});

test('does not report a real image or codespan link syntax as a lost Markdown link', () => {
  assert.equal(has(audit('![普通图片](image.png)\n'), 'lost_markdown_link_literal'), false);
  assert.equal(has(audit('`[显示为字面的链接](target)`\n'), 'lost_markdown_link_literal'), false);
  assert.equal(has(audit('[残缺的链接](target\n'), 'lost_markdown_link_literal'), true);
});

test('reports rendered empty targets but leaves literal examples and real resource links alone', () => {
  const source = '![]()\n\n[原引用]()\n\n![]()\n\n`![]()`\n\n```text\n[字面示例]()\n```\n\n![资源](image.png)\n';
  const result = audit(source);
  const images = result.candidates.filter(item => item.rule === 'empty_image_target');
  const links = result.candidates.filter(item => item.rule === 'empty_link_target');
  assert.deepEqual(images.map(item => [item.raw, item.line]), [['![]()', 1], ['![]()', 5]]);
  assert.notEqual(images[0].id, images[1].id);
  assert.deepEqual(links.map(item => item.raw), ['[原引用]()']);
  assert.equal(result.inventory.images, 3);
  assert.equal(result.inventory.code_blocks, 1);
  assert.equal(result.candidates.some(item => ['parse_error', 'empty_code', 'fence_in_heading'].includes(item.rule)), false);
});

test('reports legacy code advisories and only flags wrong-language HTTP requests on the first line', () => {
  const source = '```text\n![原文中需要展示的架构图片](diagram.png)\n复制代码\n```\n\n```rust\nGET /path HTTP/1.1\n```\n\n```rust\nlet sample = "GET /path HTTP/1.1";\n```\n';
  const result = audit(source);
  assert.ok(has(result, 'prose_images_in_code'));
  assert.ok(has(result, 'code_web_controls'));
  assert.equal(result.candidates.filter((item) => item.rule === 'requests_wrong_language').length, 1);
});

test('locates repeated identical code candidates at their actual source lines', () => {
  const block = '```text\n![原文中需要展示的架构图片](same.png)\n```';
  const result = audit(`${block}\n\n${block}\n`);
  const candidates = result.candidates.filter((item) => item.rule === 'prose_images_in_code');
  assert.deepEqual(candidates.map((item) => item.line), [1, 5]);
  assert.notEqual(candidates[0].id, candidates[1].id);
});

test('keeps tab-normalized fenced requests inside code ranges while finding real prose requests', () => {
  const code = '```http\nGET /inside HTTP/1.1\nHost: example.invalid\n\n\tbody\n```';
  const outside = 'GET /outside HTTP/1.1';
  for (const eol of ['\n', '\r\n']) {
    const source = `${code}\n\n${outside}\n`.replace(/\n/g, eol);
    const result = audit(source);
    const requests = result.candidates.filter(item => item.rule === 'unfenced_http');
    assert.deepEqual(requests.map(item => item.raw), [outside]);
    assert.equal(requests[0].line, 8);
    assert.equal(result.inventory.code_blocks, 1);
  }
});

test('does not misclassify normal shell backticks, ordinary HTML, or nested examples as structure failures', () => {
  const source = '```sh\nvalue=`printf ok`\n```\n\n普通说明 <b>强调</b>。\n\n> 示例：\n> ```html\n> <script>text</script>\n> ```\n';
  const result = audit(source);
  assert.equal(result.candidates.filter((candidate) => ['parse_error', 'empty_code', 'fence_in_heading'].includes(candidate.rule)).length, 0);
  assert.equal(result.inventory.code_blocks, 2);
  assert.equal(result.candidates.some((candidate) => candidate.rule === 'unknown_html_literal' && candidate.raw.includes('<script>')), false);
});

test('maps repeated CRLF code ranges with preserved tabs and Unicode prefixes', () => {
  const code = '```http\r\nGET /inside HTTP/1.1\r\nHost: example.invalid\r\n\r\n\tbody\r\n```';
  const source = `前缀😀\r\n\r\n${code}\r\n\r\n${code}\r\n\r\nGET /outside HTTP/1.1\r\n`;
  const result = audit(source);
  assert.deepEqual(result.candidates.filter(item => item.rule === 'unfenced_http').map(item => [item.raw, item.line]), [['GET /outside HTTP/1.1', 17]]);
  assert.equal(result.inventory.code_blocks, 2);
  assert.equal(result.inventory.bytes, Buffer.byteLength(source));
});

test('retains earlier legacy tab-expanded token ranges before equivalent space-indented blocks', () => {
  const code = '```http\r\nGET /inside HTTP/1.1\r\nHost: example.invalid\r\n\r\n\tbody\r\n```';
  const source = `${code}\r\n\r\n${code.replace('\tbody', '    body')}\r\n\r\nGET /outside HTTP/1.1\r\n`;
  const legacyTokens = {
    ...marked,
    lexer(value, options) {
      const tokens = marked.lexer(value, options);
      for (const token of tokens) if (token.type === 'code') token.raw = token.raw.replace(/^\t/gm, '    ');
      return tokens;
    },
  };
  const result = auditArticle({ path: '样例/旧版兼容.md', source, marked: legacyTokens });
  assert.deepEqual(result.candidates.filter(item => item.rule === 'unfenced_http').map(item => [item.raw, item.line]), [['GET /outside HTTP/1.1', 15]]);
  assert.equal(result.inventory.code_blocks, 2);
  assert.equal(result.inventory.bytes, Buffer.byteLength(source));
});

test('preserves Unicode paths, full raw candidates, code text, trailing spaces and blank request lines', () => {
  const raw = 'POST /路径 HTTP/1.1\nHost: example.invalid\n\n{"token":"完整公开值"}  \n';
  const source = `---\ntitle: "中文"\n---\n\n\`\`\`http\n${raw}\`\`\`\n\nhttps://example.invalid/完整路径?q=原值\n`;
  const result = audit(source, '系统安全/样例 路径/中文.md');
  assert.equal(result.inventory.path, '系统安全/样例 路径/中文.md');
  assert.equal(has(result, 'unfenced_http'), false);
  const token = result.candidates.find((candidate) => candidate.rule === 'http_body_outside_fence');
  assert.equal(token, undefined);
  const code = marked.lexer(source).find((item) => item.type === 'code');
  assert.equal(code.text, raw.slice(0, -1));
  assert.ok(code.text.includes('\n\n{"token":"完整公开值"}  '));
  assert.equal(result.inventory.bytes, Buffer.byteLength(source));
});

test('locates mixed CRLF and LF duplicate blocks within their own top-level tokens', () => {
  const code = '```http\nGET /inside HTTP/1.1\nHost: example.invalid\n\n\tbody\n```';
  const source = `${code.replace(/\n/g, '\r\n')}\r\n\r\n${code}\n\nGET /outside HTTP/1.1\n`;
  const result = audit(source);
  assert.deepEqual(result.candidates.filter(item => item.rule === 'unfenced_http').map(item => [item.raw, item.line]), [['GET /outside HTTP/1.1', 15]]);
  assert.equal(result.inventory.code_blocks, 2);
});

test('locates legacy tab-expanded blocks before literal space-indented duplicates', () => {
  const code = '```http\nGET /inside HTTP/1.1\nHost: example.invalid\n\n\tbody\n```';
  const source = `${code}\n\n${code.replace('\tbody', '    body')}\n\nGET /outside HTTP/1.1\n`;
  const legacyTokens = {
    ...marked,
    lexer(value, options) {
      const tokens = marked.lexer(value, options);
      for (const token of tokens) if (token.type === 'code') token.raw = token.raw.replace(/^\t/gm, '    ');
      return tokens;
    },
  };
  const result = auditArticle({ path: '样例/旧版混合缩进.md', source, marked: legacyTokens });
  assert.deepEqual(result.candidates.filter(item => item.rule === 'unfenced_http').map(item => [item.raw, item.line]), [['GET /outside HTTP/1.1', 15]]);
  assert.equal(result.inventory.code_blocks, 2);
});

test('keeps fence-shaped HTML text distinct from real code under CRLF and mixed line endings', () => {
  const code = '```http\nGET /inside HTTP/1.1\nHost: example.invalid\n\n\tbody\n```';
  for (const tag of ['pre', 'textarea']) {
    for (const codeEol of ['\n', '\r\n']) {
      const source = `<${tag}>\r\n${code.replace(/\n/g, '\r\n')}\r\n</${tag}>\r\n\r\n${code.replace(/\n/g, codeEol)}\n\nGET /outside HTTP/1.1\n`;
      const result = audit(source);
      assert.deepEqual(result.candidates.filter(item => item.rule === 'unfenced_http').map(item => item.line), [3, 17]);
      assert.equal(result.candidates.filter(item => item.rule === 'unknown_html_literal').length, 1);
      assert.equal(result.inventory.code_blocks, 1);
      assert.equal(result.inventory.bytes, Buffer.byteLength(source));
    }
  }
});

test('writes stable JSONL inventory and full raw candidate values only under the requested output directory', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'render-audit-'));
  const out = path.join(root, 'report');
  fs.mkdirSync(path.join(root, 'Web安全'), { recursive: true });
  fs.writeFileSync(path.join(root, 'Web安全', '中文.md'), '```\n\n```\n');
  const summary = run({ root, out });
  assert.equal(summary.files, 1);
  assert.ok(fs.existsSync(path.join(out, 'inventory.jsonl')));
  assert.ok(fs.existsSync(path.join(out, 'candidates.jsonl')));
  assert.ok(fs.existsSync(path.join(out, 'summary.json')));
  const inventory = JSON.parse(fs.readFileSync(path.join(out, 'inventory.jsonl'), 'utf8').trim());
  assert.equal(inventory.path, 'Web安全/中文.md');
  assert.match(inventory.render_hash, /^[0-9a-f]{64}$/);
  assert.equal(summary.marked.module, require.resolve('marked'));
  assert.equal(summary.marked.version, require('marked/package.json').version);
  assert.equal(fs.readFileSync(path.join(root, 'Web安全', '中文.md'), 'utf8'), '```\n\n```\n');
  fs.rmSync(root, { recursive: true, force: true });
});


test('neutral HTTP labels and literal HTML examples are not programming-language or copied-UI warnings', () => {
  for (const language of ['text', 'plain', 'plaintext', 'txt']) {
    const result = audit('```' + language + '\nPOST /api HTTP/1.1\nHost: example.invalid\n```\n');
    assert.equal(has(result, 'requests_wrong_language'), false);
  }
  assert.equal(has(audit('```html\n<form><input name="original"></form>\n```\n'), 'code_web_controls'), false);
  assert.equal(has(audit('原文说明 function() 和 ordinary(reference)\n'), 'unfenced_source'), false);
});

test('render hashes are deterministic for unchanged source with email links', () => {
  const source = '邮箱 <author@example.invalid>\n';
  assert.equal(audit(source).inventory.render_hash, audit(source).inventory.render_hash);
});


test('frontmatter is recognized only at the document start, including a UTF8 BOM', () => {
  const body = '# 正文\n\n---\n原文中的分隔符\n';
  assert.equal(readFrontmatter('\uFEFF---\ntitle: 中文\n---\n' + body).body, body);
  assert.equal(readFrontmatter(body).body, body);
});

test('an empty or incorrect content root does not silently report a successful full scan', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'render-audit-empty-'));
  const out = path.join(root, 'report');
  assert.throws(() => run({ root, out }), /no article Markdown/);
  assert.equal(fs.existsSync(out), false);
  fs.rmSync(root, { recursive: true, force: true });
});


test('complete HTTP bodies and GET result explanations are not outside-body candidates', () => {
  const complete = '```http\nPOST /api HTTP/1.1\nContent-Type: application/json\n\n{"x":1}\n```\n\n<font>下一步说明</font>\n';
  const result = '```http\nGET /result HTTP/1.1\nHost: example.invalid\n```\n\nencodedValue== 是编码说明\n';
  assert.equal(has(audit(complete), 'http_body_outside_fence'), false);
  assert.equal(has(audit(result), 'http_body_outside_fence'), false);
});
