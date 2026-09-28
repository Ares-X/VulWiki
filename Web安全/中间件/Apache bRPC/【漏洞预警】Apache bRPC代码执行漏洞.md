---
cve: "CVE-2023-31039"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Apache bRPC代码执行漏洞   
 SecPulse安全脉搏   2023-05-10 12:01  
  
****  
1. **通告信息**  
  
  
  
近日，安识科技  
A-Team团队监测到Apache官方发布安全公告，修复了bRPC中的一个代码执行漏洞（CVE-2023-31039）。  
  
对此，安识科技建议广大用户及时升级到安全版本，并做好资产自查以及预防工作，以免遭受黑客攻击。  
##   
  
2. **漏洞概述**  
  
  
  
漏洞名称：  
Apache bRPC代码执行漏洞  
  
CVE编号：  
CVE-2023-31039  
  
简述：  
Apache bRPC 是由百度主导并开源的一款工业级C++ RPC框架，常用于搜索、存储、机器学习、广告、推荐等高性能系统。  
  
Apache bRPC版本<1.5.0（所有平台）中，威胁者如果能够影响bRPC服务器启动时的ServerOptions pid_file参数，则可以使用bRPC进程的权限执行任意代码。  
##   
  
3. **漏洞危害**  
  
  
##    
  
攻击者可利用该漏洞影响  
bRPC服务器启动时的ServerOptions pid_file参数，进而使用bRPC进程的权限执行任意代码。  
##   
  
4. **影响版本**  
  
  
##   
  
目前受影响的  
Apache bRPC版本：  
  
Apache bRPC  
   
< 1.5.0（所有平台）  
##   
  
5. **解决方案**  
  
  
##   
  
目前该漏洞已经修复，受影响用户可升级到以下版本：  
  
Apache bRPC版本：>= 1.5.0  
  
下载链接：  
  
https://dist.apache.org/repos/dist/release/brpc/1.5.0/  
  
如果使用的是旧版本的  
bRPC并且难以升级，可以应用补丁：  
  
https://github.com/apache/brpc/pull/2218  
  
所需配置：  
  
从用户输入设置   
brpc::ServerOptions::pid_file。  
##   
  
6. **时间轴**  
  
  
##    
  
【  
-】2023年0  
5  
月  
08  
日   
安识科技  
A-Team团队监测到漏洞公布信息  
  
【  
-】2023年0  
5  
月  
09  
日   
安识科技  
A-Team团队根据漏洞信息分析  
  
【  
-】2023年0  
5  
月  
10  
日   
安识科技  
A-Team团队发布安全通告  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
