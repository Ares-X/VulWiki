---
source: "gelusus/wxvl 公众号漏洞文库"
title: "网络基础设施 Acronis 中的严重漏洞已遭在野利用"
product: "Acronis Cyber Infrastructure"
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
id: "vw-67b178e67b2254a024a2c4b3"
entity_id: "ve-67b178e67b2254a024a2c4b3"
schema_version: "1"
---

# 网络基础设施 Acronis 中的严重漏洞已遭在野利用

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 45249未进元数据
- 五个build应按对应分支比较不可并为全局小于最大值
- 默认密码到RCE缺入口/前提说明
- 在野是2024年声明，需厂商公告引用
- 营销/推荐剥离

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

Ionut Arghire  代码卫士   2024-07-30 18:10  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**网络安全公司 Acronis 提醒称，其网络基础设施 (ACI) 产品受一个严重漏洞 (CVE-2023-45249) 影响。该漏洞目前已修复，已遭在野利用。**  
  
![](../../.resource/remote/f38794453d7ae020fb8fd82d55eebc868cae890eece1e9c7d36341ec1c1b978b.gif "")  
  
  
该漏洞的CVSS评分为9.8，是因使用默认密码引发的远程代码执行 (RCE) 漏洞。该漏洞影响如下 ACI：  
  
- < build 5.0.1-61  
  
- < build 5.1.1-71  
  
- < build 5.2.1-69  
  
- < build 5.3.1-53  
  
- < build 5.4.4-132  
  
  
  
目前尚不存在关于该漏洞如何被用于真实网络攻击的详情以及利用该漏洞的攻击者的身份信息。不过该公司在上周更新的安全公告中证实了该漏洞遭活跃利用的报告，“该漏洞已知已遭在野利用”。  
  
建议受影响用户升级至最新版本以缓解潜在威胁。  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Ollama AI 基础设施工具中存在严重的RCE漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519855&idx=1&sn=7088d05b2e6a3cdf56986e480ea5119e&chksm=ea94bf05dde3361305094408f06ff54a8d271116378e3c9f710153b2dcb7f133fb984b7373ff&scene=21#wechat_redirect)  
  
  
[CISA：Sisense事件也影响关键基础设施，或引发供应链攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519274&idx=2&sn=1e4ab289a236019dcd29441ea2c972a9&chksm=ea94bd40dde334567d7f43c6b232181f011cec4f0aabc3ec5af3f4a138a1add0c38f16d957fa&scene=21#wechat_redirect)  
  
  
[因关键基础设施遭攻击，美国制裁六名伊朗情报人员](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518831&idx=2&sn=052aecfbd5673b6a5137c49bfa5f25f9&chksm=ea94bb05dde33213334753137a7d8623227cc2f0265ec0d26611f39251d7ae9048551dcadbe8&scene=21#wechat_redirect)  
  
  
[Sierra:21 漏洞影响关键基础设施路由器](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518302&idx=2&sn=cdf6b4ed956472e8f544b57d5e1ea074&chksm=ea94b934dde33022986046f72cc06f57a56d288c1d50adebad5308a072310a717ba8358c1480&scene=21#wechat_redirect)  
  
  
[Veeam修复严重漏洞，可攻陷备份基础设施](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515885&idx=3&sn=ffefe13a8f5da2c680df756b9e641cfd&chksm=ea948f87dde30691fda5efbd07f068606a775eb6e6e596b39f44c7f1cd843a4c64a24c1a88a7&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://thehackernews.com/2024/07/critical-flaw-in-acronis-cyber.html  
  
  
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
