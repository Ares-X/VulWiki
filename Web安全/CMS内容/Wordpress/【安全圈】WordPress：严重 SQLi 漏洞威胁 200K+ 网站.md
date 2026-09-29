---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】WordPress：严重 SQLi 漏洞威胁 200K+ 网站   
 安全圈   2024-02-27 19:02  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgOvEXHviaXu1fO2nLov9bZ055v7s8F6w1DD1I0bx2h3zaOx0Mibd5CngBwwj2nTeEbupw7xpBsx27Q/640?wx_fmt=png&from=appmsg "微信图片_20230927171534.png")  
  
  
**关键词**  
  
  
  
安全漏洞  
  
  
一个名为 Ultimate Member 的流行 WordPress 插件中披露了一个严重的安全漏洞，该插件拥有超过 200,000 个活跃安装。  
  
该漏洞被跟踪为 CVE-2024-1071，CVSS 得分为 9.8（满分 10 分）。安全研究员克里斯蒂安·斯维尔斯（Christiaan Swiers）因发现并报告了该漏洞而受到赞誉。  
  
在上周发布的一份公告中，WordPress 安全公司 Wordfence 表示，该插件“由于对用户提供的参数的转义不足以及对现有 SQL 查询缺乏充分准备，因此容易受到 2.1.3 至 2.8.2 版本中的'排序'参数的 SQL 注入的影响。  
  
因此，未经身份验证的攻击者可利用此缺陷将其他 SQL 查询追加到现有查询中，并从数据库中提取敏感数据。  
  
值得注意的是，该问题仅影响在插件设置中选中“为 usermeta 启用自定义表”选项的用户。  
  
继 2024 年 1 月 30 日负责任地披露后，插件开发人员已在 2 月 19 日发布 2.8.3 版时提供了该漏洞的修复程序。  
  
  
建议用户尽快将插件更新到最新版本，以减轻潜在威胁，特别是考虑到 Wordfence 在过去 24 小时内已经阻止了一次试图利用该漏洞的攻击。  
  
2023 年 7 月，威胁行为者积极利用同一插件的另一个缺点（CVE-2023-3460，CVSS 评分：9.8）创建流氓管理员用户并夺取对易受攻击站点的控制权。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyliaeD6a0GGZABALptKxZ5sY4y3zoo3Dicxar0oyczpmVY7lgd0WFWzI6hDxgoAlSfKDdkvnWF1ubD2Q/640?wx_fmt=other&from=appmsg "")  
  
这一发展正值一项新活动的激增之际，该活动利用受感染的 WordPress 网站直接注入 Angel Drainer 等加密排水器，或将网站访问者重定向到包含排水器的 Web3 网络钓鱼网站。  
  
Sucuri 研究员 Denis Sinegubko 表示：“这些攻击利用网络钓鱼策略和恶意注入来利用 Web3 生态系统对直接钱包交互的依赖，对网站所有者和用户资产安全都构成重大风险。  
  
在此之前，还发现了一种新的排水器即服务（DaaS）计划，称为CG（CryptoGrab的缩写），该计划运行着一个由俄语，英语和中文使用者组成的10,000名成员的联盟计划。  
  
Cyfirma在上个月底的一份报告  
中说  
，其中一个威胁行为者控制的Telegram频道“将攻击者引向一个电报机器人，使他们能够在没有任何第三方依赖的情况下运行欺诈操作。  
  
  
“该机器人允许用户免费获得一个域名，为新域名克隆现有模板，设置应该发送被骗资金的钱包地址，并为该新域名提供Cloudflare保护。”  
  
还观察到该威胁组织使用两个名为 SiteCloner 和 CloudflarePage 的自定义电报机器人来克隆现有的合法网站并分别为其添加 Cloudflare 保护。然后，这些页面主要使用受感染的 X（以前称为 Twitter）帐户进行分发。  
  
  
  
  
   END    
  
  
阅读推荐  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyliaeD6a0GGZABALptKxZ5sY497riboF3Z4UCUFCic1VlD2cqKvrMuzuCWrXaicFHT4kLEHbbyTvmiacjpA/640?wx_fmt=jpeg "")  
[【安全圈】因缺乏网络安全监管，北京一公司网站被黑客改成赌博网站！](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652054638&idx=1&sn=feb9c9fcdbbe96df45b7410a4675f2d8&chksm=f36e082ec41981382c2ff235668d79d6c7a515411f3543e6ce576ad0f360517824bbc622520d&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyliaeD6a0GGZABALptKxZ5sY4mnPlAozAZgJfVQ6x9zMib5pA9Viaz6YbxwpW2WLsp0LGALERTvSxYVxg/640?wx_fmt=jpeg "")  
[【安全圈】Microsoft 发布 PyRIT，能自动识别AI系统中的风险](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652054638&idx=2&sn=45952fd664668f0379e5f4020e781a67&chksm=f36e082ec419813801b489d35e6573e651769206d86f6ee714337673e08d63ce30364c72d429&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyliaeD6a0GGZABALptKxZ5sY47XnhnCgaqNyM2s29Xd92clS8cAk7Ma6mrfQI20g12qvaRvCuibtvicpQ/640?wx_fmt=jpeg "")  
[【安全圈】澳大利亚电信公司 Tangerine遭遇攻击，23万人数据被泄密](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652054638&idx=3&sn=d24c9abf42be001c6a8893151bca0d8b&chksm=f36e082ec4198138a22945d9719df6c0eefd704a942999891f5b2aa512c84533156bf162bb21&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyliaeD6a0GGZABALptKxZ5sY4eNJffV9XSI3XhriamoYzlqibqCHJVNzxPfdA1ibuvdXdYicrSfkf36bO0g/640?wx_fmt=jpeg "")  
[【安全圈】注意！ScreenConnect 漏洞正被广泛利用于恶意软件传播](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652054638&idx=4&sn=cbc923d693bae84939d05031ec8bc252&chksm=f36e082ec4198138e0f691df6033b3aa7c38f1d1ce3a77082062a538c9b4f559c56911ef9ca5&scene=21#wechat_redirect)  
  
  
  
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
