---
source: "白阁文库 BaizeSec/bylibrary"
title: "phpStudy nginx 解析漏洞"
product: "phpStudy nginx/PHP FastCGI deployment"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "<=8.1.0.7 claimed;uploaded PHP-bearing image;path-info fallback and permissive extension handling"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-a6c0a917b2bb380e1e7bf78c"
entity_id: "ve-a6c0a917b2bb380e1e7bf78c"
schema_version: "1"
---

# phpStudy nginx 解析漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：<=8.1.0.7 claimed;uploaded PHP-bearing image;path-info fallback and permissive extension handling
- 证据范围：More complete text than69;describes request suffix and three configuration conditions

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- No precise OS/runtime/config snapshot;PHP-FPM explanation should not be blindly applied to Windows phpStudy runtime
- Blank environment/result sections imply dropped visual evidence
- No vendor fixed build or exact source article link
- Merge short69 while preserving explicit Windows-only claim as unverified qualification

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

### 漏洞描述

```
影响版本：phpstudy <= 8.1.0.7
phpstudy 存在 nginx 解析漏洞，攻击者能够利用上传功能，将包含恶意代码的合法文件类型上传至服务器，从而造成任意代码执行的影响。
```

### 环境搭建

### 下载phpstudy v8.1.0.7，安装完成后如下：


### 漏洞复现

### 正常访问图片：

```
http://192.168.3.142:8088/123.gif
```


### 增加后缀访问如下：

```
成功解析php文件
http://192.168.3.142:8088/123.gif/xxx.php
```


### 漏洞分析

```
该漏洞属于安全配置错误漏洞。
漏洞产生的原因为：
1、由于配置错误，导致 nginx 把以 .php 结尾的文件交给 fastcgi 处理，因此可以构造 http://192.168.3.142:8088/123.gif/xxx.php（任何服务器端不存在的php文件均可，比如X.php）
2、但是 fastcgi 在处理 xxx.php 文件时发现文件并不存在，这时 php.ini 配置文件中 cgi.fix_pathinfo=1 发挥作用，这项配置用于修复路径，如果当前路径不存在则采用上层路径。因此这里交由 fastcgi 处理的文件就变成了 /123.gif.
3、最重要的一点是 php-fpm.conf 中的 security.limit_extensions 配置项限制了 fastcgi 解析文件的类型（即指定什么类型的文件当做代码解析），此项设置为空的时候才允许 fastcgi 将 .png 等文件当做代码解析.
```

    分类:             [Web安全](https://www.cnblogs.com/Yang34/category/1392865.html)


---

> 来源：白阁文库 BaizeSec/bylibrary
