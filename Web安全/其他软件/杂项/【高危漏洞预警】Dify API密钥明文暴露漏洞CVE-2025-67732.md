---
cve: "CVE-2025-67732"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【高危漏洞预警】Dify API密钥明文暴露漏洞CVE-2025-67732  
cexlife  飓风网络安全   2026-01-06 03:10  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu03iaHcZyHibyVDmBibOQuHczqn72lAso8l9jAywfHaI3kiblA5yqyFDZgtaZRma5CV9aopAv1FZHF6tug/640?wx_fmt=png&from=appmsg "")  
  
漏洞描述:  
  
Difу是一个开源的大型语言模型应用开发平台,在1.11.0版本之前,API密钥以明文形式暴露在前端导致非管理员用户可以查看并重复使用该密钥。  
  
这可能导致对第三方服务的未授权访问,从而消耗有限的配额1.11.0版本已修复此问题  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu03iaHcZyHibyVDmBibOQuHczqnzI6OS7usdHHKygeItFYsmLcYGSKIQCic8drbsZhUPTdrurgcVwCDsibw/640?wx_fmt=png&from=appmsg "")  
  
影响产品及版本:  
  
Dify（开源大语言模型应用开发平台）,受影响版本为1.11.0之前版本  
  
攻击场景:  
  
攻击者可通过访问前端页面直接获取系统中API密钥的明文内容,进而利用该密钥调用后端关联的第三方服务（如大模型API、云服务等）实现未授权访问与资源滥用  
  
建议措施:  
  
立即升级Dify至1.11.0或更高版本,修复前端密钥暴露问题  
  
对现有系统进行安全审计，确认是否存在未加密的敏感配置项暴露于前端  
  
启用前端代码混淆与内容安全策略（CSP），防止敏感数据被非法抓取  
  
采用基于令牌的动态授权机制（如JWT、短期访问令牌），避免长期有效的API密钥直接暴露  
  
配置日志监控与异常调用告警，及时发现密钥滥用行为  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
