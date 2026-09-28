---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  苹果发布安全更新以修复iOS和macOS中的多个漏洞   
鹏鹏同学  黑猫安全   2025-05-13 23:00  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/8dBEfDPEce9BQ6ka98O4HfvB8lHhIAibKRozbiaOsIvI1gaURukko3aiaz2Z83THSqBObdE5bjhSzoiboAgcKmaWrg/640?wx_fmt=png&from=appmsg "")  
  
苹果紧急发布iOS和macOS安全更新，修复可能让攻击者仅通过打开特制图片/视频/网站就能执行恶意代码的关键漏洞：  
  
• AppleJPEG漏洞（CVE-2025-31251）——处理恶意制作的媒体文件可能导致应用意外终止或进程内存损坏  
• CoreMedia漏洞（CVE-2025-31233）——处理恶意制作的视频文件可能导致应用意外终止或内存损坏  
• ImageIO漏洞（CVE-2025-31226）——处理恶意制作的图像可能导致拒绝服务攻击  
• WebKit漏洞（CVE-2025-31223）——处理恶意网页内容可能导致内存损坏  
• WebKit漏洞（CVE-2025-24223）——处理恶意网页内容可能导致内存损坏  
• WebKit漏洞（CVE-2025-31217）——处理恶意网页内容可能导致Safari浏览器意外崩溃  
• WebKit漏洞（CVE-2025-31215）——处理恶意网页内容可能导致进程意外崩溃  
• WebKit漏洞（CVE-2025-31206）——处理恶意网页内容可能导致Safari意外崩溃  
• WebKit漏洞（CVE-2025-31257）——处理恶意网页内容可能导致Safari意外崩溃  
  
苹果iOS 18.5更新修复了AppleJPEG、CoreMedia等组件的多个高危漏洞，攻击者可能通过恶意媒体文件执行代码或泄露数据。  
  
公司还修补了CoreAudio、CoreGraphics和ImageIO中严重的文件解析漏洞，打开恶意内容可能导致应用崩溃、进程内存损坏或数据泄露。部分漏洞可能触发拒绝服务攻击或内存损坏。其中编号CVE-2025-31217的漏洞可通过恶意网页内容导致Safari浏览器崩溃。  
  
苹果还修复了基带漏洞（CVE-2025-31214），攻击者可利用该漏洞拦截iPhone 16e的网络流量。此外还修复了：  
• mDNSResponder权限提升漏洞（CVE-2025-31222）  
• 备忘录应用可能泄露锁屏信息的漏洞  
• FrontBoard、iCloud文档共享和邮件地址功能的安全缺陷  
  
iOS 18.5支持iPhone XS及后续机型，iPadOS更新支持2018款及后续iPad Pro、第三代iPad Air、第七代iPad、第五代iPad mini等设备。苹果还同步发布了macOS Sequoia/Sonoma/Ventura以及watchOS、tvOS、visionOS的系统更新。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
