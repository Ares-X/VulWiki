---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Apache Syncope 漏洞可用于劫持用户会话  
Abinaya
                    Abinaya  代码卫士   2026-02-04 10:11  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Syncope****身份管理控制台中存在一个严重的 XML 外部实体 (XXE) 漏洞CVE-2026-23795，可导致管理员泄露敏感的用户数据并攻陷会话安全。该漏洞影响 Syncope 多个版本，应立即予以修复。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
当管理员创建或编辑 Keymaster 参数时，Apache Syncope控制台中对 XML 外部实体引用的限制不当，会为 XXE 攻击打开通道。具有充分管理员权限的攻击者可构造恶意 XML payload，导致数据遭暴露。该攻击向量利用应用程序在处理 XML 输入时缺乏适当验证和清理的漏洞，绕过了常规的安全限制。  
  
XXE 漏洞是身份管理系统中最危险的攻击向量之一，因为它们在应用层运行，可直接访问敏感的配置数据、用户凭据和认证令牌。鉴于 Syncope 作为用户身份与访问管理平台的角色，该漏洞的影响不仅限于个别会话，更可能危及整个认证基础设施。该漏洞影响 Apache Syncope 跨两个主要发行版本的多个分支：  
<table><tbody><tr><td data-colwidth="245" width="245" valign="top" style="border: 1px solid windowtext;padding:5px 10px;"><p style="text-align:left;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><strong><span leaf="">组件</span></strong></span></p></td><td data-colwidth="123" width="123" valign="top" style="border-top: 1px solid windowtext;border-right: 1px solid windowtext;border-bottom: 1px solid windowtext;border-image: initial;border-left: none;padding:5px 10px;"><p style="text-align:left;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><strong><span leaf="">受影响版本</span></strong></span></p></td><td data-colwidth="184" width="184" valign="top" style="border-top: 1px solid windowtext;border-right: 1px solid windowtext;border-bottom: 1px solid windowtext;border-image: initial;border-left: none;padding:5px 10px;"><p style="text-align:left;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><strong><span leaf="">已修复版本</span></strong></span></p></td></tr><tr><td data-colwidth="245" width="245" valign="top" style="border-right: 1px solid windowtext;border-bottom: 1px solid windowtext;border-left: 1px solid windowtext;border-image: initial;border-top: none;padding:5px 10px;"><p style="text-align:left;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><span leaf="">Syncope   Client IdRepo 控制台 (3.x)</span></span></p></td><td data-colwidth="123" width="123" valign="top" style="border-top: none;border-left: none;border-bottom: 1px solid windowtext;border-right: 1px solid windowtext;padding:5px 10px;"><p style="text-align:left;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><span leaf="">3.0至   3.0.15</span></span></p></td><td data-colwidth="184" width="184" valign="top" style="border-top: none;border-left: none;border-bottom: 1px solid windowtext;border-right: 1px solid windowtext;padding:5px 10px;"><p style="text-align:left;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><span leaf="">3.0.16</span></span></p></td></tr><tr><td data-colwidth="245" width="245" valign="top" style="border-right: 1px solid windowtext;border-bottom: 1px solid windowtext;border-left: 1px solid windowtext;border-image: initial;border-top: none;padding:5px 10px;"><p style="text-align:left;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><span leaf="">Syncope   Client IdRepo 控制台 (4.x)</span></span></p></td><td data-colwidth="123" width="123" valign="top" style="border-top: none;border-left: none;border-bottom: 1px solid windowtext;border-right: 1px solid windowtext;padding:5px 10px;"><p style="text-align:left;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><span leaf="">4.0至   4.0.3</span></span></p></td><td data-colwidth="184" width="184" valign="top" style="border-top: none;border-left: none;border-bottom: 1px solid windowtext;border-right: 1px solid windowtext;padding:5px 10px;"><p style="text-align:left;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><span leaf="">4.0.4</span></span></p></td></tr></tbody></table>  
运行这些版本的组织机构应当立即安排更新。该漏洞要求具有管理员级别的访问权限才能利用，虽然限制了直接的外部攻击面但带来了严重的内部威胁风险。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/t5z0xV2OYfVKytvw0AvsfHoQZYKG7rtrByMiauv7lzgxDDWe4s0sricFDAa4BicqycQUZJx4kibkicrNT5KUGWImC1oClEp3rTou39fWjFJ66Yia4/640?wx_fmt=gif&from=appmsg "")  
  
**攻击方法**  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/t5z0xV2OYfUtfgOyFpq0jw5sxvnW7dIZtoF9K1WK2odBxsvtYia4ibfoIvYPk9HfMPjbvqPVzFU8FxFDvUHXs0J8medFu5fgKP7icZAJloIdEY/640?wx_fmt=gif&from=appmsg "")  
  
  
  
执行攻击要求攻击者具有管理员账户权限，以通过Syncope控制台界面修改Keymaster参数。  
  
一旦通过认证，攻击者即可构造特殊格式的XML，其中包含指向敏感系统文件或内部网络资源的外部实体声明。当应用程序处理该恶意XML时，会解析外部实体并将其内容暴露给攻击者。该攻击技术使攻击者能够读取服务器上的任意文件、访问内部网络资源，并可能窃取用户会话令牌或身份验证凭据。  
  
由于攻击者首先需要管理员访问权限，该漏洞被评为中等级别，但其潜在影响仍然重大。Apache官方建议用户立即升级，3.x分支的用户应升级至3.0.16版本，4.x分支的用户应升级至4.0.4版本。无法立即修补的组织机构应限制管理控制台的访问权限，仅允许受信任人员操作，并实施额外的网络监控以检测可疑的XML解析活动。  
  
管理身份基础设施的组织机构应审查其部署状态，并在安全更新计划中优先处理此补丁，避免潜在的会话劫持和数据泄露事件发生。  
  
****  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Apache Struts 2 严重 XXE 漏洞可用于窃取敏感数据](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524857&idx=1&sn=7d98b989a61c9b25103ccef5b0524560&scene=21#wechat_redirect)  
  
  
[Apache StreamPipes 严重漏洞可用于获取管理员权限](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524778&idx=2&sn=17e6675d731950fb6f61f841bb161ef5&scene=21#wechat_redirect)  
  
  
[速修复！Apache Tika 中存在严重的满分XXE 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524600&idx=1&sn=fe09ca1df38ec9061341a2100567e69b&scene=21#wechat_redirect)  
  
  
[Apache Tomcat 漏洞导致服务器易受RCE攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524305&idx=2&sn=151df83a78bc5a9f5351bf4c295a1d03&scene=21#wechat_redirect)  
  
  
[Apache Tika PDF 解析器严重漏洞可导致攻击者访问敏感数据](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523874&idx=2&sn=b22dbc00b0eba38c857fdab5fc4fe7a7&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://cybersecuritynews.com/apache-syncope-vulnerability-2/  
  
  
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
