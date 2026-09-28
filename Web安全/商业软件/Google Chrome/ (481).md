---
cve: "CVE-2025-4664"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Google Chrome 访问控制不当漏洞(CVE-2025-4664)   
原创 聚焦网络安全情报  安全聚   2025-05-15 10:00  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/Icw1mW4eH3fGjq28SHy79SEcdRGT7ZsCxicdkcJevVicIVGdZBR0dYjze8G3YwUEkcH9WgQ1KhficepoIpSk64Atw/640?wx_fmt=gif&from=appmsg "")  
  
  
**中**  
  
**危**  
  
**公**  
  
**告**  
  
  
  
近日，安全聚实验室监测到 Google Chrome 存在访问控制不当漏洞 ，编号为：CVE-2025-4664，CVSS:4.3  攻击者可构造恶意网站诱导用户访问，导致泄露跨域数据。  
  
  
**01 漏洞描述**  
  
  
  
**VULNERABILITY DESC.**  
  
  
  
  
Google Chrome是由Google开发的一款快速、简洁且功能丰富的网页浏览器。作为全球最受欢迎的浏览器之一，Chrome提供了优秀的性能、安全性和稳定性，支持多平台（包括Windows、Mac和Linux）使用。Chrome的特点包括快速的页面加载速度、强大的扩展生态系统、内置的Google搜索引擎、智能的地址栏（Omnibox）以及对HTML5和现代Web标准的广泛支持。该漏洞是Loader 中存在策略执行不充分的问题，远程攻击者能够通过构建的 HTML 页面泄露跨域数据。  
  
  
**02 影响范围**  
  
  
  
**IMPACT SCOPE**  
  
  
  
  
Google Chrome(Windows/Mac) < 136.0.7103.113/.114  
  
Google Chrome(Linux) < 136.0.7103.113  
  
  
**03 安全措施**  
  
  
  
**SECURITY MEASURES**  
  
  
  
  
目前厂商已发布可更新版本，建议用户尽快更新至   
Google Chrome 的修复版本或更高的版本：  
  
  
Google Chrome(Windows/Mac) >= 136.0.7103.113/.114  
  
Google Chrome(Linux) >= 136.0.7103.113  
  
  
下载链接：  
  
https://www.google.cn/chrome/  
  
  
**04 参考链接**  
  
  
  
**REFERENCE LINK**  
  
  
  
  
1.  
https://issues.chromium.org/issues/415810136  
2.h  
ttps://chromereleases.googleblog.com/2025/05/stable-channel-update-for-desktop_14.html  
  
  
**05 技术支持**  
  
  
  
**TECHNICAL SUPPORT**  
  
  
  
  
长按识别二维码，关注 **"安全聚"**  
 公众号！如有任何问题或需要帮助，随时联系我们的技术支持团队。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Icw1mW4eH3fGjq28SHy79SEcdRGT7ZsCBTiaicF2ia4P7iaZMaM3OPbrLG64Lia2tjS9TrSyn4FOS5D2o1vIfCEf8Cw/640?wx_fmt=jpeg&from=appmsg "")  
  
**联系我们**  
  
微信号：SecGat  
  
关注安全聚，获取更多精彩文章。  
  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/Icw1mW4eH3fGjq28SHy79SEcdRGT7ZsCRtb8nIoYiadnGwptIJHdeGVOEEFuibuXZBhMvw8OmlsMJB7kG0zuazgA/640?wx_fmt=gif&from=appmsg "")  
  
**END**  
  
  
  
  
**HISTORY**  
  
/  
  
**往期推荐**  
  
[【漏洞预警 | 已复现】FOGPROJECT 文件名命令注入漏洞（CVE-2024-39914）](http://mp.weixin.qq.com/s?__biz=MzkyNzQzNDI5OQ==&mid=2247486405&idx=1&sn=dfa7ce2bc783c81365d21815a76f39c7&chksm=c2295891f55ed187a1c520ff138341f0545969a30a8bd8b57fb8c3182e68a6cac2b42f0db546&scene=21#wechat_redirect)  
  
  
  
[【漏洞预警 | 已复现】Apache OFBiz远程代码执行漏洞（CVE-2024-38856）](https://mp.weixin.qq.com/s?__biz=MzkyNzQzNDI5OQ==&mid=2247486484&idx=1&sn=3e0f106d2ce17f16075690444c6ad16d&scene=21#wechat_redirect)  
  
  
  
  
[【漏洞预警 | 已复现】Splunk Enterprise 未授权任意文件读取漏洞（CVE-2024-36991）](http://mp.weixin.qq.com/s?__biz=MzkyNzQzNDI5OQ==&mid=2247486420&idx=3&sn=3bd4ad9b9aa9e27629eef92cc1a0e00e&chksm=c2295880f55ed1964f7229ce709929430b9a56882028fa882a69bca86e0c0bac01fde5de06bb&scene=21#wechat_redirect)  
  
  
  
[【漏洞预警 | 已复现】Rejetto HTTP File Server 模板注入漏洞（CVE-2024-23692）](http://mp.weixin.qq.com/s?__biz=MzkyNzQzNDI5OQ==&mid=2247486420&idx=2&sn=6c8f1e5428b1c3713ad1aa32231c1de8&chksm=c2295880f55ed1961e9c9e36cc89c9e1c4377ce7b755e3c85b5475fc8a97dcfbe0d68db96264&scene=21#wechat_redirect)  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
