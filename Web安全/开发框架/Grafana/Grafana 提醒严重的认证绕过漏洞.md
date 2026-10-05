---
source: "gelusus/wxvl 公众号漏洞文库"
product: "Grafana/Azure AD 多租户账号映射认证绕过"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2023-3128"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Grafana 提醒严重的认证绕过漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：6.7.0引入，列固定10.0.1/9.5.5/9.4.13/9.3.16/9.2.20/8.5.27；需多租户Azure OAuth且无allowed_groups限制"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-7a7822d307fa8993d9006089"
entity_id: "ve-7a7822d307fa8993d9006089"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：6.7.0引入，列固定10.0.1/9.5.5/9.4.13/9.3.16/9.2.20/8.5.27；需多租户Azure OAuth且无allowed_groups限制

代码与实验材料：无PoC，解释跨租户相同邮件映射及单租户/allowed_groups缓解

来源证据范围：代码卫士译Bill Toulas/BleepingComputer，链接英文新闻但不链接官方公告

- **事实待核（1）**：版本分支概括不完整；依据：叙述列8.5、9.2、9.3、9.5、10.0却漏后面实际列出的9.4；各分支的或后续版本应明确限定分支。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（2）**：配置位置和时效需明确；依据：allowed_groups称Azure AD设置，应给Grafana配置节；Grafana云已修为2023-06-25历史状态。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Grafana 提醒注意严重的认证绕过漏洞   
Bill Toulas  代码卫士   2023-06-25 17:51  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**Grafana 为其多个应用版本发布安全修复方案，修复了一个严重漏洞，它可使攻击者绕过认证并接管使用 Azure Active Directory 用于认证的任何 Grafana 账户。该漏洞的编号是CVE-2023-3128，CVSS v3.1评分是9.4。**  
  
  
![](../../.resource/remote/2f0f8f82d14e138963df2a60f2b9892c376de99c2ec4422ed0b024c0474b1932.png "")  
  
  
Grafana 是一款广泛使用的开源分析和交互可视化 app，通过大量监控平台和应用程序提供很多集成选择。Grafana Enterprise 是具有更多能力的付费版本，用于多家著名组织机构中，如 Wikimedia、Bloomberg、JP Morgan Chase、eBay、PayPal 和 Sony。  
  
该漏洞是由Grafana 基于在所关联“配置邮件”设置中邮件地址对 Azure AD 账户进行认证引发的。然而，该设置在所有 Azure AD 租户中并非唯一，导致威胁行动者可使用与Grafana 合法用户邮件地址一样的地址，创建 Azure AD 账户。Grafana 在安全公告中指出，“当通过多租户 Azure AD OAuth 应用程序配置 Azure AD OAuth 时，可导致 Grafana 账户接管和认证绕过后果。如遭利用，攻击者可完全控制用户账户，包括访问客户私密数据和敏感信息等。”  
  
  
![](../../.resource/remote/2f0f8f82d14e138963df2a60f2b9892c376de99c2ec4422ed0b024c0474b1932.png "")  
  
**Grafana 云已修复**  
  
  
  
  
  
该漏洞影响所有配置为使用 Azure AD OAuth进行用户认证的 Grafana 部署。这些部署的认证方式是通过多租户 Azure 应用且未对可进行验证的用户群组进行限制（通过‘allowed_groups’配置进行验证）。  
  
该漏洞存在于6.7.0及后续所有 Grafana 版本中，不过8.5、9.2、9.3、9.5和10.0分支中已有修复方案。  
  
推荐升级至如下版本修复该漏洞：  
  
- Grafana 10.0.1 或后续版本  
  
- Grafana 9.5.5 或后续版本  
  
- Grafana 9.4.13 或后续版本  
  
- Grafana 9.3.16 或后续版本  
  
- Grafana 9.2.20 或后续版本  
  
- Grafana 8.5.27 或后续版本  
  
  
  
对于无法将 Grafana 实例升级至安全版本的用户，建议采取如下两种缓解措施：  
  
1、在 Azure AD 中注册单一租户应用，阻止从外部租户（组织机构以外的人员）的登录尝试。  
  
2、在 Azure AD 设置中增加 “allowed_groups” 配置，限制对白名单群组成员的登录尝试从而自动拒绝使用任意邮件的所有登录尝试。  
  
Grafana 的安全公告中还给出因本次更新引入的变化，可能在特定用例场景下产生的问题，因此如发生“用户同步失败”或“用户已存在”等错误时，应仔细阅读相关安全公告。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[奇安信入选全球《静态应用安全测试全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516678&idx=1&sn=5b9e480c386161b1e105f9818b2a5a3d&chksm=ea94b36cdde33a7a05cafa9918733669252a02611c222b02bc6e66cbb508ee3fbf748453ee7a&scene=21#wechat_redirect)  
  
  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[Grafana 漏洞可导致管理员账户遭接管](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513049&idx=1&sn=31af4654137f918dc610ee51cf05649a&chksm=ea9482b3dde30ba52955e905e02c6ad57b4a76135e68d0d1e1505a0b880881d1ebbaf02c1942&scene=21#wechat_redirect)  
  
  
[Grafana 中存在严重的未授权任意文件读取漏洞，已遭利用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247509616&idx=2&sn=27c5f9e457a2c2aa08753d9d0a67917e&chksm=ea94971adde31e0c1ef794f7f77da8facde48f26c488332293e3d9fd4efed7542bf00b7a0585&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/grafana-warns-of-critical-auth-bypass-due-to-azure-ad-integration/  
  
  
题图：Pixabay License  
  
  
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
