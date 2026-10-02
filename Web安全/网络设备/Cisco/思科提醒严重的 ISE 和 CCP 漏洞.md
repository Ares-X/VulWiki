---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-c2be4bff42ffbc193cfb4ed5"
entity_id: "ve-c2be4bff42ffbc193cfb4ed5"
schema_version: "1"
title: "思科提醒注意严重的 ISE 和 CCP 漏洞"
product: "Cisco ISE云部署；Customer Collaboration Platform"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-20286"
referenced_identifiers: ""
prerequisites: "主漏洞要求主管理节点云部署；AWS/Azure/OCI，列VMware与本地豁免；无版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/%E6%80%9D%E7%A7%91%E6%8F%90%E9%86%92%E4%B8%A5%E9%87%8D%E7%9A%84%20ISE%20%E5%92%8C%20CCP%20%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  思科提醒注意严重的 ISE 和 CCP 漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cisco ISE云部署；Customer Collaboration Platform
- 本文讨论：CVE-2025-20286
- 版本、权限与配置前提：主漏洞要求主管理节点云部署；AWS/Azure/OCI，列VMware与本地豁免；无版本
- 资料类型：多漏洞新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 标题CCP正文末段却写CSP，产品名冲突
- 无修复构建和官方公告，二手URL缺scheme
- reset-config会恢复出厂且备份恢复旧凭据，重要风险已说明但不可简化成重置密码

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 云区域/版本、修复与重置步骤待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Sergiu Gatlan  代码卫士   2025-06-05 10:37  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**思科发布补丁，修复了位于身份服务引擎 (ISE) 和客户协作平台 (CCP) 解决方案中的、已存在公开利用代码的三个漏洞。**  
  
其中最严重的是位于思科ISE中的静态凭据漏洞CVE-2025-20286。ISE 是基于身份的策略执行软件，在企业环境中提供端点访问控制和网络设备管理服务。该漏洞是因为在云平台上部署ISE时不当生成凭据造成的，可导致不同部署共享凭据。  
  
未认证攻击者可从ISE云部署中提取用户凭据并借此访问其它云环境中的部署。然而，如思科解释，威胁行动者只有在主管理节点在云中部署时才能成功利用该漏洞。  
  
思科解释称，“部署了思科ISE的AWS、微软 Azure 和 Oracle OCI 云中存在一个漏洞，可导致未认证的远程攻击者在受影响系统中访问敏感数据、执行有限的管理员操作、修改系统配置或者破坏服务。思科PSIRT 已了解到本安全公告中提到的漏洞已存在 PoC 利用代码。”  
  
思科还提到，如下ISE 部署不受影响：  
  
- 所有从思科软件下载中心（ISO或OVA）中安装工件的具有任何形状参数的所有本地部署，包括具有不同形状参数的设备和虚拟机。  
  
- Azure VMware Solution (AVS) 上的 ISE  
  
- 谷歌云 VMware Engine 上的ISE  
  
- AWS中VMware 云上的ISE  
  
- 具有所有本地ISE 管理员角色（主要和第二管理员）以及具有云中其它角色的ISE 混合部署  
  
  
  
思科建议仍在等待热修复方案或无法立即应用今天所发布热修复方案的管理员，在主管理角色云节点上运行命令 application reset-config ise，重置用户密码。然而，管理员应该意识到该命令将把思科 ISE 重置为出厂配置，恢复备份也将恢复原始凭据。  
  
今天修复的其它拥有 PoC 利用代码的两个漏洞一个是位于ISE中的任意文件上传 (CVE-2025-20130)，另外一个是位于思科 CSP 中的信息泄露漏洞 (CVE-2025-20129)。  
  
去年9月份，思科还修复了另外一个已存在公开利用代码的ISE漏洞，它是命令注入漏洞，可导致攻击者在未修复系统上提权至根权限。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Atlassian 和思科修复多个高危漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522791&idx=2&sn=841f61a29df71610844f2e021c5c9bab&scene=21#wechat_redirect)  
  
  
[思科智能许可证实用程序中的严重漏洞已遭利用](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522568&idx=2&sn=ec34401dbcb58be493c11352d5815bb6&scene=21#wechat_redirect)  
  
  
[思科修复 IOS XR 中的10个漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522518&idx=3&sn=6117e55c1a630be2784ce1a5033b2094&scene=21#wechat_redirect)  
  
  
[思科： Webex 漏洞可导致凭据遭远程访问](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522410&idx=2&sn=0aef267bcd2c2f831a7dedbda98b4668&scene=21#wechat_redirect)  
  
  
[思科ISE严重漏洞导致攻击者以root权限运行命令](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522190&idx=2&sn=9702cf83b7bdb3ee94d30829bea9f51b&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
bleepingcomputer.com/news/security/cisco-warns-of-ise-and-ccp-flaws-with-public-exploit-code/  
  
  
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
