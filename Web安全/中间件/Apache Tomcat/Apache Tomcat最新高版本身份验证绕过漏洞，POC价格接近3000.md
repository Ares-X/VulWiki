---
cve: "CVE-2024-52316"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Apache Tomcat最新高版本身份验证绕过漏洞，POC价格接近3000   
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
