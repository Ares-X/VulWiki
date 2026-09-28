---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  EncryptHub的双重生活：网络罪犯与Windows漏洞赏金研究人员   
胡金鱼  嘶吼专业版   2025-04-15 14:00  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/wpkib3J60o297rwgIksvLibPOwR24tqI8dGRUah80YoBLjTBJgws2n0ibdvfvv3CCm0MIOHTAgKicmOB4UHUJ1hH5g/640?wx_fmt=gif "")  
  
据悉，臭名昭著的威胁分子EncryptHub向微软报告了两个Windows零日漏洞，揭示了介于网络犯罪和安全研究之间的矛盾人物。  
  
报告的漏洞是CVE-2025-24061 （Web绕过标记）和CVE-2025-24071（文件浏览器欺骗），微软在2025年3月的补丁星期二更新中解决了这些漏洞，并承认报告者为“SkorikARI与SkorikARI”。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o29XurX2ZffiavOmwdswoOkx8oD76hQja27CL6sIONH50DuTrq78IaTCc4qa5L2ArIFRSrW6ubwIN3Q/640?wx_fmt=png&from=appmsg "")  
  
错误报道  
  
Outpost24研究人员的一份新报告现已将EncryptHub威胁者与SkorikARI联系起来，据称该威胁者感染了自己并暴露了他们的凭证。  
  
这种暴露使研究人员能够将威胁者与各种在线账户联系起来，并暴露出在网络安全研究人员和网络罪犯之间摇摆不定的人的个人资料。  
  
其中一个被曝光的账户是SkorikARI，黑客利用这个账户向微软披露了上述两个零日漏洞，从而提高了Windows的安全性。  
  
Outpost24的安全分析师Hector Garcia表示，SkorikARI与EncryptHub的联系是基于多个证据，构成了一个高可信度的评估。最确凿的证据是，EncryptHub从自己的系统中窃取的密码文件中，既有与EncryptHub相关的账户，比如仍在开发中的EncryptRAT的凭据，也有他在xss上的账户。  
  
对SkorikARI来说，这就像访问自由职业网站或他自己的Gmail账户。  
  
此外，另一个证实两者之间联系的重要证据是与ChatGPT的对话，可以观察到与EncryptHub和SkorikARI相关的活动。  
  
EncryptHub对零日攻击并不新鲜，威胁者或其中一名成员试图在黑客论坛上向其他网络罪犯出售零日攻击。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o29XurX2ZffiavOmwdswoOkx8zhPE9DnKW7vW3xpUZQ0OXVaSSkjerpBiaC2RdUopUIiaNyaTe9JTER2Q/640?wx_fmt=png&from=appmsg "")  
  
EncryptHub  
试图在地下论坛上出售零日漏洞  
  
Outpost24深入研究了EncryptHub的经历，指出这名黑客反复在自由开发工作和网络犯罪活动之间转换。  
  
尽管他有明显的IT专业知识，但据报道，这名黑客成为了opsec实践的受害者，导致他的个人信息被曝光。  
  
这包括黑客使用ChatGPT来开发恶意软件和网络钓鱼网站，集成第三方代码，以及研究漏洞。  
  
这位威胁者还与OpenAI的LLM聊天机器人进行了更深入的个人接触，在一个案例中，他描述了自己的成就，并要求人工智能将他归类为酷黑客或恶意研究人员。  
  
根据提供的输入，ChatGPT将他评估为40%黑帽，30%灰帽，20%白帽和10%不确定。  
  
同样的冲突也反映在他未来对ChatGPT的计划中，黑客要求聊天机器人帮助组织一场大规模但“无害”的活动，影响数万台计算机进行宣传。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o29XurX2ZffiavOmwdswoOkx8awZxceBwa7WECNTk8CYfdKPwBUvG0S2BWGZUflicFbk6ibpUnz7Sb4lQ/640?wx_fmt=png&from=appmsg "")  
  
公开ChatGPT讨论  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o29XurX2ZffiavOmwdswoOkx8jiasP1IuwI1fjibkGIjajm2cTKnc2liah4nvQAAKS5BT00ck3KCy2iblAg/640?wx_fmt=png&from=appmsg "")  
  
EncryptHub是什么  
EncryptHub是一个威胁分子，与RansomHub和BlackSuit等勒索软件团伙有一定联系。  
  
然而，最近，威胁者通过各种社会工程活动、网络钓鱼攻击和创建基于powershell的自定义信息窃取器“善变窃取者”而出名。  
  
威胁者还以进行社会工程活动而闻名，他们为虚构的应用程序创建社交媒体配置文件和网站。  
  
在一个例子中，研究人员发现，威胁者为一个名为GartoriSpace的项目管理应用程序创建了一个X帐户和网站。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o29XurX2ZffiavOmwdswoOkx8k2EcY7YaNgIMmp81hwAflOib0qUiaV8ZFVc0oFfD55AdFV9Tn2GCtDwQ/640?wx_fmt=png&from=appmsg "")  
  
假冒GartoriSpace网站  
  
该网站通过社交媒体平台上的私人信息进行推广，这些信息将提供下载该软件所需的代码。当下载软件时，Windows设备会收到一个安装了善变窃取软件的PPKG文件[VirusTotal]，而Mac设备会收到一个AMOS信息窃取软件[VirusTotal]。  
  
EncryptHu  
b  
还与利用微软管理控制台漏洞CVE-2025-26633的Windows零日攻击有关。该漏洞在3月份被修复。总的来说，威胁者的活动似乎是为他们工作的，据报告称，威胁者已经破坏了600多个组织。  
  
参考及来源：  
https://www.bleepingcomputer.com/news/security/encrypthubs-dual-life-cybercriminal-vs-windows-bug-bounty-researcher/  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o29XurX2ZffiavOmwdswoOkx87Q6lSHpslCXq9m6gKa7AURDkicicBmuLc9egQze4ib0OsVicMW0CT7mx6A/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o29XurX2ZffiavOmwdswoOkx8L88QSzibuCAgEDRL7DnMo704FecCggch2t53Wb5bgBooHQLlsDmw2gA/640?wx_fmt=png&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
