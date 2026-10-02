---
source: "hatch 补库批 20260928"
title: "Nginx 配置错误漏洞 add\\_header被覆盖"
product: "NGINX配置"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "使用默认add_header继承语义、子location另有add_header、页面另有XSS或点击劫持风险"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-7f785c314d4bea962863f5d8"
entity_id: "ve-7f785c314d4bea962863f5d8"
schema_version: "1"
---

# Nginx 配置错误漏洞 add\_header被覆盖

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：使用默认add_header继承语义、子location另有add_header、页面另有XSS或点击劫持风险
- 证据范围：配置继承行为不是独立XSS注入根因；缺CSP只能丢失一层防御，必须已有注入点。与429第三片段同文。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 覆盖不是同名头逐个覆盖，而是整组不继承，应准确措辞
- 没给xss.html内容，无法由配置单独证明XSS
- 版本/原始出处/修复为空；当前新继承控制选项需按版本另列，不将历史默认叙述当全版本唯一行为

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

Nginx配置文件子块（server、location、if）中的`add_header`，将会覆盖父块中的`add_header`添加的HTTP头，造成一些安全隐患。

如下列代码，整站（父块中）添加了CSP头：

    add_header Content-Security-Policy "default-src 'self'";
    add_header X-Frame-Options DENY;

    location = /test1 {
        rewrite ^(.*)$ /xss.html break;
    }

    location = /test2 {
        add_header X-Content-Type-Options nosniff;
        rewrite ^(.*)$ /xss.html break;
    }

但`/test2`的location中又添加了`X-Content-Type-Options`头，导致父块中的`add_header`全部失效：

![](./.resource/Nginx配置错误漏洞add_header被覆盖/media/rId24.png)

XSS可被触发：

![](./.resource/Nginx配置错误漏洞add_header被覆盖/media/rId25.png)
