---
cve: "CVE-2023-4357"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Chromium libxslt XXE漏洞(CVE-2023-4357)   
深瞳漏洞实验室  深信服千里目安全技术中心   2023-11-20 19:57  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5z4REWgiabuvPOmYohb8mLHbuNWe6lsbKvEIicPibiagH5RiaGDaUChyl8rFWnOlkAPoefHJmItmwxzMkA/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞名称：**  
  
Chromium libxslt XXE漏洞(CVE-2023-4357)  
  
**组件名称：**  
  
Chrome  
  
**影响范围：**  
  
chrome < 116.0.5845.96  
  
**漏洞类型：**  
  
XML外部实体注入  
  
**利用条件：**  
  
1、用户认证：不需要用户认证  
  
2、前置条件：默认配置  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：容易，可造成越权访问。  
  
<综合评定威胁等级>：中危，可造成越权访问。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5z4REWgiabuvPOmYohb8mLHbHvlic9ichnRxwyDd4Fs1R7uCSHTXNLemMntCBvS5G9kgnIXrUFx2511w/640?wx_fmt=gif&from=appmsg "")  
  
**组件介绍**  
  
Google Chrome是一款由Google公司开发的网页浏览器，该浏览器基于其他开源软件撰写，包括WebKit，目标是提升稳定性、速度和安全性，并创造出简单且有效率的使用者界面。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5z4REWgiabuvPOmYohb8mLHbHvlic9ichnRxwyDd4Fs1R7uCSHTXNLemMntCBvS5G9kgnIXrUFx2511w/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞简介**  
  
2023年11月20日，深瞳漏洞实验室监测到一则Chrome组件存在XML外部实体注入漏洞的信息，漏洞威胁等级：中危。  
  
  
116.0.5845.96版本之前的 Google Chrome 中对 XML 中不受信任的输入验证不充分，导致**远程攻击者可以通过精心设计的 HTML 页面绕过文件访问限制。**  
  
  
**影响范围**  
  
Chrome < 116.0.5845.96  
  
  
**漏洞验证**  
  
  
深信服千里目深瞳漏洞实验室搭建Chrome115.0.5738.0版本环境，复现该漏洞，效果如下：  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5z4REWgiabuvPOmYohb8mLHbGdmASWKMUmXCicWGBHkbibwhWsnY6tz2U3AhTKqwUH7tTuAYPyfAZ5DA/640?wx_fmt=png&from=appmsg "")  
  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5z4REWgiabuvPOmYohb8mLHbHvlic9ichnRxwyDd4Fs1R7uCSHTXNLemMntCBvS5G9kgnIXrUFx2511w/640?wx_fmt=gif&from=appmsg "")  
  
**如何检测组件版本**  
  
  
打开Chrome浏览器，点击设置—关于Chrome即可查看当前版本。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5z4REWgiabuvPOmYohb8mLHbHvlic9ichnRxwyDd4Fs1R7uCSHTXNLemMntCBvS5G9kgnIXrUFx2511w/640?wx_fmt=gif&from=appmsg "")  
  
**官方修复建议**  
  
  
官方已发布新版本解决这个问题，请用户下载大于等于116.0.5845.96版本的Chrome。链接：https://www.google.com/intl/zh-CN/chrome/  
  
  
**参考链接**  
  
  
https://chromereleases.googleblog.com/2023/08/stable-channel-update-for-desktop_15.html  
  
https://www.cve.org/CVERecord?id=CVE-2023-4357  
  
https://crbug.com/1458911  
  
  
**时间轴**  
  
  
  
**2023/06/29**  
  
安全研究员报告漏洞  
  
  
**2023/08/31**  
  
Google官方修复漏洞  
  
  
**2023/11/20**  
  
深瞳漏洞实验室发布漏洞通告。  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5z4REWgiabuvPOmYohb8mLHbZLZVLoA2UI8ZdUPRdLa7iaTuK5qexMEicuMUuDShs6DKUKTCWEbfEdHA/640?wx_fmt=png&from=appmsg "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5z4REWgiabuvPOmYohb8mLHbLIqvOd1tEnSKsTgQZOIxHcTLaXrTr75Na6zFp7QHbu1x9jgBEibszdA/640?wx_fmt=jpeg&from=appmsg "")  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
