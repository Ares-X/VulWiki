---
cve: "CVE-2026-76801"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】FireBox存在权限提升漏洞(CVE-2026-76801)  
 安迈信科应急响应中心   2026-09-10 07:29  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tdibEPWdubQUgErMslSgzVibGKdSFkWPTbTgu83UTXdNYm7eOxRSmuNmOjUIxdicy73wTLufCMnbs6CAsc3uicJUcg/640?wx_fmt=png "")  
### 01 漏洞概况      WordPress 的 FireBox – WooCommerce Popup Builder, Exit Intent Popup, Email Optin & Cart Abandonment 插件在所有版本（含 3.1.10）存在远程代码执行漏洞。插件Executer::allowedToRun()中的正则黑名单可被绕过，无法拦截wp_insert_user、update_option、file_put_contents等 WordPress 核心函数；firebox_meta REST 端点存储的 PHP 条件规则值未做过滤。拥有作者及以上权限的认证攻击者可在服务器执行代码。从 3.1.10 之前版本升级的站点，Migrator::preserveCampaignRoleAccess()函数会自动给 Author 角色授予编辑、发布 FireBox 权限，进一步降低攻击入口权限门槛。建议用户升级插件至最新版本修复漏洞。02 漏洞处置综合处置优先级：高漏洞信息漏洞名称FireBox 存在权限提升漏洞漏洞编号CVE编号CVE-2026-76801‍漏洞评估披露时间2026-09-09漏洞类型权限提升、远程代码执行危害评级高危公开程度PoC 未公开威胁类型权限提升利用情报在野利用是影响产品产品名称FireBo（WordPress 插件）受影响版本FireBox ≤3.1.10影响范围广有无修复补丁有  
### 03 漏洞排查      用户尽快排查 WordPress 站点是否部署 FireBox 弹窗插件，且插件版本是否≤3.1.10。若存在，极大可能会受到影响。同时核查站点角色权限，确认是否存在作者（Author）角色被异常授予 edit_fireboxes、publish_fireboxes 权限的情况。04 修复方案      官方修复方案：升级 FireBox 插件至最新版本。05 时间线      2026.09.09 漏洞披露，CVE-2026-76801 公开；2026.09.09 发布安全预警，提醒用户排查 WordPress 站点 FireBox 插件版本并升级修复漏洞。   关于安迈信科西安安迈信科科技有限公司以“数字化可管理”为核心理念，坚持DevOps自主研发，创新打造“能力聚合、流程闭环、持续赋能”的综合性网络数据安全平台与运营服务。公司从古城西安出发，已在全国范围内为政府、运营商、电力、能源等行业客户提供了高质量的安全保障，并将继续为我国数字化转型和发展贡献力量。智 慧 . 至 简 . 致 诚  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
