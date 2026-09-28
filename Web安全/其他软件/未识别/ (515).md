---
cve: "CVE-2024-50330"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Ivanti Endpoint Manager SQL注入漏洞(CVE-2024-50330)   
深瞳漏洞实验室  深信服千里目安全技术中心   2024-11-14 16:52  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zLZ5FfjZh8edmIIRJhuudiahg9nDUmPyNoNlpibwJDWBKOSc8ibHhuDicAynQ7JwUZ6KWYpQkEK1TRLw/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞名称：**  
  
Ivanti Endpoint Manager SQL注入漏洞(CVE-2024-50330)  
  
**组件名称：**  
  
Ivanti Endpoint Manager  
  
**影响范围：**  
  
Ivanti Endpoint Manager (EPM) 2024 < 2024 September security updateIvanti Endpoint Manager (EPM) 2022 < 2022 SU6 September security update  
  
**漏洞类型：**  
  
SQL注入  
  
**利用条件：**  
  
1、用户认证：不需要用户认证  
  
2、前置条件：默认配置  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：容易，无需授权即可造成远程代码执行。  
  
<综合评定威胁等级>：严重，能造成远程代码执行。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zLZ5FfjZh8edmIIRJhuudiayrurlhFqo80mtkRsAjnqbOhlCIbBMpJuNLce57MK4z2m2BnmM61mtg/640?wx_fmt=gif&from=appmsg "")  
  
**组件介绍**  
  
Ivanti Endpoint Manager（以前称为LANDesk Management Suite）是一款由Ivanti公司开发的综合性终端管理解决方案。它主要用于帮助企业管理和保护其网络中的各种终端设备，包括桌面电脑、笔记本电脑、移动设备和服务器。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zLZ5FfjZh8edmIIRJhuudiayrurlhFqo80mtkRsAjnqbOhlCIbBMpJuNLce57MK4z2m2BnmM61mtg/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞简介**  
  
2024年11月14日，深瞳漏洞实验室监测到一则Ivanti-Endpoint-Manager组件存在SQL注入漏洞的信息，漏洞编号：CVE-2024-50330，漏洞威胁等级：严重。  
  
Ivanti Endpoint Manager代理门户存在一个SQL注入漏洞，未经授权的**攻击者可以利用该漏洞执行恶意sql语句，执行任意代码，导致服务器失陷。**  
  
****  
****  
  
  
**影响范围**  
  
目前受影响的Ivanti-Endpoint-Manager版本：  
  
Ivanti Endpoint Manager (EPM) 2024 < 2024 September security updateIvanti Endpoint Manager (EPM) 2022 < 2022 SU6 September security update  
  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zLZ5FfjZh8edmIIRJhuudiayrurlhFqo80mtkRsAjnqbOhlCIbBMpJuNLce57MK4z2m2BnmM61mtg/640?wx_fmt=gif&from=appmsg "")  
  
**官方修复建议**  
  
  
官方已发布最新版本修复该漏洞，建议受影响用户将Ivanti Endpoint Manager更新到以下版本：2024 November Security Update2022 SU6 November Security Update下载链接：https://download.ivanti.com/downloads/Patch/component/EPM2024/Security/Flat/EPM_2024_Flat_November_2024_Patch.zip  
  
https://download.ivanti.com/downloads/Patch/component/EPM2022/Security/SU6/EPM_2022_SU6_November_2024_Patch.zip  
  
  
  
  
**参考链接**  
  
  
  
https://forums.ivanti.com/s/article/Security-Advisory-EPM-November-2024-for-EPM-2024-and-EPM-2022  
  
  
  
  
**时间轴**  
  
  
  
**2024/11/14**  
  
深瞳漏洞实验室监测到Ivanti Endpoint Manager SQL注入漏洞信息。  
  
  
**2024/11/14**  
  
深瞳漏洞实验室发布漏洞通告。  
  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5xZZxJ6qjYjPVIHtyfceHqwF6mYybPaQ5yVX0oewcRiaOQzlgH6jOOibGlM5uyBMu5CKQtr7El4HsJA/640?wx_fmt=png&from=appmsg "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5zLZ5FfjZh8edmIIRJhuudiadhRV5mEFL6xvaXwcJzxf8NodDUQZKnH7bvz30DeoA0LwyRFhhXClMg/640?wx_fmt=png&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
