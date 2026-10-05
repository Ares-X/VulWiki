---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-3024d8fddfd9b9645fb9d615"
entity_id: "ve-3024d8fddfd9b9645fb9d615"
schema_version: "1"
title: "Fortinet：速修复 FortiOS、FortiProxy 设备中的严重RCE漏洞！"
product: "FortiOS/FortiProxy HTTP/2代理处理"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2023-33308"
referenced_identifiers: ""
prerequisites: "远程数据包，SSL检测profile启HTTP/2相关；分支范围/修复明确"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Fortinet/Fortinet%EF%BC%9A%E9%80%9F%E4%BF%AE%E5%A4%8D%20FortiOS%E3%80%81FortiProxy%20%E8%AE%BE%E5%A4%87%E4%B8%AD%E7%9A%84%E4%B8%A5%E9%87%8DRCE%E6%BC%8F%E6%B4%9E%EF%BC%81.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Fortinet：速修复 FortiOS、FortiProxy 设备中的严重RCE漏洞！   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：FortiOS/FortiProxy HTTP/2代理处理
- 本文讨论：CVE-2023-33308
- 版本、权限与配置前提：远程数据包，SSL检测profile启HTTP/2相关；分支范围/修复明确
- 资料类型：风险新闻通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- FortiOS不受影响列表夹入2.x/1.x疑属FortiProxy产品错配
- Watchowr、输入腹泻、剃刀等转文文字错误
- 关键代理/深度检测配置仅在缓解处出现，应前置为条件；无官方直链

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 具体SSL检测触发条件与产品版本归属待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Bill Toulas  代码卫士   2023-07-13 18:22  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**Fortinet 披露了影响 FortiOS 和 FortiProxy 的一个严重漏洞，可导致远程攻击者在易受攻击设备上执行任意代码。该漏洞由 Watchowr 发现，编号为CVE-2023-33308，CVSSv3 评分为9.8，为“严重”级别漏洞。**  
  
  
Fortinet 在安全公告中提到，“FortiOS & FortiProxy 中存在一个基于栈的溢出漏洞，可导致远程攻击者通过构造的数据包执行任意代码或命令。”当程序将比为缓冲区分配得更多的数据写入位于栈的缓冲区时，就会导致数据溢出到邻近的内存位置，从而导致栈溢出。攻击者可发送超过缓冲区容量的特殊构造的输入腹泻与函数相关的关键内存参数，利用这类漏洞，实现恶意代码执行。  
  
如下 FortiOS 版本受影响：  
  
- FortiOS 版本7.2.0 至7.2.3  
  
- FortiOS 版本 7.0.0 至 7.0.10  
  
- FortiProxy 版本 7.2.0 至 7.2.2  
  
- FortiProxy 版本 7.0.0 至 7.0.9  
  
  
  
Fortinet 公司提到，该漏洞已在之前发布中修复但并未提供相应的安全公告，因此它并不影响最新的发布分支 FortiOS 7.4。  
  
CVE-2023-33308的修复方案已在如下版本中提供：  
  
- FortiOS 版本7.2.4 或以上  
  
- FortiOS 版本 7.0.11 或以上  
  
- FortiProxy 版本 7.2.3 或以上  
  
- FortiProxy 版本 7.0.10 或以上  
  
  
  
Fortinet 在安全公告中剃刀，FortiOS 产品6.0、6.2、6.4、2.x 和 1.x 发布分支并未受该漏洞影响。CISA 已发布关于该漏洞的告警，督促受影响组织机构应用可用的安全更新。如管理员无法立即应用新固件，则可禁用由代理策略或防火墙策略所使用的 SSL 检测配置上的 HTTP/2支持，作为应变措施。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[奇安信入选全球《静态应用安全测试全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516678&idx=1&sn=5b9e480c386161b1e105f9818b2a5a3d&chksm=ea94b36cdde33a7a05cafa9918733669252a02611c222b02bc6e66cbb508ee3fbf748453ee7a&scene=21#wechat_redirect)  
  
  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[Fortinet 修复严重的 FortiNAC 远程命令执行漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516818&idx=3&sn=7524bc2288375bbf06f9574e73e15a00&chksm=ea94b3f8dde33aeeeb1313ae4cb6608ffa6876baa1ba49cbdac2b97cf5307198a79fd41eed8b&scene=21#wechat_redirect)  
  
  
[Fortinet 修复 Fortigate SSL-VPN 设备中严重的 RCE 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516712&idx=1&sn=db056d3f152e8f52867cc5021679e6f1&chksm=ea94b342dde33a543f8d7daaae604ffb6f0a65f865bf3fd926dfee86ad48be7d6460b9107d7d&scene=21#wechat_redirect)  
  
  
[Fortinet 修复FortiADC 和 FortiOS 中的多个高危漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516406&idx=3&sn=f6d52c7913cb9a7127079a424f287d22&chksm=ea94b19cdde3388a41d9382c14e8649d4db7f27382de8b638a8c2430d9fb7a6e3125a60ceed6&scene=21#wechat_redirect)  
  
  
[Fortinet FortiOS漏洞被用于攻击政府实体](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515912&idx=1&sn=0d48724c08d4d63949a7142683b6fdd7&chksm=ea948e62dde30774b504e3a089bab575daf337854bba663d40f81014b5672260b74230a007a3&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/fortinet-warns-of-critical-rce-flaw-in-fortios-fortiproxy-devices/  
  
  
题图：Pexels License  
  
  
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
