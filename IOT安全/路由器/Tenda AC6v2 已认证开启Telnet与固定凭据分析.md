---
schema_version: "1"
id: "VW-20261019-MRXN-191"
title: "Tenda AC6v2 已认证开启Telnet与固定凭据分析"
product: "Tenda AC6v2 (AC1200 speed class)"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
version: "US_AC6V2.0RTL_V15.03.06.51_multi_TDE01.bin"
prerequisites: "能够访问Web管理接口并已有有效管理员登录状态；随后使用系统Telnet凭据"
side_effects: "开启Telnet增加管理暴露；root命令、文件写入和文件系统打包；WifiBasicSet附带案例可导致重启循环及恢复出厂"
source: "0431物联卫士实验室；Mr-xn固定提交转载"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/101"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
review_date: "2026-10-19"
referenced_identifiers: "CVE-2020-28093;CVE-2020-28095;CVE-2020-10988"
---

# Tenda AC6v2 已认证开启Telnet与固定凭据分析

## 编号与产品校订

AC1200是无线速率等级，来源固件文件名指向AC6v2，不能把它写成所有AC1200路由器。原文把开启Telnet的章节标成CVE-2020-28093；但MITRE记录的该编号描述是admin、support、user和nobody账户密码为1234。被记录引用的cecada研究同时说明root/Fireitup及开启Telnet流程。因此本页保留编号为参考，不把不同账户问题混成已确认的单一实体，也不自动把CVE-2020-10988提升为本页主编号。

## 来源记录的链条

研究从httpd处理逻辑找到`/goform/telnet`，要求已有登录状态，然后访问该处理入口启动服务，使用`root`与`Fireitup`登录。能够访问HTTP端点并不等于已经具备管理员会话；固定系统密码也不能消除前一步条件。原文的管理员测试密码`12345678`只是该实验设置。

作者称多数目录只读，但webroot可写且重启后恢复；可将文件系统打包至可访问目录再下载。因此root shell、文件写入、暴露文件与读取固件都是实际副作用，不能称作无状态探测。原文中的扫描和登录步骤在本次维护没有执行。

另一个章节讨论`/goform/WifiBasicSet`的`wrlPwd`过长导致拒绝服务，原转载未给精确阈值。cecada完整报告的演示使用1024个A，并称需要物理恢复出厂；这是单个演示长度，不证明最小溢出阈值。本页把CVE-2020-28095保留为附带参考，不将其包装成已核实的任意代码执行。

## 依赖及处置边界

原文用Ubuntu18.04、binwalk和IDA分析固件；未提供可核验的工具锁定版本，本次没有下载固件、运行解包器或模拟设备。完整文本及公开报告足以支撑已认证服务开启与固定凭据的历史分析；反汇编和成功图未像素核验。没有已确认的厂商修复版本，限制管理网暴露仅是降低风险，不能声称修复硬编码凭据。

## 来源

- [0431物联卫士实验室原文](https://www.iotsec-zone.com/article/101)
- [MITRE CVE-2020-28093](https://cve.mitre.org/cgi-bin/cvename.cgi?name=2020-28093)：四账户密码1234的编号定义
- [cecada原始报告](https://github.com/cecada/Tenda-AC6-Root-Acces/blob/main/README.md)：AC6 15.03.06.51_multi、Telnet链及拒绝服务演示；不把源码命令执行当作本库复现

## 审阅与使用边界

本页为原创中文资料摘要，记录历史研究，不是2026年新披露。来源中的完整请求、脚本、公开测试值和图片仍保留在固定提交的原文中，本页没有改写或脱敏原始文件。仅作静态文字审阅；未运行PoC、扫描器、安装器或固件，未访问示例目标，未独立复现，未查看原文图片像素。原作者授权未确认，不把汇编仓库的Apache-2.0许可证当作转载正文或外部工具的授权。

固定来源的iot目录为Markdown资料，未附本文专用安装器、依赖清单或工作流。汇编仓库的RSS更新工作流和脚本已有独立静态审阅：使用未锁定版本的Python依赖、可写仓库权限及外部RSS输入，不能因此宣称整个仓库或外链供应链安全。本摘要不导入可执行组件。

[本次固定提交原文](https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/腾达AC1200路由器漏洞分析.md)
