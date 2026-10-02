---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-23225;CVE-2024-23296"
identifier_role: "primary"
primary_identifiers: "CVE-2024-23225;CVE-2024-23296"
referenced_identifiers: "CVE-2023-23529;CVE-2023-28206;CVE-2023-28205;CVE-2023-32409;CVE-2023-28204;CVE-2023-32373;CVE-2023-32434;CVE-2023-32435;CVE-2023-32439;CVE-2023-37450;CVE-2023-38606;CVE-2023-41061;CVE-2023-41064;CVE-2023-41991;CVE-2023-41992;CVE-2023-41993;CVE-2023-42824;CVE-2023-5217;CVE-2023-42916;CVE-2023-42917"
identifier_status: "unknown"
title: "苹果曝出两个 iOS 系统 0-Day 漏洞"
product: "Apple Kernel / RTKit"
record_type: "roundup"
document_type: "双漏洞补丁新闻及年度回顾"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "已有任意内核读写能力才能绕过内存保护；称17.4及16.7.6修复"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Apple%20iOS/%E8%8B%B9%E6%9E%9C%E6%9B%9D%E5%87%BA%E4%B8%A4%E4%B8%AA%20iOS%20%E7%B3%BB%E7%BB%9F%200-Day%20%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-d9c0a8643144676a46c9469b"
entity_id: "ve-d9c0a8643144676a46c9469b"
schema_version: "1"
---

# 苹果曝出两个 iOS 系统 0-Day 漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Apple Kernel / RTKit
- 文献类型：双漏洞补丁新闻及年度回顾
- 版本、权限及部署边界：已有任意内核读写能力才能绕过内存保护；称17.4及16.7.6修复
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. frontmatter漏第二主CVE；20个2023历史编号为参考不应提取为本文主漏洞
2. 修复版写成运行这些版本设备上的漏洞，且16.76/iPad16.7.6拼写错误，应明确fixed_in
3. 需逐漏洞映射各OS支持分支，设备列表不可自动两者同范围
4. 有BleepingComputer原报道，缺Apple公告；国家级间谍组织联系仅一般推测，不是本文归因证据
5. 大段加群和推荐链接噪声，标题层级/括号损坏

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://www.bleepingcomputer.com/news/apple/apple-fixes-two-new-ios-zero-days-exploited-in-attacks-on-iphones/>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=Mzg2MTAwNzg1Ng==&mid=2247492479&idx=1&sn=633252b7c18b57ae92d15857699bd8f2&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=Mzg2MTAwNzg1Ng==&mid=2247492452&idx=1&sn=a097203d8764651efcbc134c51b89450&chksm=ce1f19fbf96890edd5319a931be92c41d07d67ecb5054b2b1a51f0aeee915706fac74fda523e&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651253272&idx=1&sn=82468d927062b7427e3ca8a912cb2dc7&scene=21#wechat_redirect>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

小王斯基  FreeBuf   2024-03-06 19:07  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR38jUokdlWSNlAjmEsO1rzv3srXShFRuTKBGDwkj4gvYy34iajd6zQiaKl77Wsy9mjC0xBCRg0YgDIWg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1 "")  
  
  
最近，苹果公司发布了紧急安全更新，解决了两个 iOS 零日漏洞。这些漏洞存在于 iOS 内核（CVE-2024-23225）和 RTKit（CVE-2024-23296）中，威胁攻击者可利用其绕过内核内存保护，这就给了具备任意内核读写权限的威胁攻击者可乘之机。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR39EMmFAdOzBdnria6iamcPUXB5gGtF99WfEtUibIHVrNV6Sa2bfDohKRenvgGicrJ5vdq3RXjHgDaY3Dw/640?wx_fmt=jpeg&from=appmsg "")  
> 苹果公司表示，他们的内部安全团队通过改进输入验证，已经解决了在运行 iOS 17.4、iPadOS 17.4、iOS 16.76和iPad 16.7.6 的设备上存在的安全漏洞问题。  
  
  
  
**漏洞影响范围广泛，波及多个版本的 iPhone 手机**  
  
  
## 据悉，CVE-2024-23225 安全漏洞和 CVE-2024-23296 安全漏洞影响范围十分广泛，主要波及到 iPhone XS 及更高版本、iPhone 8、iPhone 8 Plus、iPhone X、iPad 第五代、iPad Pro 9.7 英寸和 iPad Pro 12.9 英寸第一代、iPad Pro 12.9 英寸第二代及更高版本、iPad Pro 10.5 英寸、iPad Pro 11 英寸第一代及更高版本、iPad Air 第三代及更高版本、iPad 第六代及更高版本，以及 iPad mini 第五代及更高版本等数十款产品。  
  
  
目前，苹果公司并未透露 CVE-2024-23225 和 CVE-2024-23296 两个零日漏洞的信息来源，也未说明漏洞是内部发现还是外部披露的。  
  
  
此外，尽管苹果公司没有公布关于这两个零日漏洞被恶意利用的具体信息，但从以往的经验来看，iOS 的零日漏洞通常会被国家支持的间谍软件用于针对记者、反对派政治人士和持不同政见者等高风险群体，因此强烈建议用户立即安装最新的安全更新，以防止潜在的网络攻击企图。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR39EMmFAdOzBdnria6iamcPUXB0DbpFrUnkELPiantyYc4WJZ4vRpaib1SOKnlEMES6P4yzOJGAkHpcZ5g/640?wx_fmt=jpeg&from=appmsg "")  
  
叠加上上文两个安全漏洞，苹果公司在 2024 年已经修复了三个零日安全漏洞（第一个是在一月份修复）。去年，苹果公司共修复了 20 个被恶意威胁攻击者利用的零日安全漏洞，其中主要包括以下安全漏洞：  
> 2 月份：一个 WebKit 零日漏洞（CVE-2023-23529）；  
> 4 月份：两个零日漏洞（CVE-2023-28206 和 CVE-2023-28205）；  
> 5 月份：三个零点漏洞（CVE-2023-32409、CVE-2023-28204 和 CVE-2023-32373）；  
> 6 月份：三个零点漏洞（CVE-2023-32434、CVE-2023-32435 和 CVE-2023-32439；  
> 7 月份:：两个零点漏洞（CVE-2023-37450 和 CVE-2023-38606）；  
> 9 月份：五个零点漏洞（CVE-2023-41061、CVE-2023-41064、CVE-2023-41991、CVE-2023-41992 和 CVE-2023-41993）；  
> 10 月份：两个零日漏洞（CVE-2023-42824 和 CVE-2023-5217）；  
> 11 月份：两个零日漏洞（CVE-2023-42916 和 CVE-2023-42917）。  
  
  
  
  
【  
FreeBuf粉丝交流群招新啦！  
  
在这里，拓宽网安边界  
  
甲方安全建设干货；  
  
乙方最新技术理念；  
  
全球最新的网络安全资讯；  
  
群内不定期开启各种抽奖活动；  
  
FreeBuf盲盒、大象公仔......  
  
扫码添加小蜜蜂微信回复“加群”，申请加入群聊  
】  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3ich6ibqlfxbwaJlDyErKpzvETedBHPS9tGHfSKMCEZcuGq1U1mylY7pCEvJD9w60pWp7NzDjmM2BlQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oQ6bDiaGhdyodyXHMOVT6w8DobNKYuiaE7OzFMbpar0icHmzxjMvI2ACxFql4Wbu2CfOZeadq1WicJbib6FqTyxEx6Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3icEEJemUSFlfufMicpZeRJZJ61icYlLmBLDpdYEZ7nIzpGovpHjtxITB6ibiaC3R5hoibVkQsVLQfdK57w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
> https://www.bleepingcomputer.com/news/apple/apple-fixes-two-new-ios-zero-days-exploited-in-attacks-on-iphones/  
  
>   
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3icEEJemUSFlfufMicpZeRJZJ7JfyOicficFrgrD4BHnIMtgCpBbsSUBsQ0N7pHC7YpU8BrZWWwMMghoQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
[](https://mp.weixin.qq.com/s?__biz=Mzg2MTAwNzg1Ng==&mid=2247492479&idx=1&sn=633252b7c18b57ae92d15857699bd8f2&scene=21#wechat_redirect)  
  
[](http://mp.weixin.qq.com/s?__biz=Mzg2MTAwNzg1Ng==&mid=2247492452&idx=1&sn=a097203d8764651efcbc134c51b89450&chksm=ce1f19fbf96890edd5319a931be92c41d07d67ecb5054b2b1a51f0aeee915706fac74fda523e&scene=21#wechat_redirect)  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651253272&idx=1&sn=82468d927062b7427e3ca8a912cb2dc7&scene=21#wechat_redirect)  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR3icF8RMnJbsqatMibR6OicVrUDaz0fyxNtBDpPlLfibJZILzHQcwaKkb4ia57xAShIJfQ54HjOG1oPXBew/640?wx_fmt=gif&wxfrom=5&wx_lazy=1 "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
