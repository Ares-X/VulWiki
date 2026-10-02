---
cve: "CVE-2025-68926"
source: "gelusus/wxvl 公众号漏洞文库"
title: "漏洞预警 | RustFS认证绕过漏洞"
product: "RustFS"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2025-68926"
referenced_identifiers: ""
identifier_role: "primary"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-72e1ee6f4a4ed5435d20562d"
entity_id: "ve-72e1ee6f4a4ed5435d20562d"
schema_version: "1"
---

# 漏洞预警 | RustFS认证绕过漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 本次正文校订

- 按该篇完整正文及逐篇审阅区分主问题与背景编号，补全结构化主标识；不把标识归属校订等同运行复现。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 静态gRPC令牌为根因需原始GHSA和端口可达条件
- alpha版本缺完整版本前缀
- POC已公开但未给代码/链接
- 修复仅首页非发布记录
- 删除/篡改等影响需原始接口授权证据，不能将公告称已验证

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

浅安  浅安安全   2026-01-06 00:00  
  
**0x00 漏洞编号**  
- # CVE-2025-68926  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
RustFS是一款基于Rust语言开发的分布式对象存储系统，采用高性能、内存安全的设计理念，支持S3兼容接口与集群化部署，适用于云存储、数据湖及大规模非结构化数据场景。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SXyUpeaFS0y6MiaqDjlNGve3zBhNRv2hg8PXMWqS8kN1ZrXxuYs4XSDpS5bvgw9gR0o4Sp8DsKpaeA/640?wx_fmt=png&from=appmsg "")  
  
  
**0x03 漏洞详情**  
###   
  
**CVE-2025-68926**  
  
**漏洞类型：**  
认证绕过  
  
**影响：**  
越权操作  
  
**简述：**  
RustFS存在认证绕过漏洞，由于其gRPC在客户端与服务端认证中采用静态认证令牌“rustfsrpc”进行身份校验，未授权的攻击者可通过该漏洞绕过身份认证执行删除存储桶和卷、篡改访问控制策略、读取或修改任意数据、获取用户与服务账号信息以及干扰集群运行等高危操作，进而导致数据泄露、数据完整性破坏及服务不可用。  
  
**0x04 影响版本**  
- alpha.76 <= RustFS < alpha.77  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://rustfs.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
