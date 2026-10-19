# CVE-2026-99999 一手材料补充审计 — 2026-10-19 UTC

正文：系统安全/Linux内核/Linux IPv4 延迟校验和写入与 PwnEscape TAP 泄露探针（CVE-2026-99999）.md

原 wxvl 两篇报道的历史排除理由保留；本次另据固定公开程序、Linux CNA 与上游补丁收录原创分析。未运行 PoC 或安装工具链。

## Fixed source and scope

PeronGH/CVE-2026-99999 commit b9ebe258f01036c55c5f3722de950bb978b31856, dated 2026-10-17T07:35:29Z. Recursive GitHub tree truncated=false, six text blobs; all read fully. No workflow, binary, submodule, license or external Go module dependency. Module pwnescape; Go directive 1.27.1. Imports all standard library. The original program is not republished wholesale. The article independently summarizes it and gives four necessary original command lines and fixed links.

Tree blob hashes:
.gitignore d25c90a91338288180a51dc872a14f2268cbcd46
README.md d3a91531a14c77bad7fa1f619f748d0efdc74a52
go.mod 669161c38bc88ee365c246cd88548af3a24049cb
poc.go 35150201c8fd9369bec7f9a409846ca2dae11526
scripts/setup.sh 74de8a1aeac1c8c11ed1f6e58046ff58f87c90ae
scripts/teardown.sh 6f5742495a3bdf201b0b3ad0c9b05ce7b5ca6740

## Security and correctness audit

- Local root requirement; no privilege-escalation or host command execution chain. TAP metadata/fragmentation disclosure probe only. CNA microVM scenario does not require host credentials; keep scenarios distinct.
- setup creates/reuses named network namespace and interfaces, addresses, permanent neighbor, MTU, forwarding, rp_filter, redirects and nftables conntrack table/rule. Normal flow confines network settings to pwnesc but kernel remains shared. Existing namespace resources can be overwritten. PWNESC_INNER can bypass namespace entry; do not misrepresent as validated confinement.
- Probe lacks namespace identity check; interface overrides can target different interfaces. TAP ioctl changes attachment; page changes send-buffer property. Raw socket captures packets; terminal prints potential host-memory data. No observed unrelated remote endpoint, credential read, shell execution, persistence, package install, destructive file write or download.
- No host exploit execution done. Running the probe is not read-only and was not performed. Building can use Go toolchain acquisition if installed version mismatches; no dependencies or toolchain were installed here.
- setup ignores namespace creation error and assumes existing lab resources are compatible. teardown suppresses deletion errors and prints success regardless; live namespace processes can retain resources. Must not equate output with cleanup verification. It does not remove compiled poc.
- ipv4Of only guarantees 20 bytes, while leak slices to ihl without checking captured length: malformed capture can panic. No fix made to source. Extra-large rest/spray values not capped by parser; no adversarial execution or stress testing performed.
- Leak classification is geometric, not proof of arbitrary address readability; no nonzero check is required at this fixed commit. CONFIG_INIT_ON_ALLOC_DEFAULT_ON may yield zero tailroom. Distinguish logical skb out-of-bounds from physical allocation boundary.

## Primary corroboration

Linux upstream 6785011f8b16abf40b1e9d8b2e332232b3e68822, complete six-file diff read; added ip_check_csum_start rejects start before network_header + ip_hdrlen before checksum helper in relevant paths. Commit 2026-10-08; broader input validation not claimed complete.
https://github.com/torvalds/linux/commit/6785011f8b16abf40b1e9d8b2e332232b3e68822

Linux CNA PUBLISHED record read fully via CVEProject; published 2026-10-15, updated 2026-10-17. Eight branch fix points are carried verbatim in draft, with distribution-backport caveat.
https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/99xxx/CVE-2026-99999.json

PWN.AI original read for mechanism and distinction between disclosure and isolated full-chain research claims; pictures not pixel-reviewed, no images included. Article uses a limited independent summary, not translation.
https://www.pwn.ai/blog/pwnescape
