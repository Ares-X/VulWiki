---
schema_version: "1"
prerequisites: "登录并具备正确 HNAP_AUTH 与 Cookie；SetTriggerWPS PIN 分支可达"
side_effects: "目标命令执行，仿真和固件解密准备改变环境"
id: "VW-20261019-MRXN-026"
title: "D-Link COVR SetTriggerWPS PIN 命令注入"
product: "D-Link COVR1200/1202/1203"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
primary_identifiers: "CVE-2022-42161"
identifier_status: "active"
version: "v1.08；解包例另用FW103b10"
source: "Ayaka"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/283"
review_date: "2026-10-19"
---

# D-Link COVR SetTriggerWPS PIN 命令注入

## 触发与认证

[CNA](https://www.cve.org/CVERecord?id=CVE-2022-42161)将问题对应至 COVR1200/1202/1203 v1.08 的 SetTriggerWPS/PIN。来源公开完整 SOAP 消息体：SetTriggerWPS 的 ACTION 为 PIN，PIN 值使用反引号包裹命令。原文同时明确，仅有该 XML 不够，还需登录并计算正确 HNAP_AUTH 和 Cookie。CISA ADP 的 PR:L 与这一前提相符。

## 实验范围与缺口

来源下载链接写 COVR-C1203_REVA_FIRMWARE_v1.08B10.zip，但解包命令写 COVR-C1200_A1_FW103b10.bin，无法将每张实验截图绑定到同一精确镜像。仿真中处理 WAN 初始化页面、丢弃初始化请求，只是环境设置，不构成该漏洞的认证绕过。

作者未公开认证计算脚本，称原研究详情已删除。本文只收录公开 XML 和函数对应的分析，不补写缺失签名流程。解密流程使用其他型号固件中的 imgdecrypt、QEMU及FirmAE，涉及未审计外部二进制与固件修改；注入内容将执行命令。不存在可据此确认的修复版本或通用无认证 PoC。

## 来源与审阅范围

作者：Ayaka；[原文](https://www.iotsec-zone.com/article/283)。固定归档：[Mr-xn/Penetration_Testing_POC](https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/D-Link%20COVR%20CVE-2022-42161%E5%A4%8D%E7%8E%B0.md)。来源日期：2022历史研究。本次属于2026-10-12至19日新增汇编材料，不代表本周首次披露。原文授权未明确，本文为独立中文技术摘要，完整样例保留在固定来源，未改写或脱敏原文。

已全文审阅固定 Markdown 及其中代码、命令、请求；图片未逐图检查。未执行、安装、下载固件或访问示例目标。源目录只有 Markdown，无该文章配套安装清单；汇编工作流及 README 更新程序的静态范围见本轮审计，外部工具、固件及依赖没有获得执行安全背书。
