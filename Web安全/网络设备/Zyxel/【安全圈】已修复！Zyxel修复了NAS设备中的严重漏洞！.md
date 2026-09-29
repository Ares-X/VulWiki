---
cve: "CVE-2023-27992"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】已修复！Zyxel修复了NAS设备中的严重漏洞！   
 安全圈   2023-06-21 19:00  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/aBHpjnrGylgSxa9I02IBd3bgLEhwfJCeRibw3LEjMujeAhD2CvyiaVCZJVHGHODbkPx3pViaX0sAibZsDun6sicUzdQ/640?wx_fmt=jpeg "")  
  
  
**关键词**  
  
  
  
漏洞修复  
  
  
近日，Zyxel针对CVE-2023-27992 (CVSS评分:9.8)发布了安全更新，这个严重的安全漏洞影响到了其网络附加存储(NAS)设备。  
  
该漏洞存在预认证命令注入问题，影响了V5.21(AAZF.14)C0之前的多个固件版本，其中包括Zyxel NAS326固件版本、V5.21(AATB.11)C0之前的NAS540固件版本、以及V5.21(ABAG.11)C0之前的NAS542固件版本。未经身份验证的远程攻击者可以通过发送特制的HTTP请求来利用该漏洞执行某些操作系统命令。  
  
Zyxel发布了补丁，解决了NAS版本中的预认证命令注入漏洞。  
  
Zyxel在发布建议中提到，某些Zyxel NAS设备中的预认证命令注入漏洞可以允许未经认证的攻击者通过发送精心制作的HTTP请求远程执行某些操作系统(OS)命令。  
  
该漏洞由Andrej Zaujec、NCSC-FI和Maxim Suslov报告。  
  
6月初，Zyxel发布了保护防火墙和VPN设备免受持续攻击和利用CVE-2023-28771、CVE-2023-33009和CVE-2023-33010漏洞的指南。  
  
威胁行为者正在积极尝试利用命令注入漏洞CVE-2023-28771攻击Zyxel的防火墙。他们的目标是利用这个漏洞在受影响的系统上部署和安装恶意软件。目前美国CISA已将该漏洞添加到其已知利用漏洞目录中。  
  
4月下旬，Zyxel解决了其防火墙设备中的严重漏洞CVE-2023-28771 (CVSS评分9.8)。Zyxel方面建议客户立即安装补丁，以降低漏洞可能带来的潜在风险。  
  
目前该漏洞正在被积极利用，被用以在类似mirai的僵尸网络中招募易受攻击的设备。  
  
另外还追踪到两个漏洞，CVE-2023-33009和CVE-2023-33010是关键的缓冲区溢出漏洞。远程的、未经身份验证的攻击者可以触发这些缺陷，导致拒绝服务(DoS)条件，并在易受攻击的设备上远程执行代码。  
  
Zyxel表示，一旦受到攻击，设备得Web GUI或SSH管理界面将无法访问。  
  
  
   END    
  
  
阅读推荐  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyljcqXVib9rFbohL8rXNvicOFnPtvCRMTYh3bDibibyOO2aEOka7r2PbGSWAhknkmEI3vvLLofqBb4Pibibg/640?wx_fmt=jpeg "")  
[【安全圈】6.2万元罚单！衡阳一医院数据保护不力造成泄露，医院和第三方公司均受罚](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652037480&idx=1&sn=684db69a903979d1d44d2c495096a843&chksm=f36fcd28c418443e4be49d21fbe0543da2e3b026baf6e93d46c19f0544344007ec9adf5e15a7&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGyljcqXVib9rFbohL8rXNvicOFnCwS7yVDRAVoQdtoYlK7AUoZTICaeHCU8fHItILicF5mP0ghjnzG8Gfw/640?wx_fmt=png "")  
[【安全圈】星巴克被上海网信办约谈，原因是页面多次索要个人权限和信息](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652037406&idx=2&sn=9574e7913337655be41bbbab89b4ee79&chksm=f36fcd5ec41844484dbc0b1f78559022bc226925435dabc8f4d05de4a7018cec2bfb65ee0440&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyljcqXVib9rFbohL8rXNvicOFnypWHceabibvBfungKCWiaFxXYOZSAgoib7yGBOH0GtgXIZffgetCaAATg/640?wx_fmt=jpeg "")  
[【安全圈】华硕用户注意了！官方曝光路由器的关键漏洞，称尽快修复](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652037480&idx=3&sn=92c94213fb28c164491aea642f8868cd&chksm=f36fcd28c418443ef815ea9dc974f30a3395a90f3670d294d7d384193da8013d486587061f74&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyljcqXVib9rFbohL8rXNvicOFnqFkFLxfibTbMCpQrKoQhMTCkamLyygmPHe16FbaZFjZcsHJc2rccwaA/640?wx_fmt=jpeg "")  
[【安全圈】国家网信办正式发布境内深度合成服务算法备案信息](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652037480&idx=4&sn=7d1d0f8656153fb18ed0bd6a5f8be54e&chksm=f36fcd28c418443e869839354d188e29e2057b1b5df62e08c25980b74411d51b332d323115ac&scene=21#wechat_redirect)  
  
  
  
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
