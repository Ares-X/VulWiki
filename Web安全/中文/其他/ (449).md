---
cve: "CVE-2023-22508"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Atlassian Confluence 远程代码执行漏洞 CVE-2023-22508   
深瞳漏洞实验室  深信服千里目安全技术中心   2023-07-20 20:42  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5yr8yVown4VOuLD5fk3sQy64ycY7huAGorAznCzNjLa12or3ibcXXzly3vkzofaaza10C3WlIcSOmA/640?wx_fmt=gif "")  
  
**漏洞名称：**  
  
Atlassian Confluence远程代码执行漏洞 CVE-2023-22508  
  
**组件名称：**  
  
Atlassian Confluence  
  
**影响范围：**  
  
7.19.8 <= Confluence Data Center & Server<8.2.0  
  
**漏洞类型：**  
  
远程代码执行  
  
**利用条件：**  
  
1、用户认证：需要用户认证  
  
2、前置条件：默认配置  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：未知  
  
<综合评定威胁等级>：高危，能造成远程代码执行。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5yr8yVown4VOuLD5fk3sQy6NSyVG0acvu378qyKOk8q8iaQK92GFyDwPCJSSCGGu909UuZuy17AWZg/640?wx_fmt=gif "")  
  
**组件介绍**  
  
Confluence是一个专业的企业知识管理与协同软件，能够帮助团队成员之间文档协作、共享信息等。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5yr8yVown4VOuLD5fk3sQy6NSyVG0acvu378qyKOk8q8iaQK92GFyDwPCJSSCGGu909UuZuy17AWZg/640?wx_fmt=gif "")  
  
**漏洞简介**  
  
2023年7月19日，深信服安全团队监测到一则Atlassian Confluence组件存在远程代码执行漏洞的信息，漏洞编号：CVE-2023-22508，漏洞威胁等级：高危。  
  
Confluence Data Center & Server存在远程代码执行漏洞(CVE-2023-22508)。**攻击者可利用该漏洞在获得该软件权限的情况下，构造恶意数据发起远程代码执行攻击，最终可造成服务器敏感性信息泄露，对机密性、完整性、可用性造成恶劣影响。**  
  
  
**影响范围**  
  
7.19.8 <=Confluence Data Center & Server<8.2.0  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5yr8yVown4VOuLD5fk3sQy6NSyVG0acvu378qyKOk8q8iaQK92GFyDwPCJSSCGGu909UuZuy17AWZg/640?wx_fmt=gif "")  
  
**官方修复建议**  
  
  
官方建议用户升级到最新版本。如果无法升级到最新版本，请升级到此修复版本：8.2.0。可以从下载中心下载最新版本的 Data Center & Server 。  
  
链接：https://www.atlassian.com/software/confluence/download-archives  
  
  
**参考链接**  
  
  
https://jira.atlassian.com/browse/CONFSERVER-88221  
  
  
**时间轴**  
  
  
  
**2023/7/20**  
  
深信服监测到Atlassian Confluence远程代码执行漏洞(CVE-2023-22508)相关信息。  
  
  
**2023/7/20**  
  
深信服千里目安全技术中心发布漏洞通告。  
  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5yr8yVown4VOuLD5fk3sQy6AXJKYwhztBNSnj6SLD1A3icHCicIugO3RWCrDjfsdic0TqvsQRMdWCwTw/640?wx_fmt=png "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5yr8yVown4VOuLD5fk3sQy6z3ibYpfvibRFO9JEoTF16cMFKU6eib5w8QfyDX5aibgKwm6vnj8xBLsDlA/640?wx_fmt=jpeg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
