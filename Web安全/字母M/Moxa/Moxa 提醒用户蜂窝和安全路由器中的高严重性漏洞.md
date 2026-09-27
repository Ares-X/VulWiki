---
cve: "CVE-2024-9138"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Moxa 提醒用户注意蜂窝和安全路由器中的高严重性漏洞   
 信息安全大事件   2025-01-07 11:56  
  
总部位于台湾的   
Moxa 警告称，其蜂窝路由器、安全路由器和网络安全设备存在两个安全漏洞，可能允许权限提升和命令执行。  
  
漏洞列表如下：  
- CVE-2024-9138 （CVSS 4.0 分数：8.6） - 一种硬编码的凭证漏洞，可能允许经过身份验证的用户提升权限并获得对系统的根级访问权限，从而导致系统受损、未经授权的修改、数据泄露或服务中断  
  
- CVE-2024-9140 （CVSS 4.0 score：9.3） - 一个漏洞，允许攻击者利用特殊字符绕过输入限制，可能导致未经授权的命令执行  
  
安全研究员   
Lars Haulin 报告的缺点会影响以下产品和固件版本：  
- CVE-2024-9138 - EDR-810 系列（固件版本 5.12.37 及更早版本）、EDR-8010 系列（固件版本 3.13.1 及更早版本）、EDR-G902 系列（固件版本 5.7.25 及更早版本）、EDR-G902 系列（固件版本 5.7.25 及更早版本）、EDR-G9004 系列（固件版本 3.13.1 及更早版本）、EDR-G9010 系列（固件版本 3.13.1 及更早版本）、EDF-G1002-BP 系列（固件版本 3.13.1 及更早版本）、NAT-102 系列（固件版本 1.0.5 及更早版本）、 OnCell G4302-LTE4 系列（固件版本 3.13 及更早版本）和 TN-4900 系列（固件版本 3.13 及更早版本）  
  
- CVE-2024-9140 - EDR-8010 系列（固件版本 3.13.1 及更早版本）、EDR-G9004 系列（固件版本 3.13.1 及更早版本）、EDR-G9010 系列（固件版本 3.13.1 及更早版本）、EDF-G1002-BP 系列（固件版本 3.13.1 及更早版本）、NAT-102 系列（固件版本 1.0.5 及更早版本）、OnCell G4302-LTE4 系列（固件版本 3.13 及更早版本）和 TN-4900 系列（固件版本 3.13 及更早版本）  
  
已为以下版本提供补丁：  
- EDR-810 系列（升级到固件版本 3.14 或更高版本）  
  
- EDR-8010 系列（升级到固件版本 3.14 或更高版本）  
  
- EDR-G902 系列（升级到固件版本 3.14 或更高版本）  
  
- EDR-G903 系列（升级到固件版本 3.14 或更高版本）  
  
- EDR-G9004 系列（升级到固件版本 3.14 或更高版本）  
  
- EDR-G9010 系列（升级到固件版本 3.14 或更高版本）  
  
- EDF-G1002-BP 系列（升级到固件版本 3.14 或更高版本）  
  
- NAT-102 系列 （无官方补丁）  
  
- OnCell G4302-LTE4 系列（请联系 Moxa 技术支持）  
  
- TN-4900 系列 （请联系 Moxa 技术支持）  
  
作为缓解措施，建议确保设备不会暴露在   
Internet 上，使用防火墙规则或 TCP 包装器限制对受信任 IP 地址和网络的 SSH 访问，并采取措施检测和防止漏洞利用尝试。  
  
<table><tbody style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"><tr class="ue-table-interlace-color-single js_darkmode__0" data-style="-webkit-tap-highlight-color: transparent; outline: 0px; background-color: rgb(28, 28, 28); visibility: visible; color: rgb(205, 205, 205) !important;" style="-webkit-tap-highlight-color: transparent;outline: 0px;background-color: rgb(28, 28, 28);visibility: visible;color: rgb(205, 205, 205) !important;"><td width="557" valign="top" data-style="-webkit-tap-highlight-color: transparent; outline: 0px; word-break: break-all; hyphens: auto; border-color: rgb(76, 76, 76); background-color: rgb(255, 218, 169); visibility: visible; color: rgb(25, 25, 25) !important;" class="js_darkmode__1" style="-webkit-tap-highlight-color: transparent;outline: 0px;word-break: break-all;hyphens: auto;border-color: rgb(76, 76, 76);background-color: rgb(255, 218, 169);visibility: visible;color: rgb(25, 25, 25) !important;"><section style="-webkit-tap-highlight-color: transparent;outline: 0px;line-height: normal;visibility: visible;"><span style="-webkit-tap-highlight-color: transparent;outline: 0px;font-size: 12px;visibility: visible;color: rgb(0, 0, 0);">尊敬的读者：<br style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"/>感谢您花时间阅读我们提供的这篇文章。我们非常重视您的时间和精力，并深知信息对您的重要性。<br style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"/>我们希望了解您对这篇文章的看法和感受。我们真诚地想知道您是否认为这篇文章为您带来了有价值的资讯和启示，是否有助于您的个人或职业发展。<br style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"/>如果您认为这篇文章对您非常有价值，并且希望获得更多的相关资讯和服务，我们愿意为您提供进一步的定制化服务。请通过填写我们提供的在线表单，与我们联系并提供您的邮箱地址或其他联系方式。我们将定期向您发送相关资讯和更新，以帮助您更好地了解我们的服务和文章内容。</span></section><section style="-webkit-tap-highlight-color: transparent;outline: 0px;line-height: normal;visibility: visible;"><br style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"/></section><section style="-webkit-tap-highlight-color: transparent;outline: 0px;line-height: normal;text-indent: 0em;visibility: visible;"><span style="-webkit-tap-highlight-color: transparent;outline: 0px;color: rgb(0, 0, 0);">                   </span><img class="rich_pages wxw-img" data-backh="106" data-backw="106" data-cropselx1="0" data-cropselx2="119" data-cropsely1="0" data-cropsely2="119" data-galleryid="" data-imgfileid="100006513" data-ratio="1" data-s="300,640" data-type="png" data-w="1000" data-src="https://mmbiz.qpic.cn/sz_mmbiz_png/JqliagemfTA5N8G6ZVujodYTTD7NSaxFG5suXlkibicfoGRzCk6vHhCUBx7ST8b4AxdsFVNNAH4ltePBWX4AxKY0A/640?wx_fmt=other&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1&amp;tp=webp" style="-webkit-tap-highlight-color: transparent;outline: 0px;font-family: 宋体;font-size: 14px;letter-spacing: 0.578px;text-align: center;visibility: visible !important;width: 119px !important;"/></section><section style="-webkit-tap-highlight-color: transparent;outline: 0px;line-height: normal;text-indent: 0em;"><span style="-webkit-tap-highlight-color: transparent;outline: 0px;font-family: 宋体;font-size: 12px;letter-spacing: 0.578px;text-align: center;color: rgb(0, 0, 0);">                               扫描二维码，参与调查</span></section><section style="-webkit-tap-highlight-color: transparent;outline: 0px;line-height: normal;"><br style="-webkit-tap-highlight-color: transparent;outline: 0px;letter-spacing: 0.544px;"/></section></td></tr></tbody></table>  
  
  
**END**  
  
  
  
点击下方，关注公众号  
  
获取免费咨询和安全服务  
  
![](https://mmbiz.qpic.cn/mmbiz_png/JqliagemfTA5OxIlGh6IbpxrTJHkcY5DZ4O80nevX4Ev7IHvjZfPZDDMxibSVWk4IdYfaYpuhBgz2iaWS5tzXZLJw/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  
  
  
安全咨询/安全集成/安全运营  
  
专业可信的信息安全应用服务商！  
  
http://www.jsgjxx.com  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
