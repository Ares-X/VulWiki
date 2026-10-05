---
cve: "CVE-2025-23120"
source: "gelusus/wxvl 公众号漏洞文库"
title: "Veeam 备份服务器现重大漏洞，速更新补丁！"
product: "Veeam Backup & Replication12域加入部署"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2025-23120"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "文称域加入安装且攻击者为域用户，<=12.3.0.310的12分支；修复12.3.1.1139"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-0d46106d9597056a690265af"
entity_id: "ve-0d46106d9597056a690265af"
schema_version: "1"
---

# Veeam 备份服务器现重大漏洞，速更新补丁！

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：文称域加入安装且攻击者为域用户，<=12.3.0.310的12分支；修复12.3.1.1139
- 证据范围：给两.NET类与黑名单绕过机制，没有PoC；域条件叙述清楚但应核是否还存在本地账号路径

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 应补watchTowr原文和VeeamKB，历史前一漏洞没有编号不可猜补
- 所有早期版本12构建应规范成12.x范围
- 未在野利用限2025-03-21时点，删点赞推广

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

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
  
  
![](../../.resource/remote/067b16256e0ba673a1adf65d982af935c9dacaa6db0fe2765439200e9725754c.jpg "")  
  
  
![](../../.resource/remote/c953c0b9b281634c2c507d132859e779159195ce3db48c3a5eb6f0585d7d6e4e.gif "")  
  
**球分享**  
  
![](../../.resource/remote/c953c0b9b281634c2c507d132859e779159195ce3db48c3a5eb6f0585d7d6e4e.gif "")  
  
**球点赞**  
  
![](../../.resource/remote/c953c0b9b281634c2c507d132859e779159195ce3db48c3a5eb6f0585d7d6e4e.gif "")  
  
**球在看**  
  
  
![](../../.resource/remote/bc51e60a1ab9953f98cd0a2143c252c867072663f41e9d1e7cb32951a0a00487.gif "")  
  
点击阅读原文查看更多  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
