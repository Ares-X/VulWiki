---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  N-Able Take Control Agent 高危漏洞可用于 Windows 系统提权   
THN  代码卫士   2023-09-15 17:24  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**N-Able 的 Take Control Agent 中存在一个高危漏洞 (CVE-2023-27470)，可被本地低权限攻击者用于获得Windows 系统权限。**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ4WvWKdMGAUJsFrO8wzyP7jPmGCq3aNWcFT2niaHac5wOWebKxRGticRvCNCvbib1dsncLVg6VzdUlw/640?wx_fmt=gif "")  
  
  
该漏洞的CVSS评分为8.8，与TOCTOU 条件竞争漏洞有关。如遭成功利用，可用于删除Windows 系统上的任意文件。该漏洞影响7.0.41.1141及以下版本，已于2023年3月15日在7.0.43中修复。  
  
当程序检查特定值的资源状态但该值在实际被用之前修改后，导致检查无效，造成TOCTOU 漏洞。利用此类漏洞可导致完整性丢失并诱骗程序执行不应执行的操作，从而导致威胁行动者获得对未授权资源的访问权限。  
  
CWE 系统提到，“当攻击者可影响检查和使用之间的资源状态时，该弱点可能是安全性相关的。通过共享资源如文件、内存甚至是多线程程序中的变量就可发生这种情况。”  
  
Mandiant 公司提到，CVE-2023-27470 是因为记录多个条件删除事件（如名为 aaa.txt和bbb.txt的文件） 与名为"C:\ProgramData\GetSupportService_N-Central\PushUpdates." 的特定文件夹的每个删除操作之间的Take Control Agent (BASupSrvcUpdater.exe) 中的条件竞争引发的。简言之，当 BASupSrvcUpdater.exe 记录了aaa.txt的删除时，攻击者可通过符号链接取代 bbb.txt 文件，从而将该进程重定向到系统上的任意文件。该操作可导致该进程无意间以 NT AUTHORITY\SYSTEM 删除文件。  
  
更麻烦的是，这种任意文件删除可被用于保护提升的 Command Prompt，方法是利用针对 Windows 安装程序回滚功能的条件竞争攻击，从而可能导致代码执行后果。任意文件删除利用不再仅限于拒绝服务攻击且可作为实现提升的代码执行后果。Oliveau 表示，这类exploit可与“MSI 的回滚功能组合利用，将任意文件引入系统”。  
  
在不安全文件夹中看似无害的记录和删除事件进程可使攻击者创建伪符号链接，欺骗提权进程在非预期文件中运行操作。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[多个Kubernetes 高危漏洞可用于在 Windows 端点执行远程攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517654&idx=2&sn=652c4e44e960ea1468d3f6e14aa9ca26&chksm=ea94b4bcdde33daab2669f9abe0ceb5579f5b0531002bffd15cee9657a03daba686913b68c5b&scene=21#wechat_redirect)  
  
  
[新Windows?! 苹果再修复已遭利用的新0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517225&idx=2&sn=cfa4e9c7c012a88ff6a1ca8ada75564c&chksm=ea94b543dde33c556be2fcb984ebb556ca8d5f6654c7938d9996636b045518ace000eb82f2b6&scene=21#wechat_redirect)  
  
  
[GitHub 上的虚假0day PoC 推送 Windows 和 Linux 恶意软件](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516737&idx=2&sn=368349f3292248a0829924a329eab306&chksm=ea94b32bdde33a3d73ce830890ee3113abe962086d9059767525a81c0884679a6ca038ff9aa7&scene=21#wechat_redirect)  
  
  
[Windows漏洞十年未修复，3CX供应链攻击影响全球60多万家企业](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516131&idx=1&sn=9ced8ade5f5884fcee054a1767486be1&chksm=ea948e89dde3079ff7147b94758c02675ebca5937a221a0e770238a109b77f798c296e082e35&scene=21#wechat_redirect)  
  
  
[Zoom 修复Windows 和 MacOS 平台上的多个高危漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515248&idx=3&sn=efcb69755e1725002e1132202e9fd131&chksm=ea948d1adde3040cde57da5db0825a83b7d3aab9f8d9b9a0736d4fa3ad90a2a44810426cdecd&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://thehackernews.com/2023/09/n-ables-take-control-agent.html  
  
  
  
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
