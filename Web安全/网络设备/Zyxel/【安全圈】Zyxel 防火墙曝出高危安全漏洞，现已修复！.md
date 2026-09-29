---
cve: "CVE-2023-28771"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】Zyxel 防火墙曝出高危安全漏洞，现已修复！   
 安全圈   2023-06-05 19:01  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/aBHpjnrGylgSxa9I02IBd3bgLEhwfJCeRibw3LEjMujeAhD2CvyiaVCZJVHGHODbkPx3pViaX0sAibZsDun6sicUzdQ/640?wx_fmt=jpeg "")  
  
**关键词**  
  
安全漏洞  
  
  
  
日前，Zyxel发布了一份指南，旨在保护防火墙和VPN设备免受利用CVE-2023-28771、CVE-2023-33009和CVE-2023-33010漏洞的持续攻击。  
  
指南中提到，该公司一直在通过多种渠道敦促用户安装补丁，比如已经给注册用户和资讯订阅者发送了多份安全资讯，通过本地设备的Web GUI推送通知通知用户升级；以及对尚未升级的基于云的设备强制执行预定的固件升级等。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylgcYloicTTHFibCxWMOXwfGjr73FkD2Pmnj13ic0Pk4eicq4OIksdMfmgu8icWqqYTHq11JbdUGtfkxYvg/640?wx_fmt=jpeg "")  
  
有威胁行为者正在尝试利用命令注入漏洞CVE-2023-28771以影响Zyxel防火墙。他们的目标是利用这个漏洞在受影响的系统上部署和安装恶意软件。美国CISA目前已将该漏洞添加到其已知利用漏洞目录中。  
  
4月下旬，Zyxel方面称已解决了其防火墙设备中的严重漏洞CVE-2023-28771 (CVSS评分9.8)，并建议其客户立即安装补丁，以尽快修复漏洞避免造成更大影响。  
  
另外两个被追踪到的漏洞是CVE-2023-33009和CVE-2023-33010，这两个是关键的缓冲区溢出漏洞。远程的、未经认证的攻击者可以触发这些缺陷，在易受攻击的设备上造成拒绝服务（DoS）条件和远程代码执行。  
  
该公司表示，设备一旦遭受攻击，其Web GUI或SSH管理界面将无法访问，可能出现网络中断和VPN连接断开等问题。下表列出了受这些缺陷影响的产品和固件版本，以及解决这些问题的最新固件更新：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylgcYloicTTHFibCxWMOXwfGjrK3ddibKZJFcllf6p4n8pHLeTKZhjbNMjdhYIEsibaf1Xe3nbjRibd1eLA/640?wx_fmt=jpeg "1685934891_647d532b79cc8a6a42f3c.png!small")  
  
与此同时，Zyxel还提供了针对这些漏洞的缓解措施，例如从WAN(广域网)禁用HTTP/HTTPS服务。  
  
如果管理员需要从广域网侧管理设备，可启用“策略控制”功能，并添加只允许可信源IP地址访问的规则。该指南还建议启用GeoIP过滤，只允许来自受信任位置的访问。如果不需要IPSec VPN功能，Zyxel方面建议关闭UDP端口500和4500。  
  
  
  
  
   END    
  
  
阅读推荐  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgcYloicTTHFibCxWMOXwfGjrkhA6Zffoib8qP1TUibPyprdiatH6BiczUiaQbvwicGZ9licOQ2AjULWLXCBmg/640?wx_fmt=png "")  
[【安全圈】“黑客”入侵后台9天内盗充百万 警方打掉3人犯罪团伙](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652036087&idx=1&sn=44f809e7bde502556bef13c0ae70629f&chksm=f36ff7b7c4187ea1e532479294244888759c547afe168e01c7afeb8c085bb4a6087199d033fe&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgcYloicTTHFibCxWMOXwfGjrfjAqxfiaM8O3bLZ3ugKozwMniacxBbITQun3dJFnm0dXRrAD36gYdCtQ/640?wx_fmt=png "")  
[【安全圈】18岁黑客入侵博彩网站6万个账户并从中窃取60万美元](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652035857&idx=2&sn=40536333c8b26797bc8ab3693521d57b&chksm=f36ff751c4187e477d6028949f4ff73e6efc3f3e59494babfeb41ace82befeb39481b0a0875f&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylgcYloicTTHFibCxWMOXwfGjrLd4ncU3KcKMj5CHiconNHicRVTjbWOqxNbD2UEwT0BgicQriciaBVAyicebg/640?wx_fmt=jpeg "")  
[【安全圈】国内首个AI女友来了，永久在线、深情陪聊，引人关注！](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652036017&idx=1&sn=9aa111baaee73e86bd5e0e9be99a2a95&chksm=f36ff7f1c4187ee70837526263aa7312646250ca412b8030ad2e8bdf7b63f578ece8c55beb34&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGyljzic8ibQSUeGqdk9FAibe6XWWPicagdBXV298yC05SVJ87N65skCCJ0aGh9Zd6LicGUryIPjfzQUXL4qw/640?wx_fmt=png "")  
[【安全圈】被苹果App Store应用商店下架？百度网盘回应](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652035765&idx=2&sn=e8c4a79bdd94841bf5c9cd2e7d484edf&chksm=f36ff6f5c4187fe360a1fcfe7fed83dc64ba645a0ac1aabf9ba9fb3a6b6a218c05ec2cf2fadf&scene=21#wechat_redirect)  
  
  
  
  
  
  
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
