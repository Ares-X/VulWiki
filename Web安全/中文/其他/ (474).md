---
cve: "CVE-2024-39877"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Apache Airflow 远程代码执行漏洞CVE-2024-39877   
cexlife  飓风网络安全   2024-07-17 23:08  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01Liayicczs7IgTHe5icXhpQv7uGJtCib7CnVo2ibByPeCXeswfxZwUNOiaSdJg4q1do7FUGRMGXZUVpd8w/640?wx_fmt=png&from=appmsg "")  
  
**漏洞描述:**Apache Airflow是一个开源的工作流自动化平台,它允许用户定义、调度和监视工作流任务的执行,受影响版本的Airflow会将DAG属性中的doc_md 参数进行Jinja2模板渲染,攻击者可控制doc_md参数进而执行任意代码,修复版本中修改为直接输出文档内容,从而防止恶意代码执行。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01Liayicczs7IgTHe5icXhpQv76D52pfSIqjD5g6tDqv34CjP1D2c29vS50tLkb7Eeskq8W199s8uLicg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01Liayicczs7IgTHe5icXhpQv7w65hCMB9nCJfaqWaZ4vdMoen0BH3pxYwc7shiaK1WYH7U2OW2PGoaOg/640?wx_fmt=png&from=appmsg "")  
  
**影响范围:**  
  
apache-airflow@[2.4.0, 2.9.3)**修复方案:**将组件apache-airflow升级至2.9.3及以上版本  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
