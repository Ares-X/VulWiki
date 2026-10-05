---
source: "gelusus/wxvl 公众号漏洞文库"
title: "超5万台 Tinyproxy 服务器易受严重RCE漏洞影响"
product: "Tinyproxy remove_connection_headers"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2023-49606"
referenced_identifiers: ""
identifier_role: "primary"
cve: "CVE-2023-49606"
prerequisites: "受影响1.10.0/1.11.1、Connection头处理可达；鉴权/ACL及内存分配器影响可达性与后果"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-0d7c2219c8316aef51961c25"
entity_id: "ve-0d7c2219c8316aef51961c25"
schema_version: "1"
---

# 超5万台 Tinyproxy 服务器易受严重RCE漏洞影响

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：受影响1.10.0/1.11.1、Connection头处理可达；鉴权/ACL及内存分配器影响可达性与后果
- 证据范围：同时保留Talos未认证说法和维护者认证/ACL争议、已证DoS与潜在RCE边界；标题比正文更确定

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 52k/57%与列出18372+1390实例差距未解释，不能当完整实证数量
- RCE尚无起作用利用的原文条件必须保留
- 已更新的代码仅认证后触发的翻译可能模糊新旧代码，需回查上游
- 缺主CVE元数据、去宣传尾部

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

Jai Vijayan  代码卫士   2024-05-08 17:56  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**近5.2万台暴露在互联网的 Tinyproxy 实例易受CVE-2023-49606 漏洞的影响。该漏洞是一个严重的RCE漏洞，CVSS v3评分为9.8。**  
  
  
  
Tinyproxy 是一款开源的HTTP 和HTTPS 代理服务器，旨在成为快速、小型和轻量的服务器，专为 UNIX 类的操作系统定制，常用于小型企业、公共WiFi提供商和家庭用户。  
  
本月初，思科 Talos 披露称他们在2023年12月发现该漏洞，它影响 1.11.1和1.10.0版本，而公开披露的原因是未收到开发人员的回复。思科在报告中分享了该漏洞的详情，包括可导致服务器崩溃并可能导致远程代码执行后果的 PoC 利用。  
  
思科 Talos 研究人员在报告中解释称，该漏洞位于 “remove_connection_headers()” 函数中，特定的HTTP标头（Connection 和 Proxy-Connection）未得到正确管理，导致内存被释放，且之后遭不恰当的访问。攻击者无需认证，即可通过一个简单的恶意HTTP请求（如 Connection: Connection）进行利用。  
  
思科当时提醒称，尽管已经提醒 Tinyproxy 的开发人员注意该严重漏洞，但他们并未收到回复，也没有补丁供用户下载。  
  
上周六，Censys 报道称，被暴露在互联网的 Tinyproxy 服务达到9万，其中约57%的服务易受CVE-2023-49606的影响。具体而言，Censys 发现18372个实例运行易受攻击版本1.11.1，1390个实例运行1.10.0版本。大多数实例位于美国（11,946）、韩国、法国、德国等。  
  
  
**漏洞修复**  
  
  
上周日，就在思科披露该漏洞的五天后，Tinyproxy 的维护人员发布了CVE-2023-49606的修复方案，调整了内存管理以阻止利用。  
  
然而，Tinyproxy 维护人员对思科公开漏洞的行为提出异议，表示从未通过该项目的披露渠道收到漏洞报告。开发人员在 GitHub 上指出，“TALOS 情报团队的安全研究员在2023年12月发现了tinyproxy中的一个释放后使用漏洞，声称已联系上游并等待6个月之后才发布。不管他为联系上游做了什么，都是无效的且并非 tinyproxy 主页或 README.md 上所描述的事情。他显然并未竭力找到有效的接口，很可能从git日志中随手找到一个邮箱地址并发了一封邮件。该漏洞在2024年5月1日被公开，而过了整整5天后，我才从一名发行包维护人员处通过IRC知道。”  
  
包括该修复方案的提交 (12a8484) 包含在即将发布的版本1.11.2中，不过情况紧急的情况下可从主分支拉取变更或者手动应用已突出显示的修复方案。Tinyproxy 的维护人员指出，“这是一个非常严重的漏洞，很可能会导致 RCE，尽管到目前为止还未发现起作用的利用。如果 tinyproxy 使用musl libc 1.2+ 版本（加固内存分配器自动检测UAF）或以地址清理器构建，则肯定会导致服务器受DoS 攻击。”  
  
Tinyproxy 的开发人员还提到，已更新的代码仅在通过认证和访问列表检查后才会触发，意味着该漏洞可能并不影响所有的设置，尤其是位于受控环境中如企业网络的设置或使用带有安全密码的基础认证的设置。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[开源的Judge0 中存在多个沙箱逃逸漏洞，可导致系统遭完全接管](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519400&idx=2&sn=e79b7a5da52b70449d7f2d6c99c8cab2&chksm=ea94bdc2dde334d48c4fc1fc698133c71550c937353091502e020643ff271de8656b39d98e84&scene=21#wechat_redirect)  
  
  
[OWASP 发布十大开源软件风险清单（详解版）](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519303&idx=1&sn=df6dc31715e4c8d70ad22fe31af7eb03&chksm=ea94bd2ddde3343b6e37f517febd2d68bba0fe206dde6bab42bf696389f1ca4723bbdf8ccf78&scene=21#wechat_redirect)  
  
  
[开源AI框架 Ray 的0day已用于攻陷服务器和劫持资源](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519162&idx=1&sn=3872fcc82018e2c561d9e4e7574f0c8e&chksm=ea94bad0dde333c6d504e2c7680caabb4badc973dd03223bab93d5b62e5469c4db22d966adf9&scene=21#wechat_redirect)  
  
  
[CISA：注意 Chrome 和 Excel 解析库中已遭利用的开源漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518582&idx=2&sn=3e7fcf93d7c3d8fa193fcb72ed6c2347&chksm=ea94b81cdde3310af6e572040db0f7c2aba6bf5314cdb417d0ad4e7fffa194153e99860228a1&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/over-50-000-tinyproxy-servers-vulnerable-to-critical-rce-flaw/  
  
  
题图：  
Pexels  
 License  
  
****  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](../../.resource/remote/2c03ce3cc6bb81bca85bd412ed60e93c4bc0a295a1fc9d3739d8aca43497fbb4.jpg "")  
  
![](../../.resource/remote/b33054170f5acbf0023711f517b5bee9799a2f57b155a774d3945e6d78184e63.jpg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](../../.resource/remote/8a5c84b98d9b52b1d4f4306180ec26c9aa65342b326b5b98ad2f097b488152f4.gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
