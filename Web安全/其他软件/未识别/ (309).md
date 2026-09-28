---
cve: "CVE-2026-9203"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Progress MarkLogic Server存在服务器端伪造请求（SSRF）漏洞(CVE-2026-9203)  
 安迈信科应急响应中心   2026-08-07 03:15  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tdibEPWdubQUgErMslSgzVibGKdSFkWPTbTgu83UTXdNYm7eOxRSmuNmOjUIxdicy73wTLufCMnbs6CAsc3uicJUcg/640?wx_fmt=png "")  
### 01 漏洞概况  Progress MarkLogic Server 11.3.6之前版本及12.0.3之前版本存在服务端请求伪造漏洞，该漏洞允许具有低权限角色的已认证用户绕过云实例元数据端点的保护。成功利用该漏洞可泄露云凭证，并危及主机实例可访问的云资源。02 漏洞处置综合处置优先级：高漏洞信息漏洞名称Progress MarkLogicServer存在服务器端伪造请求（SSRF）漏洞编号CVE编号CVE-2026-9203‍漏洞评估披露时间2026-8-5漏洞类型服务器端伪造请求危害评级高危公开程度PoC未公开威胁类型远程利用情报在野利用是影响产品产品名称Progress MarkLogicServer受影响版本< 11.3.6<12.0.3影响范围广有无修复补丁有  
### 03 漏洞排查      用户尽快排查应用系统 Progress MarkLogic Server应用版本是否在Progress MarkLogic Server <11.3.6,Progress MarkLogic Server <12.0.3.若存在应用使用，极大可能会受到影响。04 修复方案1、官方修复方案：当前官方已发布最新版本，建议受影响的用户及时更新升级到最新版本。05 时间线      2026.08.05 厂商发布安全补丁      2026.08.07 安迈信科安全运营团队发布通告   关于安迈信科西安安迈信科科技有限公司以“数字化可管理”为核心理念，坚持DevOps自主研发，创新打造“能力聚合、流程闭环、持续赋能”的综合性网络数据安全平台与运营服务。公司从古城西安出发，已在全国范围内为政府、运营商、电力、能源等行业客户提供了高质量的安全保障，并将继续为我国数字化转型和发展贡献力量。智 慧 . 至 简 . 致 诚  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
