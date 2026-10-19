---
schema_version: "1"
id: "VW-20261019-MRXN-032"
title: "D-Link DIR-601 B1 配置泄露与改密分析"
product: "D-Link DIR-601 B1"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
version: "DIR601B1_FW202NAb01.bin /2.02NA"
prerequisites: "同一局域网；来源读取示例称无需认证；各CVE的角色和版本不同"
side_effects: "泄露明文管理员密码、修改管理员密码及DNS、远程管理和图形认证配置"
source: "GroundCTL2MajorTom"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/447"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
archive_title: "D-Link DIR-601 固件分析及漏洞复现"
review_date: "2026-10-19"
primary_identifiers: "CVE-2018-5708"
identifier_status: "active"
referenced_identifiers: "CVE-2018-10641;CVE-2018-12710;CVE-2019-16326;CVE-2019-16327"
---

# D-Link DIR-601 B1 配置泄露与改密分析

## 配置读取与修改是不同动作

GroundCTL2MajorTom 的实验固件为 B1 2.02NA。`my_cgi.cgi` 读取重复的request/table_name参数，来源示例组合`no_auth`与`load_settings`、`admin_user`，返回XML管理员名称和明文密码。随后以`update_entry`修改`admin_user_pwd`并称登录成功。公开返回值含`admin`、`123456`；文字中的登录密码`admin3`与展示报文不同，不能替换原值或把它们当成同一完整会话证据。

CNA CVE-2018-5708 与B1 2.02NA、局域网未认证XML泄露对应。原文以2018-10641描述的A1 1.02NA旧密码缺失问题解释B1实验，只能保留类比，不能自动扩展官方影响范围。2018-12710明确要求低权限User账户并泄露Admin密码，属于读取/权限边界问题，不是原文所称与改密“相同”。2019-16326是B1 2.00NA CSRF，2019-16327是同版本服务端认证缺失；同出处不能推出编号重复。

## 静态和副作用

源码转存的C函数块夹入shell循环，属于混杂文本，不能作为可编译程序。修改示例同时操作system、graph_auth、remote_management，不能只标注“改密码”。源文的CSRF演示还需要受害者浏览器触发等条件；既有认证绕过与CSRF分别保留。完整可见请求没有另行隐蔽下载、混淆或外部收集端；准备过程会写固件仿真文件。外部工具未运行，当前材料未确立B1 2.02NA的可用修复号。

## 来源与审阅

- 作者：GroundCTL2MajorTom；[完整原文](https://www.iotsec-zone.com/article/447)
- 汇编来源Mr-xn/Penetration_Testing_POC，固定提交`f33600e512f2ff654ec335102daf23b8a5218d24`，路径`iot/D-Link DIR-601 固件分析及漏洞复现.md`
- 原文授权范围未明确，本篇独立中文综合，不整篇转载代码图片；来源实验结果不升级为本库复现。未执行PoC、安装依赖、请求示例目标或修改设备。
- 属本周汇编新增的历史研究，不是本周新披露；未知构建/认证及具体缺口已明确记录。
- [CNA CVE-2018-5708](https://www.cve.org/CVERecord?id=CVE-2018-5708)
- [CNA CVE-2018-10641](https://www.cve.org/CVERecord?id=CVE-2018-10641)
- [CNA CVE-2018-12710](https://www.cve.org/CVERecord?id=CVE-2018-12710)
- [CNA CVE-2019-16326](https://www.cve.org/CVERecord?id=CVE-2019-16326)
- [CNA CVE-2019-16327](https://www.cve.org/CVERecord?id=CVE-2019-16327)
