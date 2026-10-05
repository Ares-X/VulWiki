---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-57727;CVE-2024-57728;CVE-2024-57726"
identifier_role: "primary"
primary_identifiers: "CVE-2024-57727;CVE-2024-57728;CVE-2024-57726"
referenced_identifiers: ""
identifier_status: "unknown"
title: "关键的 SimpleHelp 缺陷允许文件盗窃、权限提升和 RCE 攻击"
product: "SimpleHelp远程支持服务器"
record_type: "advisory"
document_type: "三漏洞修复新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "57727未认证文件读；57726低权限技术员升admin；57728管理员上传；修复5.3.9/5.4.10/5.5.8"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/SimpleHelp/%E5%85%B3%E9%94%AE%E7%9A%84%20SimpleHelp%20%E7%BC%BA%E9%99%B7%E5%85%81%E8%AE%B8%E6%96%87%E4%BB%B6%E7%9B%97%E7%AA%83%E3%80%81%E6%9D%83%E9%99%90%E6%8F%90%E5%8D%87%E5%92%8C%20RCE%20%E6%94%BB%E5%87%BB.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "source_url与verification_source记录本次公开补证来源；原归档转载的原始出处仍待补，补证来源不替代归档全篇的原始披露出处。该补证只支持CVE-2024-57727的文件读取材料，不替代CVE-2024-57726和CVE-2024-57728原新闻的出处。"
previous_source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-b6b70f56db5a6eff5fd52998"
entity_id: "ve-b6b70f56db5a6eff5fd52998"
schema_version: "1"
verification_source: "https://rustlang.rs/posts/simple-help/"
source_url: "https://rustlang.rs/posts/simple-help/"
---

# 关键的 SimpleHelp 缺陷允许文件盗窃、权限提升和 RCE 攻击

## SimpleHelp三漏洞的材料与修复分支补充

核对日期2026-10-03。原新闻保留；本次未运行PoC、请求目标或下载补丁二进制。

### 57727的实际技术证据

本次新增的具体公开验证资料仅覆盖 CVE-2024-57727：工具箱资源路径穿越及配置文件读取。CVE-2024-57726、CVE-2024-57728 在本节仅作三漏洞区别与修复分支背景，不计为本次通过 PoC/实际验证资料门槛的编号；其既有正文和标识保留。


[imjdl原始分析](https://rustlang.rs/posts/simple-help/)（2025-01-17，页面声明CC BY4.0）追到WebDownloadServer.processOneHttpQuery/respondToolboxResource及ToolBoxConstants.getResourceFile。工具箱资源路径由itemID、resourceID及附加路径拼接，作者保留了初次请求不工作的原因：目录拼接需要相应的上级段，不能只看到../就断言成立。补丁加secure/isInsecure边界检查。

固定Metasploit模块全文审阅显示：先GET allversions做版本检查，再从toolbox-resource构造遍历请求。默认读configuration/serverconfig.xml，并将响应写本地loot；仅200且非空即记漏洞，未验证配置结构，可能产生误报。它包含框架Scanner能力，但维护期间从未运行。未见外部下载器/第三方回连；框架本身不在审计范围。

### 三个独立实体

57727为未认证文件读取；57726为低权限技术员创建过高权限API key；57728为管理权限下ZIP上传目录穿越。后两者能串联，但不能把三个条目都称未认证RCE。已完整读57726/57728固定Nuclei模板，它们都仅探测allversions，没有API key创建或ZIP利用代码；因此这两份模板不能满足独立PoC材料收录。57726的version提取器未设捕获组，匹配含Visual Version前缀，比较语义也须另核。

### 版本号与补丁标记

[SimpleHelp官方指南](https://guides.simple-help.com/kb---security-vulnerabilities-01-2025)明确5.5.8及之后已修复；5.4.10与5.3.9仍需分别应用补丁，日志应出现Patch070125。仅靠数字版本排除这两分支并不可靠。5.4.10补丁在2025-01-31重发，修复Let's Encrypt挑战被阻断的问题。补丁需停服务、替换JAR并重启，不能称零中断。

原作者及厂商材料支持配置文件内含口令哈希风险；读取不等于所有账户均已攻破。厂商建议更改本地管理/技术员密码与限制来源IP，本轮未执行这些操作。


<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：SimpleHelp远程支持服务器
- 文献类型：三漏洞修复新闻
- 版本、权限及部署边界：57727未认证文件读；57726低权限技术员升admin；57728管理员上传；修复5.3.9/5.4.10/5.5.8
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. frontmatter只有57727，三不同权限/效果的实体应拆开，57726+57728链保留
2. 正文很好区分未认证读取和已认证链，不应标题统一成未认证RCE
3. Horizon3及厂商报告文字没有URL，缺受影响分支边界/原始公告；PoC细节当时保留未公开要有2025-01-15时点
4. 哈希泄露与改密码建议有因果，但不能自动假定全部账户已失陷；新闻无PoC正常
5. 巨量HTML调研/二维码和服务广告可剥离；实际远程管理应用非操作系统本身

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<http://www.jsgjxx.com>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

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
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/396c6c1e582fe7106413e1361e0478cb82d63662d432871e1fa160f844c53a79.webp "")  
  
  
  
  
安全咨询/安全集成/安全运营  
  
专业可信的信息安全应用服务商！  
  
http://www.jsgjxx.com  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
