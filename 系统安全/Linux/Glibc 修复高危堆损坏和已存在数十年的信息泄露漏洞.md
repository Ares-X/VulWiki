---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2026-0861;CVE-2026-0915"
identifier_role: "primary"
primary_identifiers: "CVE-2026-0861;CVE-2026-0915"
referenced_identifiers: ""
identifier_status: "unknown"
title: "Glibc 修复高危堆损坏和已存在数十年的信息泄露漏洞"
product: "GNU glibc"
record_type: "roundup"
document_type: "双漏洞修复新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "0861称2.30–2.42且控制size/alignment；0915称2.0–2.42、DNS后端、零网络地址及观察DNS通道"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/Glibc%20%E4%BF%AE%E5%A4%8D%E9%AB%98%E5%8D%B1%E5%A0%86%E6%8D%9F%E5%9D%8F%E5%92%8C%E5%B7%B2%E5%AD%98%E5%9C%A8%E6%95%B0%E5%8D%81%E5%B9%B4%E7%9A%84%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://securityonline.info/decades-old-flaw-new-heap-corruption-critical-glibc-bugs-revealed/"
id: "vw-b3cf19f01f96ba7eac31b803"
entity_id: "ve-b3cf19f01f96ba7eac31b803"
schema_version: "1"
---

# Glibc 修复高危堆损坏和已存在数十年的信息泄露漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：GNU glibc
- 文献类型：双漏洞修复新闻
- 版本、权限及部署边界：0861称2.30–2.42且控制size/alignment；0915称2.0–2.42、DNS后端、零网络地址及观察DNS通道
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. frontmatter未列两主CVE；堆损坏与信息泄露应分实体，保留较高利用前提说明
2. 标题修复却未列修复版本/提交，只有影响范围，需补官方glibc公告
3. 原媒体链接存在，CVSS/ASLR泄漏效果需按一手证据核验；不应提升为普通Linux通用root漏洞
4. 巨量空行/产品广告/历史推荐为噪声；功能名后杂散反引号

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://securityonline.info/decades-old-flaw-new-heap-corruption-critical-glibc-bugs-revealed/>
- 原文参考链接（未重新核验）：<https://oss.qianxin.com/#/login>
- 原文参考链接（未重新核验）：<https://sast.qianxin.com/#/login>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518790&idx=1&sn=3a59b1cc8580a5f1c75bb61edc82557b&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247507215&idx=2&sn=9451d613c59577c68be952afc782fdb3&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524359&idx=1&sn=f18cc055bc4baae64ee46cf0d4b05e0d&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523972&idx=1&sn=7b06c31940ea7576d0236d9310886b39&scene=21#wechat_redirect>

### 归档技术正文

Ddos
                    Ddos  代码卫士   2026-01-19 10:43  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**支撑绝大多数 Linux 系统的核心库GNU C 库（glibc）的维护者披露了两个漏洞的细节，一个是已存在十几年之久的信息泄露漏洞CVE-2026-0915，另外一个是高危堆损坏漏洞CVE-2026-0861。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
尽管两个漏洞都可能带来严重后果，但由于利用所需的技术前提条件较高，其实际影响可能有限。其中更严重的是 CVE-2026-0861，CVSS 评分8.4。该漏洞涉及库中内存对齐函数 “memalign”、“posix_memalign”` 和 “aligned_alloc”的整数溢出问题。该漏洞影响 glibc 2.30 至 2.42 版本。如果攻击者能迫使应用程序传递特定的参数组合，溢出就可能导致堆损坏。要触发此崩溃，攻击者必须同时控制 size（大小）和 alignment（对齐）两个参数。此外，size 参数必须极大（接近 PTRDIFF_MAX）才能触发溢出。安全公告指出，这是一个“不常见的使用模式”，因为对齐参数通常是固定值（如页面大小），而非用户控制的输入。  
  
第二个漏洞是信息泄露漏洞 CVE-2026-0915，已存在了数十年，影响 2.0 至 2.42 版本。该漏洞存在于“getnetbyaddr”和“getnetbyaddr_r”函数中。当调用这些函数查询“零值网络”时，如果系统配置为使用 DNS 后端，该函数可能意外地将未修改的栈内容传递给 DNS 解析器。这种“栈内容泄露”构成了对主机机密性的破坏。尽管泄露的数据在空间上仅限于相邻的栈区域，但熟练的攻击者理论上可以利用泄露的指针值加速绕过 ASLR。  
  
与上述整数溢出漏洞类似，此漏洞的利用门槛也很高。攻击者需要能够在应用程序与 DNS 服务器之间进行窥探捕获泄露的数据，因此攻击复杂性很高。  
  
建议系统管理员评估其对自身发行版的具体影响，并在有条件时应用补丁。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Linux glibc 漏洞可导致攻击者在主要发行版本获得 root 权限](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518790&idx=1&sn=3a59b1cc8580a5f1c75bb61edc82557b&scene=21#wechat_redirect)  
  
  
[Linux glibc 库的修复方案扯出更严重的新漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247507215&idx=2&sn=9451d613c59577c68be952afc782fdb3&scene=21#wechat_redirect)  
  
  
[很多福布斯AI 50强公司的 GitHub 仓库泄露机密信息](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524359&idx=1&sn=f18cc055bc4baae64ee46cf0d4b05e0d&scene=21#wechat_redirect)  
  
  
[十几家安全大厂信息遭泄露，谁是 Salesforce-Salesloft 供应链攻击的下一个受害者？](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523972&idx=1&sn=7b06c31940ea7576d0236d9310886b39&scene=21#wechat_redirect)  
  
  
[已存在数十年的PostgreSQL漏洞影响多家云厂商，企业数据库遭暴露](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513590&idx=2&sn=d39361bd34d64d8416bb282dd8ccf9d6&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://securityonline.info/decades-old-flaw-new-heap-corruption-critical-glibc-bugs-revealed/  
  
  
题图：Pixa  
bay Licens  
e  
  
  
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
