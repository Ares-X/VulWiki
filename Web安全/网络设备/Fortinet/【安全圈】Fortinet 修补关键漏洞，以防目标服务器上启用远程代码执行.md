---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】Fortinet 修补关键漏洞，以防目标服务器上启用远程代码执行   
 安全圈   2024-03-15 19:01  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgOvEXHviaXu1fO2nLov9bZ055v7s8F6w1DD1I0bx2h3zaOx0Mibd5CngBwwj2nTeEbupw7xpBsx27Q/640?wx_fmt=png&from=appmsg "微信图片_20230927171534.png")  
  
  
**关键词**  
  
  
  
安全漏洞  
  
  
Fortinet 修补了其端点管理软件中的一个关键 SQL 注入漏洞，该漏洞可能会在目标服务器上启用远程代码执行 （RCE）。  
  
CVE-2023-48788 影响 FortiClientEMS 7.2（版本 7.2.0 至 7.2.2）和 FortiClientEMS 7.0（版本 7.0.1 至 7.0.10）。它由 Fortinet 和英国国家网络安全中心 （NCSC） 发现，会影响产品的 DB2 管理服务器 （DAS） 组件。  
  
该公告指出：“对 FortiClientEMS 中的 SQL 命令（'SQL 注入'）漏洞 [CWE-89] 中使用的特殊元素进行不当中和，可能允许未经身份验证的攻击者通过专门构建的请求执行未经授权的代码或命令。  
  
目前还没有关于它是否在野外被利用的信息，但考虑到安全供应商 Horizon3 已承诺在下周发布入侵指标 （IoC）、概念验证漏洞利用和“深入研究”博客，这可能是一个现实的可能性。  
  
“与此同时，检查DAS服务日志中是否有恶意查询，”它在X（前身为Twitter）的一篇简短帖子中警告说。  
  
对于Fortinet客户来说，这是忙碌的一周，该供应商还修补了其他几个漏洞。  
其中包括 FortiOS 和 FortiProxy 强制网络门户中的越界写入漏洞 （CVE-2023-42789） 和基于堆栈的缓冲区溢出 （CVE-2023-42790），该漏洞可能“允许有权访问强制网络门户的内部攻击者通过特制的 HTTP 请求执行任意代码或命令”。  
  
这两项都被评为关键，CVSS 得分为 9.3。  
  
阅读有关关键 Fortinet 漏洞的更多信息：Fortinet 解决关键 FortiGate SSL-VPN 漏洞  
  
网络安全供应商还发布了更新，以修复 FortiClientEMS 中的高严重性 CSV 注入错误 （CVE-2023-47534）。  
  
Fortinet 解释说：“FortiClientEMS 中 CSV 文件漏洞 [CWE-1236] 中的公式元素无效化不当，可能允许未经身份验证的远程攻击者通过创建恶意日志条目和对服务器的特制请求，在管理工作站上执行任意命令。  
  
最后，Fortinet 修补了另一个高严重性漏洞 （CVE-2023-36554），这次是在其 FortiWLM MEA for FortiManager 产品中。不当的访问控制漏洞可允许未经身份验证的远程攻击者通过专门构建的请求执行任意代码或命令。  
  
“请注意，FortiWLM MEA默认不安装在FortiManager上，可以作为解决方法禁用，”Fortinet说。  
  
  
  
  
   END    
  
  
阅读推荐  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGyliaAEmce27dW7pTP6EZPGJ3Ba4CFoxVR8z2yQNiaiaibzw66snq9dhtR97eDexupDsq2icNXLcdhP9L2Nw/640?wx_fmt=png&from=appmsg "")  
[【安全圈】因资料保密管理存在安全隐患，一公司被军方取消资格](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652055828&idx=1&sn=d9024cb67ced208090667b76b57f9351&chksm=f36e0554c4198c42550cb65ced2617b43753307c1b7ec36c33bce943291925ea9d7743a1b1e5&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyliaAEmce27dW7pTP6EZPGJ3BXzAE9v2IBBFznHjT2N7dIgXibRUOibyWxibL3wffnSwfnX2w3P896K58Q/640?wx_fmt=jpeg "")  
[【安全圈】最新数据显示，去年金融机构单款APP平均发现5.6个问题](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652055828&idx=2&sn=0bbd40e9483cd2eac3580d76cf1f7c10&chksm=f36e0554c4198c4259a55203e2fb3e59df824797b579a796296f8e7329121853a06fbf7db996&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyliaAEmce27dW7pTP6EZPGJ3Bp9YdiaP3jYc27y8OdyYtjszlV3Xibtj1xjvUl7C2ZzJJf3qWeh3GNuCQ/640?wx_fmt=jpeg "")  
[【安全圈】芯片制造商英特尔和AMD发布最新补丁，以此解决之前的安全漏洞](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652055828&idx=3&sn=e368e91267a5d04e2e797dc5907aaccd&chksm=f36e0554c4198c420f6a5767ae09a4e34093ce46c80ede47069eb49a3f44bd592d2e0f04a994&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyliaAEmce27dW7pTP6EZPGJ3BwweebzrEbjeuEMQ52hcXewkuC6RDv8cYk8aB25WLZnMKGR14PJ4ib8g/640?wx_fmt=jpeg "")  
[【安全圈】日产大洋洲被黑客攻破，10万人陷入信息泄露风险](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652055828&idx=4&sn=9e79cee1fad1197a69eea262e795417b&chksm=f36e0554c4198c42cc61cc05b4e813c25a1a120193af7afa7521c46d87ad8880cb69a029ec47&scene=21#wechat_redirect)  
  
  
  
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
