---
schema_version: "1"
id: "VW-20261019-MRXN-037"
title: "D-Link DIR-860L SSDP ST 命令注入"
product: "D-Link DIR-860L"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
primary_identifiers: "CVE-2025-9026"
identifier_status: "active"
version: "2.04.B04"
prerequisites: "可达SSDP UDP1900服务；CNA标记无需权限，实际网络边界依部署"
side_effects: "启动telnetd并连接23端口；暴露交互服务"
source: "ccc"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/510"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
archive_title: "D-Link DIR-860 未授权RCE复现(CVE-2025-9026)"
review_date: "2026-10-19"
---

# D-Link DIR-860L SSDP ST 命令注入

## 输入边界与调用链

ccc 的分析针对 2.04.B04 `htdocs/cgibin` 的 `ssdpcgi_main`。SSDP `ST` 被映射为 `HTTP_ST`，经 `lxmldbc_system` 格式化进 `/etc/scripts/upnp/M-SEARCH.sh` 命令，再传给 `system`。VulDB CNA 与产品、版本、函数、组件及命令注入类型一致，并标记产品已停止支持。

来源在 FirmAE 环境中发送 UDP M-SEARCH，公开 ST 示例为 `urn:device:1;telnetd;#`，目标端口 `1900`，随后等待三秒尝试连接 `23` 端口。请求的 HOST 字段为 `239.255.255.250:1900`，代码实际通过 sendto 发往给定设备地址，不能把头字段误认为真实发送目的地。

## 静态缺陷与结论限制

原文围栏把 `import sys` 放进语言标记，余下代码有整体缩进问题，不能视为原样可执行程序；本次不暗中修补。端口已开放、telnet 服务原先存在或网络故障均会影响结果，连通性不等于新发生命令执行。`REMOTE_ADDR`、`REMOTE_PORT` 由网络层形成，不能像 ST 一样当作任意字符串可控。开放 telnet 属于有状态操作。CNA 无修复版本，已停止支持标记不应被写成某版本已修复。

## 来源与收录范围

- 原作者：ccc；[原文](https://www.iotsec-zone.com/article/510)
- 汇编：Mr-xn/Penetration_Testing_POC，固定提交 `f33600e512f2ff654ec335102daf23b8a5218d24`，路径 `iot/D-Link DIR-860 未授权RCE复现(CVE-2025-9026).md`
- 原文授权范围未明确，本篇为独立中文综合分析，保留技术标识与公开实验值，未整篇转载代码或图片。源码截图本次未逐图核验；作者结果与本库文字审阅分别记录。完整实验材料见原文，未执行PoC、安装依赖或请求示例目标。
- 本次属于2026-10-12至2026-10-19汇编新增的历史资料，不是本周首次披露。
- [CNA CVE-2025-9026](https://www.cve.org/CVERecord?id=CVE-2025-9026)
