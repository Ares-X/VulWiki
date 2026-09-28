---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  VM2 JavaScript 沙箱库中存在严重的 RCE 漏洞   
Bill Toulas  代码卫士   2023-04-10 17:01  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**热门的 JavaScript 沙箱 VM2 库中存在一个严重的 RCE 漏洞 (CVE-2023-29017)。多款软件使用该哭在虚拟化环境中安全地运行代码。**  
  
该 VM2 库旨在 Node.js 服务器的隔离上下文中运行不受信任的代码，它允许部分执行代码并阻止对系统资源或外部数据的越权访问。  
  
VM2 在 NPM 包库中的每月下载量超过1600万次，用于IDE 和代码编辑器、FaaS 解决方案、渗透测试框架、安全工具和多种与 JavaScript 相关的产品。  
  
  
**CVSS 评分10分**  
  
  
CVE-2023-29017 的 CVSS 评分为满分10分，是由韩国科学技术院的研究团队发现的。  
  
研究人员发现，当出现异步传输错误时，被传递给 “Error.prepareStackTrace” 函数的主机对象处理不当。利用该漏洞可导致沙箱防护措施被绕过，并获得对主机的远程代码执行权限。安全公告指出，“威胁行动者可绕过沙箱防护措施，在运行该沙箱的主机上获得远程代码执行权限。”  
  
该漏洞影响 VM2 3.9.14 及更早版本。该漏洞已在新版本 3.9.15 中修复。  
  
  
**利用代码已发布**  
  
  
韩国科学技术院的博士生 Seongil Wi 在 VM2版本发布后，公布了 CVE-2023-29017 利用代码的两个变体。这些 PoC 在主机系统上创建了名为 “flag” 的新文件，证明 VM2 的沙箱防护措施可遭绕过，从而导致攻击者可执行命令，在主机系统上创建任意文件。  
  
2022年10月，VM2 还受另一个严重漏洞 (CVE-2022-36067) 的影响。该漏洞可使攻击者逃逸沙箱环境并在主机系统上运行命令。该漏洞也通过发布新版本的方式迅速得以修复。  
  
  
****  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQZeSribxs2yU1w56EMvgX9cDBCiabniazxdxtQ25cBCAd5vBJIM2sOv1khjzwwViaT0pS74U6piaiauiaGA/640?wx_fmt=png "")  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511052&idx=3&sn=fb116392e405ae62e6c339117fffdb59&chksm=ea949d66dde31470758b6ee8f9dbecdb67ef6c0c8af277f26b83b60dbac95748d28db787a4b4&scene=21#wechat_redirect)  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[JavaScript 沙箱 vm2修复远程代码执行漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514120&idx=3&sn=70433e477638c9c6b3ed925cbdb9cb76&chksm=ea948962dde300745c90d6d6c46d60584f699d5afcb625367d464f79bbbb7bf930be487ee4b9&scene=21#wechat_redirect)  
  
  
[微软详述影响苹果 iOS、iPadOS、macOS 设备的沙箱逃逸漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512944&idx=2&sn=d4eadd75c1a517158050fee4b426c96d&chksm=ea94821adde30b0ca1a9fe01b01d12a5925479f01abfd7dd02cf3d8fa29e782d5524bdf64933&scene=21#wechat_redirect)  
  
  
[奇安信代码安全实验室帮助谷歌修复 Chrome 沙箱外高危漏洞，获官方致谢](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247500006&idx=1&sn=860ec1c1ccad2c6da992d6223e4f0c71&chksm=ea94f18cdde3789a01887a72adde0cf467dd76823f4b6d70bed77cd7aadef8164f56c8d397e7&scene=21#wechat_redirect)  
  
  
[谷歌修复3个高危 Chrome 沙箱逃逸漏洞，为1人颁发5万美元奖励金](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247491359&idx=2&sn=91169c222648d41ebd01f7ff0d8d0ff7&chksm=ea972e75dde0a763e89f27354adf4c1c00d56d466f3bde194d0a6e0c7591e1be3fd0e3f2bb79&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/exploit-available-for-critical-bug-in-vm2-javascript-sandbox-library/  
  
  
题图：Pixabay License  
  
  
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
