---
cve: "CVE-2024-38346"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Apache CloudStack未授权远程代码执行漏洞(CVE-2024-38346)   
深瞳漏洞实验室  深信服千里目安全技术中心   2024-07-09 17:49  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5xzWBOWUibXW7ibUicRWjFwJ5Qbsq8rXxMY7KQe0GP18jfksAxySic1KctDpHuwngVOjrlNYPozpukhWQ/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞名称：**  
  
Apache CloudStack未授权远程代码执行漏洞(CVE-2024-38346)  
  
**组件名称：**  
  
APACHE-CloudStack  
  
**影响范围：**  
  
4.0.0 ≤ Apache CloudStack ≤ 4.18.2.0  
  
4.19.0.0 ≤ Apache CloudStack ≤ 4.19.0.1  
  
**漏洞类型：**  
  
代码注入  
  
**利用条件：**  
  
1、用户认证：不需要用户认证  
  
2、前置条件：默认配置  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：容易，能造成远程代码执行。  
  
<综合评定威胁等级>：严重，能造成远程代码执行。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5xzWBOWUibXW7ibUicRWjFwJ5Q8c9wD7WXQ40SC3tvgdGALGmclQic1nl7WlbVia4wpuzficDdN1gKRrs6w/640?wx_fmt=gif&from=appmsg "")  
  
**组件介绍**  
  
APACHE-CloudStack是一个开源的云计算平台，它提供了一套完整的解决方案，用于构建和管理基础设施即服务（IaaS）云环境。CloudStack允许用户通过虚拟化技术来创建和管理大规模的云基础设施，包括虚拟机、存储资源和网络资源等。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5xzWBOWUibXW7ibUicRWjFwJ5Q8c9wD7WXQ40SC3tvgdGALGmclQic1nl7WlbVia4wpuzficDdN1gKRrs6w/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞简介**  
  
2024年7月9日，深瞳漏洞实验室监测到一则APACHE-CloudStack组件存在代码注入漏洞的信息，漏洞编号：CVE-2024-38346，漏洞威胁等级：严重。  
  
攻击者可以通过未经身份验证的端口（默认 9090）访问集群服务，并**利用此漏洞在 CloudStack 管理的主机上执行远程代码，导致服务器失陷。**  
  
  
**影响范围**  
  
目前受影响的APACHE-CloudStack版本：  
  
4.0.0 ≤ Apache CloudStack ≤ 4.18.2.0  
  
4.19.0.0 ≤ Apache CloudStack ≤ 4.19.0.1  
  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5xzWBOWUibXW7ibUicRWjFwJ5Q8c9wD7WXQ40SC3tvgdGALGmclQic1nl7WlbVia4wpuzficDdN1gKRrs6w/640?wx_fmt=gif&from=appmsg "")  
  
**官方修复建议**  
  
  
官方已发布最新版本修复该漏洞，请受影响客户升级到最新版本。  
  
**下载链接：**  
  
https://cloudstack.apache.org/downloads。  
  
**4.18.2.1 和 4.19.0.2 发布说明：**  
  
https://docs.cloudstack.apache.org/en/4.18.2.1/releasenotes/about.html  
  
https://docs.cloudstack.apache.org/en/4.19.0.2/releasenotes/about.html  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5xzWBOWUibXW7ibUicRWjFwJ5Q8c9wD7WXQ40SC3tvgdGALGmclQic1nl7WlbVia4wpuzficDdN1gKRrs6w/640?wx_fmt=gif&from=appmsg "")  
  
**深信服解决方案**  
  
****  
**风险资产发现**  
  
支持对APACHE-CloudStack的主动检测，可**批量检出**业务场景中该事件的**受影响资产**情况，相关产品如下：  
  
**【深信服云镜YJ】**已发布资产检测方案。  
  
  
  
**参考链接**  
  
  
https://lists.apache.org/thread/6l51r00csrct61plkyd3qg3fj99215d1  
  
  
**时间轴**  
  
  
  
**2024/7/9**  
  
深瞳漏洞实验室监测到Apache CloudStack未授权远程代码执行漏洞信息。  
  
  
**2024/7/9**  
  
深瞳漏洞实验室发布漏洞通告。  
  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5xzWBOWUibXW7ibUicRWjFwJ5QXEiaa8MxHZnswia3dGCeCgNDkulSwm2NaR3DscepWFujfibh9U7xPF3RA/640?wx_fmt=png&from=appmsg "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5zvcIHbwGGYKbqDVYsVKzNNia1jYtHf49C7133AlDXAgex2W4lFvpia56tjQQDkiauNBrl08YbxqG01A/640?wx_fmt=jpeg&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
