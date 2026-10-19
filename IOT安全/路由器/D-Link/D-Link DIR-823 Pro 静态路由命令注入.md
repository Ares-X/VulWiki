---
schema_version: "1"
id: "VW-20261019-MRXN-033"
title: "D-Link DIR-823 Pro 静态路由命令注入"
product: "D-Link DIR-823 Pro"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
primary_identifiers: "CVE-2021-46453"
identifier_status: "active"
version: "V1.0.2；厂商列v1.0.2及以下"
prerequisites: "LAN侧管理接口可达；来源请求要求实际HNAP认证值"
side_effects: "修改静态路由配置；启动绑定0.0.0.0的10000端口telnet shell"
source: "0431物联卫士实验室"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/128"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
archive_title: "D-Link DIR-823 Pro命令执行"
review_date: "2026-10-19"
---

# D-Link DIR-823 Pro 静态路由命令注入

## 对应关系与调用链

0431物联卫士实验室分析 V1.0.2 的 `/HNAP1/`、`SetStaticRouteSettings` 操作。`prog.cgi` 的 `sub_43730C` 读取 `staticroute_list`，逗号分割后进入 `sub_437028`，经 `sprintf` 拼接，再由 `libfcgi.so.0.0.0` 中的 `FCGI_popen` 调用 `popen`。CNA CVE-2021-46453 精确对应同产品、版本、函数和参数；原题未写编号，现依据这一对应登记。

来源构造 JSON 请求，设备地址 `192.168.100.1`，路由示例 `192.168.1.1,255.255.255.255,192.168.0.1`，随后尝试连接 `10000` 端口并称成功。原始 `HNAP_AUTH` 与 `PrivateKey` 本来就是星号占位，不能猜测补全。请求包含实际认证要求，不能从外部评分推断本文证明未授权入口。

## 风险与修复

来源开启绑定 `0.0.0.0` 的 telnet shell，并涉及网络配置写入。是否为 root 应以实际进程权限为证，不能只由“配置网络”推出。[厂商 SAP10285](https://supportannouncement.us.dlink.com/announcement/publication.aspx?name=SAP10285)将此项列为 LAN 侧漏洞，受影响固件为 v1.0.2 及以下，建议退役替换；未列可用修复版本。

## 来源与收录范围

- 原作者：0431物联卫士实验室；[原文](https://www.iotsec-zone.com/article/128)
- 汇编：Mr-xn/Penetration_Testing_POC，固定提交 `f33600e512f2ff654ec335102daf23b8a5218d24`，路径 `iot/D-Link DIR-823 Pro命令执行.md`
- 原文授权范围未明确，本篇为独立中文综合分析，保留技术标识与公开实验值，未整篇转载代码或图片。源码截图本次未逐图核验；作者结果与本库文字审阅分别记录。完整实验材料见原文，未执行PoC、安装依赖或请求示例目标。
- 本次属于2026-10-12至2026-10-19汇编新增的历史资料，不是本周首次披露。
- [CNA CVE-2021-46453](https://www.cve.org/CVERecord?id=CVE-2021-46453)
