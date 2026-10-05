---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2023-20754;CVE-2023-20755;CVE-2023-20753;CVE-2023-20756;CVE-2023-20757;CVE-2023-20758;CVE-2023-20759;CVE-2023-20760;CVE-2023-20761;CVE-2023-20766;CVE-2023-20767;CVE-2023-20768;CVE-2023-20771;CVE-2023-20772;CVE-2023-20773;CVE-2023-20774;CVE-2023-20775;CVE-2023-20689;CVE-2023-20690;CVE-2023-20691;CVE-2023-20692;CVE-2023-20693;CVE-2022-32666;CVE-2023-20748"
identifier_role: "primary"
primary_identifiers: "CVE-2023-20754;CVE-2023-20755;CVE-2023-20753;CVE-2023-20756;CVE-2023-20757;CVE-2023-20758;CVE-2023-20759;CVE-2023-20760;CVE-2023-20761;CVE-2023-20766;CVE-2023-20767;CVE-2023-20768;CVE-2023-20771;CVE-2023-20772;CVE-2023-20773;CVE-2023-20774;CVE-2023-20775;CVE-2023-20689;CVE-2023-20690;CVE-2023-20691;CVE-2023-20692;CVE-2023-20693;CVE-2022-32666;CVE-2023-20748"
referenced_identifiers: ""
identifier_status: "unknown"
title: "联发科漏洞影响智能手机、平板、WiFi 等芯片集"
product: "MediaTek多芯片组件/Android集成"
record_type: "roundup"
document_type: "月度24漏洞公告摘要"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "20754/20755需system执行权限、Android11/12/13且列芯片；其余仅简短类型"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/%E8%81%94%E5%8F%91%E7%A7%91%E6%BC%8F%E6%B4%9E%E5%BD%B1%E5%93%8D%E6%99%BA%E8%83%BD%E6%89%8B%E6%9C%BA%E3%80%81%E5%B9%B3%E6%9D%BF%E3%80%81WiFi%20%E7%AD%89%E8%8A%AF%E7%89%87%E9%9B%86.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://gbhackers.com/mediatek-security-flaws/"
id: "vw-12e5214257b65cc91d5d3673"
entity_id: "ve-12e5214257b65cc91d5d3673"
schema_version: "1"
---

# 联发科漏洞影响智能手机、平板、WiFi 等芯片集

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：MediaTek多芯片组件/Android集成
- 文献类型：月度24漏洞公告摘要
- 版本、权限及部署边界：20754/20755需system执行权限、Android11/12/13且列芯片；其余仅简短类型
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. frontmatter无CVE，实际24主漏洞公告需实体列表，不能只首项或按标题Linux归内核
2. 两高危段需系统权限与本地提权因果表达不顺，应准确区分前置权限/影响，越界读不自动证明root
3. 长芯片列表与软件版本应逐组件关联，不能将相同列表扩展给22个中危漏洞
4. GBHackers原报道存在，缺MediaTek2023-07官方公告/修复版本；中危清单是索引线索无需编造PoC
5. 重复同图三次、广告推荐等占比高；保留月度摘要与来源日

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://gbhackers.com/mediatek-security-flaws/>
- 原文参考链接（未重新核验）：<https://codesafe.qianxin.com>
- 原文参考链接（未重新核验）：<https://oss.qianxin.com>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516678&idx=1&sn=5b9e480c386161b1e105f9818b2a5a3d&chksm=ea94b36cdde33a7a05cafa9918733669252a02611c222b02bc6e66cbb508ee3fbf748453ee7a&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247509419&idx=2&sn=2f9d2960d52a795a5895a28287b29b59&chksm=ea9494c1dde31dd746b7adc04dff58cb689164d449cf30114b367a650a1bdd1c05242ba45a83&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515956&idx=1&sn=01fe340192b1659e658210ae4b02ac97&chksm=ea948e5edde30748775821e1c9ed1b389b2c0dd119e01cd78b9292d859542e3f209300000e4c&scene=21#wechat_redirect>

### 归档技术正文

Guru Baran  代码卫士   2023-07-05 17:23  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**联发科在2023年7月产品安全公告中披露了24个漏洞，影响适用于智能手机、平板、AIoT、智能展示、OTT和 WiFi 的芯片集。其中，CVE-2023-20754和CVE-2023-20755被评级为“高危”漏洞。**  
  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/2f0f8f82d14e138963df2a60f2b9892c376de99c2ec4422ed0b024c0474b1932.png "")  
  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/2f0f8f82d14e138963df2a60f2b9892c376de99c2ec4422ed0b024c0474b1932.png "")  
  
**高危漏洞**  
  
  
  
  
  
CVE-2023-20754是位于 keyinstall 中的整数溢出漏洞，可能会导致界外读后果。执行该攻击要求系统执行权限和本地提权，无需用户交互。受影响的芯片集包括：MT6580、MT6731、MT6735、MT6737、MT6739、MT6753、MT6757、MT6757C、MT6757CD、MT6757CH、MT6761、MT6762、MT6763、MT6765、MT6768、MT6769、MT6771、MT6779、MT6781、MT6785、MT6789、MT6833、MT6835、MT6853、MT6853T、MT6855、MT6873、MT6875、MT6877、MT6879、MT6883、MT6885、MT6886、MT6889、MT6891、MT6893、MT6895、MT6983、MT6985、MT8185、MT8321、MT8385、MT8666、MT8667、MT8765、MT8766、MT8768、MT8781、MT8786、MT8788、MT8789、MT8791、MT8791T和MT8797。受影响软件版本为安卓11.0、12.0和13.0。  
  
CVE-2023-20755是位于 keyinstall 中的输入验证不当漏洞，可能导致界外读，从而造成本地提权。利用该漏洞要求系统执行权限，无需用户交互。受影响芯片集包括：MT6580、MT6731、MT6735、MT6737、MT6739、MT6753、MT6757、MT6757C、MT6757CD、MT6757CH、MT6761、MT6762、MT6763、MT6765、MT6768、MT6769、MT6771、MT6779、MT6781、MT6785、MT6789、MT6833、MT6835、MT6853、MT6853T、MT6855、MT6873、MT6875、MT6877、MT6879、MT6883、MT6885、MT6886、MT6889、MT6891、MT6893、MT6895、MT6983、MT6985、MT8185、MT8321、MT8385、MT8666、MT8667、MT8765、MT8766、MT8768、MT8781、MT8786、MT8788、MT8789、MT8791、MT8791T和MT8797。受影响软件版本包括安卓11.0、12.0和13.0。  
  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/2f0f8f82d14e138963df2a60f2b9892c376de99c2ec4422ed0b024c0474b1932.png "")  
  
**中危漏洞**  
  
  
  
  
  
如下漏洞为中危级别的漏洞：  
  
- CVE-2023-20753：界外写  
  
- CVE-2023-20756：整数溢出或回绕  
  
- CVE-2023-20757：cmdq中的输入验证不当漏洞  
  
- CVE-2023-20758：cmdq中的输入验证不当漏洞  
  
- CVE-2023-20759：cmdq中的输入验证不当漏洞  
  
- CVE-2023-20760：apu中的输入验证不当漏洞  
  
- CVE-2023-20761：ril中的输入验证不当漏洞  
  
- CVE-2023-20766：gps中的输入验证不当漏洞  
  
- CVE-2023-20767：pqframework中的输入验证不当漏洞  
  
- CVE-2023-20768：使用不兼容类型访问资源（“类型混淆”）  
  
- CVE-2023-20771：通过同步不当的共享资源导致并行执行（“条件竞争”）  
  
- CVE-2023-20772: 认证不当  
  
- CVE-2023-20773: 认证不当  
  
- CVE-2023-20774: 显示中的输入验证不当  
  
- CVE-2023-20775：在没有检查输入大小的情况下造成的缓冲区复制（“典型的缓冲区溢出”）  
  
- CVE-2023-20689：整数溢出导致的缓冲区溢出  
  
- CVE-2023-20690：整数溢出导致的缓冲区溢出  
  
- CVE-2023-20691：整数溢出导致的缓冲区溢出  
  
- CVE-2023-20692：空指针解引用  
  
- CVE-2023-20693：空指针解引用  
  
- CVE-2022-32666：关键信息的UI错误表达  
  
- CVE-2023-20748：输入验证不当  
  
  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[奇安信入选全球《静态应用安全测试全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516678&idx=1&sn=5b9e480c386161b1e105f9818b2a5a3d&chksm=ea94b36cdde33a7a05cafa9918733669252a02611c222b02bc6e66cbb508ee3fbf748453ee7a&scene=21#wechat_redirect)  
  
  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[联发科固件现窃听漏洞，影响全球约三分之一的手机和物联网设备](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247509419&idx=2&sn=2f9d2960d52a795a5895a28287b29b59&chksm=ea9494c1dde31dd746b7adc04dff58cb689164d449cf30114b367a650a1bdd1c05242ba45a83&scene=21#wechat_redirect)  
  
  
[谷歌在三星Exynos 芯片集中发现18个0day漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515956&idx=1&sn=01fe340192b1659e658210ae4b02ac97&chksm=ea948e5edde30748775821e1c9ed1b389b2c0dd119e01cd78b9292d859542e3f209300000e4c&scene=21#wechat_redirect)  
  
  
[谷歌Titan M 芯片的这个严重漏洞，从1万跳涨到7.5万美元](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513590&idx=1&sn=ccdaf7e2571a6b7d793132cce9bcb946&chksm=ea94849cdde30d8a9cb16ff47d03cd027fa1f63b86f50c467697d8001e92ffce4cdf3c6ef030&scene=21#wechat_redirect)  
  
  
[无线共存：利用蓝牙和 WiFi 性能特性实现芯片间提权](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247509867&idx=2&sn=19471663d9505977efc3cef7e3a39044&chksm=ea949601dde31f17f54444101a87df6a48f743a459bdb122596fc52ff8d133aea1d207ff3488&scene=21#wechat_redirect)  
  
  
[专门针对苹果 M1 芯片的首款恶意软件已现身](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247501541&idx=4&sn=08e8ba8b96b5ed05bb1f7454e6028e9a&chksm=ea94f78fdde37e99026dee83656a2ae8ce2d51c21b208b8f22f374d1026877327fbe5811535d&scene=21#wechat_redirect)  
  
  
[FPGA 芯片被曝严重的 Starbleed 漏洞，影响数据中心IoT工业设备等](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247492842&idx=2&sn=bae9f8d38a7ce5fe53d4ef555dfb1866&chksm=ea94d580dde35c9629f63a72f02188ca2d62751e54f0d07ee8a0fdd0cba1eeebf0dfa1c6898a&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://gbhackers.com/mediatek-security-flaws/  
  
  
题图：Pixabay License  
  
  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/2c03ce3cc6bb81bca85bd412ed60e93c4bc0a295a1fc9d3739d8aca43497fbb4.jpg "")  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/b33054170f5acbf0023711f517b5bee9799a2f57b155a774d3945e6d78184e63.jpg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/8a5c84b98d9b52b1d4f4306180ec26c9aa65342b326b5b98ad2f097b488152f4.gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
