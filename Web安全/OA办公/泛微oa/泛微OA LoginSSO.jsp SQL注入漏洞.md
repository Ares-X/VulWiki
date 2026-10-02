---
source: "https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Cology%20LoginSSO.jsp%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%20CNVD-2021-33202.md"
title: "泛微e-cology LoginSSO.jsp id参数SQL注入"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CNVD-2021-33202"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "公开8.0，完整范围未知；upgrade/detail.jsp路由"
prerequisites: "具体部署认证未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEOA%20LoginSSO.jsp%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-协同办公OA\""
id: "vw-b50c8dec3af324cec1cb8697"
entity_id: "ve-b50c8dec3af324cec1cb8697"
schema_version: "1"
source_url: "https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Cology%20LoginSSO.jsp%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%20CNVD-2021-33202.md"
---

# 泛微e-cology LoginSSO.jsp id参数SQL注入

## 条目说明

- 对象与具体问题：泛微e-cology；LoginSSO.jsp id参数SQL注入
- 版本、配置及部署条件：公开8.0，完整范围未知；upgrade/detail.jsp路由
- 认证与权限前提：具体部署认证未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 来源关联CNVD-2021-33202且明确未核登记；应放asserted_id并标来源，不能空cve误解无ID
- 准确标明id=1只是入口片段不是POC；源证据外链依赖应保留
- 与2024 FileDownloadLocation/LoginSSO混合路径但参数不同，不据名称直接合并

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

公开资料记录泛微 E-Cology `LoginSSO.jsp` 的 `id` 参数存在 SQL 注入，并展示通过 `/upgrade/detail.jsp/login/LoginSSO.jsp` 路径访问的请求。风险是调用者可以改变数据库查询并读取受数据库账号权限限制的数据。

### 影响范围与前提

公开复现资料标注 E-Cology 8.0，并关联 CNVD-2021-33202；完整受影响范围、厂商修复版本及当前部署认证条件未知。CNVD 编号来自公开复现资料，本文未另行核验登记正文。

### 公开验证资料

完整公开请求包含对账号表的查询，见下方固定提交的原文；这里仅给出路由入口片段，不把正常 `id=1` 当作注入验证：

```http
GET /upgrade/detail.jsp/login/LoginSSO.jsp?id=1 HTTP/1.1
Host: oa.example.com
```

原文的注入请求已将 SQL 关键字之间的空格编码为 `%20`。复制原始 HTTP 请求时不能把未编码空格放进 request-target。OA-EXPTOOL 的 `<code>` 加 HTTP 200 匹配只能作为初筛；确认仍需实际查询结果和正常输入的对照，不能从 HTML 标签推出注入成功。

### 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

### 参考来源

- [公开资料 1](https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Cology%20LoginSSO.jsp%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%20CNVD-2021-33202.md)
- [公开资料 2](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/E-Cology%20LoginSSO.jsp%20SQL%E6%B3%A8%E5%85%A5.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
