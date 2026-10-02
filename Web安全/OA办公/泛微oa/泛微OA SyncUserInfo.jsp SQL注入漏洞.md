---
source: "https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/ecology/ecology-syncuserinfo-sqli.yaml"
title: "泛微e-cology SyncUserInfo.jsp SQL注入"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本数据库兼容补丁未知"
prerequisites: "公开模板无凭证，实际需核"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEOA%20SyncUserInfo.jsp%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-协同办公OA\""
id: "vw-451bdb411e59bb767b40aec6"
entity_id: "ve-451bdb411e59bb767b40aec6"
schema_version: "1"
---

# 泛微e-cology SyncUserInfo.jsp SQL注入

## 条目说明

- 对象与具体问题：泛微e-cology；SyncUserInfo.jsp SQL注入
- 版本、配置及部署条件：版本数据库兼容补丁未知
- 认证与权限前提：公开模板无凭证，实际需核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 正文更正算术结果并明确跟随重定向误报边界，固定commit来源良好
- 请求为特殊UNION语法，兼容DB范围需核，不能默认所有数据库可用
- 可补正常对照与完整返回样例，现未声称本地复现

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

泛微 E-Cology 的 `/mobile/plugin/SyncUserInfo.jsp` 存在公开记录的 `userIdentifiers` 参数 SQL 注入。公开请求通过 UNION 查询回显纯算术结果，用于验证输入影响 SQL 执行。

### 影响范围与前提

产品：泛微 E-Cology；具体版本、数据库兼容范围和修复版本未知。公开模板未携带登录凭证，认证要求仍需按具体部署确认。

### 公开验证资料

```http
GET /mobile/plugin/SyncUserInfo.jsp?userIdentifiers=-1)union(select(3),null,null,null,null,null,str(98989*44313),null HTTP/1.1
Host: oa.example.com
```

正确计算为 `98989 × 44313 = 4386499557`。应在实际结果中观察到该值，并用正常输入对照排除静态页面和请求反射。原稿的 `4370323157` 是计算错误。公开模板允许跟随重定向，最终落入登录页的 HTTP 200 不能视为 SQL 注入成功。

### 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

### 参考来源

- [公开资料 1](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/ecology/ecology-syncuserinfo-sqli.yaml)
- [公开资料 2](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecology-syncuserinfo-sqli.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
