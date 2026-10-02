---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-2ead1fb19ccbabbab6213b74"
entity_id: "ve-2ead1fb19ccbabbab6213b74"
schema_version: "1"
title: "思科提醒注意满分 Secure FMC 漏洞可用于获取 root 权限"
product: "Cisco Secure FMC；SCC Firewall Management"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2026-20079; CVE-2026-20131"
referenced_identifiers: ""
prerequisites: "两者未认证；20131另影响SCC；无版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/%E6%80%9D%E7%A7%91%E6%8F%90%E9%86%92%E6%BB%A1%E5%88%86%20Secure%20FMC%20%E6%BC%8F%E6%B4%9E%E5%8F%AF%E7%94%A8%E4%BA%8E%E8%8E%B7%E5%8F%96%20root%20%E6%9D%83%E9%99%90.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  思科提醒注意满分 Secure FMC 漏洞可用于获取 root 权限  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cisco Secure FMC；SCC Firewall Management
- 本文讨论：CVE-2026-20079；CVE-2026-20131
- 版本、权限与配置前提：两者未认证；20131另影响SCC；无版本
- 资料类型：双漏洞新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 以CVE-2026-20079公告引文统包序列化Java对象描述，疑把20131机制并入20079
- 没有受影响/修复版本及厂商直链
- 两个独立主漏洞不能被单一root结果强合并

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 各CVE机制和版本范围待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Sergiu Gatlan
                    Sergiu Gatlan  代码卫士   2026-03-05 09:42  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**思科发布安全更新，修复了位于 Secure Firewall Management Center (FMC) 软件中的两个满分漏洞CVE-2026-20079和CVE-2026-20131。**  
  
  
  
  
Secure FMC 是一款基于 web 或 SSH 的接口，供管理员管理思科防火墙和配置应用控制、入侵防御、URL 过滤和高阶恶意软件防护。这两个漏洞均可遭未经身份验证攻击者的远程利用：认证绕过漏洞（CVE-2026-20079）可导致攻击者获得对底层操作系统的 root 访问权限，而RCE漏洞（CVE-2026-20131）可导致攻击者在未修复设备上以 root 身份执行任意 Java 代码。  
  
CVE-2026-20079的安全公告提到，“攻击者可通过向受影响设备发送构造 HTTP 请求的方式利用该漏洞。成功利用可导致攻击者执行多种脚本和命令，从而获得对设备的 root 访问权限。攻击者可通过向受影响设备基于 web 的管理接口发送构造序列化 Java 对象的方式利用该漏洞，可导致攻击者在设备上执行任意代码并将权限提升至 root。”  
  
虽然这两个漏洞均影响 Secure FMC 软件，但 CVE-2026-20131还同时影响基于云的安全策略管理器思科 Security Cloud Control (SCC) Firewall Management，而改管理器可简化思科防火墙和其它设备的策略。  
  
目前，思科表示尚未发现这两个漏洞遭在野利用或者 PoC 利用代码已公开发布的证据。另外，思科还修复了十几个其它漏洞，其中15个高危漏洞位于 Secure FMC、Secure Firewall Adaptive Security Appliance 和 Secure Firewall Threat Defense 软件中。  
  
去年8月，思科还修复了另外一个满分的Secure FMC 漏洞，并提醒该漏洞可导致未经身份验证的远程攻击者注入可在未修复设备上执行的任意 shell 命令。今年1月份，思科还修复了一个 AsyncOS 0day漏洞，该漏洞自去年11月起已遭利用，目前已修复。上个月，思科 Catalyst SD-WAN 认证绕过漏洞也在0day 状态下遭利用，可导致远程攻击者攻陷控制器并向目标网络添加恶意欺诈对等节点。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[思科修复已遭利用的 Unified CM RCE 0day漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524955&idx=2&sn=922edf69046bb2a552b3f58f4f21f882&scene=21#wechat_redirect)  
  
  
[思科：速修复已出现 exp 的身份服务引擎漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524828&idx=1&sn=d0696191628f6b13a09be6edecbbec4d&scene=21#wechat_redirect)  
  
  
[思科修复 Contact Center Appliance 中的多个严重漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524343&idx=2&sn=54f09a81eb6da8e9b06f5a17b8b70644&scene=21#wechat_redirect)  
  
  
[速修复！思科ASA 两个0day漏洞已遭利用，列入 CISA KEV 清单](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524078&idx=1&sn=a668c49a8bfda90e1da60201307dc79b&scene=21#wechat_redirect)  
  
  
[思科修复影响路由器和交换机的 0day 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524071&idx=1&sn=31248d9d535baaa71b2ec67ceef617e8&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/cisco-warns-of-max-severity-secure-fmc-flaws-giving-root-access/  
  
  
题图：Pixa  
bay Licens  
e  
  
  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSf7nNLWrJL6dkJp7RB8Kl4zxU9ibnQjuvo4VoZ5ic9Q91K3WshWzqEybcroVEOQpgYfx1uYgwJhlFQ/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSN5sfviaCuvYQccJZlrr64sRlvcbdWjDic9mPQ8mBBFDCKP6VibiaNE1kDVuoIOiaIVRoTjSsSftGC8gw/640?wx_fmt=jpeg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ5iciaeKS21icDIWSVd0M9zEhicFK0rbCJOrgpc09iaH6nvqvsIdckDfxH2K4tu9CvPJgSf7XhGHJwVyQ/640?wx_fmt=gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
