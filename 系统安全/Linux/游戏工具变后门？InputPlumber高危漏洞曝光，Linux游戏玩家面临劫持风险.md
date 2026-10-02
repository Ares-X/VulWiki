---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2025-66005;CVE-2025-14338"
identifier_role: "primary"
primary_identifiers: "CVE-2025-66005;CVE-2025-14338"
referenced_identifiers: ""
identifier_status: "unknown"
title: "游戏工具变后门？InputPlumber高危漏洞曝光，Linux游戏玩家面临劫持风险"
product: "InputPlumber D-Bus服务"
record_type: "roundup"
document_type: "双漏洞新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "本地任意用户可达服务；缺授权或Polkit unix-process竞态；称0.69.0和SteamOS3.7.20修复"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/%E6%B8%B8%E6%88%8F%E5%B7%A5%E5%85%B7%E5%8F%98%E5%90%8E%E9%97%A8%EF%BC%9FInputPlumber%E9%AB%98%E5%8D%B1%E6%BC%8F%E6%B4%9E%E6%9B%9D%E5%85%89%EF%BC%8CLinux%E6%B8%B8%E6%88%8F%E7%8E%A9%E5%AE%B6%E9%9D%A2%E4%B8%B4%E5%8A%AB%E6%8C%81%E9%A3%8E%E9%99%A9.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-62d6fd3e0e7b0a9d941fda94"
entity_id: "ve-62d6fd3e0e7b0a9d941fda94"
schema_version: "1"
---

# 游戏工具变后门？InputPlumber高危漏洞曝光，Linux游戏玩家面临劫持风险

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：InputPlumber D-Bus服务
- 文献类型：双漏洞新闻
- 版本、权限及部署边界：本地任意用户可达服务；缺授权或Polkit unix-process竞态；称0.69.0和SteamOS3.7.20修复
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. frontmatter漏第二CVE；服务未鉴权与后续Polkit竞态不同根因需分实体/补丁链
2. 标题后门是夸张，漏洞不证明故意后门；输入注入通常取得活动会话用户权限不自动root
3. 不配置Polkit的构建与存在竞态的构建须分版本/编译条件，不统称一状态
4. 没有SUSE原报告/上游公告直链，资讯仅securityonline名；修复版本/各行为需核验
5. 正文方法/影响有用，但没有PoC，按新闻保留；清理点赞推广

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

看雪学苑  看雪学苑   2026-01-12 09:59  
  
近日，一款旨在提升Linux游戏体验的实用工具被曝出存在严重安全漏洞，可能允许本地攻击者劫持用户会话或导致系统崩溃。SUSE安全团队发布报告指出，用于在SteamOS等环境中整合输入设备的工具InputPlumber，其早期版本几乎完全开放，极易遭受攻击。  
  
  
这些漏洞编号为CVE-2025-66005和CVE-2025-14338，根源在于该工具未能正确验证与其D-Bus服务交互的用户身份。由于InputPlumber以root（超级用户）权限运行，这一疏漏直接开辟了权限提升的路径。  
  
  
问题是在SUSE一次例行软件包审查中被发现的。报告指出，InputPlumber“主要用于Linux游戏场景，是SteamOS的一部分”，它对外提供了一个用于管理设备的D-Bus系统服务，但安全团队发现其“门禁大开”。  
  
  
报告称：“我们审查的第一个InputPlumber版本完全缺乏客户端身份验证，因此我们拒绝了它。”  
  
  
即便在后续尝试添加Polkit（权限管理系统）认证后，实现仍然存在缺陷。审查发现“Polkit支持仅是一个编译时功能……且默认被禁用”，这意味着分发的二进制程序通常根本没有任何保护。此外，该实现还存在一个竞争条件漏洞，即CVE-2025-14338，历史上与不安全地使用“unix-process”这一Polkit认证主体有关。  
  
  
有效身份验证的缺失意味着“系统内所有用户都可以访问所有InputPlumber的D-Bus方法”。这种暴露允许攻击者通过`CreateTargetDevice`和`CreateCompositeDevice`等方法发动危险攻击。  
  
  
研究人员演示，攻击者可以创建一个虚拟键盘，并将按键输入注入到另一用户的会话中。报告警告称：“系统中的任何用户都可以向活跃的桌面会话或活动的登录终端屏幕注入输入，可能导致在当前登录用户上下文中的任意代码执行。”  
  
  
此外，`CreateCompositeDevice`方法可能被滥用于检查特权文件是否存在，或通过将其解析为配置文件来泄露其内容。研究人员指出：“该方法允许信息泄露，例如泄露`/root/.bash_history`的内容”，错误信息会显示敏感文件内容。  
  
  
经过协调披露流程，上游开发者已发布补丁。InputPlumber v0.69.0版本通过默认启用Polkit授权并切换到安全的认证主体，修复了这些漏洞。  
  
  
用户应立即升级。报告确认，“SteamOS也已发布了包含修复程序的新版镜像，版本号为3.7.20”。Linux游戏玩家及SteamOS用户应尽快检查系统更新，确保安全。  
  
  
  
资讯来源  
：  
securityonline.info  
  
转载请注明出处和本文链接  
  
  
  
﹀  
  
﹀  
  
﹀  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/Uia4617poZXP96fGaMPXib13V1bJ52yHq9ycD9Zv3WhiaRb2rKV6wghrNa4VyFR2wibBVNfZt3M5IuUiauQGHvxhQrA/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球分享**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球点赞**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球在看**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
