---
source: "https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/weaver-ecology-getsqldata-sqli.yaml"
title: "泛微e-cology getSqlData任意SQL表达式执行"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "公开8.0，范围未知；SQL Server语法"
prerequisites: "无认证请求但实际需核"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEE-Cology%20getSqlData%E6%8E%A5%E5%8F%A3SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-协同办公OA\""
id: "vw-e89510af4a054df94c8df437"
entity_id: "ve-e89510af4a054df94c8df437"
schema_version: "1"
source_url: "https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/weaver-ecology-getsqldata-sqli.yaml"
---

# 泛微e-cology getSqlData任意SQL表达式执行

## 条目说明

- 对象与具体问题：泛微e-cology；getSqlData任意SQL表达式执行
- 版本、配置及部署条件：公开8.0，范围未知；SQL Server语法
- 认证与权限前提：无认证请求但实际需核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 固定commit来源、常量计算代替用户密码、区分反射/错误页误报
- 标题SQL注入与接受整条SQL可细化任意SQL执行接口
- 无固定补丁范围；空cve应统一为null或空数组

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

泛微 E-Cology 的 `getSqlData` 接口接收 `sql` 参数。公开资料展示 SQL Server 表达式被执行并返回结果，可用于确认 SQL 输入控制；在受影响部署中，进一步的数据访问范围受数据库账号权限限制。

### 影响范围与前提

公开复现资料标注 E-Cology 8.0；完整受影响版本与补丁范围未知。以下验证语法适用于 SQL Server。公开请求未带认证信息，但具体部署的权限要求仍需核对。

### 公开验证资料

使用 ProjectDiscovery 模板中的常量摘要计算验证，避免读取用户密码：

```http
GET /Api/portal/elementEcodeAddon/getSqlData?sql=select%20substring(sys.fn_sqlvarbasetostr(hashbytes('MD5','999999999')),3,32) HTTP/1.1
Host: oa.example.com
```

有效结果应包含常量 `999999999` 的 MD5 值 `c8c605999f3d8352d7bb792cf3fdb25b`，并确认来自查询结果，而非请求反射或错误页。上游另有空 `sql` 加通用状态字段的匹配分支；该分支不能独立证明 SQL 注入。

### 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

### 参考来源

- [公开资料 1](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/weaver-ecology-getsqldata-sqli.yaml)
- [公开资料 2](https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Cology%20getSqlData%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md)
- [公开资料 3](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecologye-getdatasql.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
