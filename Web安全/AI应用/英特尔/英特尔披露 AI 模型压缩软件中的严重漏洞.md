---
source: "gelusus/wxvl 公众号漏洞文库"
title: "英特尔披露 AI 模型压缩软件中的严重漏洞"
product: "Intel Neural Compressor"
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
id: "vw-a94e878c5186a111eeec0f9b"
entity_id: "ve-a94e878c5186a111eeec0f9b"
schema_version: "1"
---

# 英特尔披露 AI 模型压缩软件中的严重漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 主漏洞22476与21792需分列，UEFI漏洞属背景
- 正文称2.5.0修复但无厂商公告链接
- 缺具体受影响输入和函数
- 压缩与隔离术语翻译不准确，不能推导根因
- 广告和无关推荐应剥离

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

Jai Vijayan  代码卫士   2024-05-20 17:37  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**英特尔称用于AI模型压缩的 Intel Neural Compressor 某些版本中存在一个CVSS评分为10分的严重漏洞 CVE-2024-22476。**  
  
  
  
该漏洞可导致未认证攻击者在运行受影响软件的英特尔系统上执行任意代码。该漏洞是英特尔公司上周所披露的十几个漏洞中最为严重的。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMTBvibQLiaOydVnsqNvLatP1HGnD0fun5bERPMxFKqyA7Q2MRfR5jzsk4WIUywAAViahq99oUPVkklag/640?wx_fmt=gif&from=appmsg "")  
  
**输入验证不当**  
  
  
  
  
  
英特尔公司表示，该漏洞是因为输入验证不当（或用户输入清洁不当）造成的。由于该漏洞可在复杂度较低的攻击中遭远程利用且在数据机密性、完整性和可用性方面造成较大影响，因此英特尔将该漏洞的CVSS评分评级为满分10分。攻击者无需任何特殊权限，也无需用户交互即可利用该漏洞。  
  
该漏洞影响 Intel Neural Compressor 2.5.0之前的版本。英特尔安全建议组织机构用户升级至2.5.0及后续版本。英特尔发布安全公告指出，该漏洞是从一名外部安全研究员或实体处获悉的，但并未透露具体信息。  
  
Intel Neural Compressor 是一款开源 Python 库，有助于为多项任务如计算机视图、自然语言处理、推荐系统以及其它用例压缩并优化深度学习模型。压缩技术包括神经网络减少，或者删除最不重要的参数；通过进程调用隔离的方式减少内存要求；并将更大的模型植入性能类似的更小模型中。AI模型压缩技术的目的是助力在多种硬件设备上部署AI应用程序，包括计算能力有限或受限制的设备，如移动设备。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMTBvibQLiaOydVnsqNvLatP1HGnD0fun5bERPMxFKqyA7Q2MRfR5jzsk4WIUywAAViahq99oUPVkklag/640?wx_fmt=gif&from=appmsg "")  
  
**其它漏洞**  
  
  
  
  
  
CVE-2024-22476只是英特尔 Neural Compressor 软件中的两个漏洞之一，目前补丁已发布。另外一个CVE漏洞是CVE-2024-21792，它是TOCTOU缺陷，可导致信息遭泄露。英特尔表示就目前情况来看，该漏洞的风险仅为中等，攻击者必须已经拥有对易受攻击系统的本地认证访问权限。  
  
除了这些位于 Neural Compressor 中的漏洞外，英特尔还发布了位于UEFI 固件中的五个高危漏洞。它们的编号是CVE-2024-22382、CVE-2024-23487、CVE-2024-24981、CVE-2024-23980和CVE-2024-22095，均为输入验证漏洞，严重性评分从7.2到7.5不等。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMTBvibQLiaOydVnsqNvLatP1HGnD0fun5bERPMxFKqyA7Q2MRfR5jzsk4WIUywAAViahq99oUPVkklag/640?wx_fmt=gif&from=appmsg "")  
  
**不断涌现的AI漏洞**  
  
  
  
  
  
这些Neural Compressor 漏洞佐证了安全分析师最近所述的AI软件和工具正在企业中制造的正在扩展但常被忽视的攻击面。目前关于AI软件的安全担忧主要集中在使用大语言模型和启用LLM的聊天机器人如ChatGPT带来的风险。去年。研究人员发布了多份关于这些工具易受模型操纵、越狱以及其它多种威胁的可能性报告。  
  
相比而言，截止目前，人们对用于构建和支持AI产品和平台所使用的某些核心软件组件和基础设施中的漏洞关注度不高。例如，Wiz 公司的研究人员发现了 huggingFace 平台中的多个弱点，它们可导致攻击者篡改注册表中的模型或相对容易地上传被武器化的模型。英国科学、创新和技术部在所资助的一项研究中发现了从软件设计阶段到开发、部署和维护所有生命周期中使用AI技术所存在的多种潜在网络风险。这些风险包括未能开展正确的威胁建模以及未能在设计阶段保证认证和授权安全、代码漏洞、安全处理不安全、输入验证不当等问题。  
  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[虚惊一场？英特尔为几乎所有现代 CPU 发布神秘补丁](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516496&idx=1&sn=abeb68405b9da13d650993ec601fb8b3&chksm=ea94b03adde3392c43f6bd1b06a329aa3f7b78ddbef6ba95f53374665a1407048938901c0e4b&scene=21#wechat_redirect)  
  
  
[ÆPIC Leak：英特尔CPU中的架构漏洞泄露机密数据](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513509&idx=2&sn=b745758188993ff6e6d51a4ac6dfb3a5&chksm=ea9484cfdde30dd96a8bc16bc1440917d0346f87c82b9669b457494dfc81f9637a6810cb4bd6&scene=21#wechat_redirect)  
  
  
[Retbleed：针对英特尔和AMD处理器的推断性执行攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512889&idx=3&sn=645a6adc37050f76571e2cf1043659e9&chksm=ea948253dde30b45023fc8b066c2420844a7cfd7b7197f46be2df789dea706f9e2ec61674969&scene=21#wechat_redirect)  
  
  
[RSAC 2024观察：软件供应链安全进入AI+时代](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519497&idx=1&sn=3f531af375c16bd26e01ca94f96d2f6b&chksm=ea94bc63dde33575a6c7f4e47536c932046c465934273303f37535c57d30f3fe32e5335b2de5&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://www.darkreading.com/cyber-risk/intel-discloses-max-severity-bug-in-its-ai-model-compression-software  
  
  
题图：  
Pexels  
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
