---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-96517ef3e38ca454ff80c7f9"
entity_id: "ve-96517ef3e38ca454ff80c7f9"
schema_version: "1"
title: "HPE Instant On设备存在硬编码凭证漏洞，可获取管理员权限"
product: "HPE Instant On接入点"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-37103; CVE-2025-37102"
referenced_identifiers: ""
prerequisites: "硬编码凭据获管理→已认证CLI注入；3.2.1.0修复；交换机不受影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/HPE/HPE%20Instant%20On%E8%AE%BE%E5%A4%87%E5%AD%98%E5%9C%A8%E7%A1%AC%E7%BC%96%E7%A0%81%E5%87%AD%E8%AF%81%E6%BC%8F%E6%B4%9E%EF%BC%8C%E5%8F%AF%E8%8E%B7%E5%8F%96%E7%AE%A1%E7%90%86%E5%91%98%E6%9D%83%E9%99%90.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  HPE Instant On设备存在硬编码凭证漏洞，可获取管理员权限  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：HPE Instant On接入点
- 本文讨论：CVE-2025-37103；CVE-2025-37102
- 版本、权限与配置前提：硬编码凭据获管理→已认证CLI注入；3.2.1.0修复；交换机不受影响
- 资料类型：双漏洞新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 缺HPE官方公告直链与具体受影响最低版本
- 组合链标可能合理，未提供完整利用验证，不能当单漏洞RCE

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 登录服务可达性、完整版本范围待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

 FreeBuf   2025-07-21 10:03  
  
![](../../.resource/remote/a292ac9cc234e46f20d8114e58408ccfc661566640b7fb44ab2686d5eeb8dc3a.gif "")  
  
  
![image](../../.resource/remote/c549bd160180fdfa25478182a5c5e7b32a28d285e797c544c141be572dcd7ea9.jpg "")  
  
  
**Part01**  
## 高危漏洞详情  
##   
  
慧与（Hewlett-Packard Enterprise，HPE，前身为惠普）近日发布安全更新，修复Instant On接入点设备中存在的一个高危安全漏洞（CVE-2025-37103）。该漏洞CVSS评分为9.8分（满分10分），攻击者可利用该漏洞绕过身份验证，获取受影响系统的管理员权限。  
  
  
HPE在安全公告中表示："我们在HPE Networking Instant On接入点设备中发现存在硬编码登录凭证，任何知晓该凭证的人员均可绕过常规设备认证机制。成功利用该漏洞可使远程攻击者获得系统管理员权限。"  
  
  
**Part02**  
## 关联漏洞风险  
  
  
HPE同时修复了Instant On接入点设备命令行界面中的认证命令注入漏洞（CVE-2025-37102，CVSS评分7.2）。远程攻击者可在提升权限后，以特权用户身份在底层操作系统上执行任意命令。  
  
  
值得注意的是，攻击者可能将CVE-2025-37103和CVE-2025-37102组合利用，形成完整的攻击链：先获取管理员权限，再通过命令行界面注入恶意命令实施后续攻击活动。  
  
  
**Part03**  
## 修复方案  
  
  
HPE确认这两处漏洞由Ubisectech Sirius团队的ZZ发现并报告。目前漏洞已在HPE Networking Instant On软件3.2.1.0及以上版本中修复。HPE特别说明，其他设备（如Instant On交换机）不受此漏洞影响。  
  
  
虽然目前尚未发现这两个漏洞被实际利用的证据，但HPE仍建议用户尽快安装更新以防范潜在威胁。  
  
  
**参考来源：**  
  
Hard-Coded Credentials Found in HPE Instant On Devices Allow Admin Access  
  
https://thehackernews.com/2025/07/hard-coded-credentials-found-in-hpe.html  
  
  
###   
###   
###   
  
**推荐阅读**  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651324992&idx=1&sn=8303e67651ddba23a73497aeb18955fa&scene=21#wechat_redirect)  
  
### 电台讨论  
  
****  
  
  
  
![图片](../../.resource/remote/9e6a809b9fdf5ef44cf7cd86b8e001b4411ee0bfd0f43b726a7d5f1d85e9c9a1.gif "")  
  
   
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
