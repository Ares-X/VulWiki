---
cve: "CVE-2025-66005"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  游戏工具变后门？InputPlumber高危漏洞曝光，Linux游戏玩家面临劫持风险  
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

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
