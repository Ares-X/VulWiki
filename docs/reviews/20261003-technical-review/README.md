# VulWiki Round 3 audit package

This portable, read-only review package covers the article set at repository commit `d8178134424d0d2f6e051454d8ea761bc2049901`.

## Contents

- `article-ledger.jsonl`: one row per 2,960 in-scope articles. It preserves the normalized article fields, dimension-specific findings, exact frontmatter values, primary and referenced identifiers, line numbers, and original SHA-256. Each row points to the immutable Git blob by commit and path; the same blob can be fetched through `portable_article_source.git_blob_url`.
- `official-evidence-index.jsonl`: one shared row per 1,951 unique identifiers, including each record's selected CNA evidence fields, state, rejected reasons, replacements, pinned raw URL, raw JSON SHA-256, original cache-path provenance, and an index-local reference. `version_review_extracted_fields` preserves the earlier review's normalized optional-field values where raw CNA JSON omits those keys. Raw records are not copied into this package: where a pinned URL and hash exist, retrieve the complete raw JSON from that URL and verify its bytes against the hash. This avoids storing duplicate raw records while retaining reproducible evidence.
- `version-review.jsonl`: 46 article-level version assessments. The assessments and exact article lines remain here; official CNA details are shared through `shared_official_evidence_index` and the record references rather than duplicated in each article.
- `product-mismatch-review.jsonl`: 13 manually context-reviewed articles covering 14 article/identifier pairs. Each cited excerpt is retained alongside the complete exact source line, and each official product record resolves through the shared index.
- `manifest.json`: counts, source provenance, and SHA-256/byte size for each package file and copied raw record.

## Scope and interpretation

This package is a static evidence and review ledger. `unknown` means the available evidence did not establish that dimension; it does not mean the article was manually verified, passed review, or is unaffected. The broad ledger is an automated conservative comparison unless a row has a separate linked manual review. A successful download or identifier/product string match is not by itself verification. HTTP errors, including 404, are retained as retrieval outcomes and do not establish that a CVE does not exist.

For 1,804 cached records, the index preserves the pinned URL and the SHA-256 of the complete retrieved JSON bytes. The package does not include those bytes; retrieving from the pinned URL and validating the hash reproduces the full record. Five retrieval errors retain their URL and HTTP status; 142 identifiers have no cached record or pinned URL. These states do not establish that a CVE does not exist.

Article `source`, URL, body, and metadata values are review inputs and remain unchanged in this package. Evidence excerpts are not sanitized or shortened. Nothing in the source articles was executed, and no target was contacted.

## Rebuilding source evidence

Retrieve an article from the repository using the `source_commit` and `path` fields, for example:

```sh
git show d8178134424d0d2f6e051454d8ea761bc2049901:'Web安全/中间件/Apache Tomcat/Apache Tomcat 信息泄露漏洞 CVE-2021-24122.md'
```

Resolve an official record using its `official-evidence-index.jsonl#<identifier>` reference. When `pinned_url` and `raw_json_sha256` are present, retrieve the complete raw JSON and compare its SHA-256. A row without a pinned URL has no captured retrieval location.

All original `/tmp` cache and matrix paths are retained as provenance alongside a usable shared-index or pinned-Git recovery reference. The intermediate 207 MB full matrix is not bundled; normalized per-article results are in this package, and exact article text is recoverable from the pinned commit.
