---
source: "https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-c6-getsqldata-sqli.yaml"
title: "金和C6 GetSqlData SQL 注入及条件化xp_cmdshell"
product: "金和C6"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知，需DB命令能力权限"
prerequisites: "未知"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%87%91%E5%92%8COA/%E9%87%91%E5%92%8COA%20GetSqlData.aspx%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"金和网络-金和OA\""
id: "vw-bf1db8ca0f93dc89a99c2200"
entity_id: "ve-bf1db8ca0f93dc89a99c2200"
schema_version: "1"
source_url: "https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-c6-getsqldata-sqli.yaml"
---

# 金和C6 GetSqlData SQL 注入及条件化xp_cmdshell

## 条目说明

- 对象与具体问题：金和C6；GetSqlData SQLi及条件化xp_cmdshell
- 版本、配置及部署条件：未知，需DB命令能力权限
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 明确只入口片段而非完整PoC，完整正文留固定来源，可接受
- Windows IP判据及DB条件边界清楚，不能宣布任意RCE
- 缺服务端根因/鉴权/修复build

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

afrog 将金和 OA C6 的 `GetSqlData.aspx/.ashx` 归类为 SQL 注入。公开检测样例在纯文本请求体中调用 SQL Server 的 `xp_cmdshell`，因此涉及系统命令的后果依赖数据库配置和调用权限；不能仅凭接口可达宣称任意命令执行。

### 影响版本与前提

金和 OA C6；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

### 网络测绘

```text
app="金和网络-金和OA"
```

### 公开验证资料

下列仅为请求入口定位，不是完整 PoC；公开模板的请求体涉及系统命令调用，原文及判据可在来源中核对。

```http
POST /C6/Control/GetSqlData.aspx/.ashx HTTP/1.1
Content-Type: text/plain
```

### 判定与证据边界

完整请求体见固定提交的公开模板，其检测条件为 HTTP 200 且正文包含 `Windows IP`。必须核对该内容确由对应请求产生；接口返回“成功”或普通页面不构成 SQL/命令执行证据。此样例也不能证明目标可在禁用 `xp_cmdshell` 或权限受限时执行命令。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

### 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。修复对应查询的输入拼接，使用参数化查询，并限制数据库账户权限。

### 参考来源

- [公开检测模板](https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-c6-getsqldata-sqli.yaml)
