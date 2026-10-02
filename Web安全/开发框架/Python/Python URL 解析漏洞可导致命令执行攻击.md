---
source: "gelusus/wxvl 公众号漏洞文库"
product: "Python urllib.parse/URL解析差异"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2023-24329"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Python URL 解析漏洞可导致命令执行攻击"
prerequisites: "来源所述条件，未列明部分仍待核：列3.7.17/3.8.17/3.9.17/3.10.12/3.11.4/3.12修复；需按分支核"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-ea50ef5653c527f99dccc6ac"
entity_id: "ve-ea50ef5653c527f99dccc6ac"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：列3.7.17/3.8.17/3.9.17/3.10.12/3.11.4/3.12修复；需按分支核

代码与实验材料：前导空格URL样例，无应用验证器/消费器差异示例

来源证据范围：TheHackerNews二手，称CERT/CC但无直接公告

- **结论使用边界（1）**：解析问题被直接标题化为命令执行；依据：RCE需额外危险协议/执行功能及前后解析不一致，urlparse本身不执行命令。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：字符类型误译；依据：示例是前导空格而称空字符易误认为NUL，需准确区分C0控制与空白。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Python URL 解析漏洞可导致命令执行攻击   
THN  代码卫士   2023-08-14 17:46  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**Python URL 解析函数中存在一个高危漏洞，可用于绕过通过拦截清单实现的域或协议过滤方法，从而导致任意文件读取和命令执行后果。该漏洞的编号为CVE-2023-24329，CVSS评分为7.5。**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMRBGNwgicSuTe4Y4rEOSqVh2Oh4ehfs24kGuWSkdIa78Lfyy14XNT1icYGk0XVHJgBEkia0R3jwibEVjg/640?wx_fmt=png "")  
  
  
CERT/CC 在上周五发布安全公告指出，“当整个URL以空字符开头时，urlparse 就会存在一个解析问题。该漏洞影响主机名和图式的解析，最终可导致任何拦截清单方法失效。”  
  
发现和报送该漏洞的研究员 Yebo Cao 表示，该漏洞已在如下版本中修复：  
  
-  >= 3.12  
  
- 3.11.x >= 3.11.4  
  
- 3.10.x >= 3.10.12  
  
- 3.9.x >= 3.9.17  
  
- 3.8.x >= 3.8.17 以及  
  
- 3.7.x >= 3.7.17  
  
  
  
Urllib.parse 是广泛使用的解析函数，很可能将URL分解为其成分，或者将这些组件组合到 URL 字符串中。该漏洞是由于缺乏输入验证导致的，因此可导致攻击者提供以空字符开头的 URL（如" https://youtube[.]com"）来绕过拦截清单方法。  
  
研究员提到，“尽管拦截清单被视为不好的选择，但在很多场景下仍然需要拦截清单。该漏洞有助于攻击者绕过开发人员为图式和主机设置的防护措施。该漏洞在很多场景下可导致 SSRF 和 RCE 后果。”  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[奇安信入选全球《静态应用安全测试全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516678&idx=1&sn=5b9e480c386161b1e105f9818b2a5a3d&chksm=ea94b36cdde33a7a05cafa9918733669252a02611c222b02bc6e66cbb508ee3fbf748453ee7a&scene=21#wechat_redirect)  
  
  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[恶意 PyPI 包通过编译后的 Python 代码绕过检测](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516649&idx=4&sn=f367f72fbebdff5d48ad087be1a03b77&chksm=ea94b083dde339955d97f7ee0185de146bffb9aebcd533221e32cc770bb884036c61712f4f08&scene=21#wechat_redirect)  
  
  
[Python 开发人员提醒：PyPI 木马包假冒流行库发动攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515700&idx=2&sn=28c134528939223ed316b6f5b450dcd6&chksm=ea948f5edde306489a6bb564bbb5995de242208d44ab2dde95fce873e09f15d1fc295584cb61&scene=21#wechat_redirect)  
  
  
[Python 中存在原型污染漏洞变体](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515248&idx=2&sn=ab4334c673f4692a40a2a921e4c2476c&chksm=ea948d1adde3040cd03302eef42f2439894eec7a3f536e3cc0699148c91f1ba6126e9875a80d&scene=21#wechat_redirect)  
  
  
[W4SP Stealer瞄准Python开发人员，发动供应链攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514414&idx=2&sn=04e04c2acb029f4232895de2f58ae419&chksm=ea948844dde30152cde88117c034776924648f472995c0f3e61e0ad0a2cafa85f683191d85cd&scene=21#wechat_redirect)  
  
  
[这个Python 0day 已存在15年，已影响超过35万个开源项目](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514063&idx=1&sn=af25c27ad54510e1a26e0be3ee3f9ae0&chksm=ea9486a5dde30fb370f1097da820fadd2dd27b86c0b224d0f788da0c94f8303e42379547afa8&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2023/08/new-python-url-parsing-flaw-enables.html  
  
  
题图：Pixabay License  
  
  
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
