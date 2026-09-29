---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Livewire Filemanager 漏洞导致web 应用易受RCE攻击  
Abinaya
                    Abinaya  代码卫士   2026-01-20 10:11  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**一款广泛应用于Laravel web应用的嵌入式文件管理组件 Livewire Filemanager 中存在一个高危漏洞CVE-2025-14894，可导致未经身份验证的攻击者在易受攻击的服务器上执行任意代码。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
对 LivewireFilemanagerComponent.php 组件中的文件验证不当导致该漏洞。该工具未能执行正确的文件类型和MIME验证，导致攻击者直接通过 web 接口上传恶意 PHP 文件。一旦上传成功，只要在标准的 Laravel 设置流程中执行php artisan storage:link 命令，就可通过公开可访问的 /storage/ 目录被执行。  
  
值得注意的是，供应商故意未将文件类型验证纳入安全文档，将验证责任推给开发人员。然而，由于该严重漏洞位于该工具的架构中，因此无需其它防护措施，即导致上传文件被执行。成功利用该漏洞可导致攻击者以 web 服务器用户的权限执行远程代码，从而导致系统遭完全攻陷，如对 web 服务器进程可访问的所有文件拥有不受限的文件读写权限。攻击者之后可跳转到受陷的联网系统和基础设施。  
  
执行攻击无需身份验证，只需通过 Livewire Filemanager 的上传接口将 PHP webshell 上传到应用，之后通过存储URL访问文件，即可触发攻击执行。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMTgPyuBwYES6gUqNgQDym4FXqFz44Uf9HECxT87lwWNTYBTRqKr32sYPFricNiaKnOnCNhyiaNT760OQ/640?wx_fmt=gif&from=appmsg "")  
  
**受影响平台和状况**  
  
  
  
  
在该漏洞被披露时，Bee Interactive、Laravel和 Laravel Swiss厂商并未证实该漏洞的存在。CERT/CC 建议立即采取防护措施，如验证 php artisan storage:link 是否已被执行；如确认，则删除 web 服务能力。  
  
使用 Livewire Filemanager的组织机构应当立即在应用程序层执行文件上传限制机制（独立于Livewire功能）；执行严格的白名单策略，仅限上传安全的文件类型并应用全面的 MIME 类型验证。将上传的文件存储在 web 可访问目录之外。如果操作无需使用 web 服务，则关闭公开存储链接。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[OpenSSH 严重漏洞可导致 Moxa 以太网交换机易受RCE攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524868&idx=2&sn=734a45fb6b2c137eff46cd0261228384&scene=21#wechat_redirect)  
  
  
[趋势科技：速修复这个严重的 Apex Central RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524853&idx=1&sn=c4cd6fbd85899f9051551aad7c427db0&scene=21#wechat_redirect)  
  
  
[Veeam 修复备份服务器中的RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524822&idx=2&sn=bf38cc5485bf41c1eb57971488d1f356&scene=21#wechat_redirect)  
  
  
[AdonisJS 9.2 框架存在严重漏洞，可导致任意文件写入和RCE](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524804&idx=2&sn=a95d956157098ba83a9cc5da708ab3ba&scene=21#wechat_redirect)  
  
  
[CISA 将已遭利用的 Digiever NVR RCE漏洞纳入KEV](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524761&idx=2&sn=1b94ad55c3aaf6d0f95f5c0d1386a2e4&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://cybersecuritynews.com/livewire-filemanager-vulnerability/  
  
  
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
