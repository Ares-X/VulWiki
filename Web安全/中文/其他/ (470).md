---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】黑客利用 D-Link DIR-859 路由器严重漏洞窃取密码，必须更换设备避免受害   
 安全圈   2024-07-04 19:01  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgOvEXHviaXu1fO2nLov9bZ055v7s8F6w1DD1I0bx2h3zaOx0Mibd5CngBwwj2nTeEbupw7xpBsx27Q/640?wx_fmt=png&from=appmsg "微信图片_20230927171534.png")  
  
  
**关键词**  
  
  
  
信息泄露  
  
  
黑客正在利用影响所有 D-Link DIR-859 WiFi 路由器的严重漏洞来从设备收集帐户信息，包括密码。  
  
  
该安全问题于一月份披露，目前编号为CVE-2024-0769  
  （严重程度评分为 9.8），这是一个导致信息泄露的路径遍历漏洞。  
  
  
尽管 D-Link DIR-859 WiFi路由器型号已到达使用寿命（EoL）并且不再接收任何更新，但该供应商仍然发布了安全公告 ，解释称该漏洞存在于设备的“fatlady.php”文件中，影响所有固件版本，并允许攻击者泄露会话数据，实现权限提升，并通过管理面板获得完全控制权。  
  
  
D-Link 预计不会发布针对 CVE-2024-0769 的修复补丁，因此该设备的所有者应尽快切换到受支持的设备。  
  
### 检测到的利用活动  
  
  
威胁监控平台 GreyNoise 观察到，在依赖于公开漏洞的细微变种的攻击中，CVE-2024-0769 遭到积极利用。  
  
  
研究人员解释说，黑客的目标是“DEVICE.ACCOUNT.xml”文件，以转储设备上的所有帐户名、密码、用户组和用户描述。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/AnRWZJZfVaHzPN9qVagYNibwcDuWB99IwbxIUF9cxoABh6QiaN3L7rdC4h4GksSWa1gohw8xcwXW1zJ6t516picAQ/640?wx_fmt=png&from=appmsg&wxfrom=13&tp=wxpic "")  
  
检索到的配置文件内容，来源：GreyNoise  
  
  
该攻击利用对“/hedwig.cgi”的恶意 POST 请求，利用 CVE-2024-0769 通过“fatlady.php”文件访问敏感配置文件（“getcfg”），该文件可能包含用户凭据。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/AnRWZJZfVaHzPN9qVagYNibwcDuWB99IwYpoOmhibPw4icC2E8A750C58PPllQrZw21hSbQ43WptPA9tJtHmFZxbA/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
恶意 POST 请求，来源：GreyNoise  
  
  
GreyNoise 尚未确定攻击者的动机，但针对用户密码的攻击表明其意图进行设备接管，从而使攻击者完全控制设备。  
  
  
研究人员解释说：“目前尚不清楚这些披露信息的预期用途是什么，需要注意的是，这些设备永远不会收到补丁。只要设备一直面向互联网，从设备中泄露的任何信息在设备的整个生命周期内都将对攻击者有价值”  
  
  
GreyNoise 指出，当前攻击所依赖的公开概念验证漏洞针对的是“DHCPS6.BRIDGE-1.xml”文件，而不是“DEVICE.ACCOUNT.xml”，因此它可以用于攻击其他配置文件，包括：  
- ACL.xml.php  
  
- ROUTE.STATIC.xml.php  
  
- INET.WAN-1.xml.php  
  
- WIFI.WLAN-1.xml.php  
  
这些文件可能会暴露访问控制列表 (ACL)、NAT、防火墙设置、设备帐户和诊断的配置，因此防御者应该意识到它们是潜在的利用目标。  
  
  
GreyNoise 提供了可在利用 CVE-2024-0769 的攻击中调用的文件的更大列表。如果发生其他变体，这应该可以为防御者提供帮助。  
  
  
END  
  
  
阅读推荐  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyliaDLQW996nP0FknIKIIsrFDibZEsOM03aUUYwTqhZA82GWKABZAPsBicW1Aac8bDnAqmf2vDXLtXd6Q/640?wx_fmt=jpeg "")  
[【安全圈】可获 root 权限，思科 NX-OS 零日漏洞修复已发布](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652062520&idx=1&sn=fe43c7a39bc5a06b1c4e2934de8517d3&chksm=f36e6f78c419e66eb25c48ea0339a6f5741303ec3bc98d3ccd0573700ecddfbbb7d4fc4bb35c&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylg5HmJHohtKbicUic2JlWJ2xGHufmrtVGbQhpMfGrA4AZxWWTX7XwgqA0lHPQS50TdQlZoPy1UiaPuMw/640?wx_fmt=jpeg&from=appmsg "")  
[【安全圈】Windows 修复漏洞遭利用，推送恶意脚本](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652062520&idx=2&sn=764d34aa1130ed7f83bd837c6a514c0e&chksm=f36e6f78c419e66e413059b9aaa771ab1b665e91d98232c678435a787fa8d94713d0da0c9480&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylg5HmJHohtKbicUic2JlWJ2xGIIkVKm4WbdN2wsKVTd0tHQiacN8F9t39dJ625FCiaNb4nhGJCT4dib8Vg/640?wx_fmt=jpeg&from=appmsg "")  
[【安全圈】巴基斯坦 CapraRAT 间谍软件伪装成热门应用程序威胁印度 Android 用户](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652062520&idx=3&sn=cd92e458da23905410eb6214c8aeddef&chksm=f36e6f78c419e66efacfa38611d38f8a4f09ee2185cffe39a40e5038f26d70cdc5eb690b3827&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyliaDLQW996nP0FknIKIIsrFD3VwzNKKXfrFofVmNpN9FDv7oicUk0TrIOG4Hzqrq8Dt0nF0qZEOwlkw/640?wx_fmt=jpeg "")  
[【安全圈】Juniper 警告存在严重身份验证绕过漏洞（CVE-2024-2973，CVSS 评分为 10）](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652062520&idx=4&sn=33ecb849545820707a62bfcb0b8c9a95&chksm=f36e6f78c419e66eebbbded12a5cc5f0ec54f274fdd57fa651a96f8090a6cf2cb8b0bddfd7b0&scene=21#wechat_redirect)  
                                                            
  
  
  
  
  
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
