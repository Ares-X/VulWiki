---
cve: "CVE-2024-21677"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Atlassian-Confluence路径遍历漏洞CVE-2024-21677   
深瞳漏洞实验室  深信服千里目安全技术中心   2024-03-20 18:03  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zEibc95Xllq8rFQ5GbCRSvbJH1ibakgkq8miaHx6lC5vrxDr7gPIVyuIeFLGea8U1mF6MTZljYVySicw/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞名称：**  
  
Atlassian-Confluence路径遍历漏洞(CVE-2024-21677)  
**组件名称：**  
  
Confluence Data Center 与 Confluence Server  
  
**影响范围：**  
  
Confluence Data Center = 8.8.0  
  
8.7.0 ≤ Confluence Data Center ≤ 8.7.2  
  
8.6.0 ≤ Confluence Data Center ≤ 8.6.2  
  
8.5.0 ≤ Confluence Data Center ≤ 8.5.6 (LTS)  
  
8.4.0 ≤ Confluence Data Center ≤ 8.4.5  
  
8.3.0 ≤ Confluence Data Center ≤ 8.3.4  
  
8.2.0 ≤ Confluence Data Center ≤ 8.2.3  
  
8.1.0 ≤ Confluence Data Center ≤ 8.1.4  
  
8.0.0 ≤ Confluence Data Center ≤ 8.0.4  
  
7.20.0 ≤ Confluence Data Center ≤ 7.20.3  
  
7.19.0 (LTS) ≤ Confluence Data Center ≤ 7.19.19 (LTS)  
  
7.18.0 ≤ Confluence Data Center ≤ 7.18.3  
  
7.17.0 ≤ Confluence Data Center ≤ 7.17.5  
  
Confluence Data Center ≤ 7.17.0  
  
8.7.0 ≤ Confluence Server ≤ 8.7.2  
  
8.6.0 ≤ Confluence Server ≤ 8.6.2  
  
8.5.0 ≤ Confluence Server ≤ 8.5.6 (LTS)  
  
8.4.0 ≤ Confluence Server ≤ 8.4.5  
  
8.3.0 ≤ Confluence Server ≤ 8.3.4  
  
8.2.0 ≤ Confluence Server ≤ 8.2.3  
  
8.1.0 ≤ Confluence Server ≤ 8.1.4  
  
8.0.0 ≤ Confluence Server ≤ 8.0.4  
  
7.20.0 ≤ Confluence Server ≤ 7.20.3  
  
7.19.0 (LTS) ≤ Confluence Server ≤ 7.19.19 (LTS)  
  
7.18.0 ≤ Confluence Server ≤ 7.18.3  
  
7.17.0 ≤ Confluence Server ≤ 7.17.5  
  
Confluence Server ≤ 7.17.0  
  
**漏洞类型：**  
  
目录遍历  
  
**利用条件：**  
  
1、用户认证：无需用户认证  
  
2、前置条件：默认配置  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：简单，无需授权。  
  
<综合评定威胁等级>：严重，能获取服务器权限。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zEibc95Xllq8rFQ5GbCRSvbFWK9rSJa8iaObRtVXPFKiap3AYDynvrFe2hFCS1wBiariaE14WQJjPMrUQ/640?wx_fmt=gif&from=appmsg "")  
  
**组件介绍**  
  
Confluence是一个专业的企业知识管理与协同软件，也可以用于构建企业wiki。使用简单，但它强大的编辑和站点管理特征能够帮助团队成员之间共享信息、文档协作、集体讨论，信息推送。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zEibc95Xllq8rFQ5GbCRSvbFWK9rSJa8iaObRtVXPFKiap3AYDynvrFe2hFCS1wBiariaE14WQJjPMrUQ/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞简介**  
  
2024年3月20日，深瞳漏洞实验室监测到一则Atlassian-Confluence存在路径遍历漏洞的信息，漏洞编号：CVE-2024-21677，漏洞威胁等级：高危。  
  
Atlassian-Confluence存在严重的路径遍历漏洞。**未经身份确认的攻击者可以利用该漏洞对Confluence服务器机密性，完整性和可用性造成严重影响。**  
  
  
  
**影响范围**  
  
目前受影响的Atlassian-Confluence版本：  
  
Confluence Data Center = 8.8.0  
  
8.7.0 ≤ Confluence Data Center ≤ 8.7.2  
  
8.6.0 ≤ Confluence Data Center ≤ 8.6.2  
  
8.5.0 ≤ Confluence Data Center ≤ 8.5.6 (LTS)  
  
8.4.0 ≤ Confluence Data Center ≤ 8.4.5  
  
8.3.0 ≤ Confluence Data Center ≤ 8.3.4  
  
8.2.0 ≤ Confluence Data Center ≤ 8.2.3  
  
8.1.0 ≤ Confluence Data Center ≤ 8.1.4  
  
8.0.0 ≤ Confluence Data Center ≤ 8.0.4  
  
7.20.0 ≤ Confluence Data Center ≤ 7.20.3  
  
7.19.0 (LTS) ≤ Confluence Data Center ≤ 7.19.19 (LTS)  
  
7.18.0 ≤ Confluence Data Center ≤ 7.18.3  
  
7.17.0 ≤ Confluence Data Center ≤ 7.17.5  
  
Confluence Data Center ≤ 7.17.0  
  
8.7.0 ≤ Confluence Server ≤ 8.7.2  
  
8.6.0 ≤ Confluence Server ≤ 8.6.2  
  
8.5.0 ≤ Confluence Server ≤ 8.5.6 (LTS)  
  
8.4.0 ≤ Confluence Server ≤ 8.4.5  
  
8.3.0 ≤ Confluence Server ≤ 8.3.4  
  
8.2.0 ≤ Confluence Server ≤ 8.2.3  
  
8.1.0 ≤ Confluence Server ≤ 8.1.4  
  
8.0.0 ≤ Confluence Server ≤ 8.0.4  
  
7.20.0 ≤ Confluence Server ≤ 7.20.3  
  
7.19.0 (LTS) ≤ Confluence Server ≤ 7.19.19 (LTS)  
  
7.18.0 ≤ Confluence Server ≤ 7.18.3  
  
7.17.0 ≤ Confluence Server ≤ 7.17.5  
  
Confluence Server ≤ 7.17.0  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zEibc95Xllq8rFQ5GbCRSvbFWK9rSJa8iaObRtVXPFKiap3AYDynvrFe2hFCS1wBiariaE14WQJjPMrUQ/640?wx_fmt=gif&from=appmsg "")  
  
**如何检测组件系统版本**  
  
  
1.通常在Confluence 服务器Web界面的底端都显示了当前版本信息。  
  
2.在 Confluence 的管理界面中，依次点击左侧菜单中的“设置”（Settings），然后在“系统”（System）下点击“系统信息”（System Information）中查看版本。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zEibc95Xllq8rFQ5GbCRSvbFWK9rSJa8iaObRtVXPFKiap3AYDynvrFe2hFCS1wBiariaE14WQJjPMrUQ/640?wx_fmt=gif&from=appmsg "")  
  
**官方修复建议**  
  
  
Atlassian 建议Confluence Data Center 与 Confluence Server升级到最新版本，如果无法升级，请将实例升级到指定支持的固定版本之一。  
  
请参阅发布说明：  
  
https://confluence.atlassian.com/doc/confluence-release-notes-327.html。  
  
您可以从下载中心下载最新版本的 Confluence Data Center 和 Server  
  
https://www.atlassian.com/software/confluence/download-archives。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zEibc95Xllq8rFQ5GbCRSvbFWK9rSJa8iaObRtVXPFKiap3AYDynvrFe2hFCS1wBiariaE14WQJjPMrUQ/640?wx_fmt=gif&from=appmsg "")  
  
**深信服解决方案**  
  
  
**1.风险资产发现**  
  
支持对Atlassian-Confluence的主动检测，可**批量检出**业务场景中该事件的**受影响资产**情况，相关产品如下：  
  
**【深信服云镜YJ】**已发布资产检测方案。  
  
**【深信服漏洞评估工具TSS】**已发布资产检测方案。  
  
  
**2.漏洞主动扫描**  
  
支持对Atlassian-Confluence路径遍历漏洞(CVE-2024-21677)的主动扫描，可**批量快速检出**业务场景中是否存在**漏洞风险**，相关产品如下：  
  
**【深信服云镜YJ】**预计2024年3月21日发布扫描方案。  
  
**【深信服漏洞评估工具TSS】**预计2024年3月21日发布扫描方案。  
  
**【深信服安全托管服务MSS】**预计2024年3月21日发布扫描方案（需要具备**TSS**组件能力）。  
  
**【深信服安全检测与响应平台XDR】**预计2024年3月21日发布扫描方案（需要具备**云镜**组件能力）。  
  
  
   
  
  
**参考链接**  
  
  
https://confluence.atlassian.com/pages/viewpage.action?pageId=1369444862  
  
  
  
**时间轴**  
  
  
  
**2024/3/20**  
  
深瞳漏洞实验室监测到Atlassian-Confluence路径遍历漏洞(CVE-2024-21677)攻击信息。  
  
  
**2024/3/20**  
  
深瞳漏洞实验室发布漏洞通告。  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5zEibc95Xllq8rFQ5GbCRSvbM59LjibwLp6iaKqmHGOzQicmrNUy9j7dUGSgUVCnIcNRI0iciaOjApteJ8w/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5zEibc95Xllq8rFQ5GbCRSvbARibodXagVNTu83BLs8aQdE9mEsg1avaott1icJiaaET6DWGRNz1icJhOg/640?wx_fmt=jpeg&from=appmsg "")  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
