---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-fb6cc6723eec382ad7b00bf7"
entity_id: "ve-fb6cc6723eec382ad7b00bf7"
schema_version: "1"
title: "思科修复由NSA报送的两个高危漏洞"
product: "Cisco Unified CM/SME（主）、OpenSSH、ISE"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-20375"
referenced_identifiers: "CVE-2024-6387"
prerequisites: "未认证SIP DoS；12.5(1)SU9/14SU4/15SU1修复"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/%E6%80%9D%E7%A7%91%E4%BF%AE%E5%A4%8D%E7%94%B1NSA%E6%8A%A5%E9%80%81%E7%9A%84%E4%B8%A4%E4%B8%AA%E9%AB%98%E5%8D%B1%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  思科修复由NSA报送的两个高危漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cisco Unified CM/SME（主）、OpenSSH、ISE
- 本文讨论：CVE-2024-20375
- 版本、权限与配置前提：未认证SIP DoS；12.5(1)SU9/14SU4/15SU1修复
- 资料类型：多漏洞新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 标题称NSA报送两个高危漏洞，正文仅将20375明确归NSA，第二个6387归因缺证据
- 已存在应变措施未说明内容；无厂商直链
- 其他中危问题未编号，来源精度不足

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- NSA归因与6387关联产品、缓解措施待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Ionut Arghire  代码卫士   2024-08-23 18:19  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**本周三，思科修复了多款产品中的多个漏洞，其中一个是位于企业协作解决方案中的高危漏洞CVE-2024-20375。**  
  
CVE-2024-20375是一个高危漏洞（CVSS评分8.6），影响思科 Unified Communications Manager (Unified CM) 和思科 Unified Communications Manager Session Management Edition (Unified CM SME) 的SIP调用处理功能，可遭未认证远程利用。  
  
SIP 信息解析不当可导致攻击者将构造的数据包发送给受影响产品并导致设备重新加载，进而导致拒绝服务条件。思科指出，目前虽然该漏洞已存在应变措施，但 Unified CM 和 Unified CM SME版本12.5 (1)SU9、14SU4和15SU1已包含补丁。  
  
思科致谢美国国安局 (NSA) 报送CVE-2024-20375并提到并未发现该漏洞遭在野利用的证据。  
  
本周三，思科还修复了另外一个漏洞CVE-2024-6387，即OpenSSH 漏洞regreSSHion，并提供了修复方案。此外，思科还发布四份安全通告，详述了位于 Identity Service Engine (ISE)、Unified CM 和 Unifeid CM SME中的多个中危漏洞。其中三个位于思科ISE中：通过REST API调用的SQL盲注漏洞、信息泄露漏洞以及跨站请求伪造漏洞。第四个漏洞影响 Unified CM和Unified CM SME 基于web 的管理接口，并可导致远程未认证攻击者执行跨站点脚本攻击，并在接口上下文中执行任意脚本代码。  
  
思科表示并未发现这些漏洞遭在野利用的迹象。可参见思科安全通告页面获取更多信息。  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[NSA 的开源员工培训平台 SkillTree 中存在CSRF漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520038&idx=2&sn=921e2fe11a431d8a458188b65d0a3b9d&chksm=ea94be4cdde3375abbf6e79690d31fd0c1e2f7bdc02b738a8fc06afa426d4a95adedea7492d3&scene=21#wechat_redirect)  
  
  
[1.4GB的NSA机密数据遭泄露](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520021&idx=2&sn=694e77ee0ab92103cad4f3e0d1ad5a8c&chksm=ea94be7fdde337697f22a519c7599222567b8d5a4c460482a532eb7609ffd04faa814f5458b2&scene=21#wechat_redirect)  
  
  
[NSA提醒称朝鲜黑客正在利用薄弱的DMARC邮件策略](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519419&idx=2&sn=2bf4ebf6392d40174b31ed1eb866cb87&chksm=ea94bdd1dde334c7bcc430b56eed6790831e607ff3ae1f75e6e7007dbbaa5a57e477d02a058e&scene=21#wechat_redirect)  
  
  
[微软：APT28 利用由NSA报送的 Windows 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519350&idx=2&sn=c98c01499f531e3ceed8f1597c30c578&chksm=ea94bd1cdde3340a7c757c539d7f708d85af2ff07df6f7ceeb2c4755fea809a41f36f2e1ab53&scene=21#wechat_redirect)  
  
  
[NSA承认购买敏感数据监控美国公民](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518768&idx=1&sn=e2580ef28e29b1e69a98c2d5b0a25a4f&chksm=ea94bb5adde3324ca571dfc3d000c70d5f96bcd859fdf0d43446b2a97535d3a9ba37918b7ef1&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://www.securityweek.com/cisco-patches-high-severity-vulnerability-reported-by-nsa/  
  
  
题图：  
Pixabay  
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
