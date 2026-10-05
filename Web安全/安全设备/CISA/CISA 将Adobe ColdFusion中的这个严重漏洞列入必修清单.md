---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-de283a523c8c26cb46084eee"
entity_id: "ve-de283a523c8c26cb46084eee"
schema_version: "1"
title: "CISA 将Adobe ColdFusion中的这个严重漏洞列入必修清单"
product: "Adobe ColdFusion"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2023-26359"
referenced_identifiers: ""
prerequisites: "2018 Update15及以前、2021 Update5及以前；2023年3月修复"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/CISA/CISA%20%E5%B0%86Adobe%20ColdFusion%E4%B8%AD%E7%9A%84%E8%BF%99%E4%B8%AA%E4%B8%A5%E9%87%8D%E6%BC%8F%E6%B4%9E%E5%88%97%E5%85%A5%E5%BF%85%E4%BF%AE%E6%B8%85%E5%8D%95.md"
review_date: "2026-10-02"
category_recommendation: "Web安全/服务器应用/Adobe ColdFusion"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  CISA 将Adobe ColdFusion中的这个严重漏洞列入必修清单   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Adobe ColdFusion
- 本文讨论：CVE-2023-26359主，26360关联历史
- 版本、权限与配置前提：2018 Update15及以前、2021 Update5及以前；2023年3月修复
- 资料类型：KEV新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 误归CISA/安全设备，实际ColdFusion服务端产品
- 缺Adobe和KEV原始链接/具体修复Update；在野方式未知说明应保留
- 广告/推荐冗余

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 版本矩阵和KEV历史信息待查
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

THN  代码卫士   2023-08-23 18:56  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**美国网络安全和基础设施安全局 (CISA) 将Adobe ColdFusion 中的一个严重漏洞 (CVE-2023-26359) 列入“已知利用漏洞”分类中。**  
  
  
![](../../.resource/remote/587e74c46c8cb4d7d888ff9e411abd7c8e3deea987127e875a8f7e5aebf1f187.png "")  
  
  
该漏洞的CVSS 评分为9.8，与Adobe ColdFusion 2018（Update 15及更早版本）和 ColdFusion 2021（Update 5及更早版本）中的一个反序列化漏洞有关，无需任何交互，攻击者就可在当前用户上下文中执行任意代码。  
  
反序列化即从字节流中重建数据结构或对象的过程。但如果是在未验证来源或清理内容的情况下执行，则可导致异常后果如代码执行或拒绝服务。Adobe 公司已在2023年3月修复。截止目前尚不清楚该漏洞如何遭在野利用。  
  
话虽如此，五个月前，CISA 曾将影响该产品的另外一个漏洞 (CVE-2023-26360)加入必修清单。Adobe 公司表示已注意到该漏洞被用于针对 ColdFusion 的“非常有限的攻击”中。  
  
鉴于遭活跃利用，CISA要求联邦民事行政部门 (FCEB) 机构在2023年9月11日前应用必要补丁，保护网络免受潜在威胁。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[严重的 ColdFusion 缺陷被用于释放 webshell](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517089&idx=1&sn=dc6bce66dfc343de897d81dfb68108b8&chksm=ea94b2cbdde33bdd2eedd6497d1fe31d5bded9a4271eb7a287978f59c76fa633d7277a547b3c&scene=21#wechat_redirect)  
  
  
[CISA紧急提醒：Adobe ColdFusion漏洞已遭在野利用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515947&idx=3&sn=76c36938bf1b7401950fc62730020638&chksm=ea948e41dde30757c6826cbbaeba673c04d191b437bd8a20532e2a13614e94562772ade4c057&scene=21#wechat_redirect)  
  
  
[十多年前的 Adobe ColdFusion 漏洞被用于勒索攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247507998&idx=2&sn=fd44dbdbf72b7df83e081524bebf4667&chksm=ea949174dde318623fad2d710dd6603f2144e71e5ab47ff56088e63eb917ccc2beabfea3ef2c&scene=21#wechat_redirect)  
  
  
[马上更新！严重的 ColdFusion 0day 漏洞已遭在野利用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247489336&idx=3&sn=c3ea6cc56bb965afc7ced3a581f3f733&chksm=ea972652dde0af44760ed912f78d3a2667634cb227baa1c7e4b892205eb3d5434c9c42e01d7b&scene=21#wechat_redirect)  
  
  
[Adobe ColdFusion 漏洞已遭利用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247488479&idx=4&sn=6e6c63ccafbaebd78b756034c84fc8fc&chksm=ea9722b5dde0aba3ba1b52272228a6aa4aa44dc6ec09bb372341a744956067ec60db010e30b5&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2023/08/critical-adobe-coldfusion-flaw-added-to.html  
  
  
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
