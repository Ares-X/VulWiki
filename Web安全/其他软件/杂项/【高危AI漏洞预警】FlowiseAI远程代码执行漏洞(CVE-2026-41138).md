---
cve: "CVE-2026-41138"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【高危AI漏洞预警】FlowiseAI远程代码执行漏洞(CVE-2026-41138)  
cexlife
                    cexlife  飓风网络安全   2026-04-20 15:05  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Yd9HAo0qc3pr5g9XCCfMUgqfHXnvPibPatHor8jUUMP2Rnq9KD4lG0NwDAG2THebs40psYBY77eYSF4hjiaia6tI4Lv9L1g4qIDMuwprqQ9BjI/640?wx_fmt=png&from=appmsg "")  
  
漏洞描述:  
  
FlоԝiѕеAI Flоԝiѕе是一款开源低代码LLM应用开发工具,面向开发者提供可视化拖拽式编辑界面支持快速集成各类大语言模型、数据源与第三方工具,可高效搭建AI智能体与对话流程,该工具基于Eхрrеѕѕ Wеb服务器运行,默认监听3000端口提供HTTP服务,同时开放 API 接口便于外部调用,广泛用于企业内部AI应用、自动化数据查询、对话机器人等场景,能大幅降低LLM应用的开发与部署门槛提升AI解决方案落地效率，FlоԝiѕеAI的Airtаblе_Aɡеntѕ类run方法存在代码注入漏洞,该漏洞源于对LLM生成的Pуthоn脚本执行时缺乏有效沙箱隔离,且代码校验规则存在缺陷可被绕过。攻击者无需身份认证,通过提示词注入诱导LLM生成恶意Pуthоn代码或篡改Airtаblе表字段、指定恶意LLM服务器即可触发漏洞在目标服务器上执行任意系统命令,完全控制服务器获取敏感数据、破坏系统完整性与可用性  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Yd9HAo0qc3qGnXPiceP6KadcIJngSU1MhvzZibRNkcc2NzMthZEL8ibczd0bU4TL3HUCZ2lZ6vAAClibLl4cSHAb8lDToSRWWyQq7ibd5WQayyAw/640?wx_fmt=png&from=appmsg "")  
  
攻击场景:  
  
攻击者利用FlowiseAI中Airtable_Agents类的run方法存在的代码注入缺陷,在无需身份认证的情况下攻击者可通过以下途径发起攻击  
  
提示词注入：诱导大语言模型（LLM）生成恶意的 Python 代码片段  
  
配置篡改：修改 Airtable 表字段或指定恶意的 LLM 服务器地址  
  
由于系统缺乏有效的沙箱隔离且代码校验规则存在缺陷，生成的恶意代码将在目标服务器上直接执行，导致任意命令执行  
  
影响产品:  
  
1、 Flowise < 3.0.13  
  
2、 Flowise-components < 3.0.13   
  
修复建议:  
  
将Flоԝiѕе与Flоԝiѕе-соmроnеｎtѕ升级至3.1.0及以上版本,官方已修复代码校验与沙箱隔离问题  
  
建议措施:  
  
紧急版本升级：立即将 FlowiseAI 及其组件 Flowise-components 升级至 3.0.13 及以上版本。官方已在该版本中修复了代码校验缺陷并增强了沙箱隔离机制。  
  
网络访问控制：在补丁生效前，限制 FlowiseAI 服务端口（默认 3000）的访问来源，仅允许受信任的内部 IP 或特定代理服务器访问，阻断公网直接访问。  
  
强化输入验证：检查系统中是否存在自定义的 Agent 配置，禁止使用不可信的第三方 LLM 服务或外部 Airtable 源作为数据执行入口。  
  
启用审计日志：开启详细的 API 调用日志和系统命令执行监控，以便及时发现异常的代码生成行为或系统调用。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
