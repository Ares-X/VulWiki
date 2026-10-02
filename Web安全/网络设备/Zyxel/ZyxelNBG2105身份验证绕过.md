---
source: "wy876 漏洞文库"
id: "vw-01d99371aa77e14207124984"
entity_id: "ve-01d99371aa77e14207124984"
schema_version: "1"
title: "Zyxel NBG2105身份验证绕过"
product: "Zyxel NBG2105 V1.00(AAGU.2)C0"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2021-3297"
referenced_identifiers: ""
prerequisites: "简介需cookie login=1，步骤只给URL"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Zyxel/ZyxelNBG2105%E8%BA%AB%E4%BB%BD%E9%AA%8C%E8%AF%81%E7%BB%95%E8%BF%87.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ofagy15qnxr8eg9f"
source_status: "recorded"
---

# Zyxel NBG2105身份验证绕过

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Zyxel NBG2105 V1.00(AAGU.2)C0
- 本文讨论：与CVE-2021-3297同login_ok入口
- 版本、权限与配置前提：简介需cookie login=1，步骤只给URL
- 资料类型：认证绕过短摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- CVE未录；正文步骤遗漏cookie前提；无业务授权结果或修复

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 该固件映射及访问页面与获得权限的区别待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
在Zyxel NBG2105 V1.00（AAGU.2）C0设备上，将登录cookie设置为1可提供管理员访问权限。

# 二、影响版本
+ Zyxel NBG2105

# 三、资产测绘
+ fofa`app="ZyXEL-NBG2105"`
+ 特征


# 四、漏洞复现
直接访问如下poc即可绕过身份验证进入后台

```plain
/login_ok.htm
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ofagy15qnxr8eg9f>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
