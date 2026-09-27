---
cve: "CVE-2024-7654"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】 ActiveMQ 服务在 OpenEdge 管理 Web 界面注入未经身份验证的内容(CVE-2024-7654)   
 安迈信科应急响应中心   2024-09-09 18:29  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tdibEPWdubQUgErMslSgzVibGKdSFkWPTbTgu83UTXdNYm7eOxRSmuNmOjUIxdicy73wTLufCMnbs6CAsc3uicJUcg/640?wx_fmt=png "")  
### 01 漏洞概况      当激活了OEE/OEM自动发现功能时，ActiveMQ Discovery服务默认可从OpenEdge Management安装中访问。未经授权的访问发现服务的UDP端口会导致内容注入到OEM网页界面的部分区域，从而使得其他类型的攻击成为可能，这些攻击可能会欺骗或误导网页界面用户。通过默认禁用发现服务来修复未经授权的OEE/OEM发现服务使用问题。02 漏洞处置综合处置优先级：高漏洞信息漏洞名称通过ActiveMQ发现服务在OpenEdge 管理Web界面中注入未经身份验证的内容漏洞编号CVE编号CVE-2024-7654‍漏洞评估披露时间2024-09-03漏洞类型未授权访问危害评级高危公开程度PoC未公开威胁类型远程利用情报在野利用是影响产品产品名称ActiveMQ受影响版本11.7.0-11.7.19、12.2.0、12.2.15、12.8.0、12.8.2影响范围广有无修复补丁有  
### 03 漏洞排查      用户尽快排查ActiveMQ的服务版本是否在受影响版本内。若存在受影响范围内使用，极大可能会受到影响。04 修复方案当前官方已发布最新版本，建议受影响的用户及时更新升级到最新版本。链接如下：https://community.progress.com/s/article/Unauthenticated-Content-Injection-in-OpenEdge-Management-web-interface-via-ActiveMQ-discovery-service05 时间线      2024.09.03 厂商发布安全补丁      2024.09.09 安迈信科安全运营团队发布通告   关于安迈信科西安安迈信科科技有限公司以“数字化可管理”为核心理念，坚持DevOps自主研发，创新打造“能力聚合、流程闭环、持续赋能”的综合性网络数据安全平台与运营服务。公司从古城西安出发，已在全国范围内为政府、运营商、电力、能源等行业客户提供了高质量的安全保障，并将继续为我国数字化转型和发展贡献力量。知 行 . 至 简 . 致 诚  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
