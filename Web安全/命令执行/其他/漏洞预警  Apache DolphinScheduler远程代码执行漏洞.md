---
cve: "CVE-2023-49299"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | Apache DolphinScheduler远程代码执行漏洞   
浅安  浅安安全   2024-01-06 08:04  
  
**0x00 漏洞编号**  
- # CVE-2023-49299  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Apache DolphinScheduler是一个分布式和可扩展的开源工作流编排平台，具有强大的DAG可视化界面，专注于解决数据流水线中的复杂任务依赖问题，并提供多种类型的任务可供"开箱即用"。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SXD4gT0JcKdQHScTiaP0Hm0kRewcOAkuzHIoEk08K1tIDDxqzo7iclRHflaJBiaxyQS3ichegBLibF5A9A/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2023-49299**  
  
**漏洞类型：**  
远程代码执行****  
  
**影响：**  
  
控制服务器  
  
****  
  
**简述：**  
Apache DolphinScheduler在3.1.9之前版本中存在远程代码执行漏洞，由于系统对代码过滤不充分，经过身份认证的攻击者可以在服务器上进行远程代码执行，从而控制服务器。  
###   
  
**0x04 影响版本**  
- Apache DolphinScheduler < 3.1.9  
  
**0x05****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://dolphinscheduler.apache.org/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
