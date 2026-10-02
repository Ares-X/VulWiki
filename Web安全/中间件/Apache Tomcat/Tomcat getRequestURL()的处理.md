---
source: "历史归档批(无原始出处标注)"
title: "Tomcat getRequestURL()的处理"
product: "Apache Tomcat"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-3f8405d8ba67b6ce53267a9e"
entity_id: "ve-3f8405d8ba67b6ce53267a9e"
schema_version: "1"
---

# Tomcat getRequestURL()的处理

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 证据范围：getRequestURL拼接scheme/host/port和requestURI的说明，宜与相邻API及规范化文章合并。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 重复图片路径尾巴
- 源码仅图片，版本与出处缺失
- 不能将未经URL解码直接等同于已存在漏洞

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

### Tomcat getRequestURL()的处理

在getRequestURL()函数中是调用了Request.getRequestURL()函数的：

![](./.resource/TomcatgetRequestURL的处理/media/rId21.png)的处理/media/rId21.png)

跟进该函数，在提取了协议类型、host和port之后，调用了getRequestURI()函数获取URL请求的路径，然后直接拼接进URL直接返回而不做包括URL解码的任何处理：

![](./.resource/TomcatgetRequestURL的处理/media/rId22.png)的处理/media/rId22.png)
