---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Linux “wall” 漏洞已存在十年之久，可制造虚假的SUDO 提示并窃取密码   
Bill Toulas  代码卫士   2024-03-29 17:39  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**作为Linux 操作系统一部分的util-linux 包的 wall 命令中存在一个漏洞 (CVE-2024-28085)，可导致攻击者窃取密码或更改受害者的剪贴板。**  
  
  
该漏洞被称为 “WallEscape”，存在于过去11年中2.40版本及之前版本的 util-linux包中。尽管该漏洞说明攻击者可欺骗用户交出管理员密码，但利用该漏洞可能仅限于某些场景中。  
  
攻击者需要访问已通过终端同时连接多个用户的 Linux 服务器，如大学的学生可能因为作业的原因而连接在一起。安全研究员 Skyler Ferrante 发现了 WallEscape 漏洞，且该漏洞被称为“对wall中逃逸序列的中和不当”。  
  
  
**利用 WallEscape**  
  
  
  
  
  
WallEscape 影响命令 “wall”，而该命令通常用于 Linux 系统中向登录到同一个系统如服务器的所有用户终端播报信息。  
  
当通过命令行参数处理输入时，逃逸序列过滤不当，低权限用户可使用逃逸控制字符利用该漏洞，在其它用户的终端上制造虚假的SUDO 提示，诱骗他们输入管理员密码。  
  
该漏洞可在某些条件下遭利用。Ferrante 解释称如果 “mesg” 工具是激活状态，而命令 wall 拥有 setgid 权限，则很可能实施利用。研究人员提醒称这两个条件都存在于Ubuntu 22.04 LTS 和 Debian 12.5 上单并不存在于CentOS 中。  
  
Ferrante 描述了该漏洞的详情并发布 PoC 代码，还说明了可导致不同结果的利用场景。其中一个案例说明了为 Gnome 终端创建虚假 sudo 提示的步骤，诱骗用户输入密码。Ferrante 表示，通过为 Gnome 终端创建虚假 SUDO 提示以诱骗用户输入敏感信息作为命令行参数是很有可能发生的。这就要求使用wall命令将脚本传递给目标，修改终端中的输入，以便虚假的密码提示作为合法请求进行传递。要找到密码，攻击者必须查看文件 /proc/$pid/cmdline 中的命令参数，而这对于多个 Linux 发行版本上的低权限用户均是可见的。  
  
另外一种攻击是通过逃逸序列更改目标用户的剪贴板。攻击者称这种方法并不适用于所有终端模拟器，Gnome 是其中之一。Ferrante 表示，“由于我们可通过 wall 发送逃逸序列，如果用户使用的终端支持该逃逸序列，则攻击者可将受害者剪贴板修改为任意文本。”  
  
Ferrante 在漏洞报告中还提供了演示代码，设置陷阱运行攻击并解释了它如何适用于这两种利用场景。值得注意的是，WallEscape的利用取决于本地访问权限（通过SSH的物理或远程访问权限），而它限制了漏洞的严重性。  
  
建议用户升级至 linux-utils v2.40版本修复该漏洞。一般而言，更新会通过 包管理器上Linux 发行版本的标准更新渠道推送，但也有可能存在一些延迟。系统管理员可从 wall 命令中删除 setgid 权限，立即缓解 CVE-2024-28085，或者通过命令 “mesg” 将标记设置为 “n”的方式禁用消息播报功能。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Linux 恶意软件攻击配置不当的云服务器](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519011&idx=1&sn=17a70a9a2f2ffda628277cf2e0884282&chksm=ea94ba49dde3335f1ba768295ca8970e7a2a3d6080ee433e0eaa41f8b52859e0ae9f0acd6635&scene=21#wechat_redirect)  
  
  
[WiFi漏洞导致安卓和Linux设备易受攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518892&idx=2&sn=21e7796662495b4b807b3393dafd9890&chksm=ea94bbc6dde332d07356a2e54be40ffbdc88a3cac47f21912107d477815155335555fe2c827d&scene=21#wechat_redirect)  
  
  
[Linux glibc 漏洞可导致攻击者在主要发行版本获得 root 权限](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518790&idx=1&sn=3a59b1cc8580a5f1c75bb61edc82557b&chksm=ea94bb2cdde3323acc4f1a49e39fec5304d1b53e15b8b2a5cb36bf885ddd6a7b1432e0addc60&scene=21#wechat_redirect)  
  
  
[PyPI 仓库存在116款恶意软件，瞄准 Windows 和 Linux 系统](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518385&idx=2&sn=9d0f5eba19662c208dce17056f8b6708&chksm=ea94b9dbdde330cd71a57d346d79ef4b39ec7ac907787ebe1f7a41fe47d6201ea4cfa4947e94&scene=21#wechat_redirect)  
  
  
[严重的蓝牙漏洞已存在多年，可用于接管安卓、iOS 和 Linux 设备](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518319&idx=1&sn=5714524d6170f4fef9f36a2a9801b556&chksm=ea94b905dde3301385c1f828c130d4e404acb8a7addf6ed7ea4155f5063d9b70b0d539ec90eb&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/decade-old-linux-wall-bug-helps-make-fake-sudo-prompts-steal-passwords/  
  
  
  
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
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
