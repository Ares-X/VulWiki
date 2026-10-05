---
source: "gelusus/wxvl 公众号漏洞文库"
title: "速修复！开源通信框架 FreeSWITCH 受严重漏洞影响"
product: "SignalWire FreeSWITCH"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2023-51443"
referenced_identifiers: ""
identifier_role: "primary"
cve: "CVE-2023-51443"
prerequisites: "DTLS-SRTP媒体协商场景及攻击者可向媒体端口发送恶意握手"
source_status: "unknown"
side_effects: "含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。"
id: "vw-b784d256883ef48702a55b43"
entity_id: "ve-b784d256883ef48702a55b43"
schema_version: "1"
---

# 速修复！开源通信框架 FreeSWITCH 受严重漏洞影响

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：DTLS-SRTP媒体协商场景及攻击者可向媒体端口发送恶意握手
- 证据范围：描述无效CipherSuite触发握手竞态与新通话拒绝，未给独立PoC，宜保留公告摘要。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 5000企业使用量不能代表均受影响部署
- 释放未验证地址数据包是含糊翻译，需核原始修复机制
- 1.10.10及以前与1.10.11修复缺厂商公告链接，CVSS无向量
- 广告/推荐文章比例较高，标题缺编号

### 操作风险与资料使用

- 含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

DO SON  代码卫士   2023-12-26 17:29  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**开源通信框架 FreeSWITCH受严重漏洞CVE-2023-51443影响。该框架是全球很多电话基础设施不可分割的一部分，由 SignalWire 维护，对于在云中部署电信解决方案至关重要，每天全球各地的5000多家企业都有赖于它。**  
  
![](../../.resource/remote/51f9bc7c97b2363d1ca65fc261db46a9b8553a7dc105073d5f153b43522d898b.png "")  
  
  
CVE-2023-51443的CVSS评分为7.5，导致 FreeSWITCH 在用于媒体设置的SRTP中 DTLS 协议的握手阶段易受拒绝服务攻击。该漏洞由条件竞争引发，可导致持续攻击，中断新的DTLS-SRTP 加密通话。  
  
该漏洞由 Enable Security 公司的安全研究员发现，位于 DTLS ClientHello 消息的处理过程中。当含有不合法 CipherSuite 的 ClientHello 消息被发送给 FreeSWITCH 时，会导致DTLS错误，进而使媒体会话和随后的SIP信号层被中断。该漏洞存在于 FreeSWITCH 1.10.10中。  
  
安全公告指出，“处理媒体设置的 DTLS-SRTP 时，因 DTLS 协议的 hello 握手阶段中存在条件竞争，导致 FreeSWITCH 易受拒绝服务攻击。该攻击可持续进行，可在攻击中拒绝新的 DTLS-SRTP 加密通话。”  
  
该漏洞可造成重大影响，导致依赖于 DTLS-SRTP 进行通话的服务器遭受大规模的拒绝服务攻击。1.10.10及以下版本均受影响。强烈建议用户升级至1.10.11或后续版本。新版本中包含的修复方案释放来自未验证地址的数据包，增强了 FreeSWITCH 对 expoloit 的弹性。  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[使用广泛的开源框架 Expo中存在多个 OAuth 漏洞，导致账户遭接管](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516580&idx=3&sn=167c3b3338d23cf14213471948cfc1fa&chksm=ea94b0cedde339d839a79eabe54cb687eb0f8bd5b2f135cadbc58cffcbc6b04f783f530dead1&scene=21#wechat_redirect)  
  
  
[开源框架 Drupal 修复多个访问绕过和 CSRF 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247507917&idx=3&sn=a5e6b685fcaf76b58f720609ada0811d&chksm=ea94eea7dde367b119ed6bd4f027df950bc26346003fd0856da0552e2d751a2dbfa55893361b&scene=21#wechat_redirect)  
  
  
[谷歌提出治理开源软件漏洞的新框架：知悉、预防、修复](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247502067&idx=1&sn=c43b8a5bcd9d20a244a2b8719859c33e&chksm=ea94f999dde3708f2fdc86e8bad7a16784228cadb6b445f8c17ad6cc245b79db79f367fad0d6&scene=21#wechat_redirect)  
  
  
[开源框架 Apache Struts 2漏洞的 PoC 已公开](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247494650&idx=1&sn=37722a47d19076bfc36d3e5be2692970&chksm=ea94da90dde353861bd7013c6df7562c694a75b8242bb6e3bf5191b84128ebe5f0abfca69ed7&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://securityonline.info/5000-businesses-exposed-critical-freeswitch-flaw-urges-immediate-patching/  
  
  
题图：  
Pixabay  
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
