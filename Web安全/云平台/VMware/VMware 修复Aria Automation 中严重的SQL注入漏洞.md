---
source: "gelusus/wxvl 公众号漏洞文库"
title: "VMware 修复Aria Automation 中严重的SQL注入漏洞"
product: "VMware Aria Automation"
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
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-fae9e69f9c5708d8824064a2"
entity_id: "ve-fae9e69f9c5708d8824064a2"
schema_version: "1"
---

# VMware 修复Aria Automation 中严重的SQL注入漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 正文22280未提取
- 认证要求明确应字段化
- 8.x/VCF4/5范围太粗缺具体补丁
- 仅二手SecurityWeek无厂商公告
- 没有PoC定位公告，营销推荐剥离

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

Ryan Naraine  代码卫士   2024-07-11 17:21  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**本周三，VMware 修复了位于 Aria Automation 产品中的一个高危SQL注入漏洞，并提醒称认证的恶意用户可利用该漏洞操控数据库。**  
  
  
  
该漏洞的编号是CVE-2024-22280，攻击者通过特殊构造的SQL查询可在数据库中越权读写。该漏洞的CVSS评分为8.5。受影响产品包括 VMware Aria Automation 8.x 和 VMware Cloud Foundation 5.x和4.x版本。  
  
VMware 在安全公告中提到，“VMware Aria Automation 未应用正确的输入验证，从而导致SQL注入。认证的恶意人员可输入特殊构造的SQL查询并在数据库中执行越权读写操作。”  
  
VMware 表示该漏洞已由研究人员私下报送给魁北克政府网络防御中心。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[VMware 修复多个严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519781&idx=1&sn=6951e2970725eafcd08fdb56f31e3df5&chksm=ea94bf4fdde3365926e476e57a166e8c5b13f60a4955215555a3a20948faf68e83c949a669da&scene=21#wechat_redirect)  
  
  
[VMware 修复Workstation 和 Fusion 产品中的多个漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519506&idx=2&sn=15447e0bd14688896d0aac2ef6d85333&chksm=ea94bc78dde3356e2862d49586a76b04a8277c3e27ee0cbad93ba1906c685c4e45d848bd682a&scene=21#wechat_redirect)  
  
  
[VMware修复多个严重的ESXi 沙箱逃逸漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519003&idx=2&sn=c494f1df6adfe5a6b91c813d2d236c8c&chksm=ea94ba71dde3336793921a1d4a9852067a51546a77a39e5c25ed0836ffe1f6e0706fb9618530&scene=21#wechat_redirect)  
  
  
[VMware督促管理员删除易受攻击的认证插件](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518869&idx=2&sn=accd15841c79ae4dc71415f736248c4a&chksm=ea94bbffdde332e9e7711a1bdb39f702a4a132456726e5e95a074e4055c5280db304ea16187d&scene=21#wechat_redirect)  
  
  
[VMware 披露严重的VCD Appliance认证绕过漏洞，无补丁](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518139&idx=2&sn=4951a6280d077d8cd04309f6629182e3&chksm=ea94b6d1dde33fc71b53f7879454b257d922f83689acde6d310a195b1857f38098ca7685fcca&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
  
https://www.securityweek.com/vmware-patches-critical-sql-injection-flaw-in-aria-automation/  
  
  
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
