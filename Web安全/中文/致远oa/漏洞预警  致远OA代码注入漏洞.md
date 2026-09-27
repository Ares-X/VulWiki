---
cve: "CVE-2025-4531"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | 致远OA代码注入漏洞   
浅安  浅安安全   2025-05-14 00:00  
  
**0x00 漏洞编号**  
- # CVE-2025-4531  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
致远OA是一款由用友成员企业致远软件开发的办公自动化软件，采用J2EE技术开发，功能完善，流程管理、文档管理等功能较为成熟，在产品化领域优势较为明显。  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SW3tDwuiciavQsB1E3fBkyjAQBfSxu6P8NGTHfmqHt4K75zjdrS6zj0hpG3vV8a870D0icEcRh7uNedQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1 "")  
  
**0x03 漏洞详情**  
###   
  
CVE-2025-4531  
  
漏洞类型：  
代码注入  
  
**影响：**  
执行任意代码  
  
**简述：**  
致远OA的Beetl模板处理组件中的文件ROOT\WEB-INF\classes\com\ours\www\ehr\salary\service\data\EhrSalaryPayrollServiceImpl.class内postData功能的payrollId参数被恶意操控可导致代码注入攻击。攻击者可通过远程方式执行任意代码。  
  
**0x04 影响版本**  
- 致远OA   
8.1   
SP2  
  
**0x05 POC状态**  
- **未公开**  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.seeyon.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
