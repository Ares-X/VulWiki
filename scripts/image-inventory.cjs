'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { marked } = require('marked');

const ARTICLE_ROOTS = ['Web安全', '系统安全', 'IOT安全'];

function normalizeCRLF(source) {
  let text = '';
  const starts = [];
  const ends = [];
  for (let i = 0; i < source.length; i += 1) {
    if (source[i] === '\r' && source[i + 1] === '\n') {
      text += '\n';
      starts.push(i);
      ends.push(i + 2);
      i += 1;
    } else if (source[i] === '\t') {
      // Marked expands tabs to four spaces before lexing. Record every output
      // code unit back to the one source tab so offsets after indentation map
      // to the original UTF-16 string without guessing.
      for (let column = 0; column < 4; column += 1) {
        text += ' ';
        starts.push(i);
        ends.push(i + 1);
      }
    } else {
      text += source[i];
      starts.push(i);
      ends.push(i + 1);
    }
  }
  return { text, starts, ends };
}

function frontmatterBody(source) {
  const match = source.match(/^---[ \t]*\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/);
  return match ? { body: source.slice(match[0].length), offset: match[0].length } : { body: source, offset: 0 };
}

function markdownDestination(raw, image = false) {
  // The raw token is Marked evidence; this parser only locates the destination
  // span inside that exact token, including balanced label/URL parentheses.
  let i = 0;
  if (image) {
    if (raw[i] !== '!') return null;
    i += 1;
  }
  if (raw[i] !== '[') return null;
  let depth = 1;
  let escaped = false;
  for (i += 1; i < raw.length; i += 1) {
    const c = raw[i];
    if (escaped) escaped = false;
    else if (c === '\\') escaped = true;
    else if (c === '[') depth += 1;
    else if (c === ']' && --depth === 0) break;
  }
  if (depth !== 0) return null;
  i += 1;
  while (/[ \t\r\n]/.test(raw[i] || '')) i += 1;
  if (raw[i] !== '(') {
    let reference = raw.slice(i).trim();
    if (reference.startsWith('[') && reference.endsWith(']')) reference = reference.slice(1, -1);
    if (!reference) {
      const label = raw.slice(2, raw.indexOf(']'));
      reference = label;
    }
    return { reference: reference.trim().toLowerCase() };
  }
  i += 1;
  while (/[ \t\r\n]/.test(raw[i] || '')) i += 1;
  if (raw[i] === ')') return null;
  const angle = raw[i] === '<';
  if (angle) i += 1;
  const start = i;
  escaped = false;
  let parens = 0;
  for (; i < raw.length; i += 1) {
    const c = raw[i];
    if (escaped) escaped = false;
    else if (c === '\\') escaped = true;
    else if (angle && c === '>') break;
    else if (!angle && c === '(') parens += 1;
    else if (!angle && c === ')') {
      if (parens === 0) break;
      parens -= 1;
    } else if (!angle && /[ \t\r\n]/.test(c)) break;
  }
  if (i === start || (angle && raw[i] !== '>')) return null;
  return { start, end: i, raw_destination: raw.slice(start, i), angle };
}

function imageDestination(raw) { return markdownDestination(raw, true); }

function tokenChildren(token) {
  const children = [];
  if (Array.isArray(token.tokens)) children.push(...token.tokens);
  if (Array.isArray(token.items)) {
    for (const item of token.items) if (Array.isArray(item.tokens)) children.push(...item.tokens);
  }
  for (const row of [...(token.header || []), ...(token.rows || []).flat()]) {
    if (row && Array.isArray(row.tokens)) children.push(...row.tokens);
  }
  return children;
}

function articleImages(source, articlePath = '') {
  const { body, offset: bodyOffset } = frontmatterBody(source);
  const normalized = normalizeCRLF(body);
  const images = [];
  const image_links = [];
  const review = [];
  const pendingReferences = [];
  const handledImageTokens = new WeakSet();
  let tokens;
  try {
    tokens = marked.lexer(normalized.text);
  } catch (error) {
    return { images, review: [{ path: articlePath, reason: 'marked_parse_error', detail: String(error.message || error) }] };
  }

  function originalSpan(start, end) {
    if (start < 0 || end <= start || end > normalized.starts.length) return null;
    return { start: bodyOffset + normalized.starts[start], end: bodyOffset + normalized.ends[end - 1] };
  }

  function destinationRecord(token, tokenStart, tokenRaw, kind) {
    handledImageTokens.add(token);
    const destination = imageDestination(tokenRaw);
    if (!destination) {
      review.push({ path: articlePath, kind, reason: 'destination_span_unresolved', token: tokenRaw,
        href: token.href, full_url: token.href, marked_image: true });
      return;
    }
    if (destination.reference) {
      pendingReferences.push({ token, reference: destination.reference, tokenRaw, tokenStart });
      return;
    }
    const span = originalSpan(tokenStart + destination.start, tokenStart + destination.end);
    const tokenSpan = originalSpan(tokenStart, tokenStart + tokenRaw.length);
    if (!span || !tokenSpan || source.slice(span.start, span.end) !== destination.raw_destination) {
      review.push({ path: articlePath, kind, reason: 'source_span_mismatch', token: tokenRaw,
        href: token.href, full_url: token.href, marked_image: true });
      return;
    }
    images.push({ path: articlePath, url: destination.raw_destination, start: span.start, end: span.end,
      token_start: tokenSpan.start, token_end: tokenSpan.end, raw_token: source.slice(tokenSpan.start, tokenSpan.end),
      raw_destination: destination.raw_destination, kind, rendered_target: token.href, apply_safe: true });
  }

  function pairedImageLink(token, tokenStart, tokenRaw) {
    if (token.type !== 'link') return;
    const children = tokenChildren(token);
    const innerImages = children.filter((child) => child.type === 'image');
    const labelOnlyImage = innerImages.length === 1 && children.every((child) =>
      child.type === 'image' || (child.type === 'text' && /^\s*$/.test(child.text || '')));
    if (!labelOnlyImage || token.href !== innerImages[0].href) return;
    const destination = markdownDestination(tokenRaw, false);
    if (!destination || destination.reference) return;
    const span = originalSpan(tokenStart + destination.start, tokenStart + destination.end);
    if (!span || source.slice(span.start, span.end) !== destination.raw_destination) {
      review.push({ path: articlePath, reason: 'paired_image_link_span_unresolved', token: tokenRaw });
      return;
    }
    image_links.push({ path: articlePath, url: destination.raw_destination, start: span.start, end: span.end,
      raw_destination: destination.raw_destination, kind: 'markdown_image_link', rendered_target: token.href,
      image_url: innerImages[0].href, paired_image_link: true, apply_safe: true });
  }

  function inlineWalk(parent, parentStart, parentRaw) {
    let cursor = 0;
    for (const child of tokenChildren(parent)) {
      const raw = child.raw || '';
      if (!raw) continue;
      const at = parentRaw.indexOf(raw, cursor);
      if (at < 0) {
        if (child.type === 'image') {
          handledImageTokens.add(child);
          review.push({ path: articlePath, reason: 'token_source_not_exact', token: raw,
            href: child.href, full_url: child.href, marked_image: true });
        } else if (child.type === 'html' && /<img\b/i.test(raw)) {
          review.push({ path: articlePath, reason: 'token_source_not_exact', token: raw });
        }
        continue;
      }
      cursor = at + raw.length;
      if (child.type === 'image') destinationRecord(child, parentStart + at, raw, 'markdown');
      if (child.type === 'link') pairedImageLink(child, parentStart + at, raw);
      if (child.type === 'html' && !child.inRawBlock) collectHtmlImages(child, parentStart + at, raw);
      if (tokenChildren(child).length) inlineWalk(child, parentStart + at, raw);
    }
  }

  // Match top-level raw tokens in order. This ensures a URL repeated in a
  // fenced block cannot be mistaken for a later Markdown image destination.
  let cursor = 0;
  const codeRanges = [];
  for (const token of tokens) {
    if (token.type === 'links') continue;
    const raw = token.raw || '';
    if (!raw) continue;
    const at = normalized.text.indexOf(raw, cursor);
    if (at < 0) {
      const unresolved = [];
      (function findImages(item) {
        if (item.type === 'image' || (item.type === 'html' && /<img\b/i.test(item.raw || ''))) unresolved.push(item.raw || '');
        for (const child of tokenChildren(item)) findImages(child);
      })(token);
      // Actual Markdown image descendants are reconciled below, where their
      // Marked href is retained even when a container rewrite defeats mapping.
      for (const item of unresolved) {
        if (token.type === 'html') review.push({ path: articlePath, reason: 'html_token_source_not_exact', token: item });
      }
      continue;
    }
    cursor = at + raw.length;
    if (token.type === 'code') codeRanges.push([at, at + raw.length]);
    if (token.type === 'image') destinationRecord(token, at, raw, 'markdown');
    inlineWalk(token, at, raw);
    if (token.type === 'html') collectHtmlImages(token, at, raw);
  }

  function collectHtmlImages(token, tokenStart, raw) {
    if (token.inRawBlock) return;
    const rawElements = new Set(['script', 'style', 'textarea', 'title', 'xmp', 'iframe', 'noembed', 'noframes', 'plaintext']);
    let i = 0;
    while (i < raw.length) {
      const start = raw.indexOf('<', i);
      if (start < 0) break;
      if (raw.startsWith('<!--', start)) {
        const end = raw.indexOf('-->', start + 4);
        i = end < 0 ? raw.length : end + 3;
        continue;
      }
      const open = /^<([A-Za-z][\w:-]*)\b/.exec(raw.slice(start));
      if (!open) { i = start + 1; continue; }
      const tagName = open[1].toLowerCase();
      let end = start + open[0].length;
      let quote = null;
      for (; end < raw.length; end += 1) {
        const c = raw[end];
        if (quote) { if (c === quote) quote = null; }
        else if (c === '"' || c === "'") quote = c;
        else if (c === '>') break;
      }
      if (end >= raw.length) break;
      const tag = raw.slice(start, end + 1);
      if (rawElements.has(tagName)) {
        if (tagName === 'plaintext') break;
        const close = new RegExp(`<\\/${tagName}\\s*>`, 'ig');
        close.lastIndex = end + 1;
        const closing = close.exec(raw);
        i = closing ? close.lastIndex : raw.length;
        continue;
      }
      i = end + 1;
      if (tagName !== 'img') continue;
      const srcAttributes = htmlAttributes(tag, open[0].length).filter((attribute) => attribute.name === 'src');
      if (srcAttributes.length > 1) {
        review.push({ path: articlePath, reason: 'html_duplicate_src_attributes', token: tag,
          src_values: srcAttributes.map((attribute) => attribute.value) });
        continue;
      }
      if (!srcAttributes.length || !srcAttributes[0].value) {
        const responsive = htmlAttributes(tag, open[0].length).some((attribute) =>
          attribute.name === 'srcset' && attribute.value && attribute.value.trim());
        if (!responsive) review.push({ path: articlePath, reason: 'html_image_without_source', token: tag });
        continue;
      }
      const attribute = srcAttributes[0];
      const span = originalSpan(tokenStart + start + attribute.valueStart, tokenStart + start + attribute.valueEnd);
      const tokenSpan = originalSpan(tokenStart + start, tokenStart + end + 1);
      if (!span || !tokenSpan || source.slice(span.start, span.end) !== attribute.value) {
        review.push({ path: articlePath, reason: 'html_src_span_mismatch', token: tag });
        continue;
      }
      images.push({ path: articlePath, url: attribute.value, start: span.start, end: span.end,
        token_start: tokenSpan.start, token_end: tokenSpan.end,
        raw_token: source.slice(tokenSpan.start, tokenSpan.end), raw_destination: attribute.value,
        kind: 'html', rendered_target: attribute.value, apply_safe: true });
    }
  }

  function htmlAttributes(tag, start) {
    const attributes = [];
    let i = start;
    while (i < tag.length - 1) {
      while (/[\s/]/.test(tag[i] || '') && i < tag.length - 1) i += 1;
      if (tag[i] === '>') break;
      const nameStart = i;
      while (i < tag.length && !/[\s=/>]/.test(tag[i])) i += 1;
      if (i === nameStart) { i += 1; continue; }
      const name = tag.slice(nameStart, i).toLowerCase();
      while (/\s/.test(tag[i] || '')) i += 1;
      if (tag[i] !== '=') {
        attributes.push({ name, value: null, valueStart: i, valueEnd: i });
        continue;
      }
      i += 1;
      while (/\s/.test(tag[i] || '')) i += 1;
      const quote = tag[i] === '"' || tag[i] === "'" ? tag[i++] : null;
      const valueStart = i;
      if (quote) {
        while (i < tag.length && tag[i] !== quote) i += 1;
      } else {
        while (i < tag.length && !/[\s>]/.test(tag[i])) i += 1;
      }
      const valueEnd = i;
      if (quote && tag[i] === quote) i += 1;
      attributes.push({ name, value: tag.slice(valueStart, valueEnd), valueStart, valueEnd });
    }
    return attributes;
  }

  // Marked's lexer keeps reference definitions in a side table. Leave those
  // Resolve definition spans only when no ordinary link shares that label.
  const allLinks = [];
  (function gather(items) {
    for (const item of items) {
      if (item.type === 'link' || item.type === 'image') allLinks.push(item);
      gather(tokenChildren(item));
    }
  })(tokens);
  const referenceLabel = (raw, image) => {
    const close = raw.indexOf(']');
    if (close < 0) return null;
    const suffix = raw.slice(close + 1).trim();
    if (suffix.startsWith('[') && suffix.endsWith(']')) return (suffix.slice(1, -1) || raw.slice(image ? 2 : 1, close)).trim().toLowerCase();
    if (!suffix || suffix.startsWith(' ')) return raw.slice(image ? 2 : 1, close).trim().toLowerCase();
    return null;
  };
  for (const pending of pendingReferences) {
    const definitionEntry = tokens.links && tokens.links[pending.reference];
    if (!definitionEntry) {
      review.push({ path: articlePath, reason: 'reference_definition_not_found', token: pending.tokenRaw,
        href: pending.token.href, full_url: pending.token.href, marked_image: true });
      continue;
    }
    const shared = allLinks.some((item) => item.type === 'link' && referenceLabel(item.raw || '', false) === pending.reference);
    if (shared) {
      review.push({ path: articlePath, reason: 'reference_definition_shared_with_link', token: pending.tokenRaw,
        href: pending.token.href, full_url: pending.token.href, marked_image: true });
      continue;
    }
    const escaped = pending.reference.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const definition = new RegExp(`^ {0,3}\\[${escaped}\\]:[ \\t]*(<[^>]*>|[^\\s]+)`, 'gim');
    const matches = [...normalized.text.matchAll(definition)];
    const activeMatches = matches.filter((candidate) => {
      const at = candidate.index;
      const inCode = codeRanges.some(([start, end]) => start <= at && at < end);
      const destinationText = candidate[1];
      const rawValue = destinationText.startsWith('<') ? destinationText.slice(1, -1) : destinationText;
      return !inCode && rawValue === definitionEntry.href;
    });
    if (activeMatches.length !== 1) {
      review.push({ path: articlePath, reason: 'reference_definition_not_found', token: pending.tokenRaw,
        href: pending.token.href, full_url: pending.token.href, marked_image: true });
      continue;
    }
    const match = activeMatches[0];
    const destinationText = match[1];
    const angle = destinationText.startsWith('<');
    const rawDestination = angle ? destinationText.slice(1, -1) : destinationText;
    const localStart = match.index + match[0].indexOf(destinationText) + (angle ? 1 : 0);
    const span = originalSpan(localStart, localStart + rawDestination.length);
    if (!span || source.slice(span.start, span.end) !== rawDestination) {
      review.push({ path: articlePath, reason: 'reference_definition_span_mismatch', token: pending.tokenRaw,
        href: pending.token.href, full_url: pending.token.href, marked_image: true });
      continue;
    }
    images.push({ path: articlePath, url: rawDestination, start: span.start, end: span.end,
      token_start: originalSpan(pending.tokenStart, pending.tokenStart + pending.tokenRaw.length)?.start,
      token_end: originalSpan(pending.tokenStart, pending.tokenStart + pending.tokenRaw.length)?.end,
      raw_token: (() => { const range = originalSpan(pending.tokenStart, pending.tokenStart + pending.tokenRaw.length); return range ? source.slice(range.start, range.end) : pending.tokenRaw; })(),
      raw_destination: rawDestination, kind: 'markdown_reference', rendered_target: pending.token.href, apply_safe: true });
  }
  let marked_image_occurrences = 0;
  (function reconcile(items) {
    for (const item of items) {
      if (item.type === 'image') {
        marked_image_occurrences += 1;
        if (!handledImageTokens.has(item)) {
          handledImageTokens.add(item);
          review.push({ path: articlePath, reason: 'marked_image_unlocated', token: item.raw || '',
            href: item.href, full_url: item.href, marked_image: true });
        }
      }
      reconcile(tokenChildren(item));
    }
  })(tokens);
  const file_sha256 = crypto.createHash('sha256').update(Buffer.from(source, 'utf8')).digest('hex');
  const markdown_images_emitted = images.filter((item) => item.kind !== 'html').length;
  const html_image_occurrences = images.length - markdown_images_emitted;
  return { images: images.map((item) => ({ ...item, file_sha256 })),
    image_links: image_links.map((item) => ({ ...item, file_sha256 })),
    marked_image_occurrences,
    markdown_images_emitted,
    html_image_occurrences,
    review: review.map((item) => ({ ...item, file_sha256 })) };
}

function walkMarkdown(root, folder, out) {
  const directory = path.join(root, folder);
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.resource') continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walkMarkdown(root, path.relative(root, full), out);
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full);
  }
}

function collect(root) {
  const files = [];
  for (const folder of ARTICLE_ROOTS) walkMarkdown(root, folder, files);
  const images = [];
  const image_links = [];
  const review = [];
  let marked_image_occurrences = 0;
  let markdown_images_emitted = 0;
  let html_image_occurrences = 0;
  for (const filename of files.sort()) {
    const bytes = fs.readFileSync(filename);
    const source = bytes.toString('utf8');
    const relative = path.relative(root, filename).split(path.sep).join('/');
    const found = articleImages(source, relative);
    const file_sha256 = crypto.createHash('sha256').update(bytes).digest('hex');
    images.push(...found.images.map((item) => ({ ...item, file_sha256 })));
    image_links.push(...found.image_links.map((item) => ({ ...item, file_sha256 })));
    marked_image_occurrences += found.marked_image_occurrences;
    markdown_images_emitted += found.markdown_images_emitted;
    html_image_occurrences += found.html_image_occurrences;
    review.push(...found.review.map((item) => ({ ...item, file_sha256 })));
  }
  return { schema_version: 1, root: path.resolve(root), article_files: files.length,
    marked_image_occurrences, markdown_images_emitted, html_image_occurrences, images, image_links, review };
}

function main(argv) {
  let root = path.resolve(__dirname, '..');
  let out;
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--root') root = path.resolve(argv[++i]);
    else if (argv[i] === '--out') out = path.resolve(argv[++i]);
    else throw new Error(`unknown argument: ${argv[i]}`);
  }
  if (!out) throw new Error('--out is required');
  const result = collect(root);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  process.stdout.write(`${JSON.stringify({ out, article_files: result.article_files, marked_image_occurrences: result.marked_image_occurrences,
    markdown_images_emitted: result.markdown_images_emitted, html_image_occurrences: result.html_image_occurrences,
    unresolved_marked_images: result.review.filter((item) => item.marked_image).length,
    image_links: result.image_links.length, review: result.review.length })}\n`);
}

if (require.main === module) {
  try { main(process.argv.slice(2)); }
  catch (error) { process.stderr.write(`${error.message || error}\n`); process.exitCode = 2; }
}

module.exports = { collect, articleImages };
