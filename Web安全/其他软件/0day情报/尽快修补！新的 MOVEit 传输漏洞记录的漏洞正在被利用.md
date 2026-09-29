---
cve: "CVE-2024-5806"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  尽快修补！新的 MOVEit 传输漏洞记录的漏洞正在被利用   
 信息安全大事件   2024-06-27 20:04  
  
一个新披露的严重安全漏洞影响了   
Progress Software MOVEit Transfer，在该漏洞的细节被公开披露后不久，就已经看到了漏洞利用的尝试。  
  
该漏洞被跟踪为   
CVE-2024-5806（CVSS 评分：9.1），涉及影响以下版本的身份验证绕过 -  
- 从   
2023.0.0 到 2023.0.11  
  
- 从   
2023.1.0 到 2023.1.6，以及  
  
- 从   
2024.0.0 到 2024.0.2  
  
该公司在周二发布的一份公告中表示：“Progress MOVEit Transfer（SFTP模块）中的不当身份验证漏洞可能导致身份验证绕过。  
  
Progress 还解决了另一个影响 MOVEit Gateway 版本 2024.0.0 的与 SFTP 相关的关键身份验证绕过漏洞（CVE-2024-5805，CVSS 分数：9.1）。  
  
成功利用这些缺陷可让攻击者绕过   
SFTP 身份验证并访问 MOVEit Transfer and Gateway 系统。  
  
此后，watchTowr Labs 发布了有关 CVE-2024-5806 的其他技术细节，安全研究人员 Aliz Hammond 和 Sina Kheirkhah 指出，它可能被武器化以冒充服务器上的任何用户。  
  
这家网络安全公司进一步将该漏洞描述为包含两个独立的漏洞，一个在   
Progress MOVEit 中，另一个在 IPWorks SSH 库中。  
  
研究人员说：“虽然更具破坏性的漏洞，即冒充任意用户的能力，是MOVEit独有的，但影响较小（但仍然非常真实）的强制身份验证漏洞可能会影响所有使用IPWorks SSH服务器的应用程序。  
  
Progress Software表示，如果不打补丁，第三方组件的缺点“会增加原始问题的风险”，并敦促客户遵循以下两个步骤：  
- 阻止对   
MOVEit Transfer 服务器的公共入站 RDP 访问  
  
- 将出站访问限制为仅来自   
MOVEit Transfer 服务器的已知受信任端点  
  
根据   
Rapid7 的说法，利用 CVE-2024-5806 有三个先决条件：攻击者需要了解现有用户名，目标帐户可以远程身份验证，并且 SFTP 服务可通过 Internet 公开访问。  
  
截至   
6 月 25 日，Censys 收集的数据显示，大约有 2,700 个 MOVEit Transfer 实例在线，其中大部分位于美国、英国、德国、荷兰、加拿大、瑞士、澳大利亚、法国、爱尔兰和丹麦。  
  
由于   
MOVEit Transfer 中的另一个关键问题在去年的一连串 Cl0p 勒索软件攻击中被广泛滥用（CVE-2023-34362，CVSS 评分：9.8），用户必须快速更新到最新版本。  
  
美国网络安全和基础设施安全局   
（CISA） 透露，今年 1 月初，其化学品安全评估工具 （CSAT） 成为未知威胁行为者利用 Ivanti Connect Secure （ICS） 设备中的安全漏洞（CVE-2023-46805、CVE-2024-21887 和 CVE-2024-21893）的目标。  
  
该机构表示：“这种入侵可能导致未经授权访问Top-Screen调查，安全漏洞评估，站点安全计划，人员保障计划（PSP）提交和CSAT用户帐户，”该机构表示，并补充说没有发现数据泄露的证据。  
  
**更新**  
  
Progress Software在与The Hacker News分享的一份声明中表示，“我们没有收到任何关于这些漏洞被利用的报告，我们也不知道对客户有任何直接的运营影响。  
  
<table><tbody style="outline: 0px;visibility: visible;"><tr class="ue-table-interlace-color-single js_darkmode__0" data-style="outline: 0px; background-color: rgb(28, 28, 28); visibility: visible; color: rgb(205, 205, 205) !important;" style="outline: 0px;background-color: rgb(28, 28, 28);visibility: visible;color: rgb(205, 205, 205) !important;"><td width="557" valign="top" data-style="outline: 0px; word-break: break-all; hyphens: auto; border-color: rgb(76, 76, 76); background-color: rgb(255, 218, 169); visibility: visible; color: rgb(25, 25, 25) !important;" class="js_darkmode__1" style="outline: 0px;word-break: break-all;hyphens: auto;border-color: rgb(76, 76, 76);background-color: rgb(255, 218, 169);visibility: visible;color: rgb(25, 25, 25) !important;"><section style="outline: 0px;line-height: normal;visibility: visible;"><span style="outline: 0px;font-size: 12px;visibility: visible;color: rgb(0, 0, 0);">尊敬的读者：<br style="outline: 0px;visibility: visible;"/>感谢您花时间阅读我们提供的这篇文章。我们非常重视您的时间和精力，并深知信息对您的重要性。<br style="outline: 0px;visibility: visible;"/>我们希望了解您对这篇文章的看法和感受。我们真诚地想知道您是否认为这篇文章为您带来了有价值的资讯和启示，是否有助于您的个人或职业发展。<br style="outline: 0px;visibility: visible;"/>如果您认为这篇文章对您非常有价值，并且希望获得更多的相关资讯和服务，我们愿意为您提供进一步的定制化服务。请通过填写我们提供的在线表单，与我们联系并提供您的邮箱地址或其他联系方式。我们将定期向您发送相关资讯和更新，以帮助您更好地了解我们的服务和文章内容。</span></section><section style="outline: 0px;line-height: normal;visibility: visible;"><br style="outline: 0px;visibility: visible;"/></section><section style="outline: 0px;line-height: normal;text-indent: 0em;visibility: visible;"><span style="outline: 0px;color: rgb(0, 0, 0);">                       </span><img class="rich_pages wxw-img" data-backh="106" data-backw="106" data-cropselx1="0" data-cropselx2="119" data-cropsely1="0" data-cropsely2="119" data-galleryid="" data-imgfileid="100005780" data-ratio="1" data-s="300,640" data-src="https://mmbiz.qpic.cn/sz_mmbiz_png/JqliagemfTA5N8G6ZVujodYTTD7NSaxFG5suXlkibicfoGRzCk6vHhCUBx7ST8b4AxdsFVNNAH4ltePBWX4AxKY0A/640?wx_fmt=other&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1&amp;tp=webp" data-type="png" data-w="1000" style="outline: 0px;font-family: 宋体;font-size: 14px;letter-spacing: 0.578px;text-align: center;visibility: visible !important;width: 119px !important;"/></section><section style="outline: 0px;line-height: normal;text-indent: 0em;"><span style="outline: 0px;font-family: 宋体;font-size: 12px;letter-spacing: 0.578px;text-align: center;color: rgb(0, 0, 0);">                               扫描二维码，参与调查</span></section><section style="outline: 0px;line-height: normal;"><br style="outline: 0px;letter-spacing: 0.544px;"/></section></td></tr></tbody></table>  
  
**END**  
  
  
  
点击下方，关注公众号  
  
获取免费咨询和安全服务  
  
![](https://mmbiz.qpic.cn/mmbiz_png/JqliagemfTA5OxIlGh6IbpxrTJHkcY5DZ4O80nevX4Ev7IHvjZfPZDDMxibSVWk4IdYfaYpuhBgz2iaWS5tzXZLJw/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  
  
  
安全咨询/安全集成/安全运营  
  
专业可信的信息安全应用服务商！  
  
http://www.jsgjxx.com  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
