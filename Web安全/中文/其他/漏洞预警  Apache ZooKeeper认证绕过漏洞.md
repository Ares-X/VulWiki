---
cve: "CVE-2023-44981"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | Apache ZooKeeper认证绕过漏洞   
浅安  浅安安全   2023-10-14 08:01  
  
**0x00 漏洞编号**  
- # CVE-2023-44981  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Apache ZooKeeper是一个开源的服务器，用于维护配置信息、命名、提供分布式同步和提供组服务的集中式服务。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SWqko9FpUNxKIEDk0mJhFKwYIFEUT1iaq1MkHic1zhibQIeI9gibxjcQTicmL4RJu7utjhhwM9s3G3ATPQ/640?wx_fmt=png "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2023-44981**  
  
**漏洞类型：**  
认证绕过  
  
**影响：**  
越权访问  
  
**简述：**  
Apache ZooKeeper中存在认证绕过漏洞，在ZooKeeper中启用SASL Quorum Peer身份认证，由于SASL验证ID的部分为可选项，当缺少其则可以跳过授权检查。因此任意端点都可能加入集群，从而拥有对数据树的读写权限。  
###   
  
**0x04 影响版本**  
- Apache ZooKeeper 3.9.0  
  
- 3.8.0 <= Apache ZooKeeper <= 3.8.2  
  
- Apache ZooKeeper < 3.7.1  
  
**0x05****修复建议**  
  
******目前官方已发布漏洞修复版本，建议用户升级到安全版本****：******  
  
https://zookeeper.apache.org/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
