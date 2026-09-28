---
cve: "CVE-2024-28088"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】LangChain 远程代码执行漏洞（CVE-2024-28088）   
cexlife  飓风网络安全   2024-03-06 22:54  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01zWeXR2tfDtqbicjPGrWHwbnSmRvI79lkGmWtV13cWUMjTbp78xsm1q7m0jgsa3y1jIibzSPFD72icA/640?wx_fmt=png&from=appmsg "")  
  
**漏洞描述:**  
  
LangChain是一个旨在帮助开发人员使用语言模型构建端到端的应用程序的框架,支持配置不同的链调用,langchain-experimental是一个用于研究和实验目的的Python包,由于langchain在load_chain中存在路径穿越漏洞,导致攻击可从hwchase17/langchain-hub仓库路径穿越至其他仓库加载json文件,当受害者加载恶意json、请求恶意api域名、攻击者返回恶意命令时,langchain_experimental组件llm_bash/base.py中_call函数将执行恶意命令,导致OPENAI API token 泄露和恶意代码执行。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01zWeXR2tfDtqbicjPGrWHwbrpQfOQ2oEQlnfVjX2Uw9y0dagiaRChIO4D6ssweZnYY7ejKEAqKKGCA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01zWeXR2tfDtqbicjPGrWHwbWXcvSl8xQDGJgBOrUkDDfvZju2LfoFYNV4Y9WxuV5LcWgLhibnbAcUA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01zWeXR2tfDtqbicjPGrWHwbm8L1rMJvX4pJHxlOdztdWnZYpJzEibrdcVWNQ6rSkVTcXC0CicrL0YNQ/640?wx_fmt=png&from=appmsg "")  
  
**影响范围:**  
  
langchain-core(-∞, 0.1.28]langchain-experimental(-∞, 0.0.53]**修复方案:**避免load_chain函数参数可被用户控制禁用langchain-experimental**参考链接:**  
  
https://github.com/langchain-ai/langchain/blob/f96dd57501131840b713ed7c2e86cbf1ddc2761f/libs/core/langchain_core/utils/loading.py  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
