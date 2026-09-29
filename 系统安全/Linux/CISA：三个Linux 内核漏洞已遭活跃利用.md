---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  CISA：三个Linux 内核漏洞已遭活跃利用  
Bill Toulas
                    Bill Toulas  代码卫士   2026-09-22 09:36  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
编译：代码卫士  
  
**美国网络安全和基础设施安全局****(CISA)****警告称，三个****Linux****内核漏洞正遭利用，严重性评级从中等到严重不等，其中****CVE-2025-39964****，已在****Linux****内核中存在****14****年。**  
  
CISA   
将这三个漏洞都标记为联邦机构的最高优先级，要求昨天前应用可用的安全更新和缓解措施。  
  
这三个漏洞分别是：  
  
- CVE-2025-39964  
：位于内核  
 AF_ALG   
加密套接字接口中的竞争条件，允许并发写入破坏每个套接字的状态，并可能导致系统崩溃或改变加密结果。  
  
- CVE-2026-53266  
：位于  
Linux   
内核  
 ebtables SNAT   
实现中的越界写入漏洞，可能导致  
 ARP   
地址重写修改共享的文件后备内存，而没有先使受影响的数据包范围变为可写。  
  
- CVE-2025-39682  
：  
Linux   
内核  
 TLS   
接收路径逻辑缺陷，因错误处理排队等待后续处理的零长度记录导致，可能允许在使用  
 kTLS   
时将不同的  
 TLS   
记录类型一起处理。  
  
  
  
CISA   
表示这些漏洞已在攻击中被利用，但未透露任何关于事件或威胁行为者性质的细节。安全公司  
 STAR Labs   
发现了  
 CVE-2025-39964  
，称研究人员在没有  
 AI   
系统帮助的情况下发现了该漏洞。研究人员通过在  
 Google   
的  
 kernelCTF   
中实现权限提升和容器逃逸演示了该漏洞。  
  
CVE-2025-39682  
已存在公开利用代码，  
Red Hat   
在安全公告中也确认了这一点。  
Red Hat   
还确认  
 CVE-2026-53266   
存在已知利用代码。研究员  
 Kimmo Suominen   
已在  
 GitHub   
上发布了  
 CVE-2026-53266   
的技术分析和补丁状态跟踪，概述了一条可能涉及修改文件后备内存的权限提升路径。然而，该研究员指出，所提出的利用链是通过与  
 Dirty Pipe   
类比推断出来的，尚未用公开利用代码演示。  
  
CISA   
已将这三个漏洞都标记为需要  
“  
取证分类  
”  
，说明联邦机构需要检查每个受影响资产是否存在已被利用的迹象。  
  
目前，这三个漏洞均未被标记为已被勒索软件团伙利用。  
  
  
代码卫士试用地址：https://sast.qianxin.com/  
  
开源卫士试用地址：https://oss.qianxin.com/  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Linux 内核存在内存损坏漏洞，可使本地用户提权至 root](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526830&idx=1&sn=44638325ecb2486a572ad5c691767ffd&scene=21#wechat_redirect)  
  
  
[GhostLock：已存在15年的内核 UAF 漏洞，影响 Linux 所有发行版](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526586&idx=1&sn=19edacadf8bc184c678b7e5c5ce9ac6b&scene=21#wechat_redirect)  
  
  
[Linux 内核0day已修复：隐藏19+年、利用稳定性极高、影响极广](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526554&idx=1&sn=62d794dc43dc49ccb43d31be669f3712&scene=21#wechat_redirect)  
  
  
[已存在16年的 Linux KVM 漏洞可导致从客户虚拟机逃逸至宿主机](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526532&idx=1&sn=cadb21f6556d420bb88549f455cfa643&scene=21#wechat_redirect)  
  
  
[Bad Epoll：Linux 内核新漏洞，导致低权限用户获得 root 权限](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526510&idx=1&sn=5d8dd588bd5df97068ed04c486fd6458&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2026/09/claude-opus-5-helped-researchers-take.html  
  
  
题图：Pixa  
b  
ay Licens  
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
”   
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
