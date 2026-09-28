---
cve: "CVE-2024-7262"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  WPS Office两个严重漏洞曝光，已被武器化且在野利用   
流苏  FreeBuf   2024-08-19 18:44  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR38jUokdlWSNlAjmEsO1rzv3srXShFRuTKBGDwkj4gvYy34iajd6zQiaKl77Wsy9mjC0xBCRg0YgDIWg/640?wx_fmt=gif "")  
  
  
WPS Office作为一款用户基数超过2亿的广泛使用的办公套件，被发现存在两个关键漏洞（CVE-2024-7262和CVE-2024-7263），这些漏洞可能导致用户遭受远程代码执行攻击。这两个漏洞的CVSS评分为9.3，表明它们的严重性很高，且易于被利用。其中CVE-2024-7262已经被武器化，ESET的安全研究人员发现它正在野外被积极利用。但也有圈内小道消息称，该漏洞只会影响国际版，国内版本不受影响。  
  
  
**漏洞位置**  
  
  
##   
  
这两个漏洞都存在于WPS Office的`promecefpluginhost.exe`组件中。  
  
- CVE-2024-7262影响版本为12.2.0.13110至12.2.0.13489。  
  
- CVE-2024-7263影响版本为12.2.0.13110至12.2.0.17153（不包括17153）。  
  
##   
  
  
**漏洞原因**  
  
  
  
两个漏洞都源于不恰当的路径验证，使攻击者能够加载并执行任意的Windows库文件。  
  
### CVE-2024-7262：  
  
  
该漏洞存在于`promecefpluginhost.exe`进程如何验证文件路径的方式中。攻击者只需诱骗用户打开一个欺骗性的电子表格文档，即可加载恶意的Windows库文件。  
  
  
这种「单击即中」的漏洞允许攻击者在受害者的机器上执行任意代码，可能导致数据盗窃、勒索软件攻击或进一步的系统破坏。  
  
### CVE-2024-7263：  
  
  
为了解决CVE-2024-7262，金山软件发布了版本12.2.0.16909的补丁。但研究人员很快发现这个补丁并不充分。  
  
  
CVE-2024-7263利用了一个在原始修复中被忽略的未正确消毒的参数。这个疏忽使攻击者能够再次加载任意的Windows库文件，绕过了金山软件最初实施的安全措施。  
  
### 武器化与利用  
  
  
特别令人担忧的是，CVE-2024-7262已经被武器化。ESET的安全研究人员发现它正在野外被积极利用，恶意行为者正在分发旨在触发该漏洞的欺骗性电子表格文档。  
  
  
**风险缓解措施**  
  
##   
  
鉴于这些漏洞的严重性以及CVE-2024-7262已被确认的活跃利用，所有WPS Office用户必须尽快将软件更新到最新可用版本（12.2.0.17153或更高版本）。此外，建议用户采取以下额外安全措施：  
  
- 不要随意打开来源不明的文件：特别是电子表格、文档和其他可能包含恶意代码的文件。  
  
- 启用防火墙和反病毒软件：确保这些安全工具处于最新状态，并定期扫描系统以检测和清除潜在威胁。  
  
- 保持警惕：关注WPS Office和其他常用软件的安全公告，及时应用补丁和更新。  
  
【  
FreeBuf粉丝交流群招新啦！  
  
在这里，拓宽网安边界  
  
甲方安全建设干货；  
  
乙方最新技术理念；  
  
全球最新的网络安全资讯；  
  
群内不定期开启各种抽奖活动；  
  
FreeBuf盲盒、大象公仔......  
  
扫码添加小蜜蜂微信回复「加群」，申请加入群聊  
】  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3ich6ibqlfxbwaJlDyErKpzvETedBHPS9tGHfSKMCEZcuGq1U1mylY7pCEvJD9w60pWp7NzDjmM2BlQ/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oQ6bDiaGhdyodyXHMOVT6w8DobNKYuiaE7OzFMbpar0icHmzxjMvI2ACxFql4Wbu2CfOZeadq1WicJbib6FqTyxEx6Q/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3icEEJemUSFlfufMicpZeRJZJ61icYlLmBLDpdYEZ7nIzpGovpHjtxITB6ibiaC3R5hoibVkQsVLQfdK57w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
> https://securityonline.info/wps-office-vulnerabilities-expose-200-million-users-cve-2024-7262-exploited-in-the-wild/  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3icEEJemUSFlfufMicpZeRJZJ7JfyOicficFrgrD4BHnIMtgCpBbsSUBsQ0N7pHC7YpU8BrZWWwMMghoQ/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
[](http://mp.weixin.qq.com/s?__biz=Mzg2MTAwNzg1Ng==&mid=2247494753&idx=1&sn=a9ee1d680adf601e9ee212fc3841387f&chksm=ce1f16fef9689fe8ad2926bc3739025b04955e5c29fee949f44be9fe8262d8723110eb50b6b9&scene=21#wechat_redirect)  
  
[](http://mp.weixin.qq.com/s?__biz=Mzg2MTAwNzg1Ng==&mid=2247494714&idx=1&sn=fe28fee45c1508a1645fd04c2b18ca82&chksm=ce1f16a5f9689fb3996529f7738a1b7dc3960f3fc5bd31c7d1505dbd3a179d5b3bfd6c66e5f3&scene=21#wechat_redirect)  
  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651253272&idx=1&sn=82468d927062b7427e3ca8a912cb2dc7&scene=21#wechat_redirect)  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR3icF8RMnJbsqatMibR6OicVrUDaz0fyxNtBDpPlLfibJZILzHQcwaKkb4ia57xAShIJfQ54HjOG1oPXBew/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&tp=webp "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
