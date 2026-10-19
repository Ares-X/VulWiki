---
schema_version: "1"
id: "VW-20261019-MRXN-061"
title: "H3C Magic 路由器 FastCGI 命令注入边界分析"
product: "H3C Magic NX15；NX30 Pro；NX400；R3010；BE18000"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
primary_identifiers: "CVE-2025-2725;CVE-2025-2726;CVE-2025-2732"
identifier_status: "active"
version: "实验NX15V100R012；CNA各端点型号范围不同，见正文"
prerequisites: "局域网可达；esps明确需AUTHENTICATION会话；CNA已核三项均标记PR:L，与来源概称未授权不一致"
side_effects: "写文件、创建/tmp/f FIFO、向192.168.0.1:4444反连、执行关机；仿真准备修改网络配置"
source: "Iot-Five"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/497"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
archive_title: "H3C系列部分路由器（CVE-2025-2725~2732）漏洞复现"
review_date: "2026-10-19"
referenced_identifiers: "CVE-2025-2727;CVE-2025-2728;CVE-2025-2729;CVE-2025-2730;CVE-2025-2731"
---

# H3C Magic 路由器 FastCGI 命令注入边界分析

## 原理与实验边界

Iot-Five 对 NX15V100R012 的 FastCGI 程序分析表明，`FCGI_WizardProtoProcess` 读取 POST 请求体，拼入调用 `protol_cvt.lua` 的单引号参数，再经 `FCGI_popen` 进入 `popen`。来源以 `/api/wizard/getWifiNeighbour` 展示注入链，并分析 `/api/login/auth` 的 `FCGI_UbusCmdCall` 与 `/api/esps` 的 `FCGI_EspsProcess`。分别对应 CNA CVE-2025-2732、2725、2726。

来源的 QEMU 页面显示不完整，Lua result 字段报错；接口200只证明响应，不证明注入。随后作者称写文件及 telnet反连成功，公开示例设备为 `192.168.0.2`，回连 `192.168.0.1:4444`，使用 `/tmp/f` FIFO。esps在实体机上需 `AUTHENTICATION` 会话，作者以关机观察验证；不能把文章概称“未授权”套到所有接口。CNA已核上述三项均要求局域网并使用PR:L评分，本文保留该冲突，不宣称已证明免认证。

## 不能统一套用的型号范围

CNA2725、2726、2729、2730、2731、2732描述五款设备至V100R014；但2727对应 `/api/wizard/getNetworkStatus`，仅列NX30 Pro至V100R007；2728对应 `/api/wizard/getNetworkConf`，仅列NX30 Pro与NX400至V100R014。2729、2730、2731依次为networkSetup、getssidname、getDualbandSync。原文“更改请求头即可通用”没有逐型号实验支持。本文将2732、2725、2726作为直接分析主编号，其余保留背景关联，避免用NX15单机实验证明全部八项。

## 静态风险及修复

示例对 `test' && id && '` 的17字节描述有误；不由此推改请求。反连程序创建管道、出网并清理管道，关机验证造成服务中断；仿真准备还修改IP转发和防火墙。CNA链接H3C软件下载并建议升级，但未在本次一手核对中确定各分支的精确修复号，不能将高于R014都判为安全。

## 来源与收录范围

- 原作者：Iot-Five；[原文](https://www.iotsec-zone.com/article/497)
- 汇编：Mr-xn/Penetration_Testing_POC，固定提交 `f33600e512f2ff654ec335102daf23b8a5218d24`，路径 `iot/H3C系列部分路由器（CVE-2025-2725~2732）漏洞复现.md`
- 原文授权范围未明确，本篇为独立中文综合分析，保留技术标识与公开实验值，未整篇转载代码或图片。源码截图本次未逐图核验；作者结果与本库文字审阅分别记录。完整实验材料见原文，未执行PoC、安装依赖或请求示例目标。
- 本次属于2026-10-12至2026-10-19汇编新增的历史资料，不是本周首次披露。
- [CNA CVE-2025-2725](https://www.cve.org/CVERecord?id=CVE-2025-2725)
- [CNA CVE-2025-2726](https://www.cve.org/CVERecord?id=CVE-2025-2726)
- [CNA CVE-2025-2732](https://www.cve.org/CVERecord?id=CVE-2025-2732)
- [CNA CVE-2025-2727](https://www.cve.org/CVERecord?id=CVE-2025-2727)
- [CNA CVE-2025-2728](https://www.cve.org/CVERecord?id=CVE-2025-2728)
- [CNA CVE-2025-2729](https://www.cve.org/CVERecord?id=CVE-2025-2729)
- [CNA CVE-2025-2730](https://www.cve.org/CVERecord?id=CVE-2025-2730)
- [CNA CVE-2025-2731](https://www.cve.org/CVERecord?id=CVE-2025-2731)
