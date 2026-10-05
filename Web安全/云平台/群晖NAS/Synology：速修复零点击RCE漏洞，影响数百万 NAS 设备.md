---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Synology：速修复零点击RCE漏洞，影响数百万 NAS 设备"
product: "Synology Photos/BeePhotos"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-4aec9a34b24d4b6e735aef62"
entity_id: "ve-4aec9a34b24d4b6e735aef62"
schema_version: "1"
---

# Synology：速修复零点击RCE漏洞，影响数百万 NAS 设备

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 主CVE-2024-10443缺元数据
- QNAP50389/50387/50388为其他产品独立记录
- 受影响版本段实际列修复版本需分字段
- 百万设备估计应归因研究团队并保留日期
- 无PoC应标新闻公告
- 补厂商原始链接并清广告

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

THN  代码卫士   2024-11-06 17:53  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Synology 已修复影响 DiskStation 和 BeePhotos 的一个严重漏洞，可导致远程代码执行后果，编号是CVE-2024-10443。**  
  
  
![](../../.resource/remote/f06e2f5274cab008783f77e65bebe04443c456536ad86c5e57464501ce34c984.png "")  
  
  
该漏洞由 Midnight Blue 团队的研究员 Rick de Jager在 Pwn2Own 爱尔兰大赛中发现，被命名为 “RISK:STATION”。  
  
“RISK:STATION”是一个“未认证的零点击漏洞，可导致攻击者在热门 Synology DiskStation 和 BeeStation NAS 设备上获得root 级别权限，影响数百万台设备。”该漏洞的零点击性质意味着无需用户交互即可触发利用，因此可导致攻击者获得对设备的访问权限，窃取敏感数据并植入其它恶意软件。  
  
受影响版本如下：  
  
- BeePhotos for BeeStation OS 1.0（更新到 1.0.2-10026 或以上版本）  
  
- BeePhotos for BeeStation OS 1.1（更新到 1.1.0-10053 或以上版本）  
  
- Synology Photos 1.6 for DSM 7.2（更新到 1.6.2-0720 或以上版本）  
  
- Synology Photos 1.7 for DSM 7.2（更新到 1.7.0-0795 或以上版本）  
  
  
  
该漏洞详情尚未发布，以便用户及时更新。Midnight Blue 团队表示目前大约有一百万到两百万台设备同时受影响且被暴露到互联网。  
  
  
![](../../.resource/remote/ef198bd58ff3b6b66ec9614749ab6236efcc46bc195e9c53b3b3e360f3d5bbae.gif "")  
  
**QNAP修复3个严重漏洞**  
  
  
  
QNAP 此前也修复了在该大赛上找到的影响 QuRouter、SMB Service 和 HBS 3 Hybrid Backup Sync 的三个漏洞，如下：  
  
- CVE-2024-50389 – 在QuRouter 2.4.5.032及后续版本中修复。  
  
- CVE-2024-50387 – 在SMB Service 4.15.002 和 SMB Service h4.15.002及后续版本中修复。  
  
- CVE-2024-50388 – 在HBS 3 Hybrid Backup Sync 25.1.1.673及后续版本修复。  
  
  
  
虽然尚未有证据表明如上漏洞已遭在野利用，但鉴于NAS设备在过去已成为勒索攻击的高价值目标，因此建议用户尽快应用这些补丁。  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Synology DiskStation 管理器中存在管理员接管漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517932&idx=1&sn=9aaa589151fc57b5ed8857172e182519&chksm=ea94b786dde33e906d4170051544d5ca36357c9a2e4a8ca1ce085902be836266fc9ab9f548a3&scene=21#wechat_redirect)  
  
  
[Synology 修复严重的VPN路由器漏洞，CVSS评分10分](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515192&idx=1&sn=e87e601569d5822582e1538bb28323b7&chksm=ea948d52dde30444d574600b79a6c202142ec2bf9b6ce53a72934ada80a5c93a9670132bbf3f&scene=21#wechat_redirect)  
  
  
[开源组件 Netatalk 存在多个严重漏洞，Synology 多款产品受影响](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511627&idx=2&sn=2ad8e314dfc9a7c5a8bcb5668e49b4f2&chksm=ea949f21dde31637c2b8855f093f9389f7a47187b7d4f00ed7e189132c1f0629ad5d60a8b7b1&scene=21#wechat_redirect)  
  
  
[合勤紧急修复NAS设备中的RCE漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519665&idx=1&sn=16f68838d4899ea09b8df2f5f96357ab&chksm=ea94bcdbdde335cdc94e76fa3278e8af36adadc6af065778ed4f389d32ac7d826a4ad944c89f&scene=21#wechat_redirect)  
  
  
[QNAP提醒注意NAS设备中严重的认证绕过漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519033&idx=2&sn=59f095fb0e0636ab2257aaf9cc7d7e27&chksm=ea94ba53dde333458f33894831a44c39ac69f925de1b9e7262ba526c9c4ebe0f113e84a4f2e5&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://thehackernews.com/2024/11/synology-urges-patch-for-critical-zero.html  
  
  
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
