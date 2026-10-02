---
source: "https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Cology%20users.data%20%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E6%B3%84%E6%BC%8F.md"
title: "泛微e-cology messager/users.data用户信息泄漏"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本补丁未知；Base64→GBK解码"
prerequisites: "部署认证/数据可见权限需核"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEOA%20users.data%20%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E6%B3%84%E6%BC%8F%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-协同办公OA\""
id: "vw-95b4e04bec7e166714557de9"
entity_id: "ve-95b4e04bec7e166714557de9"
schema_version: "1"
source_url: "https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Cology%20users.data%20%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E6%B3%84%E6%BC%8F.md"
---

# 泛微e-cology messager/users.data用户信息泄漏

## 条目说明

- 对象与具体问题：泛微e-cology；messager/users.data用户信息泄漏
- 版本、配置及部署条件：版本补丁未知；Base64→GBK解码
- 认证与权限前提：部署认证/数据可见权限需核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 编码不作为访问控制，非公开真实记录才判泄露
- 避免固定XML包装假设并说明离线解码；固定多源可追溯
- 无完整响应例和版本边界，继续标待核

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

公开资料记录泛微 E-Cology 的 `/messager/users.data` 可暴露用户数据。响应中的编码不构成访问控制；解码后若包含不应向当前调用者公开的人员记录，即造成信息泄漏。

### 影响范围与前提

产品：泛微 E-Cology；具体受影响版本与修复范围未知。公开复现资料描述可直接下载，但仍需核对实际部署的认证状态和数据可见权限。

### 公开验证资料

```http
GET /messager/users.data HTTP/1.1
Host: oa.example.com
```

公开资料要求先作 Base64 解码，再按 GBK 解释文本。应根据实际响应结构提取待解码数据，不假定所有版本使用固定 XML 包装。只有解码后可识别出真实、非公开的用户记录，才能确认泄漏；HTTP 200、非空响应或 XML 标签均不足以判断。解码工作可离线进行，无需把数据发送至外部解码服务。

### 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

### 参考来源

- [公开资料 1](https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Cology%20users.data%20%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E6%B3%84%E6%BC%8F.md)
- [公开资料 2](https://github.com/TD0U/WeaverScan/blob/5360245b20d5a6425c7684d104bf5fa7001d74fc/vulners/Wc11.go)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
