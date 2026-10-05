---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2022-2856"
identifier_role: "primary"
primary_identifiers: "CVE-2022-2856"
referenced_identifiers: ""
identifier_status: "unknown"
title: "谷歌修复今年第五个Chrome 0day"
product: "Chrome Intents"
record_type: "advisory"
document_type: "历史零日修复新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "Chrome104.0.5112.101修复；具体平台/输入触发条件未列"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Chrome/%E8%B0%B7%E6%AD%8C%E4%BF%AE%E5%A4%8D%E4%BB%8A%E5%B9%B4%E7%AC%AC%E4%BA%94%E4%B8%AAChrome%200day.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://portswigger.net/daily-swig/multiple-cloud-vendors-impacted-by-postgresql-vulnerability-that-exposed-enterprise-databases"
id: "vw-b28de04ad29e07597f087ca8"
entity_id: "ve-b28de04ad29e07597f087ca8"
schema_version: "1"
---

# 谷歌修复今年第五个Chrome 0day

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Chrome Intents
- 文献类型：历史零日修复新闻
- 版本、权限及部署边界：Chrome104.0.5112.101修复；具体平台/输入触发条件未列
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 原文链接指向PostgreSQL云数据库漏洞，和Chrome2856主题明显不符，是来源串文
2. 元数据漏2856；第五个须2022时点，不得与2024同名文章按标题合并
3. Candiru归因属于前一个7月漏洞，不是本文2856；另十项补丁无编号不应猜配
4. 缺Google官方公告和准确逐平台范围；推广占大半，新闻无需补PoC

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://portswigger.net/daily-swig/multiple-cloud-vendors-impacted-by-postgresql-vulnerability-that-exposed-enterprise-databases>
- 原文参考链接（未重新核验）：<https://codesafe.qianxin.com>
- 原文参考链接（未重新核验）：<https://oss.qianxin.com****>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513028&idx=3&sn=79c8d781d604e70522630b58315bf010&chksm=ea9482aedde30bb8b7d8d21ea1ae630e8716995afec64599d4e6d5bff0cf26c5c6cdbfd6fd6a&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512717&idx=1&sn=90d9ee1cbcb33e3442cfd9d4d4c1d958&chksm=ea9483e7dde30af103b74637ffdefd0a6d62164388d12598a2a74b18e802f659d18f3e11a70f&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510517&idx=1&sn=01c2fbf5b20d5383ef9f1327cf138481&chksm=ea94989fdde3118908c671a6ba54f925e7f1d26b06e99a98e1118e0a92b57448f4537309eef6&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247508832&idx=2&sn=35432117540e416637e9bf098b7328ef&chksm=ea94920adde31b1c3d02d93bacf14fcb010212a7eda50a6d71baa5f86ea35683c090df4ced46&scene=21#wechat_redirect>

### 归档技术正文

Eduard Kovacs  代码卫士   2022-08-18 19:01  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
****  
谷歌发布Chrome 104更新，修复了11个漏洞，其中包含一个已遭利用的0day。  
  
  
该漏洞编号为CVE-2022-2856，是和在Intents 组件中不受信任输入的验证不充分有关的一个高危漏洞。  
  
虽然谷歌并未共享关于该攻击的任何信息，但表示该公司的威胁分析团队在7月19日报告了该漏洞。  
  
这是谷歌自2022年以来修复的第五个0day。第四个0day出现在7月早期，其利用被指和以色列间谍软件公司 Candiru 有关，被指用于攻击中东地区的实体。  
  
3月份，谷歌证实Chrome 0day利用激增，并表示多种因素导致这一结果，如攻击者通常会在一次exploit中利用多个缺陷。  
  
这次更新还修复了由Project Zero 团队研究员发现的一个严重的释放后使用漏洞，以及谷歌员工或外部研究员发现的五个其它高危漏洞。外部研究员可获得5000或7000美元的奖励金。  
  
Chrome 104.0.5112.101还修复了三个中危漏洞，其中两个为研究员赢得3000美元和2000美元的奖励。  
  
  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：  
https://oss.qianxin.com****  
  
  
![](../../.resource/remote/7ac0e4dd5ecf5ae15d5f5eede1491e723925c4ff6a4ed491da1c31ac64c5b113.jpg "")  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[间谍软件 Candiru 利用 Chrome 0day 攻击记者](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513028&idx=3&sn=79c8d781d604e70522630b58315bf010&chksm=ea9482aedde30bb8b7d8d21ea1ae630e8716995afec64599d4e6d5bff0cf26c5c6cdbfd6fd6a&scene=21#wechat_redirect)  
  
  
[Chrome 103紧急修复已遭利用的0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512717&idx=1&sn=90d9ee1cbcb33e3442cfd9d4d4c1d958&chksm=ea9483e7dde30af103b74637ffdefd0a6d62164388d12598a2a74b18e802f659d18f3e11a70f&scene=21#wechat_redirect)  
  
  
[谷歌Chrome 紧急修复已遭利用的0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510517&idx=1&sn=01c2fbf5b20d5383ef9f1327cf138481&chksm=ea94989fdde3118908c671a6ba54f925e7f1d26b06e99a98e1118e0a92b57448f4537309eef6&scene=21#wechat_redirect)  
  
  
[谷歌Chrome 紧急修复已遭利用的两个0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247508832&idx=2&sn=35432117540e416637e9bf098b7328ef&chksm=ea94920adde31b1c3d02d93bacf14fcb010212a7eda50a6d71baa5f86ea35683c090df4ced46&scene=21#wechat_redirect)  
  
  
[尽快更新！Chrome 修复两个已遭在野利用的 0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247508234&idx=1&sn=76c54274b09a1ee0cf97517226065126&chksm=ea949060dde31976260239768a71e3301df0201499a85b353fbdf31c128aecf64652b53ee055&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://portswigger.net/daily-swig/multiple-cloud-vendors-impacted-by-postgresql-vulnerability-that-exposed-enterprise-databases  
  
  
题图：  
Pexels License  
‍  
  
  
  
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
