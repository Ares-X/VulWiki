---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-7633761f72b0607477e5a02f"
entity_id: "ve-7633761f72b0607477e5a02f"
schema_version: "1"
title: "思科提醒注意Small Business路由器中的XSS漏洞"
product: "Cisco Small Business RV系列"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-20362"
referenced_identifiers: ""
prerequisites: "未认证攻击者诱导管理用户访问页面；EOL设备，包含RV320等全部固件"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/%E6%80%9D%E7%A7%91%E6%8F%90%E9%86%92Small%20Business%E8%B7%AF%E7%94%B1%E5%99%A8%E4%B8%AD%E7%9A%84XSS%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  思科提醒注意Small Business路由器中的XSS漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cisco Small Business RV系列
- 本文讨论：CVE-2024-20362
- 版本、权限与配置前提：未认证攻击者诱导管理用户访问页面；EOL设备，包含RV320等全部固件
- 资料类型：新闻通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 首段型号漏RV320，后表包含；称型号为软件发布/版本不准确
- 前称EOL不发补丁，后建议更新至最新版本，修复建议自相矛盾
- 无正式workaround与禁远程管理降低暴露应区分；无官方直链

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 产品范围与官方缓解建议待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

 代码卫士   2024-04-07 17:38  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**思科提醒注意 Small Business RV016、RV042、RV042G、RV082和RV325路由器中的一个XSS漏洞。**  
  
  
  
该中危漏洞编号是CVE-2024-20362，位于思科 Small Business RV016、RV042、RV042G、RV082和RV325路由器的 web 管理接口中。未认证的远程攻击者可对接口用户实施XSS攻击。  
  
思科表示受影响设别已达生命周期，将不会发布软件更新，也不存在应变措施。  
  
思科在安全公告中提到，“该漏洞是因为web管理接口的输入验证不当造成的。攻击者可说服用户访问包含恶意 payload的特定网页，利用该漏洞。成功利用该漏洞可导致攻击者在受影响接口的上下文中执行任意脚本代码或访问敏感的基于浏览器的信息。”  
  
该漏洞影响所有如下软件发布：  
  
- RV016 Multi-WAN VPN Routers  
  
- RV042 Dual WAN VPN Routers  
  
- RV042G Dual Gigabit WAN VPN Routers  
  
- RV082 Dual WAN VPN Routers  
  
- RV320 Dual Gigabit WAN VPN Routers  
  
- RV325 Dual Gigabit WAN VPN Routers  
  
  
  
思科建议禁用远程管理功能，拦截对443和60443端口的访问，缓解该漏洞。之后，用户仍可通过LAN接口访问设备。思科并未发现该漏洞已遭利用的迹象。思科建议用户尽快更新至最新版本。如下版本不受影响：  
  
- RV160 VPN Routers  
  
- RV160W Wireless-AC VPN Routers  
  
- RV260 VPN Routers  
  
- RV260P VPN Routers with PoE  
  
- RV260W Wireless-AC VPN Routers  
  
- RV340 Dual WAN Gigabit VPN Routers  
  
- RV340W Dual WAN Gigabit Wireless-AC VPN Routers  
  
- RV345 Dual WAN Gigabit VPN Routers  
  
- RV345P Dual WAN Gigabit PoE VPN Routers  
  
  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[思科服务器管理工具中存在 XSS 0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516356&idx=1&sn=3a870e38244c8f43090fe23f54c81fa7&chksm=ea94b1aedde338b8242499091a2cb37dec7924bffa0bde2f1dc62c5d42e10242fb0125850d86&scene=21#wechat_redirect)  
  
  
[思科IOS 漏洞可导致未认证的远程DoS 攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519204&idx=2&sn=6fc646b9575f6837ef0f55d569c11709&chksm=ea94ba8edde33398e567236352d40e34414aa12c9e4bd4d838bff320754289021c2fafcc02b8&scene=21#wechat_redirect)  
  
  
[思科提醒注意通信软件中的严重 RCE 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518760&idx=2&sn=d82d599134c7b2a410f4ccfe05d73d96&chksm=ea94bb42dde33254d6f854bc5b194c69fc4038bdbac099637195d80d4e0b19bd6ede6758ace6&scene=21#wechat_redirect)  
  
  
[思科称严重的 Unity Connection 漏洞可导致攻击者获得root权限](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518649&idx=1&sn=21ff8ab835664822aef75af18b5178a8&chksm=ea94b8d3dde331c5c49a02303ecda17deb3b8897d8bee8be24590ef862f6d2be63c6f37b66cd&scene=21#wechat_redirect)  
  
  
[罗克韦尔自动化称 Stratix 交换机受思科0day影响](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517980&idx=1&sn=ffc848776d7e9915b3d800a23587fda9&chksm=ea94b676dde33f6029a679ed808213cb1d41ffd5a8ca6b04cf84a414175c08db3c21817c5f49&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://securityaffairs.com/161540/security/cisco-eof-routers-xss.html  
  
  
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
