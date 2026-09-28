---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】Ninja Forms漏洞危机：900,000+站点面临潜在风险   
 安全圈   2023-08-02 19:02  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/aBHpjnrGylgSxa9I02IBd3bgLEhwfJCeRibw3LEjMujeAhD2CvyiaVCZJVHGHODbkPx3pViaX0sAibZsDun6sicUzdQ/640?wx_fmt=jpeg "")  
  
  
**关键词**  
  
  
  
漏洞危机  
  
  
      专家警告说，WordPress的Ninja Forms插件受到多个漏洞的影响（跟踪为CVE-2023-37979、CVE-2023-3 8386和CVE-202-3 8393），黑客可以利用这些漏洞升级权限并窃取敏感数据。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/QmbJGbR2j6xtWmCkDAlwhuNrcWX7eM8ibC4pQfSDyqGlNSTibrEpCOnuXq8HddyDcFSiasR1t58JzE4H3xR3GWTuA/640?wx_fmt=png "")  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/QmbJGbR2j6xtWmCkDAlwhuNrcWX7eM8ibOq8ib5DYlK0AsDDsezibVH7CWq7JBOPPoyVzKTeLh7XKFAKKfEVKXWsg/640?wx_fmt=gif "")  
  
  
      WordPress插件Ninja Forms是最受欢迎的表单生成器插件，它有超过900000个活动安装。开发人员可以使用此插件创建任何类型的表单，包括联系表单和付款表单。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/QmbJGbR2j6xtWmCkDAlwhuNrcWX7eM8ibjonJ2vkCjby7l1DIQZSENLFtmxRULPNiaq4pDXPsWj9KgjZWSF4XChQ/640?wx_fmt=png "")  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/QmbJGbR2j6xtWmCkDAlwhuNrcWX7eM8ibOq8ib5DYlK0AsDDsezibVH7CWq7JBOPPoyVzKTeLh7XKFAKKfEVKXWsg/640?wx_fmt=gif "")  
  
  
    第一个漏洞被追踪为CVE-2023-37979，是一个基于POST的反射XSS，未经身份验证的用户可以利用它窃取敏感信息，在本例中，可以在WordPress网站上升级权限，攻击者以此诱骗特权用户访问精心制作的网站来触发该问题。  
  
     第二个和第三个漏洞被追踪为CVE-2023-38393和CVE-2023-3 8386，是对表单提交导出功能的访问控制中断。订阅者和参与者用户可以利用这些漏洞导出WordPress网站上提交的所有Ninja表单。  
  
      这些漏洞在3.6.26版本中得到了解决。  
  
      在某些情况下，插件或主题代码需要从用户提供的字符串中调用特定的函数或类，服务商应始终检查并限制用户可以直接调用的函数或类目，还要格外注意导出数据操作，并始终对相关函数进行权限或访问控制检查。  
  
      以下是上述问题的时间表：  
◆2023年6月22日，发现了该漏洞，并联系了插件供应商。  
◆2023年7月4日，Inja Forms 3.6.26版发布，以修补报告的问题。  
◆2021年7月25日将漏洞添加到Patchstack漏洞数据库中。  
◆2021年7月27日公开发布的安全咨询文章。  
  
   END    
  
  
阅读推荐  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGyljyrfJ3EMfLrpW80JYSqvU2vLL88KOSTqAPHfrfoNnAYwoiatQBYRaesLgKQf9v2y2OyqwuwQjRLWA/640?wx_fmt=png "")  
[【安全圈】危险！中国的大学和研究机构被Patchwork 黑客组织盯上](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652041010&idx=1&sn=f97ed9d295653bef513d6fc9401351a8&chksm=f36fc372c4184a641137c2b564a03ed2103e14fe20dd2131a4f5fed432b408ad6a26612b8a34&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGyljyrfJ3EMfLrpW80JYSqvU2nqgWfgkOpgUV2iaPwKWicicLNysH5pVga2KSAzp37REJ4PXOBZMhzGQXw/640?wx_fmt=png "")  
[【安全圈】佳能提醒用户，丢弃打印机务必警惕Wi-Fi安全风险](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652041010&idx=2&sn=2ab32cf68faaf5149908feb333a256ed&chksm=f36fc372c4184a6412ea8459d56feb7c229f7c73f420241548e057e897a199200cb686e74287&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGyljyrfJ3EMfLrpW80JYSqvU2oCFL1vUibQzKr0RYgfSJLbIsgjxniaYYE3nEh75aHK6r7TYX2LtgvgWA/640?wx_fmt=png "")  
[【安全圈】新的网络钓鱼：恶意二维码迅速检索员工凭据](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652041010&idx=3&sn=df0da8e22411d035083a71e3beb7673b&chksm=f36fc372c4184a64eb5a6afa541488e9f7bda932a1dc8cba0b05e5993f0bfbcd86ce51352a1b&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGyljyrfJ3EMfLrpW80JYSqvU2kIdRh6h66Vh3rDEp0VrdtfKMqNEic8VOWLsibvib8Iib10LzIhSj9TP7dg/640?wx_fmt=png "")  
[【安全圈】10万元！“AI”换脸冒充亲戚诈骗](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652041010&idx=4&sn=972e43e6cc7c5d3c9a0be5ab698de630&chksm=f36fc372c4184a649b49637fc9a25ead85bb7f17da9993a93d19dd473e93614dedfbadef0738&scene=21#wechat_redirect)  
  
  
  
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
