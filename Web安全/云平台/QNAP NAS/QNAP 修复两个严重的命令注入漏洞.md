---
source: "gelusus/wxvl 公众号漏洞文库"
title: "QNAP 修复两个严重的命令注入漏洞"
product: "QNAP QTS/QuTS/应用"
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
id: "vw-f80dbe733f9289309b1c1b24"
entity_id: "ve-f80dbe733f9289309b1c1b24"
schema_version: "1"
---

# QNAP 修复两个严重的命令注入漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 两CVE缺元数据
- 各版本分支和应用不同，需分别结构化避免拼成统一范围
- 远程执行不表明认证条件相同，补各官方向量
- 仅二手新闻缺QNAP原始公告
- 明确2023历史更新，移除广告

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

Bill Toulas  代码卫士   2023-11-07 16:58  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
****  
**QNAP Systems 发布安全公告，修复了影响 NAS 设备上多个 QTS 操作系统和应用程序版本的两个严重的命令注入漏洞。**  
  
  
  
第一个漏洞是CVE-2023-23368，CVSS评分为9.8，是一个命令注入漏洞，可被远程攻击者通过网络用于执行命令。受该漏洞影响的QTS版本是QTS 5.0.X和4.5.x、QuTS hero h5.0.x和h4.5.x以及QuTScloud c5.0.1。  
  
修复方案已发布在如下版本中：  
  
- QTS 5.0.1.2376 build 20230421 及后续版本  
  
- QTS 4.5.4.2374 build 20230416 及后续版本  
  
- QuTS hero h5.0.1.2376 build 20230421 及后续版本  
  
- QuTS hero h4.5.4.2374 build 20230417 及后续版本  
  
- QuTScloud c5.0.1.2374 及后续版本  
  
  
  
第二个漏洞是CVE-2023-23369，其严重性评分为9.0，也可被远程攻击者利用，实现和前一个漏洞利用一样的效果。受影响的 QTS 版本包括 5.1.x、4.3.6、4.3.4、4.3.3和4.2.x，Multimedia Console 2.1.x 和1.4.x 以及Media Streaming 附件 500.1.x 和 500.0.x。  
  
修复方案已发布在如下版本：  
  
- QTS 5.1.0.2399 build 20230515及后续版本  
  
- QTS 4.3.6.2441 build 20230621及后续版本  
  
- QTS 4.3.4.2451 build 20230621 及后续版本  
  
- QTS 4.3.3.2420 build 20230621 及后续版本  
  
- QTS 4.2.6 build 20230621 及后续版本  
  
- Multimedia Console 2.1.2 (2023/05/04) 及后续版本  
  
- Multimedia Console 1.4.8 (2023/05/05) 及后续版本  
  
- Media Streaming add-on 500.1.1.2 (2023/06/12) 及后续版本  
  
- Media Streaming add-on 500.0.0.11 (2023/06/16) 及后续版本  
  
  
  
要更新 QTS、QuTS hero或QuTScloud，管理员可登录并导航至控制面板＞系统＞固件更新，并点击“实时更新”下的“检查更新”来下载并安装最新版本。用户也可从QNAP网站手动下载这些更新。  
  
用户可从“App 中心”查找安装并点击“更新”按钮（仅在新版本可用时出现），更新该多媒体控制台。更新 Media Streaming 附件的流程类似，用户也可通过搜索 App Center 的方式定位。  
  
由于NAS 设备通常用于存储数据，因此命令执行缺陷也可能会造成重大影响，因为网络犯罪分子通常会寻找新目标窃取和/或加密敏感数据。攻击者之后可要求受害者支付赎金以换取不泄露数据或进行解密。  
  
过去，QNAP一直是大规模勒索攻击的目标。一年前，Deadbolt 勒索团伙利用一个 0day 漏洞对暴露在公开互联网中的NAS设备进行加密。  
  
因此，建议QNAP用户尽快应用可用的安全更新。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[QNAP正在紧急修复两个0day，影响全球超8万设备](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516164&idx=2&sn=00deb0a15fae5034e3bbde0e1407178b&chksm=ea94b16edde33878ac23c8677c44d1e95a6307fec34807fd13ba32689de740186ca370c72df0&scene=21#wechat_redirect)  
  
  
[QNAP 提醒用户修复 NAS 设备中的高危 Linux Sudo 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516096&idx=3&sn=82f067c61adcd0aa4a98ca6165d9c9d3&chksm=ea948eaadde307bc40d0015e6feadf0f1264ab387fd2b2500439ce984d5722ddf2e79da15ca4&scene=21#wechat_redirect)  
  
  
[QNAP推出新的漏洞奖励计划，覆盖应用、云服务和OS，最高赏金2万美元](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515762&idx=1&sn=3de5cd1e8a38ecfddac1ebab20ee6b48&chksm=ea948f18dde3060eb71f9ad5b5a212e250c11191c75766067819d29b3ced5103a9e86c9dd415&scene=21#wechat_redirect)  
  
  
[QNAP严重漏洞可导致恶意代码注入](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515416&idx=1&sn=e9005edba45daabb40b20c3823c4f297&chksm=ea948c72dde305642e1d413fc58cee4673b2e8288bae850521ae7c67a4270f868028addf531f&scene=21#wechat_redirect)  
  
  
[QNAP紧急修复已遭勒索团伙利用的0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513786&idx=1&sn=6db5fbb61270cf614d6605adb52ca99c&chksm=ea9487d0dde30ec6b7e1631c93975e24741275c2ba254fe0dac3f5f494c3000a8cedb03ff890&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/qnap-warns-of-critical-command-injection-flaws-in-qts-os-apps/  
  
  
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
