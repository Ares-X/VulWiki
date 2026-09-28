---
cve: "CVE-2023-36542"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Apache NiFi 代码注入漏洞(CVE-2023-36542)   
深瞳漏洞实验室  深信服千里目安全技术中心   2023-08-02 16:57  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5wlst6qofHqY7eziacCL2U6rsadUibWHmsxZftLYvTg2nww3AZgJZKsUEpMib6g0Gm911dVSMticu79NQ/640?wx_fmt=gif "")  
  
**漏洞名称：**  
  
Apache NiFi 代码注入漏洞(CVE-2023-36542)  
  
**组件名称：**  
  
Apache NiFi  
  
**影响范围：**  
  
0.0.2 ≤ Apache NiFi < 1.23.0  
  
**漏洞类型：**  
  
代码注入  
  
**利用条件：**  
  
1、用户认证：需要用户认证  
  
2、前置条件：默认配置  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：未知。  
  
<综合评定威胁等级>：中危，能造成代码注入  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5wlst6qofHqY7eziacCL2U6r5deuEogEa3t1dia5SmeO9ia5tuL63DibM1CBLvsOOib7SstdRJeGxPkNBw/640?wx_fmt=gif "")  
  
**组件介绍**  
  
Apache NiFi是一个开源的数据流处理工具，用于可靠地收集、聚合、转换和路由大规模数据流。它提供了一个可视化的用户界面，使用户能够以图形化方式设计和管理数据流。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5wlst6qofHqY7eziacCL2U6r5deuEogEa3t1dia5SmeO9ia5tuL63DibM1CBLvsOOib7SstdRJeGxPkNBw/640?wx_fmt=gif "")  
  
**漏洞简介**  
  
2023年8月2日，深信服安全团队监测到一则Apache NiFi组件存在代码注入漏洞的信息，漏洞编号：CVE-2023-36542，漏洞威胁等级：中危。  
  
该漏洞是由于Apache NiFi 0.0.2至1.22.0版本中包含支持HTTP URL引用以索引驱动程序的处理器和控制器，这**允许经过身份认证的用户通过此功能注入恶意代码，最终可利用该漏洞执行任意命令。**  
  
  
**影响范围**  
  
目前受影响的Apache NiFi版本：  
  
0.0.2 ≤ Apache NiFi < 1.23.0  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5wlst6qofHqY7eziacCL2U6r5deuEogEa3t1dia5SmeO9ia5tuL63DibM1CBLvsOOib7SstdRJeGxPkNBw/640?wx_fmt=gif "")  
  
**官方修复建议**  
  
  
当前官方已发布最新版本，建议受影响的用户及时更新升级到最新版本。链接如下：  
  
https://nifi.apache.org/download.html  
  
  
**参考链接**  
  
  
https://nifi.apache.org/security.html#CVE-2023-36542  
  
  
**时间轴**  
  
  
  
**2023/8/2**  
  
深信服监测到Apache NiFi官方发布安全通告。  
  
  
**2023/8/2**  
  
深信服千里目安全技术中心发布漏洞通告。  
  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5wlst6qofHqY7eziacCL2U6rBYke3zj6U3Npe7ZJ65KbPTqhx4oPwdSoJsqu6H1iazcozZPnXGHiba6g/640?wx_fmt=png "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5wlst6qofHqY7eziacCL2U6r7icreA8EjBoSOUTOk4sV43qjI5LpuFfIv6PEbAz7MOzyexB2Df92AxA/640?wx_fmt=jpeg "")  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
