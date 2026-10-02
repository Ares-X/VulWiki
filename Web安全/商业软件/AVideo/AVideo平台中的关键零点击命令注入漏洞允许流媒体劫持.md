---
source: "gelusus/wxvl 公众号漏洞文库"
title: "AVideo-Encoder getImage base64Url命令注入通告"
product: "AVideo-Encoder"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-29058"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Encoder6.0/7.0修复声明"
prerequisites: "声明无需身份或交互"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/AVideo/AVideo%E5%B9%B3%E5%8F%B0%E4%B8%AD%E7%9A%84%E5%85%B3%E9%94%AE%E9%9B%B6%E7%82%B9%E5%87%BB%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%E5%85%81%E8%AE%B8%E6%B5%81%E5%AA%92%E4%BD%93%E5%8A%AB%E6%8C%81.md"
id: "vw-f0c651efd411db2afb0eb7a6"
entity_id: "ve-f0c651efd411db2afb0eb7a6"
schema_version: "1"
---

# AVideo-Encoder getImage base64Url命令注入通告

## 条目说明

- 对象与具体问题：AVideo-Encoder；getImage base64Url命令注入通告
- 版本、配置及部署条件：Encoder6.0/7.0修复声明
- 认证与权限前提：声明无需身份或交互
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 开头泛AVideo与末尾Encoder需统一组件，不能将Encoder版本当平台版本
- 根因描述Base64到ffmpeg双引号清晰但无源码/请求/GitHub公告链接
- 零点击仅无交互，不独立证明所有部署/劫持后果，CVE与修复需官方证据

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-03-08 06:13  
  
AVideo（一个广泛使用的开源视频托管和流媒体平台）存在一个严重漏洞。该漏洞编号为 CVE-2026-29058，属于零点击漏洞，严重级别为最高，允许未经身份验证的攻击者在目标服务器上执行任意操作系统命令。  
  
该漏洞由安全研究员 Arkmarta 发现，专门影响 AVideo 6.0 版本。该漏洞已在 7.0 版本及更高版本中正式修复。  
  
该网络攻击被归类为CWE-78，原因是操作系统命令中的特殊元素处理不当，它不需要系统权限或用户交互。  
  
如果利用成功，攻击者可以完全控制服务器，窃取敏感配置信息，并完全劫持实时视频流。  
### AVideo平台漏洞  
  
该严重漏洞的根本原因在于 AVideo 平台的 objects/getImage.php 组件。  
  
当应用程序处理包含 base64Url 参数的网络请求时，就会出现此问题。  
  
该平台对用户提供的输入进行 Base64 解码，并将其直接插入到双引号括起来的 ffmpeg shell 命令中。  
  
虽然该软件会尝试使用标准 URL 过滤器来验证输入，但此功能仅检查基本的 URL 语法。  
  
它完全无法消除危险的 shell 元字符或命令替换序列。  
  
由于该应用程序在执行命令之前没有正确转义这些不受信任的数据，远程攻击者可以很容易地附加恶意指令。  
  
这使得未经授权的用户能够运行任意代码、窃取内部凭证或故意破坏服务器的流媒体功能。  
  
根据 GitHub 上的公告，运行 AVideo-Encoder 6.0 版本的管理员应升级到 7.0 或更高版本，以确保其环境的安全。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
