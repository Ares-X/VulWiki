---
source: "hatch 补库批 20260928"
title: "Nginx 解析漏洞"
product: "NGINX FastCGI及PHP配置"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "上传内容含PHP、FastCGI路由将图片后附.php交给PHP、PATH_INFO/扩展限制配置不安全"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-295684ade86c7db87e35b97c"
entity_id: "ve-295684ade86c7db87e35b97c"
schema_version: "1"
---

# Nginx 解析漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：上传内容含PHP、FastCGI路由将图片后附.php交给PHP、PATH_INFO/扩展限制配置不安全
- 证据范围：缺配置，不能概括NGINX1.x/PHP7最新均有产品漏洞；与432后续同主题应比对。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 最新版无日期不可复现，简介空白
- docker-compose无目录/compose来源，图片内容仅结果未给初始文件/配置
- 两个URL一个公网示例一个your-ip，环境指向不一致
- 无修复或上传文件清理

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

一、漏洞简介
------------

二、漏洞影响
------------

-   Nginx 1.x 最新版
-   PHP 7.x最新版

三、复现过程
------------

直接执行`docker-compose up -d`启动容器，无需编译。

访问`http://www.0-sec.org/uploadfiles/nginx.png`和`http://your-ip/uploadfiles/nginx.png/.php`即可查看效果。

正常显示：

![](./.resource/Nginx解析漏洞/media/rId24.jpg)

增加`/.php`后缀，被解析成PHP文件：

![](./.resource/Nginx解析漏洞/media/rId25.jpg)
