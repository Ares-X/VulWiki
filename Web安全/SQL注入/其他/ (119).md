---
cve: "CVE-2024-11274"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】GitLab Kubernetes Proxy Response NEL 头注入漏洞（CVE-2024-11274）   
 安迈信科应急响应中心   2024-12-19 12:35  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tdibEPWdubQUgErMslSgzVibGKdSFkWPTbTgu83UTXdNYm7eOxRSmuNmOjUIxdicy73wTLufCMnbs6CAsc3uicJUcg/640?wx_fmt=png "")  
### 01 漏洞概况      由于 GitLab CE/EE 中的 Kubernetes 代理功能未正确处理或验证注入的 Network Error Logging (NEL)头，攻击者可通过在 Kubernetes 代理响应中注入恶意 NEL 标头，成功利用该漏洞可能导致会话相关数据泄露，这些数据可能被滥用来进行账户接管（ATO），从而实现未授权访问和控制用户账户。‍‍‍‍‍‍‍‍02 漏洞处置综合处置优先级：高漏洞信息漏洞名称GitLab Kubernetes Proxy Response NEL 头注入漏洞漏洞编号CVE编号CVE-2024-11274‍‍‍‍‍‍漏洞评估披露时间2024-12-12‍‍漏洞类型注入、信息泄露危害评级高危公开程度PoC未公开威胁类型注入、信息泄露利用情报在野利用未发现‍‍‍‍‍影响产品产品名称GitLab CE/EE‍‍‍‍‍‍受影响版本16.1 <= GitLab CE/EE < 17.4.6‍17.5 <= GitLab CE/EE < 17.5.417.6 <= GitLab CE/EE < 17.6.2影响范围广有无修复补丁有  
### 03 漏洞排查      用户尽快排查应用GitLab CE/EE应用版本是否在16.1 <= GitLab CE/EE < 17.4.6、17.5 <= GitLab CE/EE < 17.5.4、17.6 <= GitLab CE/EE < 17.6.2。若存在应用使用，极大可能会受到影响。04 修复方案目前该漏洞已经修复，受影响用户可升级到GitLab CE/EE 17.6.2、17.5.4、17.4.6 或更高版本。下载链接：https://about.gitlab.com/参考链接：https://about.gitlab.com/releases/2024/12/11/patch-release-gitlab-17-6-2- released/https://nvd.nist.gov/vuln/detail/CVE-2024-1127405 时间线     2024.12.12 厂商发布安全补丁     2024.12.19  安迈信科安全运营团队发布通告   关于安迈信科西安安迈信科科技有限公司以“数字化可管理”为核心理念，坚持DevOps自主研发，创新打造“能力聚合、流程闭环、持续赋能”的综合性网络数据安全平台与运营服务。公司从古城西安出发，已在全国范围内为政府、运营商、电力、能源等行业客户提供了高质量的安全保障，并将继续为我国数字化转型和发展贡献力量。知 行 . 至 简 . 致 诚  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
