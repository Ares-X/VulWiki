---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】高危0day突袭！俄APT28借MSHTML漏洞突破防线，政企紧急戒备  
安全圈
                    安全圈  安全圈   2026-03-08 11:00  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/sbq02iadgfyErZkhV77ETlPPxicAYX0TRKicv6VNp8Dlq49c48wE4KDkedD6tluQc51sEgWpibwkO3xJE8PwPZtV06ia3sUsFqdQVbXNHM7frP8U/640?from=appmsg "")  
  
**关键词**  
  
APT28、MSHTML零日漏洞、CVE-2026-21513，Fancy Bear，地缘政治网络战  
  
2026年3月，全球网络安全界拉响红色警报。俄罗斯顶级APT组织**APT28**  
（又名Fancy Bear，隶属于俄联邦军事情报总局GRU）近期再度活跃，利用一个高危MSHTML零日漏洞，对乌克兰及东欧地区的政府、军事，外交核心机构发起大规模定向攻击。  
  
**这个漏洞有多恐怖？**  
- CVSS评分高达**8.8**  
（高危）  
  
- 影响**所有Windows版本**  
  
- 攻击者只需诱导用户**点击一次**  
，就能完全控制目标系统  
  
- 甚至能绑过Windows两大核心防护机制：**MotW + IE ESC**  
  
**CVE-2026-21513 核心参数**  
<table><tbody><tr><td><section><span leaf="">漏洞编号</span></section></td><td><section><span leaf="">CVE-2026-21513</span></section></td></tr><tr><td><section><span leaf="">漏洞类型</span></section></td><td><section><span leaf="">安全功能绕过（CWE-693）</span></section></td></tr><tr><td><section><span leaf="">CVSS评分</span></section></td><td><section><span leaf="">8.8（高危）</span></section></td></tr><tr><td><section><span leaf="">影响范围</span></section></td><td><section><span leaf="">Windows 10/11/Server 2016-2022</span></section></td></tr><tr><td><section><span leaf="">攻击前提</span></section></td><td><section><span leaf="">仅需用户点击一次</span></section></td></tr></tbody></table>  
**攻击原理**  
  
MSHTML是微软的HTML渲染引擎，虽然IE已经退役，但**Office文档、WebBrowser控件、第三方应用**  
仍在广泛使用。  
  
漏洞的本质是：攻击者通过构造特殊的HTML代码，可以**篡改DOM上下文来源标识**  
，让系统把「来自互联网的恶意内容」误认为「本地可信内容」。  
  
**APT28攻击流水线**  
1. **钓鱼投递**  
：发送伪装的钓鱼邮件，附件是.lnk快捷方式文件，图标做成Word/Excel样子  
  
1. **触发漏洞**  
：用户点击lnk文件 → 调用浏览器 → 打开内嵌HTML → 触发漏洞  
  
1. **绑过防御**  
：利用**多层iframe嵌套**  
，同时绑过MotW和IE ESC  
  
1. **代码执行**  
：调用ShellExecuteExW函数，跳出浏览器沙箱执行任意代码  
  
1. **投放后门**  
：MiniDoor 邮件窃取器、Covenant 后门程序  
  
1. **持久化**  
：修改注册表、创建计划任务——就算电脑重启，攻击者依然能远程控制  
  
**影响评估**  
<table><tbody><tr><td><section><span leaf="">漏洞首次发现</span></section></td><td><section><span leaf="">2026年1月30日</span></section></td></tr><tr><td><section><span leaf="">微软发布补丁</span></section></td><td><section><span leaf="">2026年2月10日</span></section></td></tr><tr><td><section><span leaf="">零日窗口期</span></section></td><td><strong><span leaf="">约11天</span></strong></td></tr><tr><td><section><span leaf="">主要目标</span></section></td><td><section><span leaf="">乌克兰及东欧政府/军事机构</span></section></td></tr><tr><td><section><span leaf="">关联C2域名</span></section></td><td><section><span leaf="">wellnesscaremed[.]com等</span></section></td></tr></tbody></table>  
**防御建议**  
- **立即打补丁**  
：微软官方链接 https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-21513  
  
- **临时缓解**  
：禁止lnk文件自动执行 + 禁用Office中WebBrowser控件 + 强化邮件网关过滤  
  
- **终端监控**  
：重点监控mshtml.dll异常 + 监控ShellExecuteExW调用 + 关注不明计划任务  
  
**IoC 指标**  
  
**样本特征：**  
- 文件名：document.doc.LnK.download、会议纪要.lnk  
  
- 哈希：SHA256: 7a9f3d8e7c2b1a0d...  
  
**网络特征：**  
- C2域名：wellnesscaremed[.]com、healthcarewell[.]com  
  
- 流量特征：?id=apt28&type=exec  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
