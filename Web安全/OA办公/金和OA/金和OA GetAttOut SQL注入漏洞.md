---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA GetAttOut SQL注入漏洞

## 漏洞描述

金和OA C6 `/jc6/JHSoft.WCF/TEST/GetAttOut` 测试接口存在 SQL 注入漏洞，支持 UNION 联合查询与延时盲注两种方式利用。

## 影响版本

```
金和OA C6
```

## 网络测绘

```
app="金和OA"
```

## 漏洞复现

```
GET /jc6/JHSoft.WCF/TEST/GetAttOut?... UNION ALL SELECT ... HTTP/1.1
```

该接口本为调试残留，未做任何鉴权与过滤。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
