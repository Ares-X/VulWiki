---
source: "gelusus/wxvl 公众号漏洞文库"
title: "4月漏洞快报 | kkFileView任意文件上传导致远程执行漏洞、Apache Zeppelin 命令执行漏洞..."
product: "kkFileView、PAN-OS GlobalProtect、Apache Zeppelin、Node.js"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2024-3400; CVE-2024-27980"
referenced_identifiers: "CVE-2024-31861"
identifier_role: "reference"
cve: "CVE-2024-3400; CVE-2024-31861; CVE-2024-27980"
prerequisites: "kkFileView上传/解压启用及可写转换脚本；PAN-OS特定GlobalProtect配置；Zeppelin可建sh解释器Notebook；Node Windows批处理+受控参数"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-4122e3d1065a993ad665cb11"
entity_id: "ve-4122e3d1065a993ad665cb11"
schema_version: "1"
---

## 2026-10-03 编号核验

Apache 已于 2024-06-21 撤销 CVE-2024-31861，理由是进一步调查确认该项不是安全问题。因此该编号仅作为历史引用保留，不再进入本篇主漏洞编号索引；正文对 Zeppelin sh 解释器正常命令执行能力的描述不应继续被当成该 CVE 有效成立的证明。此处理仅针对 Zeppelin 编号，保留本篇 PAN-OS CVE-2024-3400、Node.js CVE-2024-27980 的主编号和全部原归档材料；不由一个撤销编号否定其余产品章节。

# 4月漏洞快报 | kkFileView任意文件上传导致远程执行漏洞、Apache Zeppelin 命令执行漏洞...

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：kkFileView上传/解压启用及可写转换脚本；PAN-OS特定GlobalProtect配置；Zeppelin可建sh解释器Notebook；Node Windows批处理+受控参数
- 证据范围：四独立实体不能全归kkFileView或共享一个漏洞条件；Zeppelin普通shell功能与安全缺陷边界描述不足

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- kkFileView描述到4.4beta但范围写<4.4beta，与179/180<=冲突
- 覆盖uno.py获取所有python代码应为执行所写代码，语义错误
- 禁上传是缓解不是修复；Node排除所有其他Windows执行方式过宽
- 三CVE未元数据，PAN分支需完整热修复矩阵；无源链

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

原创 梆梆安全  梆梆安全   2024-04-24 16:30  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/YpfGdibD1mRlEhUENIEoRKT24icXeO3JJwibGtsO8Joic50gqlSvLmCHJreMjPSJ65ya8RqWGTpurGMxXM3xJN7faQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&tp=webp "")  
  
近日，梆梆安全专家整理发布安全漏洞报告，主要涉及以下产品/组件：kkFileView、Palo Alto Networks PAN-OS GlobalProtect、Apache Zeppelin 、  
Node.js，  
**建议相关**  
**用户及时采取措施做好资产自查与预防工作。**  
  
**kkFileView 任意文件**  
  
**上传导致远程执行漏洞**  
  
  
  
  
  
**组件介绍**  
  
kkFileView 是使用 SpringBoot 搭建的文档文档在线预览解决方案，支持主流办公文档在线预览。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/YpfGdibD1mRkELT5oLa2E8msXXfjknIIvbxjzHynXuiasI2sKFm8MLx728h1zBtmcoHodaBic2jMvTbVBkyZTE5Cg/640?wx_fmt=png&from=appmsg "")  
  
  
  
**漏洞描述**  
  
kkFileView 4.2.0 到 4.4.0-beta 版本中文件上传功能存在 zip 路径穿越问题，导致攻击者可以通过上传恶意的 zip 包，覆盖任意文件。**kkFileView预览功能会调用 Libreoffice 将 odt 文件转换为 pdf，过程中会调用 uno.py，攻击者可通过覆盖 uno.py 文件获取所有 python 代码。**  
  
  
  
  
**影响范围**  
  
4.2.0≤ kkFileView＜ 4.4.0-beta  
  
  
  
  
**官方修复建议**  
  
开启 file.upload.disable=true 参数，取消首页的上传文件，关闭演示入口。  
  
  
  
**Palo Alto Networks PAN-OS GlobalProtect**  
  
**命令注入漏洞**  
  
**CVE-2024-3400**  
  
  
  
  
  
**组件介绍**  
  
Palo Alto Networks PAN-OS GlobalProtect 是 Palo Alto Networks 的一款防火墙产品。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/YpfGdibD1mRkELT5oLa2E8msXXfjknIIvictOO7CEWR8IU7B3n9mk6cyTj8NicMuSI8pfPuKooAw4iaQyplPa6zKgA/640?wx_fmt=png&from=appmsg "")  
  
  
  
**漏洞描述**  
  
4月12日，官方披露了 Palo Alto Networks GlobalProtect 命令注入漏洞，CVE编号为  
CVE-2024-3400。在特定 PAN-OS 版本和不同功能配置下，  
**未经身份验证的攻击者可能利用此漏洞在防火墙上以root权限执行任意代码。**  
  
  
  
  
**影响范围**  
  
影响版本  
  
PAN-OS 10.2 < 10.2.9-h1  
  
PAN-OS 11.0 < 11.0.4-h1  
  
PAN-OS 11.1 < 11.1.2-h3  
  
安全版本  
  
PAN-OS 10.2.9-h1  
  
PAN-OS 11.0.4-h1  
  
PAN-OS 11.1.2-h3  
  
以及其他不受影响的版本  
  
  
  
  
**官方修复建议**  
  
1、官方已对外发布安全更新补丁，建议受影响用户尽快升级。  
  
2、利用安全组功能设置其仅对可信地址开放。  
  
  
  
**Apache Zeppelin Shell**  
  
**解释器命令执行漏洞**  
  
**CVE-2024-31861**  
  
  
  
  
  
**组件介绍**  
  
Apache Zeppelin 是一款基于 Web 可实现交互式数据分析的 Notebook 产品。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/YpfGdibD1mRkELT5oLa2E8msXXfjknIIvMg243qBv8AQIxwx3nOckaH3fJ7CicRa3LguvNMBadybt4OoT0Rv0EibA/640?wx_fmt=png&from=appmsg "")  
  
  
  
**漏洞描述**  
  
Apache Zeppelin 中 sh 解释器类型的 Notebook 可以直接执行 shell 命令。**攻击者利用该特性可以创建 sh 解释器类型的 Notebook，并执行任意恶意命令。**  
  
  
  
  
**影响范围**  
  
0.10.1 ≤ Apache Zeppelin < 0.11.1  
  
  
  
  
**官方修复建议**  
  
1、目前官方已有可更新版本，建议受影响用户升级，将 zeppelin 升级至 0.11.1 及以上版本；  
  
2、禁止创建 sh interpreter 类型的 Notebook；  
  
  
  
**Node.js child_process.spawn Windows**  
  
**命令注入漏洞**  
  
**CVE-2024-27980**  
  
  
  
  
  
**组件介绍**  
  
Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境，用于构建快速、可扩展的网络应用程序。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/YpfGdibD1mRkELT5oLa2E8msXXfjknIIvLDEBzMxawW6SklmRbhwhhXSsoreKQPib2xSJQJMtRmZVzRtyy1yrjVg/640?wx_fmt=png&from=appmsg "")  
  
  
  
**漏洞描述**  
  
Windows 的 CreateProcess() 函数在执行批处理文件(.bat、.cmd)时，即使应用程序本身没有在命令行中指定这些文件扩展名，仍会隐式地调用 cmd.exe 进程。该风险2011年已在微软文档中提及，但仍存在多个语言实现不当。  
  
  
由于 Node.js 在处理 Windows 批处理文件时，未正确转义参数。**攻击者可能利用该漏洞传入恶意的命令行参数，使 child_process 模块在执行时不正确地处理参数，执行额外的系统命令。**  
非 Windows 环境或 Windows 上其他的命令执行方式不受影响。  
  
  
  
  
**影响范围**  
  
18.0≤node.js@ ＜18.20.2  
  
21.0.0≤node.js@＜21.7.3  
  
20.0.0≤ node.js@＜20.12.2  
  
  
  
  
**官方修复建议**  
  
目前官方已有可更新版本，建议受影响用户升级至安全版本，包括  
18.20.2 及以上版本、  
21.7.3 及以上版本、  
20.12.2 及以上版本。  
  
  
  
推荐阅读  
  
  
Recommended  
  
# >为APP开剂「数字处方」！梆梆安全发布《2024年Q1移动应用安全风险报告》  
#   
# >APP合规上海行 | 梆梆安全为APP构筑用户权益保护的合规通道  
#   
# >移动应用安全监管的主要难点与应对之道  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/YpfGdibD1mRnDY5407c6UFGMlacqbuQrzVRU5sgjicTxqFdSDRLzgbfM5BibmVpNibL7Wlia0630UxgBIGaX18IJzqQ/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
