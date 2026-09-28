---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  超过1200个SAP NetWeaver服务器容易受到主动利用漏洞的攻击   
胡金鱼  嘶吼专业版   2025-05-09 06:01  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/wpkib3J60o297rwgIksvLibPOwR24tqI8dGRUah80YoBLjTBJgws2n0ibdvfvv3CCm0MIOHTAgKicmOB4UHUJ1hH5g/640?wx_fmt=gif "")  
  
超过1200个暴露在互联网上的SAP NetWeaver实例容易受到一个高严重程度的未经身份验证文件上传漏洞的攻击，该漏洞允许攻击者劫持服务器。  
  
SAP NetWeaver是一个应用服务器和开发平台，可以跨不同技术运行和连接SAP和非SAP应用程序。上周，SAP披露了一个未经身份验证的文件上传漏洞，跟踪为CVE-2025-31324，该漏洞存在于SAP NetWeaver Visual Composer中，特别是Metadata Uploader组件。  
  
该漏洞允许远程攻击者在没有身份验证的情况下在暴露的实例上上传任意可执行文件，从而实现代码执行和整个系统的危害。  
  
包括ReliaQuest、watchtower和Onapsis在内的多家网络安全公司证实，该漏洞在攻击中被积极利用，威胁者利用它在易受攻击的服务器上投放web shell。  
  
SAP发言人表示，他们已经意识到了这些攻击，并在2024年4月8日发布了一个解决方案，随后在4月25日发布了一个安全更新，解决了CVE-2025-31324问题。他们没有发现任何此类攻击影响客户数据或系统的案例。  
# 广泛用于攻击  
  
研究人员现已证实，许多易受攻击的SAP Netweaver服务器暴露在互联网上，使其成为攻击的主要目标。  
  
Shadowserver基金会发现了427个暴露的服务器，并提醒大量暴露的攻击面和潜在的严重后果。大多数易受攻击的系统位于美国，其次是印度、澳大利亚、德国、荷兰、巴西和法国等。  
  
然而，网络防御搜索引擎Onyphe描绘了一幅更为可怕的画面，他们发现，有1284台易受攻击的服务器暴露在网上，其中474台已经被webshell入侵。  
  
Onyphe首席技术官说道：“大约有20家《财富》500强或全球500强企业很容易受到攻击，其中许多企业都受到了损害。”  
  
研究人员报告说，这些攻击者正在利用诸如“cache.jsp”和“helper.jsp”这样的名称的webshell。然而，Nextron Research表示，他们也使用随机名称，这使得发现易受攻击的Netweaver实例变得更加困难。  
  
虽然服务器的数量并不多，但考虑到大型企业和跨国公司通常使用SAP NetWeaver，风险仍然很大。为了解决该风险，建议按照本公告中供应商的说明应用最新的安全更新。  
  
如果无法应用更新，建议采用以下缓解措施：  
  
1.限制对/developmentserver/metadata auploader端点的访问。  
  
2.如果没有使用Visual Composer，请考虑完全关闭它。  
  
3.将日志转发到SIEM并扫描servlet路径中未授权的文件。  
  
参考及来源：  
https://www.bleepingcomputer.com/news/security/over-1-200-sap-netweaver-servers-vulnerable-to-actively-exploited-flaw/  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o28KibK9dreBuJribK5OBv2S3YJsllzSS2OSfmEspVib96GiaPNGNCWD9203nAia4rglj5yRciaPDSzCFmJw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o28KibK9dreBuJribK5OBv2S3YoBTfyd4vJ38iawwmKTX6iaatjSict8CDr13enFkta7icAick5VQiar2dHFsA/640?wx_fmt=png&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
