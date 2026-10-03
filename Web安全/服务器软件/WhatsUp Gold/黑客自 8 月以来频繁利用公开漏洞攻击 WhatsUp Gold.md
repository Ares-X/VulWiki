---
verification_source: "https://github.com/rapid7/metasploit-framework/blob/5e598d5233bebecef2a44904a286769d83d31d12/modules/auxiliary/admin/http/whatsup_gold_sqli.rb"
version: "CVE-2024-6670：CNA描述<2024.0.0，结构化快照下界2023.1.0；模块23.1.3版本check不是完整范围"
source_url: "https://github.com/rapid7/metasploit-framework/blob/5e598d5233bebecef2a44904a286769d83d31d12/modules/auxiliary/admin/http/whatsup_gold_sqli.rb"
source: "gelusus/wxvl 公众号漏洞文库"
title: "黑客自 8 月以来频繁利用公开漏洞攻击 WhatsUp Gold"
product: "Progress WhatsUp Gold"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2024-6670; CVE-2024-6671"
referenced_identifiers: "CVE-2024-4885"
identifier_role: "primary"
cve: "CVE-2024-6670; CVE-2024-6671"
prerequisites: "本次补证限6670：NmConsole API可达且有现存用户名；未认证SQL注入后重置该用户密码并检查登录；6671/4885未由此补证"
source_status: "recorded"
side_effects: "6670模块修改全局JMXSecurity设置，无WHERE的UPDATE覆盖ProActiveAlert全部告警名称，重置现有WebUser密码并保存本地凭据；中途失败也不回滚"
id: "vw-ab4c37b08e990fbc06aea8f3"
entity_id: "ve-ab4c37b08e990fbc06aea8f3"
schema_version: "1"
---

# 黑客自 8 月以来频繁利用公开漏洞攻击 WhatsUp Gold

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：未认证SQL注入，后续账号接管并借合法PowerShell功能执行
- 证据范围：描述补丁/PoC/攻击时序及RAT部署，研究人员归因未确定；不是漏洞复现

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 缺全部主CVE元数据和影响/修复版本
- 野外开发应译在野利用；NmPoller.exe是否远程下载的句法疑误需回查
- 两周前修复是相对报道时点，与9月18归档日期不同
- 两个SQLi共享事件不能与4885RCE合成一漏洞

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

胡金鱼  嘶吼专业版   2024-09-18 14:01  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/wpkib3J60o297rwgIksvLibPOwR24tqI8dGRUah80YoBLjTBJgws2n0ibdvfvv3CCm0MIOHTAgKicmOB4UHUJ1hH5g/640?wx_fmt=gif "")  
  
黑客一直在利用 Progress Software 的 WhatsUp Gold 网络可用性和性能监控解决方案中两个严重漏洞的公开漏洞代码。  
  
自 8 月 30 日以来，攻击中利用的两个漏洞是 SQL 注入漏洞，跟踪编号为 CVE-2024-6670 和 CVE-2024-6671，漏洞允许在未经身份验证的情况下检索加密密码。  
  
尽管相关工作人员在两周前就解决了安全问题，但许多客户仍然需要更新软件，而威胁者正在利用这一漏洞发起攻击。  
  
Progress Software 于 8 月 16 日发布了针对该问题的安全更新，并于 9 月 10 日在安全公告中添加了如何检测潜在危害的说明。  
  
安全研究员 Sina Kheirkhah 发现了这些漏洞，并于 5 月 22 日将其报告给零日计划。8 月 30 日，该研究员发布了概念验证 (PoC) 漏洞。  
  
该研究员在技术文章中解释了如何利用用户输入中不适当的清理问题将任意密码插入管理员帐户的密码字段，从而使其容易被接管。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o2icqtSkbuA492yVNAhh7O2Xkp02LiaEK6mSTG1mkjSqpXWUGswvia4T9ltfFZ34Mb3M4sQHwThbQ5ibjQ/640?wx_fmt=png&from=appmsg "")  
  
Kheirkhah 的漏洞概述  
# 野外开发  
  
网络安全公司最新的报告指出，黑客已经开始利用这些漏洞，根据观察，这些攻击似乎基于 Kheirkhah 的 PoC，用于绕过身份验证并进入远程代码执行和有效载荷部署阶段。在研究人员发布 PoC 漏洞代码五小时后，安全公司的遥测技术首次发现了主动攻击的迹象。  
  
攻击者利用 WhatsUp Gold 的合法 Active Monitor PowerShell Script 功能，通过从远程 URL 检索的 NmPoller.exe 运行多个 PowerShell 脚本。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o2icqtSkbuA492yVNAhh7O2XkQQ3zyFryiajbfcSorKR1YKpCPYfiaiaFgV34ZPEDFCHAS5aBoobEQWGSA/640?wx_fmt=png&from=appmsg "")  
  
攻击者部署的恶意 PowerShell 脚本  
  
接下来，攻击者使用合法的 Windows 实用程序“msiexec.exe”通过 MSI 包安装各种远程访问工具 (RAT)，包括 Atera Agent、Radmin、SimpleHelp Remote Access 和 Splashtop Remote。  
  
植入这些 RAT 可让攻击者在受感染的系统上建立持久性。  
  
在某些情况下，研究人员观察到部署了多个有效载荷。分析师无法将这些攻击归因于特定的威胁组织，但使用多个 RAT 表明它可能是勒索软件参与者。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o2icqtSkbuA492yVNAhh7O2Xk7PzbosbVkiaF8v4pMg44fSndgdFDHeY4pTXKVYTiboMbOxkaDbpPbf3Q/640?wx_fmt=png&from=appmsg "")  
  
观察到的活动的攻击流程  
  
据了解，这并不是 WhatsUp Gold 今年第一次受到公开漏洞的攻击。8 月初，威胁监测组织 Shadowserver Foundation 报告称，其蜜罐捕获了利用 CVE-2024-4885 的攻击，CVE-2024-4885 是一个于 2024 年 6 月 25 日披露的严重远程代码执行漏洞。这个缺陷也被 Kheirkhah 发现，两周后他在社交媒体上公布了完整的详细信息。  
  
参考及来源：https://www.bleepingcomputer.com/news/security/hackers-targeting-whatsup-gold-with-public-exploit-since-august/  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o2icqtSkbuA492yVNAhh7O2XkiamYZ3LzK6EjiadkzokRHJmVZc1wkNYoA6ia32fSKdQI9OJDJCibHHe9hQ/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o2icqtSkbuA492yVNAhh7O2XkiaibTqDuHrKtFQXlEVzYWvYdtv9kSFMPxcRK6B0KTBicLRNpiajia1BEkog/640?wx_fmt=png&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）


## 2026-10-03 公开验证资料补充

[固定公开源码](https://github.com/rapid7/metasploit-framework/blob/5e598d5233bebecef2a44904a286769d83d31d12/modules/auxiliary/admin/http/whatsup_gold_sqli.rb) 本次已完整静态阅读；未检查框架及载荷的全部传递依赖。

固定模块不是只读取密码：它先提交 JMXSecurity 密码设置，再以 `HasErrors` 的 `classId` 注入改写 ProActiveAlert，把加密值带到可读取的告警字段；随后更新现有 WebUser 的密码，最后通过 LoginAjax、ASPXAUTH Cookie 和 authenticated 标志检查登录。因此会改动全局设置、告警内容及用户密码，没有完整自动回滚。

[CNA](https://cveawg.mitre.org/api/cve/CVE-2024-6670) 标注 2024.0.0 之前受影响，结构化记录下界为 2023.1.0；源码 check 使用 app.json 中的23.1.3版本判定，不能代替厂商按发布线给出的范围。该 SQL 注入与本页提及的4885报表文件写入是不同实体，不能因同属 WhatsUp Gold 混合编号。

尤其应注意：源码的UPDATE ProActiveAlert没有WHERE条件，可能覆盖全部告警名称。即使后续登录检查失败，已经改动的全局设置、告警和用户密码也不会自动回滚。本补证仅对应CVE-2024-6670，既有6671及引用4885并未因此通过本轮材料门槛。
