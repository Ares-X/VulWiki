---
source: "wy876 漏洞文库"
id: "vw-9a76c576d80cffbe4e89c13b"
entity_id: "ve-9a76c576d80cffbe4e89c13b"
schema_version: "1"
title: "WIFISKY 7层流控路由器存在弱口令漏洞"
product: "WIFISKY 7层流控路由器"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "部署保留该凭据；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/WIFISKY/WIFISKY7%E5%B1%82%E6%B5%81%E6%8E%A7%E8%B7%AF%E7%94%B1%E5%99%A8%E5%AD%98%E5%9C%A8%E5%BC%B1%E5%8F%A3%E4%BB%A4%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/xovl7d0wfl2x9txr"
source_status: "recorded"
previous_fofa_unverified: "title="
fofa: "title=\"WIFISKY 7层流控路由器\""
---

# WIFISKY 7层流控路由器存在弱口令漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：WIFISKY 7层流控路由器
- 本文讨论：admin/admin弱或默认口令配置
- 版本、权限与配置前提：部署保留该凭据；版本未知
- 资料类型：弱口令提示；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 仅凭据，缺默认配置依据/实测范围/修复；fofa字段残缺
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 默认值和通用适用范围待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
WIFISKY-7层流控路由器是深圳市领空技术有限公司（简称“领空技术"）的一款产品，深圳市领空技术有限公司是扎根深圳辐射的网络通讯设备供应商，致力于网络通讯设备产品的研究与开发。WIFISKY 7层流控路由器存在弱口令漏洞。

# 二、影响版本
+ WIFISKY-7层流控路由器

# 三、资产测绘
+ fofa`title="WIFISKY 7层流控路由器"`
+ 特征


# 四、漏洞复现
```http
admin/admin
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xovl7d0wfl2x9txr>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
