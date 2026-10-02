---
source: "wy876 漏洞文库"
id: "vw-cd9e58a3ecd922ef611af410"
entity_id: "ve-cd9e58a3ecd922ef611af410"
schema_version: "1"
fofa_unverified: "app.name="
title: "锐捷RG-UAC统一上网行为管理审计系统信息泄漏漏洞"
product: "Ruijie RG-UAC"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CNVD-2021-14536"
referenced_identifiers: ""
prerequisites: "登录页可读；未给版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7RG-UAC%E7%BB%9F%E4%B8%80%E4%B8%8A%E7%BD%91%E8%A1%8C%E4%B8%BA%E7%AE%A1%E7%90%86%E5%AE%A1%E8%AE%A1%E7%B3%BB%E7%BB%9F%E4%BF%A1%E6%81%AF%E6%B3%84%E6%BC%8F%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/vphzyvniletxc028"
source_status: "recorded"
---

# 锐捷RG-UAC统一上网行为管理审计系统信息泄漏漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie RG-UAC
- 本文讨论：首页super_admin密码摘要泄露，关联CNVD-2021-14536
- 版本、权限与配置前提：登录页可读；未给版本
- 资料类型：凭据泄露重复摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 同730739入口但省略MD5性质，读者可能误当明文
- 仅F12搜索描述，无输出/修复/编号；元数据残缺
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 该实例摘要格式与CNVD对应待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
锐捷RG-UAC统一上网行为管理审计系统存在账号密码信息泄露,可以间接获取用户账号密码信息登录后台 。

# 二、影响版本
+ 锐捷RG-UAC统一上网行为管理审计系统

# 三、资产测绘
+ hunter`app.name="Ruijie 锐捷 RG-UAC"`
+ 登录页面


# 四、漏洞复现
1. `F12`搜索`super_admin`字段，发现`admin`账户和密码


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/vphzyvniletxc028>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
