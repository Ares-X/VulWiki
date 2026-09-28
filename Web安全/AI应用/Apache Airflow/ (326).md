---
cve: "CVE-2023-40195"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Apache Airflow Spark Provider反序列化漏洞(CVE-2023-40195)   
深瞳漏洞实验室  深信服千里目安全技术中心   2023-09-01 18:06  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5y6O5tsX0aUBIBExpmsn6hkBDyb83pdyqBXbUByv9oBSrNdGG0DfxUhpnKxeSojrrFO922Fx9huog/640?wx_fmt=gif "")  
  
**漏洞名称：**  
  
Apache Airflow Spark Provider反序列化漏洞(CVE-2023-40195)  
  
**组件名称：**  
  
Apache Airflow  
  
**影响范围：**  
  
Apache-Airflow Spark Provider<4.1.3  
  
**漏洞类型：**  
  
反序列化  
  
**利用条件：**  
  
1、用户认证：不需要用户认证  
  
2、前置条件：默认配置3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：容易，无需授权即可远程代码执行。  
  
<综合评定威胁等级>：高危，能造成远程代码执行。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5y6O5tsX0aUBIBExpmsn6hkibiaz3yCOzbic8qSO8FLqPsFB5dqN0qA7SXG4hicInzDRB5icjnsc8DpArw/640?wx_fmt=gif "")  
  
**组件介绍**  
  
Apache Airflow是一个由社区创建的平台，用于以编程方式创作、安排和监控工作流程。Apache Airflow Spark Provider是项目中的一个插件，用于在Airflow中管理和调度Apache Spark作业。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5y6O5tsX0aUBIBExpmsn6hkibiaz3yCOzbic8qSO8FLqPsFB5dqN0qA7SXG4hicInzDRB5icjnsc8DpArw/640?wx_fmt=gif "")  
  
**漏洞简介**  
  
2023年9月01日，深信服安全团队监测到一则Apache Airflow组件存在反序列化漏洞的信息，漏洞编号：CVE-2023-40195，漏洞威胁等级：高危。  
  
  
攻击者可以在未授权的情况下，构造反序列化利用链在Apache Airflow服务器上执行恶意代码，导致服务器失陷。  
  
  
**影响范围**  
  
Apache-Airflow Spark Provider<4.1.3  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5y6O5tsX0aUBIBExpmsn6hkibiaz3yCOzbic8qSO8FLqPsFB5dqN0qA7SXG4hicInzDRB5icjnsc8DpArw/640?wx_fmt=gif "")  
  
**官方修复建议**  
  
  
将组件Apache-Airflow Spark Provider升级到4.1.3或更高版本。链接如下：https://lists.apache.org/thread/fzy95b1d6zv31j5wrx3znhzcscck2o24、https://github.com/apache/airflow/pull/33233。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5y6O5tsX0aUBIBExpmsn6hkibiaz3yCOzbic8qSO8FLqPsFB5dqN0qA7SXG4hicInzDRB5icjnsc8DpArw/640?wx_fmt=gif "")  
  
**临时修复建议**  
  
禁用或限制HTTP/HTTPS管理接口的访问。  
  
  
  
  
**参考链接**  
  
https://lists.apache.org/thread/fzy95b1d6zv31j5wrx3znhzcscck2o24  
  
https://github.com/apache/airflow/pull/33233  
  
  
**时间轴**  
  
  
  
**2023/9/1**  
  
深信服监测到漏洞信息。  
  
  
**2023/9/1**  
  
深信服千里目安全技术中心发布漏洞通告。  
  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5y6O5tsX0aUBIBExpmsn6hkicIv5uKCAReZytSfy5p2WfSIWm5UHb2H5ulPIECR530EG25Mn7lHscQ/640?wx_fmt=png "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5y6O5tsX0aUBIBExpmsn6hkiblMPCdUjsUKAic0frfYic5SqTS78LceX1HV1eWbZVhc19DoKc0Nv1vvg/640?wx_fmt=jpeg "")  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
