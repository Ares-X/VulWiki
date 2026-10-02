---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2025-27363"
identifier_role: "primary"
primary_identifiers: "CVE-2025-27363"
referenced_identifiers: "CVE-2020-15999"
identifier_status: "unknown"
title: "Meta：FreeType 0day漏洞已遭活跃利用"
product: "FreeType"
record_type: "advisory"
document_type: "漏洞在野新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "文称<=2.13.0，特定TrueTypeGX/变量字体子字形；发行版补丁回移状态待查"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/Meta%EF%BC%9AFreeType%200day%E6%BC%8F%E6%B4%9E%E5%B7%B2%E9%81%AD%E6%B4%BB%E8%B7%83%E5%88%A9%E7%94%A8.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://thehackernews.com/2025/03/meta-warns-of-freetype-vulnerability.html"
id: "vw-419070bbae9424cae1853012"
entity_id: "ve-419070bbae9424cae1853012"
schema_version: "1"
---

# Meta：FreeType 0day漏洞已遭活跃利用

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：FreeType
- 文献类型：漏洞在野新闻
- 版本、权限及部署边界：文称<=2.13.0，特定TrueTypeGX/变量字体子字形；发行版补丁回移状态待查
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 标题已遭活跃利用而原文仅可能已遭利用，结尾又当确认，需保留情报不确定性
2. 已修近两年与0day标题需说明披露/发现/修复时间区别；2.13.3当时推荐版不是最早修复版
3. 列发行版名称不足判易受影响，需包版本与backport；FreeType是受影响库，Meta是报告方
4. 仅THN二手原文无Meta安全公告/oss-security/修复提交；15999只是相关阅读

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://thehackernews.com/2025/03/meta-warns-of-freetype-vulnerability.html>
- 原文参考链接（未重新核验）：<https://codesafe.qianxin.com>
- 原文参考链接（未重新核验）：<https://oss.qianxin.com>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247496975&idx=1&sn=5c69254dfbb5bbaa3d544333c4f6052f&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517101&idx=2&sn=fed66598a1136b56ea3a7e3d25e4ce37&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511519&idx=3&sn=a4329ce667ca6721dfe9108d04506a37&scene=21#wechat_redirect>

### 归档技术正文

Ravie Lakshmanan  代码卫士   2025-03-14 18:39  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Meta 提醒称，开源字体渲染库 FreeType 中的一个 0day漏洞 (CVE-2025-27363) 可能已遭在野利用。**  
  
  
  
  
  
  
  
该漏洞的CVSS评分为8.1，是一个高危级别的界外写漏洞。当解析某些字体文件时，可被用于实现远程代码执行。该公司发布安全公告提到，“当解析与 TrueType GX 和变量字体文件有关的字体子字形结构时，FreeType 2.13.0及以下版本中就会存在一个界外写漏洞。易受攻击的代码将一个有符号短值分配给无符号的长值，之后添加一个静态值，导致其回绕并分配太小的堆缓冲区。之后该代码写入与该缓冲区相关的6个有符号的界外长整数，从而导致任意代码执行后果。”  
  
虽然该公司并未分享关于该漏洞如何遭利用的详情、幕后黑手以及攻击规模，但证实称该漏洞“或已遭在野利用”。  
  
FreeType 的开发员 Werner Lemberg 评论称，该漏洞的修复方案已集成近两年。Lemberg 表示，“FreeType 高于2.13.0的版本不再受影响。”开源安全邮件列表 oss-security 提到，Linux 的多个发行版本都在运行该库的过时版本，因此渲染时易受影响，包括：  
  
- AlmaLinux  
  
- Alpine Linux  
  
- Amazon Linux 2  
  
- Debian stable / Devuan  
  
- RHEL / CentOS Stream / Alma Linux / etc. 8 和9  
  
- GNU Guix  
  
- Mageia  
  
- OpenMandriva  
  
- openSUSE Leap  
  
- Slackware，以及  
  
- Ubuntu 22.04  
  
  
  
由于该漏洞已遭活跃利用，建议用户尽快将实例更新至最新版本Freetype 2.13.3。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[CVE-2020-15999：Chrome FreeType 字体库堆溢出原理分析](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247496975&idx=1&sn=5c69254dfbb5bbaa3d544333c4f6052f&scene=21#wechat_redirect)  
  
  
[Meta 发布开源且可商用的 AI 模型 LIama 2](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517101&idx=2&sn=fed66598a1136b56ea3a7e3d25e4ce37&scene=21#wechat_redirect)  
  
  
[Meta 推出完整性检查绕过漏洞奖励计划](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511519&idx=3&sn=a4329ce667ca6721dfe9108d04506a37&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2025/03/meta-warns-of-freetype-vulnerability.html  
  
  
  
题图：  
Pixabay   
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
