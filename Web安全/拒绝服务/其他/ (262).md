---
cve: "CVE-2025-33216"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】NVIDIA SNAP-4 Container存在缓冲区溢出漏洞(CVE-2025-33216)  
原创 安迈信科
                    安迈信科  安迈信科应急响应中心   2026-03-26 13:39  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tdibEPWdubQUgErMslSgzVibGKdSFkWPTbTgu83UTXdNYm7eOxRSmuNmOjUIxdicy73wTLufCMnbs6CAsc3uicJUcg/640?wx_fmt=png "")  
### 01 漏洞概况      NVIDIA SNAP-4 容器在配置界面中存在一个漏洞，虚拟机上的攻击者可能通过发送精心构造的配置导致缓冲区大小计算错误。成功利用此漏洞可能导致 SNAP 服务崩溃，从而造成存储服务对主机拒绝服务。02 漏洞处置综合处置优先级：高漏洞信息漏洞名称NVIDIA SNAP-4 Container存在缓冲区溢出漏洞漏洞编号CVE编号CVE-2025-33216‍漏洞评估披露时间2026-03-24漏洞类型不正确的缓冲区大小计算危害评级Medium（中等）公开程度无公开PoC威胁类型拒绝服务利用情报在野利用无影响产品产品名称NVIDIA SNAP-4 Container（运行在 BlueField 平台上的存储加速容器）受影响版本SNAP-4 Container 的所有版本 prior to SNAP-4.9.0 和 prior to SNAP-4.5.5（部分公告提及 prior to SNAP-4.9.1 / SNAP-4.5.5，修复版本包含 SNAP-4.9.0 / SNAP-4.9.1 / SNAP-4.5.5）影响范围适用于允许 Guest VM / 攻击者访问 SNAP-4 配置接口的虚拟化环境，成功利用可导致 SNAP 服务崩溃并影响主机存储服务可用性有无修复补丁有。NVIDIA 已发布修复版本  
### 03 漏洞排查      检查当前运行的 SNAP-4 Container 版本（通过 NVIDIA 管理工具、容器日志、BlueField 平台查询或 NGC Catalog）。审查配置日志和 SNAP 服务日志，查找与缓冲区、配置处理相关的异常或崩溃记录。测试环境中从 Guest VM 发送构造配置，观察是否导致 SNAP 服务崩溃或存储不可用。使用漏洞扫描工具针对 NVIDIA SNAP-4 相关 CVE 进行检测，并确认是否运行在受影响的 BlueField 平台上。04 修复方案推荐：立即升级 SNAP-4 Container 到 SNAP-4.9.0 / SNAP-4.9.1 或 SNAP-4.5.5（或更高版本）。下载地址参考 NVIDIA NGC Catalog 或官方 DOCA 下载页面。临时缓解：加强虚拟机隔离，限制 Guest VM 对 SNAP-4 配置接口的访问权限；监控 SNAP 服务状态和存储可用性指标。升级后验证存储服务正常运行，并监控日志以确保漏洞已修复。05 时间线      2026 年 3 月 24 日：CVE 分配并公开，NVIDIA 发布安全公告（Bulletin，a_id/5744），NVD、GitHub Advisory 等平台同步更新。2026 年 3 月 25 日：多家平台（如 OffSec Radar、TheHackerWire、Vulmon、Tenable）更新详情。2026 年 3 月 26 日：安迈信科运营团队发布通告。   关于安迈信科西安安迈信科科技有限公司以“数字化可管理”为核心理念，坚持DevOps自主研发，创新打造“能力聚合、流程闭环、持续赋能”的综合性网络数据安全平台与运营服务。公司从古城西安出发，已在全国范围内为政府、运营商、电力、能源等行业客户提供了高质量的安全保障，并将继续为我国数字化转型和发展贡献力量。知 行 . 至 简 . 致 诚  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
