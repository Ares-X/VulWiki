---
source: "白阁文库 BaizeSec/bylibrary"
title: "Nginx文件名逻辑漏洞"
product: "NGINX URI解析/PHP-FPM组合"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2013-4547"
referenced_identifiers: ""
identifier_role: "primary"
cve: "CVE-2013-4547"
prerequisites: "受影响NGINX解析原始空格/NUL、可上传尾空格文件、PHP-FPM不限制扩展"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-952afe14a37c81010cd4d1b4"
entity_id: "ve-952afe14a37c81010cd4d1b4"
schema_version: "1"
---

# Nginx文件名逻辑漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：受影响NGINX解析原始空格/NUL、可上传尾空格文件、PHP-FPM不限制扩展
- 证据范围：与437同漏洞，但版本上界和字节表示均需纠正；不与普通fix_pathinfo配置风险合并。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 1.5.7实际是修复版，不应计入影响
- 示例test.gif%20%20.php未包含NUL，后文要求手改为原始字节但关键截图引用缺失
- shell.gif与1.gif/test.gif名称不一致，重复同一句利用条件
- 前述尾空格文件前提没在实际上传步骤落实，路径请求不能复制复现
- 缺编号、来源和修复建议

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

### 影响版本 ###
Nginx 0.8.41 ~ 1.4.3 / 1.5.0 ~ 1.5.7
### 漏洞详情 ###
该漏洞利用了Nginx错误的解析了URL地址，导致可以绕过服务端限制，从而解析PHP文件，造成命令执行的危害。

根据nginx.conf文件中location中的定义，以.php结尾的文件都解析为php。若我们访问的文件名为shell.gif[0x20][0x00].php，该文件名以.php结尾可以被FastCGI接收，FastCGI在读取文件名时被00截断，导致读取的文件名为1.gif[0x20]，配合limit_extensions为空即可利用成功配合limit_extensions为空即可利用成功。该漏洞利用条件有两个：

1.Nginx 0.8.41 ~ 1.4.3 / 1.5.0 ~ 1.5.7

2.php-fpm.conf中的security.limit_extensions为空，也就是说任意后缀名都可以解析为PHP

### 复现过程 ###
1、 使用docker搭建漏洞环境

2、 执行如下命令,运行环境

    docker-compose up -d

3、 浏览器访问http://192.168.247.129:8080/4.上传个图片马发现上传成功并返回路径

5.5.接下来需要构造我们 test.gif[0x20][0x00].php 来造成Nginx解析漏洞，使我们的test.gif被解析成php

url:http://192.168.247.129:8080/uploadfiles/test.gif%20%20.php

手工更改成下图选中%00进行解码转发数据包解析成功！


---

> 来源：白阁文库 BaizeSec/bylibrary
