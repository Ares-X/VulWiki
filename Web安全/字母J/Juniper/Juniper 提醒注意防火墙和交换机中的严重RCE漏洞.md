---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Juniper 提醒注意防火墙和交换机中的严重RCE漏洞   
Sergiu Gatlan  代码卫士   2024-01-15 17:33  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Juniper Networks 公司发布安全更新，修复了位于 SRX 系列防火墙和EX系列交换机中的一个严重的预认证RCE漏洞 CVE-2024-21591。**  
  
  
该漏洞位于设备的 J-Web 配置接口中，可被未认证攻击者获得根权限或针对未修复设备发动拒绝服务攻击。在上周三的安全公告中，Juniper 公司提到，“该漏洞是因为使用一个不安全的函数造成的，可导致攻击者覆写任意内存。”Juniper 公司还提到安全事件响应团队未发现该漏洞已遭在野利用。  
  
易受该漏洞攻击的 Junos OS 版本如下：  
  
- 20.4R3-S9之前的Junos OS 版本  
  
- 21.2R3-S7之前的Junos OS 21.2版本  
  
- 21.3R3-S5之前的Junos OS 21.3 版本  
  
- 21.4R3-S5之前的Junos OS 21.4 版本  
  
- 22.1R3-S4之前的Junos OS 22.1版本  
  
- 22.2R3-S3之前的Junos OS 22.2版本  
  
- 22.3R3-S2之前的Junos OS 22.3版本  
  
- 22.4R2-S2, 22.4R3之前的Junos OS 22.4版本  
  
  
  
该漏洞已在 Junos OS 20.4R3-S9、21.2R3-S7、21.3R3-S5、21.4R3-S5、22.1R3-S4、22.2R3-S3、22.3R3-S2、22.4R2-S2、22.4R3、23.2R1-S1、23.2R2和23.4R1版本中修复。  
  
建议管理员立即应用这些安全更新或将JunOS 升级至最新版本，或者至少禁用 J-Web 几口删除该攻击向量。  
  
另外一个临时缓解措施是，将 J-Web 访问权限仅限于可信的网络主机，等待补丁部署。  
  
非盈利性互联网安全组织机构 Shadowserver 指出，超过8200台 Juniper 设备已将 J-Web 接口暴露在网络，多数源自韩国（Shodan 显示超过9000台）。  
  
11月，CISA 提醒称 Juniper预认证RCE漏洞已遭在野利用。该exploit 组合利用了四个漏洞CVE-2023-36844、CVE-2023-36845、CVE-2023-36846和CVE-2023-36847，影响该公司的 SRX 防火墙和 EX 交换机。  
  
8月25日，ShadowServer 检测到首次利用尝试，而在此之前的一个月，Juniper 发布补丁且该就在watchTower Labs 发布 PoC 利用后不久。9月份，漏洞情报公司 VulnCheck 发现数千台 Juniper 设备仍然易受该利用链攻击。CISA在11月17日将这四个漏洞列入必修清单，将其标记为“恶意网络人员常用的攻击向量，对联邦企业具有重大风险”。去年6月，CISA 还发布BOD，要求联邦机构在两周的漏洞窗口期内，修复被暴露的或配置不当的网络设备（如 Juniper 防火墙和交换机）。  
  
****  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[CISA 提醒注意已遭活跃利用的 Juniper 预认证 RCE 利用链](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518122&idx=1&sn=d6b5a20e45ee8897ed249a7bdde21ebb&chksm=ea94b6c0dde33fd6d3d93c996ad772d6f9f1d4744294db1c793f9f4cd69798f6515ac436fa3c&scene=21#wechat_redirect)  
  
  
[Juniper Networks 修复Junos OS中的30多个漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517894&idx=2&sn=dfa23961cb9b4c490ab70b8e96d111c7&chksm=ea94b7acdde33ebaab16086f440a9e1bced5c6e4ff4629c4650ec7c2900ac81edeec34946ada&scene=21#wechat_redirect)  
  
  
[上万台 Juniper 设备易受未认证RCE漏洞攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517693&idx=3&sn=cf7aebe9fc74cea2001da86238add0cb&chksm=ea94b497dde33d81e53986ae709bb0281448e059268e057b632beb1f3589b7d6b28b9dc32158&scene=21#wechat_redirect)  
  
  
[速修复！Juniper Junos OS 漏洞使设备易受攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517407&idx=1&sn=05e2d2e97807df0ba39c7ef3ac5d51bf&chksm=ea94b5b5dde33ca35b8400aefa41a5828e3b415b6b156f9d119ed338b388bad433656c88fedf&scene=21#wechat_redirect)  
  
  
[Juniper Networks 修复多个严重的第三方组件漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516252&idx=2&sn=546ab537a158f4562912d5ce5c76c6ac&chksm=ea94b136dde338205c6567186607ee7781fff2af825518c69732f7f401efd9705272298cb50f&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/juniper-warns-of-critical-rce-bug-in-its-firewalls-and-switches/  
  
  
题图：  
Pexels  
 License  
  
****  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSf7nNLWrJL6dkJp7RB8Kl4zxU9ibnQjuvo4VoZ5ic9Q91K3WshWzqEybcroVEOQpgYfx1uYgwJhlFQ/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSN5sfviaCuvYQccJZlrr64sRlvcbdWjDic9mPQ8mBBFDCKP6VibiaNE1kDVuoIOiaIVRoTjSsSftGC8gw/640?wx_fmt=jpeg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ5iciaeKS21icDIWSVd0M9zEhicFK0rbCJOrgpc09iaH6nvqvsIdckDfxH2K4tu9CvPJgSf7XhGHJwVyQ/640?wx_fmt=gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
