---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "reference"
primary_identifiers: ""
referenced_identifiers: "CVE-2023-35829;CVE-2023-20871"
identifier_status: "unknown"
title: "Linux 内核漏洞虚假 PoC 发 GitHub，专门攻击研究员"
product: "恶意GitHub PoC下载器"
record_type: "incident"
document_type: "恶意伪PoC安全事件"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "受害者下载/构建伪PoC，Makefile执行恶意程序；非真实内核利用条件"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/Linux%20%E5%86%85%E6%A0%B8%E6%BC%8F%E6%B4%9E%E8%99%9A%E5%81%87%20PoC%20%E5%8F%91%20GitHub%EF%BC%8C%E4%B8%93%E9%97%A8%E6%94%BB%E5%87%BB%E7%A0%94%E7%A9%B6%E5%91%98.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://thehackernews.com/2023/07/blog-post.html"
id: "vw-b109d6d211d7aa740c49ad33"
entity_id: "ve-b109d6d211d7aa740c49ad33"
schema_version: "1"
---

# Linux 内核漏洞虚假 PoC 发 GitHub，专门攻击研究员

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：恶意GitHub PoC下载器
- 文献类型：恶意伪PoC安全事件
- 版本、权限及部署边界：受害者下载/构建伪PoC，Makefile执行恶意程序；非真实内核利用条件
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. CVE只是诱饵名称，本篇应归恶意PoC/供应链事件，不应当35829可用漏洞复现
2. 给后门kworker、bashrc、authorized_keys痕迹但无样本hash/研究报告原链，需补Uptycs一手来源
3. 获取月越权SSH密钥显然转码/译文损坏，清理建议不可照抄；不要盲删所有kworker同名进程
4. THN来源存在但需核对完整URL；fork次数和下架状态必须带2023时点，推广尾部剥离

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://thehackernews.com/2023/07/blog-post.html>
- 原文参考链接（未重新核验）：<https://codesafe.qianxin.com>
- 原文参考链接（未重新核验）：<https://oss.qianxin.com>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516678&idx=1&sn=5b9e480c386161b1e105f9818b2a5a3d&chksm=ea94b36cdde33a7a05cafa9918733669252a02611c222b02bc6e66cbb508ee3fbf748453ee7a&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516737&idx=2&sn=368349f3292248a0829924a329eab306&chksm=ea94b32bdde33a3d73ce830890ee3113abe962086d9059767525a81c0884679a6ca038ff9aa7&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514298&idx=1&sn=3d322fa315badc08e34fe3379e76ae57&chksm=ea9489d0dde300c6fded68537221742713d3743c01794692f8d10a0e21ebc41bf42bee26c42d&scene=21#wechat_redirect>

### 归档技术正文

THN  代码卫士   2023-07-14 17:21  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**Uptycs 公司的安全研究员 Nischay Hegde 和 Siddartha Malladi 发现，GitHub 上存在虚假的Linux 内核漏洞 (CVE-2023-35829) PoC，其中含有使用 “crafty” 持久方法的后门。**  
  
研究人员指出，“在这一案例中，该 PoC 是披着羊皮的狼，以无害的学习工具伪装恶意意图。它是一款下载器，静默转储并执行 Linux bash 脚本，将其操作伪装为内核级别的进程。”  
  
该仓库伪装成CVE-2023-35829的PoC。该漏洞是近期在 Linux 内核中出现的高危漏洞。虽然之后被下降，但其被fork 了25次。该账户 ChriSanders22 还发布了影响 VMware Fusion 的提权漏洞CVE-2023-20871的 PoC，被fork了两次。  
  
研究人员还发现另外一个 GitHub 账户中含有 CVE-2023-35829的恶意 PoC，截止到本文发布前，已经被fork了19次。查看提交历史后发现，它是由 ChriSanders22 推送的变更，说明它是从原始仓库中被 fork 的。  
  
后门具有一系列能力，如从受陷主机中窃取敏感数据，使威胁行动者通过将 SSH密钥添加到 .ssh/authorized_keys 文件中的方式获得远程访问权限。研究人员指出，“该 PoC 旨在让我们运行一个 make 命令，该命令供自动工具从源代码文件中编译和构建可执行文件。但在 Makefile 中存在一个代码片段可构建和执行该恶意软件。该恶意软件命名和运行文件 kworker，在 $HOME/.bashrc 中增加 $HOME/.local/kworker 路径，从而建立可持久性。”  
  
大概一个月前，VulnCheck 发现大量虚假 GitHub 账户伪装成安全研究员发布伪装成热门软件 PoC 利用的恶意软件，这些热门软件包括 Discord、谷歌 Chrome、微软 Exchange Server、Signal 和 WhatsApp。  
  
下载并执行了这些 PoC 的用户被建议获取月越权SSH密钥，他们应删除 kworker 文件，从 bashrc 文件中删除 kworker 路径并检查 /tmp/.iCE-unix.pid 中是否存在潜在威胁。  
  
研究人员指出，“虽然难以区分合法与欺诈性 PoC，但应采取一些安全实践如在隔离环境中进行测试可以提供防护。”  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[奇安信入选全球《静态应用安全测试全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516678&idx=1&sn=5b9e480c386161b1e105f9818b2a5a3d&chksm=ea94b36cdde33a7a05cafa9918733669252a02611c222b02bc6e66cbb508ee3fbf748453ee7a&scene=21#wechat_redirect)  
  
  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[GitHub 上的虚假0day PoC 推送 Windows 和 Linux 恶意软件](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516737&idx=2&sn=368349f3292248a0829924a329eab306&chksm=ea94b32bdde33a3d73ce830890ee3113abe962086d9059767525a81c0884679a6ca038ff9aa7&scene=21#wechat_redirect)  
  
  
[数千GitHub 仓库正在传播含有恶意软件的虚假PoC 利用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514298&idx=1&sn=3d322fa315badc08e34fe3379e76ae57&chksm=ea9489d0dde300c6fded68537221742713d3743c01794692f8d10a0e21ebc41bf42bee26c42d&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://thehackernews.com/2023/07/blog-post.html  
  
  
题图：Pixabay License  
  
  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/2c03ce3cc6bb81bca85bd412ed60e93c4bc0a295a1fc9d3739d8aca43497fbb4.jpg "")  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/b33054170f5acbf0023711f517b5bee9799a2f57b155a774d3945e6d78184e63.jpg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/8a5c84b98d9b52b1d4f4306180ec26c9aa65342b326b5b98ad2f097b488152f4.gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
