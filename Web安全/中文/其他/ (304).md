---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】SolarWinds Network Configuration Manager 远程代码执行漏洞   
深瞳漏洞实验室  深信服千里目安全技术中心   2023-11-14 17:41  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zE0zWsEHgkYmOSLJPibNMmPChibYYj4icvJqkoqDibCkVMZswUicpwib77iaa7XGPAqolOedzurtwampY6A/640?wx_fmt=gif "")  
  
**漏洞名称：**  
  
SolarWinds Network Configuration Manager 远程代码执行漏洞（CVE-2023-40054）  
  
**组件名称：**  
  
SolarWinds Network Configuration Manager  
  
**影响范围：**  
  
SolarWinds Network Configuration Manager ≤ 2023.4  
  
**漏洞类型：**  
  
远程代码执行  
  
**利用条件：**  
  
1、用户认证：未知  
  
2、前置条件：默认配置  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：未知。  
  
<综合评定威胁等级>：高危，能造成远程代码执行。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zE0zWsEHgkYmOSLJPibNMmPZM6WVrdXK0hAicC8L1Bf7Byh1v9LuScGC2Mxyn5n1LPIPfXibvqF6lSQ/640?wx_fmt=gif "")  
  
**组件介绍**  
  
SolarWinds Network Configuration Manager（NCM）是SolarWinds公司提供的一款网络配置管理组件。它是SolarWinds Orion平台的一部分，旨在帮助网络管理员轻松管理和监控网络设备的配置。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zE0zWsEHgkYmOSLJPibNMmPZM6WVrdXK0hAicC8L1Bf7Byh1v9LuScGC2Mxyn5n1LPIPfXibvqF6lSQ/640?wx_fmt=gif "")  
  
**漏洞简介**  
  
2023年11月14日，深瞳漏洞实验室监测到一则SolarWinds Network Configuration Manager组件存在远程代码执行漏洞的信息，漏洞编号：CVE-2023-40054，漏洞威胁等级：高危。  
  
  
该漏洞是由于Network Configuration Manager URL过滤不严导致，**攻击者可利用该漏洞，构造恶意数据执行远程代码执行攻击，最终允许低级别用户以SYSTEM权限执行命令。**  
  
  
**影响范围**  
  
目前受影响的SolarWinds Network Configuration Manager版本：  
  
SolarWinds Network Configuration Manager ≤ 2023.4  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zE0zWsEHgkYmOSLJPibNMmPZM6WVrdXK0hAicC8L1Bf7Byh1v9LuScGC2Mxyn5n1LPIPfXibvqF6lSQ/640?wx_fmt=gif "")  
  
**官方修复建议**  
  
  
当前官方已发布最新版本，建议受影响的用户及时更新升级到最新版本。链接如下：  
  
https://www.solarwinds.com/zh/network-configuration-manager  
  
  
**参考链接**  
  
  
https://www.solarwinds.com/trust-center/security-advisories/CVE-2023-40054  
  
  
**时间轴**  
  
  
  
**2023/11/14**  
  
深瞳漏洞实验室监测到SolarWinds官方发布安全版本。  
  
  
**2023/11/14**  
  
深瞳漏洞实验室发布漏洞通告。  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5zE0zWsEHgkYmOSLJPibNMmPqFib6yu9S1WibblYRq0u7oJy9pZ3QVOv0xyrJD4mZiaUzvHkQjQtQAN6A/640?wx_fmt=png "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5zE0zWsEHgkYmOSLJPibNMmP5ET7qc0Htt0nfwBFWjJzYWUDhnKKv2G5P2aMK1UgbADl7cEPsabtzQ/640?wx_fmt=jpeg "")  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
