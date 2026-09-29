---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】Zimbra认证绕过漏洞成功入侵超过1000台服务器   
 安全圈   2022-08-14 20:22  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/aBHpjnrGylgSxa9I02IBd3bgLEhwfJCeRibw3LEjMujeAhD2CvyiaVCZJVHGHODbkPx3pViaX0sAibZsDun6sicUzdQ/640?wx_fmt=jpeg "")  
  
**关键词**  
  
  
  
网站漏洞  
  
  
  
Zimbra是一套邮箱和协同办公平台，包括WebMail，日历，通信录，Web文档管理等功能，有140个国家的超过20万企业使用，其中包括超过1000个政府和金融机构。  
  
  
**CVE-2022-27925漏洞**  
  
  
Volexity研究人员发现了一个Zimbra认证绕过漏洞（CVE-2022-27925）被用于攻击Zimbra Collaboration Suite (ZCS)邮箱服务器。在调查一起Zimbra邮件服务器入侵事件过程中，Volexity发现ZCS远程利用是根本原因。检查入侵服务器的web日志发现，漏洞利用预之前写入webshell到硬盘的漏洞是一致的。示例web日志记录如下所示：  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/aBHpjnrGyliaqTVvSVDTprM4icy7IYFUicyl0DibvlicA0ez2nnPOJic6zuRMp0wmGpz3qiaBjBtrcXOSiaR0yTxyKW1fg/640?wx_fmt=png "")  
  
  
检查MailboxImport servlet源码发现，url访问时会调用“doPost”函数，会检查用户是否经过认证，如下图所示：  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/aBHpjnrGyliaqTVvSVDTprM4icy7IYFUicyLpkRkyiaibGPnCvicotSEgeB60M9pmp29iaxfxX3tD3LuW1Iz5PaqHnN4w/640?wx_fmt=png "")  
  
  
代码的问题是对认证进行了检查，也设置了错误信息，但是并没有return描述。也就是说之后的代码会继续执行，与用户的认证状态无关。利用该函数，攻击者只需要在URL中设置正确的参数就可以利用该漏洞。  
  
  
**受影响的版本**  
  
  
受影响的版本包括：  
  
  
· Zimbra 8.8.15  
  
  
· Zimbra 9.0.0  
  
  
**在野漏洞利用**  
  
  
Volexity 发现攻击者滥用该漏洞的过程中结合了另一个认证绕过漏洞（CVE-2022-37042）。研究人员认为该漏洞与2021年初发现的微软Exchange 0-day漏洞利用基本一致。最初的时候只是被情报监控相关的攻击者利用，但之后被大规模利用。攻击者成功利用该漏洞可以在被入侵的服务器的特定位置部署web shell以实现驻留。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/aBHpjnrGyliaqTVvSVDTprM4icy7IYFUicyYvmccqTt5WFOLIxcXYEFg8RW6S5kbO6NmBkMwGZIlxZduibOCEwHJzQ/640?wx_fmt=jpeg "")  
  
  
CISA在11日已经确认了这两个安全漏洞的在野利用。通过扫描发现，目前有超过1000台服务器存在后门或已经被入侵。涉及政府机关、军事结构、收入数十亿的跨国公司。由于扫描shell路径的限制，预计被入侵的服务器数量更多。  
  
  
**安全补丁**  
  
  
Volexity称，如果有漏洞的服务器在5月底前没有修复CVE-2022-27925漏洞，那就可以认为ZCS实例已经被入侵了，包括邮件内容在内的所有内容都可能被窃了。  
  
  
研究人员建议对可能的入侵事件进行分析，并使用最新的补丁重构ZCS实例。  
  
  
  
   END    
  
  
阅读推荐  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/aBHpjnrGyliaqTVvSVDTprM4icy7IYFUicyjy1CnULbId37SgJchIDTVksibOGf529tphu5ZibEfYS6djRyibgIxBnCg/640?wx_fmt=jpeg "")  
[【安全圈】真刑啊！男子破解博彩网站漏洞，每月“薅羊毛”10多万，凭技术走上歪路](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652013078&idx=1&sn=320de9db673ae308877bb0a4c0e74f6b&chksm=f36fae56c418274037bbadf2590e2c81f782678dc72dbc9bb7ebe28a2b0d13ff9ec8392674fd&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/aBHpjnrGyliaqTVvSVDTprM4icy7IYFUicytxWjOWfWOicOP5xiazFYEhdBo5e2RyOLK24HbygBo8HiauRkzxtsgrvXg/640?wx_fmt=jpeg "")  
[【安全圈】诱导用户提供隐私数据：谷歌被罚超4亿元](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652013078&idx=2&sn=c452a135e2f58e1fbaafdbea6c0f66d0&chksm=f36fae56c4182740dbf3c6d14f997e7e7d5f3c9edab9f417d73d69cbb50615ca35f09b8ccd35&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/aBHpjnrGyliaictzlJgTwXYsBE1MaMgH15vGWw4mkL61DfdgB0DcaYmWjs5tOhXn3sMcQ0VJeq08hA408R7zZZzA/640?wx_fmt=jpeg "")  
[【安全圈】银行木马 SOVA 卷土重来，或可发起勒索攻击](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652013078&idx=3&sn=701550632db33ef446026df365db0937&chksm=f36fae56c41827401df5690a677c3a811946d75a80e5be73a493ba89506ceee80d0758148a4e&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/aBHpjnrGyliaqTVvSVDTprM4icy7IYFUicygsiaZ4PE9V7gFnQL6cF7W4Zxlib5dQazyQkpzf5o2fHfL0DEtLm3AJhg/640?wx_fmt=jpeg "")  
[【安全圈】美国悬赏1000万美元追缉勒索软件组织Conti五名主要成员](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652013078&idx=4&sn=68d6796ceec82c8b916d4c3c014b458b&chksm=f36fae56c418274064ab35ab9007626cec37c415101138504692505b59242a9835daad77c535&scene=21#wechat_redirect)  
  
  
  
  
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
