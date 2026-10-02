---
source: "https://github.com/jjjj1029056414/selfpoc/blob/7a66c01dcac7dde6fe9e4df50284002e62c0c05c/jinhe-getattout-sql.py"
title: "金和JC6 GetAttOut SQL 注入"
product: "金和JC6"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知"
prerequisites: "未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%87%91%E5%92%8COA/%E9%87%91%E5%92%8COA%20GetAttOut%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"金和网络-金和OA\""
id: "vw-e9479b27fd2641f40e3fae44"
entity_id: "ve-e9479b27fd2641f40e3fae44"
schema_version: "1"
---

# 金和JC6 GetAttOut SQL 注入

## 条目说明

- 对象与具体问题：金和JC6；GetAttOut SQLi
- 版本、配置及部署条件：未知
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 明确POST正文与旧GET不符，固定原PoC/补充模板来源可追溯
- success/业务标记不是SQLi证明，文已正确要求版本结果
- 需原始服务器代码确认SQL拼接及认证；无修复build

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

金和 OA JC6 的 `GetAttOut` 存在公开 SQL 注入 PoC。原始 PoC 通过 POST 请求体直接提交 UNION 查询，查询数据库版本；原新增文中的 GET 加省略参数与来源不符。

### 影响版本与前提

金和 OA JC6；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

### 网络测绘

```text
app="金和网络-金和OA"
```

### 公开验证资料

以下请求摘自公开来源，主机名如有展示统一为 `example.invalid`；仅作为授权环境中的资料参考。

```http
POST /jc6/JHSoft.WCF/TEST/GetAttOut HTTP/1.1
Host: example.invalid
Content-Type: application/x-www-form-urlencoded

1' union select null,null,@@version,null,null,null--
```

### 判定与证据边界

原始 PoC 只匹配 HTTP 200 与 `success`，后续模板还检查 `attOEndTime`、`attOBeginTime`。这些业务标记本身不能确证注入；需在响应中辨认本次查询的数据库版本结果并与正常请求对照。本文不保留“调试残留”“完全无鉴权”等未经原始实现证实的说法。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

### 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。修复对应查询的输入拼接，使用参数化查询，并限制数据库账户权限。

### 参考来源

- [公开原始 PoC](https://github.com/jjjj1029056414/selfpoc/blob/7a66c01dcac7dde6fe9e4df50284002e62c0c05c/jinhe-getattout-sql.py)
- [公开检测模板](https://github.com/Co5mos/nuclei-tps/blob/5bc8b820acf9c992602cc7566e205e6cf1c463dd/http/vulnerabilities/jinhe/jinhe-oa-cj6-getattout-sql-injection.yaml)
