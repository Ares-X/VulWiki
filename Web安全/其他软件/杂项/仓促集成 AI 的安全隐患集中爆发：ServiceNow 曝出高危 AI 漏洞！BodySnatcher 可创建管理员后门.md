---
cve: "CVE-2025-12420"
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "仓促集成 AI 的安全隐患集中爆发：ServiceNow 曝出高危 AI 漏洞！BodySnatcher 可创建管理员后门"
product: "ServiceNow BodySnatcher CVE-2025-12420"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "说明Auto-Linking邮箱+通用MessageAuth令牌+激活RecordManagementAgent+确认链，需明确插件版本/默认令牌未换等适用条件，非所有实例无凭据；首修5.1.18/5.2.19及3.15.2/4.0.4需分维护分支，不是任一大于小版本均安全；监督模式请继续不是独立认证绕过，根因仍身份与权限链"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E4%BB%93%E4%BF%83%E9%9B%86%E6%88%90%20AI%20%E7%9A%84%E5%AE%89%E5%85%A8%E9%9A%90%E6%82%A3%E9%9B%86%E4%B8%AD%E7%88%86%E5%8F%91%EF%BC%9AServiceNow%20%E6%9B%9D%E5%87%BA%E9%AB%98%E5%8D%B1%20AI%20%E6%BC%8F%E6%B4%9E%EF%BC%81BodySnatcher%20%E5%8F%AF%E5%88%9B%E5%BB%BA%E7%AE%A1%E7%90%86%E5%91%98%E5%90%8E%E9%97%A8.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-2eae0ccce63cd111a10db251"
entity_id: "ve-2eae0ccce63cd111a10db251"
schema_version: "1"
---

# 仓促集成 AI 的安全隐患集中爆发：ServiceNow 曝出高危 AI 漏洞！BodySnatcher 可创建管理员后门

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：ServiceNow BodySnatcher CVE-2025-12420
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：说明Auto-Linking邮箱+通用MessageAuth令牌+激活RecordManagementAgent+确认链，需明确插件版本/默认令牌未换等适用条件，非所有实例无凭据；首修5.1.18/5.2.19及3.15.2/4.0.4需分维护分支，不是任一大于小版本均安全；监督模式请继续不是独立认证绕过，根因仍身份与权限链
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 说明Auto-Linking邮箱+通用MessageAuth令牌+激活RecordManagementAgent+确认链，需明确插件版本/默认令牌未换等适用条件，非所有实例无凭据
2. 首修5.1.18/5.2.19及3.15.2/4.0.4需分维护分支，不是任一大于小版本均安全
3. 10月底/上周与2026-03发布日期相对时间无年份易错
4. 称自托管更新、补丁仅删示例Agent但仍危险配置均未给ServiceNow/AppOmni直链需核
5. 监督模式请继续不是独立认证绕过，根因仍身份与权限链
6. 无代码/请求属分析新闻，不应称已复現
7. 最严重AI漏洞/仓促必然结果为观点

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 安全牛   2026-03-06 05:38  
  
**点击蓝字 关注我们**  
  
  
  
当前，AI 智能体已成为软件与 SaaS 企业产品升级的热门方向，然而在快速落地的背后，攻击面持续扩张，安全风险亦暗流涌动。全球知名企业服务平台ServiceNow近期披露的 BodySnatcher(CVE-2025-12420)高危漏洞，正是企业仓促集成 AI 智能体的典型安全警示 —— 该漏洞可使未授权攻击者直接操控企业 AI 工具，甚至创建具备管理员权限的后门账户，堪称迄今已发现的最严重 AI 驱动型安全漏洞之一。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wKeDC5RjIzEwd0SP65x5exgWaYmu66yLEgypQxlthVXgDTGMZRHqJkL2YO7qmxGM8ZgzClrwdeJV1XrRDlc4bKjTgKHqs5UrQLKeibbQicec4/640?wx_fmt=png&from=appmsg "")  
  
  
**一、BodySnatcher 漏洞危害几何？未授权亦可提权并植入后门**  
  
该漏洞由安全厂商 AppOmni 研究人员发现并命名，主要影响 ServiceNow 的 Now Assist AI Agents 与 Virtual Agent API 应用。其核心问题在于权限控制与身份验证逻辑存在双重缺陷，致使无权限攻击者能够以任意用户权限执行智能体工作流。  
  
  
在默认配置的 Now Assist 实例中，攻击者借助该漏洞可轻易创建管理员后门账户，实现对企业 ServiceNow 平台的深度管控。研究人员表示，BodySnatcher 漏洞的出现，重新定义了现代 SaaS 平台中 AI 智能体相关安全漏洞的典型形态，攻击者可借此远程控制企业 AI，将本应简化企业流程的工具异化为攻击武器。  
  
  
值得关注的是，ServiceNow 虽已于 10 月底完成托管实例的漏洞修复，并为自托管实例用户提供更新包，但相关安全公告与漏洞细节直至上周才正式公开。官方明确指出，用户需将 Now Assist AI Agents 升级至 5.1.18、5.2.19 及以上版本，Virtual Agent API 升级至 3.15.2、4.0.4 及以上版本，方可规避基础风险。  
  
  
然而修复并非一劳永逸。AppOmni 指出，本次官方更新仅通过移除 Now Assist 默认安装的示例 AI 智能体，阻断了漏洞的验证利用方式，而引发漏洞的危险配置逻辑，仍可能潜藏于企业自定义代码或第三方集成场景中，后续安全风险依然存在。  
  
  
**二、漏洞利用全链路：从身份仿冒到 AI 提权，三步获取管理员权限**  
  
BodySnatcher 的完整利用链，围绕 ServiceNow Virtual Agent API 的设计缺陷展开，从基础身份仿冒到智能体交互执行，每一步均直击平台安全薄弱环节，且利用条件并不严苛。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wKeDC5RjIzEETfFVebgTWNyOeqic50Of7ZR6Dia64O65NKXWgNJmjLmXW7UkrtzHmFvP9I9wmLNI2F6rmBnNPCUR94zINvU486scjCoWSkeyw/640?wx_fmt=png&from=appmsg "")  
  
  
  
**第一步：借助 Auto-Linking 轻松仿冒任意用户**  
  
Virtual Agent API 是 ServiceNow 用于对接外部聊天界面、机器人的核心接口，其默认采用的 Auto-Linking 身份验证机制，仅通过邮箱即可完成外部发送者与平台内用户账户的绑定。加之用于验证的静态 Message Auth 令牌在所有启用实例中通用，攻击者只需获取目标用户邮箱与令牌，即可实现未授权身份仿冒。  
  
  
此时攻击者虽仅能开展钓鱼类攻击（如冒充可信用户向 IT 支持人员发送消息），但已为后续权限提升奠定基础。  
  
  
  
**第二步：绕过认证调用高权限 AI 智能体**  
  
为实现外部 AI 智能体与内部智能体的交互执行，ServiceNow 新增一套需认证的 REST API，但该接口本质是原有 Virtual Agent API 的上层封装，会将请求转换为后者格式并触发 AI 智能体执行。  
  
  
这一设计使得新接口的认证要求形同虚设 —— 攻击者可通过未授权的 Virtual Agent API 直接调用平台内 AI 智能体，且打破了 “智能体需部署至启用 Now Assist 的渠道方可执行” 的常规认知，只要智能体处于激活状态，即可通过特定工作流直接调用。  
  
  
Now Assist 默认搭载的 Record Management AI Agent，成为攻击者的关键跳板：该智能体可在平台任意数据表中创建记录，且在所有部署实例中使用相同唯一 ID，为攻击者提供了通用的高权限操作入口（目前该智能体已被官方移除）。  
  
  
  
**第三步：绕过确认机制创建管理员后门**  
  
该 AI 智能体虽处于监督模式，执行任务前会要求请求者确认，但攻击者直接向 API 发送请求时并不会收到确认提示。研究人员发现，仅需等待数秒后发送 “请继续” 指令，即可被智能体判定为授权确认。  
  
  
借助该漏洞，攻击者可仿冒管理员调用 Record Management AI Agent，创建由自身控制邮箱的新用户并分配管理员角色，随后通过常规密码重置流程设置新密码，最终获得具备完整管理员权限的后门账户，实现对平台的长期控制。  
  
  
**三、不止 ServiceNow：AI 智能体的安全风险应如何防范？**  
  
BodySnatcher 并非个例，而是企业大规模集成 AI 智能体过程中重功能、轻安全的必然结果。当越来越多企业借助 SaaS 厂商的 AI 智能体工具或自研智能体实现流程自动化时，过度授权、身份验证逻辑缺陷等问题，正成为新的安全重灾区。  
  
  
针对本次漏洞，AppOmni 为 ServiceNow 管理员与安全团队提供了一系列可落地的防护建议，同时也为所有企业集成 AI 智能体提供了通用安全思路：  
  
**1. 强化身份验证，完善 MFA 落地细节：**  
为所有 Virtual Agent API 调用方启用账户链接多因素认证（MFA），并非简单开启功能，需确保对应脚本包含 MFA 挑战的执行与验证逻辑，避免防护流于形式。  
  
  
**2. 严控自定义智能体，建立审批机制：**  
在 AI Control Tower 中启用 AI 管家审批功能，所有自研自定义智能体必须经过安全审查与审批，确保权限与业务需求匹配，杜绝过度授权。  
  
  
**3. 定期清理闲置智能体，缩减攻击面：**  
对平台内激活但未实际使用的 AI 智能体进行定期审查与禁用，避免攻击者利用此类 “沉睡智能体” 发起同类攻击。  
  
  
**4. 排查自定义代码与第三方集成：**  
围绕本次漏洞的核心危险配置，全面检查企业自定义代码与第三方集成方案，及时修复身份验证、权限控制层面的逻辑缺陷。  
  
  
**四、写在最后：AI 集成，安全应与功能同步落地**  
  
从 ServiceNow 的 BodySnatcher 漏洞不难看出，AI 技术在企业服务领域的落地，不能只追求速度与功能，而忽视底层安全设计。AI 智能体作为可执行高权限操作的自动化工具，本身便是一把双刃剑，若缺乏完善的权限管控、身份验证与监督机制，极易成为攻击者的突破口。  
  
  
对企业而言，无论是使用第三方 SaaS 平台的 AI 功能，还是自研智能体工具，都应将安全评估贯穿集成与开发全流程：明确智能体权限边界，建立严格的身份验证与审批机制，定期开展安全测试，及时修复潜在漏洞。  
  
  
对 SaaS 厂商而言，仓促将 AI 功能推向市场，不仅会给用户带来安全损失，更会损耗自身品牌信任。唯有将安全设计融入 AI 产品底层架构，在功能迭代的同时同步完善安全防护，才能让 AI 真正成为企业发展的助力，而非隐患。  
  
  
在 AI 快速普及的当下，安全永远是技术落地的前提。本次 BodySnatcher 漏洞既是一次行业警钟，也为 AI 智能体安全建设吹响了号角 —— 切勿因仓促集成，让 AI 成为企业网络安全的阿喀琉斯之踵。  
  
  
  
  
  
**相关阅读**  
  
[工信部：关于防范Microsoft Office安全功能绕过高危漏洞的风险提示；网络攻击新手法：签名合法驱动被利用，59款EDR/防护软件遭终止| 牛览](https://mp.weixin.qq.com/s?__biz=MjM5Njc3NjM4MA==&mid=2651140430&idx=2&sn=d946d3717568d28c0fee5e3d00dcf40c&scene=21#wechat_redirect)  
  
  
[爆红即“暴雷”？Moltbot（Clawdbot）热捧背后，无数账号正在裸奔](https://mp.weixin.qq.com/s?__biz=MjM5Njc3NjM4MA==&mid=2651140391&idx=1&sn=385ab3902375ccf3a5aef234828f0cfe&scene=21#wechat_redirect)  
  
  
[微软Copilot AI漏洞争议：安全边界还是已知局限？](https://mp.weixin.qq.com/s?__biz=MjM5Njc3NjM4MA==&mid=2651140254&idx=1&sn=78580c6e6aa28c4f39a52ebc67aaf542&scene=21#wechat_redirect)  
  
  
  
  
  
**联系我们**  
  
合作电话：18610811242  
  
合作微信：aqniu001  
  
联系邮箱：bd@aqniu.com  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/wKeDC5RjIzGbRydFXEGWsw145MR2RnhNZiaIUITkdpxZ805FlKY2SJl6GrSELGHdHkpdMpSeB8F42aSI8eyyicIlm1V0O2XmShPwarauoniaOk/640?wx_fmt=gif&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
