---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-41869"
identifier_role: "primary"
primary_identifiers: "CVE-2024-41869"
referenced_identifiers: "CVE-2022-24086"
identifier_status: "unknown"
title: "Adobe 修复Acrobat Reader 0day漏洞"
product: "Adobe Acrobat / Acrobat Reader"
record_type: "advisory"
document_type: "Acrobat补丁绕过/PoC新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "用户打开特制PDF并交互对话框；8月补丁不完整、9月再修的报道，具体受影响/修复版本未列"
side_effects: "正文明确公开样本仅崩溃、没有恶意payload，RCE为漏洞潜在能力，不能标题PoC让人误以为已武器化或在野恶意执行"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Adobe/Adobe%20%E4%BF%AE%E5%A4%8DAcrobat%20Reader%200day%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://www.bleepingcomputer.com/news/security/adobe-fixes-acrobat-reader-zero-day-with-public-poc-exploit/"
id: "vw-49b4dc7e8923be5cffd91962"
entity_id: "ve-49b4dc7e8923be5cffd91962"
schema_version: "1"
---

# Adobe 修复Acrobat Reader 0day漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Adobe Acrobat / Acrobat Reader
- 文献类型：Acrobat补丁绕过/PoC新闻
- 版本、权限及部署边界：用户打开特制PDF并交互对话框；8月补丁不完整、9月再修的报道，具体受影响/修复版本未列
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. frontmatter缺主41869，应补；推荐24086不应误抽
2. 正文明确公开样本仅崩溃、没有恶意payload，RCE为漏洞潜在能力，不能标题PoC让人误以为已武器化或在野恶意执行
3. 6月PoC、8月未完整修复、昨天9月补丁需转换明确日期/版本，原研究待发布属历史状态
4. BleepingComputer原文可追溯，但缺Adobe正式公告/版本及EXPMON直接分析/样本来源，图片未视检
5. 大段沙箱产品宣言/本地产品广告/推荐可精简，保留原作者与译者归属

### 操作风险

正文明确公开样本仅崩溃、没有恶意payload，RCE为漏洞潜在能力，不能标题PoC让人误以为已武器化或在野恶意执行

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.bleepingcomputer.com/news/security/adobe-fixes-acrobat-reader-zero-day-with-public-poc-exploit/>
- 原文参考链接（未重新核验）：<https://codesafe.qianxin.com>
- 原文参考链接（未重新核验）：<https://oss.qianxin.com>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517855&idx=2&sn=5ea5455de3ad27bd027a363a4b11a95a&chksm=ea94b7f5dde33ee34cdfbb1253dab1a695f4138beb5de5e782328ecbbfdee7df7e80594a5429&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517643&idx=1&sn=83e85b6b9bf3a9f0cf0c1843c9589950&chksm=ea94b4a1dde33db74b2b9c5ff5da439c9a2169fcab51d215bdc495affe02787d31ab6bcf7b98&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517437&idx=1&sn=561e8ad37f584120784a95e9ad1c33f4&chksm=ea94b597dde33c810a56421fadb562f0a4fbab00589ec4d11a1fb82d61b17dffcab841d4546a&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515947&idx=3&sn=76c36938bf1b7401950fc62730020638&chksm=ea948e41dde30757c6826cbbaeba673c04d191b437bd8a20532e2a13614e94562772ade4c057&scene=21#wechat_redirect>

### 归档技术正文

Lawrence Abrams  代码卫士   2024-09-12 17:35  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Acrobat Reader 中存在一个RCE 漏洞 (CVE-2024-41869)，其 PoC 已公开。**  
  
  
![](../../.resource/remote/f06e2f5274cab008783f77e65bebe04443c456536ad86c5e57464501ce34c984.png "")  
  
  
该漏洞是一个严重的释放后使用 (UAF) 漏洞，可导致在打开一个特殊构造的 PDF 文档时造成远程代码执行。UAF 漏洞是指当程序尝试访问已被释放或发布的内存位置中的数据时，就会被触发，从而导致异常行为如程序崩溃或冻结。  
  
然而，如果威胁行动者能够在该内存位置存储恶意代码，而且程序后续访问它，就会导致在目标设备上执行恶意代码。该漏洞已在最新版本的 Acrobat Reader 和 Adobe Acrobat 版本中修复。  
  
  
![](../../.resource/remote/d8ab9cf59ef7b3cc8e61e586814bcfb76287bdc14d20e9027cdb05714998e11b.png "")  
  
**6月已出现PoC利用**  
  
![](../../.resource/remote/dcd91b81a294fcc883ac5327699f62f4a6430c79ac6be82f8f1e7dda6ef60210.gif "")  
  
  
  
该 Acrobat Reader 0day 漏洞由研究员Haifei Li 创建的基于沙箱的平台 EXPMON 发现。该平台用于检测高阶利用如0day或难以检测（了解）的利用。他指出，“我创建 EXPMON 是因为我注意到市场上没有从利用或漏洞角度专门检测威胁的基于沙箱的检测分析系统。其它系统从恶意软件的角度进行检测，而利用/漏洞角度的检测对于高阶或更早检测而言更有必要。例如，如果因为某些条件，没有释放或执行恶意软件，或者攻击根本没有使用恶意软件，那么从恶意软件角度的检测系统就会错过这些威胁。利用的运行方式和恶意软件大不相同，因此该平台应运而生。”  
  
某个公开来源将大量样本提交到 EXPMON 平台进行分析时，发现了该0day 漏洞。这些样本包含一个导致崩溃的 PoC 利用的PDF文件。虽然该 PoC 利用尚未完成且不含恶意 payload，但它利用的是一个UAF漏洞，而该漏洞可用于远程代码执行。  
  
研究员将该漏洞报送给 Adobe 公司后，后者在8月份发布安全更新。然而，该更新并未修复该漏洞，关闭多个会话后仍然可被触发。EXPMON 平台发布帖子称，“我们在‘已打补丁的’ Adobe Reader 版本上测试了同样的样本，它显示了更多的对话，但如果用户点击/关闭这些会话后，该 app 仍然崩溃！还是同一个UAF漏洞！”昨天，Adobe 发布新的安全更新修复了该漏洞，并分配编号CVE-2024-41869。  
  
研究员将在 EXPMON 博客上发文详述如何检测到该漏洞，并在 Check Point 研究报告中发布更多技术详情。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Adobe Acrobat Reader 高危漏洞加入CISA必修清单](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517855&idx=2&sn=5ea5455de3ad27bd027a363a4b11a95a&chksm=ea94b7f5dde33ee34cdfbb1253dab1a695f4138beb5de5e782328ecbbfdee7df7e80594a5429&scene=21#wechat_redirect)  
  
  
[补丁星期二：微软、Adobe和Firefox纷纷修复已遭利用的 0day 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517643&idx=1&sn=83e85b6b9bf3a9f0cf0c1843c9589950&chksm=ea94b4a1dde33db74b2b9c5ff5da439c9a2169fcab51d215bdc495affe02787d31ab6bcf7b98&scene=21#wechat_redirect)  
  
  
[CISA 将Adobe ColdFusion中的这个严重漏洞列入必修清单](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517437&idx=1&sn=561e8ad37f584120784a95e9ad1c33f4&chksm=ea94b597dde33c810a56421fadb562f0a4fbab00589ec4d11a1fb82d61b17dffcab841d4546a&scene=21#wechat_redirect)  
  
  
[CISA紧急提醒：Adobe ColdFusion漏洞已遭在野利用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515947&idx=3&sn=76c36938bf1b7401950fc62730020638&chksm=ea948e41dde30757c6826cbbaeba673c04d191b437bd8a20532e2a13614e94562772ade4c057&scene=21#wechat_redirect)  
  
  
[厂商纷纷主动绕过Adobe发布的CVE-2022-24086安全补丁](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515346&idx=3&sn=7314d6f33c9cc44614100d627ee92de1&chksm=ea948db8dde304aeb1f522231dc8ba2f6cc789d08fd9bc2d2f0964ba7cd303a8233461778c96&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/adobe-fixes-acrobat-reader-zero-day-with-public-poc-exploit/  
  
  
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
