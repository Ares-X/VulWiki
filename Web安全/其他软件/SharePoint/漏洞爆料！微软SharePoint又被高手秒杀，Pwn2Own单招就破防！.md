---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞爆料！微软SharePoint又被高手秒杀，Pwn2Own单招就破防！  
 Ots安全   2025-07-15 10:38  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/bL2iaicTYdZn7gtxSFZlfuCW6AdQib8Q1onbR0U2h9icP1eRO6wH0AcyJmqZ7USD0uOYncCYIH7ZEE8IicAOPxyb9IA/640?wx_fmt=gif "")  
  
2025年7月14日，安全研究团队CODE WHITE GmbH在X平台上发布了一则令人震惊的消息：他们成功复现了名为“ToolShell”的漏洞利用链，这一漏洞链结合了CVE-2025-49706和CVE-2025-49704，首次由安全研究员@_l0gg在今年5月的Pwn2Own Berlin 2025竞赛中展示。这次攻击的目标直指Microsoft SharePoint，令人瞩目的是，整个攻击过程仅需一个HTTP请求，且无需身份验证即可实现远程代码执行（RCE）。  
- CVE-2025-49706：这一漏洞被描述为一个身份验证绕过缺陷，允许攻击者在未提供有效凭证的情况下访问受限资源。根据相关技术分析，这一漏洞可能涉及SharePoint服务器的认证机制配置错误，攻击者能够利用不当的权限检查绕过安全防护。  
  
- CVE-2025-49704：该漏洞属于不安全的反序列化问题，原本需要一定级别的认证才能触发，但当与CVE-2025-49706结合使用时，攻击者可以直接在目标系统上注入并执行恶意代码。官方披露显示，这一漏洞允许低权限用户通过网络发起攻击，潜在影响范围广泛。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafXGeOfM5DaiaxmqaQVlialODobzULSEyGOz9HLicPqiaNk2MnicuTcXokYgEjQVtLBWXdLwIeUV1oRTicw/640?wx_fmt=png&from=appmsg "")  
  
攻击背景与影响  
  
@_l0gg在Pwn2Own Berlin 2025中成功利用这一漏洞链，赢得了10万美元奖金和10个“Pwn Master”积分。这次攻击凸显了SharePoint在面对复杂漏洞链时的脆弱性。CODE WHITE GmbH的复现实验表明，攻击只需发送一个精心构造的HTTP请求即可，请求中包含特定的头部和参数（如图中所示），成功绕过身份验证并触发代码执行。  
  
Microsoft已在7月8日的2025年7月补丁星期二中发布了针对CVE-2025-49704的修复补丁，涉及总计137个漏洞修补，其中包括14个“严重”级别的安全问题。然而，CODE WHITE的发现表明，攻击者可能早已掌握了这一漏洞的利用方式，潜在威胁不容小觑。  
  
技术洞察与防护建议  
  
这一案例与F5 Labs 2023年发布的研究不谋而合，指出攻击者常在漏洞利用后植入交互式命令脚本。专家认为，SharePoint的认证依赖性可能被高估，建议管理员立即应用最新补丁，并加强服务器的输入验证和文件上传功能的安全性。此外，定期审查系统日志，排查异常请求，也能有效降低风险。目前尚不清楚该漏洞是否已被广泛利用，但安全社区已对此高度关注。用户应尽快更新系统，以防成为下一个攻击目标。  
  
  
  
感谢您抽出  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWgdSBqOibtgiaYWjL4pkRXwycNnFvFYVgXoExRy0gqCkqvrAghf8KPXnwQaYq77HMsjcVka7kPcBDQw/640?wx_fmt=gif "")  
  
.  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWgdSBqOibtgiaYWjL4pkRXwycd5KMTutPwNWA97H5MPISWXLTXp0ibK5LXCBAXX388gY0ibXhWOxoEKBA/640?wx_fmt=gif "")  
  
.  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWgdSBqOibtgiaYWjL4pkRXwycU99fZEhvngeeAhFOvhTibttSplYbBpeeLZGgZt41El4icmrBibojkvLNw/640?wx_fmt=gif "")  
  
来阅读本文  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWge7Mibiad1tV0iaF8zSD5gzicbxDmfZCEL7vuOevN97CwUoUM5MLeKWibWlibSMwbpJ28lVg1yj1rQflyQ/640?wx_fmt=gif "")  
  
**点它，分享点赞在看都在这里**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
