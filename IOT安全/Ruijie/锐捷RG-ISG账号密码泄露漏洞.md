---
source: "wy876 漏洞文库"
id: "vw-25063d2883e182fb15708e80"
entity_id: "ve-25063d2883e182fb15708e80"
schema_version: "1"
title: "锐捷RG-ISG账号密码泄露漏洞"
product: "Ruijie RG-ISG"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "首页可读；需猜解MD5，固件未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7RG-ISG%E8%B4%A6%E5%8F%B7%E5%AF%86%E7%A0%81%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gq2226cz30ascc2d"
source_status: "recorded"
---

# 锐捷RG-ISG账号密码泄露漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie RG-ISG
- 本文讨论：首页persons泄露密码摘要
- 版本、权限与配置前提：首页可读；需猜解MD5，固件未知
- 资料类型：凭据泄漏线索；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 无任何响应示例/字段结构，仅搜索persons不能证明凭据泄露
- MD5解密表述错误且不能保证恢复密码
- 不可与RG-UAC仅因相同MD5情形跨产品直接合并
- 已落实的文本修订：“可以获取密码的md5值, 解密后获取后台权限”改为“可能获取密码的 MD5 摘要；摘要不能可逆解密，是否能恢复弱口令并登录需另行验证”。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 摘要算法、匿名泄露和产品范围待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


**一、漏洞简介**

<font style="color:rgb(51, 51, 51);">锐捷ISG存在账号密码泄露漏洞，可能获取密码的 MD5 摘要；摘要不能可逆解密，是否能恢复弱口令并登录需另行验证</font>

**二、影响版本**  
锐捷RG-ISG  
**三、资产测绘**

`title="RG-ISG"`  
●登录页面


  
**四、漏洞复现**  


首页查看源代码，搜索<font style="color:rgb(0, 0, 0);">persons </font>字段


  


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gq2226cz30ascc2d>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
