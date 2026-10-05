---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-e785c3480966384037cbb291"
entity_id: "ve-e785c3480966384037cbb291"
schema_version: "1"
title: "Ivanti：注意！Avalanche MDM 解决方案中存在多个严重漏洞"
product: "Ivanti Avalanche MDM"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-24996; CVE-2024-29204"
referenced_identifiers: "CVE-2023-32560; CVE-2023-35078; CVE-2023-35081"
prerequisites: "未认证WLInfoRailService/WLAvalancheService堆溢出；6.4.3修复"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Ivanti/Ivanti%EF%BC%9A%EF%BC%81Avalanche%20MDM%20%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88%E4%B8%AD%E5%AD%98%E5%9C%A8%E5%A4%9A%E4%B8%AA%E4%B8%A5%E9%87%8D%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Ivanti：注意！Avalanche MDM 解决方案中存在多个严重漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ivanti Avalanche MDM
- 本文讨论：CVE-2024-24996；CVE-2024-29204
- 版本、权限与配置前提：未认证WLInfoRailService/WLAvalancheService堆溢出；6.4.3修复
- 资料类型：多漏洞新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 无详细受影响范围/服务端口和官方公告
- 挪威EPMM事件先一年前后几个月，重复叙述疑时间错误，不能关联为Avalanche在野证据
- 新闻称27漏洞但仅两编号主述，其余不宜虚构实体

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 各服务与CVE映射、版本和引用事件日期待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Sergiu Gatlan  代码卫士   2024-04-17 16:09  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Ivanti 公司发布安全更新，修复了位于 Avalanche 移动设备管理 (MDM) 解决方案中的27个漏洞，其中两个是严重的堆溢出漏洞，可用于远程命令执行。**  
  
  
  
Avalanche 供企业管理员远程管理和部署软件并从一个中心地址调度超过10万台移动设备的更新。Ivanti 公司在本周三解释称，这两个严重的漏洞（CVE-2024-24996和CVE-2024-29204）位于 Avalanche 的 WLInfoRailService 和 WLAvalancheService 组件中。  
  
这两个漏洞均由基于堆的缓冲溢出漏洞引发，可导致未认证的远程攻击者在无需用户交互的复杂度较低的攻击中，在易受攻击系统上执行任意命令。今天，Ivanti 公司还修复了25个中危和高危漏洞，它们可被远程攻击者用于触发拒绝服务攻击，以系统权限执行任意命令，从内存中读取敏感信息以及发动远程代码执行攻击。  
  
Ivanti 在本周二发布的安全公告中提到，“在公开披露前，我们并未发现客户遭这些漏洞利用攻击的整局。这些漏洞是通过我们负责任的披露计划公开的。为了修复如下所列漏洞，强烈建议用户下载 Avalanche 安装程序并更新至最新的 Avalanche 6.4.3版本。”  
  
Ivanti 曾在去年12月修复了位于 Avalanche MDM 解决方案中的13个更为严重的RCE漏洞，而在去年8月，它修复了两个严重的被统称为 CVE-2023-32560的Avalanche 缓冲溢出漏洞。  
  
一年前，国家黑客组织利用位于 Ivanti 公司EPMM 中的两个0day漏洞（CVE-2023-35078和CVE-2023-35081）攻陷多家挪威政府组织机构。几个月后，攻击者组合利用MobileIron Core 0day 漏洞CVE-2023-35081和CVE-2023-35078黑入挪威十二个部门的IT系统。CISA 在去年八月份提醒称，“移动设备管理 (MDM) 系统是引人注意的目标，因为它们提供了访问数千台移动设备的提升权限，而APT行动者利用了此前的一个 MobileIron 漏洞。为此，CISA和NCSC-NO 担心可能会被大规模用于攻击政府和私营行业网络。”  
  
  
****  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[产品中又现4个漏洞，Ivanti 宣布安全大检修](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519242&idx=1&sn=6c9094b038e67aea0f2968fffbb125e0&chksm=ea94bd60dde334764a9154d61f5809e1fd0a977ba3617a96d698def9b968b04b3039d7ecc3b2&scene=21#wechat_redirect)  
  
  
[Ivanti 修复由北约报送的严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519117&idx=1&sn=cde689326429491acd44848ceeacab57&chksm=ea94bae7dde333f1f0011d550d4f6a0c206cfdb62dda27f77ba6e432c6883a80c8ff30be2a51&scene=21#wechat_redirect)  
  
  
[Ivanti 披露两个新0day，其中一个已遭利用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518800&idx=2&sn=81cdaabe53353075dd5badd918a3e0cd&chksm=ea94bb3adde3322ca6046c2aa9cb37dedf686efcdd6be90bd63248f23ad20dcc4015a3007149&scene=21#wechat_redirect)  
  
  
[第三个 Ivanti 漏洞已遭利用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518721&idx=2&sn=0fecc3da2d3d00906eb9f4f79279a328&chksm=ea94bb6bdde3327dc06586f79bb98cb915165183da490c1b063cf84fb4571cce6ae8e8396b99&scene=21#wechat_redirect)  
  
  
[严重的Ivanti EPM 漏洞可导致黑客劫持已注册设备](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518594&idx=1&sn=42344cd84f041e0bd0049ef5c7bbdf84&chksm=ea94b8e8dde331fe2a1df497c6a9068b0b510c2924d9229f7c28997fee0d5b1c8a1d81cd78aa&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/ivanti-warns-of-critical-flaws-in-its-avalanche-mdm-solution/  
  
  
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
