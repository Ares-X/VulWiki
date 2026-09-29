---
cve: "CVE-2024-26169"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  CISA 称 Windows 漏洞可能被利用于勒索软件攻击   
 网络安全应急技术国家工程中心   2024-06-20 15:20  
  
美国网络安全和基础设施安全局 (CISA) 将勒索软件攻击中滥用的高严重性 Windows 漏洞作为零日漏洞，添加到其主动利用的安全漏洞目录中。  
  
此安全漏洞编号为 CVE-2024-26169，是由 Windows 错误报告服务中不当的权限管理漏洞引起的，利用此漏洞可让本地攻击者在无需用户交互的低复杂度攻击中获得系统权限。  
  
微软在 2024 年 3 月 12 日的每月补丁星期二更新中解决了该漏洞。  
  
本周发布的一份报告显示，安全研究人员发现有证据表明，Black Basta 勒索软件团伙（Cardinal 网络犯罪集团，也被追踪为 UNC4394 和 Storm-1811）的运营者很可能是利用该漏洞作为零日漏洞进行攻击的幕后黑手。  
  
他们发现，在这些攻击中部署的 CVE-2024-26169 漏洞利用工具的一个变体的编译时间为 2 月 27 日，而第二个样本的构建时间甚至更早，为 2023 年 12 月 18 日。  
  
正如安全研究机构在其报告中承认的那样，这些时间很容易被修改，这使得他们的零日漏洞利用结果不确定。然而，攻击者这样做的动机很少甚至没有，因此这种情况不太可能发生。  
  
种种迹象表明，勒索软件组织在微软发布安全更新来修补本地特权提升漏洞之前的 14 到 85 天内就已存在漏洞。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o28JsYW7woCz65RZ6r0IoCSXBNBrtPqrRiaiaz0iaoAib9sJuMAgQJlosEsI5xvWHcdQPn8mNmtBCmorYw/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
BLACK BASTA CVE-2024-26169 漏洞演示  
# 尽快保护易受攻击的系统  
  
根据 2021 年 11 月的具有约束力的运营指令 (BOD 22-01)，联邦民事行政部门机构 (FCEB) 必须保护其系统免受 CISA 已知利用漏洞目录中添加的所有漏洞的攻击。  
  
CISA 要求 FCEB 机构在 7 月 4 日前修补 CVE-2024-26169 安全漏洞，并阻止可能针对其网络的勒索软件攻击。  
  
尽管该指令仅适用于联邦机构，但网络安全机构也强烈敦促要优先修复该漏洞，并警告称“此类漏洞是恶意分子的常见攻击媒介，对企业构成重大风险。”  
  
早在 2022 年 4 月，Conti 网络犯罪团伙在发生一系列令人尴尬的数据泄露事件后分裂为多个派系，随后 Black Basta 作为一家勒索软件即服务 (RaaS) 组织出现。  
  
自那时起，该团伙已入侵了许多受害者，包括德国国防承包商莱茵金属、英国技术外包公司 Capita、多伦多公共图书馆、美国牙科协会、政府承包商 ABB、现代欧洲分部、加拿大黄页和美国医疗保健巨头 Ascension等等。  
  
据CISA 和 FBI 透露，截至 2024 年 5 月，Black Basta 勒索软件的附属机构已入侵了 500 多个组织，加密了系统并窃取了至少 12 个美国关键基础设施部门的数据。  
  
根据网络安全公司研究数据，截至 2023 年 11 月，Black Basta 从 90 多名受害者那里收取了至少 1 亿美元的赎金。  
  
**参考及来源：**  
  
https://www.bleepingcomputer.com/news/security/cisa-warns-of-windows-bug-exploited-in-ransomware-attacks/  
  
  
  
原文来源  
：嘶吼专业版  
  
“投稿联系方式：010-82992251   sunzhonghao@cert.org.cn”  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/GoUrACT176n1NvL0JsVSB8lNDX2FCGZjW0HGfDVnFao65ic4fx6Rv4qylYEAbia4AU3V2Zz801UlicBcLeZ6gS6tg/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
