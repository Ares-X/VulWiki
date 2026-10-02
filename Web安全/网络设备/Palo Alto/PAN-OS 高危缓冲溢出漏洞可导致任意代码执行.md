---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-472d7ec629f1c10c5ea7c2cb"
entity_id: "ve-472d7ec629f1c10c5ea7c2cb"
schema_version: "1"
title: "PAN-OS 高危缓冲溢出漏洞可导致任意代码执行"
product: "PAN-OS User-ID Terminal Server Agent"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2026-0288"
referenced_identifiers: ""
prerequisites: "需配置至少一个TSA；12.1/11.2/11.1/10.2分支，列修复12.1.8/11.2.13/11.1.16/10.2.18-h8"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Palo%20Alto/PAN-OS%20%E9%AB%98%E5%8D%B1%E7%BC%93%E5%86%B2%E6%BA%A2%E5%87%BA%E6%BC%8F%E6%B4%9E%E5%8F%AF%E5%AF%BC%E8%87%B4%E4%BB%BB%E6%84%8F%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  PAN-OS 高危缓冲溢出漏洞可导致任意代码执行  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：PAN-OS User-ID Terminal Server Agent
- 本文讨论：CVE-2026-0288；0300只是历史引用
- 版本、权限与配置前提：需配置至少一个TSA；12.1/11.2/11.1/10.2分支，列修复12.1.8/11.2.13/11.1.16/10.2.18-h8
- 资料类型：新闻预警；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 元数据未录主CVE；引用只有二级报道无官方公告直链
- Prisma Access两个分支未具体列出；正文被逐词换行干扰

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 修复矩阵、评分与无已知利用为报道时状态待官方核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Do Son
                    Do Son  代码卫士   2026-07-10 07:40  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Palo Alto Networks****公司披露了一个****PAN-OS****缓冲区溢出漏洞（****CVE-2026-0288****，****CVSS****评分****7.2****）。该漏洞位于****User-ID****终端服务器代理中。网络上的未认证攻击者可利用该漏洞导致防火墙崩溃或执行代码。该公司称尚未发现已知的利用行为。**  
  
PAN-OS  
防火墙守护着众多企业网络的边界。因此，允许任意代码执行的漏洞尤为严重。该漏洞无需登录，也无需用户交互。值得注意的是，另一个相关的  
PAN-OS  
漏洞  
CVE-2026-0300  
已遭在野利用，并于  
2026  
年  
5  
月被列入  
CISA  
的  
KEV  
目录。这一前车之鉴提高了快速修补的紧迫性，尽管该漏洞目前尚无被利用的迹象。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/t5z0xV2OYfWqYfaUve45wyHhzYqFYrd7Zz3XkuWsDLuRplt0ibMxmiaF7CiagmwBQMTuodgsVB0G3gE4qy6AL0D7CY5FNs82ISUloic2YTzS854/640?wx_fmt=gif&from=appmsg "")  
  
**攻击方式**  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/t5z0xV2OYfUXRrNAaI05W4icvLumsXvacqB2Prxf3o7OnkiaNH1kJL84tyP2XibhstJpFw8tWSicBsgMUDicubZBdrFDSVVfzjFsfXibApQf9b0Yc/640?wx_fmt=gif&from=appmsg "")  
  
  
  
该漏洞源于终端服务器代理中的一组缓冲区溢出。攻击者向  
TSA  
服务发送特殊构造的网络流量，这些输入会溢出缓冲区，导致拒绝服务，或可能实现任意代码执行。只有配置了至少一个  
TSA  
条目的设备才受影响。管理员可以在  
“  
设备  
 >   
用户识别  
 >   
终端服务器代理  
”  
下进行确认。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/t5z0xV2OYfVkQby0J2FXwcL8mMXW8nSdHpSic3xDKUUYV9fq1ugoXoYnVOMPASM7EjlvIFY9cUp5c6NGe8AHpNCicibfzypK28qgqYjtyNHR1Q/640?wx_fmt=gif&from=appmsg "")  
  
**受影响版本**  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/t5z0xV2OYfUDQeBgGRgHhcXkzGsbeW1lBp5ic1VfvIcHn7IoLyBLicMErLP4ricggjuDba7ia0woq5xmIXBhtenubXhDYkD0VEV51NlyrI7CkuI/640?wx_fmt=gif&from=appmsg "")  
  
  
  
该漏洞影响  
PAN-OS 12.1  
、  
11.2  
、  
11.1  
和  
10.2  
的特定修复版本之前的版本。  
Cloud NGFW  
和  
Panorama  
不受影响。  
Prisma Access  
有两个分支被评为中等严重性。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/t5z0xV2OYfWHY4RiaY1kmtJUaEmZWNvNicDByD4vXPubKluy1fLUYdtUwlnypM1D53WBics4ap10J8KpfjNgkw9SgibAKBLPibrXv8g3psQrALp0/640?wx_fmt=gif&from=appmsg "")  
  
**补丁与缓解措施**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/t5z0xV2OYfXAXAZ0iauNR2pIkgy6u2dOdCsHIqrfpdc6KObX8H5uZB4Idpvriacv6REs3ZrT7ga6o71ZQ1uTx5BZReoUDk1HwnDkZc6CEcazg/640?wx_fmt=gif&from=appmsg "")  
  
  
  
用户应更新到已修复的版本，如  
12.1.8  
、  
11.2.13  
、  
11.1.16  
或  
10.2.18-h8  
。用户需在  
Palo Alto  
的安全公告中确认所用分支的确切修复版本。在完成修补之前，应将  
TSA  
连接限制为受信任的内部  
IP  
地址。仅此一步即可大幅降低该  
PAN-OS  
缓冲区溢出漏洞带来的风险。  
  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[PAN-OS GlobalProtect 认证绕过漏洞已遭活跃利用](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526149&idx=1&sn=64865321252297906000fede942608f5&scene=21#wechat_redirect)  
  
  
[Palo Alto 提醒注意严重的 PAN-OS RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525932&idx=2&sn=a1f8acec7865ec3eec445777c4ad6251&scene=21#wechat_redirect)  
  
  
[Palo Alto Networks 修复PAN-OS 中的认证绕过漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522232&idx=2&sn=3bc7a4466c3c33ff643ca604524fa401&scene=21#wechat_redirect)  
  
  
[Palo Alto Networks：注意潜在的 PAN-OS RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521440&idx=1&sn=3bf8ff26ce74c0c7fbfeb2701a773a5f&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://securityonline.info/pan-os-cve-2026-0288/  
  
  
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
