---
cve: "CVE-2023-6246"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Glibc syslog堆溢出漏洞CVE-2023-6246   
深瞳漏洞实验室  深信服千里目安全技术中心   2024-02-01 14:58  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5yFCJRZHG2RXMoSbWN09zo65mYKnRMtDc2zg5yiaesFOOWSmw8sDeBW7vxuIW3ibbl70fnfuhlibicIiaA/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞名称：**  
  
Glibc syslog堆溢出漏洞(CVE-2023-6246)  
  
**组件名称：**  
  
Glibc  
  
**影响范围：**  
  
Glibc=2.36  
  
Glibc=2.37  
  
**漏洞类型：**  
  
缓冲区溢出  
  
**利用条件：**  
  
1、用户认证：需要用户认证  
  
2、前置条件：默认配置  
  
3、触发方式：本地  
  
**综合评价：**  
  
<综合评定利用难度>：普通，需要低权限。  
  
<综合评定威胁等级>：高危，能造成权限提升。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5yFCJRZHG2RXMoSbWN09zo6GoPic0GTQJX6micwicdc2jPSssCIFM6D2ej3b9tszpRTlay4tSF9ib8KTw/640?wx_fmt=gif&from=appmsg "")  
  
**组件介绍**  
  
GNU C库（Glibc）项目为GNU系统和 GNU/Linux 系统以及许多其他使用 Linux 作为内核的系统提供核心库。这些库提供了关键的 API，如open、 read、write、malloc、printf、 getaddrinfo、dlopen、pthread_create、 crypt、login、exit等基础设施。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5yFCJRZHG2RXMoSbWN09zo6GoPic0GTQJX6micwicdc2jPSssCIFM6D2ej3b9tszpRTlay4tSF9ib8KTw/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞简介**  
  
2024年1月31日，深瞳漏洞实验室监测到一则Glibc组件存在堆溢出漏洞的信息，漏洞编号：CVE-2023-6246，漏洞威胁等级：高危。  
  
该漏洞是由于GNU C库的函数中存在堆缓冲区溢出，**攻击者可利用该漏洞在获得权限的情况下，构造恶意数据进行权限提升攻击，最终获取服务器最高权限。**  
  
  
**影响范围**  
  
目前受影响的Glibc版本：  
  
Glibc=2.36  
  
Glibc=2.37  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5yFCJRZHG2RXMoSbWN09zo6GoPic0GTQJX6micwicdc2jPSssCIFM6D2ej3b9tszpRTlay4tSF9ib8KTw/640?wx_fmt=gif&from=appmsg "")  
  
**官方修复建议**  
  
  
当前官方已发布最新版本，建议受影响的用户及时更新升级到最新版本。链接如下：  
  
https://sourceware.org/glibc/  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5yFCJRZHG2RXMoSbWN09zo6GoPic0GTQJX6micwicdc2jPSssCIFM6D2ej3b9tszpRTlay4tSF9ib8KTw/640?wx_fmt=gif&from=appmsg "")  
  
**深信服解决方案**  
  
  
**1.风险资产发现**  
  
支持对Glibc的主动检测，可**批量检出**业务场景中该事件的受影响资产情况，相关产品如下：  
  
**【****深信服主机安全检测响应平台CWPP****】**已发布资产检测方案。  
  
  
**参考链接**  
  
  
https://blog.qualys.com/vulnerabilities-threat-research/2024/01/30/qualys-tru-discovers-important-vulnerabilities-in-gnu-c-librarys-syslog  
  
  
**时间轴**  
  
  
  
**2024/1/31**  
  
深瞳漏洞实验室监测到Glibc syslog堆溢出漏洞(CVE-2023-6246)攻击信息。  
  
  
**2024/2/1**  
  
深瞳漏洞实验室发布漏洞通告。  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5yFCJRZHG2RXMoSbWN09zo65HaaoLOEXMKRrkem7b03ygdiaN97E57zR5biaOXZW9zLm8wPQSbBlpIA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5yFCJRZHG2RXMoSbWN09zo6JfxSKqy2zG7ia57xsJrqiaAP3h5IZ3INreGYG5eFT66tNycgz5eUaBKA/640?wx_fmt=jpeg&from=appmsg "")  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
