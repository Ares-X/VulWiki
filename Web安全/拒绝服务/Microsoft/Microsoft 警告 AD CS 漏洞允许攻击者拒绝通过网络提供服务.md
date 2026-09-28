---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Microsoft 警告 AD CS 漏洞允许攻击者拒绝通过网络提供服务   
邑安科技  邑安全   2025-05-14 09:31  
  
更多全球网络安全资讯尽在邑安全  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1N39PtINn8v7T54TklESlCO3EibopMCrug5Pf5d76p968QInbg0RtKWpHj243lLfDfJ8Vlto45Fpyd07FMqlthA/640?wx_fmt=png&from=appmsg "")  
  
Microsoft 已发布有关 Active Directory 证书服务 （AD CS） 中一个新漏洞的安全公告，该漏洞可能允许攻击者通过网络执行拒绝服务攻击。  
  
该漏洞被确定为 CVE-2025-29968，影响 Windows Server 的多个版本，并已被分配为“重要”严重性评级，CVSS 评分为 6.5/5.7。  
  
该安全漏洞源于 Active Directory 证书服务中不正确的输入验证，Active Directory 证书服务是一个关键的 Windows 角色，使组织能够出于内部安全目的颁发和管理数字证书。  
  
Microsoft AD CS 输入验证不当缺陷  
  
该问题归类为 CWE-20，Microsoft 的技术文档指出“Active Directory 证书服务 （AD CS） 中的不当输入验证允许授权攻击者拒绝通过网络提供服务”。  
  
一旦被利用，攻击者可能会导致 AD CS 服务变得无响应，从而可能中断组织基础结构中的身份验证过程、安全通信和其他依赖于证书的作。  
  
根据 Microsoft 的安全公告，CVSS 向量字符串中的漏洞表明，该漏洞可以通过攻击复杂度低且需要低权限的网络进行利用。  
  
利用漏洞不需要用户交互，虽然漏洞不会影响机密性或完整性，但它可能会严重影响可用性。  
  
研究人员指出，此漏洞令人担忧，因为具有相对较低权限的经过身份验证的攻击者可能会破坏整个组织的证书服务。  
<table><tbody><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td data-colwidth="149" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong msttexthash="14330498" msthash="70" style="box-sizing: border-box;font-weight: bold;"><span leaf=""><span textstyle="" style="font-size: 15px;">风险因素</span></span></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong msttexthash="3259074" msthash="71" style="box-sizing: border-box;font-weight: bold;"><span leaf=""><span textstyle="" style="font-size: 15px;">详</span></span></strong></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="149" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">受影响的产品</span></span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">– Windows Server 2022（包括 23H2 版） – Windows Server 2019 – Windows Server 2016 – Windows Server 2012/2012 R2 – Windows Server 2008/2008 R2</span></span></section></td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td data-colwidth="149" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">冲击</span></span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">通过 AD CS 服务中断的拒绝服务 （DoS）</span></span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="149" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">利用先决条件</span></span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">– 低权限身份验证访问 – 已启用 Active Directory 证书服务 （AD CS） 角色</span></span></section></td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td data-colwidth="149" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">CVSS 3.1 分数</span></span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">6.5 （重要）</span></span></section></td></tr></tbody></table>  
受影响的系统  
  
该漏洞影响多个 Windows Server 版本，包括：  
- Windows Server 2022（包括 23H2 版）。  
  
- Windows 服务器 2019。  
  
- Windows 服务器 2016。  
  
- Windows 服务器 2012/2012 R2。  
  
- Windows 服务器 2008/2008 R2。  
  
标准和 Server Core 安装都会受到影响，如 Microsoft 的公告中所述。在这些服务器上启用时，该漏洞专门针对 AD CS 角色。  
  
已发布的补丁  
  
Microsoft 已发布安全更新来解决此漏洞。建议 IT 管理员根据其 Windows Server 版本应用适当的补丁。例如：  
- Windows Server 2022：KB5058385（安全更新 10.0.20348.3692）。  
  
- Windows Server 2019：KB5058392（安全更新 10.0.17763.7314）。  
  
- Windows Server 2016：KB5058383（安全更新 10.0.14393.8066）。  
  
Microsoft 已将可利用性评估为“不可能利用”，并确认该漏洞尚未公开披露或被广泛利用。尽管如此，安全团队仍应保持警惕。  
  
通过协调披露发现并报告此漏洞的匿名安全研究人员已得到 Microsoft 在其安全公告中的认可。  
  
建议使用 Active Directory 证书服务的组织实施相关的安全更新，作为其常规补丁管理流程的一部分。  
  
原文来自: cybersecuritynews.com  
  
原文链接:   
https://cybersecuritynews.com/microsoft-warns-of-ad-cs-vulnerability/  
  
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
