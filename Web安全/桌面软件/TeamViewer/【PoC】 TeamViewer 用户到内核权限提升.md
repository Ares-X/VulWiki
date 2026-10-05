---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-7479;CVE-2024-7481"
identifier_role: "primary"
primary_identifiers: "CVE-2024-7479;CVE-2024-7481"
referenced_identifiers: ""
identifier_status: "unknown"
title: "【PoC】 TeamViewer 用户到内核权限提升"
product: "TeamViewer SYSTEM服务VPN/打印机驱动安装"
record_type: "roundup"
document_type: "TeamViewer IPC双漏洞PoC介绍"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "本地普通用户可连5939回环IPC、伪造客户端；IPC版本字段须匹配服务；BYOVD需驱动能通过OS策略"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/TeamViewer/%E3%80%90PoC%E3%80%91%20TeamViewer%20%E7%94%A8%E6%88%B7%E5%88%B0%E5%86%85%E6%A0%B8%E6%9D%83%E9%99%90%E6%8F%90%E5%8D%87.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-705b8ff17ef9d758e0422c09"
entity_id: "ve-705b8ff17ef9d758e0422c09"
schema_version: "1"
---

# 【PoC】 TeamViewer 用户到内核权限提升

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：TeamViewer SYSTEM服务VPN/打印机驱动安装
- 文献类型：TeamViewer IPC双漏洞PoC介绍
- 版本、权限及部署边界：本地普通用户可连5939回环IPC、伪造客户端；IPC版本字段须匹配服务；BYOVD需驱动能通过OS策略
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 元数据漏两个CVE；同根因但VPN/打印机不同IPC方法应双实体关联，不强并编号
2. TeamViewer不验签不等绕过Windows驱动签名/阻止列表，任意驱动可加载表述过宽，应保留签名易受攻击驱动条件
3. 由安装驱动到用户→内核仍需利用该驱动漏洞，不是服务漏洞直接给任意内核执行
4. 版本仅要求改Main.cpp行号而缺受影响/修复版及仓库提交，易随源码漂移
5. 官方公告、ZDI、CVE、三篇原研究和仓库充分可追溯，GUI管理员选项不保护IPC的重要观察应保留；本篇非实测全文

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://www.cve.org/CVERecord?id=CVE-2024-7479>
- 原文参考链接（未重新核验）：<https://www.cve.org/CVERecord?id=CVE-2024-7481>
- 原文参考链接（未重新核验）：<https://www.zerodayinitiative.com/advisories/ZDI-24-1289/>
- 原文参考链接（未重新核验）：<https://www.zerodayinitiative.com/advisories/ZDI-24-1290/>
- 原文参考链接（未重新核验）：<https://www.teamviewer.com/en/resources/trust-center/security-bulletins/tv-2024-1006/>
- 原文参考链接（未重新核验）：<https://pgj11.com/posts/Finding-TeamViewer-0days-Part-1/>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 独眼情报   2024-10-06 09:35  
  
此仓库包含 TeamViewer 中漏洞的利用概念证明，该漏洞允许非特权用户将任意内核驱动程序加载到系统中。我要感谢 Zero Day Initiative 在报告和负责任地披露该漏洞方面与他们的协调。  
  
![](../../.resource/remote/e65de997bb1a9f5b5d2cb87e90ddad11ab959b9a5a19918f8908302bdf71d689.png "")  
- https://www.cve.org/CVERecord?id=CVE-2024-7479  
  
- https://www.cve.org/CVERecord?id=CVE-2024-7481  
  
- https://www.zerodayinitiative.com/advisories/ZDI-24-1289/  
  
- https://www.zerodayinitiative.com/advisories/ZDI-24-1290/  
  
- https://www.teamviewer.com/en/resources/trust-center/security-bulletins/tv-2024-1006/  
  
# 详情  
  
关于导致这些漏洞的研究细节可以在我的博客上的以下三部分系列文章中找到。它们更详细地介绍了这些漏洞，并展示了我在过程中失败的地方。第三部分是最有趣的部分 :P。  
- https://pgj11.com/posts/Finding-TeamViewer-0days-Part-1/  
  
- https://pgj11.com/posts/Finding-TeamViewer-0days-Part-2/  
  
- https://pgj11.com/posts/Finding-TeamViewer-0days-Part-3/  
  
# 概要视频 📺  
  
可以在这里找到利用的视频：  
- https://youtu.be/lUkAMAK-TPI  
  
- https://youtu.be/3R0aBYd0Qn4  
  
- https://youtu.be/kOjjFgkJQoc  
  
# 概要  
  
在能够 **伪造**（如博客中所述的一些简单身份验证）一个有效的 TeamViewer 客户端连接到 SYSTEM 服务 IPC 后，可以触发任意驱动程序安装。TeamViewer 未验证正在安装的驱动程序的签名。  
  
因此，由于 TeamViewer 的存在，可以从用户权限提升到内核权限。  
  
最好的方法之一是使用众所周知的技术 BYOD, Bring Your Own Vulnerable Driver 将有效签名的驱动程序加载到 Windows 内核中，然后利用它从用户级别执行特权操作，例如用特权令牌替换任意进程的令牌。  
  
当 TeamViewer 安装在系统上时，它会创建一个以 SYSTEM 身份运行的服务 TeamViewer_service.exe。  
  
该服务是客户端执行某些任务的助手。因此，客户端不会以提升的权限运行，而是一些任务委托给服务。  
  
与服务的通信（IPC）通过套接字实现（使用 Overlapped I/O 和 IoCompletionPort）。默认情况下，TeamViewer SYSTEM 服务监听本地主机的 **5939/tcp** 端口。  
  
TeamViewer 不过滤客户端发送的请求驱动程序安装的参数，也不检查签名等。  
  
所以想法是：我们将伪造一个 TV 客户端并请求安装 VPN 驱动程序，但指定另一个 INF。我重用了 TeamViewer 原始的 INF，但在另一个（非特权）路径中重命名了“坏”驱动程序为 _teamviewervpn.sys_，因为这是原始 INF 目标驱动程序的名称。  
### 重要说明  
  
这还绕过了 TeamViewer 选项 更改需要此计算机上的管理员权限。  
  
此检查仅在 GUI 中有效，因为当未特权用户点击按钮时 TeamViewer 选项 是禁用的。但是可以通过连接到套接字并执行任意驱动程序加载。  
### 重要说明 II  
  
利用是版本依赖的，因为客户端在其 PID 和其他数据中指定了版本的 IPC 消息。客户端版本必须与 SYSTEM 服务版本匹配。必须在 Main.cpp 中修改第 140 到 143 行以针对目标 TeamViewer_service.exe 版本。  
  
因此，基本上，我们伪造一个 TeamViewer 客户端连接到 SYSTEM 服务并请求安装任意驱动程序。TeamViewer 服务友好地将其加载到内核中。  
# CVE-2024-7481 分支  
  
TeamViewer 另有一个与我首先发现的非常相似的 IPC 消息（点击 安装 VPN 驱动程序 时触发）。另一个消息用于安装 打印机驱动程序。  
  
因此，本质上，CVE-2024-7479 和 CVE-2024-7481 是相同的，但 TeamViewer 两次犯了同样的错误。虽然消息不同，但非常相似。它们有不同的 IPC 方法 ID。  
  
结果是相同的，可以加载任意驱动程序。  
>   
> https://github.com/PeterGabaldon/CVE-2024-7479_CVE-2024-7481  
  
## 免责声明 ⚠️  
  
此漏洞利用和指南仅用于教育目的。请负责任地使用此信息，仅在您有明确权限测试的系统上使用。未经授权的系统利用是非法且不道德的。作者，贡献者和本公众号不对因使用此信息而造成的任何误用或损害负责。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
