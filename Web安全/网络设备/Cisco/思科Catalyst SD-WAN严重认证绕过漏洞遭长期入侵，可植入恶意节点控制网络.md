---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-0d5d620684fa784ccc80ad20"
entity_id: "ve-0d5d620684fa784ccc80ad20"
schema_version: "1"
title: "思科Catalyst SD-WAN严重认证绕过漏洞遭长期入侵，可植入恶意节点控制网络"
product: "Cisco Catalyst SD-WAN Controller/Manager"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2026-20127"
referenced_identifiers: "CVE-2022-20775"
prerequisites: "远程认证绕过先得高权限非root，再降级链提权；未给影响/修复版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/%E6%80%9D%E7%A7%91Catalyst%20SD-WAN%E4%B8%A5%E9%87%8D%E8%AE%A4%E8%AF%81%E7%BB%95%E8%BF%87%E6%BC%8F%E6%B4%9E%E9%81%AD%E9%95%BF%E6%9C%9F%E5%85%A5%E4%BE%B5%EF%BC%8C%E5%8F%AF%E6%A4%8D%E5%85%A5%E6%81%B6%E6%84%8F%E8%8A%82%E7%82%B9%E6%8E%A7%E5%88%B6%E7%BD%91%E7%BB%9C.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  思科Catalyst SD-WAN严重认证绕过漏洞遭长期入侵，可植入恶意节点控制网络  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cisco Catalyst SD-WAN Controller/Manager
- 本文讨论：CVE-2026-20127
- 版本、权限与配置前提：远程认证绕过先得高权限非root，再降级链提权；未给影响/修复版本
- 资料类型：事件/通告报道；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 无厂商/Talos/CISA原文直链，仅二手新闻
- 补丁期限17:00缺时区；未提供固件版本
- 把陌生IP成功认证直接视为沦陷过于绝对，需排除合法新增节点

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- UAT归因、2023起利用与版本矩阵待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

胡金鱼
                    胡金鱼  嘶吼专业版   2026-02-28 06:04  
  
![](../../.resource/remote/80b6b7b79e984bc49420b10fe1591d45aaacd71189216eaceb88bde0aa98a0bc.gif "")  
  
思科发布安全预警，称其 Cisco Catalyst SD-WAN 存在一处编号为 CVE-2026-20127 的严重认证绕过漏洞，该漏洞已在零日攻击中被主动利用，攻击者可远程攻陷控制器，并在目标网络中添加恶意非法对等节点。  
  
CVE-2026-20127 漏洞风险等级为最高 10.0 分，影响本地部署与云部署环境中的 Cisco Catalyst SD-WAN Controller（原 vSmart）与 Cisco Catalyst SD-WAN Manager（原 vManage）。   
  
在思科发布的关于 CVE-2026-20127 的最新公告指出：“该漏洞的成因是受影响系统中的对等节点认证机制未能正常工作。攻击者可通过向受影响系统发送精心构造的请求实施利用。  
”  
  
成功利用后，攻击者能够以内部高权限非 root 用户身份登录受影响的 Cisco Catalyst SD-WAN 控制器，并借助该账户访问 NETCONF 接口，进而篡改整个 SD-WAN 架构的网络配置。  
  
Cisco Catalyst SD-WAN 是一款软件定义网络平台，通过集中管理系统连接分支机构、数据中心与云环境，由控制器对站点间流量进行加密安全转发。   
  
通过添加非法对等节点，攻击者可将一台看似合法的恶意设备接入 SD-WAN 环境。该设备可建立加密连接、宣告由攻击者控制的网络路由，进而向企业内网深度渗透。   
  
思科 Talos 团队在另一份公告中证实，该漏洞已被在野攻击利用，相关恶意活动编号为 UAT-8616。评估显示，该攻击由高度专业化的恶意组织实施。  
  
监测数据显示，相关利用行为最早可追溯至 2023 年。情报信息表明，攻击者可能通过以下方式提权至 root：  
  
1. 将系统降级至旧版本；  
  
2. 利用 CVE-2022-20775 获取 root 权限；  
  
3. 再恢复至原固件版本。   
  
攻击完成后回退版本，可在获取 root 权限的同时规避检测。  
  
2 月 25 日，美国网络安全与基础设施安全局（CISA）发布紧急指令 26-03，要求联邦行政机构对 Cisco SD-WAN 系统开展资产清查、收集取证痕迹、开启日志外存、安装补丁更新，并排查与 CVE-2026-20127 和 CVE-2022-20775 相关的入侵痕迹。   
  
CISA 表示，该漏洞利用行为对联邦网络构成紧迫威胁，要求相关设备必须在 2026 年 2 月 27 日 17:00 前完成补丁安装。  
  
CISA 与英国国家网络安全中心（NCSC）联合发布的排查与加固指南表示：全球范围内的 Cisco Catalyst SD-WAN 部署正成为攻击目标，恶意分子通过添加非法对等节点，进一步获取 root 权限并实现持久化控制。  
  
多份公告均强调：SD-WAN 管理接口严禁直接暴露在互联网，并敦促机构立即更新与加固受影响系统。使用 Cisco Catalyst SD-WAN 的机构应紧急排查网络入侵风险，结合发布的威胁狩猎指南，识别入侵痕迹。  
  
目前，思科已发布修复该漏洞的软件更新，并表示不存在可完全缓解该漏洞的临时解决方案。  
# 入侵指标（IOC）  
  
安全研究人员强烈建议相关机构仔细审查暴露在公网的 Catalyst SD-WAN 控制器日志，重点关注未授权对等节点事件与可疑认证行为。  
  
建议管理员检查 /var/log/auth.log，关注来自未知 IP 地址的如下日志：  
  
示例日志：  
  
2026-02-10T22:51:36+00:00 vm sshd[804]: Accepted publickey for vmanage-admin from [REDACTED IP] port [REDACTED PORT] ssh2: RSA SHA256:[REDACTED KEY]  
  
管理员应将异常 IP 与 SD-WAN Manager 中配置的系统 IP、已知管理与控制器基础设施地址比对。若出现未知 IP 成功认证，应视为设备已沦陷，并及时联系思科 TAC 支持。   
  
Talos 与官方公告还列出更多入侵指标：  
  
**·**  
恶意账户的创建与删除  
  
**·**  
异常 root 登录  
  
**·**  
vmanage-admin 或 root 账户下出现未授权 SSH 密钥  
  
**·**  
启用 PermitRootLogin 等配置篡改  
  
管理员还应关注：  
  
**·**  
日志文件异常偏小或缺失（可能为日志篡改）  
  
**·**  
软件降级与重启行为（可能为利用 CVE-2022-20775 提权）  
  
CISA 建议通过以下日志排查 CVE-2022-20775 利用痕迹：  
  
·/var/volatile/log/vdebug  
  
·/var/log/tmplog/vdebug  
  
·/var/volatile/log/sw_script_synccdb.log  
  
CISA 排查指南要求机构收集取证数据（包括管理员核心转储、用户家目录），并确保日志外存以防篡改。若 root 账户已沦陷，建议重新全新部署系统，而非尝试清理现有环境。企业还应将异常对等节点事件、不明控制器行为为入侵信号并立即调查，如：  
  
**·**  
限制网络暴露面  
  
**·**  
将 SD-WAN 控制组件部署在防火墙后  
  
**·**  
隔离管理接口  
  
**·**  
日志转发至外部系统  
  
**·**  
遵循思科官方加固指南   
  
根据思科最新公告显示，升级至已修复版本是彻底解决 CVE-2026-20127 高危漏洞 的唯一方式。  
  
参考及来源：  
https://www.bleepingcomputer.com/news/security/critical-cisco-sd-wan-bug-exploited-in-zero-day-attacks-since-2023/  
  
![](../../.resource/remote/598c9ec37a2a5848a3f2349f16da3b187cdf1751fb8d0992b0eafe7c420cac84.png "")  
  
![](../../.resource/remote/87091f86e6b87e79fc790468bd390ed87c5ac5247f6afbe7e279c98cd6e5ff26.png "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
