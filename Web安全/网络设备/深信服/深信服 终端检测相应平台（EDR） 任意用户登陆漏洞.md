---
source: "hatch 补库批 20260928"
id: "vw-f6654b3877625610ee08cebd"
entity_id: "ve-f6654b3877625610ee08cebd"
schema_version: "1"
title: "深信服 终端检测相应平台（EDR） 任意用户登陆漏洞"
product: "Sangfor EDR管理平台"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "声称≤3.2.19，user任意填"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E6%B7%B1%E4%BF%A1%E6%9C%8D/%E6%B7%B1%E4%BF%A1%E6%9C%8D%20%E7%BB%88%E7%AB%AF%E6%A3%80%E6%B5%8B%E7%9B%B8%E5%BA%94%E5%B9%B3%E5%8F%B0%EF%BC%88EDR%EF%BC%89%20%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E7%99%BB%E9%99%86%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

# 深信服 终端检测相应平台（EDR） 任意用户登陆漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Sangfor EDR管理平台
- 本文讨论：ui/login.php user认证绕过
- 版本、权限与配置前提：声称≤3.2.19，user任意填
- 资料类型：EDR任意用户登录短摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 任意用户名均可与342要求用户名必须存在冲突
- 仅URL+截图无权限验证；图片引用后重复路径尾巴，简介为空

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 用户名存在性与版本上界/服务器授权待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


一、漏洞简介
------------

二、漏洞影响
------------

EDR \<= v3.2.19

三、复现过程
------------

payload：user后面任意填写都ok

    https://www.0-sec.org:443/ui/login.php?user=admin

![15.png](./.resource/深信服终端检测相应平台EDR任意用户登陆漏洞/media/rId24.png)任意用户登陆漏洞/media/rId24.png)
