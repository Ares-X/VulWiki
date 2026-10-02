---
source: "hatch 补库批 20260928"
title: "Nginx 配置错误漏洞 CRLF注入漏洞"
product: "NGINX配置"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "配置return302使用解码$uri，具体NGINX版本与请求解析允许该路径"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-679f223528c15c9dc3b70b43"
entity_id: "ve-679f223528c15c9dc3b70b43"
schema_version: "1"
---

# Nginx 配置错误漏洞 CRLF注入漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：配置return302使用解码$uri，具体NGINX版本与请求解析允许该路径
- 证据范围：与429相同教程第一片段，变量语义有解释可保留；非无条件NGINX代码漏洞。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 第二场景源/目标URL完全一样，却说统一域名，原始例子被替换坏
- %0a%0d是LFCR而非规范CRLF，需明确测试实现对换行容忍性
- 影响范围/修复为空，应给安全变量配置和适用版本
- 原文链接清楚，结果仅截图未视检

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

下面两种情景十分常见：

1.  用户访问`http://www.0-sec.org/aabbcc`，自动跳转到`https://www.0-sec.org/aabbcc`
2.  用户访问`http://www.0-sec.org/aabbcc`，自动跳转到`http://www.0-sec.org/aabbcc`

比如我的博客，访问`http://www.0-sec.org/other/tinger.html`，将会301跳转到`https://www.0-sec.org/other/tinger.html`。随着现在https的普及，很多站点都强制使用https访问，这样的跳转非常常见。

第二个场景主要是为了统一用户访问的域名，更加有益于SEO优化。

在跳转的过程中，我们需要保证用户访问的页面不变，所以需要从Nginx获取用户请求的文件路径。查看Nginx文档，可以发现有三个表示uri的变量：

1.  `$uri`
2.  `$document_uri`
3.  `$request_uri`

解释一下，1和2表示的是解码以后的请求路径，不带参数；3表示的是完整的URI（没有解码）。Nginx会将`$uri`进行解码，导致传入%0a%0d即可引入换行符，造成CRLF注入漏洞。那么，如果运维配置了下列的代码：

// 错误的配置文件示例（原本的目的是为了让http的请求跳转到https上）：

    location / {
        return 302 https://$host$uri;
    }

Payload:
`http://www.0-sec.org:8080/%0a%0dSet-Cookie:%20a=1`，可注入Set-Cookie头。

![](./.resource/Nginx配置错误漏洞CRLF注入漏洞/media/rId24.png)

参考链接
--------

> https://www.leavesongs.com/PENETRATION/nginx-insecure-configuration.html
>
> https://vulhub.org/\#/environments/nginx/insecure-configuration/
