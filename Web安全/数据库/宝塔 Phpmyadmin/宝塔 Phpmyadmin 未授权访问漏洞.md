---
source: "hatch 补库批 20260928"
title: "宝塔 Phpmyadmin 未授权访问漏洞"
product: "宝塔面板捆绑 phpMyAdmin"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "quarantined"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "文列Linux7.4.2、Windows6.8，部署暴露888端口/pma路径；精确发行及组件配置未知"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-409381fe8f4aaca45ba1cf92"
entity_id: "ve-409381fe8f4aaca45ba1cf92"
schema_version: "1"
---

# 宝塔 Phpmyadmin 未授权访问漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：文列Linux7.4.2、Windows6.8，部署暴露888端口/pma路径；精确发行及组件配置未知
- 证据范围：只有URL、版本及未视检图片，无身份/权限证明，无法区分登录页开放与实际数据库未授权操作

### 本次正文校订

- 修正正文中的 Liunx → Linux 转录错误，资源路径保持原样。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Liunx拼写错误，版本应明确属于宝塔面板而非phpMyAdmin
- 漏洞简介空白，缺修复版本、原始公告和请求响应

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

一、漏洞简介
------------

二、漏洞影响
------------

Linux版本7.4.2

windows版本6.8

三、复现过程
------------

`https://www.0-sec.org:888/pma/`

![1.png](./.resource/宝塔Phpmyadmin未授权访问漏洞/media/rId24.png)
