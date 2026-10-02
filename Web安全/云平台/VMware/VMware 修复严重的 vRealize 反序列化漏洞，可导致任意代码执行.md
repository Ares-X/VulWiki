---
source: "gelusus/wxvl 公众号漏洞文库"
title: "VMware 修复严重的 vRealize 反序列化漏洞，可导致任意代码执行"
product: "VMware Aria Operations for Logs"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。"
id: "vw-4a08d239dcd92cff03aa9398"
entity_id: "ve-4a08d239dcd92cff03aa9398"
schema_version: "1"
---

# VMware 修复严重的 vRealize 反序列化漏洞，可导致任意代码执行

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 主CVE均缺元数据
- 20864只8.10.2与20865其他版本不可混影响范围
- 20865需管理员而20864无认证
- 31706/31704/31711/31710为背景链另行关联
- 不存在在野证据是2023时点状态
- 补厂商公告并清广告

### 操作风险与资料使用

- 含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

Sergiu Gatlan  代码卫士   2023-04-21 16:30  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
****  
**VMware 公司修复了一个严重的 vRealize Log Insight 漏洞 (CVE-2023-20864)，可导致远程攻击者在易受攻击的设备上执行代码。**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQtVbLwfmWoaA42wRH8Ea7V1xvmO6721AMicuC63NqN4b8e5KVBekkqY5MTIL7ThLpYpmTB1D2nEmA/640?wx_fmt=gif "")  
  
  
VRealize Log Insight 现名为 VMware Aria Operations for Logs。这块日志分析工具有助于管理大规模环境中数TB 的应用和基础设施日志。  
  
该漏洞是一个反序列化漏洞，可被滥用于以 root 身份在受陷系统上执行任意代码。未认证攻击者可在复杂度不高的攻击中远程利用该漏洞。  
  
VMware 还发布了另外一个漏洞CVE-2023-20865的安全更新。该漏洞可导致具有管理员权限的远程攻击者以 root 身份执行任意命令。  
  
这两个漏洞均在 VMware Aria Operations for Logs 8.12 版本中修复。目前尚未有证据表明它们已遭在野利用。VMware 指出，“CVE-2023-20864是一个严重问题，用户应当按照公告中提出的指南立即修复。另外需要强调的是，仅有版本8.10.2受影响。VMware Aria Operations for Logs 的其它版本受CVE-2023-20865影响，不过该漏洞的CVSS评分更低，为7.2。”  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQtVbLwfmWoaA42wRH8Ea7V7yhJg7QsfKKEdiaEInTl0InZNXByBwRsuhJuOe3alGOqYcxTUOaxmyQ/640?wx_fmt=gif "")  
  
**1月修复的其它两个严重的 vRealize 漏洞**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQtVbLwfmWoaA42wRH8Ea7Vj1zjne7RRIOOrSkssXls2cjChbsE8rQUWl23OlpdVG3331r6d8HXiag/640?wx_fmt=gif "")  
  
  
  
1月份，VMware 公司还修复了另外两个严重的 vRealize 漏洞CVE-2022-31706和CVE-2022-31704，它们均可导致远程代码执行后果。另外1月还修复了可导致信息窃取和拒绝服务攻击的CVE-2022-31711和CVE-2022-31710。  
  
一周后，Horizon3 Attack Team 发布了可组合利用上述四个漏洞的 PoC，有助于攻击者以 root 身份在受陷的 vRealize 设备上远程执行代码。虽然仅有几十台 vRealize 实例被暴露，但这些设备仅可从组织机构网络内部中访问。然而，攻击者利用已受陷网络中设备漏洞的情况并不少见，从而导致正确配置但仍受攻击的 VMware 设备成为有价值的内部目标。  
  
  
  
****  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQZeSribxs2yU1w56EMvgX9cDBCiabniazxdxtQ25cBCAd5vBJIM2sOv1khjzwwViaT0pS74U6piaiauiaGA/640?wx_fmt=png "")  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511052&idx=3&sn=fb116392e405ae62e6c339117fffdb59&chksm=ea949d66dde31470758b6ee8f9dbecdb67ef6c0c8af277f26b83b60dbac95748d28db787a4b4&scene=21#wechat_redirect)  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[VMware 修复严重的Carbon Black App Control漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515674&idx=1&sn=a2545f99534c8c181bb5022bbc3989e1&chksm=ea948f70dde306661e8a7532ffad9fe411f3cd1cbcb74c5ae58c6e4f394d04247cb807e3ce08&scene=21#wechat_redirect)  
  
  
[VMware 修复严重的ESXi和vRealize 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515027&idx=2&sn=d86995b203eb6824e5179dc7d57b8bce&chksm=ea948af9dde303ef8f28410ce0027472253b95bbd9447f1a2c538a07bda78c61567e5252f1e7&scene=21#wechat_redirect)  
  
  
[VMware：速修复这三个严重的 Workspace ONE Assist 软件漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514441&idx=2&sn=a6a4722590de8e046966eacff21ccc02&chksm=ea948823dde301350f7cab83e012dd91120da7da9ed74b0e8ad2b487f5358c0361971fe016a4&scene=21#wechat_redirect)  
  
  
[VMware修复 Cloud Foundation 中严重的RCE漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514329&idx=2&sn=320754664bbfb1ae127935003f156e17&chksm=ea9489b3dde300a537dc099256a73b6bcdaef1042e63e800592971b520edea0440b6fe35db22&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/vmware-fixes-vrealize-bug-that-let-attackers-run-code-as-root/  
  
  
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
