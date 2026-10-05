---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-fc18efccce54123bb642b7eb"
entity_id: "ve-fc18efccce54123bb642b7eb"
schema_version: "1"
title: "Fortinet：注意FortiWLM漏洞，黑客可获得管理员权限"
product: "FortiWLM"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2023-34990"
referenced_identifiers: ""
prerequisites: "未认证imagename路径遍历读含会话日志→会话劫持；8.6≤.5/8.5≤.4"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Fortinet/Fortinet%EF%BC%9AFortiWLM%E6%BC%8F%E6%B4%9E%EF%BC%8C%E9%BB%91%E5%AE%A2%E5%8F%AF%E8%8E%B7%E5%BE%97%E7%AE%A1%E7%90%86%E5%91%98%E6%9D%83%E9%99%90.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Fortinet：注意FortiWLM漏洞，黑客可获得管理员权限   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：FortiWLM
- 本文讨论：CVE-2023-34990
- 版本、权限与配置前提：未认证imagename路径遍历读含会话日志→会话劫持；8.6≤.5/8.5≤.4
- 资料类型：研究披露新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 前称2024年3月仍未修复，后称补丁2023年9月已发，时间线自相矛盾
- 2024年12月公告与2023补丁发布时间混写
- 开头直称执行代码但本CVE步骤是读日志再借会话，需额外端点/会话有效前提；无一手链接

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 披露与修复日期、会话后续RCE条件待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Bill Toulas  代码卫士   2024-12-20 10:02  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Fortinet 披露了位于 Fortinet Wireless Manager（FortiWLM）中的一个严重漏洞CVE-2023-34990，可导致远程攻击者通过特殊构造的web请求执行越权代码或命令，从而控制设备。**  
  
  
  
  
FortiWLM 是一款中心化管理工具，供政府机构、医疗组织机构、教育机构和大型企业  
用于监控、管理和优化无线网络。该漏洞是一个相对路径遍历漏洞，CVSS评分为9.8。  
  
Horizon3 公司的研究员 Zach Hanley 发现并在2023年5月将漏洞报送给 Fortinet。然而，10个月之后该漏洞仍未被修复，于是Hanley 在2024年3月14日决定披露信息和PoC，另外还提到了自己从该厂商发现的其它漏洞。  
  
  
**窃取管理员会话ID**  
  
![](../../.resource/remote/a51849e8fea92474995fa5e97a6044d2f8160022ed8471125545de9d2055e94b.gif "")  
  
  
  
该漏洞可导致身份未认证的攻击者利用 “/ems/cgi-bin/ezrf_lighttpd.cgi” 端点中的输入验证不当漏洞。  
  
当 “op_type” 设置为 “upgradelogs”，利用 “imagename” 参数中的目录遍历技术，攻击者可从该系统中读取敏感的日志文件。这些日志中通常包含管理员会话ID，可用于劫持管理员会话并获得提升后的权限，使攻击者接管设备。  
  
Hanley 解释称，“攻击者通过滥用输入验证构建请求，而imagename 参数中包含一个路径遍历漏洞，从而使攻击者读取系统上的任何日志文件。FortiWLM 拥有非常详细的日志，记录着所有已认证用户的会话ID。利用上述任意日志文件读漏洞，攻击者可获取用户的会话ID并滥用已认证的端点。”该漏洞影响 FortiWLM 8.6.0至8.6.5以及8.5.0至8.5.4版本。  
  
尽管研究员已发布公开提醒，但当时缺少CVE ID 以及安全通告说明用户并未意识到这一风险以及需要更新至安全版本。Fortinet 公司在昨天发布安全公告提到，2024年12月18日，CVE-2023-34990在 FortiWLM 8.6.6和8.5.5中修复，已在2023年9月发布。  
  
CVE-2023-34990在大约四个月的时间里是0day状态，FortiWLM 用户直到10个月之后才从 Hanley 的 writeup 中发现该漏洞。然而，又过了9个月后，Fortinet 公司才发布安全通告。鉴于FortiWLM 部署在关键环境中的情况，它可能是攻击者的有价值目标，远程攻陷该漏洞可导致网络中断和敏感数据遭暴露。因此，强烈建议 FortiWLM 管理员及时应用所有可用的更新。  
  
  
****  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[黑客称窃取 440GB 文件，Fortinet 证实数据遭泄露](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520799&idx=2&sn=d02acbabe690ef64658cea5df0e53131&scene=21#wechat_redirect)  
  
  
[Fortinet 修复 FortiOS 中的代码执行漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519734&idx=2&sn=e2956d27d020b75520e84dc6e02b483a&scene=21#wechat_redirect)  
  
  
[Fortinet 修复严重的 FortiClientLinux 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519274&idx=1&sn=0db6fdb46bf03ada98af3901110ee37b&scene=21#wechat_redirect)  
  
  
[Fortinet 提醒注意端点管理软件中的严重RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519060&idx=1&sn=bd31e9a884e83396402ed8ca25c23ecd&scene=21#wechat_redirect)  
  
  
[Fortinet 提醒注意严重的FortiSIEM命令注入漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518159&idx=1&sn=44370db9677abd274914bebd182e5446&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/fortinet-warns-of-critical-fortiwlm-bug-giving-hackers-admin-privileges/  
  
  
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
