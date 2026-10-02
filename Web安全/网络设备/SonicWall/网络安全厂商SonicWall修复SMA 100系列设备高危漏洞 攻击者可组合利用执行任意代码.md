---
cve: "CVE-2025-32819"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-6fe774f854bc995983921d30"
entity_id: "ve-6fe774f854bc995983921d30"
schema_version: "1"
title: "网络安全厂商SonicWall修复SMA 100系列设备高危漏洞 攻击者可组合利用执行任意代码"
product: "SonicWall SMA100"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-32819"
referenced_identifiers: ""
prerequisites: "低权限SSLVPN会话到管理员；修复10.2.1.15-81sv"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/SonicWall/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8%E5%8E%82%E5%95%86SonicWall%E4%BF%AE%E5%A4%8DSMA%20100%E7%B3%BB%E5%88%97%E8%AE%BE%E5%A4%87%E9%AB%98%E5%8D%B1%E6%BC%8F%E6%B4%9E%20%E6%94%BB%E5%87%BB%E8%80%85%E5%8F%AF%E7%BB%84%E5%90%88%E5%88%A9%E7%94%A8%E6%89%A7%E8%A1%8C%E4%BB%BB%E6%84%8F%E4%BB%A3%E7%A0%81.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  网络安全厂商SonicWall修复SMA 100系列设备高危漏洞 攻击者可组合利用执行任意代码   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：SonicWall SMA100
- 本文讨论：CVE-2025-32819/32820/32821
- 版本、权限与配置前提：低权限SSLVPN会话到管理员；修复10.2.1.15-81sv
- 资料类型：三漏洞攻击链预警；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 元数据只32819遗漏两个主漏洞
- 缺Rapid7及厂商精确链接；私有IOC支撑可能在野的来源不可追溯
- 所有版本泛化未列产品分支

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 具体修复范围、组合步骤及利用状态待来源核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

鹏鹏同学  黑猫安全   2025-05-11 23:00  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/8dBEfDPEceibod01MkGXBORy4xnoicKSz6icPv9naUnjicG49B86zG1NgALC9lAAibAGiaZFmMz5pg3pzmBn4G2gRX3g/640?wx_fmt=png&from=appmsg "")  
  
漏洞详情：  
1. CVE-2025-32819（CVSS 8.8分）  
  
- 类型：SSL VPN用户身份认证后任意文件删除漏洞  
  
- 影响：通过绕过路径遍历检查，攻击者可删除任意文件导致设备恢复出厂设置  
  
1. CVE-2025-32820（CVSS 8.3分）  
  
- 类型：SSL VPN用户路径遍历漏洞  
  
- 影响：认证攻击者可修改设备任意目录写入权限  
  
1. CVE-2025-32821（CVSS 6.7分）  
  
- 类型：SSL VPN管理员命令注入漏洞  
  
- 影响：攻击者可通过文件上传功能注入Shell命令参数  
  
技术分析：  
  
Rapid7研究团队于2025年4月发现这三个漏洞可形成完整攻击链：  
1. 利用低权限SSL VPN会话Cookie  
  
1. 通过删除数据库文件重置管理员密码  
  
1. 获取/bin目录写入权限  
  
1. 执行反向Shell载荷实现root级远程代码执行  
  
安全预警：  
- 受影响版本：10.2.1.15-81sv之前所有版本  
  
- 修复方案：立即升级至10.2.1.15-81sv版本  
  
- 潜在威胁：根据私有IOC证据，该漏洞可能已被在野利用  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
