---
source: "gelusus/wxvl 公众号漏洞文库"
product: "Bamboo Data Center/Server"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-21689"
referenced_identifiers: "CVE-2023-22527"
identifier_role: "primary"
identifier_status: "unknown"
title: "Atlassian Bamboo Data Center and Server中存在RCE漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：Says9.1.0–9.6.0, fixes9.2.17/9.6.5; authenticated attacker"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-f4aa525456bb1fe3925e6788"
entity_id: "ve-f4aa525456bb1fe3925e6788"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Says9.1.0–9.6.0, fixes9.2.17/9.6.5; authenticated attacker

代码与实验材料：No technical mechanism or PoC; news not reproduction

来源证据范围：SecurityOnline source link, primary Atlassian advisory absent

- **事实待核（1）**：Single broad version interval inconsistent with multi-branch patching; obtain exact branch ranges。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **来源与引用处置（2）**：Missing CVE metadata and excessive unrelated promotional footer。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Atlassian Bamboo Data Center and Server中存在RCE漏洞   
DO SON  代码卫士   2024-08-21 18:08  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Atlassian 公司发布 Bamboo Data Center and Server 产品安全公告，修复了一个高危的远程代码执行 (RCE) 漏洞CVE-2024-21689，CVSS评分为7.6，可为使用受影响软件版本带来严重风险。**  
  
![](../../.resource/remote/7201218f10737303029c6b0deaea0581788d33ced866f7b98eb5a800fc8b9091.gif "")  
  
  
CVE-2024-21689影响 Bamboo Data Center and Server 9.1.0至9.6.0版本，可导致认证攻击者在 Bamboo 环境中执行任意代码，从而造成多种后果，包括强烈影响目标系统的机密性、完整性和可用性。  
  
该漏洞对依赖 Bamboo进行持续集成和部署流程的组织机构影响尤其大。鉴于Bamboo 在自动化构建、测试和发布中的作用，攻击者可利用RCE获得越权代码执行权限，从而攻陷整个软件开发管道。  
  
Atlassian 公司已发布修复方案并督促客户升级 Bamboo 实例。该公司建议无法升级的用户更新至如下包括补丁的版本：  
  
- Bamboo Data Center and Server 9.2：升级至9.2.17或后续版本  
  
- Bamboo Data Center and Server 9.6：升级至9.6.5或后续版本  
  
  
  
管理员应优先升级至这些版本，缓解该漏洞，避免所在组织机构遭受重大威胁如数据泄露、服务终端和恶意利用等。  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Atlassian 修复Confluence等产品中的多个高危漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520092&idx=2&sn=cc02ff9f6ef98e6d539f13b4c6c892c2&chksm=ea94be36dde3372074c503b63e7b5eb83dec6be08550d41b4537fcb9fc282e8691c7bd3597c3&scene=21#wechat_redirect)  
  
  
[Atlassian Confluence 高危漏洞可导致代码执行](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519665&idx=2&sn=86259d3f96b173403f1a65b601fc1989&chksm=ea94bcdbdde335cd0f308951f098245eea81c0364b1a3726dc92bad88f1ce58de6b53eef24ec&scene=21#wechat_redirect)  
  
  
[Atlassian 发布20多个漏洞，含严重的 Bamboo 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519117&idx=2&sn=c0c8035f5617c6f76c73e71b9e73f04f&chksm=ea94bae7dde333f1efbbaeff72b89df023bbc2e6d408df713a753e060c09ff210656828d17d9&scene=21#wechat_redirect)  
  
  
[Atlassian Confluence 远程代码执行漏洞(CVE-2023-22527)安全风险通告](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518678&idx=1&sn=aedf682361f621f14474e78244d3242e&chksm=ea94b8bcdde331aa278b8d6c8fe7f1df9ec253aa21e960355a967894be85796756b54e173c95&scene=21#wechat_redirect)  
  
  
[Atlassian 修复多款产品中的多个严重RCE漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518302&idx=1&sn=9ede9c29a5c7c063571222672e754926&chksm=ea94b934dde330222c90b770d277247b3ad535c2b85b8082228c17630922ff9ea123ab19691f&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://securityonline.info/cve-2024-21689-rce-vulnerability-in-atlassian-bamboo-data-center-and-server/  
  
  
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
