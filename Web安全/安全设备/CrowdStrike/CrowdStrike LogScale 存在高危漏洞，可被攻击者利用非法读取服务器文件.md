---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-f7cebad8e5667480227740a5"
entity_id: "ve-f7cebad8e5667480227740a5"
schema_version: "1"
title: "CrowdStrike LogScale 存在高危漏洞，可被攻击者利用非法读取服务器文件"
product: "CrowdStrike LogScale自托管集群API"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2026-40050"
referenced_identifiers: ""
prerequisites: "特定集群API暴露；Next-Gen SIEM声称不受影响，SaaS网络缓解"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/CrowdStrike/CrowdStrike%20LogScale%20%E5%AD%98%E5%9C%A8%E9%AB%98%E5%8D%B1%E6%BC%8F%E6%B4%9E%EF%BC%8C%E5%8F%AF%E8%A2%AB%E6%94%BB%E5%87%BB%E8%80%85%E5%88%A9%E7%94%A8%E9%9D%9E%E6%B3%95%E8%AF%BB%E5%8F%96%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%96%87%E4%BB%B6.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  CrowdStrike LogScale 存在高危漏洞，可被攻击者利用非法读取服务器文件  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：CrowdStrike LogScale自托管集群API
- 本文讨论：CVE-2026-40050
- 版本、权限与配置前提：特定集群API暴露；Next-Gen SIEM声称不受影响，SaaS网络缓解
- 资料类型：安全平台文件读取新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 无具体受影响/修复版本和厂商公告直链，无法据文实施升级
- 文件读取被扩写为关闭告警、改日志、提权及整体防御失效，缺独立写入/执行链
- 内部发现与主动流程不能证明大幅降低攻击者先知概率

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 厂商公告、API暴露前提、权限和云缓解日期待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

鹏鹏同学
                    鹏鹏同学  黑猫安全   2026-04-27 00:49  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/DYqn7TU9icq1csArUC9HbYdVL5mCe5gYyIRCC6kOGlzSE6zlzkU5kH9icJyeBMhWgib8CS82om9owzZWCm17RqZhWkia8O8gFRZ8tVuGeg0o12M/640?wx_fmt=png&from=appmsg "")  
  
猎鹰（CrowdStrike）近日披露一枚高危漏洞，漏洞编号**CVE-2026-40050**  
，影响其本地化部署版 LogScale 产品。该漏洞属于**未授权路径遍历漏洞**  
，远程攻击者可在无需认证的情况下读取服务器文件系统中的任意文件。  
  
这家网络安全厂商发布的安全公告表示：“CrowdStrike 已发布安全更新，修复 LogScale 中一处高危未授权路径遍历漏洞。本次漏洞仅需特定本地化部署版本的用户进行修复，**不影响新一代 SIEM 订阅用户**  
。该缺陷存在于某一特定集群 API 接口，若接口对外暴露，远程攻击者可无认证读取服务器本地任意文件。”  
  
CrowdStrike LogScale 是一款日志管理与可观测性平台，助力企业实时采集、检索并分析海量机器数据。该平台可接入各类系统、应用、云服务及安全设备日志，依托高性能索引架构实现秒级日志检索，对需要快速研判告警与安全事件的安全运营中心（SOC）尤为关键。  
  
CrowdStrike 确认，新一代 SIEM 用户不受此漏洞影响。LogScale 云端 SaaS 用户已于 2026 年 4 月 7 日通过全集群网络层防护策略完成加固。目前厂商暂未监测到该漏洞的野外利用攻击。但**自建部署版 LogScale 用户需紧急升级至修复版本**  
。该漏洞由厂商内部持续产品测试发现，体现了其主动安全监测能力。安全防御类平台本身是攻击者的高价值目标。  
  
LogScale 这类安全工具在企业架构中拥有高权限地位。因其核心枢纽属性，这类产品的漏洞危害远高于普通应用。本次路径遍历漏洞，可能导致配置文件、账号凭证、内部敏感数据泄露。  
  
防御类安全软件的安全加固标准，应与它所防护的业务系统保持一致。业界普遍存在固有认知：安全产品天生更安全、抗攻击能力更强。但实际上，安全软件同样会出现代码漏洞、设计缺陷与配置隐患，一旦被利用，造成的后果往往更为严重。  
  
监控与检测类平台的漏洞风险尤为致命，会直接削弱企业安全可视能力。攻击者一旦攻陷此类系统，可关闭告警、篡改屏蔽日志、潜伏监听安全运营行为而不被发现，甚至以此为跳板提权、在内网横向移动。  
  
因此，防御类安全设施的及时补丁更新与常态化漏洞管理至关重要。企业往往优先修复操作系统、Web 应用、对外暴露服务，却忽视安全基础设施，而这类设备理应获得更高优先级防护。若威胁检测工具自身失陷，整体安全防御体系将彻底失效。  
  
本次 CrowdStrike 漏洞事件也体现了现代安全机制的积极一面：漏洞由厂商内部发现并通过合规流程负责任披露，反映其成熟的安全开发规范，大幅降低了攻击者提前掌握并利用漏洞的风险。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
