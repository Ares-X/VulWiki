---
cve: "CVE-2023-37924"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | Apache Submarine SQL注入漏洞   
浅安  浅安安全   2023-11-25 09:03  
  
**0x00 漏洞编号**  
- # CVE-2023-37924  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Apache Submarine是一个是云原生机器学习平台，允许创建端到端机器学习工作流程，通过Submarine可以完成ML模型生命周期的每个阶段，包括数据探索、数据管道创建、模型训练、服务和监控。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SUkgWHnZO6mDZiaWyGJ899SSflezfpFboDrU3mRBSAN6PQt5QQApia8XECqDZCvKw0So8JXjk3CIb3w/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2023-37924**  
  
**漏洞类型：**  
SQL注入  
  
**影响：**  
获取敏感信息****  
  
**简述：**  
Apache Submarine版本0.7.0-0.8.0之前存在SQL注入漏洞，由于Mybatis中模糊查询防止SQL注入时使用了${}，当使用like查询时可能存在漏洞，未授权威胁者可利用该漏洞执行恶意SQL语句，导致未授权访问或执行恶意操作。  
###   
  
**0x04 影响版本**  
- 0.7.0 <= Apache Submarine < 0.8.0  
  
**0x05****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://submarine.apache.org/  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
