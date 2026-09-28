---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】数亿网民受影响，OpenSSL又被爆高危漏洞   
 安全圈   2022-07-07 13:25  
  
![](https://mmbiz.qpic.cn/mmbiz_png/aBHpjnrGylhYjcoAiaLYUrZdxEicd2xVT9maibhrXvZtqPRrb1tsIz6aEmPnuf7BicEXwCquEPeFQsVm9Inlk9H2Aw/640?wx_fmt=png "")  
  
**关键词**  
  
  
  
CNNVD、OpenSSL  
  
  
 近日，国家信息安全漏洞库（CNNVD）收到关于OpenSSL 安全漏洞（CNNVD-202207-242、CVE-2022-2274）情况的报送。成功利用此漏洞的攻击者，可造成目标机器内存损坏,进而在目标机器远程执行代码。OpenSSL 3.0.4版本受漏洞影响。目前，OpenSSL官方已发布新版本修复了漏洞，请用户及时确认是否受到漏洞影响，尽快采取修补措施。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/aBHpjnrGylhYjcoAiaLYUrZdxEicd2xVT98KINXnDZeu0tOmNrr7GygYf0dbeEkFRvibQlMibv1iaWkQiaGsJicPMscjg/640?wx_fmt=png "")  
  
****  
**一、漏洞介绍**  
  
  OpenSSL是OpenSSL团队开发的一个开源的能够实现安全套接层（SSLv2/v3）和安全传输层（TLSv1）协议的通用加密库。该产品支持多种加密算法，包括对称密码、哈希算法、安全散列算法等。该漏洞源于计算机上具有2048位私钥的 RSA 实现不正确，并且在计算过程中会发生内存损坏,导致攻击者可能会在执行计算的机器上远程执行代码。  
  
  
**二、危害影响**  
  
  成功利用此漏洞的攻击者，可造成目标机器内存损坏,进而在目标机器远程执行代码。OpenSSL 3.0.4版本受漏洞影响。  
  
  
**三、修复建议**  
  
  目前，OpenSSL官方已发布新版本修复了漏洞，请用户及时  
确认是否受到漏洞影响，尽快采取修补措施。官方链接如下：  
  
https://git.openssl.org/gitweb/?p=openssl.git;a=commitdiff;h=4d8a88c134df634ba610ff8db1eb8478ac5fd345  
  
   END    
  
  
阅读推荐  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/aBHpjnrGylhYjcoAiaLYUrZdxEicd2xVT9Ah7ZDbuEOmDD0kEmViaadq1gGT3XMX5IpmBiaKXkIEL9dr8Wkngkz88w/640?wx_fmt=png "")  
[【安全圈】取证技术最新进展：PC端Telegram免密取证](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652004055&idx=1&sn=ee858bb9769fdb31925525f780a481b5&chksm=f36f7297c418fb81af993a2db142da9af5c05bcf0113f3c47bc60a3a9df097f9ac3c4ab6bfa5&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/aBHpjnrGylhYjcoAiaLYUrZdxEicd2xVT9V6iaSVLVEoDX2P0bZalibK5ENS0icHL6FibHSDzeIpLhGoe84SDuRIugQA/640?wx_fmt=jpeg "")  
[【安全圈】刘某某诉拼多多“砍价案”一审判决拼多多败诉](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652004055&idx=2&sn=258419653c1fd5727f50524a1feb6b03&chksm=f36f7297c418fb816eabdcba1b8653f23ff62b6a17e418a6c223e09ab6d9f90c9ac0c8682749&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/aBHpjnrGylhYjcoAiaLYUrZdxEicd2xVT9M3qY9ggLaOE0Y3OAianI4vGIxKgcHDawIU1pjQWFDKDcxKu8HYlvlicw/640?wx_fmt=png "")  
[【安全圈】2022年上半年全球网络安全事件回顾](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652004055&idx=3&sn=11e648e9a5acf08d527f93d2ec286183&chksm=f36f7297c418fb810cf88887a0079baf2d817f35858cbe6bf600a5cd1e689db01ebc6caf5037&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/aBHpjnrGylhYjcoAiaLYUrZdxEicd2xVT9cNXicbcE12ys8ibqP3CEiaaUgtN8rgMibdHUg2jzia9Oyjh8y47k3ye2UCQ/640?wx_fmt=jpeg "")  
[【安全圈】雇用黑客破解技术软件 网店老板非法牟利获刑](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652004055&idx=4&sn=08ef96e6b3cdf3cb579705abafdf884d&chksm=f36f7297c418fb81bd3e8695e5cc229d729d1c0f012d6d511dcd5bebd836c145eda6d9525af1&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/aBHpjnrGylhYjcoAiaLYUrZdxEicd2xVT9kYZYicA4NvFicX1cFoich0TjSkAHShh6AHm9XN9LBJo5m68rysrZWLTwA/640?wx_fmt=jpeg "")  
[【安全圈】Windows版Chrome高危零日漏洞已被黑客利用](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652004055&idx=5&sn=b8eaccebd98826d441a9e56ee120840b&chksm=f36f7297c418fb8183920721584afaddbdcc91b004f35e5dbab4c494498c9ddb337c47b108ca&scene=21#wechat_redirect)  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCEft6M27yliapIdNjlcdMaZ4UR4XxnQprGlCg8NH2Hz5Oib5aPIOiaqUicDQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1 "")  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCEDQIyPYpjfp0XDaaKjeaU6YdFae1iagIvFmFb4djeiahnUy2jBnxkMbaw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
**安全圈**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCEft6M27yliapIdNjlcdMaZ4UR4XxnQprGlCg8NH2Hz5Oib5aPIOiaqUicDQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1 "")  
  
  
←扫码关注我们  
  
**网罗圈内热点 专注网络安全**  
  
**实时资讯一手掌握！**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCE3vpzhuku5s1qibibQjHnY68iciaIGB4zYw1Zbl05GQ3H4hadeLdBpQ9wEA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1 "")  
  
**好看你就分享 有用就点个赞**  
  
**支持「****安全圈」就点个三连吧！**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCE3vpzhuku5s1qibibQjHnY68iciaIGB4zYw1Zbl05GQ3H4hadeLdBpQ9wEA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1 "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
