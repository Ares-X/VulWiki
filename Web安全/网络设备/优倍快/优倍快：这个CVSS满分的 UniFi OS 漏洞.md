---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  优倍快：注意这个CVSS满分的 UniFi OS 漏洞  
Sergiu Gatlan
                    Sergiu Gatlan  代码卫士   2026-07-09 06:57  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**优倍快（Ubiquiti）发布安全更新，修复了UniFi OS中的七个严重漏洞，其中CVE-2026-50746的CVSS评分为满分，可被用于命令注入攻击。**  
  
  
  
CVE-2026-50746影响管理软件套件UniFi Connect Application（3.4.16及更早版本）。优倍快客户可通过该产品的统一界面，自动化和管理商业建筑运营（包括智能LED照明系统和电动汽车充电桩）。优倍快解释称：“拥有网络访问权限的恶意攻击者，可利用UniFi Connect Application中存在的访问控制不当漏洞，在主机设备上执行命令注入。”该公司建议用户将受影响的UniFi Connect应用更新至3.4.20或更高版本，以防范潜在攻击。  
  
本周四，优倍快还修补了UniFi Talk、UniFi Access、UniFi Protect应用，以及UniFi OS Server和众多优倍快路由器、网关、NAS及监控系统中的另外六个严重安全问题（CVE-2026-50747、CVE-2026-50748、CVE-2026-54400、CVE-2026-54402、CVE-2026-55115、CVE-2026-55116）。  
  
优倍快尚未披露这些漏洞在被修复前是否已遭在野利用，但透露其中六个漏洞可在低复杂度攻击中被利用，且无需用户交互。  
  
威胁情报公司Censys目前追踪到超过10万个在线暴露的UniFi OS实例，其中大多数（近5万个IP地址）位于美国。但目前尚不清楚其中有多少已针对这些安全漏洞完成加固，以及是否存在蜜罐。此外，Censys数据包含历史扫描结果，可能无法准确反映当前在互联网上暴露的系统数量。  
  
近年来，国家支持的黑客团伙和网络犯罪组织经常以优倍快产品为目标，将其劫持以构建用于隐藏恶意活动的僵尸网络。例如，2024年2月，FBI捣毁的Moobot是一个由优倍快Edge OS路由器组成的僵尸网络，被俄罗斯总参谋部情报总局（GRU）用于在网络间谍攻击中代理恶意流量。更早之前，2022年4月，美国网络安全和基础设施安全局（CISA）也曾将优倍快AirOS中的一个关键命令注入漏洞（CVE-2010-5330）列入其活跃利用漏洞目录，并要求政府机构在三周内完成补丁安装。近期，今年6月，CISA警告称黑客正在积极利用一个月前已修复的三个最高严重级别的UniFi OS漏洞，并要求各机构在三天内完成系统加固。随后，Bishop Fox公司演示了这些漏洞可被串联利用，以实现提权后的远程代码执行，并发布了一个免费检测脚本，帮助防御者发现其环境中的易受攻击实例。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[JetBrains 修复 CVSS 满分漏洞，影响1500万开发](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526496&idx=2&sn=99d4d6361012ecfa264bb5958914d11c&scene=21#wechat_redirect)  
  
  
[Adobe 修复多个 CVSS 满分漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526496&idx=1&sn=187a180a17fcdb0443b13c0175b0bcd6&scene=21#wechat_redirect)  
  
  
[谷歌拒修 Kubernetes 操作器满分漏洞并拒发赏金](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526357&idx=2&sn=347d85dad46151e681d50e79e8824f61&scene=21#wechat_redirect)  
  
  
[CISA 要求联邦机构在本周五前修复Joomla 插件满分漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526330&idx=1&sn=42e983016d623f7d964bffc4b9b3466e&scene=21#wechat_redirect)  
  
  
[宏碁：注意 Wave 7 路由器中的这两个CVSS满分 0day](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526217&idx=1&sn=2d18f49cad2a86d32715224cece54a62&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/ubiquiti-warns-of-new-max-severity-unifi-os-vulnerability/  
  
  
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
