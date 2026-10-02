---
cve: "CVE-2024-43405"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-5856f695b6a9c172d39caae2"
entity_id: "ve-5856f695b6a9c172d39caae2"
schema_version: "1"
title: "Nuclei 被曝高危漏洞！允许攻击者进行签名绕过和代码执行，谨慎使用陌生的YAML模板"
product: "ProjectDiscovery Nuclei"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-43405"
referenced_identifiers: ""
prerequisites: "运行不可信code模板并具执行权限；3.3.2修复"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/Nuclei/Nuclei%20%E8%A2%AB%E6%9B%9D%E9%AB%98%E5%8D%B1%E6%BC%8F%E6%B4%9E%EF%BC%81%E5%85%81%E8%AE%B8%E6%94%BB%E5%87%BB%E8%80%85%E8%BF%9B%E8%A1%8C%E7%AD%BE%E5%90%8D%E7%BB%95%E8%BF%87%E5%92%8C%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%EF%BC%8C%E8%B0%A8%E6%85%8E%E4%BD%BF%E7%94%A8%E9%99%8C%E7%94%9F%E7%9A%84YAML%E6%A8%A1%E6%9D%BF.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Nuclei 被曝高危漏洞！允许攻击者进行签名绕过和代码执行，谨慎使用陌生的YAML模板   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：ProjectDiscovery Nuclei
- 本文讨论：CVE-2024-43405
- 版本、权限与配置前提：运行不可信code模板并具执行权限；3.3.2修复
- 资料类型：模板签名绕过新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 两次称3.0.0之后所有版本受影响，和文内3.3.2已修复矛盾
- YAML解析器不自己执行任意代码，应说明Nuclei code协议执行和启用条件
- 签名校验保证来源完整性不等于模板安全；仅多个digest或CR不是充分攻击条件
- 缺Wiz和官方GHSA/提交链接

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 官方版本上下界、code开关前提与签名验证细节待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

 WH0sec   2025-01-07 03:30  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/myic1rJ84UQib1h8I5Re97yPxU4o2fzIk9oZ62CvkvzianGcPoDtrqFdXWicFKmKdvPyCWibpfmHYy3JFpkiatI1ImiaQ/640?wx_fmt=gif "")  
  
“ Nuclei 被披露了一个高度严重的安全漏洞， CVE-2024-43405，CVSS 评分为 7.4 分。它会影响 3.0.0 之后的所有 Nuclei 版本。”  
  
  
**Nuclei**  
  
Nuclei是一种用于自动化漏洞扫描和发现的工具，它可以帮助安全研究人员和渗透测试人员快速识别和验证网络上的漏洞。Nuclei支持多种协议和服务，可以通过预定义的模板（YAML）来检测常见的安全问题，也可以根据用户的需求进行定制化配置。使用Nuclei可以帮助发现潜在的安全漏洞。Nuclei 在网络安全领域，尤其是在渗透测试和漏洞扫描方面，已经成为一个相对流行的工具。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/myic1rJ84UQ8PZWMIvALc17Yr6oib4reYauprsCLo0UOciajDlFYFfiawvxXxBicB5xM4XY0d6Sn3ZmkaZCHicwcwWZA/640?wx_fmt=png&from=appmsg "")  
  
Nuclei 被曝高危漏洞  
  
Nuclei于2024年底被爆出一个新的高危漏洞，它被跟踪为 CVE-2024-43405，CVSS 评分为 7.4 分，它会影响 3.0.0 之后的所有 Nuclei 版本。  
  
该漏洞产生于签名验证过程与 YAML 解析器处理换行符的方式之间的差异，以及对多个签名的处理方式。这使得攻击者能够在模板中注入恶意内容，同时仍然保持模板的合法部分具有有效的签名。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/myic1rJ84UQ8PZWMIvALc17Yr6oib4reYa8Qoo3HaXVZjcWVMTqCZ682B10HV2m2sOqFZ2C8nuJ46LW2e8tY3sPA/640?wx_fmt=gif&from=appmsg "")  
  
  
漏洞细节  
  
该漏洞由云安全公司 Wiz 发现，漏洞的根本原因出在模板签名验证上，该签名本来是用来确保官方模板库里的模板是安全的、没被篡改的，但是这个验证过程是可以被绕过的，攻击者可以制造出一些恶意的YAML模板，不仅能任意执行代码，还能窃取主机上的敏感数据。  
  
Wiz 的研究员 Guy Goldenberg 在分析里说，“这个签名验证是目前唯一能验证 Nuclei 模板的方法，所以它一旦出问题，就成了整个系统的软肋。问题的关键在于，验证过程中用了正则表达式（就是那种处理字符串的工具），结果和 YAML 解析器（另一种处理数据的工具）搞出了冲突。攻击者可以利用这个冲突，往模板里塞个'\r' 字符，绕过正则表达式的验证，但 YAML 解析器却会把它当成换行符来处理。”  
  
简单来说，就是正则表达式和 YAML 解析器对“\r”的理解不一样，一个觉得它没啥特别的，另一个却把它当成了换行符。攻击者就利用这个漏洞，在模板里加了个假的“# digest:”行，绕过了验证，但 YAML 解析器还是会执行它。  
  
Goldenberg 还提到，“验证逻辑只检查第一行的“# digest:”，后面的就管不着了。所以攻击者可以在后面加一堆假的“# digest:”，验证过程不会管它们，但 YAML 解析器还是会老老实实地执行。”  
  
利用这一点，攻击者可以制作包含多个# digest行或精心放置的 \r 换行符的恶意模板，以绕过 Nuclei 的签名验证，当组织在没有适当验证或隔离的情况下运行不受信任或社区贡献的模板时，就会出现此漏洞的攻击媒介，攻击者可以利用此功能注入恶意模板，从而导致任意命令执行、数据泄露或系统受损。  
  
最新进展  
  
在漏洞披露之后，ProjectDiscovery 于 2024 年 9 月 4 日以   
3.3.2 版本  
解决了这个问题，Nuclei 的当前版本是 3.3.7。对于仍在使用旧版Nuclei的朋友，强烈建议更新至最新版本。  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/myic1rJ84UQ9tkmbgPnwvcekWSnVDhGrcp255vKxWPgcZra8l1gzL9ibN7MOWPesgkoVTAzsm6iaicJUjrx5I54djw/640?wx_fmt=png&from=appmsg "")  
![](https://mmbiz.qpic.cn/mmbiz_png/myic1rJ84UQicYaPaTeJcNOszM43NvF6J8AlDDSETRG8FtyKjAI5fkfAjibTjNrqwkiaicIibjSJwzYyW4FYBEMtKxTA/640?wx_fmt=png&from=appmsg "")  
![](https://mmbiz.qpic.cn/mmbiz_png/myic1rJ84UQicYaPaTeJcNOszM43NvF6J8XMnCjlRPA94oicBClUx79hib1ZnJj6CSmQBpMv96EXl6IxOsIBTeulNQ/640?wx_fmt=png&from=appmsg "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/myic1rJ84UQib8G9YWAjAJNlhX1Wzmb7gpHLnoov6uvXfnyrfaUibbZexLulXjzVQ5B4zv1QpddvuyJTEghvDyuMw/640?wx_fmt=png&from=appmsg "")  
  
   
![](https://mmbiz.qpic.cn/mmbiz_jpg/myic1rJ84UQicYaPaTeJcNOszM43NvF6J88CEtytnRDQFhIaP9S6PoyVrOhehRWcPz4iacSbJoian440fYTx8OGvSg/640?wx_fmt=other&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
