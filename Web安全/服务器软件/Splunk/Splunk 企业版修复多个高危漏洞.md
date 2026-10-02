---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Splunk 企业版修复多个高危漏洞"
product: "Splunk Enterprise及附属应用"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2023-32707; CVE-2023-32706; CVE-2023-32708"
referenced_identifiers: "CVE-2022-43571"
identifier_role: "primary"
cve: "CVE-2023-32707; CVE-2023-32706; CVE-2023-32708"
prerequisites: "32707需edit_user，32706 SAML解析路径，32708低权限用户；应按实体分版本"
source_status: "unknown"
side_effects: "含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。"
id: "vw-f469a2639f16742ded967a86"
entity_id: "ve-f469a2639f16742ded967a86"
schema_version: "1"
---

# Splunk 企业版修复多个高危漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：32707需edit_user，32706 SAML解析路径，32708低权限用户；应按实体分版本
- 证据范围：主要机制及8.1.14/8.2.11/9.0.5修复概述，未给技术请求

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- edit_user不支持grantableRoles因此会阻止此类场景为逻辑反转，应是不执行本可阻止越权的限制
- 三个主CVE缺元数据，第三方库漏洞未编号不宜自动映射
- 去广告推荐阅读，时间固定2023-06-05

### 操作风险与资料使用

- 含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

Ionut Arghire  代码卫士   2023-06-05 17:43  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
****  
**上周四，Splunk 公司发布 Splunk 企业版安全更新，修复了多个高危漏洞，其中一些影响该产品使用的第三方程序包。**  
  
  
  
  
其中最严重的漏洞是权限提升漏洞CVE-2023-32707，可导致具有 ‘edit_user’能力的低权限用户通过特殊构造的 web 请求提升至管理员权限。Splunk 公司发布安全公告指出，“这是因为 ‘edit_user’ 能力并不支持 authorize.conf 配置文件中的 ‘grantableRoles’ 设置，因此会阻止此类场景发生。”  
  
位于Splunk 守护进程中的拒绝服务漏洞CVE-2023-32706 的严重性次之。当配置不正确的 XML 解析器接收 SAML 认证中特殊构造的消息时，会触发该漏洞。输入中包含一个实体扩展的引用，递归引用可能导致 XML 解析器使用机器上所有可用的内存，从而导致守护进程崩溃或处理终止。  
  
另外一个高危漏洞是HTTP响应拆分漏洞CVE-2023-32708，可导致低权限用户访问系统上的其它 REST 端点并查看受限制内容。  
  
上周四，Splunk 公司还修复了位于 Splunk 企业版中第三方程序包中的多个严重漏洞。这些第三方程序包包括 Libxml2、OpenSSL、Curl、Libarchive、SQLite、Go等等。其中某些漏洞遭公开的时间已经超过四年。  
  
所有这些漏洞均已在 Splunk 企业版 8.1.14、8.2.11和9.0.5中修复。同时这些更新还修复了多个中危漏洞。上周四，Splunk 还修复了位于 Splunk App for Lookup File Editing 和 Splunk App for Stream 中的多个高危漏洞，以及修复了位于 Splunk Universal Forwarders 和 Splunk Cloud 中所使用的第三方包中的严重漏洞。  
  
****  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511052&idx=3&sn=fb116392e405ae62e6c339117fffdb59&chksm=ea949d66dde31470758b6ee8f9dbecdb67ef6c0c8af277f26b83b60dbac95748d28db787a4b4&scene=21#wechat_redirect)  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[Splunk Enterprise远程代码执行漏洞(CVE-2022-43571)安全风险通告](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515098&idx=1&sn=7b7050c4fa7d69ee3c61c18f54cbdfeb&chksm=ea948ab0dde303a63d8d84545dc9f8613de167d1120716524c2a2990810c3dc4e62d883ae136&scene=21#wechat_redirect)  
  
  
[千年虫← 2000, 2020→千年虫现身Splunk 平台，立即修复！](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247491676&idx=2&sn=a8b1e588f51a6358298cde5d66b062fc&chksm=ea94d136dde358203977f1fbb7a4d8cb81e5223e487c15160e6b6f1911e500bf0aaee906971a&scene=21#wechat_redirect)  
  
  
[Splunk以1.9亿美元收购安全创业公司Caspida](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247485927&idx=6&sn=d7271606cbb72b8156979be7e0b3a7a5&chksm=ea97388ddde0b19b07445ce51dfe239812937fc94595f82a909584dc8ec0906acd4d6f76e1da&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://www.securityweek.com/high-severity-vulnerabilities-patched-in-splunk-enterprise/  
  
  
题图：Pexels License  
  
  
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
