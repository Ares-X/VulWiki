---
verification_source: "https://github.com/rapid7/metasploit-framework/blob/5e598d5233bebecef2a44904a286769d83d31d12/modules/exploits/windows/http/ivanti_epm_recordgoodapp_sqli_rce.rb"
version: "CVE-2024-29824：EPM Core2022 SU5及以前未打对应安全更新；不扩展到同页其他产品/编号"
source_url: "https://github.com/rapid7/metasploit-framework/blob/5e598d5233bebecef2a44904a286769d83d31d12/modules/exploits/windows/http/ivanti_epm_recordgoodapp_sqli_rce.rb"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-b40d506cc9abc580ce887b41"
entity_id: "ve-b40d506cc9abc580ce887b41"
schema_version: "1"
title: "Ivanti 修复Endpoint Manager 中的严重RCE漏洞"
product: "Ivanti EPM Core（主）、Avalanche/ITSM/客户端等"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-29822; CVE-2024-29823; CVE-2024-29824; CVE-2024-29825; CVE-2024-29826; CVE-2024-29827; CVE-2024-29828; CVE-2024-29829; CVE-2024-29830"
referenced_identifiers: "CVE-2024-4701; CVE-2023-5389; CVE-2023-5390"
prerequisites: "本次模块仅补证CVE-2024-29824：EPM Core2022 SU5及以前、同网络可达、无需认证；其他29822–29830前提仍各自核对"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Ivanti/Ivanti%20%E4%BF%AE%E5%A4%8DEndpoint%20Manager%20%E4%B8%AD%E7%9A%84%E4%B8%A5%E9%87%8DRCE%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "29824模块的差分SQL延迟占用资源；exploit持久启用show advanced options/xp_cmdshell且无还原；所选fetch载荷可写文件"
source_status: "recorded"
---

#  Ivanti 修复Endpoint Manager 中的严重RCE漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ivanti EPM Core（主）、Avalanche/ITSM/客户端等
- 本文讨论：CVE-2024-29822至29830及29846
- 版本、权限与配置前提：EPM2022SU5及以前；六个SQL洞同网段未认证，其余四需认证
- 资料类型：多产品修复新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 多个独立产品/漏洞不能以首CVE合并，Netflix Genie/Honeywell为独立副新闻
- EPM无具体首修补丁，Avalanche6.4.3.602是受影响还是修复描述不明确
- 只有二手THN来源，缺各公告直链

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 各CVE版本/认证/同网段条件逐项待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

THN  代码卫士   2024-05-24 17:24  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**本周二，Ivanti 公司修复了位于 Endpoint Manager (EPM) 中的多个严重漏洞，在某些情况下可用于实现远程代码执行。**  
  
  
  
Ivanti 本次共修复10个漏洞，其中6个即编号为从CVE-2024-29822到CVE-2024-29827（CVSS评分9.6）的漏洞与SQL注入有关，可导致位于同一个网络中的未认证攻击者执行任意代码。  
  
余下的4个漏洞编号为CVE-2024-29828、CVE-2024-29829、CVE-2024-29830和CVE-2024-29846（CVSS评分8.4），与上述漏洞几乎属于同一类型，唯一不同之处在于它们要求攻击者进行认证。  
  
这些漏洞影响 Ivanti EPM 2022 SU5及之前版本的 Core 服务器。  
  
Ivanti 公司还修复了位于 Avalanche 6.4.3.602中的高危漏洞 (CVE-2024-29848，CVSS评分7.2)，可导致攻击者通过上传特殊构造的文件的方式，实现远程代码执行后果。  
  
此外，Ivanti 公司还修复了其它5个高危漏洞：Neurons for ITSM中的SQL注入漏洞 (CVE-2024-22059) 和不受限制的文件上传漏洞 (CVE-2024-22060)，位于Connect Secure 中的CRLF 注入漏洞 (CVE-2023-38551) 和位于Windows 和Linux版 Secure Access 客户端中的两个本地提权漏洞（CVE-2023-38042和CVE-2023-46801）。  
  
Ivanti 公司强调称目前尚未有证据表明这些漏洞已遭在野利用或通过供应链攻击“被恶意引入到我们的代码开发流程”。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMRWyjibjcoF9UM0DrochwkhSzfXpNsSe8z7Kvb1f6tcWW1GvOCCMEPqBqv7HYZUFgpqQ4bd92xhlCw/640?wx_fmt=gif&from=appmsg "")  
  
**其它相关漏洞**  
  
  
  
  
  
此前不久，Netflix 开发的大数据协同和执行引擎 Genie 开源版本中被指存在一个严重漏洞 CVE-2024-4701（CVSS评分9.9），可导致远程代码执行后果。该漏洞被指为路径遍历漏洞，可被用于在文件系统中写入任意文件并执行任意代码。它影响4.3.18前的所有版本。该漏洞是因为 Genie 的REST API 旨在将用户提供的文件名称接受为该请求的一部分，从而导致恶意人员构造文件名称，突破默认的附件存储路径并将配有任何用户指定名称的文件写入由该行动者指定的路径中。维护人员在安全公告中提到，“运行自身实例并依赖该文件系统存储发送给 Genie 应用的文件附件的Genie OSS 用户均受影响。”话虽如此，未将附件本地存储在该底层文件系统的用户并不受影响。  
  
Contrast Security 公司的研究员 Joseph Beeton 指出，“如成功，则此类攻击可欺骗 web 应用读取并暴露应用程序或 web 服务器的文档根目录之外的文件内容，包括后端系统的凭据、应用代码和数据以及敏感的操作系统文件。”  
  
本周早些时候，美国政府提醒称威胁行动者一直利用软件中的目录遍历漏洞实施攻击，呼吁开发人员采用设计安全方法消减此类漏洞。  
  
前不久，霍尼韦尔的Control Edge UOC 控制器中出现多个漏洞（CVE-2023-5389和CVE-2023-5390），可导致未认证的远程代码执行后果。Claroty 公司提到，“已经位于OT网络上的攻击者可使用恶意网络数据包利用该漏洞并攻陷虚拟控制器。攻击者可远程执行攻击，修改文件，完全控制控制器并执行恶意代码。”  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Ivanti：注意！Avalanche MDM 解决方案中存在多个严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519303&idx=2&sn=e86decfa003bf7ebcb19d43552440c7f&chksm=ea94bd2ddde3343b1eba25473eb57c432ce40d7ded22623619060fbc6c299c461dc0087f1d1b&scene=21#wechat_redirect)  
  
  
[产品中又现4个漏洞，Ivanti 宣布安全大检修](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519242&idx=1&sn=6c9094b038e67aea0f2968fffbb125e0&chksm=ea94bd60dde334764a9154d61f5809e1fd0a977ba3617a96d698def9b968b04b3039d7ecc3b2&scene=21#wechat_redirect)  
  
  
[Ivanti 修复由北约报送的严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519117&idx=1&sn=cde689326429491acd44848ceeacab57&chksm=ea94bae7dde333f1f0011d550d4f6a0c206cfdb62dda27f77ba6e432c6883a80c8ff30be2a51&scene=21#wechat_redirect)  
  
  
[Ivanti 披露两个新0day，其中一个已遭利用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518800&idx=2&sn=81cdaabe53353075dd5badd918a3e0cd&chksm=ea94bb3adde3322ca6046c2aa9cb37dedf686efcdd6be90bd63248f23ad20dcc4015a3007149&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://thehackernews.com/2024/05/ivanti-patches-critical-remote-code.html  
  
  
题图：  
Pixabay  
 License  
  
****  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSf7nNLWrJL6dkJp7RB8Kl4zxU9ibnQjuvo4VoZ5ic9Q91K3WshWzqEybcroVEOQpgYfx1uYgwJhlFQ/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSN5sfviaCuvYQccJZlrr64sRlvcbdWjDic9mPQ8mBBFDCKP6VibiaNE1kDVuoIOiaIVRoTjSsSftGC8gw/640?wx_fmt=jpeg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ5iciaeKS21icDIWSVd0M9zEhicFK0rbCJOrgpc09iaH6nvqvsIdckDfxH2K4tu9CvPJgSf7XhGHJwVyQ/640?wx_fmt=gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）


## 2026-10-03 公开验证资料补充

[固定公开源码](https://github.com/rapid7/metasploit-framework/blob/5e598d5233bebecef2a44904a286769d83d31d12/modules/exploits/windows/http/ivanti_epm_recordgoodapp_sqli_rce.rb) 本次已完整静态阅读；未检查框架及载荷的全部传递依赖。

源码给出 SOAP `UpdateStatusEvents` 的完整构造，向 `/WSStatusEvents/EventHandler.asmx` 提交 Action type96，并在 status 的 md5 值处进入 RecordGoodApp SQL 注入。check 发送基线和延迟 SQL；两次测时会占用数据库资源，单次延迟仍受网络和负载影响。

exploit 进一步启用 SQL Server 的 show advanced options 与 xp_cmdshell，再执行所选命令。它不会恢复这些设置，fetch 载荷还可能留文件，不能当只读探针。[CNA](https://cveawg.mitre.org/api/cve/CVE-2024-29824) 将对象限定为 EPM Core 2022 SU5及以前、同一网络可达的未认证攻击者。修复入口是[Ivanti May2024公告](https://forums.ivanti.com/s/article/Security-Advisory-May-2024)；本轮未取得动态公告正文，不能据此填一个未经核实的新构建号。

show advanced options和xp_cmdshell是SQL Server持久配置变更，源码没有还原；即便采用有/无延迟两次请求，差分时延仍受网络和服务器负载影响。本段只补证CVE-2024-29824，不把同页29822–29830或Avalanche/ITSM/客户端等其他产品一并视为已补齐。
