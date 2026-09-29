---
cve: "CVE-2025-23120"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Veeam 备份服务器现重大漏洞，速更新补丁！   
看雪学苑  看雪学苑   2025-03-21 17:59  
  
近期 Veeam Backup & Replication 软件被曝出一项严重的远程代码执行漏洞（CVE-2025-23120），给众多企业和组织的数据安全带来了巨大风险。  
  
  
据相关报道，该漏洞是由 watchTowr Labs 发现的，主要影响 Veeam Backup & Replication 版本 12.3.0.310 及所有早期版本 12 构建。漏洞根源在于软件的 Veeam.Backup.EsxManager.xmlFrameworkDs 和 Veeam.Backup.Core.BackupSummary .NET 类中存在反序列化问题。反序列化漏洞是一种常见的安全风险，当应用程序对序列化数据处理不当，攻击者便能注入恶意对象，从而执行有害代码。  
  
  
去年，Veeam 在修复由研究员 Florian Hauser 发现的类似反序列化 RCE 漏洞时，采用了黑名单方式，禁止已知可被利用的类或对象。然而，watchTowr Labs 却找到了一条未被列入黑名单的全新攻击链，成功实现了远程代码执行。  
  
  
令人担忧的是，此次漏洞仅影响加入 Windows 域的 Veeam Backup & Replication 安装，但任何域用户都能利用该漏洞，这意味着在许多企业环境中，该漏洞极易被攻击者利用。尽管目前尚未有该漏洞被野外利用的报道，但 watchTowr Labs 公开的技术细节已足够让安全研究人员和黑客开发出概念验证（PoC）代码。  
  
  
Veeam Backup & Replication 作为一款广泛使用的备份软件，一直是勒索软件团伙的攻击目标。一旦黑客入侵成功，不仅能够窃取数据，还能删除备份，阻挠企业恢复数据，给企业带来毁灭性打击。  
  
  
为应对这一严峻的安全威胁，Veeam 已迅速发布 12.3.1 版本（构建 12.3.1.1139）来修复该漏洞，各企业应将升级至该版本作为当务之急。  
  
  
  
资讯来源：  
thehackernews  
  
转载请注明出处和本文链接  
  
  
  
﹀  
  
﹀  
  
﹀  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/Uia4617poZXP96fGaMPXib13V1bJ52yHq9ycD9Zv3WhiaRb2rKV6wghrNa4VyFR2wibBVNfZt3M5IuUiauQGHvxhQrA/640?wx_fmt=jpeg "")  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球分享**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球点赞**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球在看**  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibExiboJzOiafqGLvlOkrmU6NIr3qSr7ibpkIo2N5mhCTNXoMl37s2oRSIDw/640?wx_fmt=gif&from=appmsg "")  
  
点击阅读原文查看更多  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
