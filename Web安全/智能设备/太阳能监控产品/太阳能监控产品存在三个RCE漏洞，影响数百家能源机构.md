---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  太阳能监控产品存在三个RCE漏洞，影响数百家能源机构   
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
