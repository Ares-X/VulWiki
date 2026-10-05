---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-038b20a9dbdf7c2adb8422a6"
entity_id: "ve-038b20a9dbdf7c2adb8422a6"
schema_version: "1"
title: "Palo Alto 修复已遭利用的严重PAN-OS DoS 漏洞"
product: "PAN-OS DNS Security及Prisma Access"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-3393"
referenced_identifiers: ""
prerequisites: "DNS Security日志开启；列多个hotfix及管理平台差异"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Palo%20Alto/Palo%20Alto%20%E4%BF%AE%E5%A4%8D%E5%B7%B2%E9%81%AD%E5%88%A9%E7%94%A8%E7%9A%84%E4%B8%A5%E9%87%8DPAN-OS%20DoS%20%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Palo Alto 修复已遭利用的严重PAN-OS DoS 漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：PAN-OS DNS Security及Prisma Access
- 本文讨论：CVE-2024-3393
- 版本、权限与配置前提：DNS Security日志开启；列多个hotfix及管理平台差异
- 资料类型：DoS新闻与缓解指引；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- Prisma版本10.2.8及后续或11.2.3之前语义交叠，应按分支列表
- “攻击者通过负责重启防火墙的数据面板发送”译文混淆攻击来源与崩溃组件
- 无官方公告直链，仅THN二级来源

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 补丁矩阵及在野利用状态需以报道时官方证据确认
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Ravie Lakshmanan  代码卫士   2024-12-30 10:12  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Palo Alto Networks 披露了一个影响 PAN-OS 软件的高危漏洞（CVE-2024-3393，CVSS 8.7），它可在易受攻击设备上引发拒绝服务 (DoS) 条件。**  
  
  
![](../../.resource/remote/26d5a8ed0658bbcb99a3ea0a76399cc3e169d4b464fad40bcf233f2abbbbb5df.png "")  
  
  
  
该漏洞影响 PAN-OS 10.X 和11.X 版本以及运行PAN-OS 10.2.8及后续或11.2.3之前版本的 Prisma Access。该漏洞已在 PAN-OS 10.1.14-h8、PAN-OS 10.2.10-h12、PAN-OS 11.1.5、PAN-OS 11.2.3以及后续PAN-OS版本中修复。  
  
Palo Alto 公司上周五发布公告称，“Palo Alto Networks PAN-OS软件的DNS Security 特性中存在一个拒绝服务漏洞，可导致未认证攻击者通过负责重启防火墙的数据面板发送恶意数据包。反复触发该条件可导致防火墙进入维护模式。”  
  
Palo Alto 公司表示在生产使用中发现了该缺陷，并发现客户“的防火墙拦截触发该问题的恶意DNS数据包时，经历了拒绝服务。”  
  
这起攻击活动的范围目前尚不知晓。Palo Alto 公司证实称该漏洞已遭在野利用，“我们积极发布该公告，提供透明度并让客户获得保护自身环境安全的信息。”  
  
值得注意的是，启用了DNS Security 日志记录功能的防火墙受该漏洞影响。另外如果访问权限是通过 Prisma Access 向已认证终端用户提供的，则该漏洞的CVSS严重性评分将至7.1分。  
  
修复方案已扩展至其它常部署的维护发布版本中：  
  
- PAN-OS 11.1 (11.1.2-h16、11.1.3-h13、11.1.4-h7和11.1.5)  
  
- PAN-OS 10.2（10.2.8-h19、10.2.9-h19、10.2.10-h12、10.2.11-h10、 10.2.12-h4、10.2.13-h2和10.2.14）  
  
- PAN-OS 10.1 (10.1.14-h8 和10.1.15)  
  
- PAN-OS 10.2.9-h19 和 10.2.10-h12（仅适用于Prisma Access）  
  
- PAN-OS 11.0（该版本已在2024年11月17日达到生命周期，因此无修复方案）  
  
  
  
作为未管理的防火墙或由 Panorama 管理的防火墙的应变措施和缓解措施，客户可将通过 Objects＞Security Profiles＞Anti-spyware＞（选择一个配置）＞DNS Policies＞DNS Security，将每个 Anti-Spyware 配置的所有已配置DNS Security 类别的Log Severity 设为 “none”。  
  
对于由 Strata Cloud Manager (SCM) 管理的防火墙，用户可按照如上步骤在每台设备上直接禁用 DNS Security 日志记录功能，或者通过打开支持案例的方式在所有设备上禁用。对于由SCM管理的Prisma Access 租户，建议打开支持案例关闭日志记录功能，等待执行升级。  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Palo Alto 防火墙 0day 由低级开发错误引发](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521617&idx=2&sn=0e9ac32a3223e727cd6cd99460e0387e&scene=21#wechat_redirect)  
  
  
[Palo Alto Networks：注意潜在的 PAN-OS RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521440&idx=1&sn=3bf8ff26ce74c0c7fbfeb2701a773a5f&scene=21#wechat_redirect)  
  
  
[Palo Alto 修复多个严重的防火墙漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521075&idx=1&sn=2987012f618a751eabf08e620add0615&scene=21#wechat_redirect)  
  
  
[Palo Alto：注意！PAN-OS 防火墙 0day 漏洞已遭利用](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519289&idx=1&sn=86e226003b5da9dd0d6867f4b45fcb1a&scene=21#wechat_redirect)  
  
  
[Palo Alto Networks：PAN-OS DDoS 漏洞已遭在野利用](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513567&idx=1&sn=181b3bb7e1b34dc9dd67bfde798f4c7d&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://thehackernews.com/2024/12/palo-alto-releases-patch-for-pan-os-dos.html  
  
  
题图：  
Pexels   
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
