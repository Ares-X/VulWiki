---
cve: "CVE-2024-11728"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | WordPress Plugin KiviCare SQL注入漏洞   
浅安  浅安安全   2025-01-01 00:01  
  
**0x00 漏洞编号**  
- # CVE-2024-11728  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
KiviCare是一个专为WordPress网站设计的诊所和患者管理系统插件，主要功能是帮助医疗服务提供者、诊所、医院及独立医生管理预约、患者记录和相关的医疗业务流程。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SXagGVrjeAQBZvUPrDzGLkxhgqj2UXQDuRbol8SiaOjstLFOarapISRsrT0CmO0q7xFyNZ3R3aUJTA/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2024-11728**  
  
**漏洞类型：**  
SQL注入****  
  
**影响：**  
  
获取敏感信息  
  
  
****  
  
**简述：**  
KiviCare的/wp-admin/admin-ajax.php接口存在SQL注入漏洞，未经身份验证的攻击者可以通过该漏洞执行任意SQL语句，从而获取数据库敏感信息。  
  
**0x04 影响版本**  
- KiviCare Clinic & Patient Management System (EHR) <= 3.6.4  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://cn.wordpress.org/plugins/kivicare-clinic-management-system/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
