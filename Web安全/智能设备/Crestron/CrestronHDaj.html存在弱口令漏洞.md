---
source: "wy876 漏洞文库"
id: "vw-1dcaa54a5aee386ff80e5c6b"
entity_id: "ve-1dcaa54a5aee386ff80e5c6b"
schema_version: "1"
title: "Crestron HD 系列默认口令配置风险"
product: "Crestron HD-RX-201-C-E及HD系列声称"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "部署保留默认密码，无固件"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/Crestron/CrestronHDaj.html%E5%AD%98%E5%9C%A8%E5%BC%B1%E5%8F%A3%E4%BB%A4%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ek2kiaazq9fkwyo0"
source_status: "recorded"
---

# Crestron HD 系列默认口令配置风险

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Crestron HD-RX-201-C-E及HD系列声称
- 本文讨论：admin/admin默认或弱口令
- 版本、权限与配置前提：部署保留默认密码，无固件
- 资料类型：默认口令短条目；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 简介复制aj.html参数凭据泄露，与本条弱口令步骤不符
- 无默认密码来源或型号覆盖证据
- 已落实的文本修订：“Crestron HD等系列设备 aj.html页面调用特定的参数可以获取账号密码等敏感信息”改为“本条步骤是对 Crestron HD 设备进行公开默认测试凭据 admin/admin 的登录尝试，前提是部署未修改该默认值；aj.html 参数读取属于另一条凭据泄露线索，不能替代本条默认口令证据”；标题与正文证据对齐。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证
- 本条步骤展示的是 admin/admin 登录尝试，正文复制的 aj.html 凭据泄露属于另一入口；两者应分别判断，默认口令仅在部署未修改时适用。

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 实际默认值和型号/固件范围待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


### 一、漏洞描述
本条步骤是对 Crestron HD 设备进行公开默认测试凭据 admin/admin 的登录尝试，前提是部署未修改该默认值；aj.html 参数读取属于另一条凭据泄露线索，不能替代本条默认口令证据

### 二、影响版本
<font style="color:#000000;">Crestron HD</font>

### 三、资产测绘
```plain
app="Crestron-HD-RX-201-C-E"
```


### 四、漏洞复现
```plain
admin/admin
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ek2kiaazq9fkwyo0>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
