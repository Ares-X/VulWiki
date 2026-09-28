---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  微软：利用0Day漏洞，黑客组织攻击北约峰会   
 网络安全应急技术国家工程中心   2023-07-17 14:28  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/GoUrACT176mxX3yWJ3aViahcgcicJHia95z5Ga84mMqo7OSg9kGBh7wicBLIYG8RlqP8NzofQM6u44CIiayElafv7DA/640?wx_fmt=jpeg "")  
  
昨天（7月11日），微软正式披露了一个未修补的零日安全漏洞，该漏洞存在于多个Windows和Office产品中，可以通过恶意Office文档远程执行代码。  
  
未经身份验证的攻击者可在无用户交互的情况下利用该漏洞(跟踪为CVE-2023-36884)进行高复杂性攻击。  
  
一旦攻击成功，即可导致对方系统的机密性、可用性和完整性的完全丧失，从而允许攻击者访问敏感信息、关闭系统保护并拒绝对受损系统的访问。  
  
目前，微软正在调查并制作一系列影响Windows和Office产品的远程代码执行漏洞的报告。微软已经意识到了这是一系列有针对性的攻击，这些攻击试图利用特制的微软Office文档来利用这些漏洞。  
  
攻击者可以创建一个特制的Microsoft Office文档，使他们能够在受害者的系统中执行远程代码执行。但前提是攻击者必须说服受害者打开恶意文件。  
  
虽然该漏洞尚未得到解决，但微软表示后续将通过每月发布的程序或带外安全更新向客户提供补丁。  
  
# 北约峰会与会者遭遇黑客攻击  
  
微软方面表示，有黑客组织近期利用CVE-2023-36884漏洞攻击了北约峰会的与会者。  
  
根据乌克兰计算机应急响应小组和黑莓情报团队的研究人员发布的报告，攻击者通过恶意文件冒充自己是乌克兰世界大会组织，以让他人误安装此恶意软件，其中包括MagicSpell加载程序和RomCom后门。  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3ibqn4NDPBib4sdhgpic0Fia28cGOStqMp8w6R4qHvgGw466MArvISsNkicuqEs4YEdWicPdtuwib7WoZrgw/640?wx_fmt=jpeg&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
黑莓安全研究人员表示：攻击者可利用该漏洞制作恶意的docx或rtf文件，从而实现远程代码执行(RCE)攻击。  
  
这种攻击是通过利用特制的文档来执行易受攻击的MSDT版本来实现的，同时也允许攻击者向实用程序传递命令执行。  
  
微软周二（7月11日）时也表示：该攻击者在2023年6月发现的最新攻击涉及滥用CVE-2023-36884，提供与RomCom相似的后门。  
# 可通过启用“阻止所有Office应用程序创建子进程”免于攻击  
  
微软方面表示，在CVE-2023-36884补丁可用之前，使用Defender for Office的客户和启用了“阻止所有Office应用程序创建子进程”攻击面减少规则的客户可以免受网络钓鱼攻击。  
  
不使用这些保护的用户可以将以下应用程序名称添加到HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Internet Explorer\Main\FeatureControl\FEATURE_BLOCK_CROSS_PROTOCOL_FILE_NAVIGATION注册表项中，作为REG_DWORD类型的值，数据为1:  
  
Excel.exe  
  
Graph.exe  
  
MSAccess.exe  
  
MSPub.exe  
  
PowerPoint.exe  
  
Visio.exe  
  
WinProj.exe  
  
WinWord.exe  
  
Wordpad.exe  
  
但是，需要注意的是，设置此注册表项以阻止利用尝试也可能影响到与上面列出的应用程序链接的某些Microsoft Office功能。  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3ibqn4NDPBib4sdhgpic0Fia28c2UBiat8s89JOjBxIsm7JdyMQOHhNowvGeFribHFiaa9x1M23PaFtlPCnA/640?wx_fmt=jpeg&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
设置FEATURE_BLOCK_CROSS_PROTOCOL_FILE_NAVIGATION注册表项（图源：Microsoft)  
# 该漏洞与RomCom组织有所渊源  
  
RomCom是一个总部位于俄罗斯的网络犯罪组织（也被追踪为Storm-0978），该组织以从事勒索软件和勒索攻击以及专注于窃取凭证的活动而闻名。该组织与此前的工业间谍勒索软件行动有关，现在该行动已转向名为“地下”(VirusTotal)的勒索软件。  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3ibqn4NDPBib4sdhgpic0Fia28cqF7sGt1DOiaqib4VAPEvoZ838F1CG3IQUgv9rVe3vWbKRgHMQdCqFibxw/640?wx_fmt=jpeg "")  
  
地下勒索信（图源：BleepingComputer）  
  
2022年5月，在调查工业间谍勒索通知中的TOX ID和电子邮件地址时，MalwareHunterTeam发现了与古巴勒索软件操作的特殊关联。  
  
他观察到，工业间谍勒索软件样本生成了一封勒索信，其TOX ID和电子邮件地址与古巴使用的相同，以及古巴数据泄露网站的链接。  
  
然而，提供的链接并没有将用户引导到工业间谍数据泄露网站，而是指向古巴勒索软件的Tor网站。此外，勒索信使用了相同的文件名，!!READ ME !!.txt，就像之前发现的古巴勒索邮件一样。  
  
在2023年5月，在Trend Micro发布的一份关于RomCom的最新活动报告显示，威胁参与者现在正在冒充Gimp和ChatGPT等合法软件，或者创建虚假的软件开发人员网站，通过谷歌广告和黑色搜索引擎优化技术向受害者推送后门。  
  
**参考资料：**  
  
https://www.bleepingcomputer.com/news/security/microsoft-unpatched-office-zero-day-exploited-in-nato-summit-attacks/  
  
https://www.bleepingcomputer.com/news/security/romcom-hackers-target-nato-summit-attendees-in-phishing-attacks/  
  
  
  
原文来源：FreeBuf  
  
“投稿联系方式：孙中豪 010-82992251   sunzhonghao@cert.org.cn”  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/GoUrACT176n1NvL0JsVSB8lNDX2FCGZjW0HGfDVnFao65ic4fx6Rv4qylYEAbia4AU3V2Zz801UlicBcLeZ6gS6tg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
