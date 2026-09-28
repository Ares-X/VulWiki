---
cve: "CVE-2024-47908"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Ivanti CSA远程命令执行漏洞(CVE-2024-47908)   
深瞳漏洞实验室  深信服千里目安全技术中心   2025-02-12 09:46  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zLZ5FfjZh8edmIIRJhuudiahg9nDUmPyNoNlpibwJDWBKOSc8ibHhuDicAynQ7JwUZ6KWYpQkEK1TRLw/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞名称：**  
  
Ivanti CSA远程命令执行漏洞(CVE-2024-47908)  
  
**组件名称：**  
  
Ivanti Cloud Services Application (CSA)  
  
  
**影响范围：**  
  
Ivanti CSA ≤ 5.0.4  
  
**漏洞类型：**  
  
命令执行  
  
**利用条件：**  
  
1、用户认证：需要用户认证  
  
2、前置条件：默认配置  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：困难，需要管理员权限。  
  
<综合评定威胁等级>：严重，能造成远程命令执行。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zLZ5FfjZh8edmIIRJhuudiayrurlhFqo80mtkRsAjnqbOhlCIbBMpJuNLce57MK4z2m2BnmM61mtg/640?wx_fmt=gif&from=appmsg "")  
  
**组件介绍**  
  
Ivanti Cloud Services Application (CSA)‌是一款本地部署的虚拟设备，旨在简化和增强Ivanti产品与云服务的集成。它主要用于支持IT服务管理和云服务的自动化，帮助企业简化和自动化IT流程，提高运营效率‌。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zLZ5FfjZh8edmIIRJhuudiayrurlhFqo80mtkRsAjnqbOhlCIbBMpJuNLce57MK4z2m2BnmM61mtg/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞简介**  
  
2025年2月12日，深瞳漏洞实验室监测到一则Ivanti Cloud Services Application (CSA)组件存在命令执行漏洞的信息，漏洞编号：CVE-2024-47908，漏洞威胁等级：严重。  
  
在5.0.5之前的Ivanti CSA管理员控制台界面存在一个远程命令执行漏洞，具有管理员权限的**攻击者可以利用该漏洞执行任意命令导致服务器失陷。**  
  
  
  
  
**影响范围**  
  
目前受影响的Ivanti Cloud Services Application (CSA)版本：  
  
Ivanti CSA ≤ 5.0.4  
  
  
  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zLZ5FfjZh8edmIIRJhuudiayrurlhFqo80mtkRsAjnqbOhlCIbBMpJuNLce57MK4z2m2BnmM61mtg/640?wx_fmt=gif&from=appmsg "")  
  
**官方修复建议**  
  
  
官方已发布最新版本修复该漏洞，建议受影响客户将Ivanti CSA更新到5.0.5版本。下载链接：https://forums.ivanti.com/s/article/CSA-5-0-Download  
  
  
  
**参考链接**  
  
  
https://forums.ivanti.com/s/article/Security-Advisory-Ivanti-Cloud-Services-Application-CSA-CVE-2024-47908-CVE-2024-11771  
  
  
  
  
**时间轴**  
  
  
  
**2025/02/12**  
  
深瞳漏洞实验室监测到Ivanti CSA远程命令执行漏洞信息。  
  
  
**2025/02/12**  
  
深瞳漏洞实验室发布漏洞通告。  
  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5zKe67Ngz7xibibVVjFTxsdxmM2SstX83226p1ibn9QSDlEyDLjP2rz1JMg3DB5RRU1e3aicWRf6dvYJw/640?wx_fmt=png&from=appmsg "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5zLZ5FfjZh8edmIIRJhuudiadhRV5mEFL6xvaXwcJzxf8NodDUQZKnH7bvz30DeoA0LwyRFhhXClMg/640?wx_fmt=png&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
