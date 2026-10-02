---
source: "https://github.com/Co5mos/nuclei-tps/blob/5bc8b820acf9c992602cc7566e205e6cf1c463dd/http/vulnerabilities/hjsoft/hjsoft-eHR-system-sqli.yaml"
title: "宏景HCM/eHR ajaxService extTrans SQL 注入"
product: "宏景HCM/eHR"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知"
prerequisites: "getpassword新session两步"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E5%AE%8F%E6%99%AF/%E5%AE%8F%E6%99%AFHCM%20ajaxService%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"HJSOFT-HCM\""
id: "vw-8ad49f6b2c8e3fd092f49a26"
entity_id: "ve-8ad49f6b2c8e3fd092f49a26"
schema_version: "1"
---

# 宏景HCM/eHR ajaxService extTrans SQL 注入

## 条目说明

- 对象与具体问题：宏景HCM/eHR；ajaxService extTrans SQLi
- 版本、配置及部署条件：未知
- 认证与权限前提：getpassword新session两步
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有两入口非完整请求已清楚披露，来源有编码xml
- 随机MD5判据比Cookie获取更强，但缺实际响应/根因
- 应保留匿名session前置与编码格式版本依赖

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

公开模板记录宏景 HCM 的 `/ajax/ajaxService` SQL 注入检测流程：先访问找回密码页面并提取会话 Cookie，再向 AJAX 接口提交 `__type=extTrans` 与编码后的 `__xml` 数据。原文所称 UNION 请求无法从其省略片段核对。

### 影响版本与前提

宏景 HCM/e-HR；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

### 网络测绘

```text
app="HJSOFT-HCM"
```

### 公开验证资料

以下仅定位两步接口，未包含第二步请求体；可核对的完整报文与动态变量在来源模板中。

```http
GET /templates/index/getpassword.jsp HTTP/1.1
POST /ajax/ajaxService HTTP/1.1
```

### 判定与证据边界

完整 `__xml`、Cookie 提取方式与随机字符串变量见来源模板。模板要求两次响应均为 HTTP 200，第二次正文包含所提交随机字符串的 MD5 结果。这是查询结果的判据；登录页可达或取得 Cookie 均不等于已验证 SQL 注入。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

### 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。修复对应查询的输入拼接，使用参数化查询，并限制数据库账户权限。

### 参考来源

- [公开检测模板](https://github.com/Co5mos/nuclei-tps/blob/5bc8b820acf9c992602cc7566e205e6cf1c463dd/http/vulnerabilities/hjsoft/hjsoft-eHR-system-sqli.yaml)
