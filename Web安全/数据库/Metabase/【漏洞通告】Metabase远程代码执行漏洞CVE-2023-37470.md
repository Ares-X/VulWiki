---
cve: "CVE-2023-37470"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Metabase远程代码执行漏洞（CVE-2023-37470）   
深瞳漏洞实验室  深信服千里目安全技术中心   2023-08-04 15:16  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zcQCsAhMBlxe6LZ2MQ2YS1165nHu1MtUJlXF6YwC0W1LXpsqo7Z0k8ZS12B8mgx9zYSoE9AKFnaw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1 "")  
  
**漏洞名称：**  
  
Metabase远程代码执行漏洞（CVE-2023-37470）  
  
**组件名称：**  
  
Metabase  
  
**影响范围：**  
  
Metabase Open Source < 0.46.6.4  
  
Metabase Open Source < 0.45.4.3  
  
Metabase Open Source < 0.44.7.3  
  
Metabase Open Source < 0.43.7.3  
  
Metabase Enterprise < 1.46.6.4  
  
Metabase Enterprise < 1.45.4.3  
  
Metabase Enterprise < 1.44.7.3  
  
Metabase Enterprise < 1.43.7.3****  
  
**漏洞类型：**  
  
代码注入  
  
**利用条件：**  
  
1、用户认证：不需要用户认证  
  
2、前置条件：默认配置  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：未知  
  
<综合评定威胁等级>：严重，能造成远程代码注入。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zcQCsAhMBlxe6LZ2MQ2YS19tUzACsV34MSPpRAOGMApWIJPZiaPibMLmdpNnf1sNiaD2fofM0icoW52g/640?wx_fmt=gif&wxfrom=5&wx_lazy=1 "")  
  
**组件介绍**  
  
Metabase 是一个开源商业智能平台。您可以使用 Metabase 来询问有关您的数据的问题，或将 Metabase 嵌入您的应用程序中，让您的客户自行探索他们的数据。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zcQCsAhMBlxe6LZ2MQ2YS19tUzACsV34MSPpRAOGMApWIJPZiaPibMLmdpNnf1sNiaD2fofM0icoW52g/640?wx_fmt=gif&wxfrom=5&wx_lazy=1 "")  
  
**漏洞简介**  
  
2023年8月4日，深信服安全团队监测到一则Metabase组件存在远程代码执行漏洞的信息，漏洞编号：CVE-2023-37470，漏洞威胁等级：严重。  
  
该漏洞是由于Metabase组件对于CVE-2023-38646漏洞未完全修复，攻击者可通过H2连接字符串注入命令，最终可利用该漏洞执行任意命令。  
  
  
**影响范围**  
  
Metabase Open Source < 0.46.6.4  
  
Metabase Open Source < 0.45.4.3  
  
Metabase Open Source < 0.44.7.3  
  
Metabase Open Source < 0.43.7.3  
  
Metabase Enterprise < 1.46.6.4  
  
Metabase Enterprise < 1.45.4.3  
  
Metabase Enterprise < 1.44.7.3  
  
Metabase Enterprise < 1.43.7.3  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zcQCsAhMBlxe6LZ2MQ2YS19tUzACsV34MSPpRAOGMApWIJPZiaPibMLmdpNnf1sNiaD2fofM0icoW52g/640?wx_fmt=gif&wxfrom=5&wx_lazy=1 "")  
  
**官方修复建议**  
  
  
当前官方已发布最新版本，建议受影响的用户及时更新升级到最新版本。链接如下：  
ht  
tps://github.com/metabase/metabase/releases  
  
  
**参考链接**  
  
  
https://github.com/metabase/metabase/security/advisories/GHSA-p7w3-9m58-rq83  
  
  
**时间轴**  
  
  
  
**2023/8/4**  
  
深信服监测到Metabase官方发布安全补丁。  
  
  
**2023/8/4**  
  
深信服千里目安全技术中心发布漏洞通告。  
  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5yHb6ia4zcwrWRmyUWhZmLO2FRymQETUagJ7SGZpgCViagHm2RWkFoJLQicUXh3GesVJYQqJz0vc720g/640?wx_fmt=png "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5zcQCsAhMBlxe6LZ2MQ2YS1bXETa6Rkm3RNOtJafWWBSrRfCSd49ljmn7uw1XHhu8ZoJwLicDvXwrg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
