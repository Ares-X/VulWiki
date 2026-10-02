---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "工作流接口没登录就能执行命令：Orkes漏洞已遭利用"
product: "Orkes Conductor CVE-2026-58138"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "合理区分扫描尝试与受害数、IP地理与归因、进程权限与root条件；Orkes商用与conductor-oss默认鉴权/任务类型配置应明确，不把所有Conductor接口都泛称无认证；关闭allowAllAccess/独立执行属于架构建议需具体版本支持"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E5%B7%A5%E4%BD%9C%E6%B5%81%E6%8E%A5%E5%8F%A3%E6%B2%A1%E7%99%BB%E5%BD%95%E5%B0%B1%E8%83%BD%E6%89%A7%E8%A1%8C%E5%91%BD%E4%BB%A4%EF%BC%9AOrkes%E6%BC%8F%E6%B4%9E%E5%B7%B2%E9%81%AD%E5%88%A9%E7%94%A8.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-0e64daf850f96409af24c267"
entity_id: "ve-0e64daf850f96409af24c267"
schema_version: "1"
---

# 工作流接口没登录就能执行命令：Orkes漏洞已遭利用

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Orkes Conductor CVE-2026-58138
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：合理区分扫描尝试与受害数、IP地理与归因、进程权限与root条件；Orkes商用与conductor-oss默认鉴权/任务类型配置应明确，不把所有Conductor接口都泛称无认证；关闭allowAllAccess/独立执行属于架构建议需具体版本支持
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 正文主CVE未入元数据
2. 3.21.21<=v<3.30.2及修复明确，有FortiGuard两篇/NVD/官方release精确来源
3. 合理区分扫描尝试与受害数、IP地理与归因、进程权限与root条件
4. Orkes商用与conductor-oss默认鉴权/任务类型配置应明确，不把所有Conductor接口都泛称无认证
5. 未给具体源码/请求是处置资讯非PoC，不必误标缺完整复现
6. 关闭allowAllAccess/独立执行属于架构建议需具体版本支持
7. 只查9月8–9日子进程遗漏更早8月已在野时段
8. 已有认证环境需另看表达式沙箱风险

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

原创 tcode
                    tcode  字节脉搏实验室   2026-09-20 02:33  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/nOo5YmK1PHzLF60TESibwuRG1rxJaDvWRLkBNy05x6uCDSJDKldml6h6JtQVkX9ibHviaTgsW5p8XA6IcTl9IHQHmudqsibYwqhAgwXvaGKYcvA/640?wx_fmt=png&from=appmsg "")  
  
  
    一个本应编排微服务和后台任务的工作流平台，被提交一段看起来像正常流程定义的JSON后，却可能在服务器上执行系统命令。Orkes Conductor的CVE-2026-58138正是这一类问题：无需登录，攻击者就能通过工作流API提交内联脚本表达式。公开漏洞利用代码在8月出现，Empirical Security在8月21日观察到实际攻击，Fortinet随后发布了持续利用告警。  
  
    漏洞并不新。Orkes在6月发布3.30.2时已经修复，NVD把3.21.21至3.30.2之前的版本列为受影响范围。风险在于修复公告、资产发现和公网暴露检查之间常常存在时间差。只要旧实例仍能被外部或应用网络访问，攻击者就不需要账号，也不需要欺骗管理员点击链接。  
  
    时间线：从修复到大规模尝试  
  
    从公开材料能重建出一条清楚的利用曲线。6月，Orkes发布3.30.2，修复未经认证的工作流表达式执行问题。8月初，针对漏洞的PoC公开。8月21日，安全研究机构观察到在野攻击。到9月8日至9日，Fortinet在两天内拦截约1,300次利用尝试；其后续告警还给出24小时1,290次、7天6,696次等遥测数据。  
  
    这些数字说明扫描和攻击尝试显著增加，但不能直接换算成受害组织数量。被防火墙拦截的请求不等于成功执行，来源IP所在国家也不等于攻击者身份。公开数据给出的来源地区包括德国、香港、印度尼西亚、阿联酋和印度，但把这些地区写成攻击来源或归因，会超出证据边界。  
  
    真正需要警惕的是攻击门槛。PoC出现后，攻击者不必理解整个工作流平台，只要找到未鉴权的API端点并提交预先构造的表达式即可尝试执行。对暴露在互联网上的实例，这会把漏洞从“内部系统缺陷”变成持续扫描目标。  
  
    为什么默认信任变成了执行通道  
  
    Conductor允许用户定义INLINE、LAMBDA、DO_WHILE和SWITCH等任务类型，其中可以包含JavaScript或Python表达式。正常情况下，这些表达式用于流程判断和数据处理，但底层GraalVM上下文如果配置为HostAccess.ALL或allowAllAccess，就会允许脚本访问Java运行时，进而反射调用系统能力或直接启动子进程。  
  
    问题不在于“工作流支持脚本”本身，而在于脚本执行边界没有被严格限制。攻击者可以把恶意表达式放进正常JSON结构，绕过只检查字段名称或流程格式的防护。服务端随后用Conductor进程的身份执行它。若服务以root运行，命令执行权限也随之为root；若它持有数据库、密钥管理或云API凭据，影响还会继续扩大。  
  
    开源版本默认没有强制认证，使预期中的“登录后使用”失效。很多团队把Conductor放在内网，认为反向代理、VPN或Kubernetes NetworkPolicy已经提供了保护。但如果代理没有鉴权，或者应用网络中的任意主机都能访问工作流API，未认证漏洞仍然可以从被攻陷的Web服务或开发机横向触发。  
  
    先封到达路径，再判断是否已被利用  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/nOo5YmK1PHy2srSKzJeBhNMOsKZuB2dN8Z6LbZtMaFfZ0UrwQbeEWsKd5XeJ04iabxbpq80eeMBTFWNTCHwL7BwDHFHIVtrCZekJoCicNGXwk/640?wx_fmt=png&from=appmsg "")  
  
    如果资产表里存在Conductor，第一步不是慢慢研究PoC，而是确认版本和网络路径。查询实际运行版本，低于3.30.2的实例先在网络层限制工作流API，只保留明确需要的调用方，同时安排升级。对暴露到互联网的实例，优先封堵比“先观察一天”更合理，因为攻击尝试和业务请求可以通过日志区分。  
  
    第二步是查服务账号的行为。查看Conductor进程是否启动了shell、curl、wget、Python、Node.js等非预期子进程，核对启动参数、父进程、工作目录和网络连接。攻击者成功执行命令后，往往会下载脚本、探测云元数据、读取环境变量或建立反向连接。若主机安全产品只记录了Conductor主进程，而忽略它的子进程，这条证据会被漏掉。  
  
    第三步是审计工作流提交记录。关注包含INLINE、LAMBDA、DO_WHILE或SWITCH任务的异常定义，尤其是短时间内创建、立即启动、随后删除的流程。还要对比调用者是否正常、来源IP是否属于API网关、任务表达式中是否出现系统命令、文件读取或网络请求。版本升级不会自动给出这些历史证据，日志留存必须提前开启。  
  
    第四步是评估凭据影响。如果Conductor服务账号能够访问数据库、对象存储、CI/CD、Kubernetes API或云平台，就要假设这些凭据可能已被读取。仅清理工作流文件不够，应轮换服务账号密钥和令牌，检查Kubernetes ServiceAccount、云审计日志与数据库连接来源。具体范围由实际权限决定，不能只凭主机没发现木马就下结论。  
  
    升级本身也有配置要点。3.30.2或更高版本修复了漏洞，但仍应限制表达式执行能力，关闭不必要的allowAllAccess，把需要脚本的任务放到隔离执行环境，并给API增加强制鉴权。若当前架构依赖内网信任，就应该把“谁能直接访问工作流API”写进网络策略并定期验证，而不是只画在架构图上。  
  
    外部扫描数据不能替代内部证据  
  
    Fortinet拦截6,696次尝试，是一个有价值的趋势信号，它说明攻击者正在主动寻找这个漏洞。但它不能回答三个内部问题：自己的实例是否在攻击路径上，是否有请求越过边界，以及是否有命令成功执行。只有服务日志、工作流记录、进程树和网络连接能回答这些问题。  
  
    目前可以确认的边界同样要保留：漏洞影响3.21.21至3.30.2之前的版本；修复版本是3.30.2；公开PoC和攻击尝试存在；机构报告的地理来源不能用于归因。公开材料没有给出成功受害组织的数量和名称，因此不应把扫描尝试写成大规模失陷。  
  
    遇到这种未认证RCE，最实用的顺序是“先减少可到达实例，再查成功痕迹，最后再分析攻击者是谁”。如果先花时间归因，攻击窗口不会因此暂停。封住接口、升级版本、清理子进程和轮换凭据，才是能改变风险状态的动作。  
  
    检查工作流平台时，可以直接问负责人：“请列出3.30.2之前的所有实例、工作流API的实际可达来源，以及9月8日至9日Conductor进程产生的子进程和异常流程提交记录。”只有版本、网络和主机三类证据都能闭环，才能判断漏洞是“曾经暴露”还是“已经执行”。  
  
    热点来源  
  
    来源：FortiGuard Outbreak Alert：Orkes Conductor RCE，https://www.fortiguard.com/outbreak-alert/orkes-conductor-rce  
  
    来源：FortiGuard Threat Signal：Orkes Conductor Evaluator RCE，https://fortiguard.fortinet.com/threat-signal-report/6527  
  
    来源：NVD：CVE-2026-58138，https://nvd.nist.gov/vuln/detail/CVE-2026-58138  
  
    来源：Orkes Conductor修复版本：v3.30.2，https://github.com/conductor-oss/conductor/releases/tag/v3.30.2  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
