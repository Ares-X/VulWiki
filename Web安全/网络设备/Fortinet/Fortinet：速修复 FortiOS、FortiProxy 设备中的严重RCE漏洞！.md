---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Fortinet：速修复 FortiOS、FortiProxy 设备中的严重RCE漏洞！   
Bill Toulas  代码卫士   2023-07-13 18:22  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**Fortinet 披露了影响 FortiOS 和 FortiProxy 的一个严重漏洞，可导致远程攻击者在易受攻击设备上执行任意代码。该漏洞由 Watchowr 发现，编号为CVE-2023-33308，CVSSv3 评分为9.8，为“严重”级别漏洞。**  
  
  
Fortinet 在安全公告中提到，“FortiOS & FortiProxy 中存在一个基于栈的溢出漏洞，可导致远程攻击者通过构造的数据包执行任意代码或命令。”当程序将比为缓冲区分配得更多的数据写入位于栈的缓冲区时，就会导致数据溢出到邻近的内存位置，从而导致栈溢出。攻击者可发送超过缓冲区容量的特殊构造的输入腹泻与函数相关的关键内存参数，利用这类漏洞，实现恶意代码执行。  
  
如下 FortiOS 版本受影响：  
  
- FortiOS 版本7.2.0 至7.2.3  
  
- FortiOS 版本 7.0.0 至 7.0.10  
  
- FortiProxy 版本 7.2.0 至 7.2.2  
  
- FortiProxy 版本 7.0.0 至 7.0.9  
  
  
  
Fortinet 公司提到，该漏洞已在之前发布中修复但并未提供相应的安全公告，因此它并不影响最新的发布分支 FortiOS 7.4。  
  
CVE-2023-33308的修复方案已在如下版本中提供：  
  
- FortiOS 版本7.2.4 或以上  
  
- FortiOS 版本 7.0.11 或以上  
  
- FortiProxy 版本 7.2.3 或以上  
  
- FortiProxy 版本 7.0.10 或以上  
  
  
  
Fortinet 在安全公告中剃刀，FortiOS 产品6.0、6.2、6.4、2.x 和 1.x 发布分支并未受该漏洞影响。CISA 已发布关于该漏洞的告警，督促受影响组织机构应用可用的安全更新。如管理员无法立即应用新固件，则可禁用由代理策略或防火墙策略所使用的 SSL 检测配置上的 HTTP/2支持，作为应变措施。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[奇安信入选全球《静态应用安全测试全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516678&idx=1&sn=5b9e480c386161b1e105f9818b2a5a3d&chksm=ea94b36cdde33a7a05cafa9918733669252a02611c222b02bc6e66cbb508ee3fbf748453ee7a&scene=21#wechat_redirect)  
  
  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[Fortinet 修复严重的 FortiNAC 远程命令执行漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516818&idx=3&sn=7524bc2288375bbf06f9574e73e15a00&chksm=ea94b3f8dde33aeeeb1313ae4cb6608ffa6876baa1ba49cbdac2b97cf5307198a79fd41eed8b&scene=21#wechat_redirect)  
  
  
[Fortinet 修复 Fortigate SSL-VPN 设备中严重的 RCE 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516712&idx=1&sn=db056d3f152e8f52867cc5021679e6f1&chksm=ea94b342dde33a543f8d7daaae604ffb6f0a65f865bf3fd926dfee86ad48be7d6460b9107d7d&scene=21#wechat_redirect)  
  
  
[Fortinet 修复FortiADC 和 FortiOS 中的多个高危漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516406&idx=3&sn=f6d52c7913cb9a7127079a424f287d22&chksm=ea94b19cdde3388a41d9382c14e8649d4db7f27382de8b638a8c2430d9fb7a6e3125a60ceed6&scene=21#wechat_redirect)  
  
  
[Fortinet FortiOS漏洞被用于攻击政府实体](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515912&idx=1&sn=0d48724c08d4d63949a7142683b6fdd7&chksm=ea948e62dde30774b504e3a089bab575daf337854bba663d40f81014b5672260b74230a007a3&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/fortinet-warns-of-critical-rce-flaw-in-fortios-fortiproxy-devices/  
  
  
题图：Pexels License  
  
  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSf7nNLWrJL6dkJp7RB8Kl4zxU9ibnQjuvo4VoZ5ic9Q91K3WshWzqEybcroVEOQpgYfx1uYgwJhlFQ/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSN5sfviaCuvYQccJZlrr64sRlvcbdWjDic9mPQ8mBBFDCKP6VibiaNE1kDVuoIOiaIVRoTjSsSftGC8gw/640?wx_fmt=jpeg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ5iciaeKS21icDIWSVd0M9zEhicFK0rbCJOrgpc09iaH6nvqvsIdckDfxH2K4tu9CvPJgSf7XhGHJwVyQ/640?wx_fmt=gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
