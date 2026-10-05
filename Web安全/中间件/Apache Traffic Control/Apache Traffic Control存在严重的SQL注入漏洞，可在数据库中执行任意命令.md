---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Apache Traffic Control存在严重的SQL注入漏洞，可在数据库中执行任意命令"
product: "Apache Traffic Control Traffic Ops"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2024-45387"
referenced_identifiers: "CVE-2024-23945; CVE-2024-43441; CVE-2024-56337"
identifier_role: "primary"
cve: "CVE-2024-45387"
prerequisites: "已有admin/federation/operations/portal/steering角色用户，8.0.0–8.0.1"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-8476e88ad5a598b33a7a83b0"
entity_id: "ve-8476e88ad5a598b33a7a83b0"
schema_version: "1"
---

# Apache Traffic Control存在严重的SQL注入漏洞，可在数据库中执行任意命令

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：已有admin/federation/operations/portal/steering角色用户，8.0.0–8.0.1
- 证据范围：主体有鉴权前提和8.0.2修复版本；任意SQL语句不等于任意OS命令。后三编号是并列新闻简讯，不与主漏洞合并。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 标题任意命令容易误解，宜明确SQL命令
- 未给注入参数/请求示例、Apache原始公告直链，只能当新闻
- 大量产品广告与推荐文章噪声

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

综合编译  代码卫士   2024-12-26 10:23  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Apache 软件基金会 (ASF) 已发布安全更新，修复了 Traffic Control 中的一个严重漏洞CVE-2024-45387（CVSS评分9.9）。该漏洞可导致攻击者在数据库中执行任意SQL命令。**  
  
  
![](../../.resource/remote/26d5a8ed0658bbcb99a3ea0a76399cc3e169d4b464fad40bcf233f2abbbbb5df.png "")  
  
  
  
项目维护人员在一份安全公告中提到，“Apache Traffic Control <=8.0.1、>=8.0.0中存在一个SQL注入漏洞，可导致角色为 ‘admin’、’federation’、’operations’、‘portal’ 或 ’steering’ 的权限用户，通过发送特殊构造的PUT请求，在数据库中执行任意SQL命令。” 该漏洞已在 Apache Traffic Control 8.0.2中修复。  
  
Apache Traffic Control 是内容交付网络 (CDN) 的一种开源实现，在2018年6月被宣布为一个顶层项目。  
  
ASF还修复了Apache Hive 和 Apache Spark 中的另外一个严重漏洞CVE-2024-23945（CVSS评分8.7），它影响用于保护cookie完整性的 CookieSigner 安全机制，当信息验证失败时会暴露合法的cookie签名，可能导致恶意人员进一步利用系统。  
  
此前，ASF还修复了位于Apache HugeGraph-Server 1.0至1.3版本中的一个认证绕过漏洞 (CVE-2024-43441)，该修复方案已在 1.5.0中发布。另外该基金会还修复了Apache Tomcat 中的一个重要漏洞 (CVE-2024-56337)，在一定条件下该漏洞可导致RCE后果。  
  
建议用户将实例更新至最新版本，免受潜在威胁。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Apache Tomcat 漏洞导致服务器易受RCE攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521893&idx=1&sn=867f98595849107577a98fcaf043a177&scene=21#wechat_redirect)  
  
  
[Apache修复 Struts 2 中的严重 RCE 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521787&idx=1&sn=aa7443d590ca0182f0cbd4386c81152a&scene=21#wechat_redirect)  
  
  
[Apache Avro SDK 中存在严重漏洞，可导致在 Java 应用中实现RCE](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520994&idx=1&sn=0feb249fd14e6b8b07d5d6531f3287c2&scene=21#wechat_redirect)  
  
  
[CISA 提醒注意已遭利用的 Apache HugeGraph-Server 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520886&idx=1&sn=d50fe47ebc8b4ad640aab8d8ead453e4&scene=21#wechat_redirect)  
  
  
[Apache 修复严重的 OFBiz 远程代码执行漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520714&idx=2&sn=a3784b5b2245f1449edaefa3064d676f&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://thehackernews.com/2024/12/critical-sql-injection-vulnerability-in.html  
  
  
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
