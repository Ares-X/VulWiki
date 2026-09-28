---
cve: "CVE-2024-45034"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Apache Airflow<2.10.1 远程代码执行漏洞CVE-2024-45034   
cexlife  飓风网络安全   2024-09-10 23:13  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu00zCAdgWzfjBXKmWK3kYibJVa59YhMvb4U2wwadPA8kfQrVVbZicqrYxjYtX7CS1vZc72o5ficWxSfzw/640?wx_fmt=png&from=appmsg "")  
  
**漏洞描述:**  
  
Apache Airflow是开源的工作流自动化平台,允许用户以编程方式创建、调度和监控工作流(DAG),受影响版本中,由于允许用户在DAG目录中添加本地设置,具有DAG编辑权限的攻击者可在设置中注入恶意代码,当调度器加载DAG时将执行攻击者可控的恶意代码。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu00zCAdgWzfjBXKmWK3kYibJV18fkHpuQS0ibz6LAfoGKwBr8vfX88l0Onw89KVe95DSAKh1ibmNTxm8A/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu00zCAdgWzfjBXKmWK3kYibJVgWTt0Ydn0NE58ncJ4ps2uFBhaClic8ib5kI8mxaZyqEHpicPyYLCYlYIg/640?wx_fmt=png&from=appmsg "")  
  
**影响范围:**  
  
apache-airflow 生态:pip  
  
仓库类型pip受影响的版本(-∞, 2.10.1)最小修复版本2.10.1**参考链接:**https://www.openwall.com/lists/oss-security/2024/09/06/3  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
