---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【PoC】 TeamViewer 用户到内核权限提升   
 独眼情报   2024-10-06 09:35  
  
此仓库包含 TeamViewer 中漏洞的利用概念证明，该漏洞允许非特权用户将任意内核驱动程序加载到系统中。我要感谢 Zero Day Initiative 在报告和负责任地披露该漏洞方面与他们的协调。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/KgxDGkACWnQTqACGARdtXISOmchnQlxvouquYePn5Doc8USxE5NqiaaKgsEvXgLPrVn6VJ4EicLDI3ZnorBTov1A/640?wx_fmt=png&from=appmsg "")  
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

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
