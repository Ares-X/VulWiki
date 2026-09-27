---
cve: "CVE-2023-34063"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】VMware Aria Automation 访问控制错误漏洞CVE-2023-34063   
深瞳漏洞实验室  深信服千里目安全技术中心   2024-01-17 18:01  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zq3Dga80utUSz1u4CU8C8Uhhu1aHAPMvweuYTO33NEbSnoHXaOnrOnbtCThAiaS4nbsOWhSG0u0FQ/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞名称：**  
  
VMware Aria Automation 访问控制错误漏洞(CVE-2023-34063)  
  
**组件名称：**  
  
VMware Aria Automation  
  
**影响范围：**  
  
VMware Aria   
Automation = 4.x  
  
VMware Aria   
Automation = 5.x  
  
VMware Aria Automation = 8.11.x  
  
VMware Aria Automation = 8.12.x  
  
VMware Aria Automation = 8.13.x  
  
VMware Aria Automation = 8.14.x  
  
**漏洞类型：**  
  
未授权访问  
  
**利用条件：**  
  
1、用户认证：需要用户认证  
  
2、前置条件：默认配置  
  
3、触发方式：远程或者本地  
  
**综合评价：**  
  
<综合评定利用难度>：容易，需低权限即可执行攻击。  
  
<综合评定威胁等级>：高危，能在未授权的情况下访问敏感信息或执行敏感操作。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zq3Dga80utUSz1u4CU8C8UCldIibxsmVx4AI3P1vySKek52n4SlAxjkkrpaib4dKPxd8ZBuDeUiciaUw/640?wx_fmt=gif&from=appmsg "")  
  
**组件介绍**  
  
VMware Aria Automation是 VMware Aria漏洞管理附加模块组件，提供了全方位的闭环自动化功能来帮助 IT 系统实现漏洞修复，可以定义企业 IT 安全策略，根据该策略来扫描系统，检测漏洞，并主动进行修复。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zq3Dga80utUSz1u4CU8C8UCldIibxsmVx4AI3P1vySKek52n4SlAxjkkrpaib4dKPxd8ZBuDeUiciaUw/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞简介**  
  
2024年1月17日，深瞳漏洞实验室监测到一则VMware Aria Automation组件存在缺少访问控制漏洞的信息，漏洞编号：CVE-2023-34063，漏洞威胁等级：高危。  
  
该漏洞是由于功能被访问时在服务器端的访问控制检查不正确，**攻击者可利用该漏洞在获得权限的情况下，构造恶意数据执行未授权访问攻击，最终执行未经授权的敏感操作**。  
  
  
**影响范围**  
  
目前受影响的VMware Aria Automation版本：  
  
VMware Aria   
Automation = 4.x  
  
VMware Aria   
Automation = 5.x  
  
VMware Aria Automation = 8.11.x  
  
VMware Aria Automation = 8.12.x  
  
VMware Aria Automation = 8.13.x  
  
VMware Aria Automation = 8.14.x  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zq3Dga80utUSz1u4CU8C8UCldIibxsmVx4AI3P1vySKek52n4SlAxjkkrpaib4dKPxd8ZBuDeUiciaUw/640?wx_fmt=gif&from=appmsg "")  
  
**官方修复建议**  
  
  
当前官方已发布最新版本，建议受影响的用户及时更新升级到最新版本。链接如下：  
  
https://www.vmware.com/  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zq3Dga80utUSz1u4CU8C8UCldIibxsmVx4AI3P1vySKek52n4SlAxjkkrpaib4dKPxd8ZBuDeUiciaUw/640?wx_fmt=gif&from=appmsg "")  
  
**深信服解决方案**  
  
  
**1.风险资产发现**  
  
支持对VMware Aria Automation组件的主动检测，可**批量检出**业务场景中该事件的受影响资产情况，相关产品如下：  
  
**【深信服主机安全检测响应平台CWPP】**已发布资产检测方案。  
  
  
**参考链接**  
  
  
https://www.vmware.com/security/advisories/VMSA-2024-0001.html  
  
  
**时间轴**  
  
  
  
**2024/1/17**  
  
深瞳漏洞实验室监测到VMware Aria Automation 访问控制错误漏洞(CVE-2023-34063)攻击信息  
  
  
**2024/1/17**  
  
深瞳漏洞实验室发布漏洞通告。  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5zq3Dga80utUSz1u4CU8C8Uob7z1nlJ8JqaRoUFLkiaJvSpzWuyKiaLBd9Mic68Sf5FZxibTF2B5Vx7kw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5zq3Dga80utUSz1u4CU8C8Uw5U4gfHpdBtnWoW2iaICAicc9FzfRmem1H1cgjGOPnnxL3oeMQefpEpg/640?wx_fmt=jpeg&from=appmsg "")  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
