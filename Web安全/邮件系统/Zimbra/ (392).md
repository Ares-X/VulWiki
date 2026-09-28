---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】Zimbra高危漏洞已被大规模利用：无需身份验证即可控制服务器   
 安全圈   2024-10-04 19:00  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgOvEXHviaXu1fO2nLov9bZ055v7s8F6w1DD1I0bx2h3zaOx0Mibd5CngBwwj2nTeEbupw7xpBsx27Q/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
  
**关键词**  
  
  
  
漏洞  
  
  
  
电子邮件与协作平台Zimbra在上个月修复了Zimbra Collaboration Suite中的安全漏洞CVE-2024-45519，近日传出该漏洞已被大规模利用，安全专家纷纷呼吁用户尽快更新。  
  
Zimbra Collaboration Suite是一款企业级的协作软件，用于管理电子邮件、日历、联系人、任务及文件共享。CVE-2024-45519漏洞出现在用于处理邮件合规性和审计的PostJournal服务中，允许未经授权的用户执行任意命令，从而控制整个服务器。  
  
专门开发安全管理工具的ProjectDiscovery率先在9月27日深入分析了该漏洞，揭示了Zimbra的修补程序，并详细描述了手动利用该漏洞的每个步骤。而在GitHub上也已经出现了针对CVE-2024-45519的概念验证程序。  
  
安全公司Proofpoint在9月28日发现有人试图利用CVE-2024-45519漏洞，HarfangLab的首席网络威胁研究员Ivan Kwiatkowski于10月1日指出，黑客已开始大规模利用该漏洞，并通过同一IP地址发送了大量恶意电子邮件。  
  
安全专家认为，该漏洞的危险性在于不需要身份验证，意味着任何能够访问运行PostJournal服务的网络的用户都可以利用该漏洞。专家呼吁Zimbra用户尽快安装补丁，或者至少先关闭PostJournal服务。  
  
  
  
   END    
  
  
阅读推荐  
  
  
[【安全圈】Cloudflare遭受3.8Tbps DDos攻击，攻击源竟是...](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652064888&idx=1&sn=22a0e79377ff8248b57da157615c571a&chksm=f36e6038c419e92efb17e5e82271a7ba31a3a3db9f7428ee79103869ba1d2f947bb57c8d752f&scene=21#wechat_redirect)  
  
  
  
[【安全圈】远程利用漏洞起亚汽车视频，（目前官方已修复漏洞）](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652064888&idx=2&sn=1de3b1f19c6574d455747d1b16ace81e&chksm=f36e6038c419e92e4019e3dfb30072db7bd47a552a5edad8d58f54d310c163ba8ce7f84d22b7&scene=21#wechat_redirect)  
  
  
  
[【安全圈】索尼PS5和微软Xbox网络双双崩溃中断影响全球玩家](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652064888&idx=3&sn=2220ddda4dcbeb5dd0424019f33b9f16&chksm=f36e6038c419e92e9557f22ddab45ad50e35c1fb7a3391b54ffffe021fef23f0d81859971f01&scene=21#wechat_redirect)  
  
  
  
[【安全圈】英国揭露LockBit勒索软件背后是俄罗斯支持的黑客](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652064888&idx=4&sn=2020e1f1c4fb89c3ed238075f1bd26c9&chksm=f36e6038c419e92ed7c6426f1bb0f37647a02b23d904e5192eaf032d2fa676f21d48c18f3c6e&scene=21#wechat_redirect)  
  
  
  
[【安全圈】ChatGPT 曝严重漏洞，聊天记录黑客随意看，网友：本地运行也没用](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652064829&idx=1&sn=43b9a1718f1914415bedb5011a00c419&chksm=f36e607dc419e96b4ba394e9fc13291a3ce749e64ec089c4e28d1af785ebaa4f48ae085b254c&scene=21#wechat_redirect)  
  
  
  
  
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
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCE3vpzhuku5s1qibibQjHnY68iciaIGB4zYw1Zbl05GQ3H4hadeLdBpQ9wEA/640?wx_fmt=gif "")  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
