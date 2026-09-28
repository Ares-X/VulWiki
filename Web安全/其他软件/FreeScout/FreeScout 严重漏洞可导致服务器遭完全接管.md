---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  FreeScout 严重漏洞可导致服务器遭完全接管  
Ionut Arghire
                    Ionut Arghire  代码卫士   2026-03-05 09:42  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Ox Security****公司提醒称，开源帮助台、共享邮箱解决方案 FreeScout 中存在一个严重漏洞CVE-2026-28289（CVSS评分10分），可用于零点击远程代码执行攻击中。该漏洞是对近期已修复高危认证RCE漏洞CVE-2026-27636的补丁绕过。**  
  
  
  
  
CVE-2026-27636是因为文件上传限制列表中缺少 .htaccess 造成的，可导致经身份验证的攻击者上传 .htaccess 文件，篡改文件处理并实现RCE。研究人员发现，该漏洞的补丁可通过一个零宽字符绕过，而该字符不可见且能通过点号检测，导致一个有效的.htaccess文件名被保存到磁盘。  
  
FreeScout 的维护人员提到，CVE-2026-28289是一个位于文件名清理函数中的TOCTOU问题，“其中点号前缀检查发生在清理移除不可见字符之前”。CVE-2026-27636的修复方案试图通过向文件扩展名添加下划线来拦截拥有已限制文件扩展或以句点开头的文件名。  
  
要绕过补丁，攻击者在文件名前添加一个零宽空格字符 (Unicode U+2008)。由于该字符不被视为可见内容，文件名得以通过验证，随后U+200B字符被剥离，文件被保存为真正的点文件。研究人员解释道：“该攻击的原理是从任意地址向FreeScout中配置的邮箱发送恶意邮件。需要注意的是，这既不需要身份验证，也不需要用户交互。恶意负载会被写入FreeScout服务器的磁盘，随后可被利用来远程执行命令。”攻击者可以预测文件将被保存到磁盘的哪个位置，从而能够访问负载并在服务器上执行命令。成功利用该漏洞可使攻击者完全控制易受攻击的服务器，从FreeScout中窃取帮助台工单、邮箱内容及其他敏感数据，并可能横向移动到网络上的其它系统。  
  
FreeScout维护者解释道："所有在启用了AllowOverride All（一种常见配置）的Apache上运行的FreeScout 1.8.206版本均受影响。FreeScout 1.8.207版本已修复该漏洞。建议用户尽快更新部署。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[SolarWinds Serv-U 多个严重漏洞可用于提供服务器root权限](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525116&idx=2&sn=05bb28ebbcccd3533d24a8ea4ee1f19f&scene=21#wechat_redirect)  
  
  
[Anthropic MCP Git 服务器漏洞可用于访问文件和执行代码](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524939&idx=2&sn=a0b5639d3c077f9d7f283ee4872d5c0d&scene=21#wechat_redirect)  
  
  
[Cloudflare 修复可绕过 WAF 访问源服务器的 ACM 验证漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524939&idx=1&sn=3b78a85d34e70b90de763e54f7cdd239&scene=21#wechat_redirect)  
  
  
[React Router严重漏洞可用于访问或修改服务器文件](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524857&idx=2&sn=8c1f832d3fbc13cae125177e8f0247af&scene=21#wechat_redirect)  
  
  
[开源自托管平台 Coolify 修复11个严重漏洞，可导致服务器遭完全攻陷](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524828&idx=2&sn=21af241f60f1452013815133745e9a72&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.securityweek.com/critical-freescout-vulnerability-leads-to-full-server-compromise/  
  
  
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
