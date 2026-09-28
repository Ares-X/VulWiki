---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】Joomla 发现5个漏洞可执行任意代码   
 安全圈   2024-02-24 19:00  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgOvEXHviaXu1fO2nLov9bZ055v7s8F6w1DD1I0bx2h3zaOx0Mibd5CngBwwj2nTeEbupw7xpBsx27Q/640?wx_fmt=png&from=appmsg "微信图片_20230927171534.png")  
  
  
**关键词**  
  
  
  
安全漏洞  
  
  
在Joomla内容管理系统中发现了五个漏洞，可用于在易受攻击的网站上执行任意代码。开发人员已通过在版本5.0.3和4.4.3中发布CMS修复程序来解决这些影响Joomla多个版本的安全问题。  
1. CVE-2024-21722 ：当用户的多重身份验证 (MFA) 方法发生更改时， MFA 管理功能  
  
1. CVE-2024-21723 ：不正确的 URL 解析可能导致开放重定向。  
  
1. CVE-2024-21724 ：媒体选择字段的输入验证不当会导致各种扩展中存在跨站脚本 ( XSS ) 漏洞。  
  
1. CVE-2024-21725 ：电子邮件地址的不当转义会导致各种组件中存在 XSS 漏洞，被利用的可能性很高。  
  
1. CVE-2024-21726 ：过滤器代码中的内容过滤不正确，导致多个 XSS 缺陷。  
  
根据Joomla通报，XSS漏洞CVE-2024-21726影响核心Joomla过滤器组件，被利用的可能性属于中等级别。然而，根据Sonar的说法，该缺陷可用于实现远程代码执行。  
  
攻击者可以通过诱骗管理员单击恶意链接来利用此漏洞。虽然利用需要用户交互，但攻击者可以使用各种技巧来吸引管理员的注意或发起攻击，诱骗某些用户点击恶意链接。  
  
Sonar未透露该漏洞的技术细节，以便让更多的Joomla管理员应用可用的安全更新。Sonar强调立即采取行动降低风险的重要性，并强烈建议所有Joomla用户更新到最新版本。  
  
  
  
  
   END    
  
  
阅读推荐  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgliav9nRhJpn54X9ndTPw1F1qMNH2ciaxhs8w8NqOB8o2bVfjzCZkl35OiarLepv0qxfmsEPKP5q4icg/640?wx_fmt=png&from=appmsg "")  
[【安全圈】苹果试点推进类 ChatGPT 工具“Ask”，可实现客服工作](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652054348&idx=1&sn=d7905d9737c6c76f015e4767a9c2d687&chksm=f36e0f0cc419861add671439e868afbfd4f802084204b538ab4599dc40eafefd023942001e8c&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgliav9nRhJpn54X9ndTPw1FiaszibGR9A5OHWfibvZcqKHibicliaZcOwuLo1iaYc5FmQbWkTLTRNFGHphfg/640?wx_fmt=png&from=appmsg "")  
[【安全圈】因“内部程序错误”，美国最大运营商服务中断持续10多个小时](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652054348&idx=2&sn=d4cd17626b7a8617b77e60b3d15b43d1&chksm=f36e0f0cc419861a30233beea35918415ed7f41072acf23259c771e5675fdf8d60617918e611&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgliav9nRhJpn54X9ndTPw1FwLicwo5YYhRIKiaGOtwCTYBguSRdfOB8k0esWSxTZH2n9f1RRKicvho0g/640?wx_fmt=png&from=appmsg "")  
[【安全圈】Microsoft Exchange出现安全缺陷，可能将影响多达97000台服务器](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652054348&idx=3&sn=d74cadd691b0013978ddacc9f0b2e152&chksm=f36e0f0cc419861aedea087eddfdd483b555c1c55ab1c0b724888c12d5610ad9f97d392b5f70&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgliav9nRhJpn54X9ndTPw1FAkNuI5icb1JKhoggEwrib3xlibiccmCqwsz7kWOVPbvJvQ8vnv8MbSyuAQ/640?wx_fmt=png&from=appmsg "")  
[【安全圈】注意！苹果快捷方式漏洞 (CVE-2024-23204) 可以暴露敏感数据](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652054348&idx=4&sn=954e62d1619b2db694807191fd923070&chksm=f36e0f0cc419861ac6103656430bfaa0fd714deb38e2c1ed06ff8f00c8d83aa1862b63590f68&scene=21#wechat_redirect)  
  
  
  
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
