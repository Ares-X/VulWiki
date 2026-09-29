---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Apache ActiveMQ 漏洞让攻击者触发 DoS 条件   
邑安科技  邑安全   2025-05-09 05:33  
  
更多全球网络安全资讯尽在邑安全  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1N39PtINn8sQyd4ibGZtpCJ9ByZ5icq3nxV720gibg1eOUYZXWL208GgEqrCwrbnDxg1SibTs2UibYbSSlSfZ3WrYIg/640?wx_fmt=png&from=appmsg "")  
  
在广泛使用的开源消息代理 Apache ActiveMQ 中发现了一个重大漏洞。  
  
该漏洞的官方跟踪为 CVE-2025-27533，使远程攻击者能够通过在处理 OpenWire 命令期间利用不正确的内存分配来触发拒绝服务 （DoS） 情况。  
  
此漏洞对依赖 ActiveMQ 进行实时消息传递的组织构成了严重风险，因为它可能导致意外的服务中断并中断业务运营。  
  
具有 Excessive Size Value 漏洞的内存分配  
  
该安全漏洞被归类为具有超大大小值的内存分配漏洞，源于在解组 OpenWire 命令期间未正确验证缓冲区大小。  
  
此技术缺陷允许远程攻击者请求过多的内存分配，从而可能耗尽系统资源并导致 ActiveMQ 代理崩溃。  
  
“在解组 OpenWire 命令期间，缓冲区的大小值没有得到正确验证，这可能导致内存分配过多，”公告中写道。  
  
此漏洞最终会耗尽进程内存，从而影响依赖于 ActiveMQ 代理可用性的应用程序和服务。  
  
该问题可以追溯到 JIRA 问题 AMQ-6596 中发现的早期问题，其中在 OpenWire 解组期间报告了 OutOfMemory 错误。  
  
根本原因是在 BaseDataStreamMarshaller 类中找到的，在 looseUnmarshalByteSequence 方法期间，可能会尝试初始化大型字节数组，而无需进行适当的大小验证。  
  
在一个记录在案的案例中，漏洞扫描导致 ActiveMQ 在尝试初始化超过 20 亿字节的字节数组时崩溃。  
  
即使存在 maxFrameSize 配置限制，也可以利用此漏洞，因为与 maxFrameSize 的第一次比较成功，但稍后的评估仍然允许过大的内存分配。  
<table><tbody><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td data-colwidth="145" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong msttexthash="14330498" msthash="73" style="box-sizing: border-box;font-weight: bold;"><span leaf=""><span textstyle="" style="font-size: 15px;">风险因素</span></span></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong msttexthash="3259074" msthash="74" style="box-sizing: border-box;font-weight: bold;"><span leaf=""><span textstyle="" style="font-size: 15px;">详</span></span></strong></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="145" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">受影响的产品</span></span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">Apache ActiveMQ 版本：- 6.0.0 到 6.1.5- 5.18.0 到 5.18.6- 5.17.0 到 5.17.6- 5.16.0 到 5.16.7</span></span></section></td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td data-colwidth="145" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">冲击</span></span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">拒绝服务 （DoS）</span></span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="145" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">利用先决条件</span></span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">需要对 ActiveMQ 代理进行未经身份验证的访问</span></span></section></td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td data-colwidth="145" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">CVSS 3.1 分数</span></span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">高</span></span></section></td></tr></tbody></table>  
受影响的版本和补救措施  
  
该漏洞影响以下 ActiveMQ 版本：  
- 6.1.6 之前的 6.0.0  
  
- 5.18.0 之前的 5.18.7  
  
- 5.17.0 之前的 5.17.7  
  
- 5.16.8 之前的 5.16.0  
  
值得注意的是，ActiveMQ 5.19.0 及更高版本不受影响。  
  
ActiveMQ 团队已经实施了一个修复程序，可以在解组期间正确验证缓冲区大小，开发人员 Christopher Shannon 最近向项目存储库提交的内容证明了这一点。此更新可确保在尝试内存分配之前检查缓冲区大小。  
  
安全研究人员建议使用受影响的 ActiveMQ 版本的组织立即升级到修补版本：6.1.6+、5.19.0+、5.18.7+、5.17.7 或 5.16.8。  
  
对于无法立即升级的组织，实施双向 TLS（传输层安全性）可以降低风险，因为在强制执行双向 TLS 连接时，漏洞利用是无效的。  
  
该漏洞凸显了正确输入验证的重要性，尤其是在处理来自可能不受信任的来源的序列化数据时。  
  
此问题类似于近年来困扰消息代理和应用程序服务器的其他反序列化漏洞。  
  
强烈建议在生产环境中使用 Apache ActiveMQ 的组织评估其风险并尽快应用建议的缓解措施，以保护其消息传递基础设施免受潜在的拒绝服务攻击。  
  
原文来自: cybersecuritynews.com  
  
原文链接:   
https://cybersecuritynews.com/apache-activemq-vulnerability-2/  
  
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
