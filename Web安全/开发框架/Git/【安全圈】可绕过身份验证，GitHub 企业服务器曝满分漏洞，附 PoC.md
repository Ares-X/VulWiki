---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】可绕过身份验证，GitHub 企业服务器曝满分漏洞，附 PoC   
 安全圈   2024-05-22 19:01  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgOvEXHviaXu1fO2nLov9bZ055v7s8F6w1DD1I0bx2h3zaOx0Mibd5CngBwwj2nTeEbupw7xpBsx27Q/640?wx_fmt=png&from=appmsg "微信图片_20230927171534.png")  
  
  
**关键词**  
  
  
  
漏洞  
  
  
近日，安全研究人员披露了GitHub企业服务器（GHES）的关键漏洞（CVE-2024-4985，cvss得分：10.0），该漏洞允许未经授权的攻击者，在不需要预先认证的情况下访问GHES实例。漏洞影响所有GHES 3.13.0之前的版本，并在3.9.15、3.10.12、3.11.10和3.12.4版本中得到修复。  
  
目前GitHub已经推出了修复措施，没有发现该漏洞已经被大规模利用，用户可将GHES更新到已修补的版本（3.9.15、3.10.12、3.11.10、3.12.4或更高版本）。如果无法立即更新，考虑暂时禁用SAML认证或加密断言功能作为临时缓解措施。  
  
GHES是一个自托管的软件开发平台，允许组织使用Git版本控制存储和构建软件，并自动化部署流程。  
  
该漏洞利用了GHES处理加密的SAML声明的方式中的一个缺陷。攻击者可以创建一个包含正确用户信息的假SAML声明。当GHES处理一个假的SAML声明时，它将无法正确验证其签名，从而允许攻击者访问GHES实例。  
  
成功利用这个漏洞可能允许未经授权的攻击者获得对GHES实例的完全管理控制权，使他们能够访问所有数据并在系统上执行任何操作。  
  
GitHub进一步指出，默认情况下不启用加密断言，而且此漏洞不影响那些不使用SAML单一登录（SSO）或使用SAML SSO认证但没有加密断言的实例。加密断言允许网站管理员通过在认证过程中对SAML身份提供者（IdP）发送的消息进行加密，来提高GHES实例的安全性。  
  
**附PoC**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgNxbpzcbefOzqlGaBWiaR5C0SsOe7Ob3KgSiczrljs4FcxeCpGJicawCxSTiatSWx4tXw1QtcQE6PhPw/640?wx_fmt=png&from=appmsg "")  
```
```  
  
  
   END    
  
  
阅读推荐  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyljMw84n3Amy7IVVlvnIyb6X0LfomPe3np1UUibvPWaXJoUnErtDIz3tZ2jbJVvTpfwuudic24S0mueg/640?wx_fmt=jpeg "")  
[【安全圈】抓住“偷代码”的窃贼！北京警方打掉黑客团伙](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652060204&idx=1&sn=31a03ce1125d00acc0f3be1f2d8b0215&chksm=f36e166cc4199f7a494e098b6d03b1c6b756754a411677078cbcc4d21c67b2cf0ae7396ce5e4&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGyljMw84n3Amy7IVVlvnIyb6XvzD730uFMDGn7N6WMK8Nh9wGHnaqRsYvfj7iaOZdfgaLAibsMn7QMRUg/640?wx_fmt=png "")  
[【安全圈】Windows XP/2000无保护上网：瞬间就中了几十种病毒](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652060204&idx=2&sn=18f3bf4fc1a668bf2a714c9800007127&chksm=f36e166cc4199f7ae4f4058229f100d162f31b7f0661bff9ceaf13bd1963f2348fd18549158d&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylg2YuDUpp991n4oYajzejd0WYicWuib8ibFibpwnticticbu3dAu4zRSuoibQHL6ajbLjuwd8E4iazicFVWblw/640?wx_fmt=jpeg "")  
[【安全圈】赛门铁克警告称，Kimsuky APT 在针对韩国的攻击中使用了新 Linux 后门](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652060204&idx=3&sn=31df02a8978cfe075ba539d16db5209a&chksm=f36e166cc4199f7a8cb087ee9bfaa56f4951b4e0128a2efc1b4bb9dfec13c14210724c5c7229&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylg2YuDUpp991n4oYajzejd0C2qIclLS1hVQvzKfEibgHvGVnZ0rbhfcQib71ZRCkkUZ17H7ShjBiaMow/640?wx_fmt=jpeg "")  
[【安全圈】2024 常见 macOS 恶意软件洞察：勒索软件、木马仍占主导地位](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652060204&idx=4&sn=c7b44d1901ff1044fcc195efaa95e3b9&chksm=f36e166cc4199f7a4ae0d28602fc04cc56b6af2934643cfeefe7eb3e8b557de80a2e313654bc&scene=21#wechat_redirect)  
  
  
  
  
  
  
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
