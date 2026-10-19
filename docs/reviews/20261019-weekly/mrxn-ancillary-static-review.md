# Narrow fixed-source ancillary review

Repository: Mr-xn/Penetration_Testing_POC
Fixed commit: f33600e512f2ff654ec335102daf23b8a5218d24
Review date: 2026-10-19

## Scope and evidence

Static review only for ingestion of article indices 136 (DIR820L), 159 (AX9000), and 202 (DIR859). No commands from the sources, dependency installation, firmware/tool execution, scanning, or example-target requests were performed. This is not a full repository audit or a clean-binary assurance.

The fixed recursive Git tree returned 2,413 entries with truncated=false; preserved in ancillary-tree.json. Enumerated root files, all .github workflow entries, scripts entries, and iot entries. All iot blobs are Markdown. There is no candidate-local installer, build file, dependency manifest, workflow, or binary in that directory. The root has no install/build/dependency manifest. Its sole workflow is .github/workflows/rss_update.yml and its sole scripts entry is scripts/update_readme.py. Full contents of those two files and iot/README.md were read and preserved as ancillary-*.json. Root README review was scoped to the introductory warning, candidate links, installation-related keyword checks, and copyright/disclaimer section; its entire 3,453-line link catalogue was not manually audited. Existing README-head.json preserves it.

## Ancillary findings

- iot/README.md only says IOT tutorials/books; no executable instructions.
- .github/workflows/rss_update.yml schedules every three hours and permits manual dispatch. It checks out the repository, installs Python 3.11, creates a venv, installs feedparser and requests without version/hash pins, runs scripts/update_readme.py, then commits/pushes README.md using contents:write. Actions checkout@v4/setup-python@v4 use mutable major tags rather than immutable commits. These are ordinary documented update actions, with dependency/supply-chain reproducibility risk, not candidate exploit dependencies. No execution was performed.
- scripts/update_readme.py requests https://mrxn.net/rss.php with a browser-like User-Agent, parses feed entries, filters titles by keywords, and writes titles/links into the Web APP README section plus .commit_titles.txt. The source comments describe avoiding simple anti-bot filtering; we did not run or adopt that behavior. It does not fetch entry bodies, execute feed strings, upload local files, collect credentials, or invoke a shell. Feed-controlled Markdown is inserted without escaping or URL allowlisting, so the README feed content is untrusted and is not evidence of a verified vulnerability. The workflow's git commit -F reads the title file as data, not as a shell command. No unrelated downloader, exfiltration destination, persistence mechanism, or obfuscated executable content was observed in these two full files.
- The only non-Markdown changed file in compare.json is vuln_pocs/exploit-tools/discuz-ml-rce/requirements.txt. Its fetched full contents are urllib3==2.8.0, requests==2.31.0, beautifulsoup4==4.7.1. It has no install hooks in this text and is unrelated to these three articles; the rest of that separate exploit directory was not audited and dependency safety is not established.
- Root LICENSE is Apache-2.0, while README explicitly attributes collected articles/code to their original authors. Original article and externally linked tool/firmware licenses must not be inferred from the compilation license.

## Candidate-local effects and unresolved external components

### iot/小米AX9000路由器CVE-2023-26315漏洞复现.md (159)

Article body was fully read in the shard review. The inline Python imports requests and sends one authenticated request to its declared private lab IP, with a command that writes the process list to 1.txt on the router. No extra callback, data upload, downloader, or hidden local subprocess appears in that snippet. It is not read-only: the target file is created/overwritten. Lab instructions bind-mount /proc and /dev, chroot into extracted firmware, start procd/ubusd/sysapihttpd, and change/commit account.common.admin to a known lab password hash. These are disclosed privileged lab/service/credential side effects; a chroot with host mounts is not a strong security boundary. The firmware URL and luadec_miwifi reference are external components without pinned source commits or integrity verification in the article. They were not downloaded, executed, or recursively audited. Lua obfuscation is described as a property of the firmware, not hidden behavior in the inline PoC. Root README's similarly named books HTML link is a separate archival article and was not required or executed by this Markdown.

### iot/从看<漏洞复现到简单0day漏洞挖>后的简单0day挖掘.md (136)

Full body review establishes a long nextPage request to /ping.ccp with ccp_act=cancelPing, login cookies and a private lab address. It is a crash/overflow demonstration, not an independently verified RCE. No additional downloader, persistence, exfiltration, or executable obfuscation appears in the request. FirmAE sudo init.sh/run.sh commands invoke external lab tooling and firmware, not scripts present alongside this article. The article does not pin or provide their full implementation, so their installation/download/build behavior is unreviewed. Vendor firmware is linked, not inspected. Running these privileged emulation steps would require a separate review and authorization.

### iot/通过Fap进行upnp漏洞分析之CVE-2022-25106.md (202)

Full body review includes all shown makeImage.sh modifications, debug commands and Python exploit. The shown firmware patch copies busybox-mips/gdbserver-mips, marks them executable, and appends a shell-backed telnet daemon to rcS, causing persistent startup exposure inside the modified lab firmware. The alternative recipe similarly changes rcS. It disables ASLR, starts a debug attachment loop on port 9999, and mentions port forwarding. These are explicit lab changes, not covert unrelated persistence. The inline ROP payload starts a shell-backed telnet daemon on port 4445; local os.system launches a telnet client to the declared private IP. This is consequential exploitation and shell exposure, not a harmless check. No separate exfiltration endpoint or unexpected downloader is present in the shown snippet. Hardcoded libc/gadget addresses, Python-2-style byte/string handling and the modified ASLR-disabled environment constrain portability. FAP/Firmadyne, QEMU, BusyBox, gdbserver, rinetd, pwntools, firmware release binaries and linked discovery/fuzzing tools are external/unpinned or locally sourced, not audited here. The copied binary provenance and integrity are unknown. The article's script fragments do not constitute inspection of those complete external scripts.

## Admission implication

The inspected ancillary text adds no newly identified unrelated malicious behavior that would by itself bar original, source-attributed summaries of these three articles. Do not describe this as a repository-wide safety pass, validated exploit, approved execution, or verified dependency/binary supply chain. Preserve the authentication and lab-only conditions, explicit state-changing effects, source/version correspondence limits, and unknown original licensing already recorded in the article ledger. No executable components need to be imported to ingest a summary.
