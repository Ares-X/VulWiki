---
source: "gelusus/wxvl 公众号漏洞文库"
product: "WordPress Ultimate Member"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2023-3460"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "黑客利用WordPress 插件中的提权0day攻陷网站"
prerequisites: "来源所述条件，未列明部分仍待核：publicregistration; <=2.6.6 claimed vulnerable as-of2023-07-03; writableuser metadata protectionbypass"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-0b205c6bcb2aad148601676d"
entity_id: "ve-0b205c6bcb2aad148601676d"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：publicregistration; &lt;=2.6.6 claimed vulnerable as-of2023-07-03; writableuser metadata protectionbypass

- **事实待核（1）**：主CVE缺元数据；未修复/0day应固定历史时点，不能当当前推荐。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（2）**：原文并列开发者升2.6.6部分修复与Wordfence停用，需清楚标来源和时点而非认2.6.6安全。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（3）**：活跃下载量混用活跃安装/下载指标；IOC需保留观测时间，不能只凭公共IP定罪。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（4）**：正确说卸载插件不清除既有后门应保留；翻译防火墙规则未涵盖所有规则不通。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（5）**：有精确新闻原文但欠最终补丁/Wordfence原报。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  黑客利用WordPress 插件中的提权0day攻陷网站   
Bill Toulas  代码卫士   2023-07-03 17:37  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**黑客利用 “Ultimate Member” WordPress 插件中的 0day 漏洞 （CVE-2023-3460），通过绕过安全措施和注册恶意管理员账户，攻陷网站。**  
  
  
![](../../.resource/remote/2f0f8f82d14e138963df2a60f2b9892c376de99c2ec4422ed0b024c0474b1932.png "")  
  
  
Ultimate Member 是一款用户资料和会员插件，便于在WordPress 网站上进行注册和构建社区，目前的活跃下载量超过20万次。  
  
CVE-2023-3460的CVSS v3.1评分为9.8，影响 Ultimate Member 插件的所有版本，包括最新版本 v2.6.6。虽然开发人员最初尝试在版本 2.6.3、2.6.4、2.6.5 和2.6.6 中修复该漏洞，但仍然存在利用该漏洞的方法。开发人员表示将继续致力于解决余下漏洞并希望很快能够发布更新。  
  
Ultimate Member 的一名开发人员指出，“自2.6.3版本开始，我们收到一名客户的报告后就开始着手准备与该漏洞相关的修复方案。版本 2.6.4、2.6.5、2.6.6部分修复了该漏洞，但我们仍然一起与 WPScan 团队致力于获得最佳结果。我们还收到了含有所有必要详情的报告。之前所有版本均易受影响，因此我们强烈建议将网站更新至2.6.6版本，并在未来持续更新，获得最近的安全和特性增强。”  
  
  
![](../../.resource/remote/2f0f8f82d14e138963df2a60f2b9892c376de99c2ec4422ed0b024c0474b1932.png "")  
  
**攻击活动**  
  
  
  
  
  
Wordfence 的网站安全专家发现了利用该0day漏洞的攻击活动，并提醒称威胁人员利用插件的注册表单在账户上设置任意用户元值，利用该漏洞。更具体而言，攻击者设置 “wp_capabilities”用户元值，将用户角色定义为管理员，使其能够完全访问易受攻击的站点。  
  
该插件具有用户本不应升级的密钥拦截清单；然而，Wordfence 表示，绕过该防护措施并不费力。  
  
通过CVE-2023-3460 被入侵的 WordPress 站点存在如下指标：  
  
- 在网站上出现新的管理员账户。  
  
- 使用用户名 wpenginer、wpadmins、wpengine_backup、se_brutal、segs_brutal。  
  
- 日志记录显示已知的 IP 地址访问了 Ultimate Member 注册页面。  
  
- 日志记录显示来自146.70.189.245、103.187.5.128、103.30.11.160、 103.30.11.146和172.70.147.176的访问。  
  
- 用户账户的邮件地址与 “exelica.com” 存在关联。  
  
- 在网站上安装新的 WordPress 插件和主题。  
  
  
  
由于该严重漏洞仍未修复且易遭利用，因此 WordFence 建议立即卸载 Ultimate Member 插件。WordFence 公司解释称，甚至是专门开发以保护客户免遭威胁的防火墙规则也并未涵盖所有潜在的防火墙规则，因此在厂商解决该问题之前删除插件是唯一稳健的措施。  
  
如果网站已遭攻陷，那么基于上述分享的 IoC 而言，删除该插件将不足以缓解风险。在这种情况下，网站所有人必须运行完整的恶意软件扫描，找到攻陷根因如恶意管理员账户和任何后门。  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[奇安信入选全球《静态应用安全测试全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516678&idx=1&sn=5b9e480c386161b1e105f9818b2a5a3d&chksm=ea94b36cdde33a7a05cafa9918733669252a02611c222b02bc6e66cbb508ee3fbf748453ee7a&scene=21#wechat_redirect)  
  
  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[WordPress 紧急修复影响数百万网站 Jetpack 插件中的严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516649&idx=5&sn=3a673400f9a00b2b334fadfda1b0a8a9&chksm=ea94b083dde33995e9079edc64941b6bda561e4fbb1c4406e76ffcfb5423d723243494cbb5af&scene=21#wechat_redirect)  
  
  
[WordPress 热门插件中存在漏洞，200多万网站受影响](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516420&idx=2&sn=e419c137b012ee8e70e8514f7bf3a2e1&chksm=ea94b06edde339787fa928cc50927bb993d84cb037cf64c8f353c0b7afc9b6064576dddb5f44&scene=21#wechat_redirect)  
  
  
[PHP Everywhere 插件中存在严重RCE，影响数千个 WordPress 站点](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510489&idx=3&sn=e7dbd1c73e937e2dbf783f1afa6342e0&chksm=ea9498b3dde311a55ff3cf2243b100fde04a60f7793ad2161b221fe028886010921f3971eb0c&scene=21#wechat_redirect)  
  
  
[30万美元：Zerodium 出3倍价格求 WordPress RCE exploit](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247503350&idx=1&sn=d1db0488f14493a5d2ec0c1914d9cfa0&chksm=ea94fc9cdde3758a74b08333695a4847963a758cbd44718390965663eaf96f3d6ff85b0c2d28&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/hackers-exploit-zero-day-in-ultimate-member-wordpress-plugin-with-200k-installs/  
  
  
题图：Pixabay License  
  
  
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
