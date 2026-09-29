---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Ivanti Avalanche多个高危漏洞漏洞威胁通告   
安识科技  SecPulse安全脉搏   2023-08-17 10:58  
  
##   
  
1. **通告信息**  
  
  
  
近日，  
安识科技A-Team团队  
监测到Ivanti Avalanche中修复了多个安全漏洞，这些漏洞可能导致身份验证绕过、文件上传、目录遍历和远程代码执行等。  
  
对此，安识科技建议广大用户及时升级到安全版本  
,并做好资产自查以及预防工作，以免遭受黑客攻击。  
##   
  
2. **漏洞概述**  
  
  
  
CVE-2023-32560：Ivanti Avalanche基于堆栈的缓冲区溢出（高危）  
  
该漏洞存在于  
Ivanti Avalanche WLAvalancheService.exe中，未经身份验证的远程威胁者可通过向TCP 端口 1777发送特制消息，可能导致在目标系统上执行任意代码或造成服务中断，该漏洞的细节已公开。  
  
CVE-2023-32561：Ivanti Avalanche身份验证绕过漏洞（高危）  
  
该漏洞存在于  
Ivanti Avalanche dumpHeap方法中，由于权限分配不正确，远程威胁者可利用该漏洞绕过系统上的身份验证。  
  
CVE-2023-32562：Ivanti Avalanche文件上传漏洞（高危）  
  
该漏洞存在于  
Ivanti Avalanche FileStoreConfig端点中，由于对用户提供的数据缺乏适当验证，经过身份验证的威胁者可利用该漏洞上传任意文件，导致远程代码执行。  
  
CVE-2023-32563：Ivanti Avalanche目录遍历漏洞（严重）  
  
该漏洞存在于  
Ivanti Avalanche updateSkin方法中，由于在文件操作中使用用户提供的路径之前未对其进行正确验证，导致目录遍历漏洞，未经身份验证的威胁者可利用该漏洞远程执行代码。  
  
CVE-2023-32564：Ivanti Avalanche文件上传漏洞（高危）  
  
该漏洞存在于  
Ivanti Avalanche FileStoreConfig中，由于对用户提供的数据缺乏适当验证，经过身份验证的威胁者可利用该漏洞上传任意文件，导致远程代码执行。  
  
CVE-2023-32565：Ivanti Avalanche SecureFilter Content-Type身份验证绕过漏洞（高危）  
  
该漏洞存在于  
Ivanti Avalanche SecureFilter类中，由于在授权逻辑中不正确地使用 Content-Type HTTP 标头，远程威胁者可通过发送特制请求，绕过系统上的部分身份验证。  
  
CVE-2023-32566：Ivanti Avalanche SecureFilter allowedPassThrough身份验证绕过漏洞（高危）  
  
该漏洞存在于  
Ivanti Avalanche SecureFilter allowedPassThrough方法中，由于做出授权决策时字符串匹配不正确，远程威胁者可通过发送特制请求，绕过系统上的部分身份验证。  
##   
  
3. **漏洞危害**  
  
  
  
攻击者可利用该漏洞触  
发缓冲区溢出并在目标系统上执行任意代码，或绕过身份认证。  
##   
  
4. **影响版本**  
  
  
  
Ivanti Avalanche版本 <= 6.4.0  
##   
  
5. **解决方案**  
  
  
  
目前这些漏洞已经修复，受影响用户可升级到以下版本：  
  
	  
Ivanti Avalanche版本 >= 6.4.1.207  
  
下载链接：  
  
https://forums.ivanti.com/s/avalanche-powered-by-wavelink?language=en_US  
##   
  
6. **时间轴**  
  
  
  
【  
-  
】2023年08月16日 安识科技A  
-T  
eam团队监测到Ivanti Avalanche多个高危漏洞  
  
【  
-  
】  
2  
02  
3年08月16日 安识科技A-Team团队根据漏洞信息分析  
  
【  
-  
】  
2  
02  
3年08月17日 安识科技A-Team团队发布安全通告  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
