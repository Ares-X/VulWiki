---
cve: "CVE-2025-33215"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】NVIDIA SNAP-4 Container存在拒绝服务漏洞(CVE-2025-33215)  
原创 安迈信科
                    安迈信科  安迈信科应急响应中心   2026-03-26 13:39  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tdibEPWdubQUgErMslSgzVibGKdSFkWPTbTgu83UTXdNYm7eOxRSmuNmOjUIxdicy73wTLufCMnbs6CAsc3uicJUcg/640?wx_fmt=png "")  
### 01 漏洞概况     NVIDIA SNAP-4 容器中的 VIRTIO-BLK 组件存在一个漏洞，恶意客户虚拟机可能通过发送特制消息导致使用超出范围的指针偏移。成功利用此漏洞可能导致 DPA 拒绝服务，并影响其他虚拟机对存储的可用性。02 漏洞处置综合处置优先级：高漏洞信息漏洞名称NVIDIA SNAP-4 Container存在拒绝服务漏洞漏洞编号CVE编号CVE-2025-33215‍漏洞评估披露时间2026-03-24漏洞类型使用超出范围指针偏移危害评级Medium（中等）公开程度无公开PoC威胁类型拒绝服务利用情报在野利用无影响产品产品名称NVIDIA SNAP-4 Container受影响版本SNAP-4 Container on BlueField-3 的所有版本 prior to SNAP-4.9.1 和 prior to SNAP-4.5.5影响范围影响 NVIDIA SNAP-4 Container 的 VIRTIO-BLK 组件有无修复补丁有。NVIDIA 已发布修复版本  
### 03 漏洞排查      检查当前运行的 SNAP-4 Container 版本（通过 NVIDIA 管理工具、容器日志或 BlueField-3 平台查询）。审查 Guest VM 日志和 SNAP-4 日志，查找异常指针相关错误或 DoS 迹象。测试环境中模拟恶意 Guest VM 发送构造消息，观察是否出现 DPA 服务中断或存储不可用。使用漏洞扫描工具针对 NVIDIA SNAP-4 相关 CVE 进行检测，并确认是否运行在受影响的 BlueField-3 平台上。04 修复方案推荐：立即升级 SNAP-4 Container 到 SNAP-4.9.1 或 SNAP-4.5.5（或更高版本）。下载地址参考 NVIDIA NGC Catalog（https://catalog.ngc.nvidia.com/orgs/nvidia/teams/doca/containers/doca_snap）或 DOCA 下载页面。临时缓解：限制 Guest VM 对 SNAP-4 组件的访问权限，加强虚拟化隔离；监控 DPA 和存储相关性能/可用性指标。升级后验证存储服务正常运行，并监控日志以确保漏洞已修复。05 时间线      2026 年 3 月 24 日：CVE 分配并公开，NVIDIA 发布安全公告（Bulletin 更新版本 1.0），NVD 等平台同步更新。2026 年 3 月 25 日：多家平台（如 GitHub Advisory、Tenable、Vulners、TheHackerWire）更新详情。2026 年 3 月 26 日：安迈信科运营团队发布通告。   关于安迈信科西安安迈信科科技有限公司以“数字化可管理”为核心理念，坚持DevOps自主研发，创新打造“能力聚合、流程闭环、持续赋能”的综合性网络数据安全平台与运营服务。公司从古城西安出发，已在全国范围内为政府、运营商、电力、能源等行业客户提供了高质量的安全保障，并将继续为我国数字化转型和发展贡献力量。知 行 . 至 简 . 致 诚  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
