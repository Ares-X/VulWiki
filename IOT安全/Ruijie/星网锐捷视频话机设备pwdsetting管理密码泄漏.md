---
source: "wy876 漏洞文库"
id: "vw-86d066c86541ddf5aa23683f"
entity_id: "ve-86d066c86541ddf5aa23683f"
schema_version: "1"
title: "星网锐捷视频话机设备pwdsetting管理密码泄漏"
product: "STAR-NET视频话机"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "型号/固件/会话均未写"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E6%98%9F%E7%BD%91%E9%94%90%E6%8D%B7%E8%A7%86%E9%A2%91%E8%AF%9D%E6%9C%BA%E8%AE%BE%E5%A4%87pwdsetting%E7%AE%A1%E7%90%86%E5%AF%86%E7%A0%81%E6%B3%84%E6%BC%8F.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/cmom2yrgpqpou44c"
source_status: "recorded"
---

# 星网锐捷视频话机设备pwdsetting管理密码泄漏

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：STAR-NET视频话机
- 本文讨论：/console/secure/pwdsetting管理密码泄漏
- 版本、权限与配置前提：型号/固件/会话均未写
- 资料类型：敏感接口线索；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 只有密码设置页面路径，不展示响应及是否认证，正常管理页不能自动证明未授权泄漏
- 无原始公告或修复，型号笼统

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 密码明文/脱敏、匿名访问和版本需原文核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


**一、漏洞简介**  
<font style="color:rgb(34, 34, 34);">星网锐捷视频话机设备  泄露管理员密码，攻击者可利用密码直接进入后台配置页面，执行恶意操作，为进一步攻击提供帮助。</font>  
**二、影响版本**

星网锐捷视频话机设备

**三、资产测绘**

```plain
body="tmid_top_label"
```

●登录页

**四、漏洞复现**

```plain
/console/secure/pwdsetting
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/cmom2yrgpqpou44c>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
