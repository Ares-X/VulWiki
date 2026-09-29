---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Setuptools 漏洞导致数百万 Python 用户易受RCE攻击   
Ddos  代码卫士   2025-05-22 09:32  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**广为使用的 setuptools 项目中存在一个严重的路径遍历漏洞CVE-2025-47273（CVSS v4 7.7），它可导致攻击者将文件写到受害者文件系统中的任意位置，在一定条件下可导致远程代码执行后果。该漏洞已修复。**  
  
Setuptools 是由 Python 开发人员用于构建、封装和分发软件的基础性工具，尤其用于涉及依赖的情况。正如PyPA 描述的那样，“setuptools 是对Python distutils 的增强集合，它可使开发人员更轻松地构建和分发 Python 包。”  
  
该漏洞位于PackageIndex 的 _download_url 方法中，该文件名衍生自由用户提供的URL。该文件名称提取自该URL，清洗不充分，正如该安全公告提到的，“虽然存在通过 ‘.’ 替代 ‘..’ 实例的尝试，但仍然不充分。”更糟糕的是，如果名称以一个绝对路径开头，则 os.path.join() 会丢弃第一个参数，从而导致敏感文件可能遭覆写。  
  
尽管该易受攻击的代码路径属于降级模块如 easy_install 和 package_index，但风险仍不容忽视。攻击者可利用嵌入到第三方包指数页面的 URL，类似于此前提到过的 GHSA-r9hx-vwmv-q579和GHSA-cx63-2mw6-8hw5。  
  
该安全公告提醒称，“攻击者可将文件写入该文件系统中的任意位置，具有运行该 Python 代码的进程权限，根据具体情境可能升级到RCE。”  
  
开发人员和系统管理员应当立即升级至 setuptools 78.1.1版本。该版本已包含修复逻辑，增强了输入清理以阻止路径遍历。  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[严重的Langflow RCE 漏洞被用于攻击AI app 服务器](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522938&idx=1&sn=d6e3777945383ca1a0f8df487903c8e5&scene=21#wechat_redirect)  
  
  
[苹果 “AirBorne” 漏洞可导致零点击 AirPlay RCE 攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522916&idx=2&sn=1292db15893e34108514b0dc4437e9f7&scene=21#wechat_redirect)  
  
  
[Craft CMS RCE利用链用于窃取数据](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522866&idx=1&sn=f8c7ca3a1ba46ce90b3df18909d4b5b4&scene=21#wechat_redirect)  
  
  
[PyPI攻击：通过 Python 库传播 JarkaStealer](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521578&idx=2&sn=54734e7515c71beca1602a65e343a991&scene=21#wechat_redirect)  
  
  
[AI Python 包中存在缺陷 “Llama Drama” ，威胁软件供应链](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519566&idx=1&sn=991956bfd062dfe52e9fe722b821d358&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.securityweek.com/nato-flagged-vulnerability-tops-latest-VMware-security-patch-batch/  
  
  
  
题图：  
Pixabay Licen  
se  
  
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
