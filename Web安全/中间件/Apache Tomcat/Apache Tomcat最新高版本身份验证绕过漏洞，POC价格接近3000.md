---
cve: "CVE-2024-52316"
source: "gelusus/wxvl 公众号漏洞文库"
title: "Apache Tomcat最新高版本身份验证绕过漏洞，POC价格接近3000"
product: "Apache Tomcat Jakarta Authentication"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2024-52316"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "自定义ServerAuthContext抛异常且不明确设置失败HTTP状态；不是默认认证组件普遍问题"
verification_source: "https://tomcat.apache.org/security-9"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-4c93edd515295320e838c428"
entity_id: "ve-4c93edd515295320e838c428"
schema_version: "1"
---

# Apache Tomcat最新高版本身份验证绕过漏洞，POC价格接近3000

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：自定义ServerAuthContext抛异常且不明确设置失败HTTP状态；不是默认认证组件普遍问题
- 证据范围：正文漏最关键异常组件条件，价格截图不能证明PoC有效性或风险等级。

### 已有来源支持的更正

- 官方52316为Low，需特殊自定义ServerAuthContext异常行为，9.0.96修复；不是普遍认证绕过

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 官方Low而文中因性质通常高风险，缺依据；未说明无已知组件这样行为
- 只列9.x，遗漏10.1/11分支；缺明确9.0.96等修复
- POC售卖近3000无平台/验证信息，应移出技术标题或标未经核实新闻
- 没有请求/复现/配置，不能推断任意高版本可绕过

### 核验来源

- https://tomcat.apache.org/security-9

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

SecHaven  赛哈文   2024-11-20 03:10  
  
近日Apach  
e Tomcat公布了最新漏洞，其中CVE-2024-52316 Apache Tomcat身份验证绕过值得大家关注。具体涉及到使用Jakarta身份  
验证API时的身份验证绕过问题。该漏洞的存在可能允许攻击者在未经授权的情况下访问受保护的资源，从而对系统安全构成威胁。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/R3h5SuP8QnKGnsQ99DPfbUcjLkRomSPgQGadIic6lNM3k9hPeKicCgGWWvibQUQXs00pkNJYG2xd2ibG2OZBm5OvNQ/640?wx_fmt=png&from=appmsg "")  
  
据信息显示，其POC在海外平台售卖，价格接近3000人民币：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/R3h5SuP8QnKGnsQ99DPfbUcjLkRomSPgD8zwknLJWicqqOgdRy40epoWP2KVUuffiayAM3fem2Z9EyYAzicSAIElQ/640?wx_fmt=png&from=appmsg "")  
## 漏洞详细信息  
- 漏洞类型：身份验证绕过  
  
- 影响组件：Apache Tomcat  
  
- CWE编号：CWE-391  
  
- 披露时间：2024年11月18日  
  
- CVSS评分：未提供具体评分，但由于其性质，通常被视为高风险。  
  
**受影响版本**  
  
Apache Tomcat 9.0.0-M1 至 9.0.95  
  
**安全建议**  
  
为了防止CVE-2024-52316带来的安全风险，建议采取以下措施：  
1. 更新软件：及时更新Apache Tomcat至最新版本，确保所有安全补丁已应用。  
  
1. 审查配置：检查Jakarta身份验证API的配置，确保没有不当设置导致安全隐患。  
  
1. 监控日志：定期监控系统日志，以便及早发现任何异常访问行为。  
  
通过这些措施，可以有效降低因CVE-2024-52316漏洞带来的安全风险。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
