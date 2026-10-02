---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-b99c911db2366c5c7a65d6c9"
entity_id: "ve-b99c911db2366c5c7a65d6c9"
schema_version: "1"
title: "思科严重漏洞可导致黑客在SEG设备上添加 root 用户"
product: "Cisco Secure Email Gateway AsyncOS/Content Scanner Tools"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-20401"
referenced_identifiers: ""
prerequisites: "文件分析或内容过滤应用于入站策略，CST<23.3.0.4823；15.5.1-055默认含修复"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/%E6%80%9D%E7%A7%91%E4%B8%A5%E9%87%8D%E6%BC%8F%E6%B4%9E%E5%8F%AF%E5%AF%BC%E8%87%B4%E9%BB%91%E5%AE%A2%E5%9C%A8SEG%E8%AE%BE%E5%A4%87%E4%B8%8A%E6%B7%BB%E5%8A%A0%20root%20%E7%94%A8%E6%88%B7.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  思科严重漏洞可导致黑客在SEG设备上添加 root 用户   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cisco Secure Email Gateway AsyncOS/Content Scanner Tools
- 本文讨论：CVE-2024-20401
- 版本、权限与配置前提：文件分析或内容过滤应用于入站策略，CST&lt;23.3.0.4823；15.5.1-055默认含修复
- 资料类型：新闻通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 前段引文用文件分析和内容过滤，条件列表用或，逻辑需统一
- 虽然已永久下线的表述把可能DoS写为已发生，与未见利用同文冲突
- 二手新闻来源、无厂商直链；广告噪声

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 实际AND/OR条件及修复包边界待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Sergiu Gatlan  代码卫士   2024-07-19 18:20  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**思科修复了一个严重漏洞，可导致攻击者以 root 权限增加新用户并通过带有恶意附件的邮件使安全邮件网关 (SEG) 设备永久崩溃。**  
  
  
  
该漏洞的编号是CVE-2024-20401，是位于 SEG 内容扫描和信息过滤特性中的任意文件写漏洞，由一个绝对路径遍历弱点引发，可导致攻击者替换底层操作系统上的任意文件。  
  
思科解释称，“当启用文件分析和内容过滤器时，对邮件附件的处理不当引发该漏洞。成功利用该漏洞可使攻击者替换底层文件系统上的任何文件。随后，攻击者可执行如下任何操作：在受影响设备上以root 身份添加用户、修改设备配置、执行任意代码或引发永久性拒绝服务条件。”  
  
如果SEG设备运行易受攻击的 Cisco AsyncOS 发布且满足如下条件，则受该漏洞影响：  
  
- 文件分析特性（Cisco Advanced Malware Protection 的组成部分）或内容过滤器特性已启用并被分配到进站邮件策略。  
  
- 内容扫描器工具 (Content Scanner Tools) 版本早于23.3.0.4823。  
  
  
  
该漏洞的修复方案已通过“内容扫描器工具”包版本23.3.0.4823及后续版本发布。更新版本默认包含在 Cisco AsyncOS for Cisco Email Software 发布15.5.1-055及后续版本中。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMSBCsNOVb5OACT0e8ico896EyuQsa8YqDRg8emb2CD7CwcVUjBsa8TXRmxbId3d974QZjgDxuLAkzQ/640?wx_fmt=gif&from=appmsg "")  
  
**如何找到易受攻击设备**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMSBCsNOVb5OACT0e8ico896ED1o1iaia0PAFfQRzttKKq439PBc7k320sQRLgBbiaQT3sWLrOqicPPj1aQ/640?wx_fmt=gif&from=appmsg "")  
  
  
  
要判断是否启用了文件分析，则需连接到产品 web 管理接口，在“邮件策略＞进站邮件策略＞高级恶意软件防护＞邮件策略”，检查是否勾选了“启用文件分析”。  
  
要查看是否启用了内容过滤器，打开产品 web 接口并检查“选择邮件策略＞进站邮件策略＞内容过滤器”下的“内容过滤器”栏中包含的内容是否禁用。  
  
虽然因CVE-2024-20401遭成功利用后，易受攻击的 SEG 设备已永久下线，但思科建议客户联系技术协助中心通过手动干预重新上线。思科表示目前不存在任何应变措施，建议所有管理员更新易受攻击设备。思科产品安全事件响应团队并未发现漏洞遭利用的证据。本周三，思科还修复了一个满分漏洞，可导致攻击者修改Cisco SSM On-Prem 许可服务器上的任何用户（包括管理员）密码。  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[思科 SSM 本地漏洞可用于修改任意用户的密码](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520092&idx=1&sn=2c708cd0c74c042942553df613872635&chksm=ea94be36dde33720d8a6f9c9e9a9916bd1d19d05920d0f2d2081b29cbced7d6cf15ffee76430&scene=21#wechat_redirect)  
  
  
[德国政府会议信息遭泄露，思科修复 Webex 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519685&idx=3&sn=5ff2515ea003efe342365bfb3e9d8af7&chksm=ea94bcafdde335b9fed2634f43fe71bf14953a3fbc06a298ce9ac436a576ce39e6b2dfa25269&scene=21#wechat_redirect)  
  
  
[国家黑客组织利用思科两个0day攻击政府网络](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519358&idx=1&sn=080e82a553f5a1d52ba96fc6f20d14c3&chksm=ea94bd14dde33402ba398352628a6ab2995cc8e1c950313b8a1b9fb5752d5c3d7a2f00098df9&scene=21#wechat_redirect)  
  
  
[思科修复IMC 高危根提权漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519311&idx=1&sn=d41f0d79f130254f124a7ea7404a3b12&chksm=ea94bd25dde33433a3f6fee230eea0ec03c4f96a3c2c63e2978e87fe79ae4a7a724a521d65e4&scene=21#wechat_redirect)  
  
  
[思科提醒注意Small Business路由器中的XSS漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519231&idx=2&sn=b7b32d73cbe2046719780c03304729ce&chksm=ea94ba95dde333834c93da6e263ab3af72ce14f2a171799c65802dab992336cd0c1a96492159&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/critical-cisco-bug-lets-hackers-add-root-users-on-seg-devices/  
  
  
题图：  
Pexels  
 License  
  
****  
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
