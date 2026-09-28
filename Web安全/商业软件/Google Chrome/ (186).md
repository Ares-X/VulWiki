---
cve: "CVE-2025-0999"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Google Chrome浏览器缓冲区溢出漏洞(CVE-2025-0999)   
深瞳漏洞实验室  深信服千里目安全技术中心   2025-02-19 08:37  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zh4tf0FBTrugdictrX3ovaKeKic8omr5D1dwc7RUia0ib0PgicYQMbxibKOZyNHqSxJ9LfQzYZibL48VOjA/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞名称：**  
  
Google Chrome浏览器缓冲区溢出漏洞(CVE-2025-0999)  
  
**组件名称：**  
  
谷歌-Chrome  
  
**影响范围：**  
  
Google Chrome < 133.0.6943.126  
  
**漏洞类型：**  
  
缓冲区溢出  
  
**利用条件：**  
  
1、用户认证：不需要用户认证  
  
2、前置条件：默认配置  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：困难，能执行任意代码。  
  
<综合评定威胁等级>：高危，能导致系统失陷。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zh4tf0FBTrugdictrX3ovaKNsS9dhbXv8e24HgznTeIicj53s4CDwQqR2vu7R2f3NnhMiaZT6rBGFpQ/640?wx_fmt=gif&from=appmsg "")  
  
**组件介绍**  
  
Google Chrome是一款由Google公司开发的网页浏览器，该浏览器基于其他开源软件撰写，包括WebKit，目标是提升稳定性、速度和安全性，并创造出简单且有效率的使用者界面。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zh4tf0FBTrugdictrX3ovaKNsS9dhbXv8e24HgznTeIicj53s4CDwQqR2vu7R2f3NnhMiaZT6rBGFpQ/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞简介**  
  
  
2025年2月19日，深瞳漏洞实验室监测到一则谷歌-Chrome组件存在缓冲区溢出漏洞的信息，漏洞编号：CVE-2025-0999，漏洞威胁等级：高危。  
  
Chrome 浏览器 JavaScript 引擎 V8 中存在一个严重的堆缓冲区溢出漏洞**，攻击者可以利用该漏洞执行任意代码并获取用户系统权限导致失陷。**  
  
  
  
**影响范围**  
  
目前受影响的谷歌-Chrome版本：  
  
Google Chrome <   
133.0.6943.126  
  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zh4tf0FBTrugdictrX3ovaKNsS9dhbXv8e24HgznTeIicj53s4CDwQqR2vu7R2f3NnhMiaZT6rBGFpQ/640?wx_fmt=gif&from=appmsg "")  
  
**如何检测组件系统版本**  
  
  
打开Chrome浏览器，点击“设置—关于Chrome  
”即可查看当前版本。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zh4tf0FBTrugdictrX3ovaKNsS9dhbXv8e24HgznTeIicj53s4CDwQqR2vu7R2f3NnhMiaZT6rBGFpQ/640?wx_fmt=gif&from=appmsg "")  
  
**官方修复建议**  
  
  
Google官方已发布最新版本修复该漏洞，建议受影响用户将chrome浏览器更新到以下版本。133.0.6943.126/.127 for Windows, Mac133.0.6943.126 for Linux下载链接：https://www.google.cn/intl/zh-CN/chrome/  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zh4tf0FBTrugdictrX3ovaKNsS9dhbXv8e24HgznTeIicj53s4CDwQqR2vu7R2f3NnhMiaZT6rBGFpQ/640?wx_fmt=gif&from=appmsg "")  
  
**深信服修复建议**  
  
  
**风险资产发现******  
  
支持对谷歌-Chrome的主动检测，可批量检出业务场景中该事件的**受影响资产**情况，相关产品如下：  
  
**【深信服主机安全检测响应平台CWPP】**  
 已发布资产检测方案，指纹ID:0000398。  
  
  
**参考链接**  
  
  
  
https://chromereleases.googleblog.com/2025/02/stable-channel-update-for-desktop_18.html  
  
  
  
**时间轴**  
  
  
  
**2025/2/19**  
  
深瞳漏洞实验室监测到Google Chrome 浏览器缓冲区溢出漏洞信息。  
  
  
**2025/2/19**  
  
深瞳漏洞实验室发布漏洞通告。  
  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5w3XWY4eo4OQRk5wrRHTNpTgCicBIAyww7RYW2DkFK94pVI0L9BYwUrovZMIsVczO4RRvEl7PKemWQ/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5zh4tf0FBTrugdictrX3ovaK9IEI5eyEFmiakQq1sNMtibK0gNBpBkvLw0r8Ux0Pvh4icicViax9n2gGmlg/640?wx_fmt=jpeg&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
