---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "reference"
primary_identifiers: ""
referenced_identifiers: "CVE-2024-9143"
identifier_status: "unknown"
title: "Fuzzing 升级：谷歌通过AI找到更多漏洞"
product: "Google OSS-Fuzz AI流程"
record_type: "advisory"
document_type: "研究新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "历史报道2024-11；OpenSSL漏洞仅作为AI发现实例，无具体受影响API部署范围"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/Fuzzing%20%E5%8D%87%E7%BA%A7%EF%BC%9A%E8%B0%B7%E6%AD%8C%E9%80%9A%E8%BF%87AI%E6%89%BE%E5%88%B0%E6%9B%B4%E5%A4%9A%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://www.theregister.com/2024/11/20/google_ossfuzz/"
id: "vw-7ce3ec148caf3939c6040979"
entity_id: "ve-7ce3ec148caf3939c6040979"
schema_version: "1"
---

# Fuzzing 升级：谷歌通过AI找到更多漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Google OSS-Fuzz AI流程
- 文献类型：研究新闻
- 版本、权限及部署边界：历史报道2024-11；OpenSSL漏洞仅作为AI发现实例，无具体受影响API部署范围
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 此篇是模糊测试研究新闻，不是OSS-Fuzz自身漏洞，9143应是案例关联
2. 将现有人类编写fuzz目标漏检夸大成人类无法通过fuzzing发现，正文引用实际限定现有targets，应收敛
3. 2024开源OSS-Fuzz与开源LLM增强实验项目混淆可能；OpenSSL严重程度及26个bug是否全部安全漏洞需原始Google/OpenSSL源校验
4. 有TheRegister原文而无Google原博客；删除产品试用/推荐噪声，保留当时自动化前4步而补丁尚计划的边界

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.theregister.com/2024/11/20/google_ossfuzz/>
- 原文参考链接（未重新核验）：<https://codesafe.qianxin.com>
- 原文参考链接（未重新核验）：<https://oss.qianxin.com>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521381&idx=1&sn=dda99ba77206503fe0e0b1c0e5a0a35b&chksm=ea94a50fdde32c1962a406f9ce6e4f93f34ce95f0f4a77c0ceb6e383f9a6284d442c57816e28&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521523&idx=2&sn=9222522f67aa6bada64bed055a3adfeb&chksm=ea94a599dde32c8f8d8f5599323d8cc50d3bb12bb0716412c69e77986c4f0d238aea4efec5fa&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521484&idx=1&sn=19327f5e0d0275273114fd7a7e37da3f&chksm=ea94a5a6dde32cb0f0b1bd0f310958066fd5a8549d8aedabac5528fbd6f1b55d985e8385ecf6&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521331&idx=1&sn=e13cd9f9dccd9d17953e551df9108205&chksm=ea94a559dde32c4f32a18c5ad4c3a2fc98f17fb29f69f73cac5c613c67ae28f36ab473d14936&scene=21#wechat_redirect>

### 归档技术正文

Thomas Claburn  代码卫士   2024-11-25 09:58  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**谷歌的 OSS-Fuzz 项目使用大语言模型 (LLMs) 助力找到代码仓库中的漏洞，目前已识别出26个漏洞，包括在使用广泛的 OpenSSL 库中的一个严重漏洞。**  
  
该 OpenSSL 漏洞 (CVE-2024-9143) 在9月中旬报送，并在一个月之后修复。一些（并非所有）漏洞也已得到修复。谷歌认为其受AI驱动的fuzzing（模糊测试，将异常或随机数据注入软件中以捕获错误）工具找到了人类无法通过fuzzing找到的错误。  
  
谷歌开源安全团队的研究员 Oliver Chang、Dongge Liu 和 Jonathan Metzman 在一份博客文章中提到，“就我们所知，这个漏洞可能已存在20年且以人类编写的现有fuzz目标而言是无法发现的。”如所言属实，那么安全研究真的应该纳入AI的使用，以免威胁人员已经这么做了，并找到人类无法找到的缺陷。谷歌还援引了另外一个案例，即位于 cJSON 项目中的一个 bug 据称也是由AI发现但被人类所编写的fuzzing测试错过的 bug。  
  
因此，AI协助似乎对于安全专业人员而言价值巨大。谷歌本月早些时候宣布，另外一个基于LLM的捕获工具 Big Sleep 首次从真实软件中找到一个此前未知的可利用的内存安全缺陷。10月份，Protect AI 也发布了一款开源工具 Vulnhuntr，它利用 Anthropic 公司研发的 Claude LLM 从基于Python的项目中找到 0day漏洞。  
  
OSS-Fuzz 团队在2023年8月引入基于AI的fuzzing，旨在fuzz 更大比例的代码库，以提升fuzzing覆盖率即所测试的代码数量。Fuzzing的流程涉及编写 fuzzing 目标，即“接受字节数组并使用在测的API与这些字节共同做一些有趣事情的函数”，之后处理潜在的编译问题和运行fuzzing目标查看其如何执行、修正和重复该流程，查看这些崩溃能否追溯到特定的漏洞。  
  
OSS-Fuzz 最初处理了前两个步骤：（1）编写初始fuzz目标，和（2）修复引发的任何编译问题。之后在2024年开始，谷歌开源了 OSS-Fuzz 并尝试改进该软件处理后续步骤的方法：（3）运行 fuzz 目标以查看其如何执行并修复任何可引发运行时问题的明显错误；（4）在更长的时间内运行已修正的 fuzz 目标并对崩溃情况进行分类，判断其根因；以及（5）修复漏洞。  
  
谷歌提到，其LLM目前可处理前四个fuzzing流程，计划不久后处理第5个步骤。Chang、Liu 和 Metzman 提到，“目标是通过LLM生成漏洞补丁建议，完全自动化整个工作流。虽然我们今天没有任何可以分享的内容，但我们正在与各个领域的研究员协作实现这一目标并期待不久可以分享结果。”  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[从Naptime到Big Sleep：通过大语言模型捕获真实代码中的漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521381&idx=1&sn=dda99ba77206503fe0e0b1c0e5a0a35b&chksm=ea94a50fdde32c1962a406f9ce6e4f93f34ce95f0f4a77c0ceb6e383f9a6284d442c57816e28&scene=21#wechat_redirect)  
  
  
[DHS发布在关键基础设施安全开发部署AI的框架](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521523&idx=2&sn=9222522f67aa6bada64bed055a3adfeb&chksm=ea94a599dde32c8f8d8f5599323d8cc50d3bb12bb0716412c69e77986c4f0d238aea4efec5fa&scene=21#wechat_redirect)  
  
  
[谷歌AI平台存在漏洞，可泄露企业的专有LLMs](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521484&idx=1&sn=19327f5e0d0275273114fd7a7e37da3f&chksm=ea94a5a6dde32cb0f0b1bd0f310958066fd5a8549d8aedabac5528fbd6f1b55d985e8385ecf6&scene=21#wechat_redirect)  
  
  
[研究员在开源AI和ML模型中发现30多个漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521331&idx=1&sn=e13cd9f9dccd9d17953e551df9108205&chksm=ea94a559dde32c4f32a18c5ad4c3a2fc98f17fb29f69f73cac5c613c67ae28f36ab473d14936&scene=21#wechat_redirect)  
  
  
[超过三分之一的员工与AI共享工作机密](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520981&idx=1&sn=7350d1b84ce9746dae06aafc5e55e76a&chksm=ea94a3bfdde32aa9a656ece3d6e12959f385a712e4b31e2e665d89a77c0b95cb2e742dbe0d91&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://www.theregister.com/2024/11/20/google_ossfuzz/  
  
  
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
