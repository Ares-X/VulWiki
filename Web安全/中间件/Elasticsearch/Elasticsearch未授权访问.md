---
source: "hatch 补库批 20260928"
title: "Elasticsearch未授权访问"
product: "Elasticsearch"
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
id: "vw-7174e76b21887e8221bb8344"
entity_id: "ve-7174e76b21887e8221bb8344"
schema_version: "1"
---

# Elasticsearch未授权访问

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 证据范围：列旧版river/head端点，非独立漏洞；端口开放本身不等于无鉴权。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 影响范围为空、无版本/鉴权/网络绑定前提
- 称mongodb为关系型数据库错误
- 全部URL与说明黏连，多个链接不能直接解析
- river存在不必然泄露其他数据库凭据，需实际配置证据
- 无安全修复和来源

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

一、漏洞简介
------------

> ElasticSearch
> 是一款Java编写的企业级搜索服务，启动此服务默认会开放HTTP-9200端口，可被非法操作数据。

二、影响范围
------------

三、复现过程
------------

安装了river之后可以同步多种数据库数据（包括关系型的mysql、mongodb等）。

http://0-sec.org:9200/\_cat/indices
里面的indices包含了\_river一般就是安装了river了。http://0-sec.org:9200/\_plugin/head/ web管理界面http://0-sec.org:9200/\_cat/indiceshttp://0-sec.org:9200/\_river/\_search 查看数据库敏感信息http://0-sec.org:9200/\_nodes 查看节点数据
