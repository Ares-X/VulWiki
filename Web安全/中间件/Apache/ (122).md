---
cve: "CVE-2024-23945"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Apache Hive & Spark信息泄露漏洞安全风险通告   
 嘉诚安全   2024-12-25 01:35  
  
**漏洞背景**  
  
  
  
  
  
  
  
  
近日，嘉诚安全监测到Apache Hive和Apache Spark中存在一个敏感信息泄露漏洞，漏洞编号为：  
CVE-2024-23945。  
  
  
Apache Hive和Apache Spark是两个广泛用于大数据生态系统的开源框架，主要用于处理和分析大规模数据集。  
  
  
鉴于漏洞危害较大，嘉诚安全提醒相关用户尽快更新至安全版本，避免引发漏洞相关的网络安全事件。  
  
  
**漏洞详情**  
  
  
  
  
  
  
  
  
经研判，该漏洞为  
**高危**  
漏洞  
。Apache Hive和Apache Spark的CookieSigner逻辑存在安全漏洞，当签名验证失败时，系统错误地将正确的签名值暴露给用户，导致攻击者可以通过构造错误的Cookie请求触发签名验证失败并获取有效签名，成功利用该漏洞可能允许攻击者伪造合法的Cookie，从而绕过认证机制，导致未授权访问，并可能进一步引发会话劫持、权限提升等攻击。  
  
  
**危害影响**  
  
  
  
  
  
  
  
  
影响版本：  
  
1.2.0 <= Apache Hive < 4.0.0  
  
2.0.0 <= Apache Spark < 3.0.0  
  
3.0.0 <= Apache Spark < 3.3.4  
  
3.4.0 <= Apache Spark < 3.4.2  
  
Apache Spark 3.5.0  
  
受影响的组件如下：  
  
* org.apache.hive:hive-service  
  
* org.apache.spark:spark-hive-thriftserver_2.11  
  
* org.apache.spark:spark-hive-thriftserver_2.12  
  
  
**处置建议**  
  
  
  
  
  
  
  
  
目前该漏洞已经修复，受影响用户可升级到以下版本：  
  
Apache Hive >= 4.0.0  
  
Apache Spark 2.x 系列 >= 3.0.0  
  
Apache Spark 3.0.0系列 >= 3.3.4  
  
Apache Spark 3.4.0系列 >= 3.4.2  
  
Apache Spark 3.5.0 >= 3.5.1  
  
下载链接：  
  
https://github.com/apache/spark/tags  
  
https://hive.apache.org/general/downloads/  
  
参考链接：  
  
https://lists.apache.org/thread/59r4mv7glrxpwkkdjvjbdljfpx3f5zzc  
  
https://www.openwall.com/lists/oss-security/2024/12/23/2  
  
https://nvd.nist.gov/vuln/detail/CVE-2024-23945  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1t8LLTibEW5NtxqlBL1HLib8jMO0PWtibWTWTFPOa3ND1lyaEQyBgp2fodg9A1XxvPjY7L6ILtK26MBGhofWE0ORw/640?wx_fmt=png&wx_ "")  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/sDiaO8GNKJrJnzIYoQAv2nF3pgKm4SgdFkzuniaicBHQxgSdu0U0xyYbNDOcNkDMWCjwJNwKnic9ASAhhxEpkFL6lg/640?wx_fmt=gif&wx_ "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
