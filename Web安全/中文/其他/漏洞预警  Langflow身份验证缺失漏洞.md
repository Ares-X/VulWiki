---
cve: "CVE-2026-21445"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | Langflow身份验证缺失漏洞  
浅安  浅安安全   2026-01-15 00:00  
  
**0x00 漏洞编号**  
- # CVE-2026-21445  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Lаnɡflоԝ是一款用于构建和部署AI驱动的代理和工作流的工具。  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SWHPUpZmONDCibcFMW39mQNiaulRXCKTibMciaWtBw1yDKAkx71WnnxR63goPXFQVQMAyTUUu2pIgLQuA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0 "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2026-21445**  
  
**漏洞类型：**  
身份验证缺失  
  
**影响：**  
越权操作  
  
**简述：**  
Langflow存在身份验证缺失漏洞，由于src/backend/base/langflow/api/v1/monitor.py中的三个API接口缺少访问控制，攻击者可以在未提供身份验证信息的情况下访问这些接口，从而导致用户数据泄露、隐私侵犯及数据销毁风险。  
  
**0x04 影响版本**  
- Langflow <= 1.7.0  
  
**0x05 POC状态**  
- 已公开  
  
****  
**0x06****修复建议**  
  
******目前官方已发布漏洞修复版本，建议用户升级到安全版本****：******  
  
https://github.com/langflow-ai/langflow  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
