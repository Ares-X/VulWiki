---
source: "wy876 漏洞文库"
id: "vw-c58c4456b214c4dd9c0049b4"
entity_id: "ve-c58c4456b214c4dd9c0049b4"
schema_version: "1"
title: "Fortinet FortiOS message存在xss漏洞"
product: "FortiOS SSL VPN"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2018-13380"
referenced_identifiers: ""
prerequisites: "简介6.0≤.4/5.6≤.7，影响节列6.0.5/5.6.8等相反"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Fortinet/FortinetFortiOSmessage%E5%AD%98%E5%9C%A8xss%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/uvpivrra61yfuuzn"
source_status: "recorded"
---

# Fortinet FortiOS message存在xss漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：FortiOS SSL VPN
- 本文讨论：message XSS（CVE-2018-13380候选）
- 版本、权限与配置前提：简介6.0≤.4/5.6≤.7，影响节列6.0.5/5.6.8等相反
- 资料类型：短PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 与94/116同机制重复，并继承影响/修复版本倒置
- 缺CVE、用户交互前提、响应/脚本执行证据；报文标java
- 原文“影响版本”与简介自相矛盾：6.2、6.0.5、5.6.8 不得直接登记为受影响版本。两组数值均保留作为待核来源，须按官方各维护分支确认角色。

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 各版本安全边界待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
Fortinet FortiOS是美国飞塔（Fortinet）公司的一套专用于FortiGate网络安全平台上的安全操作系统。该系统为用户提供防火墙、防病毒、IPSec/SSLVPN、Web内容过滤和反垃圾邮件等多种安全功能。 Fortinet FortiOS 6.0.0版本至6.0.4版本、5.6.0版本至5.6.7版本和5.4及之前版本中的SSL VPN Web门户存在跨站脚本漏洞。该漏洞源于WEB应用缺少对客户端数据的正确验证。攻击者可利用该漏洞执行客户端代码。

# 二、影响版本
+ Fortinet Fortios 6.2 Fortinet Fortios 6.0.5 Fortinet Fortios 5.6.8

# 三、资产测绘
+ fofa`app="FORTINET-SSLVPN"`
+ 特征


# 四、漏洞复现
```java
/message?title=x&msg=%26%23<svg/onload=alert("xss")>;
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/uvpivrra61yfuuzn>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
