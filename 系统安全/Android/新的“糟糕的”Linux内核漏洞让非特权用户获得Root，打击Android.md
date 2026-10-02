---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2026-46242"
identifier_role: "primary"
primary_identifiers: "CVE-2026-46242"
referenced_identifiers: "CVE-2026-43074;CVE-2026-31431;CVE-2026-31694;CVE-2026-4747"
identifier_status: "unknown"
title: "新的“糟糕的”Linux内核漏洞让非特权用户获得Root，打击Android"
product: "Linux epoll / Android"
record_type: "advisory"
document_type: "研究新闻及相关漏洞综述"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "称Linux>=6.4，6.1不受影响；本地低权限；Linux PoC与Android仍开发明确区分"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Android/%E6%96%B0%E7%9A%84%E2%80%9C%E7%B3%9F%E7%B3%95%E7%9A%84%E2%80%9DLinux%E5%86%85%E6%A0%B8%E6%BC%8F%E6%B4%9E%E8%AE%A9%E9%9D%9E%E7%89%B9%E6%9D%83%E7%94%A8%E6%88%B7%E8%8E%B7%E5%BE%97Root%EF%BC%8C%E6%89%93%E5%87%BBAndroid.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-e5e9b1dfeeeb400c54d5debf"
entity_id: "ve-e5e9b1dfeeeb400c54d5debf"
schema_version: "1"
---

# 新的“糟糕的”Linux内核漏洞让非特权用户获得Root，打击Android

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Linux epoll / Android
- 文献类型：研究新闻及相关漏洞综述
- 版本、权限及部署边界：称Linux>=6.4，6.1不受影响；本地低权限；Linux PoC与Android仍开发明确区分
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 主CVE在正文存在而frontmatter未列，其他编号为背景比较不应误归主漏洞
2. Linux99%成功率来自所述测试而非所有Android；Android利用仍开发，标题需避免暗示已验证Android root
3. 六指令窗口/KASAN/AI发现等研究断言无原始报告或上游补丁URL，缺精确受影响与已修复内核分支
4. 免费后使用等翻译错误及两者指代混乱；Epoll不能关闭所以没有解决办法过于绝对，应限定为原文未提供缓解

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

HackSee安全团队
                    HackSee安全团队  HackSee安全生活   2026-07-06 07:42  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/oPZcPicUADs9ibQfTThibMYCkpqqIicCYt4S4ib8ibHAmDW6CZ4gmDNmQlSnBiaq54feOiaibcZ1gbHXNVXuNic6ZywTEWnQ7jWxc1VKtap5yBDYLcdlk/640?wx_fmt=gif&from=appmsg "")  
  
最近披露的一个名为Bad Epoll的Linux内核漏洞（CVE-2026-46242）允许没有特殊访问权限的普通用户以root身份完全控制一台机器。它影响Linux桌面、服务器和Android，并且已经发布了修复程序。  
  
Bad Epoll位于Anthropic最强大的人工智能模型Mythos最近发现的一个不同的bug所在的内核代码的一小段。  
  
人工智能发现了一个缺陷，却错过了这个。研究人员Jaeyoung Chung发现了它，并构建了一个有效的攻击。  
## Bug是如何工作的  
  
Epoll是一个标准的Linux功能，它允许一个程序同时监视多个文件或网络连接。服务器、网络服务和web浏览器都依赖于它。你不能简单地把它关掉。  
  
坏的Epoll是一个“免费后使用”的bug。内核的两个部分试图同时清理同一个内部对象。一个释放内存，而另一个仍在写入内存。这个短暂的冲突让攻击者破坏内核内存，然后从一个普通帐户爬到根帐户。  
  
问题在于时机。两条路径碰撞的窗口只有大约6条机器指令宽，所以随机尝试几乎不会在其中着陆。Chung的漏洞扩大了这个窗口，并在不崩溃的情况下重新尝试，在测试的系统中大约99%的时间到达root。  
  
有两件事让它变得更危险：据他说，它可以从Chrome的渲染器沙箱中触发，它可以阻止几乎所有其他内核错误，它可以到达Android，这是大多数Linux特权错误无法做到的。  
  
  
Chung将该漏洞作为零日漏洞提交给b谷歌的内核ctf程序，完整的技术细节在他的公开报告中。没有迹象表明它已经被用于真正的攻击：在撰写本文时，它不在CISA的已知被利用漏洞列表中，唯一有效的代码是内核ctf的概念证明。该漏洞的安卓版本仍在开发中。  
  
这两个bug都可以追溯到2023年对epoll代码的一次修改。Chung说，Mythos发现了两个漏洞中的第一个，现在被追踪为CVE-2026-43074，并在2026年早些时候固定着陆。  
  
Anthropic曾单独表示，mythos发现了Linux内核特权升级的漏洞，尽管它没有公开将这项工作与Bad Epoll联系起来。找到第一个bug是一个真正的结果，因为竞态条件bug是出了名的难以发现。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/oPZcPicUADs9hGlEdqpnYI5Tia6hIRdib6ptpibDrOr6Jl5Ijh7LdianWJB5MnqcAEgl5IicTicu9mm4FGpffoibxibmTevBqGHiaibGbLV6BpibxbmxmGk/640?wx_fmt=jpeg&from=appmsg "")  
  
那么，为什么同样的人工智能没有发现同胞缺陷呢？Chung提出了两个可能的原因，并谨慎地说没有人能确定。  
- 首先，时间窗口很小，所以即使盯着代码看，也很难想象事件的确切顺序。  
- 其次，在运行时几乎没有证据。  
一旦第一个错误被修补，Bad Epoll的内存错误通常不会触发KASAN（内核的主要错误检测器），因此没有任何标记显示出错误。  
  
Epoll不能关闭，所以没有解决办法。应用上游提交，或者在发行版落地后安装它。在6.4或更新版本上构建的内核会受到影响，除非它们已经有了修复。  
  
旧的基于6.1的内核，包括一些安卓手机，如Pixel 8，都没有，因为这个错误出现在6.4。  
## Linux内核糟糕的一年  
  
继Bad Binder、Bad IO_uring和Bad Spin之后，Bad Epoll加入了一个众所周知的用于root Android的内核错误家族。  
  
它还陷入了Linux特权漏洞的繁忙阶段，尽管最近的大多数漏洞的工作方式不同。Copy Fail （CVE-2026-31431）于4月份出现，现在已经在CISA的已知被利用漏洞列表中。脏碎片链、Fragnesia、DirtyClone、pedit COW紧随其后。  
  
两者都是确定性的页面缓存写入错误，就像Dirty Pipe（2022）一样，没有竞争，这使得它们运行起来更加可靠。Bad Epoll是一种更古老、更难的类型：你必须赢得比赛，就像2016年的《脏牛》（Dirty Cow）一样。  
  
由人工智能驱动的研究公司Bynario发现的内核FUSE文件系统代码中的另一个漏洞CVE-2026-31694也出现了公开的概念验证。具有FUSE访问权限的本地用户可以向内核提供恶意文件系统并破坏内存。  
  
根据设置的不同，这可能意味着root访问、数据泄漏或崩溃。由于这种访问在容器和用户名称空间中很常见，因此它更像是服务器和容器的风险，而不是手机的风险。  
  
贝纳里奥并不是唯一这样做的人。Mythos还在FreeBSD的NFS服务器（CVE-2026-4747）中发现并利用了一个有17年历史的远程代码执行错误，Anthropic的研究人员利用它的模型发现了其他内核缺陷。  
  
Bad Epoll是一个有用的对位。这表明竞争条件在每个阶段都很困难：很难找到，即使是领先的AI；很难修复，因为第一个补丁不足，一个正确的补丁需要大约两个月的时间；而且很难利用，只有六个指令宽的窗口。目前，人工智能走过的漏洞仍然是人类必须抓住的漏洞。  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
