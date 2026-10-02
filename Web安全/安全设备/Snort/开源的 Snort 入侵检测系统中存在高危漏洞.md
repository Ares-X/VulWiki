---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-9a5045858c1d8e7eb334e9b4"
entity_id: "ve-9a5045858c1d8e7eb334e9b4"
schema_version: "1"
title: "开源的 Snort 入侵检测系统中存在高危漏洞"
product: "Snort Modbus预处理器"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2022-20685"
referenced_identifiers: ""
prerequisites: "Modbus解析启用且可处理攻击流量；2.x<2.9.19，3.x边界句不清"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/Snort/%E5%BC%80%E6%BA%90%E7%9A%84%20Snort%20%E5%85%A5%E4%BE%B5%E6%A3%80%E6%B5%8B%E7%B3%BB%E7%BB%9F%E4%B8%AD%E5%AD%98%E5%9C%A8%E9%AB%98%E5%8D%B1%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "畸形输入可能使进程/内核崩溃、设备重启或服务不可用；本文崩溃线索不自动证明稳定代码执行，需隔离环境和可恢复配置"
source_status: "unknown"
---

#  开源的 Snort 入侵检测系统中存在高危漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Snort Modbus预处理器
- 本文讨论：CVE-2022-20685整数溢出/无限循环DoS
- 版本、权限与配置前提：Modbus解析启用且可处理攻击流量；2.x&lt;2.9.19，3.x边界句不清
- 资料类型：Snort漏洞新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 早于2.9.19以及3.1.11.0表述未说明3.x受影响还是修复界限
- 挂起后恶意包畅通取决IDS/IPS及fail-open配置，不能必然推出
- 无Cisco/Claroty直链，广告多

### 操作风险与恢复

- 畸形输入可能使进程/内核崩溃、设备重启或服务不可用；本文崩溃线索不自动证明稳定代码执行，需隔离环境和可恢复配置

### 待核与来源

- 官方版本矩阵、启用前提与流量阻断行为待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Ravie Lakshmanan  代码卫士   2022-04-21 18:46  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
开源的思科 Snort 检测和预防系统中存在一个漏洞 (CVE-2022-20685)，可触发拒绝服务条件并使其无法抵御恶意流量。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMTI1vbIyhibj6ueeI19w1Mj19icukwxFGP7qsadIK8ic077BpgopQMOgzdDAJMiaspXARF99rjVwSicabg/640?wx_fmt=png "")  
  
  
  
该漏洞的CVSS 评分为 7.5，位于 Snort 检测引擎的 Modbus 预处理器中，影响所有早于 2.9.19 之前的以及 3.1.11.0 版本的开源 Snort 项目。Snort 是一个开源的入侵检测系统和入侵防御系统，由思科维护，可提供实时网络流量分析，查找基于预定义规则的潜在恶意活动迹象。  
  
Claroty 公司的安全研究员 Uri Katz 上周发布报告称，“漏洞CVE-2022-20685 是一个整数溢出漏洞，可导致 Snort Modbus OT 预处理器进入while无限循环。成功利用可阻止 Snort 处理新的数据包并生成警报信息。”  
  
具体而言，该缺陷和 Snort处理 Modbus 数据包的方式有关，它可导致攻击者将特殊构造的数据包发送至受影响设备。Modbus 数据包是用于SCADA 网络中的工业数据通信协议。  
  
思科在1月份早些时候发布安全公告指出，“成功的exploit 可导致攻击者使 Snort 进程挂起，导致流量检测停止。”换句话说，利用该漏洞可导致未认证的远程攻击者在受影响设备上创建拒绝服务条件，从而阻止 Snort 检测攻击并使其在网络上运行恶意数据包。  
  
Katz 指出，“在网络分析工具如 Snort 中成功利用这些漏洞可对企业和OT网络造成灾难性影响。网络分析工具是研究不充分的领域，值得更多分析和关注，尤其是在OT网络越来越多地由熟悉 Snort 和其它类似工具的IT网络分析师统一管理的情况下。”  
  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：  
https://oss.qianxin.com****  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[开源工具 PrivateBin 修复XSS 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511433&idx=3&sn=ff04084cd337034fbdf95f2eb572c65a&chksm=ea949ce3dde315f54aac997e6b2fa73ed091ef780a4381e169502f00c9227d9bc2518f543d05&scene=21#wechat_redirect)  
  
  
[NPM流行包再起波澜：维护人员对俄罗斯用户发特定消息，谁来保证开源可信？](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511319&idx=1&sn=32793c16c49075815d576cedb430aeb9&chksm=ea949c7ddde3156b7932ea3ffe524fdcbd627b2fe2f5e2280b0c48572b3342ef0f74816b061a&scene=21#wechat_redirect)  
  
  
[Pwn2Own大赛回顾：利用开源服务中的严重漏洞，攻陷西部数据My Cloud PR4100](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511095&idx=1&sn=e1f0122f82889cda652d6febbba2879c&chksm=ea949d5ddde3144b2fb52dbbfc2b76961538c21d7e9adc3e02bc2a3b4fb6d592755c393b2cf6&scene=21#wechat_redirect)  
  
  
[开源网站内容管理系统Micorweber存在XSS漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511095&idx=3&sn=adbaf85a2b52fa28271d8650cc9f5e3a&chksm=ea949d5ddde3144b570cbe1d529895ae54cb07f1f1db4b3f8eb26622905360a3b6aa62e5c2b5&scene=21#wechat_redirect)  
  
  
[热门开源后端软件Parse Server中存在严重的 RCE ，CVSS评分10分](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510991&idx=2&sn=1396eb76de81d7c7c1a252c7028381fe&chksm=ea949aa5dde313b398c64c3399132d91861cd3ec85bc341afbcfc8899e6d3818f2c52bb846db&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2022/04/researchers-detail-bug-that-could.html  
  
  
题图：Pixabay License  
  
  
  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSf7nNLWrJL6dkJp7RB8Kl4zxU9ibnQjuvo4VoZ5ic9Q91K3WshWzqEybcroVEOQpgYfx1uYgwJhlFQ/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMQjfQ8ZhaOGYOwiaOkCe6UVnwG4PcibqI6sJ3rojqp5qaJa0wA2lxYb0VKwria7pHqS9rJwSPSykjMsA/640?wx_fmt=jpeg "")  
  
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
