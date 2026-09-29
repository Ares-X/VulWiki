---
cve: "CVE-2026-2441"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  美国网络安全和基础设施安全局 (CISA) 警告：谷歌 Chromium 零日漏洞已被积极用于攻击  
原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-02-19 00:02  
  
紧急警告：谷歌 Chromium 中新发现的零日漏洞已被证实正在被恶意利用。  
  
该漏洞编号为 CVE-2026-2441，影响Chromium 的 CSS（层叠样式表）引擎，并可能使远程攻击者能够在受害者的系统上执行任意代码。  
  
根据 2026 年 2 月 17 日发布的公告，该漏洞利用涉及 Chromium CSS 处理中的释放后使用情况，这可能会导致堆损坏。  
  
攻击者可以通过精心制作的 HTML 网页利用此漏洞，在毫无戒心的用户访问恶意或被入侵的网站时，可能会危及系统安全。  
  
CISA 将 CVE-2026-2441 添加到其已知利用漏洞 (KEV) 目录中，强调了各组织立即采取缓解措施的紧迫性。  
  
<table><thead style="box-sizing: border-box;border-bottom-width: 3px;border-bottom-style: solid;border-bottom-color: currentcolor;"><tr style="box-sizing: border-box;"><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">CVE ID</font></font></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">概括</font></font></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">CWE</font></font></th></tr></thead><tbody style="box-sizing: border-box;"><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">CVE-2026-2441</font></font></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">Google Chromium CSS 引擎中的“释放后使用”功能可能允许通过精心构造的 HTML 远程执行代码（影响 Chrome、Edge、Opera）。</font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">CWE-416</font></font></td></tr></tbody></table>  
该机构还强调，这种类型的漏洞可能会影响多个依赖 Chromium 引擎的网络浏览器，包括 Google Chrome、Microsoft Edge、Brave 和 Opera。  
  
虽然目前尚未有已确认的勒索软件或大规模攻击活动报告，但将其纳入 KEV 目录表明威胁情报合作伙伴正在追踪现实世界中的攻击。  
  
谷歌已发布针对基于 Chromium 内核浏览器的稳定版更新，修复了该漏洞。用户和管理员务必立即更新系统。  
  
CISA 建议将缓解活动与具有约束力的操作指令 (BOD) 22-01 保持一致，该指令要求联邦民事机构在规定的期限内修补被利用的漏洞。  
  
无法及时应用厂商补丁的组织应考虑暂时关闭受影响的组件并检查 Chromium 配置。  
  
加强对终端的监控，以发现可疑的浏览器行为迹象，例如从浏览器会话中生成的无法识别的进程。  
  
CISA 的警告再次凸显了针对广泛使用的软件组件的零日漏洞持续存在的趋势。  
  
这些漏洞会带来重大风险，尤其对于每天处理不受信任的网络内容的浏览器而言更是如此。保持基于 Chromium 的应用程序更新仍然是抵御此类攻击最有效的防御措施之一。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
