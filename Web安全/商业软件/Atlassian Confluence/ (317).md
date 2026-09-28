---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Atlassian Confluence Data Center and Server远程代码执行漏洞   
深瞳漏洞实验室  深信服千里目安全技术中心   2023-12-06 17:21  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5w9fwiaWZZCum6xqQfB15BMOgI6fYClPespQAF24uUJJDyEn4va6PCC6ffUZAialhH9XrEVj0enQibzA/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞名称：**  
  
Atlassian Confluence Data Center and Server远程代码执行漏洞（CVE-2023-22522）  
  
**组件名称：**  
  
Confluence Data Center  
  
Confluence Server  
  
**影响范围：**  
  
8.0.0 ≤ Atlassian Confluence < 8.4.5  
  
8.5.0 ≤ Atlassian Confluence < 8.5.4  
  
8.6.0 ≤ Atlassian Confluence < 8.6.2  
  
8.7.0 ≤ Atlassian Confluence < 8.7.1  
  
4.0.0 ≤ Atlassian Confluence < 7.19.17  
  
**漏洞类型：**  
  
远程代码执行  
  
**利用条件：**  
  
1、用户认证：否  
  
2、前置条件：默认配置  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：容易，无需授权即可远程代码执行。  
  
<综合评定威胁等级>：高危，能造成远程代码执行。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5w9fwiaWZZCum6xqQfB15BMOB1iarAlNBqhCYHStYRTDXxWjzMzUGwx8PoSTIJegj7ktXH2nIzMcEYw/640?wx_fmt=gif&from=appmsg "")  
  
**组件介绍**  
  
Atlassian Confluence是一种企业级的协作软件，用于创建、组织和共享团队的知识和信息，支持团队内部和跨团队之间的协作，可以帮助团队更好地组织和管理信息，提高工作效率。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5w9fwiaWZZCum6xqQfB15BMOB1iarAlNBqhCYHStYRTDXxWjzMzUGwx8PoSTIJegj7ktXH2nIzMcEYw/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞简介**  
  
2023年12月6日，深瞳漏洞实验室监测到一则Atlassian Confluence Data Center and Server组件存在远程代码执行漏洞的信息，漏洞编号：CVE-2023-22522，漏洞威胁等级：严重。  
  
该漏洞是由于Atlassian Confluence Data Center and Server对用户的输入过滤不严导致，**攻击者（包括具有匿名访问权限的攻击者）可利用该漏洞在未授权的情况下，构造恶意数据执行远程代码执行攻击，最终获取服务器权限，进而执行任意命令。**  
  
  
**影响范围**  
  
目前受影响的Atlassian Confluence Data Center and Server版本：  
  
8.0.0 ≤ Atlassian Confluence < 8.4.5  
  
8.5.0 ≤ Atlassian Confluence < 8.5.4  
  
8.6.0 ≤ Atlassian Confluence < 8.6.2  
  
8.7.0 ≤ Atlassian Confluence < 8.7.1  
  
4.0.0 ≤ Atlassian Confluence < 7.19.17  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5w9fwiaWZZCum6xqQfB15BMOB1iarAlNBqhCYHStYRTDXxWjzMzUGwx8PoSTIJegj7ktXH2nIzMcEYw/640?wx_fmt=gif&from=appmsg "")  
  
**官方修复建议**  
  
  
当前官方已发布最新版本，建议受影响的用户及时更新升级到最新版本。链接如下：  
  
https://confluence.atlassian.com/pages/viewpage.action?pageId=1319570362  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5w9fwiaWZZCum6xqQfB15BMOB1iarAlNBqhCYHStYRTDXxWjzMzUGwx8PoSTIJegj7ktXH2nIzMcEYw/640?wx_fmt=gif&from=appmsg "")  
  
**深信服解决方案**  
  
  
**1.风险资产发现**  
  
支持对Atlassian Confluence Data Center and Server组件的主动检测，可**批量检出**业务场景中该事件的受影响资产情况，相关产品如下：  
  
**【深信服主机安全检测响应平台CWPP】**已发布资产检测方案。  
  
**【深信服云镜YJ】**已发布资产检测方案。  
  
  
**2.漏洞主动扫描**  
  
支持对 Atlassian Confluence Data Center and Server远程代码执行漏洞（CVE-2023-22522）  
的主动扫描，可**批量快速检出**  
业务场景中是否存在**漏洞风险**  
，相关产品如下：  
  
**【深信服云镜YJ】**预计2023年12月10日发布扫描方案。  
  
**【深信服漏洞评估工具TSS】**预计2023年12月11日发布扫描方案。  
  
**【深信服安全托管服务MSS】**预计2023年12月11日发布扫描方案，（需要具备TSS或CWPP组件能力）。  
  
**【深信服安全检测与响应平台XDR】**预计2023年12月10日发布扫描方案，（需要具备云镜或CWPP组件能力）。  
  
  
**参考链接**  
  
  
https://confluence.atlassian.com/security/cve-2023-22522-rce-vulnerability-in-confluence-data-center-and-confluence-server-1319570362.html  
  
  
**时间轴**  
  
  
  
**2023/12/6**  
  
深瞳漏洞实验室监测到Atlassian官方发布安全公告。  
  
  
**2023/12/6**  
  
深瞳漏洞实验室发布漏洞通告。  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5w9fwiaWZZCum6xqQfB15BMOIe43hymUE6TEAYpxNPhnsQU8mIvbXAttNa1VUQEYZMRhMYAPQHEeXw/640?wx_fmt=png&from=appmsg "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5w9fwiaWZZCum6xqQfB15BMOODicpkS6XCeYNmNxDibicmykOgPBxjia4AgBsBiaHJ5WrkkuyCYc7zdfOlw/640?wx_fmt=jpeg&from=appmsg "")  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
