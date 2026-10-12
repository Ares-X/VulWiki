---
schema_version: "1"
id: "VW-20261012-osec-2026-18"
title: "OCaml Marshal 大消息长度校验后续绕过（OSEC-2026-18）"
product: "OCaml Marshal / OSEC-2026-18"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
primary_identifiers: ""
research_identifier: "OSEC-2026-18"
identifier_status: "unknown"
version: "来源测试 5.5.0；不以旧 CVE 的版本表替代本轮通告"
fixed_version: "5.5.1"
prerequisites: "程序对不可信 Marshal 数据反序列化；源实验 macOS arm64 5.5.0；大 header 的 64-bit wrap；32-bit 为静态推断。"
side_effects: "示例可能读取界外堆数据或使进程 SIGBUS；编译会生成本地文件"
source: "Akshay-M-Singh/ocaml-marshal-vulnerability"
source_status: "recorded"
source_url: "https://github.com/Akshay-M-Singh/ocaml-marshal-vulnerability/tree/c17ddb285dae08a2f83b2a8212dcbe4f50c4b564"
archive_commit: "c17ddb285dae08a2f83b2a8212dcbe4f50c4b564"
verification_source: "https://osv.dev/vulnerability/OSEC-2026-18"
referenced_identifiers: "CVE-2026-28364"
---

# OCaml Marshal 大消息长度校验后续绕过（OSEC-2026-18）

本材料分析先前 Marshal 长度检查的后续绕过，而非仅因沿用 CVE-2026-28364 就重复旧漏洞。OSEC-2026-18 与固定补丁显示，大消息长度参与总长度计算后仍需上界限制；仅检查无符号加法溢出不足以覆盖这里的边界条件。官方修复版本为 5.5.1，不能沿用前一轮 CVE 修复的 4.14.3／5.4.1 结论。

仓库提供完整 OCaml/C 验证源码、三个负对照、ASan 日志和补丁：其中短输入的泄露示例返回原数据以外的内存，另一示例触发大长度复制与崩溃。作者明确测试 macOS arm64 的 5.5.0；32 位等平台结论属于推断。受影响应用须实际反序列化不可信 Marshal 数据。所有材料仅静态阅读，未运行示例或编译环境。

## 来源

- 固定原始仓库：https://github.com/Akshay-M-Singh/ocaml-marshal-vulnerability/tree/c17ddb285dae08a2f83b2a8212dcbe4f50c4b564
- 交叉核对：https://www.cve.org/CVERecord?id=CVE-2026-28364
- 本轮修复通告：https://osv.dev/vulnerability/OSEC-2026-18

## 具体材料与审阅范围

- [poc/asan-driver.c](https://github.com/Akshay-M-Singh/ocaml-marshal-vulnerability/blob/c17ddb285dae08a2f83b2a8212dcbe4f50c4b564/poc/asan-driver.c)
- [poc/controls.ml](https://github.com/Akshay-M-Singh/ocaml-marshal-vulnerability/blob/c17ddb285dae08a2f83b2a8212dcbe4f50c4b564/poc/controls.ml)
- [poc/crash.ml](https://github.com/Akshay-M-Singh/ocaml-marshal-vulnerability/blob/c17ddb285dae08a2f83b2a8212dcbe4f50c4b564/poc/crash.ml)
- [poc/leak.ml](https://github.com/Akshay-M-Singh/ocaml-marshal-vulnerability/blob/c17ddb285dae08a2f83b2a8212dcbe4f50c4b564/poc/leak.ml)

来源固定提交日期：2026-10-05T11:09:59Z；静态审阅日期：2026-10-12。本文仅保留原创短摘要。

[官方固定修补](https://github.com/ocaml/ocaml/commit/928e7c8a950db8730e8e84105d3be347cae38f5c)。OSEC 是研究通告标识，不作为 CVE 注册号。
