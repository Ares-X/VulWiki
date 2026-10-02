---
source: "wy876 漏洞文库"
id: "vw-bcff13082d440fd21b7ca756"
entity_id: "ve-bcff13082d440fd21b7ca756"
schema_version: "1"
fofa_unverified: "web.title=="
title: "网康NS-ASG应用安全网关源代码泄露漏洞"
product: "网康NS-ASG"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "特定归档文件部署存在，版本名不能自动等于全受影响版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E7%BD%91%E5%BA%B7NS-ASG%E5%BA%94%E7%94%A8%E5%AE%89%E5%85%A8%E7%BD%91%E5%85%B3%E6%BA%90%E4%BB%A3%E7%A0%81/%E7%BD%91%E5%BA%B7NS-ASG%E5%BA%94%E7%94%A8%E5%AE%89%E5%85%A8%E7%BD%91%E5%85%B3%E6%BA%90%E4%BB%A3%E7%A0%81%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/kxdvhozga8301k9t"
source_status: "recorded"
---

# 网康NS-ASG应用安全网关源代码泄露漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：网康NS-ASG
- 本文讨论：protocol/nsasg6.0.tgz静态包暴露
- 版本、权限与配置前提：特定归档文件部署存在，版本名不能自动等于全受影响版本
- 资料类型：源码压缩包暴露线索；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 仅一个URL，无响应/归档文件清单，不能确认源码完整性或敏感内容
- 与cert_download文件读不同暴露原语，不能混同
- FOFA元数据误装残缺Hunter语法
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 归档内容/访问权限及适用部署待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
网康科技有限公司是中国技术领先的网络应用管理设备提供商，专注于网络应用管理领域最前沿的趋势研究和分析，为用户提供先进的网络应用管理技术、产品与解决方案，旨在帮助用户实现“上好网 用好网”的网络管理目标。网康NS-ASG应用安全网关源代码泄露漏洞。

# 二、影响版本
+ 网康应用安全网关系统

# 三、资产测绘
+ hunter`web.title=="网康 NS-ASG 应用安全网关"`
+ 特征


# 四、漏洞复现
```java
/protocol/nsasg6.0.tgz
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/kxdvhozga8301k9t>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
