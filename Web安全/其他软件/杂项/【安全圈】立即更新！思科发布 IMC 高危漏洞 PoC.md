---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】立即更新！思科发布 IMC 高危漏洞 PoC   
 安全圈   2024-04-23 14:10  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgOvEXHviaXu1fO2nLov9bZ055v7s8F6w1DD1I0bx2h3zaOx0Mibd5CngBwwj2nTeEbupw7xpBsx27Q/640?wx_fmt=png&from=appmsg "微信图片_20230927171534.png")  
  
  
**关键词**  
  
  
  
勒索软件  
  
  
近日，思科针对集成管理控制器 (IMC) 中的一个关键漏洞发布了概念验证 (PoC) 漏洞利用程序。该漏洞被识别为 CVE-2024-20356，允许命令注入，可使攻击者获得受影响系统的 root 访问权限。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylg67f0PVibialrEfJGcAPygciabkduz9keQwLsvPAeAzyqiaETPoWJlFUfZibKSbapdyaDmHG0FaBlz27g/640?wx_fmt=jpeg&from=appmsg "")  
## 漏洞概述  
  
该漏洞存在于思科集成管理控制器（IMC）基于网络的管理界面中，而 IMC 是用于远程管理思科硬件的重要组件。  
  
根据思科发布的官方安全公告，该漏洞是由于 IMC 界面的用户输入验证不足造成的，这一疏忽导致拥有管理权限的经过验证的远程攻击者能够注入恶意命令。  
  
受影响的产品包括一系列思科服务器和计算系统，主要有：  
- 5000 系列企业网络计算系统 (ENCS)  
  
- Catalyst 8300 系列边缘 uCPE  
  
- 独立模式下的 UCS C 系列 M5、M6 和 M7 机架式服务器  
  
- UCS E 系列服务器  
  
- UCS S 系列存储服务器  
  
## 漏洞利用的技术细节  
  
Nettitude 安全研究人员表示，利用程序涉及多个步骤，攻击者通过 Web 界面发送精心制作的命令，就可以在思科硬件的底层操作系统上以 root 权限执行任意代码。  
> 名为 "CISCown "的 PoC 漏洞利用程序是 Nettitude 开发的工具包的一部分，可在 GitHub 上下载，它通过目标 IP、用户名和密码等参数实现漏洞的自动化利用。该工具包还可用于测试漏洞，允许在受影响设的备上部署 telnetd root shell 服务。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylg67f0PVibialrEfJGcAPygciaA5A8NdJHfc5riaeiaHJ6OXMhRcWGiaoWB5690ibTibLcUNanpspgibs8ibngA/640?wx_fmt=jpeg&from=appmsg "")  
  
这一 PoC 漏洞的发布标志着使用思科受影响产品的企业面临着严重的威胁。因为获得 root 访问权限后攻击者就可能完全控制硬件，导致数据被盗、系统宕机，甚至进一步的网络破坏。  
  
为此，思科已发布软件更新来解决这一漏洞，强烈建议所有受影响的企业立即更新，确保系统安全。  
  
针对 CVE-2024-20356 的 PoC 漏洞利用的发布凸显了保护复杂网络环境安全所面临的持续挑战，用户和管理员应访问思科官方安全公告页面和托管漏洞利用工具包的 Nettitude GitHub 存储库，了解更多详细信息并及时更新。  
  
   END    
  
  
阅读推荐  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/l5ia26FyMIPlCiaeia7THViaBDhic4f5ZSdvD1BxDN3wnZlIIEN91PqiaYSrBfGAWBwh5wUykulXV6LgddMN3uzwljMA/640?wx_fmt=png "")  
[【安全圈】“炫技”黑客落网记！](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652058573&idx=1&sn=0f0346d277141ca9f9b8222903b06a46&chksm=f36e1f8dc419969bb8808f4b37bdf09573928558f986f6ecc743afb2b005abc8c1ec6b4c97d7&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylg67f0PVibialrEfJGcAPygciaGQyVrJBA8qwqX1LtDQvnrkanFpMFibicyI6TteicuBdSDmp67x6mPia3kQ/640?wx_fmt=jpeg "")  
[【安全圈】GPT-4 会自己发起漏洞攻击，成功率高达87%](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652058573&idx=2&sn=5f3912b3a736fb50ffb5bf29418df333&chksm=f36e1f8dc419969bdf6be1a8a89af5f830890ec92d881839120596b76623fe4a84c9cb9af93d&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylg67f0PVibialrEfJGcAPygciaZ75IGgEVibR9vyW7ib1tIfToicIQu43DHoTKTEkTg6NpKgrBrYaAd7ZibA/640?wx_fmt=jpeg "")  
[【安全圈】黑客利用 Windows SmartScreen 漏洞投放 DarkGate 恶意软件](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652058573&idx=3&sn=f816d148cccd097b7142bc93e79eb352&chksm=f36e1f8dc419969b0f953cabef0882264cdad3c7a08ec3bc38dfc810f279440d9b723b6f1bf4&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylg67f0PVibialrEfJGcAPygciaOwY9O6dWQafKR2wnE3rkeh4ddRTcf2QsMyPF66WW3RXJHOpMMhRicjQ/640?wx_fmt=jpeg "")  
[【安全圈】Akira 勒索软件肆虐，250 多家机构惨遭毒手](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652058573&idx=4&sn=b953d172550be6a70b5dbe5a5e69f0b4&chksm=f36e1f8dc419969b2d2e6556ec0f640e7301a460dcfe0e7abcca447be9addc483b7dcf10cbb0&scene=21#wechat_redirect)  
  
  
  
  
  
  
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
