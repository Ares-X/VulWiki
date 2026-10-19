# SFAPE candidate source audit — 2026-10-19

## Decision
Eligible as new public technical research on a September-fixed CVE, not a newly disclosed CVE. The public article supplies a concrete repeated-Initialize trigger and exact constrained write, satisfying the requested public-trigger/pseudocode gate. A complete buildable exploit repository is not linked; do not label this a tested or turnkey PoC.

Article: 系统安全/Windows/Windows SFAPE enclave 初始化不可信指针写入 CVE-2026-83498.md

Read AGENTS.md, CONTRIBUTING.md and docs/CONTENT-SCHEMA.md in the active shared checkout. New article is original Chinese synthesis with one short technical quotation and linked primary sources. It does not replace, redact or remove any archived source. Source redistribution license was not established, so a full translation, code mirror, or image mirror was not created. The background architecture figure is not used as evidence.

## Static review coverage
Read the article's technical sections through remediation and timeline. Reviewed the API sequence, pinned build listing, repeated-initialization decompilation and effect expression, range-classifier pseudocode, clipboard wrapper/worker race, map-pointer transformation, credential-context read/write expressions, lock preconditioning, dependency-chain diagram, writable target-table globals, captured-stack adjustment, syscall stub, and copy-wrapper signatures. All are source descriptions; none was compiled or run. No PoC, DLL, scanner, payload, or example target was executed/accessed.

The initial write, range-cache corruption, plaintext zeroing, object-map pivot, lock modification, target-table replacement, register-context changes and subsequent copies are state-changing. They may crash the test process. Do not represent them as read-only validation. Target-table restoration is narrower than restoring all corrupted memory. The article does not supply a complete setup/cleanup harness, so no such harness or successful local result was invented.

## Fact checks
- Source author/date/title: Adrian Denkiewicz, Doyensec, 2026-10-13, Playing It SFAPE: Code Execution in Isolated User Mode.
- Article URL: https://blog.doyensec.com/2026/10/13/Sfape.html
- Microsoft CNA fetched using repository CVEProject/cvelistV5 blob 9e1835d0e1b277e03296797d0489b8c15bf3e99f. Confirms CVE, local authorized-attacker EoP, CWE-822, CVSS, public date and all affected branches.
- CNA URL: https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/83xxx/CVE-2026-83498.json
- CNA affected is more complete than cpeApplicability; article uses affected, including ARM64 and x64 where listed, and avoids silently inferring exclusions from sparse CPE rows.
- KB5124008 opened directly from the research article and independently confirms September 8, 2026, Windows 11 24H2/25H2, OS builds 26100.9445/26200.9445. It does not certify the author's disassembly or supply other branches' KB mappings.
- KB URL: https://support.microsoft.com/en-gb/servicing/os/windows-11/2026/09/kb5124008-windows-11-24h2-25h2-security-update
- Impact remains the author's own test enclave; no demonstrated general Secure Kernel compromise, LSASS instance compromise, or cross-enclave data extraction.

## Dedupe and integration handoff
Full body plus source-index exact-CVE search returned zero existing matches before addition (substring-only false positives excluded). The candidate has a unique ID VW-20261019-sfape-83498. Whole-tree document checks and publication verification are recorded separately in checks.md.
