# Supplementary source coverage — 2026-10-19

Verified current heads at 2026-10-19T01:17:42Z. Baseline: `34eea13f`, `docs/reviews/20261012-weekly/supplementary.json`.

Current GitHub heads all match the recovered prior inventory. Counts below are recomputed from that artifact, not newly fetched commit bodies. Dated-list query bounds were not recorded in the recovered file, so dated counts remain inherited evidence.

## nomi-sec/PoC-in-GitHub
- Fixed head: [526540d15c7c6c0559eb2f454dff84bc689be53d](https://github.com/nomi-sec/PoC-in-GitHub/commit/526540d15c7c6c0559eb2f454dff84bc689be53d)
- Baseline: 7cadb7273c96f5cff61a0952597376a759b07205
- Current head date: 2026-10-18T19:44:00Z
- Prior inventory: 64 dated commits; 56 post-baseline commits; 300 compare files
- Per-commit inventory: 28 commits, 35 pages, 1075 distinct paths
- Scope: Non-README post-baseline commits
- Coverage: Recovered per-commit page records terminate below 100 files for every inventoried commit; uniqueness counts recomputed locally.

## trickest/cve
- Fixed head: [7a40b2cacd8df33f71dce21be856511e414576ed](https://github.com/trickest/cve/commit/7a40b2cacd8df33f71dce21be856511e414576ed)
- Baseline: 5efd89da02a389826ae9a4f6b949cc365d5d3ddf
- Current head date: 2026-10-16T12:59:57Z
- Prior inventory: 6 dated commits; 5 post-baseline commits; 300 compare files
- Per-commit inventory: 5 commits, 37 pages, 3386 distinct paths
- Scope: All five post-baseline commits
- Coverage: Recovered per-commit page records terminate below 100 files for every inventoried commit; uniqueness counts recomputed locally.

## projectdiscovery/nuclei-templates
- Fixed head: [17f5725dc10ced09f464dd2d255c19957aad51e7](https://github.com/projectdiscovery/nuclei-templates/commit/17f5725dc10ced09f464dd2d255c19957aad51e7)
- Baseline: 5db11240bf1210e236e16752d18ab53a802ed1d4
- Current head date: 2026-10-17T03:13:58Z
- Prior inventory: 264 dated commits; 305 post-baseline commits; 300 compare files
- Per-commit inventory: 90 commits, 90 pages, 92 distinct paths
- Scope: Non-chore commits dated Oct12 onward only; no stopped historical batches reopened
- Coverage: Overall compare returned exactly 300 files for 305 post-baseline commits; completeness unresolved. Recovered 90-page/92-path non-chore subset does not establish full change inventory. Historical stopped batches untouched.

## rapid7/metasploit-framework
- Fixed head: [b22ce1fbae63e8caeb3a773366a6d3336bd66fb8](https://github.com/rapid7/metasploit-framework/commit/b22ce1fbae63e8caeb3a773366a6d3336bd66fb8)
- Baseline: 2d664636002d3bfee1451c6832469f2756c54d4a
- Current head date: 2026-10-16T13:36:30Z
- Prior inventory: 20 dated commits; 66 post-baseline commits; 38 compare files
- Per-commit inventory: 0 commits, 0 pages, 0 distinct paths
- Scope: Post-baseline compare path list
- Coverage: Recovered compare contains 38 files, below 300-file cap; prior worker reported complete.

## Exploit-DB official GitLab
- Fixed head: [12879ca774a9d7543907d24a7bc1cebb47959afe](https://gitlab.com/exploit-database/exploitdb/-/commit/12879ca774a9d7543907d24a7bc1cebb47959afe)
- Baseline: 12879ca774a9d7543907d24a7bc1cebb47959afe
- Current head date: 2026-10-02T00:16:12.000+00:00
- [Oct11-onward API query](https://gitlab.com/api/v4/projects/exploit-database%2Fexploitdb/repository/commits?since=2026-10-11T00%3A00%3A00Z&per_page=100): 0 commits; empty first page
- Only current branch metadata and genuinely new date window checked. No historical diff batch or site-wide content completeness claim.

No full article-content review or safety certification is implied. No GitHub writes, PoC execution, dependency installation, or scans were performed.
