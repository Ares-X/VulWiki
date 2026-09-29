---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】Windows 系统曝高危漏洞，数十万个系统面临风险   
 安全圈   2023-04-15 19:01  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/aBHpjnrGylgSxa9I02IBd3bgLEhwfJCeRibw3LEjMujeAhD2CvyiaVCZJVHGHODbkPx3pViaX0sAibZsDun6sicUzdQ/640?wx_fmt=jpeg "")  
  
  
**关键词**  
  
  
  
系统漏洞  
  
  
安全研究人员和专家警告称，Windows 消息队列 (MSMQ) 中间件服务中存在一个高危漏洞 CVE-2023-21554。利用该漏洞，攻击者能够在无用户交互的情况下实现远程代码执行，进而接管服务器资源。Windows 消息队列 (MSMQ) 在所有Windows版本里都可用，主要用于为应用程序提供“消息传递保证”网络功能、启动 PowerShell 或控制面板。  
  
值得注意的是，该服务通常在安装企业应用程序时在后台启用，即使应用程序卸载后也会继续运行。例如，MSMQ 会在 Exchange Server 安装期间自动启用。  
  
受影响的 Windows 服务器和客户端版本列表包括所有当前支持的版本，包括最新版本的 Windows 11 22H2 和 Windows Server 2022。  
  
据 Check Point Research 称，超过 360,000 台运行 MSMQ 服务的 Internet 可用服务器可能容易受到攻击。  
  
据GreyNoise分析，目前已有10个不同的IP地址开始扫描互联网上开放的服务器。  
  
虽然微软已经修复了这个漏洞，但该公司还建议无法紧急应用更新的管理员禁用 Windows MSMQ 服务。无法禁用 MSMQ 或安装 Microsoft 修补程序的组织可以使用防火墙规则阻止来自不受信任来源的 1801/TCP 连接。  
  
  
   END    
  
  
阅读推荐  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/aBHpjnrGylgK8EUY32CkusajGCN1edz7tqJpJmTYaqy8Lr69ypJ8O0ZZExx9HeQhUxXXUkr4R4V7dmMKH4fooQ/640?wx_fmt=jpeg "")  
[【安全圈】个人隐私被泄露，女演员称怀孕后丈夫多次收到涉黄短信](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652032409&idx=1&sn=7547db1aa785fd7fa1f8f53d0cfbbbe4&chksm=f36fe1d9c41868cf2f6c7e85f4d5e85b13a046d2a8dff9df4c17f88aa5f4c2e96fb9a2849759&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/aBHpjnrGylgK8EUY32CkusajGCN1edz7ozdiaibvLBxjgQoelxsicyOP1ibM5yn1EgWktbgIfyjSqwlolUSrOoSn4w/640?wx_fmt=jpeg "")  
[【安全圈】微信泄露手机号事件的回顾与总结](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652032409&idx=2&sn=8db19a472a78560abf7a4cdcf0c0de57&chksm=f36fe1d9c41868cffef9fb8b552efc3a8818239db6fb9e9aa09ff45c7a9c6702557f1aa27363&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/aBHpjnrGylgK8EUY32CkusajGCN1edz76icYW9pwB1J1dXWuibjOwbdrMsuPRoqxh292Vg8SyGFCYSgEL64lmRZg/640?wx_fmt=jpeg "")  
[【安全圈】诈骗集团 5 人被捕，涉案资金高达 9800 万美元！](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652032409&idx=3&sn=9ef65e5e6c620b29ade7392866375feb&chksm=f36fe1d9c41868cfaa7521e9a326a20f84cd5d1c1f7b89d1ccc037eb05efcd3426fe0a2f8698&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/aBHpjnrGylgK8EUY32CkusajGCN1edz7OONdngOJheNP6zibxXQ83ACyGqQeaUZYlt4M4VJazx6hAibwol00fW7A/640?wx_fmt=jpeg "")  
[【安全圈】沃尔沃零售商客户信息遭泄露，涉及大量敏感文件](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652032409&idx=4&sn=02bb2ca296e91d40455267cabe7d0251&chksm=f36fe1d9c41868cf29409b4866c0aac1e6956766c5d1db9b22a548cfcc359833b8889a79fec6&scene=21#wechat_redirect)  
  
  
  
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
