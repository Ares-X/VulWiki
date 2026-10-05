---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-d7c448ec4f2612096c70bb49"
entity_id: "ve-d7c448ec4f2612096c70bb49"
schema_version: "1"
title: "黑客正在利用 TBK DVR 设备中五年未修复的 0day"
product: "TBK及OEM DVR；MVPower另产品"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2018-9995; CVE-2016-20016"
referenced_identifiers: ""
prerequisites: "公网可达、HTTP Cookie处理；型号列出，固件多数缺"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/TBK%20DVR/%E9%BB%91%E5%AE%A2%E6%AD%A3%E5%9C%A8%E5%88%A9%E7%94%A8%20TBK%20DVR%20%E8%AE%BE%E5%A4%87%E4%B8%AD%E4%BA%94%E5%B9%B4%E6%9C%AA%E4%BF%AE%E5%A4%8D%E7%9A%84%200day.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  黑客正在利用 TBK DVR 设备中五年未修复的 0day   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：TBK及OEM DVR；MVPower另产品
- 本文讨论：CVE-2018-9995；CVE-2016-20016为第二攻击预警
- 版本、权限与配置前提：公网可达、HTTP Cookie处理；型号列出，固件多数缺
- 资料类型：历史漏洞攻击活动新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 标题五年已公开漏洞称0day混淆未修补与未知漏洞
- 元数据漏两CVE；5万次是尝试不等于入侵台数
- 只THN二手链接，无FortiGuard原文及修复/停更时间核验

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- OEM固件范围、尝试统计及补丁状态待原始研究核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Ravie Lakshmanan  代码卫士   2023-05-04 17:35  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**FortiGuard Labs 发布安全公告指出，威胁行动者们正在利用影响 TBK 数字化视频记录 (DVR) 设备的一个未修复漏洞 (CVE-2018-9995)。该漏洞已存在五年之久。**  
  
![](../../.resource/remote/cd0c5e75c20dd68311f507cef9a3c569c1db69279d5eb6d2f33eb382a147c6fc.png "")  
  
  
  
CVE-2018-9995的CVSS 评分为9.8，是一个认证绕过漏洞，可被远程攻击者用于提升权限。Fortinet 在5月1日发布的文章中提到，“这个已存在五年之久的漏洞是因为处理恶意构造的 HTTP cookie 时出现错误导致的。远程攻击者可能利用该漏洞绕过认证并获得管理员权限，最终访问摄像头视频内容。”  
  
Fortinet 公司表示在2023年4月就已经发现利用该漏洞攻击 TBK DVR 设备的逾5万次尝试。尽管目前已存在 PoC exploit，但仍未被修复。该漏洞影响 TBK DVR4104和DVR4216 生产线，它们同时以 CeNova、DVR Login、HVR Login、MDVR Login、Night OWL、Novo、QSee、Pulnix、Securus和XVR 5-in-1 等名称出售。  
  
另外，Fortinet 还提醒称针对CVE-2016-20016（CVSS评分9.8）的利用也在不断增多。该漏洞影响 MVPower CCTV DVR 机型，包括 TV-7104HE 1.8.4 115215B9 和 TV7108HE。该漏洞可导致远程未认证攻击者以 root 身份执行任意操作系统命令。  
  
Fortinet 提到，“目前可接触到不同品牌下的数万台 TBK DVR，PoC 代码一公开，加上该漏洞易利用，导致该漏洞很容易成为攻击者的目标。最近 IPS 检测增多的情况表明网络摄像头设备仍然是攻击者的热门目标。”  
  
  
****  
![](../../.resource/remote/66b1ac947994df6ffca93aa0695c4d5878660931663fdc6f9bb6359a33c59e8f.png "")  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511052&idx=3&sn=fb116392e405ae62e6c339117fffdb59&chksm=ea949d66dde31470758b6ee8f9dbecdb67ef6c0c8af277f26b83b60dbac95748d28db787a4b4&scene=21#wechat_redirect)  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[这个严重的 DVR 漏洞还会被一直忽视下去吗？](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247487024&idx=1&sn=a3f6b9afb2d5bda5d091c5490eb39d29&chksm=ea973f5adde0b64c7dcf9ead0dbc7dfd7f63d27689b739aecfc060e36aa2f8ff168c3ee10971&scene=21#wechat_redirect)  
  
  
[DVR固件CCTV系统存在后门 向中国地址发送截屏](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247485800&idx=2&sn=67452acb7b98934a5939e4aa17d9435c&chksm=ea973802dde0b1141f80783117e6c9473748b283bb3edea5d717be608f49256f0aadd20e01eb&scene=21#wechat_redirect)  
  
  
[Abode 家庭安全包存在多个严重漏洞，可导致黑客劫持和禁用摄像头](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514319&idx=4&sn=bb1d931819cef01583083f9eddee4a6d&chksm=ea9489a5dde300b349e85d3bf53d19d161712a5ac99dc81cf9fa3b09e54426e9bedd529d9889&scene=21#wechat_redirect)  
  
  
[多个Wyze 摄像头漏洞可导致攻击者接管设备并访问视频](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511227&idx=4&sn=6f352ab9a489722b06e9f7b65f2f1ebd&chksm=ea949dd1dde314c7f99397ef312b0074bbd05b5067a602260b54dfcdea9b0b7b511b7d4dc228&scene=21#wechat_redirect)  
  
  
[很多IP摄像头厂商都在用的固件中存在多个严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247506705&idx=2&sn=04f41c0b13dea970635fab6514fe7035&chksm=ea94ea7bdde3636deb52810ee03ff0888a677d764ef786b112313d13ebcfe1f9ba22129d1954&scene=21#wechat_redirect)  
  
  
[突发：Verkada安全摄像头失陷，特斯拉Cloudflare等2万多客户受影响](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247502161&idx=2&sn=7ef532b3fd469b60e33df1504b2d7bf7&chksm=ea94f83bdde3712db27e04df9695598ce131442395f5af86a33a14c942566934515be3987686&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2023/05/hackers-exploiting-5-year-old-unpatched.html  
  
  
题图：Pixabay License  
  
  
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
