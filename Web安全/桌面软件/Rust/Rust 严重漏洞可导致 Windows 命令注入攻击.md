---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Rust 严重漏洞可导致 Windows 命令注入攻击   
Sergiu Gatlan  代码卫士   2024-04-10 15:43  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**攻击者可利用 Rust 标准库中的一个漏洞，攻击 Windows 系统，发动命令注入攻击。**  
  
  
  
该漏洞的编号是CVE-2024-24576，是由OS命令和参数注入弱点引发的，可导致攻击者在操作系统上执行异常以及潜在的恶意代码。  
  
GitHub 将该漏洞评级为“严重”，CVSS评分为10。未认证攻击者可远程利用该漏洞，在复杂性低的攻击中利用它且无需用户交互。  
  
Rust 安全响应工作组表示，“Rust 安全响应工作组收到通知称 Rust 标准库通过 Command API在Windows 上调用批处理文件（扩展为 bat 和 cmd）时未正确逃逸参数。能够控制传递给进程的参数的攻击者能够通过绕过逃逸的方式执行任意 shell 命令。如果调用的是含有不可信参数的 Windows 上的批处理文件，那么该漏洞的评级就是‘严重’。其它平台或使用部不受影响。”  
  
如果程序的代码或其中一个依赖调用并执行了带有不可信参数的批处理文件，那么所有适用于 Windows 系统的早于1.77.2的Rust 版本均受影响。  
  
Rust 安全团队在处理 cmd.exe 的复杂性时遇到重大挑战，因为他们无法找到能够在所有情况下正确逃逸参数的解决方案。为此，他们必须增强逃逸代码的健壮性并修改 Command API。如果该 Command API 无法在扩展该进程时逃逸参数，则会返回 InvalidInput 错误。  
  
Rust 安全响应工作组提到，“如果亲自执行该逃逸或者仅处理可信输入，则可在 Windows 系统上通过 CommandEx::raw_arg 方法绕过该标准库的逃逸逻辑。”  
  
2月份，美国国家安全总监办公室督促技术企业采用内存安全编程语言如 Rust。这样做的最终目标是通过将内存安全漏洞数量最少化的方式提升软件的安全性。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Rust 修复隐秘的ReDoS 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511029&idx=1&sn=a98f9c91092ca808746056e02aafbda5&chksm=ea949a9fdde3138963014985cba561ab39bc764a1d8797edf5704c6ad74d58ac3c2bc1af7570&scene=21#wechat_redirect)  
  
  
[Rust 编程语言曝高危漏洞，可导致文件和目录遭删除](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510323&idx=2&sn=5881b2c8c7e5b7f6cc958aa2db422e90&chksm=ea949859dde3114fa5536398427c288d434f9161c3d6def4ec4f809f42f67214e729aabd387a&scene=21#wechat_redirect)  
  
  
[因严重缺陷，Rust 撤销所有 Crates 包的 API 令牌](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247494103&idx=2&sn=20fabce6c6024e85738d93e417e062c6&chksm=ea94d8bddde351ab44894fd433c58e72b1479b7fc5cf4f81286e7dbadff19f9a7385b1306f9b&scene=21#wechat_redirect)  
  
  
[Apache Strusts2出现高危反序列化漏洞 攻击者可控制web服务器](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247485471&idx=1&sn=6ac3cc06b394c0287e706f7963cbe6e0&chksm=ea973975dde0b06321a4e8f7960399f11ab0fd48d16ac5345e9066b5b00e63f41694a4d9c95a&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/critical-rust-flaw-enables-windows-command-injection-attacks/  
  
  
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
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
