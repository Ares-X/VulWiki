---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-10c25304697519c869367bb4"
entity_id: "ve-10c25304697519c869367bb4"
schema_version: "1"
title: "思科修复已有 PoC 的根提权漏洞"
product: "Cisco ISE CLI"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-20469"
referenced_identifiers: "CVE-2024-20295; CVE-2024-20401"
prerequisites: "已认证本地管理员；3.2P7/3.3P4修复，3.1及以前/3.4不受影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/%E6%80%9D%E7%A7%91%E4%BF%AE%E5%A4%8D%E5%B7%B2%E6%9C%89%20PoC%20%E7%9A%84%E6%A0%B9%E6%8F%90%E6%9D%83%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  思科修复已有 PoC 的根提权漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cisco ISE CLI
- 本文讨论：CVE-2024-20469
- 版本、权限与配置前提：已认证本地管理员；3.2P7/3.3P4修复，3.1及以前/3.4不受影响
- 资料类型：新闻通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 2024-09-05报道把未来9月/10月计划补丁称已修复，需区分计划和实际可用
- PoC已公开但没有PoC原始链接；缺厂商公告直链
- 主漏洞不能因参考IMC/SEG被跨产品合并

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 当时补丁可用性、PoC和分支范围待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Sergiu Gatlan  代码卫士   2024-09-05 17:24  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**思科已修复 PoC 已公开的一个命令注入漏洞 (CVE-2024-20469)，它可导致攻击者在易受攻击系统上的权限提升至根。**  
  
  
该漏洞位于思科的身份服务引擎 (ISE) 解决方案中。ISE 是基于身份的网络访问控制和策略执行软件，供用户在企业环境中进行网络设备管理和端点访问控制。  
  
该OS命令注入漏洞是由对用户提供输入的验证不充分导致的。本地攻击者可通过在复杂度低的无需用户交互的攻击中提交恶意构造CLI命令的方式利用该漏洞。然而，正如思科解释的那样，威胁行动者只有在未修复系统上已经拥有管理员权限的前提下才能成功利用该漏洞。  
  
思科在本周三发布的安全公告中提到，“思科ISE的特定CLI命令中存在一个漏洞，可导致认证的本地攻击者在底层操作系统上执行命令注入攻击并将权限提升至根。思科产品安全应急响应团队发现已存在针对公告中所提漏洞的 PoC 利用代码。”  
<table><thead><tr><td valign="top" style="border-color: rgb(29, 54, 82);background: rgb(238, 238, 238);" width="225"><p style="text-align:center;margin-bottom: 15px;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><strong><span style="color: rgb(51, 51, 51);font-family: Arial, sans-serif;">Cisco ISE </span></strong><strong><span style="color: rgb(51, 51, 51);font-family: 宋体;">发布</span></strong></span></p></td><td valign="top" style="border-top-color: rgb(29, 54, 82);border-right-color: rgb(29, 54, 82);border-bottom-color: rgb(29, 54, 82);border-left: none;background: rgb(238, 238, 238);" width="201"><p style="text-align:center;margin-bottom: 15px;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><strong><span style="color: rgb(51, 51, 51);font-family: 宋体;">首次修复的发布</span></strong></span></p></td></tr></thead><tbody><tr><td valign="top" style="border-right-color: rgb(29, 54, 82);border-bottom-color: rgb(29, 54, 82);border-left-color: rgb(29, 54, 82);border-top: none;" width="225"><p style="text-align:left;margin-bottom: 15px;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><span style="color: rgb(51, 51, 51);font-family: Arial, sans-serif;">3.1 </span><span style="color: rgb(51, 51, 51);font-family: 宋体;">及更早版本</span></span></p></td><td valign="top" style="border-top: none;border-left: none;border-bottom-color: rgb(29, 54, 82);border-right-color: rgb(29, 54, 82);" width="201"><p style="text-align:left;margin-bottom: 15px;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="color: rgb(51, 51, 51);font-size: 15px;letter-spacing: 1px;font-family:宋体;">不受影响</span></p></td></tr><tr><td valign="top" style="border-right-color: rgb(29, 54, 82);border-bottom-color: rgb(29, 54, 82);border-left-color: rgb(29, 54, 82);border-top: none;" width="225"><p style="text-align:left;margin-bottom: 15px;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="color: rgb(51, 51, 51);font-size: 15px;letter-spacing: 1px;font-family:Arial, sans-serif;">3.2</span></p></td><td valign="top" style="border-top: none;border-left: none;border-bottom-color: rgb(29, 54, 82);border-right-color: rgb(29, 54, 82);" width="201"><p style="text-align:left;margin-bottom: 15px;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><span style="color: rgb(51, 51, 51);font-family: Arial, sans-serif;">3.2P7</span><span style="color: rgb(51, 51, 51);font-family: 宋体;">（</span><span style="color: rgb(51, 51, 51);font-family: Arial, sans-serif;">2024</span><span style="color: rgb(51, 51, 51);font-family: 宋体;">年</span><span style="color: rgb(51, 51, 51);font-family: Arial, sans-serif;">9</span><span style="color: rgb(51, 51, 51);font-family: 宋体;">月）</span></span></p></td></tr><tr><td valign="top" style="border-right-color: rgb(29, 54, 82);border-bottom-color: rgb(29, 54, 82);border-left-color: rgb(29, 54, 82);border-top: none;" width="225"><p style="text-align:left;margin-bottom: 15px;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="color: rgb(51, 51, 51);font-size: 15px;letter-spacing: 1px;font-family:Arial, sans-serif;">3.3</span></p></td><td valign="top" style="border-top: none;border-left: none;border-bottom-color: rgb(29, 54, 82);border-right-color: rgb(29, 54, 82);" width="201"><p style="text-align:left;margin-bottom: 15px;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><span style="color: rgb(51, 51, 51);font-family: Arial, sans-serif;">3.3P4</span><span style="color: rgb(51, 51, 51);font-family: 宋体;">（</span><span style="color: rgb(51, 51, 51);font-family: Arial, sans-serif;">2024</span><span style="color: rgb(51, 51, 51);font-family: 宋体;">年</span><span style="color: rgb(51, 51, 51);font-family: Arial, sans-serif;">10</span><span style="color: rgb(51, 51, 51);font-family: 宋体;">月）</span></span></p></td></tr><tr><td valign="top" style="border-right-color: rgb(29, 54, 82);border-bottom-color: rgb(29, 54, 82);border-left-color: rgb(29, 54, 82);border-top: none;" width="225"><p style="text-align:left;margin-bottom: 15px;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="color: rgb(51, 51, 51);font-size: 15px;letter-spacing: 1px;font-family:Arial, sans-serif;">3.4</span></p></td><td valign="top" style="border-top: none;border-left: none;border-bottom-color: rgb(29, 54, 82);border-right-color: rgb(29, 54, 82);" width="201"><p style="text-align:left;margin-bottom: 15px;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="color: rgb(51, 51, 51);font-size: 15px;letter-spacing: 1px;font-family:宋体;">不受影响</span></p></td></tr></tbody></table>  
  
截止到目前，思科并未发现该漏洞在野利用的证据。  
  
思科在今天提醒客户称已删除Smart Licensing Utility （智能许可工具）Windows 软件中的一个后门账户，可被攻击者用于以管理员权限登录未修复系统。  
  
4月份，思科发布 Integrated Management Controller（IMC，集成管理控制器）漏洞CVE-2024-20295的安全补丁。该漏洞的 PoC 已存在，可导致本地攻击者将权限提升至根。另外一个严重漏洞 (CVE-2024-20401) 可导致威胁行动者们添加恶意根用户并通过恶意邮件使安全邮件网关 (SEG) 设备崩溃，已在上个月修复。就在同一周，思科提醒用户注意，易受攻击的Cisco Smart Software Manager On-Prem（Cisco SSM On-Prem，思科本地智能软件管理器）许可服务器中存在一个满分漏洞，可导致攻击者修改任何用户密码，包括管理员密码在内。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[思科修复由NSA报送的两个高危漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520566&idx=1&sn=74a7817b3955a25dccb8da1009e1b185&chksm=ea94a05cdde3294ad5842ade4355f86f5346f7c319e2260c6999b9fc84577eeff1b3f257c0f3&scene=21#wechat_redirect)  
  
  
[思科：注意这些已达生命周期IP电话中的RCE 0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520401&idx=2&sn=bad61fd4a7dd0064d773564100fa0d93&chksm=ea94a1fbdde328ed9792a7787f0942bd8375dfb3d8e89c5d0413c4d48ad449acff958b59a1b2&scene=21#wechat_redirect)  
  
  
[思科严重漏洞可导致黑客在SEG设备上添加 root 用户](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520104&idx=2&sn=7a044b182ec50064eba8b67fb588a968&chksm=ea94be02dde33714a87ec047348cf4004a40a24f05ca079479dd287aec723a3790919198933e&scene=21#wechat_redirect)  
  
  
[思科 SSM 本地漏洞可用于修改任意用户的密码](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520092&idx=1&sn=2c708cd0c74c042942553df613872635&chksm=ea94be36dde33720d8a6f9c9e9a9916bd1d19d05920d0f2d2081b29cbced7d6cf15ffee76430&scene=21#wechat_redirect)  
  
  
[德国政府会议信息遭泄露，思科修复 Webex 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519685&idx=3&sn=5ff2515ea003efe342365bfb3e9d8af7&chksm=ea94bcafdde335b9fed2634f43fe71bf14953a3fbc06a298ce9ac436a576ce39e6b2dfa25269&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/cisco-fixes-root-escalation-vulnerability-with-public-exploit-code/  
  
  
题图：  
Pixabay  
 License  
  
****  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](../../.resource/remote/2c03ce3cc6bb81bca85bd412ed60e93c4bc0a295a1fc9d3739d8aca43497fbb4.jpg "")  
  
![](../../.resource/remote/b33054170f5acbf0023711f517b5bee9799a2f57b155a774d3945e6d78184e63.jpg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](../../.resource/remote/8a5c84b98d9b52b1d4f4306180ec26c9aa65342b326b5b98ad2f097b488152f4.gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
