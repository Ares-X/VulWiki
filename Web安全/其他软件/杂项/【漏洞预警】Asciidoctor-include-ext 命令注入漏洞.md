---
cve: "CVE-2022-24803"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Asciidoctor-include-ext 命令注入漏洞   
 SecPulse安全脉搏   2022-04-21 17:05  
  
##   
  
1. **通告信息**  
  
  
  
  
近日，  
安识科技  
A-Team团队  
监测到一则   
Asciidoctor-include-ext 组件存在命令注入漏洞的信息，漏洞编号：CVE-2022-24803，漏洞威胁等级：严重，该漏洞是由于 Asciidoctor-include-ext 处理用户输入时存在安全问题，攻击者可利用该漏洞在未授权的情况下，构造恶意数据执行命令注入攻击，  
导致在主机上执行任意系统命令。  
  
对此，安识科技建议广大用户及时升级到安全版本，并做好资产自查以及预防工作，以免遭受黑客攻击。  
  
   
  
2. **漏洞概述**  
  
  
  
  
CVE-2022-24803  
  
简述：  
Asciidoctor是Asciidoctor组织的一款使用Ruby编写的文本处理器。该产品支持将AsciiDoc内容转换成HTML5、DocBook等格式。  
  
Asciidoctor-include-ext 0.4.0 之前的版本存在操作系统命令注入漏洞，该漏洞可能允许攻击者在主机操作系统上执行任意系统命令。  
  
   
  
3. **漏洞危害**  
  
  
  
  
攻击者可利用该漏洞在未授权的情况下，构造恶意数据执行命令注入攻击，  
导致在主机上执行任意系统命令。  
  
   
  
4. **影响版本**  
  
  
  
## 目前受影响的版本：  
  
Asciidoctor-include-ext ( RubyGems ) < 0.4.0  
  
   
  
5. **解决方案**  
  
  
  
  
厂商已发布补丁修复漏洞，用户请尽快更新至安全版本   
0.4.0，下载链接如下：  
https://github.com/jirutka/asciidoctor-include-ext/tags  
  
   
  
6. **时间轴**  
  
  
  
  
【  
-】202  
2  
年  
4  
月  
20  
日   
安识科技  
A-Team团队  
监测到  
Oracle Access Management漏洞信息。  
  
【  
-  
】  
2  
02  
2  
年  
4  
月  
20  
日   
安识科技  
A-Team团队根据漏洞信息分析  
  
【  
-  
】  
2  
02  
2  
年  
4  
月  
21  
日   
安识科技  
A-Team团队发布安全通告  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
