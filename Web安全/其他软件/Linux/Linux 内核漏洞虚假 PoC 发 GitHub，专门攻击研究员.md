---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Linux 内核漏洞虚假 PoC 发 GitHub，专门攻击研究员   
THN  代码卫士   2023-07-14 17:21  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
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
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSf7nNLWrJL6dkJp7RB8Kl4zxU9ibnQjuvo4VoZ5ic9Q91K3WshWzqEybcroVEOQpgYfx1uYgwJhlFQ/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSN5sfviaCuvYQccJZlrr64sRlvcbdWjDic9mPQ8mBBFDCKP6VibiaNE1kDVuoIOiaIVRoTjSsSftGC8gw/640?wx_fmt=jpeg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ5iciaeKS21icDIWSVd0M9zEhicFK0rbCJOrgpc09iaH6nvqvsIdckDfxH2K4tu9CvPJgSf7XhGHJwVyQ/640?wx_fmt=gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
