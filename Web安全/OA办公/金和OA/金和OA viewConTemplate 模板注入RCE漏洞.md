---
source: "https://cn-sec.com/archives/2835659.html"
title: "金和JC6 viewConTemplate FreeMarker模板注入"
product: "金和JC6"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知，模板可用类/权限条件"
prerequisites: "未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%87%91%E5%92%8COA/%E9%87%91%E5%92%8COA%20viewConTemplate%20%E6%A8%A1%E6%9D%BF%E6%B3%A8%E5%85%A5RCE%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"金和网络-金和OA\""
id: "vw-44a4bd947249b23009e8cee5"
entity_id: "ve-44a4bd947249b23009e8cee5"
schema_version: "1"
---

# 金和JC6 viewConTemplate FreeMarker模板注入

## 条目说明

- 对象与具体问题：金和JC6；viewConTemplate FreeMarker模板注入
- 版本、配置及部署条件：未知，模板可用类/权限条件
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 明确2024署名转载非独立复现，POST/code与旧GET/template纠错清楚
- 只给入口并指原文完整表达式，缺原公众号可读性但已披露
- 需补FreeMarker/JC6精确版本、鉴权与修复build

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

HackingWiki漏洞感知的公开分析由 CN-SEC 转载，记录金和 OA JC6 的 viewConTemplate 将请求参数 code 写入临时模板并交给 FreeMarker 渲染。文中给出调用 Execute 类的请求及命令输出截图。该问题依赖模板解析及其可用类和权限，不能套用到所有部署。

### 影响版本与前提

金和 OA JC6；确切受影响版本、修复版本及认证前提未知。来源是 2024-06-10 的署名分析转载：原始出处为微信公众号 HackingWiki漏洞感知，文章题为《金和OA JC6 FreeMarker模板注入漏洞简析》。原公众号链接本次不可读取，正文依据可读取的 CN-SEC 转载核对；转载不构成第二份独立验证。

### 网络测绘

```text
app="金和网络-金和OA"
```

### 公开验证资料

以下仅定位接口，不是完整验证请求。完整表单表达式见所引公开分析，本文不另行生成模板执行载荷。

```http
POST /jc6/platform/portalwb/portalwb-con-template!viewConTemplate.action HTTP/1.1
Content-Type: application/x-www-form-urlencoded
```

### 判定与证据边界

原文请求体包含 moduId=1、uuid=1，以及承载模板表达式的 code；公开分析以命令结果回显为证据。普通页面可达、模板被保存或响应状态为 200 都不证明代码执行。原新增文使用 GET 与 template 参数，与分析不符，已删除。完整请求和代码分析见转载正文；本次未执行模板表达式。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

### 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。避免将不可信输入作为模板执行，限制模板可访问的类与对象，并对模板维护接口实施身份和权限检查。

### 参考来源

- [HackingWiki漏洞感知署名分析（CN-SEC 转载）](https://cn-sec.com/archives/2835659.html)
