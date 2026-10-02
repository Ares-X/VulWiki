---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-a94f6d5d70e4f8a69fad56a4"
entity_id: "ve-a94f6d5d70e4f8a69fad56a4"
schema_version: "1"
title: "严重的蓝牙漏洞已存在多年，可用于接管安卓、iOS 和 Linux 设备"
product: "Android/Linux/macOS/iOS相关蓝牙HID实现"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2023-45866"
referenced_identifiers: ""
prerequisites: "蓝牙范围内，具体OS配对/发现状态未逐平台列"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/%E8%93%9D%E7%89%99/%E4%B8%A5%E9%87%8D%E7%9A%84%E8%93%9D%E7%89%99%E6%BC%8F%E6%B4%9E%E5%B7%B2%E5%AD%98%E5%9C%A8%E5%A4%9A%E5%B9%B4%EF%BC%8C%E5%8F%AF%E7%94%A8%E4%BA%8E%E6%8E%A5%E7%AE%A1%E5%AE%89%E5%8D%93%E3%80%81iOS%20%E5%92%8C%20Linux%20%E8%AE%BE%E5%A4%87.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  严重的蓝牙漏洞已存在多年，可用于接管安卓、iOS 和 Linux 设备   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Android/Linux/macOS/iOS相关蓝牙HID实现
- 本文讨论：CVE-2023-45866
- 版本、权限与配置前提：蓝牙范围内，具体OS配对/发现状态未逐平台列
- 资料类型：蓝牙漏洞新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 以远程接管表述省略邻近无线前提，跨平台条件不可共用
- 未给Marc Newlin原研究与逐平台补丁，主来源SCMagazine而导语称Darkreading
- 无PoC是2023-12报道状态，应加时间；无关专家评论与广告冗余

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 各平台版本、是否需既有配对/可发现及补丁待原研究核对
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Steve Zurier  代码卫士   2023-12-11 17:12  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**Darkreading 报道称，一个严重的蓝牙漏洞 (CVE-2023-45866) 已存在多年，可能被用于控制安卓、Linux、macOS 和 iOS 设备。**  
  
  
该漏洞是认证绕过漏洞，可导致攻击者连接可疑设备并注入  
击键，实现代码执行后果。在GitHub 五天前发布的文章中，SkySafe 公司的研究员 Marc Newlin 表示该漏洞“诱骗蓝牙主机状态机在未经用户确认的情况下与虚假的键盘配对。” Newlin 指出，蓝牙标准中定义了底层的未认证配对机制，而特定的实现漏洞将其暴露给攻击者。他表示将在下一次会议时发布该漏洞的完整详情和 PoC 脚本，并将更新原始文档。Newlin 还在这篇文章中给出了可用的补丁信息。  
  
Cyware 公司总监 Emily Phelps 解释称，在这个exp 中，攻击者欺骗蓝牙设备系统，使之在无需用户确认的情况下，认为它连接到一个虚假的  
键盘。该漏洞源自部分蓝牙规则可允许设备在无需认证的情况下进行连接。  
  
Phelps 表示，“利用该漏洞可导致恶意黑客远程控制他人的设备。他们可下载应用、发送消息或运行依赖于该操作系统的多个命令。”Phelps 表示如果已存在该漏洞的补丁，安全团队应当马上修复。对于还在等待修复方案的设备，安全团队应当监控相关更新和布丁，同时需要让员工获知该问题并提供缓解建议如不使用蓝牙时将其禁用。  
  
Viakoo Labs 的副总裁 John Gallagher 解释称，当设备通信时，会存在第一次“握手”，即两个系统同意互相通信。攻击者利用的是这一点：很多物联网设备如蓝牙  
键盘希望使这一握手尽可能容易，尤其是握手完成后才能使用的  
键盘。因此在 Newlin 发现的 exp 中，该握手是最少的，“我将你视作  
键盘，所以我让你和我通信”。  
  
Gallagher 指出，“在很多物联网设备中，默认通信可用——无限、蓝牙和 Zigbee。它们使用的芯片集通常支持所有的标准协议，因此可用于大量系统中。作为负责新设备的一部分内容，组织机构应当禁用未在使用的任何协议。”  
  
Gallagher 还提到，使用视频监控和访问控制维护物理安全是组织机构可保护基础设施安全的另一种方式，并认为如果威胁行动者可获得物理访问权限，则这类网络攻击活动非常容易实现。Gallagpher 表示，“这就是为何物理安全系统是恶意攻击的又一原因。”  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[利用新型蓝牙攻击，开走特斯拉 Model 3 和 Model Y](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511827&idx=2&sn=10d8fd7f67b9a427d92c2f1847b2474b&chksm=ea949e79dde3176f72fdf1f3b53fefc1b93a8a8cb0cd6102e1821b43017f2b01418c77b6b27f&scene=21#wechat_redirect)  
  
  
[无线共存：利用蓝牙和 WiFi 性能特性实现芯片间提权](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247509867&idx=2&sn=19471663d9505977efc3cef7e3a39044&chksm=ea949601dde31f17f54444101a87df6a48f743a459bdb122596fc52ff8d133aea1d207ff3488&scene=21#wechat_redirect)  
  
  
[数百万设备受新型 BrakTooth 蓝牙漏洞影响，并非所有厂商均修复](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247507630&idx=1&sn=e6871e36a11d72ddcfd26798e745dce9&chksm=ea94efc4dde366d21b5c295f8e601ad9032318ae45bb03c62aba37f7b2eeb4ed78eae26b4776&scene=21#wechat_redirect)  
  
  
[多个蓝牙缺陷可使攻击者假冒合法设备](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247504393&idx=3&sn=e7ccf4ebec4a7fdf79cd94b5d6fc6b1a&chksm=ea94e363dde36a75064ea89050354623e5231cab10dc1c054df489ae74c9df60077eb06f5503&scene=21#wechat_redirect)  
  
  
[谷歌：注意 Linux 内核中严重的零点击 “BleedingTooth” 蓝牙缺陷](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247495566&idx=3&sn=b7608e0d8df2c423cbc60f8a1c152126&chksm=ea94dee4dde357f2bb8188f48ac2fe6d96fa2d0c2f16f3a7b84c848a6f2a1e89e082c3f7f65a&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.scmagazine.com/news/critical-bluetooth-flaw-could-take-over-android-apple-linux-devices  
  
  
题图：  
Pixabay  
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
