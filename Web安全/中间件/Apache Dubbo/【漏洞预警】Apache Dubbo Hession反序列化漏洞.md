---
cve: "CVE-2022-39198"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Apache Dubbo Hession反序列化漏洞   
 SecPulse安全脉搏   2022-10-20 17:32  
  
##   
  
1. **通告信息**  
  
  
  
近日，  
安识科技  
A-Team团队  
监测到一则   
Apache Dubbo  
组件存在  
Hession反序列化漏洞的信息，漏洞编号：  
CVE-2022-39198  
，漏洞威胁等级：高危。  
  
该漏洞是由于  
Dubbo hessian-lite 3.2.12及之前版本中存在反序列化漏洞，成功利用此漏洞可在目标系统上执行恶意代码，最终获取服务器最高权限。  
  
对此，安识科技建议广大用户及时升级到安全版本，并做好资产自查以及预防工作，以免遭受黑客攻击。  
##   
  
2. **漏洞概述**  
  
  
  
CVE  
：  
CVE-2022-39198  
  
简述：  
Apache Dubbo是一款高性能、轻量级的开源服务框架，提供了RPC通信与微服务处理两大关键能力。由于Dubbo hessian-lite 3.2.12及之前版本中存在反序列化漏洞，成功利用此漏洞可在目标系统上执行恶意代码。  
##   
  
3. **漏洞危害**  
  
  
  
攻击者可利用该漏洞在未授权的情况下，构造恶意数据执行远程代码执行攻击，最终获取服务器最高权限。  
##   
  
4. **影响版本**  
  
  
  
目前受影响的  
Apache   
Dubbo 版本：  
  
Apache Dubbo 2.7.x版本：<= 2.7.17  
  
Apache Dubbo 3.0.x版本：<= 3.0.11  
  
Apache Dubbo 3.1.x版本：<= 3.1.0  
##   
  
5. **解决方案**  
  
  
  
目前该漏洞已经修复，受影响用户可以升级到  
Dubbo hessian-lite 版本 >=3.2.13；或升级Apache Dubbo到以下版本：  
  
Apache Dubbo 2.7.x版本：>= 2.7.18  
  
Apache Dubbo 3.0.x版本：>= 3.0.12  
  
Apache Dubbo 3.1.x版本：>= 3.1.1  
  
Apache Dubbo下载链接：  
  
https://github.com/apache/dubbo/tags  
  
Dubbo hessian-lite下载链接：  
  
https://github.com/apache/dubbo-hessian-lite/releases  
##   
  
6. **时间轴**  
  
  
  
【  
-  
】  
202  
2  
年  
10月18日 安识科技A  
-T  
eam团队监测到Apache Dubbo Hession反序列化漏洞信息  
  
【  
-  
】  
2  
02  
2年10月19日 安识科技A-Team团队根据漏洞信息分析  
  
【  
-  
】  
2  
02  
2年10月20日 安识科技A-Team团队发布安全通告  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
