---
schema_version: "1"
id: "VW-20261019-MRXN-028"
title: "D-Link DIR-816 Diagnosis sendNum 命令注入"
product: "D-Link DIR-816"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
primary_identifiers: "CVE-2022-37130"
identifier_status: "active"
version: "A2_v1.10CNB04"
prerequisites: "可达管理HTTP接口；来源请求包含Cookie与tokenid，认证绕过未证明"
side_effects: "写入/tmp/diagnosis；上传调试器；启动8802端口telnet shell"
source: "z1r0"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/250"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
archive_title: "D-Link CVE-2022-37130"
review_date: "2026-10-19"
---

# D-Link DIR-816 Diagnosis sendNum 命令注入

## 根因、条件与来源实验

z1r0 分析的固件为 A2_v1.10CNB04。`/goform/Diagnosis` 读取 `sendNum`，经 `snprintf` 拼进命令，再交给 `doSystembk`。CNA 的产品、版本、端点和拼接根因对应；CNA 使用 `setnum` 拼写，来源请求实际字段为 `sendNum`。CNA 同时提到 DIR-878，本文未据此扩大实验覆盖。

来源先通过 TFTP 把 `gdbserver.mipsle` 放入 `/tmp`，在 `1234` 端口附加进程 `42`，记录参数到达命令执行函数。首份 socket 示例用 `ls`，第二份启动 `telnetd -p 8802 -l /bin/sh`，作者称连接成功。请求示例设备为 `192.168.0.1`，`tokenid=1804289383`，Cookie 为 `curShow=; ac_login_info=passwork; test=A`。这些是公开实验值，不代表当前有效认证信息。

## 静态审阅边界

正文 `/gofrom/Diagnosis` 与请求 `/goform/Diagnosis` 不一致；以后者及 CNA 端点对应说明，不替换源文。作者关于 vfork 调试时父子进程的描述只作为实验观察，不能推出 vfork 不创建子进程。无回显与命令未执行也不等价。两份程序建立网络连接，第二份打开 shell 服务，调试流程还写文件、改执行权限；不能当作只读探测。未核到针对该精确版本的修复公告，不能填已修复版本。

## 来源与收录范围

- 原作者：z1r0；[原文](https://www.iotsec-zone.com/article/250)
- 汇编：Mr-xn/Penetration_Testing_POC，固定提交 `f33600e512f2ff654ec335102daf23b8a5218d24`，路径 `iot/D-Link CVE-2022-37130.md`
- 原文授权范围未明确，本篇为独立中文综合分析，保留技术标识与公开实验值，未整篇转载代码或图片。源码截图本次未逐图核验；作者结果与本库文字审阅分别记录。完整实验材料见原文，未执行PoC、安装依赖或请求示例目标。
- 本次属于2026-10-12至2026-10-19汇编新增的历史资料，不是本周首次披露。
- [CNA CVE-2022-37130](https://www.cve.org/CVERecord?id=CVE-2022-37130)
