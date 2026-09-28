---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  QNAP QVR Pro 严重漏洞可导致系统遭远程访问  
Abinaya
                    Abinaya  代码卫士   2026-03-24 10:12  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**威联通（QNAP）发布安全公告，修复了QVR Pro监控软件中的一个严重漏洞CVE-2026-22898，可导致远程未认证攻击者获得对受影响系统的未授权访问权限。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
QVR Pro 2.7.x版本用户必须立即安装最新补丁，确保网络附加存储环境的安全。该漏洞源自QVR Pro应用程序中的一个关键功能缺少身份验证检查，由FuzzingLabs的安全研究人员发现并报告。由于身份验证过程在某些功能上实现不当或被完全绕过，远程攻击者无需有效凭据即可与易受攻击的端点进行交互。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/t5z0xV2OYfWVFDeibHK2MCOJI0ibB9OsZEkEWwhIPOYt08mbLK8oQv6MwURlOoseDq3eC45hZ2xD8HchrozPjV2INnRNic2xlXrCB1bgtscTeI/640?wx_fmt=gif&from=appmsg "")  
  
**严重的QNAP QVR Pro漏洞**  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/t5z0xV2OYfWF6b0XskIEAfeAycMXwCvviaD2cKIVN9h0RTIDKFqMdv3uHqFicYMPZdIt1Y0fJpia9JEMylJnnPX0RGgzobK0a0OstZhevRhm4U/640?wx_fmt=gif&from=appmsg "")  
  
  
  
由于企业级监控应用通常处于外部网络连接与高度敏感内部数据的交汇点，因此该漏洞尤为危险。CVE-2026-22898如遭成功利用，可导致攻击者直接未授权访问运行 QVR Pro服务的 QNAP 系统。之后攻击者可操纵监控配置、访问实时或录制视频并可能跳转到位于本地网络上的其它联网设备。  
  
网络附加存储设备常常是勒索团伙、僵尸网络操纵人员和数据勒索团伙的目标。该漏洞可导致系统遭完全攻陷、数据遭未授权盗取以及在企业网络部署恶意 payload。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/t5z0xV2OYfXJghnDtul2ZibXJeSkvwSJkrs94nUPAGRFrOy2Mk7MrQBP3Goibtu5OZ6rten5FqhoOlIqsf8ZAZRQzHG5pX7q2ueB6uWwHEXCg/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞已修复**  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/t5z0xV2OYfX6zBVJqOYASVLtV6PwqHianNUAojDB2WgicpkKQDvReJpjVhTBPrG4rl1icrdrcYB3MsZFXYlnUAibu5bNUMpmia5t44ia6ThXiaRLibU/640?wx_fmt=gif&from=appmsg "")  
  
  
  
威联通已在最新版本中修复该漏洞并强烈建议所有运行 QVR Pro 2.7.x 的用户立即升级至 2.7.4.1485 或后续版本。  
  
补丁恢复了必要的身份认证检查，阻止对关键应用功能的未授权访问权限。更新时，管理员必须登录到 QTS 或 QuTS hero 界面。从主仪表盘导航至应用中心，通过搜索功能定位 QVR Pro 应用。如系统运行的是易受攻击的版本，则会显示更新选项。管理员应发起更新，等待确认信息并允许系统以安全的方式安装已修复应用。  
  
威联通公司建议管理员验证软件更新是否成功安全，确保环境受到完全保护，免遭远程利用。  
  
  
****  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[QNAP修复高危SQL注入和路径遍历漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524792&idx=1&sn=95cde699800fa12ea3a6a3dd3d890634&scene=21#wechat_redirect)  
  
  
[QNAP修复Pwn2Own大赛上发现的7个 NAS 0day 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524352&idx=1&sn=32cb3690b5c7841d5cd484997fc1a32b&scene=21#wechat_redirect)  
  
  
[QNAP 提醒注意 Windows 备份软件中的严重 ASP.NET 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524292&idx=2&sn=358d93e91985d5c3e0efde32e60d34a6&scene=21#wechat_redirect)  
  
  
[QNAP修复Pwn2Own大赛利用的多个漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521736&idx=2&sn=37cc8cc02d4dc7c59168f8bb841938a9&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://cybersecuritynews.com/qnap-qvr-pro-vulnerability/  
  
  
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
