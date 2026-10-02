---
source: "hatch 补库批 20260928"
title: "Nginx 配置错误漏洞 目录穿越漏洞"
product: "NGINX配置"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "前缀location /files不带/而alias /home/带/；目标可读且未有其他规则拦截"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-05151cf16773322ee2551c1d"
entity_id: "ve-05151cf16773322ee2551c1d"
schema_version: "1"
---

# Nginx 配置错误漏洞 目录穿越漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：前缀location /files不带/而alias /home/带/；目标可读且未有其他规则拦截
- 证据范围：是location前缀与alias组合，不是alias自己忘加/；只能按进程权限访问，根目录listing还需autoindex。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 忘记加/未指明是location，示例alias反而有/，说明容易误导
- 成功穿越根目录与能列出根目录/读任意文件要区分
- 没有版本/来源/完整server配置、修复
- 同429第二片段，应归并

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

Nginx在配置别名（Alias）的时候，如果忘记加`/`，将造成一个目录穿越漏洞。

错误的配置文件示例（原本的目的是为了让用户访问到/home/目录下的文件）：

    location /files {
        alias /home/;
    }

Payload: `http://www.0-sec.org:8081/files../` ，成功穿越到根目录：

![](./.resource/Nginx配置错误漏洞目录穿越漏洞/media/rId24.png)
