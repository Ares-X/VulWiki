---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Cannon Printer 漏洞让攻击者可以执行任意代码   
邑安科技  邑安全   2025-04-01 17:23  
  
更多全球网络安全资讯尽在邑安全  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1N39PtINn8sD1ssAsORFVbleMVzjo0O7ntC6Vzgf5OMRGcTibrn86XOcXTRwU9KDdfKo1t2yGmO09luH0FYZib5A/640?wx_fmt=png&from=appmsg "")  
  
Canon 已发布一个重要的安全公告，内容涉及在其多个打印机驱动程序中检测到的严重漏洞，该漏洞可能允许攻击者在受影响的系统上执行任意代码。  
  
该漏洞被确定为 CVE-2025-1268，严重性 CVSS 基本分数为 9.4，表明对受影响 Canon 产品的用户存在重大安全影响。  
## 严重越界漏洞详情  
  
安全研究人员发现了一个越界漏洞，该漏洞专门影响多个 Canon Generic Plus 打印机驱动程序中的 EMF 重新编码处理功能。  
  
此漏洞可能使恶意行为者能够在通过受感染的应用程序处理打印作业时执行任意代码。  
  
此缺陷的严重性反映在其 CVSS 评分 9.4 中，将其置于“严重”严重性类别中，需要系统管理员和用户立即关注。  
  
此外，该漏洞尤其令人担忧，因为它不需要权限、用户交互或特殊访问条件即可利用。此分类表明远程攻击者可能会以相对较低的复杂性利用此漏洞。  
  
该漏洞不仅可能破坏打印作，还可能成为更复杂攻击的切入点，允许未经授权的代码执行，从而损害系统完整性和数据安全性。  
  
Canon 感谢   
Microsoft 进攻性研究和安全工程团队 （MORSE） 负责任地报告此漏洞，特别感谢研究人员 Robert Ord 为识别 CVE-2025-1268 做出的贡献。  
  
漏洞摘要如下：  
  
<table><tbody><tr><td data-colwidth="125"><strong msttexthash="14330498" msthash="68"><span leaf="" style="color:rgba(0, 0, 0, 0.9);font-size:17px;font-family:&#34;mp-quote&#34;, -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;line-height:1.6;letter-spacing:0.034em;font-style:normal;font-weight:normal;"><span textstyle="" style="font-size: 15px;">风险因素</span></span></strong></td><td><strong msttexthash="3259074" msthash="69"><span leaf="" style="color:rgba(0, 0, 0, 0.9);font-size:17px;font-family:&#34;mp-quote&#34;, -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;line-height:1.6;letter-spacing:0.034em;font-style:normal;font-weight:normal;"><span textstyle="" style="font-size: 15px;">详</span></span></strong></td></tr><tr><td data-colwidth="125"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf="" style="color:rgba(0, 0, 0, 0.9);font-size:17px;font-family:&#34;mp-quote&#34;, -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;line-height:1.6;letter-spacing:0.034em;font-style:normal;font-weight:normal;"><span textstyle="" style="font-size: 15px;">受影响的产品</span></span></section></td><td><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf="" style="color:rgba(0, 0, 0, 0.9);font-size:17px;font-family:&#34;mp-quote&#34;, -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;line-height:1.6;letter-spacing:0.034em;font-style:normal;font-weight:normal;"><span textstyle="" style="font-size: 15px;">Generic Plus PCL6 打印机驱动程序（V3.12 及更早版本）- Generic Plus UFR II 打印机驱动程序（V3.12 及更早版本）- Generic Plus LIPS4 打印机驱动程序（V3.12 及更早版本）- Generic Plus LIPSLX 打印机驱动程序（V3.12 及更早版本）</span></span></section></td></tr><tr><td data-colwidth="125"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf="" style="color:rgba(0, 0, 0, 0.9);font-size:17px;font-family:&#34;mp-quote&#34;, -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;line-height:1.6;letter-spacing:0.034em;font-style:normal;font-weight:normal;"><span textstyle="" style="font-size: 15px;">冲击</span></span></section></td><td><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf="" style="color:rgba(0, 0, 0, 0.9);font-size:17px;font-family:&#34;mp-quote&#34;, -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;line-height:1.6;letter-spacing:0.034em;font-style:normal;font-weight:normal;"><span textstyle="" style="font-size: 15px;">任意代码执行或中断打印作。</span></span></section></td></tr><tr><td data-colwidth="125"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf="" style="color:rgba(0, 0, 0, 0.9);font-size:17px;font-family:&#34;mp-quote&#34;, -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;line-height:1.6;letter-spacing:0.034em;font-style:normal;font-weight:normal;"><span textstyle="" style="font-size: 15px;">利用先决条件</span></span></section></td><td><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf="" style="color:rgba(0, 0, 0, 0.9);font-size:17px;font-family:&#34;mp-quote&#34;, -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;line-height:1.6;letter-spacing:0.034em;font-style:normal;font-weight:normal;"><span textstyle="" style="font-size: 15px;">无需权限、用户交互或特殊访问条件;可远程利用。</span></span></section></td></tr><tr><td data-colwidth="125"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf="" style="color:rgba(0, 0, 0, 0.9);font-size:17px;font-family:&#34;mp-quote&#34;, -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;line-height:1.6;letter-spacing:0.034em;font-style:normal;font-weight:normal;"><span textstyle="" style="font-size: 15px;">CVSS 3.1 分数</span></span></section></td><td><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf="" style="color:rgba(0, 0, 0, 0.9);font-size:17px;font-family:&#34;mp-quote&#34;, -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;line-height:1.6;letter-spacing:0.034em;font-style:normal;font-weight:normal;"><span textstyle="" style="font-size: 15px;">9.4 （严重）</span></span></section></td></tr></tbody></table>## 受影响的打印机驱动程序  
  
Canon 已确认该  
漏洞影响以下打印机驱动程序版本：  
- Generic Plus PCL6 打印机驱动程序 – V3.12 及更早版本  
  
- Generic Plus UFR II 打印机驱动程序 – V3.12 及更早版本  
  
- Generic Plus LIPS4 打印机驱动程序 – V3.12 及更早版本  
  
- Generic Plus LIPSLX 打印机驱动程序 – V3.12 及更早版本  
  
- Generic Plus PS 打印机驱动程序 – V3.12 及更早版本  
  
这些驱动程序通常用于各种 Canon 商用打印机、办公室/小型办公室多功能打印机和激光打印机，可能会影响全球成千上万的组织和个人用户。  
  
Canon 已开发更新的打印机驱动程序来解决此安全问题。该公司强烈建议所有用户安装通过当地 Canon 销售代表的网站提供的最新打印机驱动程序版本。  
  
用户应优先考虑此更新，以降低针对此漏洞的潜在漏洞的风险。  
  
为了获得全面的保护，IT 管理员应考虑实施额外的安全控制，例如打印服务器的网络分段和对可疑打印活动的增强监控。  
  
原文来自: cybersecuritynews.com  
  
原文链接:   
https://cybersecuritynews.com/cannon-printer-vulnerability-arbitrary-code/  
  
欢迎收藏并分享朋友圈，让五邑人网络更安全  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/1N39PtINn8tD9ic928O6vIrMg4fuib48e1TsRj9K9Cz7RZBD2jjVZcKm1N4QrZ4bwBKZic5crOdItOcdDicPd3yBSg/640?wx_fmt=jpeg "")  
  
欢迎扫描关注我们，及时了解最新安全动态、学习最潮流的安全姿势！  
  
推荐文章  
  
1  
  
[新永恒之蓝？微软SMBv3高危漏洞（CVE-2020-0796）分析复现](http://mp.weixin.qq.com/s?__biz=MzUyMzczNzUyNQ==&mid=2247488913&idx=1&sn=acbf595a4a80dcaba647c7a32fe5e06b&chksm=fa39554bcd4edc5dc90019f33746404ab7593dd9d90109b1076a4a73f2be0cb6fa90e8743b50&scene=21#wechat_redirect)  
  
  
2  
  
[重大漏洞预警：ubuntu最新版本存在本地提权漏洞（已有EXP）　](http://mp.weixin.qq.com/s?__biz=MzUyMzczNzUyNQ==&mid=2247483652&idx=1&sn=b2f2ec90db499e23cfa252e9ee743265&chksm=fa3941decd4ec8c83a268c3480c354a621d515262bcbb5f35e1a2dde8c828bdc7b9011cb5072&scene=21#wechat_redirect)  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
