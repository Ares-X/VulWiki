---
cve: "CVE-2023-3216"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Google Chrome V8类型混淆漏洞   
安识科技  SecPulse安全脉搏   2023-06-19 11:10  
  
1. **通告信息**  
  
  
  
****  
近日，安识科技  
A-Team团队监测到Google发布安全公告，修复了Chrome中的一个类型混淆漏洞（CVE-2023-3216），该漏洞存在于Chrome V8 JavaScript引擎中，可以通过恶意设计的 HTML 页面触发该漏洞，成功利用可能导致浏览器崩溃或执行任意代码。  
  
对此，安识科技建议广大用户及时升级到安全版本，并做好资产自查以及预防工作，以免遭受黑客攻击。  
##   
  
2. **漏洞概述**  
  
  
  
漏洞名称：  
Google Chrome V8类型混淆漏洞  
  
CVE编号：CVE-2023-3216  
  
简述：  
V8是由Google 开源的一个高性能JavaScript 引擎，被广泛应用于各种 JavaScript 执行环境，如Chrome 浏览器、Node.js等。  
  
Google Chrome V8类型混淆漏洞存在于Chrome V8 JavaScript引擎中，可以通过恶意设计的 HTML 页面触发该漏洞，成功利用可能导致浏览器崩溃或执行任意代码。  
  
此外，  
Google Chrome 中还修复了自动填充付款、WebRTC和WebXR中的多个Use-After-Free漏洞（分别为CVE-2023-3214、CVE-2023-3215和CVE-2023-3217），UAF漏洞是一种内存损坏漏洞，远程威胁者可用通过恶意设计的HTML页面利用堆损坏进行潜在的攻击，成功利用可能导致远程代码执行、拒绝服务或数据损坏等。  
##   
  
3. **漏洞危害**  
  
  
##    
  
成功利用  
Google Chrome V8类型混淆漏洞可能导致浏览器崩溃或执行任意代码。  
##   
  
4. **影响版本**  
  
  
##   
  
目前受影响的  
Google  
 Chrome  
版本：  
  
Google Chrome（Windows）版本：< 114.0.5735.133/134  
  
Google Chrome（Mac/Linux）版本：< 114.0.5735.133  
##   
  
5. **解决方案**  
  
  
##   
  
目前该漏洞已经修复，  
Chrome用户可更新到以下版本：  
  
Google Chrome（Windows）版本：>= 114.0.5735.133/134  
  
Google Chrome（Mac/Linux）版本：>= 114.0.5735.133  
  
下载链接：  
  
https://www.google.c  
n/chrome/  
  
此外，  
Microsoft 也发布了上述漏洞的Microsoft Edge浏览器（基于 Chromium）公告，Microsoft Edge用户可升级到114.0.1823.51或更高版本，详情可参考：  
  
https://m  
src.microsoft.com/update-guide/vulnerability/CVE-2023-3216  
##   
  
6. **时间轴**  
  
  
##    
  
【  
-】2023年06月17日 安识科技A-Team团队监测到漏洞公布信息  
  
【  
-】2023年06月18日 安识科技A-Team团队根据漏洞信息分析  
  
【  
-】2023年06月19日 安识科技A-Team团队发布安全通告  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
