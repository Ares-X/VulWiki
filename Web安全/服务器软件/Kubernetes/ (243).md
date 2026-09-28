---
cve: "CVE-2023-32191"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Rancher Kubernetes Engine敏感信息泄露漏洞（CVE-2023-32191）   
深瞳漏洞实验室  深信服千里目安全技术中心   2024-06-20 16:41  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5wrwHAKPJAMKhsbibzRibI2l8fcF42ibyfu2AemKSLEOzFXgfC6B0EEicZtmuZXWVkiah0gJmRlojpXrjA/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞名称：**  
  
Rancher Kubernetes Engine敏感信息泄露漏洞  
  
（CVE-2023-32191）  
  
**组件名称：**  
  
Rancher-Kubernetes Engine  
  
**影响范围：**  
  
1.4.18 ≤ Rancher Kubernetes Engine < 1.4.19 1.5.9 ≤ Rancher Kubernetes Engine < 1.5.10 2.7.0 ≤ rancher < 2.7.14 2.8.0 ≤ rancher < 2.8.5  
  
**漏洞类型：**  
  
信息泄露  
  
**利用条件：**  
  
1、用户认证：低权限用户  
  
2、前置条件：默认配置  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：容易，能够获取敏感信息。  
  
<综合评定威胁等级>：高危，能导致敏感信息泄露。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5wrwHAKPJAMKhsbibzRibI2l80wvwfbkbkria1opxnSR4uZSw3YyI2Y9Q0RiaiaBEBo51iaFqEHw0Gbk7Jg/640?wx_fmt=gif&from=appmsg "")  
  
**组件介绍**  
  
Rancher Kubernetes Engine (RKE) 是一个用于部署和管理 Kubernetes 集群的工具。Kubernetes 是一个开源的容器编排平台，用于自动化容器的部署、扩展和管理。RKE 可以帮助用户快速搭建和管理 Kubernetes 集群，使其能够运行容器化的应用程序。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5wrwHAKPJAMKhsbibzRibI2l80wvwfbkbkria1opxnSR4uZSw3YyI2Y9Q0RiaiaBEBo51iaFqEHw0Gbk7Jg/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞简介**  
  
2024年6月19日，深瞳漏洞实验室监测到一则Rancher Kubernetes Engine组件存在信息泄露漏洞的信息，漏洞编号：CVE-2023-32191，漏洞威胁等级：严重。  
  
Rancher Kubernetes Engine 中存在一个敏感信息泄露漏洞，由于RKE中管理敏感信息的ConfigMap默认可读，**低权限攻击者可以借此获取管理集群所需的所有信息和凭据，导致服务器失陷。**  
  
  
**影响范围**  
  
目前受影响的Rancher-Kubernetes Engine版本：  
  
1.4.18 ≤ Rancher Kubernetes Engine < 1.4.191.5.9 ≤ Rancher Kubernetes Engine < 1.5.102.7.0 ≤ rancher < 2.7.142.8.0 ≤ rancher < 2.8.5  
  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5wrwHAKPJAMKhsbibzRibI2l80wvwfbkbkria1opxnSR4uZSw3YyI2Y9Q0RiaiaBEBo51iaFqEHw0Gbk7Jg/640?wx_fmt=gif&from=appmsg "")  
  
**官方修复建议**  
  
  
官方已发布新版本修复该漏洞，请受影响用户更新RKE和Rancher版本。下载链接：https://github.com/rancher/rke/releaseshttps://github.com/rancher/rancher/releases  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5wrwHAKPJAMKhsbibzRibI2l80wvwfbkbkria1opxnSR4uZSw3YyI2Y9Q0RiaiaBEBo51iaFqEHw0Gbk7Jg/640?wx_fmt=gif&from=appmsg "")  
  
**深信服解决方案**  
  
  
**风险资产发现**  
  
支持对Rancher-Kubernetes Engine的主动检测，可批量检出业务场景中该事件的受影响资产情况，相关产品如下：  
  
**【深信服云镜YJ】**已发布资产检测方案。  
  
  
**参考链接**  
  
  
https://github.com/advisories/GHSA-6gr4-52w6-vmqx  
  
  
**时间轴**  
  
  
  
**2024/6/19**  
  
深瞳漏洞实验室监测到Rancher Kubernetes Engine敏感信息泄露漏洞信息。  
  
  
**2024/6/20**  
  
深瞳漏洞实验室发布漏洞通告。  
  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5wrwHAKPJAMKhsbibzRibI2l8Tc400Q2O8b2HsEbpfBuuwN8lPI87WlXEbb79OtSQDu5OfbLeTlsw1Q/640?wx_fmt=png&from=appmsg "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5zvcIHbwGGYKbqDVYsVKzNNia1jYtHf49C7133AlDXAgex2W4lFvpia56tjQQDkiauNBrl08YbxqG01A/640?wx_fmt=jpeg&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
