---
source: "历史归档批(无原始出处标注)"
title: "Tomcat getPathInfo()的处理"
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
id: "vw-c1d7ba33e3ad8bb30ef0731b"
entity_id: "ve-c1d7ba33e3ad8bb30ef0731b"
schema_version: "1"
---

# Tomcat getPathInfo()的处理

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 证据范围：仅介绍MappingData.pathInfo返回，无独立漏洞或复现。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 关键论证只有截图，未视检；尾部重复路径残渣
- 缺版本、上文与原始出处

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

### Tomcat getPathInfo()的处理

和getServletPath()函数的处理是一样的，同样是返回前面经过Tomcat解析处理后的MappingData类对象中其中一个属性值，这里是获取的pathInfo属性值并直接返回：

![](./.resource/TomcatgetPathInfo的处理/media/rId21.png)的处理/media/rId21.png)
