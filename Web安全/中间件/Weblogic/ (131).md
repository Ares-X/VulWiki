---
cve: "CVE-2024-21216"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【复现】 WebLogic T3/IIOP 反序列化漏洞（CVE-2024-21216）风险通告   
原创 赛博昆仑CERT  赛博昆仑CERT   2024-10-16 10:26  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/iaZ7t7b9Dodvib7ddpGMC6vx4COAy4sBoGbGCkwVUIJSHBPI0z1Utrp1h5ys6ygT3albl3PgjejJcRRRiaDFFbMBA/640?wx_fmt=gif "")  
  
  
-  
赛博昆仑漏洞安全通告-  
  
  WebLogic T3/IIOP 反序列化漏洞（CVE-2024-21216）风险通告  
  
  
![](https://mmbiz.qpic.cn/mmbiz_svg/7j1UQofaR9fsNXgsOXHVKZMJ1PCicm8s4RHQVjCJEjX63AsNibMx3So4wSMAvubEOoU2vLqYY7hIibIJbkEaPIDs5A4ianh5jibxw/640?wx_fmt=svg "")  
  
  
  
****  
**漏洞描述**  
  
  
WebLogic是美国  
Oracle公司出品的一个  
application server，确切的说是一个基于  
JAVAEE架构的中间件，  
WebLogic是用于开发、集成、部署和管理大型分布式  
Web应用、网络应用和数据库应用的  
Java应用服务器。将  
Java的动态功能和  
Java Enterprise标准的安全性引入大型网络应用的开发、集成、部署和管理之中。  
  
近日，赛博昆仑  
CERT监测到  
WebLogic  T3/IIOP 反序列化漏洞（  
CVE-2024-21216）。未经身份验证的攻击者可以利用该漏洞在远程的  
WebLogic服务器上执行任意代码，从而获取到远程服务器的权限。该漏洞并不需要出网，不受  
JDK版本限制。  
  
<table><tbody><tr><td valign="top" style="border-width: 1pt;border-color: rgb(221, 221, 221);padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);"><strong>漏洞名称</strong><o:p></o:p></span></p></td><td colspan="3" valign="top" style="border-top-width: 1pt;border-color: rgb(221, 221, 221);border-right-width: 1pt;border-bottom-width: 1pt;border-left-width: initial;border-left-style: none;padding: 3pt 6pt 1.5pt;"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);"><span lang="EN-US" style="color: rgb(0, 122, 170);font-family: Arial, sans-serif;">WebLogic T3/IIOP </span>远程代码执行漏洞<o:p></o:p></span></p></td></tr><tr><td valign="top" style="border-right-width: 1pt;border-color: rgb(221, 221, 221);border-bottom-width: 1pt;border-left-width: 1pt;border-top-width: initial;border-top-style: none;padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);"><strong>漏洞公开编号</strong><o:p></o:p></span></p></td><td colspan="3" valign="top" style="border-top: none rgb(221, 221, 221);border-left: none rgb(221, 221, 221);border-bottom-width: 1pt;border-bottom-color: rgb(221, 221, 221);border-right-width: 1pt;border-right-color: rgb(221, 221, 221);padding: 3pt 6pt 1.5pt;"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);"><span lang="EN-US" style="color: rgb(0, 122, 170);font-family: Arial, sans-serif;">CVE-2024-21216</span><o:p></o:p></span></p></td></tr><tr><td valign="top" style="border-right-width: 1pt;border-color: rgb(221, 221, 221);border-bottom-width: 1pt;border-left-width: 1pt;border-top-width: initial;border-top-style: none;padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);"><strong>昆仑漏洞库编号</strong><o:p></o:p></span></p></td><td colspan="3" valign="top" style="border-top: none rgb(221, 221, 221);border-left: none rgb(221, 221, 221);border-bottom-width: 1pt;border-bottom-color: rgb(221, 221, 221);border-right-width: 1pt;border-right-color: rgb(221, 221, 221);padding: 3pt 6pt 1.5pt;"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);"><span lang="EN-US" style="color: rgb(0, 122, 170);font-family: Arial, sans-serif;">CYKL-2024-018902</span><o:p></o:p></span></p></td></tr><tr><td valign="top" style="border-right-width: 1pt;border-color: rgb(221, 221, 221);border-bottom-width: 1pt;border-left-width: 1pt;border-top-width: initial;border-top-style: none;padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);"><strong>漏洞类型</strong><o:p></o:p></span></p></td><td valign="top" style="border-top: none rgb(221, 221, 221);border-left: none rgb(221, 221, 221);border-bottom-width: 1pt;border-bottom-color: rgb(221, 221, 221);border-right-width: 1pt;border-right-color: rgb(221, 221, 221);padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);">反序列化</span><o:p></o:p></p></td><td valign="top" style="border-top: none rgb(221, 221, 221);border-left: none rgb(221, 221, 221);border-bottom-width: 1pt;border-bottom-color: rgb(221, 221, 221);border-right-width: 1pt;border-right-color: rgb(221, 221, 221);padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);"><strong>公开时间</strong></span><o:p></o:p></p></td><td valign="top" style="border-top: none rgb(221, 221, 221);border-left: none rgb(221, 221, 221);border-bottom-width: 1pt;border-bottom-color: rgb(221, 221, 221);border-right-width: 1pt;border-right-color: rgb(221, 221, 221);padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);"><span lang="EN-US" style="color: rgb(0, 122, 170);font-family: Arial, sans-serif;">2024-10-16</span><o:p></o:p></span></p></td></tr><tr><td valign="top" style="border-right-width: 1pt;border-color: rgb(221, 221, 221);border-bottom-width: 1pt;border-left-width: 1pt;border-top-width: initial;border-top-style: none;padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);"><strong>漏洞等级</strong><o:p></o:p></span></p></td><td valign="top" style="border-top: none rgb(221, 221, 221);border-left: none rgb(221, 221, 221);border-bottom-width: 1pt;border-bottom-color: rgb(221, 221, 221);border-right-width: 1pt;border-right-color: rgb(221, 221, 221);padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);">高危</span><o:p></o:p></p></td><td valign="top" style="border-top: none rgb(221, 221, 221);border-left: none rgb(221, 221, 221);border-bottom-width: 1pt;border-bottom-color: rgb(221, 221, 221);border-right-width: 1pt;border-right-color: rgb(221, 221, 221);padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);"><strong>评分</strong></span><o:p></o:p></p></td><td valign="top" style="border-top: none rgb(221, 221, 221);border-left: none rgb(221, 221, 221);border-bottom-width: 1pt;border-bottom-color: rgb(221, 221, 221);border-right-width: 1pt;border-right-color: rgb(221, 221, 221);padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);"><span lang="EN-US" style="color: rgb(0, 122, 170);font-family: Arial, sans-serif;">9.8</span><o:p></o:p></span></p></td></tr><tr><td valign="top" style="border-right-width: 1pt;border-color: rgb(221, 221, 221);border-bottom-width: 1pt;border-left-width: 1pt;border-top-width: initial;border-top-style: none;padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);"><strong>漏洞所需权限</strong><o:p></o:p></span></p></td><td valign="top" style="border-top: none rgb(221, 221, 221);border-left: none rgb(221, 221, 221);border-bottom-width: 1pt;border-bottom-color: rgb(221, 221, 221);border-right-width: 1pt;border-right-color: rgb(221, 221, 221);padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);">无权限要求</span><o:p></o:p></p></td><td valign="top" style="border-top: none rgb(221, 221, 221);border-left: none rgb(221, 221, 221);border-bottom-width: 1pt;border-bottom-color: rgb(221, 221, 221);border-right-width: 1pt;border-right-color: rgb(221, 221, 221);padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);"><strong>漏洞利用难度</strong></span><o:p></o:p></p></td><td valign="top" style="border-top: none rgb(221, 221, 221);border-left: none rgb(221, 221, 221);border-bottom-width: 1pt;border-bottom-color: rgb(221, 221, 221);border-right-width: 1pt;border-right-color: rgb(221, 221, 221);padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);">低<o:p></o:p></span></p></td></tr><tr><td valign="top" style="border-right-width: 1pt;border-color: rgb(221, 221, 221);border-bottom-width: 1pt;border-left-width: 1pt;border-top-width: initial;border-top-style: none;padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);"><strong><span lang="EN-US" style="font-family: Arial, sans-serif;">PoC</span></strong><strong>状态</strong><o:p></o:p></span></p></td><td valign="top" style="border-top: none rgb(221, 221, 221);border-left: none rgb(221, 221, 221);border-bottom-width: 1pt;border-bottom-color: rgb(221, 221, 221);border-right-width: 1pt;border-right-color: rgb(221, 221, 221);padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);">未知</span><o:p></o:p></p></td><td valign="top" style="border-top: none rgb(221, 221, 221);border-left: none rgb(221, 221, 221);border-bottom-width: 1pt;border-bottom-color: rgb(221, 221, 221);border-right-width: 1pt;border-right-color: rgb(221, 221, 221);padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);"><strong><span lang="EN-US" style="font-family: Arial, sans-serif;">EXP</span></strong><strong>状态</strong></span><o:p></o:p></p></td><td valign="top" style="border-top: none rgb(221, 221, 221);border-left: none rgb(221, 221, 221);border-bottom-width: 1pt;border-bottom-color: rgb(221, 221, 221);border-right-width: 1pt;border-right-color: rgb(221, 221, 221);padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);">未知<o:p></o:p></span></p></td></tr><tr><td valign="top" style="border-right-width: 1pt;border-color: rgb(221, 221, 221);border-bottom-width: 1pt;border-left-width: 1pt;border-top-width: initial;border-top-style: none;padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);"><strong>漏洞细节</strong><o:p></o:p></span></p></td><td valign="top" style="border-top: none rgb(221, 221, 221);border-left: none rgb(221, 221, 221);border-bottom-width: 1pt;border-bottom-color: rgb(221, 221, 221);border-right-width: 1pt;border-right-color: rgb(221, 221, 221);padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);">未知</span><o:p></o:p></p></td><td valign="top" style="border-top: none rgb(221, 221, 221);border-left: none rgb(221, 221, 221);border-bottom-width: 1pt;border-bottom-color: rgb(221, 221, 221);border-right-width: 1pt;border-right-color: rgb(221, 221, 221);padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);"><strong>在野利用</strong></span><o:p></o:p></p></td><td valign="top" style="border-top: none rgb(221, 221, 221);border-left: none rgb(221, 221, 221);border-bottom-width: 1pt;border-bottom-color: rgb(221, 221, 221);border-right-width: 1pt;border-right-color: rgb(221, 221, 221);padding: 3pt 6pt 1.5pt;" width="127"><p style="margin: 6pt 0cm;line-height: 17.6px;font-size: 11pt;font-family: DengXian;"><span style="color: rgb(0, 122, 170);">未知</span></p></td></tr></tbody></table>  
  
  
  
  
**影响版本**  
  
WebLogic Server 12.2.1.4.0  
  
WebLogic Server 14.1.1.0.0  
  
  
  
**利用条件**  
  
  
  
无需任何利用条件  
  
**漏洞复现**  
  
目前赛博昆仑CERT已确认漏洞原理，复现截图如下：  
  
复现版本为 36805124;WLS PATCH SET UPDATE 12.2.1.4.240704  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/iaZ7t7b9DodsMKeZsB8sdPeqLicvfMh6WSZdlSFUYB5dvQib75ZMYoHdLdoUY92bqTnDEYbzR5yF0aY7fHVW9BGKw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/iaZ7t7b9DodsMKeZsB8sdPeqLicvfMh6WSRfE2haKhmK7kR1d8kAnTvzzUaiahBBvIAl6oiaibqOoqlicQ4hxVfXho8g/640?wx_fmt=png&from=appmsg "")  
  
  
**防护措施**  
  
  
目前，官方已发布修复建议，建议受影响的用户尽快安装最新补丁。  
  
下载地址：  
https://support.oracle.com/  
  
**技术咨询**  
  
赛博昆仑支持对用户提供轻量级的检测规则或热补方式，可提供定制化服务适  
配多种产品及规则，帮助用户进行漏洞检测和修复。  
  
赛博昆仑CERT已开启年订阅服务，付费客户(可申请试用)将获取更多技术详情，并支持适配客户的需求。  
  
联系邮箱：cert@cyberkl.com  
  
公众号：赛博昆仑CERT  
  
**参考链接**  
  
https://www.oracle.com/security-alerts/cpuoct2024.html  
  
**时间线**  
  
   
  
   
  
  
2024年  
10月  
16日，官方发布通告  
  
2024年  
10月  
16日，赛博昆仑  
CERT公众号发布漏洞风险通告  
  
  
  
  
  
  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
