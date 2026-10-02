---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-d25a761b4e188df0c29ecb44"
entity_id: "ve-d25a761b4e188df0c29ecb44"
schema_version: "1"
title: "太阳能监控产品存在三个RCE漏洞，影响数百家能源机构"
product: "Contec SolarView"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2022-29303"
referenced_identifiers: ""
prerequisites: "29303至少4.0起至8.0前，旧描述仅6.0；按2023年7月报道"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/%E5%A4%AA%E9%98%B3%E8%83%BD%E7%9B%91%E6%8E%A7%E4%BA%A7%E5%93%81/%E5%A4%AA%E9%98%B3%E8%83%BD%E7%9B%91%E6%8E%A7%E4%BA%A7%E5%93%81%E5%AD%98%E5%9C%A8%E4%B8%89%E4%B8%AARCE%E6%BC%8F%E6%B4%9E%EF%BC%8C%E5%BD%B1%E5%93%8D%E6%95%B0%E7%99%BE%E5%AE%B6%E8%83%BD%E6%BA%90%E6%9C%BA%E6%9E%84.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  太阳能监控产品存在三个RCE漏洞，影响数百家能源机构   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Contec SolarView
- 本文讨论：CVE-2022-29303主；2023-23333/2022-44354关联
- 版本、权限与配置前提：29303至少4.0起至8.0前，旧描述仅6.0；按2023年7月报道
- 资料类型：三漏洞相关新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 标题三个RCE但正文仅详细29303，另外两项只是提及，不能共用同一版本范围
- 数百暴露设备≠数百机构已遭攻击；数据应保留观测日期
- 推荐阅读/产品广告冗余，主来源是新闻非VulnCheck/厂商原文

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 修复8.0、在野利用与测绘统计需原研究核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Eduard Kovacs  代码卫士   2023-07-06 17:56  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**漏洞情报公司 VulnCheck 在本周三提醒称，日本公司 Contec 制造的太阳能监控产品受一个已遭活跃利用漏洞 (CVE-2022-29303) 的影响，导致数百家能源组织机构受牵连。**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMSvDCKy8rt8vgibMNvUDduKjTspL57fG7OTFDNoA0nic3pWpO17jficu7uS8kiaaRbic0RPhyxZ8ogblvQ/640?wx_fmt=png "")  
  
  
Contec 公司专注于定制化嵌入式计算、工业自动化和IoT通信技术。该公司的 SolarView 太阳能监控和可视化产品用于3万多个发电站。  
  
6月22日，Palo Alto Networks 公司报道称，Mirai 的一个变体正在利用 SolarView 中的一个漏洞入侵设备并将其纳入僵尸网络中。CVE-2022-29303是Mirai 所攻击的近24个目标之一，是影响 SolarView 6.0 版本的一个代码注入漏洞，可遭未认证攻击者远程利用。  
  
VulnCheck 公司的研究员分析提到，该漏洞仅在 8.0 版本发布中修复，而受影响版本最少可追溯至4.0版本。Shodan 搜索结果发现了600多个暴露在互联网的 SolarView 系统，包括超过400个运行的易受攻击版本。VulnCheck 解释称，“单独来看，该系统的利用并不严重。SolarView 系统都是监控系统，因此视图丢失 (T0829) 可能是最糟糕的场景。不过，利用造成的影响可能较高，具体取决于 SolarView 硬件所集成的网络。例如，如果硬件是太阳能发电站的一部分，那么攻击者可能将硬件作为攻击其它 ICS 资源的网络跳转，从而影响生产力和收入 (T0828)。”  
  
鉴于自2022年5月起，利用及相关指南就已公开，因此该漏洞遭利用就不令人惊讶。另外，VulnCheck 公司研究员提醒称，还存在其它 SolarView 漏洞可遭恶意利用，如CVE-2023-23333和CVE-2022-44354。  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[奇安信入选全球《静态应用安全测试全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516678&idx=1&sn=5b9e480c386161b1e105f9818b2a5a3d&chksm=ea94b36cdde33a7a05cafa9918733669252a02611c222b02bc6e66cbb508ee3fbf748453ee7a&scene=21#wechat_redirect)  
  
  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[日立能源证实受GoAnywhere攻击影响，数据遭泄露](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515971&idx=1&sn=eec17b15763175ee40e7ceff0749f511&chksm=ea948e29dde3073f5b0f7a3684d38fd09d8ea2a1545f32fdb0d03f46cd192742987741c20e29&scene=21#wechat_redirect)  
  
  
[CISA提醒注意日立能源产品中的多个高危漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515233&idx=2&sn=df29998bb260f1c274b561d8d33c1ed7&chksm=ea948d0bdde3041d86dd780d173b82a65374d35b5fc063d67de6fb5a4dde1e81e6b3d7805a8c&scene=21#wechat_redirect)  
  
  
[RigUp 数据库暴露7.6万份美国能源行业文件](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247492684&idx=3&sn=eadba4ef83902e6c8e4f4d56f28dca26&chksm=ea94d526dde35c3012d9fad4d821b8157198c6d237a122546a17dc9badaf15a2e4e7cf9f888f&scene=21#wechat_redirect)  
  
  
[欧洲能源企业的远程终端设备中出现多个高危漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247487225&idx=8&sn=ec3a55fcc1743a186860dc86e999c5ea&chksm=ea973f93dde0b6859c3f77e1515e5a01dd936c2437a40bb7f95135827c2a6b3b53c8c4a11efa&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://www.securityweek.com/exploited-solar-power-product-vulnerability-could-expose-energy-organizations-to-attacks/  
  
  
题图：Pixabay License  
  
  
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
