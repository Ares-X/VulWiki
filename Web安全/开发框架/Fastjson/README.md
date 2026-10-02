---
cve: "CVE-2026-44034"
product: "Fastjson vulnerability timeline"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: "CVE-2017-18349; CVE-2022-25845; CVE-2026-16723; CVE-2026-44034"
identifier_role: "reference"
identifier_status: "unknown"
title: "README"
prerequisites: "来源所述条件，未列明部分仍待核：Compressed <=24/47/68/80 and1.66–83/2.62 claims; no source links or constraints"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "missing"
id: "vw-4b7d6ee8750584dfe182c7cc"
entity_id: "ve-4b7d6ee8750584dfe182c7cc"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Compressed &lt;=24/47/68/80 and1.66–83/2.62 claims; no source links or constraints

代码与实验材料：No PoC; index claims only

来源证据范围：No references despite recentCVE claims

- **适用与权限边界（1）**：&lt;=1.2.24 AutoType 'needs enabled' conflates historical defaults; default gadget-free/all-version implications drop loader/JDK/network constraints。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（2）**：SafeMode 'ultimate universal' oversimplified; no actual links to included articles。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Fastjson 漏洞合集

按版本时间线排列。1.x 与 2.x 攻击面独立，2.x 不是 1.x 的"安全升级终点"——见 CVE-2026-44034。

| 版本线 | 漏洞 | 类型 |
| --- | --- | --- |
| ≤1.2.24 | CVE-2017-18349 | JNDI 注入（需开 AutoType） |
| ≤1.2.47 | cache 投毒绕过 | 无需开 AutoType |
| ≤1.2.68 | expectClass 绕过 | —— |
| ≤1.2.80 | CVE-2022-25845 | Exception 派生链 |
| **1.2.66–1.2.83** | **CVE-2026-16723** | **@JSONType 资源探测链，默认配置 gadget-free RCE** |
| **fastjson2 ≤2.0.62** | **CVE-2026-44034** | **FNV-1a 哈希碰撞白名单绕过，默认配置 RCE** |

通用终极缓解：SafeMode。
