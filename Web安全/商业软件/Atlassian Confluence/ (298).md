---
cve: "CVE-2023-22518"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Atlassian Confluence远程代码执行漏洞（CVE-2023-22518）   
深瞳漏洞实验室  深信服千里目安全技术中心   2023-10-31 21:18  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5yqStGtibm9UAsGlGO0mpUTjIfLicoGnDWxiatYv1Jqn7elGguq88Tu0FNsM4qDZ6PQRuy0nmYA8dzOw/640?wx_fmt=gif "")  
  
**漏洞名称：**  
  
Atlassian Confluence远程代码执行漏洞(CVE-2023-22518)  
  
**组件名称：**  
  
Atlassian Confluence  
  
**影响范围：**  
  
Atlassian Confluence < 7.19.16  
  
8.3.0 ≤ Atlassian Confluence < 8.3.4  
  
8.4.0 ≤ Atlassian Confluence < 8.4.4  
  
8.5.0 ≤ Atlassian Confluence < 8.5.3  
  
8.6.0 ≤ Atlassian Confluence < 8.6.1  
  
**漏洞类型：**  
  
远程代码执行  
  
**利用条件：**  
  
1、用户认证：否  
  
2、前置条件：默认配置  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：未知  
  
<综合评定威胁等级>：高危，能造成远程代码执行。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5yqStGtibm9UAsGlGO0mpUTjibL4n6mus9GiagEYibX2a6vIH8eicBuXGia965azJGLfxHDMxdDAL4ibATFw/640?wx_fmt=gif "")  
  
**组件介绍**  
  
Atlassian Confluence是一款企业知识管理和协作工具，它提供了许多组件来帮助用户创建、组织和共享信息，促进团队协作和知识管理。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5yqStGtibm9UAsGlGO0mpUTjibL4n6mus9GiagEYibX2a6vIH8eicBuXGia965azJGLfxHDMxdDAL4ibATFw/640?wx_fmt=gif "")  
  
**漏洞简介**  
  
2023年10月31日，深信服安全团队监测到一则Atlassian Confluence组件存在认证绕过漏洞的信息，漏洞编号：CVE-2023-22518，漏洞威胁等级：高危。  
  
该漏洞是由于子组件Struts2继承关系处理不当，**攻击者可利用该漏洞在未授权/的情况下，构造恶意数据执行认证绕过攻击，最终获取服务器最高权限，也可导致服务器数据非法删除。**  
  
  
**影响范围**  
  
目前受影响的Atlassian Confluence版本：  
  
Atlassian Confluence < 7.19.16  
  
8.3.0 ≤ Atlassian Confluence < 8.3.4  
  
8.4.0 ≤ Atlassian Confluence < 8.4.4  
  
8.5.0 ≤ Atlassian Confluence < 8.5.3  
  
8.6.0 ≤ Atlassian Confluence < 8.6.1  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5yqStGtibm9UAsGlGO0mpUTjibL4n6mus9GiagEYibX2a6vIH8eicBuXGia965azJGLfxHDMxdDAL4ibATFw/640?wx_fmt=gif "")  
  
**如何检测组件版本**  
  
  
访问Atlassian Confluence网页上方问号按钮，单击“关于Confluence”即可查询当前Atlassian Confluence版本信息。  
  
2.官方修复建议  
  
当前官方已发布最新版本，建议受影响的用户及时更新升级到最新版本。链接如下：  
  
https://confluence.atlassian.com/security/cve-2023-22518-improper-authorization-vulnerability-in-confluence-data-center-and-server-1311473907.html  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5yqStGtibm9UAsGlGO0mpUTjibL4n6mus9GiagEYibX2a6vIH8eicBuXGia965azJGLfxHDMxdDAL4ibATFw/640?wx_fmt=gif "")  
  
**深信服解决方案**  
  
  
**1.风险资产发现**  
  
支持对Atlassian Confluence的主动检测，可**批量检出**业务场景中该事件的**受影响资产**情况，相关产品如下：  
  
**【深信服主机安全检测响应平台CWPP】**已发布资产检测方案。  
  
**【深信服云镜YJ】**已发布资产检测方案。  
  
  
**2.漏洞主动扫描**  
  
支持对Atlassian Confluence远程代码执行漏洞(CVE-2023-22518)的主动扫描，可**批量快速检出**业务场景中是否存在**漏洞风险**，相关产品如下：  
  
**【深信服云镜YJ】**预计2023年11月5日发布扫描方案。  
  
**【深信服漏洞评估工具TSS】**预计2023年11月2日发布扫描方案。  
  
**【深信服安全托管服务MSS】**预计2023年11月2日发布扫描方案，（需要具备**TSS**组件能力）。  
  
**【深信服安全检测与响应平台XDR】**预计2023年11月5日发布扫描方案（需要具备**云镜**组件能力）。  
  
  
**参考链接**  
  
  
https://confluence.atlassian.com/security/cve-2023-22518-improper-authorization-vulnerability-in-confluence-data-center-and-server-1311473907.html  
  
  
**时间轴**  
  
  
  
**2023/10/31**  
  
深信服监测到Atlassian Confluence远程代码执行漏洞(CVE-2023-22518)攻击信息。  
  
  
**2023/10/31**  
  
深信服千里目安全技术中心发布漏洞通告。  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5yqStGtibm9UAsGlGO0mpUTjQlsPFGA3icHAwhBsu6ic0k4Vpg0oic3Z3JcWqzdx0rA3ZtRefMAOCPqCg/640?wx_fmt=png "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5yqStGtibm9UAsGlGO0mpUTjtRkEbp7yGVm5d6DRnDOT60ZjuXLKTbcXWxu5lzKAdwUaX7Ma5Xf9icA/640?wx_fmt=jpeg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
