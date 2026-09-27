---
cve: "CVE-2025-29446"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Open WebUI 0.5.16 SSRF漏洞（CVE-2025-29446）   
 sec0nd安全   2025-04-22 15:06  
  
↑点击关注，获取更多漏洞预警，技术分享  
  
0x01 组件介绍  
  
    
Open WebUI 是一个可扩展、功能丰富且用户友好的自托管 AI 平台，旨在完全离线运行。它支持各种LLM运行器，如 Ollama 和兼容 OpenAI 的 API，内置 RAG 推理引擎，使其成为强大的 AI 部署解决方案。  
  
fofa搜索语法：  
app="Open-WebUI" （10W+结果）  
  
0x02 漏洞描述  
  
      
漏洞存在于位于 /routers/ollama/verify中,该函数会从表单中获取名为url、key的参数值，拼接到"{url}/api/version", 中，将用户输入的url直接拼接上 /api/version (此处可以用 # 进行绕过)，  
利用#注释符注释掉了默认添加在url后面的 /api/version,达到了SSRF漏洞  
  
<table><tbody><tr><td data-colwidth="143" width="143" style="border-color:#0080ff;"><section><span leaf="">漏洞分类</span></section></td><td colspan="3" data-colwidth="143,143,143" width="143,143,143" style="border-color:#0080ff;"><section><span leaf="">SSRF漏洞</span></section></td></tr><tr><td data-colwidth="143" width="143" style="border-color:#0080ff;"><section><span leaf="" data-pm-slice="1 1 [&#34;table&#34;,{&#34;interlaced&#34;:null,&#34;align&#34;:null,&#34;class&#34;:null,&#34;style&#34;:null},&#34;table_body&#34;,{},&#34;table_row&#34;,{&#34;class&#34;:null,&#34;style&#34;:null},&#34;table_cell&#34;,{&#34;colspan&#34;:1,&#34;rowspan&#34;:1,&#34;colwidth&#34;:[143],&#34;width&#34;:null,&#34;valign&#34;:null,&#34;align&#34;:null,&#34;style&#34;:null},&#34;para&#34;,null]">CVSS 3.1分数</span></section></td><td data-colwidth="143" width="143" style="border-color:#0080ff;"><section><span leaf=""><span textstyle="" style="color: rgb(255, 0, 0);">9.1</span></span></section></td><td data-colwidth="143" width="143" style="border-color:#0080ff;"><section><span leaf="">漏洞等级</span></section></td><td data-colwidth="143" width="143" style="border-color:#0080ff;"><section><span leaf=""><span textstyle="" style="color: rgb(255, 0, 0);">严重</span></span></section></td></tr><tr><td data-colwidth="143" width="143" style="border-color:#0080ff;"><section><span leaf="">POC/EXP</span></section></td><td data-colwidth="143" width="143" style="border-color:#0080ff;"><section><span leaf=""> </span><span leaf=""><span textstyle="" style="color: rgb(255, 0, 0);">已公开</span></span></section></td><td data-colwidth="143" width="143" style="border-color:#0080ff;"><section><span leaf="">可利用性</span></section></td><td data-colwidth="143" width="143" style="border-color:#0080ff;"><section><span leaf=""><span textstyle="" style="color: rgb(255, 0, 0);">低</span></span></section></td></tr></tbody></table>  
  
0x03 影响版本  
  
Open WebUI 0.5.16  
<table><tbody><tr style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"></tr></tbody></table>  
  
0x04 漏洞验证  
  
目前POC/EXP已经公开，但利用条件比较苛刻，版本目前揭露的只影响  
0.5.16的版本，利用该漏洞还需要管理员的身份才能利用，具体过程可参考：  
https://github.com/l1uyi/cve-list/blob/main/cve-list/open-webui-ssrf.md  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/pl2czC0m3eqXBib8pjbiar6gBbHUQ1b7mGlPriaRLnzF2rOIybGfNDPAGfJN6WANKz55eiaHsSV0XcxYheG0icAfumg/640?wx_fmt=png&from=appmsg "")  
  
  
0x05 漏洞影响  
  
由于该漏洞影响范围较广，危害较大。通过以上复现过程，我们可以知道该漏洞的利用过程比较困难，  
版本目前揭露的只影响  
0.5.16的版本，利用该漏洞还需要管理员的身份才能利用。企业可按需求尽快排查是否有使用该组件，并尽快做出对应措施  
  
  
0x06 修复建议  
  
  
1.升级到最新版本  
  
https://github.com/open-webui/open-webui/releases  
  
2.确保管理员身份信息未泄露  
  
  
0X07 参考链接  
  
https://github.com/l1uyi/cve-list/blob/main/cve-list/open-webui-ssrf.md  
  
  
0x08 免责声明  
  
> 本文所涉及的任何技术、信息或工具，仅供学习和参考之用。  
  
> 请勿利用本文提供的信息从事任何违法活动或不当行为。任何因使用本文所提供的信息或工具而导致的损失、后果或不良影响，均由使用者个人承担责任，与本文作者无关。  
  
> 作者不对任何因使用本文信息或工具而产生的损失或后果承担任何责任。使用本文所提供的信息或工具即视为同意本免责声明，并承诺遵守相关法律法规和道德规范。  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
