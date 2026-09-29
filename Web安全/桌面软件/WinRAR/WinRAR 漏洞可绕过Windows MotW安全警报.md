---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  WinRAR 漏洞可绕过Windows MotW安全警报   
Ionut Ilascu  代码卫士   2025-04-07 18:20  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**WinRAR 文件压缩解决方案中存在一个漏洞 (CVE-2025-31334)，可被用于绕过 Windows 设备的MotW 安全警报并执行任意代码，影响除了最新版本7.11以外的所有版本。**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMSVjfRX1yxKEcF4mOAk1cjXzKthI8cfbsu831G7FMc9eVqqMibicc2fGJ3mfaOETdyFMD32hohWB7pw/640?wx_fmt=png&from=appmsg "")  
  
  
MoTW 是以元数据值形式（交换数据流 “zone-identifier”）存在于 Windows 中的一个安全功能，用于标记从互联网下载的可能不安全的文件。  
  
当通过 MotW 标记打开可执行文件时，Windows 会提醒用户称该文件下载自互联网，可能是有害的，并会提供继续执行或终止的选项。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMSVjfRX1yxKEcF4mOAk1cjXMdMEMQ6wPZogw4E8vaSQpkzbkcYMrIPicvPMialyzKcY0uZJ6iaPO8CyA/640?wx_fmt=gif&from=appmsg "")  
  
**从符号链接到可执行文件**  
  
  
CVE-2025-31334有助于威胁行动者在打开 WinRAR 7.11 之前版本中打开指向可执行文件的符号链接时，绕过 MotW 安全警报。攻击者可通过使用一个特殊构造的符号链接执行任意代码。值得注意的是，只有通过管理员权限才能在 Windows 上创建符号链接。  
  
该漏洞的评分为6.8，为中危级别，已在 WinRAR 最新版本中修复。该应用的变更日志中提到，“如指向一份可执行文件的符号链接从 WinRAR shell 中启动，则可执行的 MotW 数据被忽视。”  
  
该漏洞由日本三井物产安全方向公司的研究员 Shimamine Taihei 通过信息技术推广局 (IPA) 报送。日本计算机安全事件响应中心与 WinRAR 开发人员协同披露该漏洞。  
  
从 7.10 版本开始，WinRAR 提供从MotW 删除交换数据流信息（如位置、IP地址）的选项，以免用户遭隐私风险。包括国家黑客组织在内的威胁行动者们此前利用 MotW 绕过，在未触发安全警报的情况下传播各种恶意软件。最近，俄罗斯黑客利用了位于7-Zip 压缩文档中的一个类似漏洞。当黑客再次压缩以运行恶意软件释放器 Smokeloader 时，并未波及 MotW。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/winrar-flaw-bypasses-windows-mark-of-the-web-security-alerts/  
  
  
  
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
