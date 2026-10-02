---
source: "历史归档批(无原始出处标注)"
title: "Tomcat getRequestURI()的处理"
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
id: "vw-03a8f5ca216bec65cabb3c64"
entity_id: "ve-03a8f5ca216bec65cabb3c64"
schema_version: "1"
---

# Tomcat getRequestURI()的处理

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 证据范围：getRequestURI返回路径而非整个URL，原文末句URL内容术语过宽；没有独立漏洞。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 源码仅图片，未视检
- 重复图片路径尾巴及孤立Tomcat残字
- 缺版本、示例index.jsp上下文和出处

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

### Tomcat getRequestURI()的处理

我们直接在index.jsp中调用getRequestURI()函数的地方打上断点调试即可。

这里是直接调用Request.requestURI()函数然后直接返回其字符串值：

![](./.resource/TomcatgetRequestURI的处理/media/rId21.png)的处理/media/rId21.png)

跟进Request.requestURI()函数，这里是直接返回请求的URL内容，没有做任何处理以及URL解码：

![](./.resource/TomcatgetRequestURI的处理/media/rId22.png)的处理/media/rId22.png)Tomcat
