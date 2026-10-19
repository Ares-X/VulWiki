---
schema_version: "1"
id: "VW-20261019-MRXN-036"
title: "D-Link DIR-825 B1 三处 CGI 命令注入分析"
product: "D-Link DIR-825 B1"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
primary_identifiers: "CVE-2019-9122;CVE-2020-10216;CVE-2020-10215"
identifier_status: "active"
version: "DIR825B1_FW210NAb02.bin；CNA为Rev.B 2.10"
prerequisites: "HTTP CGI可达；来源未充分记录认证状态，不能由无Cookie推断免认证"
side_effects: "写/www/yy.asp与/www/gg.asp；可能改变时间与诊断状态"
source: "Raz0r"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/445"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
archive_title: "D-Link DIR-825漏洞分析合集"
review_date: "2026-10-19"
---

# D-Link DIR-825 B1 三处 CGI 命令注入分析

## 三个独立输入点

Raz0r 使用 FirmAE 模拟 `DIR825B1_FW210NAb02.bin`，从启动项追踪到 `httpd`，再检查命令执行调用。以下对应均由 CNA 的产品、Rev.B 2.10、端点和参数共同确认：

- CVE-2019-9122：`ntp_sync.cgi` 的 `ntp_server`
- CVE-2020-10216：`system_time.cgi` 的 `date`
- CVE-2020-10215：`dns_query.cgi` 的 `dns_query_name`

共同根因是 CGI 输入进入 shell 命令而未正确隔离元字符，但三个入口不能合并成同一漏洞实体。后两项 CNA 还列 TRENDnet TEW-632BRP，本文实验未覆盖它。

## 来源结果及静态风险

首次定位 NTP 的 CGI 错误，作者记录验证失败；改为 `ntp_sync.cgi` 后才称成功。三份 requests 程序均向 `192.168.0.1` POST，随后 GET 文件观察输出：前两份写 `/www/yy.asp`，第三份写 `/www/gg.asp`，示例输出分别为 `ntpserve_success`、`test`、`999`。已有同名文件可能造成误判，不能将 GET 200 单独作为注入证据，也不能忽略覆盖文件的副作用。作者未提供完备认证状态对照；未取得本版本明确修复公告。

## 来源与收录范围

- 原作者：Raz0r；[原文](https://www.iotsec-zone.com/article/445)
- 汇编：Mr-xn/Penetration_Testing_POC，固定提交 `f33600e512f2ff654ec335102daf23b8a5218d24`，路径 `iot/D-Link DIR-825漏洞分析合集.md`
- 原文授权范围未明确，本篇为独立中文综合分析，保留技术标识与公开实验值，未整篇转载代码或图片。源码截图本次未逐图核验；作者结果与本库文字审阅分别记录。完整实验材料见原文，未执行PoC、安装依赖或请求示例目标。
- 本次属于2026-10-12至2026-10-19汇编新增的历史资料，不是本周首次披露。
- [CNA CVE-2019-9122](https://www.cve.org/CVERecord?id=CVE-2019-9122)
- [CNA CVE-2020-10216](https://www.cve.org/CVERecord?id=CVE-2020-10216)
- [CNA CVE-2020-10215](https://www.cve.org/CVERecord?id=CVE-2020-10215)
