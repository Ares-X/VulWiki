---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-a893e2fd0dd4a1f8a138b576"
entity_id: "ve-a893e2fd0dd4a1f8a138b576"
schema_version: "1"
title: "CISA：Wing FTP 已遭利用漏洞可泄露服务器路径"
product: "Wing FTP Server"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-47813"
referenced_identifiers: ""
prerequisites: "认证用户、长UID Cookie，≤7.4.3，7.4.4修复"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/CISA/CISA%EF%BC%9AWing%20FTP%20%E5%B7%B2%E9%81%AD%E5%88%A9%E7%94%A8%E6%BC%8F%E6%B4%9E%E5%8F%AF%E6%B3%84%E9%9C%B2%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%B7%AF%E5%BE%84.md"
review_date: "2026-10-02"
category_recommendation: "Web安全/服务器应用/Wing FTP"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
---

#  CISA：Wing FTP 已遭利用漏洞可泄露服务器路径  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Wing FTP Server
- 本文讨论：CVE-2025-47813主，47812可选RCE关联
- 版本、权限与配置前提：认证用户、长UID Cookie，≤7.4.3，7.4.4修复
- 资料类型：路径泄露KEV新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 误归CISA/安全设备，应Wing FTP服务端
- 需保留是否与47812在野串联未知，不能据共同修复推成实证链
- 未给研究者PoC/官方版本/KEV直链，5月应标2025年

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- KEV记录、操作系统路径长度差异和修复版本待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Ravie Lakshmanan
                    Ravie Lakshmanan  代码卫士   2026-03-17 09:22  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**本周一，美国网络安全和基础设施安全局 (CISA) 将影响 Wing FTP 的中危漏洞CVE-2025-47813纳入已遭利用漏洞 (KEV) 分类表中，并表示该漏洞已遭利用。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
该漏洞的CVSS评分为4.3，是一个信息泄露漏洞，在某些条件下可泄露应用的安装路径。CISA 表示，“Wing FTP服务器存在一个漏洞，当在UID cookie中使用长数值时，系统会生成包含敏感信息的错误消息。”该漏洞影响 Wing FTP 服务器7.4.3版本及之前的所有版本。RCE Security研究员Julien Ahrens遵循负责任的披露原则报告此问题后，5月发布的7.4.4版本中已修复该漏洞。  
  
值得注意的是，7.4.4版本还修复了同一产品中的一个严重 RCE漏洞CVE-2025-47812（CVSS：10.0）。截至2025年7月，该漏洞已遭在野利用。根据Huntress公司当时披露的细节，攻击者已利用该漏洞下载并执行恶意Lua文件、进行侦察活动，并安装远程监控管理软件。  
  
研究员Ahrens在GitHub发布的概念验证（PoC）利用代码中指出，"/loginok.html"端点未能正确验证"UID"会话cookie的值。当提供的值超过底层操作系统最大路径长度时，会触发错误消息并泄露完整的本地服务器路径。该研究员补充道："成功利用该漏洞可使经过身份验证的攻击者获取应用程序的本地服务器路径，从而有助于利用CVE-2025-47812等漏洞进行攻击。"  
  
目前尚无关于该漏洞如何遭在野利用的具体细节，也不确定是否与CVE-2025-47812漏洞结合使用。鉴于最新事态发展，CISA建议联邦民事行政部门（FCEB）机构在2026年3月30日前完成必要补丁的部署。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[CrushFTP 新0day被用于劫持服务器](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523615&idx=2&sn=cac2857656da7d1c204446add8dfee9a&scene=21#wechat_redirect)  
  
  
[Wing FTP严重漏洞已遭在野利用](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523565&idx=2&sn=3cc3fd02d7bb4c8d993138dce7afa3f6&scene=21#wechat_redirect)  
  
  
[CrushFTP 提醒用户立即修复已遭利用的 0day 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519338&idx=1&sn=ec0b92257a640cd98dd5d59c00746548&scene=21#wechat_redirect)  
  
  
[CompleteFTP 路径遍历缺陷可导致服务器文件遭删除](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513283&idx=2&sn=1191567d5c667a5413e00d453ef8b5da&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2026/03/cisa-flags-actively-exploited-wing-ftp.html  
  
  
题图：Pixa  
bay Licens  
e  
  
  
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
