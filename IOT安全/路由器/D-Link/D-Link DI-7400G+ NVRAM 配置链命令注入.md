---
schema_version: "1"
id: "VW-20261019-MRXN-030"
title: "D-Link DI-7400G+ NVRAM 配置链命令注入"
product: "D-Link DI-7400G+"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
primary_identifiers: "CVE-2025-57105"
identifier_status: "active"
version: "DI_7400G+-19.12.25A1.trx"
prerequisites: "来源使用admin/admin登录；opt=proxy且proxy_ac_status、ac_server_enable均为1"
side_effects: "修改NVRAM配置、开启AC服务、执行命令并写/tmp/poc.txt"
source: "xyh4ck"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/511"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
archive_title: "D-Link DI-7400G+命令注入漏洞（CVE-2025-57105）"
review_date: "2026-10-19"
---

# D-Link DI-7400G+ NVRAM 配置链命令注入

## 两阶段输入流

xyh4ck 的分析将 `mng_platform.asp` 的 `addr` 参数写入 NVRAM 项 `ac_mng_srv_host`；`wayos_ac_server.asp` 对应处理函数再取出该项，构造 `proxy_client` 命令交给 `jhl_system`。CNA 明确对应 `sub_478D28`、`sub_4A12DC` 与这一 NVRAM 项，因而不是仅凭编号归类。

来源采用 FirmAE 模拟 `DI_7400G+-19.12.25A1.trx`，先以 `admin/admin` 登录并启用 AC 服务，再植入配置并触发。必须同时保留 `opt=proxy`、`proxy_ac_status == "1"`、`ac_server_enable == "1"` 三项前提。其公开验证写入 `/tmp/poc.txt`，属于有状态配置链。不能把其他数据库的无权限评分直接解释为本实验已完成认证绕过。

## 修复与代码边界

[D-Link SAP10454](https://supportannouncement.us.dlink.com/security/publication.aspx?name=SAP10454)列出此漏洞并建议退役替换；页面状态“Resolved”不是修复固件证明。公告概述和表格的停服年份有冲突，本文不选取其一作为精确停服日期。这里只核对正文伪代码，所链接 iot_poc 仓库的动态内容不继承为已审代码，不安装或运行。

## 来源与收录范围

- 原作者：xyh4ck；[原文](https://www.iotsec-zone.com/article/511)
- 汇编：Mr-xn/Penetration_Testing_POC，固定提交 `f33600e512f2ff654ec335102daf23b8a5218d24`，路径 `iot/D-Link DI-7400G+命令注入漏洞（CVE-2025-57105）.md`
- 原文授权范围未明确，本篇为独立中文综合分析，保留技术标识与公开实验值，未整篇转载代码或图片。源码截图本次未逐图核验；作者结果与本库文字审阅分别记录。完整实验材料见原文，未执行PoC、安装依赖或请求示例目标。
- 本次属于2026-10-12至2026-10-19汇编新增的历史资料，不是本周首次披露。
- [CNA CVE-2025-57105](https://www.cve.org/CVERecord?id=CVE-2025-57105)
