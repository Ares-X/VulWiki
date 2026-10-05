---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Apache Avro SDK 中存在严重漏洞，可导致在 Java 应用中实现RCE"
product: "Apache Avro Java schema解析"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2024-47561"
referenced_identifiers: "CVE-2024-38856; CVE-2024-36104"
identifier_role: "primary"
cve: "CVE-2024-47561"
prerequisites: "应用允许不可信Avro schema且走相关ReflectData/SpecificData处理，classpath和调用路径决定RCE"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-18e58001be665c3d25fdf5b0"
entity_id: "ve-18e58001be665c3d25fdf5b0"
schema_version: "1"
---

# Apache Avro SDK 中存在严重漏洞，可导致在 Java 应用中实现RCE

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：应用允许不可信Avro schema且走相关ReflectData/SpecificData处理，classpath和调用路径决定RCE
- 证据范围：限定Java实现和schema可控，不是所有Avro文件或所有语言受影响；无PoC是报道时点

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 主CVE缺元数据；ReflectDat应ReflectData且这些是类不是指令
- 架构/图式/图示混译schema，avroAvro重复
- 笼统清理schema不足完整缓解，需官方安全处理建议
- <1.11.4与1.12.0修复分支关系可明确，不把所有更高版本一概推定

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

THN  代码卫士   2024-10-08 17:31  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Apache Avro Java SDK 中存在一个严重漏洞 (CVE-2024-47561)，如被成功利用可导致攻击者在可疑实例上执行任意代码。**  
  
  
![](../../.resource/remote/f06e2f5274cab008783f77e65bebe04443c456536ad86c5e57464501ce34c984.png "")  
  
  
该漏洞影响 Apahe Avro Java SDK所有1.11.4之前的版本。项目维护人员在上周发布的安全公告中提到，“在 Apache Avro 1.11.3和之前版本 Java SDK中的架构解析可导致恶意人员执行任意代码。建议用户升级至修复了该问题的1.11.4或1.12.0版本。”  
  
Apache Avro 类似于谷歌的 Protocol Buffers (protobuf)，是一款向大规模数据处理提供不分语言的数据序列化框架。Avro 团队表示，任何一款应用只要允许用户提供自己的 Avro 图式进行解析，就会受影响。Databricks 安全团队的研究员 Kostya Kortchinsky 发现并报送了该漏洞。  
  
作为缓解措施，建议用户在解析前清理图式，并避免解析由用户提供的图式。Qualys公司的威胁研究经历 Mayuresh Dani 在一份声明中提到，“CVE-2024-47561在反序列化通过 avroAvro 图示接收的输入时，影响 Apache Avro 1.11.3和之前版本。处理来自威胁行动者的此类输入导致代码执行后果。从我们的威胁情报来看，目前尚不存在 PoC，但通过 ReflectDat 和 SpecificData 指令处理包时会触发该漏洞，且该漏洞可通过 Kafka 进行利用。Apache Avro 是一款开源项目，很多组织机构都在使用它。从公开可获取的数据来看，这些机构多数位于美国。如不修复、不监督、不防范该漏洞，则会造成很多安全后果。”  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[CISA 提醒注意已遭利用的 Apache HugeGraph-Server 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520886&idx=1&sn=d50fe47ebc8b4ad640aab8d8ead453e4&chksm=ea94a31cdde32a0a3cb660901fbb4949d1bd11b55a7718fcf71f3c28cf274e27bc3e091b0c27&scene=21#wechat_redirect)  
  
  
[Apache 修复严重的 OFBiz 远程代码执行漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520714&idx=2&sn=a3784b5b2245f1449edaefa3064d676f&chksm=ea94a0a0dde329b6ca2b17012b7eb003867fd983c6abcc5e7fde821968dec1ea86592860496c&scene=21#wechat_redirect)  
  
  
[【已复现】Apache OFBiz 授权不当致代码执行漏洞(CVE-2024-38856)安全风险通告](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520334&idx=2&sn=db306ee3ac03c2a6708b7ae1cc72beaf&chksm=ea94a124dde32832c4479a4e205381dc87f02c98b62b21ceb6a18b70624d029f055e06ba57b2&scene=21#wechat_redirect)  
  
  
[Apache 修复 Apache HTTP Server 中的源代码泄露漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520009&idx=1&sn=b958a0460ffa3e890f8c189660f04487&chksm=ea94be63dde337752a7dace28761adae32e92abbff78ddbb4dba723691c1d4eb489dd3e5deb2&scene=21#wechat_redirect)  
  
  
[【已复现】Apache OFBiz 路径遍历漏洞(CVE-2024-36104)安全风险通告](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519685&idx=5&sn=cd7840386d236e97bc419b0a943f9d25&chksm=ea94bcafdde335b99fff79a2689e78cb78922997a12f87792bff03a1861af54f7ec49cf32f44&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://thehackernews.com/2024/10/critical-apache-avro-sdk-flaw-allows.html  
  
  
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
