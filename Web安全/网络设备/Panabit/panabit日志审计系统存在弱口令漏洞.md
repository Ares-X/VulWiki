---
source: "wy876 漏洞文库"
id: "vw-eaed51c4b368bb2df6fd1acf"
entity_id: "ve-eaed51c4b368bb2df6fd1acf"
schema_version: "1"
fofa_unverified: "app.name="
title: "panabit日志审计系统存在弱口令漏洞"
product: "Panabit Panalog"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "部署仍保留该密码；无版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Panabit/panabit%E6%97%A5%E5%BF%97%E5%AE%A1%E8%AE%A1%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8%E5%BC%B1%E5%8F%A3%E4%BB%A4%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/wro15wwfur3dpy3r"
source_status: "recorded"
---

# panabit日志审计系统存在弱口令漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Panabit Panalog
- 本文讨论：admin/panabit默认或弱口令配置
- 版本、权限与配置前提：部署仍保留该密码；无版本
- 资料类型：默认弱口令提示；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 只给凭据无默认值来源/固件版本，不能泛称全部产品漏洞
- fofa字段实际为残缺Hunter规则；无修复建议
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 厂商默认设置与实测弱密码区分待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
panalog为北京派网软件有限公司，一款流量分析，日志分析管理的一款软件。panabit日志审计系统存在弱口令漏洞，攻击者可通过该漏洞获取应用系统权限。

# 二、影响版本
+ Panabit panalog

# 三、资产测绘
+ hunter`app.name="Panabit 日志系统"`
+ 特征


# 四、漏洞复现
```plain
admin/panabit
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/wro15wwfur3dpy3r>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
