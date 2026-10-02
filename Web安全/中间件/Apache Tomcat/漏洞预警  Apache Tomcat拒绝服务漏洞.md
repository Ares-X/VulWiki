---
cve: "CVE-2024-38286"
source: "gelusus/wxvl 公众号漏洞文库"
title: "漏洞预警 | Apache Tomcat拒绝服务漏洞"
product: "Apache Tomcat TLS握手"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2024-38286"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "某些TLS配置，具体组合未交代"
verification_source: "https://tomcat.apache.org/security-9.html"
source_status: "unknown"
side_effects: "含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。"
id: "vw-ae6ab5befee1f0a3ccd322f9"
entity_id: "ve-ae6ab5befee1f0a3ccd322f9"
schema_version: "1"
---

# 漏洞预警 | Apache Tomcat拒绝服务漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：某些TLS配置，具体组合未交代
- 证据范围：资源耗尽摘要，未提供PoC；应保留历史公告类型而不是当复现记录。

### 已有来源支持的更正

- 已查9分支官方确认TLS握手某些配置可导致OOM，9.0.90修复；其他分支待核

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 修复只链接首页，不列各分支修复版本
- POC未公开应标明2024-09-28时点，非当前结论
- 某些配置未具体说明；危险等级来源未标
- 空标题与粗体残渣需清理

### 核验来源

- https://tomcat.apache.org/security-9.html

### 操作风险与资料使用

- 含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

浅安  浅安安全   2024-09-28 08:00  
  
**0x00 漏洞编号**  
- CVE-2024-38286  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Apache Tomcat是一个流行的开源Web服务器和Java Servlet容器。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SVK4xQb2ufvg2EXDtgjwmkJU7jSlCgMq3waOxibXOUBuTBQKo3OiacLU2cKQZvxLz8Jff2p4bgibaYwA/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2024-38286**  
  
**漏洞类型：**  
拒绝服务  
  
**影响：**  
资源消耗  
  
**简述：**  
Apache Tomcat在某些配置下处理TLS握手过程的方式中存在拒绝服务漏洞，可能导致威胁者通过滥用TLS握手过程导致内存过度消耗，从而引发OutOfMemoryError并可能导致拒绝服务。  
  
**0x04 影响版本**  
- 11.0.0-M1 <= Apache Tomcat <= 11.0.0-M20  
  
- 10.1.0-M1 <= Apache Tomcat <= 10.1.24  
  
- 9.0.13 <= Apache Tomcat <= 9.0.89  
  
**0x05****POC状态**  
- 未公开  
  
**0x06****修复建议**  
  
******目前官方已发布漏洞修复版本，建议用户升级到安全版本****：******  
  
https://tomcat.apache.org/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
