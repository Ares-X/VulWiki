---
source: "wy876 漏洞文库"
id: "vw-b1d1a3083202eb17aa844bdc"
entity_id: "ve-b1d1a3083202eb17aa844bdc"
schema_version: "1"
title: "海康威视SPON IP网络对讲广播系统存在后门账号漏洞"
product: "标称Hikvision SPON IP广播系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "具体版本/登录路径未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86SPONIP%E7%BD%91%E7%BB%9C%E5%AF%B9%E8%AE%B2%E5%B9%BF%E6%92%AD%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8%E5%90%8E%E9%97%A8%E8%B4%A6%E5%8F%B7%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/rimo5nnt3a0yraea"
source_status: "recorded"
---

# 海康威视SPON IP网络对讲广播系统存在后门账号漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：标称Hikvision SPON IP广播系统
- 本文讨论：宣称固定administrator账号后门
- 版本、权限与配置前提：具体版本/登录路径未知
- 资料类型：硬编码账号线索；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 只给账号密码没有所称写死源码或登录验证，不能区分默认可改凭据与不可改后门
- 厂商身份/固件范围均不明，宽泛指纹不足

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 是否后门、默认口令或测试账号及有效范围待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
<font style="color:rgba(0, 0, 0, 0.9);">Hikvision Intercom Broadcasting System是中国海康威视（Hikvision）公司的一个对讲广播系统。海康威视SPON IP网络对讲广播系统存在后门账号漏洞。</font>

# <font style="color:rgba(0, 0, 0, 0.9);">二、影响版本</font>
+ 海康威视SPON IP网络对讲广播系统

# 三、资产测绘
+ Hunter：`web.body="vendors/custom/html5.min.js"`
+ 特征


# 四、漏洞复现
后门账号在代码中写死的

```java
后门账号：
administrator/800823
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/rimo5nnt3a0yraea>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
