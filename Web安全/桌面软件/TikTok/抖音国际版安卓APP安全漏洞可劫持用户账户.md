---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  抖音国际版安卓APP安全漏洞可劫持用户账户   
ang010ela  嘶吼专业版   2022-09-06 12:05  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/wpkib3J60o297rwgIksvLibPOwR24tqI8dGRUah80YoBLjTBJgws2n0ibdvfvv3CCm0MIOHTAgKicmOB4UHUJ1hH5g/640?wx_fmt=gif "")  
  
抖音国际版安卓APP安全漏洞可实现用户账户劫持。  
  
2022年2月，微软研究人员在TikTok（抖音国际版）安卓APP中发现了一个严重安全漏洞，漏洞CVE编号为CVE-2022-28799，CVSS评分8.3分。攻击者利用该漏洞可以诱使目标点击特定的恶意链接，只需一次点击就可以劫持账户。  
# 触发APP的内部deeplink  
  
TikTok安卓版使用多种deeplink方案，其中部分通过mainfest导出，部分只是应用内部使用。其中https://m.tiktok[.]com/redirect链接是由[redacted]类处理的，用于根据查询参数重定向URI到应用的不同组件中。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o2icWF7kOmAWz873rfb9mhCNib8o2U5VvYIIfwtwAia1KeIYO6XzUgkkGttBDSFLnjec7lg2oeIiakSlmA/640?wx_fmt=png "")  
  
图 使用Medusa识别deeplink和其他目标活动  
  
研究人员分析发现可以通过查询参数触发内部deeplink和调用非导出的活动，扩大了应用的攻击面。TikTok称，重定向到内部deeplink并不会引发安全问题。  
  
研究人员构造了一个PoC URL，该URL使用特定的非导出方案来加载https://www.tiktok[.]com到应用的webview，如下图所示：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o2icWF7kOmAWz873rfb9mhCNibrHF0IUnc7sK1ibSMFqnYUsENUSJVe58yVq0JfK6jH6rKeibTpTTnRbUg/640?wx_fmt=png "")  
  
图 使用链接来触发内部使用的方案，并加载tiktok.com  
  
虽然[redacted-internal-scheme]://webview?url=< website > deeplink 可以用于加载URL到CrossPlatformActivity的WebView，但应用会通过过滤器拒绝不信任的主机。相比成功加载的Tiktok.com域名，下图展示了应用过滤器拒绝的Example.com域名：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o2icWF7kOmAWz873rfb9mhCNib47Qmiam172SKr1ntf4FdLlbdVlXcfK3vUxh620tl5X6A0qx5bAtVPeA/640?wx_fmt=png "")  
  
过滤器位于服务器端，加载或决绝URL的决定是根据接收到的特定HTTP GET请求的回复决定的。研究人员分析表明有可能给deepLink添加两个额外的参数来绕过服务器端检查。  
  
活动的WebView会创建JavaScript bridge实例，可以通过Medusa的 WebView模块动态验证。因此，分配给[redacted-scheme]://webview scheme查询参数的网站就有JavaScript bridge的完全访问权限，也就是说网站的JS代码可以访问和调用[redacted].bridge.* package下暴露的所有功能。  
# 暴露的功能  
  
研究人员检查发现一共暴露了有超过70个方法。利用这些方法与漏洞利用结合就可以劫持Webview，部分方法可以被调用来授予攻击者部分功能。比如，部分暴露的方法可以访问或修改用户的隐私信息。通过调用这些方法，攻击者可以：  
  
**·**通过触发到攻击者控制的服务器的请求和记录cookie和请求header来提取用户的认证token；  
  
**·**通过触发到Tiktok终端的请求，和通过JS回调来取回回复来提取和修改用户的TikTok账户数据，比如隐私视频和个人简介设置。  
  
也就是说，通过控制这些方法可以执行认证的HTTP请求，恶意攻击者可以成功入侵TikTok用户账户。  
# PoC  
  
在PoC中，攻击者发送精心构造的链接给目标TikTok用户。用户点击链接后，视频上传认证token就会发送给攻击者，然后该脚本会修改用户的个人信息来读“!! SECURITY BREACH !!”:  
  
攻击者构造的恶意链接被用户点击后，攻击者的服务器https://www.attacker[.]com/poc就会被授予JavaScript bridge的完全访问权限，并调用任意暴露的功能。攻击者的服务器会返回一个含有JS代码的HTML页面来发送视频上传token给攻击者，并修改用户的个人简介。  
  
然后视频上传认证token会通过XMLHttpRequest发送给攻击者。攻击者还可以接收回复body和header，如下图所示：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o2icWF7kOmAWz873rfb9mhCNibiaR5sI07YSYWic1CXQA2ROBRtwiaerlv5gkRqLVScg5YSkTQTB6Orwc3A/640?wx_fmt=png "")  
  
图 攻击提取的请求header  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o2icWF7kOmAWz873rfb9mhCNibicgA754xiat5OLZNLAGwpYp9cibJwXHnbtia9KzgDIRqUsiasoTHySGZUtw/640?wx_fmt=png "")  
  
图 服务器回复中包含header  
  
最终，消息“!! SECURITY BREACH !!!”就被设置在用户的个人简介中：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o2icWF7kOmAWz873rfb9mhCNibBDk93K0Jz1QYWGc9X9vCictpKpLvskMCkC85mkt7wh6kBicoBkV0aW8A/640?wx_fmt=png "")  
  
图 入侵用户profile  
  
微软将该漏洞提交给了TikTok，并称未发现在野漏洞利用。TikTok已在 v23.7.3版本中修复了该漏洞。  
  
参考及来源：https://www.microsoft.com/security/blog/2022/08/31/vulnerability-in-tiktok-android-app-could-lead-to-one-click-account-hijacking/  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o2icWF7kOmAWz873rfb9mhCNibnqQxxdC1bPv88enlkYyHib2yG2PshwOtpw5S4Kg7NKqjtnMQR0ZiayiaQ/640?wx_fmt=png "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o2icWF7kOmAWz873rfb9mhCNibia6n1fb1YzolekfwKApvNHibCy36iaXwSXUdX4XKqSq37FpLthc8vOpMg/640?wx_fmt=png "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
