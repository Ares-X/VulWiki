---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Apache Roller CVSS 满分漏洞可用于获取持久性访问权限   
Ravie Lakshmanan  代码卫士   2025-04-16 09:37  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**基于 Java 的开源博客服务器软件 Apache Roller 中存在一个严重漏洞（CVE-2025-24859），可导致恶意人员即使在密码更改后也可保留越权访问权限。**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQRTJVo0mwAWtxgsP3KibZuFnOcZLzq9mrmAM1IwLicq20Z68oBUsibMxdp4BJkaleACIQPNS0AZDu0A/640?wx_fmt=png&from=appmsg "")  
  
  
该漏洞的CVSS 评分为10.0分，影响 Roller 6.1.4及之前所有版本。Apache Roller 项目的维护人员在一份安全公告中提到，“Apache 6.1.5之前的版本中存在一个会话管理漏洞，是因为活跃用户会话在密码更改后未正确验证造成的。当用户密码由用户或管理员更改时，现有会话仍然是活跃且可用的。”  
  
成功利用该漏洞可导致攻击者通过老旧会话，仍然保持对该应用的访问权限，即使密码更改后也不例外。如凭据被攻陷，则该漏洞还可导致不受限访问。  
  
该项目已通过执行中心化会话管理的方式，在6.1.5版本中修复该漏洞。如此，即使密码被更改或用户遭禁用，所有活跃会话仍然会得到验证。安全研究员 Haining Meng 发现并报送了该漏洞。  
  
几周前，Apache Parquet Java 库中被指存在一个严重漏洞CVE-2025-30065（CVSS 10.0），如遭成功利用，可导致远程攻击者在可疑实例中执行任意代码。上个月，Apache Tomcat 受一个严重漏洞（CVE-2025-24813，CVSS 9.8）的影响，并在漏洞详情公开不久后即遭活跃利用。  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Apache Parquet Java 中存在CVSS满分漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522648&idx=1&sn=8642efdcfe877619e821e6fa74e779b7&scene=21#wechat_redirect)  
  
  
[Apache Ignite 严重漏洞可导致RCE](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522291&idx=2&sn=d8279f609eb439d7d723557c865748fe&scene=21#wechat_redirect)  
  
  
[Apache MINA 存在严重的满分漏洞，可导致RCE](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521918&idx=1&sn=acf8324d4a36ec4e8d37b16375da9e75&scene=21#wechat_redirect)  
  
  
[Apache Traffic Control存在严重的SQL注入漏洞，可在数据库中执行任意命令](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521906&idx=1&sn=9cb8ea9b9dbfb2a32eec80f9973d8cf1&scene=21#wechat_redirect)  
  
  
[Apache Tomcat 漏洞导致服务器易受RCE攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521893&idx=1&sn=867f98595849107577a98fcaf043a177&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2025/04/critical-apache-roller-vulnerability.html  
  
  
  
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
