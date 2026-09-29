---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】白帽报告苹果 Vision Pro 特有漏洞，或可导致空间计算黑客攻击   
 安全圈   2024-06-13 19:00  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgOvEXHviaXu1fO2nLov9bZ055v7s8F6w1DD1I0bx2h3zaOx0Mibd5CngBwwj2nTeEbupw7xpBsx27Q/640?wx_fmt=png&from=appmsg "微信图片_20230927171534.png")  
  
  
**关键词**  
  
  
  
网络安全  
  
  
苹果公司周一将 Vision Pro 虚拟现实头盔的操作系统 visionOS 更新到 1.2 版本，该版本修复了多个漏洞，其中包括可能是该产品特有的第一个安全漏洞，编号为 CVE-2024-27812。  
  
visionOS 1.2 此次更新修复了近二十多个漏洞。其中绝大多数漏洞都存在于 visionOS 与其他苹果产品（如 iOS、macOS 和 tvOS）共享的组件中。这些漏洞可能导致任意代码执行、信息泄露、权限升级和拒绝服务（DoS）。  
  
其中，最突出的漏洞是 CVE-2024-27812。这似乎是 Vision Pro 耳机特有的唯一一个 CVE，因为除 visionOS 外，其他苹果产品的公告中都没有列出这个 CVE。  
  
据苹果公司称，CVE-2024-27812 与特制网页内容的处理有关，利用该漏洞会导致 DoS 攻击。苹果公司在公告中说：该问题已通过改进文件处理协议得到解决。  
  
Ryan Pickren 是苹果公司的网络安全研究员，在获得苹果公司批准之前，Pickren 未透露该漏洞的任何细节。但他表示，这和以往 Vision Pro 漏洞有着明显区别，这是Vision Pro 所特有的漏洞，并**认为 “这将有可能导致有史以来真正意义上的空间计算黑客攻击”。**  
  
空间计算(spatial computing)技术可以参照现实的物理世界构建一个数字孪生世界，将现实的物理世界与数字的虚拟世界连接在一起。使我们能够进入并且操控 3D 空间，并用更多的信息和经验来增强现实世界。  
  
**Vision Pro 作为虚拟现实代表产品，自发布日起就屡屡曝出存在严重的安全漏洞。**  
  
此前麻省理工学院（MIT）一名博士生Joseph Ravichandran分享了苹果公司 visionOS 软件的一个内核漏洞，此时Vision Pro 头戴式耳机刚刚发布一天。该漏洞针对的是设备的操作系统，有可能被用来创建恶意软件、提供未经授权的访问或越狱，从而使任何人都可以使用耳机。  
  
Ravichandran在 X上发布帖子指出，这是世界上第一个针对 Vision Pro 的内核漏洞。为此苹果公司修改了用户指南，并指出对 vision OS 进行未经授权的修改会绕过安全功能，并可能导致许多问题，如安全漏洞、不稳定性以及被黑客入侵的 Apple Vision Pro 的电池寿命缩短。  
  
苹果公司强烈警告用户不要安装任何修改 visionOS 的软件，且由于未经授权修改 visionOS 违反了 visionOS 软件许可协议，因此可能会导致 Apple Vision Pro拒绝提供服务。苹果警告说，黑客攻击耳机可能导致iCloud、FaceTime和Apple Pay等服务中断，而使用推送通知的第三方应用程序也可能受到影响。  
  
   END    
  
  
阅读推荐  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyljRPMBK6fkVrTDlVptktnJlYUP5anfroiaGvqEU2LwqcYO4jnsuSfbj35zInlIU2hmsQ5QymCXWLUQ/640?wx_fmt=jpeg "")  
[【安全圈】黑莓公司数据于暗网出售，黑客疑似已掌握 34 万亿文件](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652061493&idx=1&sn=85a2739e72574b54ff74de358b6986e1&chksm=f36e1375c4199a638833b5b586d0a5368acf835673d7be0cb7de50e1eed536cefcebe3cd149a&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylgrxmN99hicvqUt6ssBGdmcKiaA8fkUUGHulLgd8NGz00QI7NDaQjWibO81vAyhkVONlzO6s2Yr8dNKg/640?wx_fmt=jpeg "")  
[【安全圈】《纽约时报》泄露270G数据，包含内部源代码](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652061493&idx=2&sn=41ab249425a5f1ea3d47bcf3b569a44b&chksm=f36e1375c4199a634586ea0636b84eca5e6bc943c51a52dff9c964916a0122ff5bc26b7e2b0f&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgrxmN99hicvqUt6ssBGdmcKMaPTdQibWX1QSic9UmLuFBSKdZS0YzC0ncXsmIJ89uUQ7e96RlQia9F6w/640?wx_fmt=png "")  
[【安全圈】致命的黑客攻击：勒索软件攻击后英国出现血库危机，NHS 呼吁市民捐献 O 型血](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652061493&idx=3&sn=4cce93294dbacd721ff02996d2b5ee36&chksm=f36e1375c4199a63590c991699b02806c5ce19865e6f56d3cdbe7d23e8e1d7b0eae8c66a6040&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgrxmN99hicvqUt6ssBGdmcKibmQbaJvqJqrJVibBVTdxNPxibQibiaTKC963vibM67EPegaLuhyoh0lwdnQ/640?wx_fmt=png "")  
[【安全圈】针对码农的攻击行动：以色列研究人员发现已安装数百万个的恶意 VSCode 扩展程序](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652061493&idx=4&sn=767918f796f1f51f05b34d9f5dc2c4a3&chksm=f36e1375c4199a63c5911a35b34fc738c6cc63166d9ae626f2ccc541fb765dc8c9fad1733cd0&scene=21#wechat_redirect)  
  
  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCEft6M27yliapIdNjlcdMaZ4UR4XxnQprGlCg8NH2Hz5Oib5aPIOiaqUicDQ/640?wx_fmt=gif "")  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCEDQIyPYpjfp0XDaaKjeaU6YdFae1iagIvFmFb4djeiahnUy2jBnxkMbaw/640?wx_fmt=png "")  
  
**安全圈**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCEft6M27yliapIdNjlcdMaZ4UR4XxnQprGlCg8NH2Hz5Oib5aPIOiaqUicDQ/640?wx_fmt=gif "")  
  
  
←扫码关注我们  
  
**网罗圈内热点 专注网络安全**  
  
**实时资讯一手掌握！**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCE3vpzhuku5s1qibibQjHnY68iciaIGB4zYw1Zbl05GQ3H4hadeLdBpQ9wEA/640?wx_fmt=gif "")  
  
**好看你就分享 有用就点个赞**  
  
**支持「****安全圈」就点个三连吧！**  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
