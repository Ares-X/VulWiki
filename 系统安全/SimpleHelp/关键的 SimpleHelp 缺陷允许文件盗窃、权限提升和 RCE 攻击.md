---
cve: "CVE-2024-57727"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  关键的 SimpleHelp 缺陷允许文件盗窃、权限提升和 RCE 攻击   
 信息安全大事件   2025-01-15 19:50  
  
网络安全研究人员披露了   
SimpleHelp 远程访问软件中的多个安全漏洞，这些漏洞可能导致信息泄露、权限提升和远程代码执行。  
  
Horizon3.ai 研究员 Naveen Sunkavally 在一份详细介绍调查结果  
的技术报告中  
表示，“这些漏洞很容易逆转和利用。  
  
已识别缺陷的列表如下：  
- CVE-2024-57727- 一个未经身份验证的路径遍历漏洞，允许攻击者从 SimpleHelp 服务器下载任意文件，包括包含 SimpleHelpAdmin 帐户和其他本地技术人员帐户的哈希密码的 serverconfig.xml 文件  
  
- CVE-2024-57728- 一个任意文件上传漏洞，允许具有 SimpleHelpAdmin 权限的攻击者（或具有管理员权限的技术人员）将任意文件上传到 SimpleServer 主机上的任何位置，从而可能导致远程代码执行  
  
- CVE-2024-57726- 一个权限提升漏洞，允许以低权限技术人员身份获得访问权限的攻击者利用缺少的后端授权检查将其权限提升为管理员  
  
在假设的攻击场景中，CVE-2024-57726 和 CVE-2024-57728 可能被不良行为者链接起来，成为管理员用户并上传任意有效负载以夺取 SimpleHelp 服务器的控制权。  
  
Horizon3.ai 表示，鉴于这三个漏洞的严重性和易于武器化，它隐瞒了有关这三个漏洞的更多技术细节。在 2025 年 1 月 6 日负责任地披露之后，这些缺陷已在 1 月 8 日和 13 日发布的  
SimpleHelp 版本 5.3.9、5.4.10 和 5.5.8  
 中得到解决。  
  
由于已知威胁行为者  
会利用远程访问工具  
建立对目标环境的持续远程访问，因此用户必须迅速行动以应用补丁。  
  
此外，SimpleHelp 建议用户更改 SimpleHelp 服务器的管理员密码，轮换 Technician 帐户的密码，并限制 SimpleHelp 服务器可以预期 Technician 和管理员登录的 IP 地址。  
  
<table><tbody style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"><tr class="ue-table-interlace-color-single js_darkmode__0" data-style="-webkit-tap-highlight-color: transparent; outline: 0px; background-color: rgb(28, 28, 28); visibility: visible; color: rgb(205, 205, 205) !important;" style="-webkit-tap-highlight-color: transparent;outline: 0px;background-color: rgb(28, 28, 28);visibility: visible;color: rgb(205, 205, 205) !important;"><td width="557" valign="top" data-style="-webkit-tap-highlight-color: transparent; outline: 0px; word-break: break-all; hyphens: auto; border-color: rgb(76, 76, 76); background-color: rgb(255, 218, 169); visibility: visible; color: rgb(25, 25, 25) !important;" class="js_darkmode__1" style="-webkit-tap-highlight-color: transparent;outline: 0px;word-break: break-all;hyphens: auto;border-color: rgb(76, 76, 76);background-color: rgb(255, 218, 169);visibility: visible;color: rgb(25, 25, 25) !important;"><section style="-webkit-tap-highlight-color: transparent;outline: 0px;line-height: normal;visibility: visible;"><span style="-webkit-tap-highlight-color: transparent;outline: 0px;font-size: 12px;visibility: visible;color: rgb(0, 0, 0);">尊敬的读者：<br style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"/>感谢您花时间阅读我们提供的这篇文章。我们非常重视您的时间和精力，并深知信息对您的重要性。<br style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"/>我们希望了解您对这篇文章的看法和感受。我们真诚地想知道您是否认为这篇文章为您带来了有价值的资讯和启示，是否有助于您的个人或职业发展。<br style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"/>如果您认为这篇文章对您非常有价值，并且希望获得更多的相关资讯和服务，我们愿意为您提供进一步的定制化服务。请通过填写我们提供的在线表单，与我们联系并提供您的邮箱地址或其他联系方式。我们将定期向您发送相关资讯和更新，以帮助您更好地了解我们的服务和文章内容。</span></section><section style="-webkit-tap-highlight-color: transparent;outline: 0px;line-height: normal;visibility: visible;"><br style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"/></section><section style="-webkit-tap-highlight-color: transparent;outline: 0px;line-height: normal;text-indent: 0em;visibility: visible;"><span style="-webkit-tap-highlight-color: transparent;outline: 0px;color: rgb(0, 0, 0);">                   </span><img class="rich_pages wxw-img" data-backh="106" data-backw="106" data-cropselx1="0" data-cropselx2="119" data-cropsely1="0" data-cropsely2="119" data-galleryid="" data-imgfileid="100006551" data-ratio="1" data-s="300,640" data-src="https://mmbiz.qpic.cn/sz_mmbiz_png/JqliagemfTA5N8G6ZVujodYTTD7NSaxFG5suXlkibicfoGRzCk6vHhCUBx7ST8b4AxdsFVNNAH4ltePBWX4AxKY0A/640?wx_fmt=other&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1&amp;tp=webp" data-type="png" data-w="1000" style="-webkit-tap-highlight-color: transparent;outline: 0px;font-family: 宋体;font-size: 14px;letter-spacing: 0.578px;text-align: center;visibility: visible !important;width: 119px !important;"/></section><section style="-webkit-tap-highlight-color: transparent;outline: 0px;line-height: normal;text-indent: 0em;"><span style="-webkit-tap-highlight-color: transparent;outline: 0px;font-family: 宋体;font-size: 12px;letter-spacing: 0.578px;text-align: center;color: rgb(0, 0, 0);">                               扫描二维码，参与调查</span></section><section style="-webkit-tap-highlight-color: transparent;outline: 0px;line-height: normal;"><br style="-webkit-tap-highlight-color: transparent;outline: 0px;letter-spacing: 0.544px;"/></section></td></tr></tbody></table>  
  
  
**END**  
  
  
  
点击下方，关注公众号  
  
获取免费咨询和安全服务  
  
![](https://mmbiz.qpic.cn/mmbiz_png/JqliagemfTA5OxIlGh6IbpxrTJHkcY5DZ4O80nevX4Ev7IHvjZfPZDDMxibSVWk4IdYfaYpuhBgz2iaWS5tzXZLJw/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  
  
  
安全咨询/安全集成/安全运营  
  
专业可信的信息安全应用服务商！  
  
http://www.jsgjxx.com  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
