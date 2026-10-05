'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { marked } = require('marked');
const { articleImages } = require('../scripts/image-inventory.cjs');

function inventory(source) { return articleImages(source, '样例.md'); }

test('same URL in fence, inline code, and a real image locates only the real destination', () => {
  const source = '```md\n![fake](same.png)\n```\n\n`![fake](same.png)` ![real](same.png)\n';
  const result = inventory(source);
  assert.equal(result.images.length, 1);
  const image = result.images[0];
  assert.equal(image.url, 'same.png');
  assert.equal(source.slice(image.start, image.end), 'same.png');
  assert.equal(source.slice(image.token_start, image.token_end), image.raw_token);
  assert.equal(image.raw_token, '![real](same.png)');
  assert.equal(source.slice(0, image.start).split('\n').length, 5);
});

test('HTML comments do not contribute images while active img src is indexed', () => {
  const source = '<!-- <img src="hidden.png"> -->\n<img alt="yes" src="shown.png">\n';
  const result = inventory(source);
  assert.deepEqual(result.images.map((item) => item.url), ['shown.png']);
  assert.equal(result.images[0].kind, 'html');
  assert.equal(source.slice(result.images[0].start, result.images[0].end), 'shown.png');
  assert.equal(source.slice(result.images[0].token_start, result.images[0].token_end), result.images[0].raw_token);
  assert.equal(result.images[0].raw_token, '<img alt="yes" src="shown.png">');
});

test('HTML attribute scanner ignores src-like text inside another quoted attribute', () => {
  const source = `<img alt=' src="fake.png" ' src="real.png">`;
  const result = inventory(source);
  assert.deepEqual(result.images.map((item) => item.url), ['real.png']);
  assert.equal(source.slice(result.images[0].start, result.images[0].end), 'real.png');
  assert.equal(source.slice(result.images[0].token_start, result.images[0].token_end), source);
  assert.equal(result.images[0].raw_token, source);
});

test('inline HTML img is indexed but comment and script examples are ignored', () => {
  const source = 'before <img alt="x" src="inline.png"> <!-- <img src="comment.png"> --> <script><img src="script.png"></script> after';
  const result = inventory(source);
  assert.deepEqual(result.images.map((item) => item.url), ['inline.png']);
  assert.equal(source.slice(result.images[0].start, result.images[0].end), 'inline.png');
});

test('nested linked image keeps only the inner image destination', () => {
  const source = '[![nested](image.png)](https://example.invalid)\n';
  const result = inventory(source);
  assert.deepEqual(result.images.map((item) => [item.url, item.kind]), [['image.png', 'markdown']]);
  assert.equal(source.slice(result.images[0].start, result.images[0].end), 'image.png');
});

test('image-only wrapper with identical href gets a separate exact paired-link span', () => {
  const url = 'https://example.invalid/a_(b).png?x=1&amp;y=2';
  const source = `[ ![large](<${url}>) ](<${url}>)\n[![source](image.png)](https://example.invalid/article)\n[ordinary](${url})\n`;
  const result = inventory(source);
  assert.equal(result.images.length, 2);
  assert.equal(result.image_links.length, 1);
  const pair = result.image_links[0];
  assert.equal(pair.paired_image_link, true);
  assert.equal(source.slice(pair.start, pair.end), url);
  assert.equal(pair.url, url);
});

test('ordinary links that share a reference definition force review without an apply span', () => {
  const source = '![image][shared]\n\n[ordinary][shared]\n\n[shared]: https://example.invalid/p.png\n';
  const result = inventory(source);
  assert.equal(result.images.length, 0);
  assert.ok(result.review.some((item) => item.reason === 'reference_definition_shared_with_link'));
  assert.ok(result.review.every((item) => item.start === undefined && item.end === undefined));
});

test('image-only reference definition gets an exact destination span', () => {
  const source = '![image][only]\n\n[only]: <https://example.invalid/p.png> "title"\n';
  const result = inventory(source);
  assert.equal(result.images.length, 1);
  const image = result.images[0];
  assert.equal(image.kind, 'markdown_reference');
  assert.equal(source.slice(image.start, image.end), image.raw_destination);
  assert.equal(image.url, 'https://example.invalid/p.png');
});

test('a same-URL reference-like definition in a fenced example is not the active destination span', () => {
  const source = '![image][only]\n\n```md\n[only]: https://example.invalid/p.png\n```\n\n[only]: https://example.invalid/p.png\n';
  const result = inventory(source);
  assert.equal(result.images.length, 1);
  assert.equal(result.images[0].start, source.lastIndexOf('https://example.invalid/p.png'));
  assert.equal(source.slice(result.images[0].start, result.images[0].end), result.images[0].url);
});

test('CRLF normalization preserves exact UTF-16 offsets and tabs are not mapped blindly', () => {
  const source = '说明🙂\r\n![图](same.png)\r\n\t![indented](code.png)\r\n';
  const result = inventory(source);
  assert.equal(result.images.length, 2);
  const image = result.images[0];
  assert.equal(source.slice(image.start, image.end), 'same.png');
  assert.equal(image.start, source.indexOf('same.png'));
  assert.equal(image.file_sha256.length, 64);
  const tabImage = result.images[1];
  assert.equal(source.slice(tabImage.start, tabImage.end), 'code.png');
});

test('a tab-indented line after a blank line remains code and contributes no image', () => {
  const source = 'paragraph\n\n\t![not-rendered](code.png)\n\n![real](real.png)\n';
  const result = inventory(source);
  assert.deepEqual(result.images.map((item) => item.url), ['real.png']);
  assert.equal(source.slice(result.images[0].start, result.images[0].end), 'real.png');
});

test('nested list and blockquote images are emitted or explicitly reviewed with hrefs', () => {
  const source = '1.  item\n    [![list](list.png)](list.png)\n\n> quote\n> ![](quote.png)\n\n```md\n![code](hidden.png)\n```\n';
  const result = inventory(source);
  let expected = 0;
  (function count(items) {
    for (const item of items) {
      if (item.type === 'image') expected += 1;
      count(item.tokens || []);
      for (const nested of item.items || []) count(nested.tokens || []);
    }
  })(marked.lexer(source));
  const unresolved = result.review.filter((item) => item.marked_image);
  assert.equal(result.marked_image_occurrences, expected);
  assert.equal(result.markdown_images_emitted + unresolved.length, expected);
  assert.ok(unresolved.every((item) => typeof item.href === 'string' && item.full_url === item.href));
  assert.equal(result.images.some((item) => item.url === 'hidden.png'), false);
});

test('image token with empty title remains accounted for when its parent block is normalized', () => {
  const source = '1.  first\n1.  last\n    ![](https://example.invalid/image.png "")\n';
  const result = inventory(source);
  assert.equal(result.marked_image_occurrences, 1);
  assert.equal(result.markdown_images_emitted + result.review.filter((item) => item.marked_image).length, 1);
  assert.ok(result.images[0] || result.review.some((item) => item.href === 'https://example.invalid/image.png'));
});

test('angle destinations and optional titles retain only the URL span', () => {
  const source = '![x](<https://example.invalid/a(b).png> "caption")';
  const result = inventory(source);
  assert.equal(result.images.length, 1);
  assert.equal(source.slice(result.images[0].start, result.images[0].end), 'https://example.invalid/a(b).png');
  assert.equal(source.slice(result.images[0].token_start, result.images[0].token_end), result.images[0].raw_token);
  assert.equal(result.images[0].raw_token, source);
});
