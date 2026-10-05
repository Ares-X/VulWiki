---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-91e845a2623a6a3da5c17973"
entity_id: "ve-91e845a2623a6a3da5c17973"
schema_version: "1"
title: "思科 Unified CM 中存在满分漏洞，可用于获得root权限"
product: "Cisco Unified CM/SME"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-20309"
referenced_identifiers: "CVE-2025-20281; CVE-2025-20282"
prerequisites: "15.0.1.13010-1至15.0.1.13017-1；开发root静态凭据"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/%E6%80%9D%E7%A7%91%20Unified%20CM%20%E4%B8%AD%E5%AD%98%E5%9C%A8%E6%BB%A1%E5%88%86%E6%BC%8F%E6%B4%9E%EF%BC%8C%E5%8F%AF%E7%94%A8%E4%BA%8E%E8%8E%B7%E5%BE%97root%E6%9D%83%E9%99%90.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  思科 Unified CM 中存在满分漏洞，可用于获得root权限  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cisco Unified CM/SME
- 本文讨论：CVE-2025-20309
- 版本、权限与配置前提：15.0.1.13010-1至15.0.1.13017-1；开发root静态凭据
- 资料类型：新闻通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 缺修复版本及官方公告URL
- root登录日志为调查线索，不能仅凭root事件确认利用此漏洞；营销噪声

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 确切补丁与登录条件待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Ravie Lakshmanan  代码卫士   2025-07-03 10:55  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**思科发布安全更新，修复了位于Unified CM 和 Unified CM SME中的一个满分漏洞CVE-2025-20309，CVSS评分10分，可导致攻击者以 root 用户身份登录可疑设备，获得提升后的权限。**  
  
![](../../.resource/remote/36b36005e60183d3603e8c2d5f0b55ab066f22ab6e7dafe7c44c0fa65d02a936.png "")  
  
  
思科在安全公告中提到，“该漏洞是由于为开发保留的root账户的静态用户凭据而引起的。攻击者可利用该账号登录到受影响系统，利用该漏洞，以 root 用户身份执行任意命令。”  
  
此类硬编码凭据通常源自开发过程中的测试或快速修复，但永远不应进入生产系统。 Unified CM负责处理公司语音通话和通信，这类工具的 root 访问权限可导致攻击者更深入地移到网络中、监听通话或更改用户的登录方式。  
  
思科表示未发现该漏洞遭在野利用的证据，且该漏洞是在内部安全测试过程中发现的。该漏洞影响 Unified CM 和 Unified CM SME 15.0.1.13010-1至 15.0.1.13017-1的所有版本，无论设备配置如何。  
  
思科还发布了与该漏洞相关联的妥协指标 (IoCs)，表示成功利用该漏洞可导致具有 root 权限的 root 用户在 "/var/log/active/syslog/secure" 日志文件中留下日志条目，可通过从命令行界面运行如下命令获取该日志：  
```
cucm1# file get activelog syslog/secure
```  
  
  
几天前，思科刚刚修复了位于ISE和ISE Passive Identity Connector 中的两个严重漏洞（CVE-2025-20281和CVE-2025-20282），它们可导致未认证攻击者以 root 用户身份执行任意命令。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[思科提醒注意 ISE 中的满分 RCE 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523394&idx=1&sn=6155e41bcc07bb70bcdcdd88cc88d8de&scene=21#wechat_redirect)  
  
  
[思科 AnyConnect VPN 服务器漏洞可用于触发 DoS 条件](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523347&idx=1&sn=4789a7999ec060d43881b5c1f1b8e576&scene=21#wechat_redirect)  
  
  
[思科提醒注意严重的 ISE 和 CCP 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523184&idx=1&sn=f205e1639e39bac5e3d3496845db4087&scene=21#wechat_redirect)  
  
  
[Atlassian 和思科修复多个高危漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522791&idx=2&sn=841f61a29df71610844f2e021c5c9bab&scene=21#wechat_redirect)  
  
  
[思科智能许可证实用程序中的严重漏洞已遭利用](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522568&idx=2&sn=ec34401dbcb58be493c11352d5815bb6&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2025/07/critical-cisco-vulnerability-in-unified.html  
  
  
题图：  
Pixabay Licen  
se  
  
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
