---
cve: "CVE-2023-44981"
source: "gelusus/wxvl 公众号漏洞文库"
title: "漏洞预警 | Apache ZooKeeper认证绕过漏洞"
product: "Apache ZooKeeper Quorum Peer Authentication"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2023-44981"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "非默认quorum.auth.enableSasl=true且仲裁/选举网络可达，缺instance的SASL身份跳过授权"
verification_source: "https://zookeeper.apache.org/security/"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-806dbbdc7ce0296b5082667b"
entity_id: "ve-806dbbdc7ce0296b5082667b"
schema_version: "1"
---

# 漏洞预警 | Apache ZooKeeper认证绕过漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：非默认quorum.auth.enableSasl=true且仲裁/选举网络可达，缺instance的SASL身份跳过授权
- 证据范围：应称已认证身份的集群成员授权检查绕过，不能笼统混成客户端登录认证绕过。

### 已有来源支持的更正

- 官方确认3.7.1仍受影响，三分支修复及SASL默认未开、instance字段缺失跳过授权

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- <3.7.1漏掉受影响3.7.1，官方修复3.7.2
- 缺具体instance字段和SASL配置条件，只说ID的一部分
- 修复只有首页，需列3.9.1/3.8.3/3.7.2及隔离quorum网络
- 危险等级来源未标，官方critical

### 核验来源

- https://zookeeper.apache.org/security/

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

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
