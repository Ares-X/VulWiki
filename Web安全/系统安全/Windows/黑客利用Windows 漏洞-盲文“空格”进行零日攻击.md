---
cve: "CVE-2024-43461"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  黑客利用Windows 漏洞-盲文“空格”进行零日攻击   
Rhinoer  犀牛安全   2024-09-29 19:07  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qvpgicaewUBkera2MSpeQjpAPpicPpnIfOAH65SVUROnibNpgZNCcMKeepic2Yiaiazv61SiaqjRA8x50fuNTKQ9MeNDw/640?wx_fmt=png&from=appmsg "")  
  
最近修复的“Windows MSHTML 欺骗漏洞”编号为 CVE-2024-43461，现被标记为之前被利用，因为该漏洞曾被 Void Banshee APT 黑客组织用于攻击。  
  
在2024 年 9 月补丁星期二首次披露该漏洞时，微软并未将该漏洞标记为已利用。然而，微软在周五更新了CVE-2024-43461公告，指出该漏洞在修复之前就已被利用。  
  
该漏洞的发现归功于趋势科技零日高级威胁研究员Peter Girnus，他告诉 BleepingComputer，Void Banshee 在零日攻击中利用 CVE-2024-43461 漏洞来安装窃取信息的恶意软件。  
  
Void Banshee 是趋势科技首次追踪的一个 APT 黑客组织，其目标是北美、欧洲和东南亚的组织，以窃取数据和获取经济利益。  
  
CVE-2024-43461 零日漏洞  
  
7 月份，Check Point Research 和 Trend Micro 均报告了同样的攻击，这些攻击利用 Windows 零日漏洞感染设备，并安装 Atlantida 信息窃取程序，用于从受感染设备窃取密码、身份验证 cookie 和加密货币钱包。  
  
此次攻击利用了被追踪为 CVE-2024-38112（7 月修复）和 CVE-2024-43461（本月修复）的零日漏洞作为攻击链的一部分。  
  
CVE-2024-38112 零日漏洞的发现归功于 Check Point 研究员 Haifei Li，他表示该漏洞被用来强制 Windows 在启动特制的快捷方式文件时在 Internet Explorer 中打开恶意网站，而不是在 Microsoft Edge 中打开。  
  
Check Point 研究员在7 月份的 Check Point Research 报告中解释道：“具体来说，攻击者使用特殊的 Windows Internet 快捷方式文件（.url 扩展名），单击该文件时，会调用已退役的 Internet Explorer（IE）来访问攻击者控制的 URL。”  
  
这些 URL 被用来下载恶意 HTA 文件并提示用户打开它。打开后，脚本将运行以安装 Atlantida 信息窃取程序。  
  
HTA 文件利用另一个零日漏洞（CVE-2024-43461）来隐藏 HTA 文件扩展名，并在 Windows 提示用户是否打开时使文件显示为 PDF，如下所示。  
  
ZDI 研究员 Peter Girnus 告诉 BleepingComputer，CVE-2024-43461 漏洞也被用于 Void Banshee 攻击 ，通过包含 26 个编码盲文空格字符（%E2%A0%80）的 HTA 文件名创建 CWE-451 条件以隐藏 .hta 扩展名。  
  
正如您在下面看到的，文件名以 PDF 文件开头，但包含二十六个重复编码的盲文空白字符（%E2%A0%80），后面跟着最后的 '.hta' 扩展名。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qvpgicaewUBkera2MSpeQjpAPpicPpnIfOtQQPJ20nNbYR9OMQ0zic7sR3crhQzYcvQVPnk3NNEenh5ELbHbUMbxg/640?wx_fmt=png&from=appmsg "")  
  
当 Windows 打开此文件时，盲文空白字符会将 HTA 扩展推到用户界面之外，仅在 Windows 提示中用“ ...”字符串划定界限，如下所示。这导致 HTA 文件显示为 PDF 文件，使其更有可能被打开。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qvpgicaewUBkera2MSpeQjpAPpicPpnIfOHaKNb7hL5XviaLVk1Mo1Nuqexmtnnl9KHG8vBm0ETQvsJxf5ic2FLBXA/640?wx_fmt=png&from=appmsg "")  
  
安装 CVE-2024-43461 的安全更新后，Girnus 表示空格未被删除，但 Windows 现在 在提示中显示文件的实际.hta扩展名。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qvpgicaewUBkera2MSpeQjpAPpicPpnIfOGb1SvQ9yqxb9TjfD1TFY5FhZib4UsKPVV2coF6f7kL7KU1EIGC9hBQA/640?wx_fmt=png&from=appmsg "")  
  
不幸的是，这个修复并不完美，因为包含的空格可能仍然会让人们误以为该文件是 PDF 而不是 HTA 文件。  
  
微软在 9 月补丁星期二修复了其他三个被积极利用的零日漏洞，其中包括 CVE-2024-38217，该漏洞被利用于LNK 踩踏攻击中以绕过 Web 安全功能的标记。  
  
  
信息来源：BleepingComputer  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
