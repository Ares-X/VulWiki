---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Oracle 修复已遭利用的 Agile PLM 0day"
product: "Oracle Agile PLM Framework"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2024-21287"
referenced_identifiers: ""
identifier_role: "primary"
cve: "CVE-2024-21287"
prerequisites: "9.3.6；HTTP可达；无认证；读取PLM应用账户有权读取的文件"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-24b502081ed4da3a33ef10dc"
entity_id: "ve-24b502081ed4da3a33ef10dc"
schema_version: "1"
---

# Oracle 修复已遭利用的 Agile PLM 0day

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：9.3.6；HTTP可达；无认证；读取PLM应用账户有权读取的文件
- 证据范围：厂商确认在野，技术细节未公开，文中如实说明

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- P0错归Oracle MySQL Server，应是Agile PLM企业应用
- 缺Oracle专项公告/补丁链接；支持终止日期应核原厂政策
- 保持应用权限范围，不扩大到所有系统文件
- 去除推荐文章/广告噪声

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

Ionut Arghire  代码卫士   2024-11-21 09:35  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**本周，Oracle 修复了位于 Agile 产品生命周期管理 (PLM) 中的、已遭利用的高危信息泄露漏洞CVE-2024-21287（CVSS评分7.5）。**  
  
![](../../.resource/remote/15833d6ff6417a682828aa8142617c69c11d57faa2a16257b85ccde14b06ea35.gif "")  
  
  
该漏洞影响 Agile PLM 9.3.6版本，可在未认证的情况下遭远程利用。Oracle 在安全公告中致谢报送该漏洞的CrowdStrike公司研究员 Snape 和 Lutz Wolf，而 Oracle 安全保证副总裁 Eric Maurice 披露称发现该漏洞已遭在野利用。  
  
Maurice 表示，“如遭成功利用，未认证的攻击者可从目标系统下载PLM应用权限可访问的文件。”  
  
Oracle 公司表示，具有对 HTTP 协议网络访问权限的远程未认证攻击者，可轻松利用 CVE-2024-21287访问关键数据或者对 Agile PLM Framework 所有可访问数据获得完整的访问权限。该公司在安全公告中提到，“Oracle 强烈建议客户尽快应用该安全告警中提供的更新。”  
  
Oracle 或 CrowdStrike 公司均未分享该漏洞的技术详情以及在野观察到的利用信息。目前为止，这两家公司均未回复相关问询。  
  
Agile PLM大约在20年前推出，为组织机构团队提供产品数据和流程管理协作能力。2024年4月，Oracle 公司表示将弃用该产品，在2027年12月31日结束对该产品的付费支持服务。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Oracle Fusion 中间件漏洞已遭在野利用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514824&idx=1&sn=3fd1913ac46de09f233cf839e57a61d1&chksm=ea948ba2dde302b4e0977f923e129a7f7380d2b6b1419732de8244e5542322e17d41a6242396&scene=21#wechat_redirect)  
  
  
[Pwn2Own 大赛赐我灵感，让我发现仨Oracle VirtualBox 漏洞，其中俩提权](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247509396&idx=1&sn=09b11f725ded56f10eeadd369fc07c50&chksm=ea9494fedde31de8931022db99114fb8daa81e316236072167a1c183754fbf4da77c1d671e44&scene=21#wechat_redirect)  
  
  
[Oracle 警告：Weblogic 服务器中含有多个可遭远程利用的严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247506536&idx=2&sn=68965a70130088ebfe03c8e0bf0a6557&chksm=ea94eb02dde36214b398993f4522a730741a4d7de798294e42de3ed6944a7b8f901e066b3047&scene=21#wechat_redirect)  
  
  
[朝鲜黑客被指从黑市购买Oracle Solaris 0day，入侵企业网络](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247496657&idx=2&sn=27658cff17f89a0c1f5e185c4bd67a56&chksm=ea94c2bbdde34badf6d540a96b351fcb3be1fa6e2ee4b3d009ab07196ec71ab4a302c1448f3b&scene=21#wechat_redirect)  
  
  
[奇安信代码卫士帮助微软和 Oracle 修复多个高危漏洞，获官方致谢](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247494066&idx=1&sn=b5425e8a3cdf93914c19274f0a915ab6&chksm=ea94d8d8dde351ceecd5b097ba4104962025df723ffa5a7f6a314d083e63c92a2f3bac5ae892&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://www.securityweek.com/oracle-patches-exploited-agile-plm-zero-day/  
  
  
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
