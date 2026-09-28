---
cve: "CVE-2024-53966"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Adobe Experience Manager | 跨站点脚本(存储型 XSS)(CVE-2024-53966)   
 安迈信科应急响应中心   2025-02-10 13:40  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tdibEPWdubQUgErMslSgzVibGKdSFkWPTbTgu83UTXdNYm7eOxRSmuNmOjUIxdicy73wTLufCMnbs6CAsc3uicJUcg/640?wx_fmt=png "")  
### 01 漏洞概况      Adobe Experience Manager版本6.5.21及之前的版本存在存储型跨站脚本（XSS）漏洞，低权限攻击者可利用该漏洞向易受攻击的表单字段注入恶意脚本。当受害者浏览包含易受攻击字段的页面时，恶意JavaScript可能会在受害者的浏览器中执行。02 漏洞处置综合处置优先级：高漏洞信息漏洞名称Adobe Experience Manager | 跨站点脚本(存储型 XSS)漏洞编号CVE编号CNVD-2024-53966‍漏洞评估披露时间2025-02-07漏洞类型跨站点脚本（XSS）危害评级高危公开程度PoC未公开威胁类型远程利用情报在野利用是影响产品产品名称Adobe Experience Manager受影响版本Adobe Experience Manager < 6.5.21影响范围广有无修复补丁有  
### 03 漏洞排查      用户尽快排查Adobe Experience Manager 版本是否小于6.5.21。若存在应用使用，极大可能会受到影响。04 修复方案1、官方修复方案：当前官方已发布最新版本，建议受影响的用户及时更新升级到最新版本。链接如下：https://helpx.adobe.com/security/products/experience-manager/apsb24-69.html05 时间线      2024.02.07 厂商发布安全补丁      2024.02.10 安迈信科安全运营团队发布通告   关于安迈信科西安安迈信科科技有限公司以“数字化可管理”为核心理念，坚持DevOps自主研发，创新打造“能力聚合、流程闭环、持续赋能”的综合性网络数据安全平台与运营服务。公司从古城西安出发，已在全国范围内为政府、运营商、电力、能源等行业客户提供了高质量的安全保障，并将继续为我国数字化转型和发展贡献力量。知 行 . 至 简 . 致 诚  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
