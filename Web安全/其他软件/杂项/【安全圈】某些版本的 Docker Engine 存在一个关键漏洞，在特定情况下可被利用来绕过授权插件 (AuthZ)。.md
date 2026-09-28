---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】某些版本的 Docker Engine 存在一个关键漏洞，在特定情况下可被利用来绕过授权插件 (AuthZ)。   
 安全圈   2024-07-26 19:00  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgOvEXHviaXu1fO2nLov9bZ055v7s8F6w1DD1I0bx2h3zaOx0Mibd5CngBwwj2nTeEbupw7xpBsx27Q/640?wx_fmt=png&from=appmsg "微信图片_20230927171534.png")  
  
  
**关键词**  
  
  
  
安全漏洞  
  
  
在某些版本的 Docker 引擎中，被跟踪为   
CVE-2024-41110（CVSS 评分为 10.0）的漏洞可允许攻击者在特定情况下绕过授权插件 （AuthZ）。  
  
Moby Project 维护者发布的公告中写道：“攻击者可以使用 Content-Length 设置为 0 的 API 请求来利用绕过漏洞，导致 Docker 守护程序将没有正文的请求转发到 AuthZ 插件，该插件可能会错误地批准该请求。“使用特制的 API 请求，Engine API 客户端可以使守护进程将请求或响应转发到授权插件，而无需正文。在某些情况下，授权插件可能会允许一个请求，如果正文被转发给它，它本来会被拒绝。  
  
2018 年发现的一个缺陷允许攻击者使用构建的 API 请求绕过 Docker 引擎中的授权 （AuthZ） 插件，从而可能导致未经授权的操作，包括权限提升。该漏洞已在 Docker Engine v18.09.1 版本中得到解决，但未包含在后续的主要版本中，从而导致回归。此问题不会影响 Docker EE v19.03.x 或任何版本的 Mirantis 容器运行时。  
  
该漏洞于 2024 年 4 月被发现，已在 2024 年 7 月 23 日发布的版本 23.0.14 和 27.1.0 中得到解决。以下是使用 AuthZ 插件时受影响的 Docker Engine 版本列表：  
- <= v19.03.15  
  
- <= v20.10.27  
  
- <= v23.0.14  
  
- <= v24.0.9  
  
- <= v25.0.5  
  
- < = v26.0.2  
  
- < = v26.1.4  
  
- <= v27.0.3，以及  
  
- < = v27.1.0  
  
如果不使用授权插件进行访问控制决策，Docker Engine v19.03.x 及以上版本不受影响。同样，Mirantis Container Runtime 的所有版本都不会受到此问题的影响。  
  
“不依赖AuthZ插件的Docker商业产品和内部基础设施的用户不受影响，”该公告继续说道。  
  
Docker Desktop 4.32.0 及之前版本包含易受攻击的 Docker Engine 版本。但是，由于利用该漏洞需要访问 Docker API，而 Docker API 通常需要对主机进行本地访问，因此降低了风险。默认情况下，Docker Desktop 不包含 AuthZ 插件，从而限制了对 Docker Desktop VM 而不是底层主机的权限提升。预计 Docker Desktop v4.33 中将提供 Docker Engine 的固定版本，以解决这些安全问题。  
  
以下是 Docker 维护者提出的补救步骤：  
1. 更新 Docker 引擎：  
  
- 如果您运行的是受影响的版本，请更新到最新的修补版本。  
  
1. 如果无法立即更新，则采取缓解措施：  
  
- 避免使用 AuthZ 插件。  
  
- 将 Docker API 的访问限制为受信任方，遵循最小权限原则。  
  
1. 更新 Docker Desktop：  
  
- 如果使用受影响的版本，请在发布后更新到 Docker Desktop 4.33。  
  
- 确保未使用 AuthZ 插件，并且不要在没有保护的情况下通过 TCP 公开 Docker API。  
  
- Docker Business 订阅者可以使用设置管理来强制实施安全设置。  
  
  
  
END  
  
  
阅读推荐  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylhickkwIrLIB3GAHnldD5X9krF8cwzia67GeRdXJ5DGHWcvNlmUwEYKV1iaGguvbVxtmBHZvPs1Wic0MA/640?wx_fmt=jpeg "")  
[【安全圈】这家网络公司开始聘用黑客？](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652063086&idx=1&sn=8b841b8242dff0f3af24fad49b952555&chksm=f36e692ec419e03882e468149cd84bb3bca83dc01adefb881762171e95f162781888daef50d8&scene=21#wechat_redirect)  
                                      
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylhickkwIrLIB3GAHnldD5X9kjxbNcicHYj7FOklgiarSLrXGdFJhSmtsbHack2G1Ibnnn8uib77a8ttLA/640?wx_fmt=jpeg "")  
[【安全圈】Crowdstrike蓝屏事件自查结果：错在流程而非人](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652063086&idx=2&sn=afcd1063623156c29769141ffa615a68&chksm=f36e692ec419e0384b2b7e668a91f93453fce5abdab9616d7f3dcbcc30a96ce7b4fd3611e744&scene=21#wechat_redirect)  
          
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylhickkwIrLIB3GAHnldD5X9kVGxv8k3TQzKdbT8IN2buJLWickC74g2WKcicfibPzj2HVAljpPialUqaDQ/640?wx_fmt=jpeg "")  
[【安全圈】史上最大规模的数字盗版泄密事件：1000万用户因虚假Z-Library导致机密信息泄露](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652063086&idx=3&sn=5732f3cf80a7316954fc8c9c85bb06c4&chksm=f36e692ec419e0389e237580eba7c2403888b435cba1ae69a629d8c950727f0d6273f60d7e81&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylhickkwIrLIB3GAHnldD5X9kxL3GDjmaH7wvh73LhGzibQS4EfLAuicwCTgRcwbkhUOMExQSzcugd9Qg/640?wx_fmt=jpeg "")  
[](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652063065&idx=4&sn=96fc3e573519081fbd49937334e2bdf4&chksm=f36e6919c419e00f3be7624ee0417191b17aa3f119197ded57e995671d7fefbef3d6a1a00393&scene=21#wechat_redirect)  
[【安全圈】R0bl0ch0n TDS——新型附属欺诈计划波及1.1亿用户](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652063086&idx=4&sn=4cb1efc9ece7cc4641fdb5a422dac737&chksm=f36e692ec419e0382853b4f9ee3dc8dd2aa290b4761f2ab797eb8933813dec5295cb4cfcb621&scene=21#wechat_redirect)  
  
  
  
  
  
  
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
