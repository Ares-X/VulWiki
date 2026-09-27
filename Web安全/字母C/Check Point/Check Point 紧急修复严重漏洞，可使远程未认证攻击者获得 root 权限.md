---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Check Point 紧急修复严重漏洞，可使远程未认证攻击者获得 root 权限  
Guru Baran
                    Guru Baran  代码卫士   2026-09-17 07:57  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
编译：代码卫士  
  
**Check Point****紧急修复了一个严重的栈缓冲溢出漏洞****CVE-2026-91843****，可使未经身份验证的远程攻击者在易受攻击的安全管理和日志系统上以****root****权限执行任意代码。**  
  
该漏洞的  
CVSS 3.1  
评分为  
9.8  
，说明是一种可通过网络访问的攻击，复杂度低，无需权限，也无需用户交互。该漏洞发生在登录过程中，攻击者控制的超长用户名可在身份验证完成前触发栈溢出。  
  
成功利用该漏洞可能使对手获得最高级别的操作系统控制权，可能暴露管理数据、安全策略、管理员信息和已收集的日志，同时使受保护环境进一步遭到入侵。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/t5z0xV2OYfXHhydo6LibkjOBPhIHibsYKMZWRZ6RlCHm38icsr0IWdYE1Jm41uHH7qUrjs67ict52ibGokcXQN8NTcAjbricvYoyibFOHCbqeaX5Jw/640?wx_fmt=gif&from=appmsg "")  
  
**Check Point漏洞可导致获得 root 访问权限**  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/t5z0xV2OYfWTWh6YjiaLy9JvtPYwDicmVst3Ro16piaIFNAJibgNhpJrdvrAL9yYZLxicbFjmjiaibsPT9h6W53VKfH7tFzaNLmlicz45b3HWq7cvgw/640?wx_fmt=gif&from=appmsg "")  
  
  
  
Check Point  
尚未公开描述利用链，也未表示观察到在野攻击。受影响产品包括  
Security Management Server  
、  
Multi-Domain Security Management Server  
、  
Log Server  
和  
Multi-Domain Log Server  
。  
  
易受攻击的版本包括  
R82.20  
；  
R82.10  
（  
Jumbo Hotfix Take 44  
或更早）；  
R82  
（  
Take 126  
或更早）；  
R81.20  
（  
Take 166  
或更早）；以及已不再受支持的  
R81.10  
（  
Take 190  
或更早）。同样已不再受支持的  
R80  
至  
R80.40  
以及  
R81  
仍然受影响。公告提到，  
Check Point  
表示  
Smart-1 Cloud  
不受影响，因为该环境已部署了修复方案。  
  
防御者应立即检查  
SmartConsole Audit  
和  
Admin  
登录记录，查找  
“Administrator failed to log in: Username too long.  
（管理员登录失败：用户名太长。）  
”  
信息，它可能表明有人试图投递与该漏洞相关的超大输入，不过团队应先调查周边活动，再将其视为成功实现  
root  
级入侵的证据。  
  
保留相关源地址、时间戳、管理员登录事件、配置更改以及异常的管理服务器进程，以供事件响应分析使用。  
Check Point  
公司已通过  
Check Point LivePatch  
提供修复。在  
sk175504  
下启用了自动安全更新的客户应自动受到保护，但管理员应核实部署情况，而不是想当然认为已覆盖。  
  
离线软件包可作为紧急安全更新获取：  
R82.20  
为  
Take 29  
，  
R82.10  
、  
R82  
和  
R81.20  
为  
Take 28  
。必须在每一个受影响的  
Security Management  
、  
Multi-Domain Security Management  
和  
Log Server  
上安装  
LivePatch  
。  
  
管理员可通过进入“专家”模式并在每台管理或日志服务器上运行  
cplp list  
来验证保护情况。受保护的系统应显示  
fwm:fwm  
补丁处于  
“armed”  
状态，模式为  
“livepatch”  
，注释字段中包含  
CVE-2026-91843  
。  
  
在确认修复之前，组织机构应通过  
Manage & Settings  
、  
Permissions & Administrators  
和  
Trusted Clients  
，将  
SmartConsole Trusted Clients  
限制为已批准的  
IP  
地址或子网。  
  
Check Point  
特别警告不要将客户端类型选择为  
“Any”  
。由于一旦遭入侵就会在无凭据情况下获得  
root  
访问权限，暴露的管理接口和不受支持的版本需要立即采取行动，而迁移到受支持分支应被视为优先事项，而不是替代应用现有修复。  
  
  
代码卫士试用地址：https://sast.qianxin.com/  
  
开源卫士试用地址：https://oss.qianxin.com/  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Check Point 提醒注意两个严重的未认证 RCE 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247527106&idx=1&sn=bbf5299ba4eef963c2c55d28c8620961&scene=21#wechat_redirect)  
  
  
[攻击者利用 Check Point VPN 访问企业网络](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519614&idx=2&sn=61729da3c7c16514ae5bdae557f4e001&scene=21#wechat_redirect)  
  
  
[PAN-OS 缓冲溢出漏洞可导致以root 身份执行任意代码](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247527085&idx=1&sn=c3cc7ceb0784271a331d96ddf2c12ced&scene=21#wechat_redirect)  
  
  
[SonicWall NetExtender 多个漏洞可用于以root身份写入任意文件](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526978&idx=2&sn=43af008fe7c471a0e023d7056f53e66d&scene=21#wechat_redirect)  
  
  
[Linux 内核存在内存损坏漏洞，可使本地用户提权至 root](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526830&idx=1&sn=44638325ecb2486a572ad5c691767ffd&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://cybersecuritynews.com/check-point-root-access-flaw/  
  
  
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
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
