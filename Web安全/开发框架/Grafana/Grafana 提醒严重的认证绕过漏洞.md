---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Grafana 提醒注意严重的认证绕过漏洞   
Bill Toulas  代码卫士   2023-06-25 17:51  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**Grafana 为其多个应用版本发布安全修复方案，修复了一个严重漏洞，它可使攻击者绕过认证并接管使用 Azure Active Directory 用于认证的任何 Grafana 账户。该漏洞的编号是CVE-2023-3128，CVSS v3.1评分是9.4。**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMRhKmAekLpadfATw9IOQlnwiabZmyr8o4VibLCoT9KKafiaAaiaic9Ov84R8zsHVGCK2AtfjDoqHl41XaA/640?wx_fmt=png "")  
  
  
Grafana 是一款广泛使用的开源分析和交互可视化 app，通过大量监控平台和应用程序提供很多集成选择。Grafana Enterprise 是具有更多能力的付费版本，用于多家著名组织机构中，如 Wikimedia、Bloomberg、JP Morgan Chase、eBay、PayPal 和 Sony。  
  
该漏洞是由Grafana 基于在所关联“配置邮件”设置中邮件地址对 Azure AD 账户进行认证引发的。然而，该设置在所有 Azure AD 租户中并非唯一，导致威胁行动者可使用与Grafana 合法用户邮件地址一样的地址，创建 Azure AD 账户。Grafana 在安全公告中指出，“当通过多租户 Azure AD OAuth 应用程序配置 Azure AD OAuth 时，可导致 Grafana 账户接管和认证绕过后果。如遭利用，攻击者可完全控制用户账户，包括访问客户私密数据和敏感信息等。”  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMRhKmAekLpadfATw9IOQlnwiabZmyr8o4VibLCoT9KKafiaAaiaic9Ov84R8zsHVGCK2AtfjDoqHl41XaA/640?wx_fmt=png "")  
  
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
