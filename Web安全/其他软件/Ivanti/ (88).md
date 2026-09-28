---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】针对 Ivanti vTM 关键漏洞的 PoC 攻击代码已发布   
 安全圈   2024-08-17 19:01  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgOvEXHviaXu1fO2nLov9bZ055v7s8F6w1DD1I0bx2h3zaOx0Mibd5CngBwwj2nTeEbupw7xpBsx27Q/640?wx_fmt=png&from=appmsg "微信图片_20230927171534.png")  
  
  
**关键词**  
  
  
  
安全漏洞  
  
  
Ivanti 解决了一个严重身份验证绕过漏洞，该漏洞被跟踪为 CVE-2024-7593（CVSS 评分为 9.8），该漏洞会影响虚拟流量管理器 （vTM） 设备，该设备可能允许攻击者创建流氓管理员帐户。  
  
Ivanti vTM （Virtual Traffic Manager） 是一种基于软件的流量管理解决方案，旨在优化和保护应用程序交付。  
  
“成功利用此漏洞可导致绕过身份验证并创建管理员用户，”该软件公司发布的公告中写道。“在 Ivanti vTM 22.2R1 或 22.7R2 版本以外的版本中不正确地实施身份验证算法，允许未经身份验证的远程攻击者绕过管理员面板的身份验证。”  
  
该漏洞是由于身份验证算法的错误实现造成的，该算法允许未经身份验证的远程攻击者绕过面向 Internet 的 vTM 管理员控制台上的身份验证。  
  
该公司通过发布补丁 22.2R1（2024 年 3 月 26 日发布）或 22.7R2（2024 年 5 月 20 日发布）解决了该漏洞。该公司解释说，将其管理界面指向私有 IP 并限制访问的客户可以尽早解决问题。  
  
Ivanti 表示，它不知道在野外利用此漏洞的攻击，但它知道概念验证漏洞利用代码的公开可用性。  
  
“在披露时，我们不知道有任何客户被此漏洞利用。但是，概念验证是公开的，我们敦促客户升级到最新的补丁版本，“该公告继续说道。  
  
为了限制此漏洞的可利用性，Ivanti 建议通过私有/公司网络限制管理员对网络内部管理接口的访问。  
  
以下是公司提供的说明：  
  
1. 在 VTM 服务器上，导航到  
“系统  
>安全性”，然后单击页面  
  
的“管理 IP 地址和管理服务器端口”部分的下拉列表 2.在 bindip 下拉列表  
中，选择管理接口 IP 地址。作为另一种选择，客户还可以直接使用“bindip”设置上方的设置来限制对受信任 IP 地址的访问，从而进一步限制谁可以访问该接口。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGyljkcia9nB2ibNDUtT2s4ibETvw2SMvRCDxHJFZIJpknOqTpXicMIvC0DY91kXw3vzv8LSdQG8iatyMZicQw/640?wx_fmt=png&from=appmsg "")  
  
  
END  
  
  
阅读推荐  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyljkcia9nB2ibNDUtT2s4ibETvwNn2N1RKYDgia1QSecaYibmVoLYYAic5BarqG5Anhd9pfbYCZWKEafE84Q/640?wx_fmt=jpeg "")  
[【安全圈】请尽快安装补丁！微软 Win10/Win11 被曝 9.8 分漏洞](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652063642&idx=1&sn=55b4768ea2cb329a1a43434bab108d70&chksm=f36e6bdac419e2cccd58cda488c4a2c8f3a27fd39e1c8b226ccbccefabb0c8ed13b42175c920&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyliarzJNsxaLg5jFDicw50kC6Ts13uSLU24F1ekAlTgaNt8EhRImRAuwQl1grogX5M95peL01URgcSsw/640?wx_fmt=jpeg "")  
[【安全圈】新型Mac窃取程序"AMOS"冒充Loom，瞄准加密货币钱包](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652063642&idx=2&sn=a1b8aed3bfb097f3e724e3002c9ab0c2&chksm=f36e6bdac419e2ccd13c2962b8bacbdd6d4a87d14b01fb34b8b5a29349e18e54211607e6cc74&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyliarzJNsxaLg5jFDicw50kC6TgX574udGibfcQ9pT5jkJiag1sdd9xia2wvVSbzicGUGTAibQfwmTq9n6kzw/640?wx_fmt=jpeg "")  
[【安全圈】Gafgyt僵尸网络针对云原生环境，SSH弱密码成GPU挖矿新目标](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652063642&idx=3&sn=7e27daf40de8f9bb3efdac1a361a07d1&chksm=f36e6bdac419e2ccf3ab8459baaa0c94d62468fad07b19bb82a42a921dc61b416a4b3de2029c&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyliarzJNsxaLg5jFDicw50kC6TbtfMVibat2BfcG9ibVSXOcsQ0wdbLFwL86FBAOWmVbaib3gQMhjf2waFw/640?wx_fmt=jpeg "")  
[【安全圈】RansomHub最新勒索软件“浮出水面”，可篡改EDR软件](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652063642&idx=4&sn=7536674b2200cc02f65f6a7fe2d92f68&chksm=f36e6bdac419e2cc766cb553cbd333691f6338e269a05942c80d69eea292a1b40c6d59694b26&scene=21#wechat_redirect)  
                      
  
  
  
  
  
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
