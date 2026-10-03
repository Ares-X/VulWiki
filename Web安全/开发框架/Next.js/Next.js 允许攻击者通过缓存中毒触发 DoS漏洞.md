---
cve: "CVE-2025-49826"
source: "gelusus/wxvl 公众号漏洞文库"
product: "Next.js/204缓存投毒DoS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2025-49826"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Next.js 允许攻击者通过缓存中毒触发 DoS漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：>=15.1.0 <15.1.8；Vercel托管不受影响为文中声明"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-240fa97369adf2312c27cffd"
entity_id: "ve-240fa97369adf2312c27cffd"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&gt;=15.1.0 &lt;15.1.8；Vercel托管不受影响为文中声明

代码与实验材料：无请求或实验，描述ISR/SSR/CDN条件有逻辑歧义

来源证据范围：转载明确称无法找到真正来源，无Vercel直接链接

- **适用与权限边界（1）**：把替代条件写为必须全部满足；依据：要求路由既ISR缓存重新验证又SSR且CDN缓存204，需核公告中的and/or关系。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（2）**：误译运行模式；依据：next start被译为下次启动，降低部署前提准确性。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（3）**：降级建议不应等同安全修复；依据：建议早期版本确保15.0.4或更低，未考虑其他漏洞或支持状态。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Next.js 允许攻击者通过缓存中毒触发 DoS漏洞  
 网安百色   2025-07-06 11:31  
  
已在流行的基于 React 的 Web 框架 Next.js 中发现并解决了一个名为 CVE-2025-49826 的严重漏洞。  
  
根据 Vercel 的一份报告，该漏洞存在于 >=15.1.0 和 <15.1.8 版本中，允许攻击者利用缓存中毒错误，可能导致受影响的应用程序出现拒绝服务 （DoS） 情况。  
  
<table><thead><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong msttexthash="7326319" msthash="35" style="box-sizing: border-box;font-weight: bold;"><span leaf="">CVE 编号</span></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong msttexthash="19282198" msthash="36" style="box-sizing: border-box;font-weight: bold;"><span leaf="">受影响的版本</span></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong msttexthash="4044495" msthash="37" style="box-sizing: border-box;font-weight: bold;"><span leaf="">严厉</span></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong msttexthash="4085822" msthash="38" style="box-sizing: border-box;font-weight: bold;"><span leaf="">冲击</span></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong msttexthash="11081083" msthash="39" style="box-sizing: border-box;font-weight: bold;"><span leaf="">固定位置</span></strong></td></tr></thead><tbody><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">漏洞：CVE-2025-49826</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">&gt;=15.1.0 &lt;15.1.8</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">7.5</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">通过缓存中毒进行 DoS</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">15.1.8</span></section></td></tr></tbody></table>

## 技术细节  
  
该漏洞是由于在某些缓存场景中未正确处理 HTTP 204 响应所致。  
  
在特定条件下，可以为静态页面缓存 204 No Content 响应。  
  
缓存后，此空响应将提供给所有尝试访问受影响页面的用户，从而有效地使内容无法访问并导致服务中断。  
  
要利用漏洞，必须满足以下所有条件：  
- 应用程序运行的是受影响的 Next.js 版本（>=15.1.0、<15.1.8）。  
  
- 路由在下次启动或独立模式下使用增量静态重新生成 （ISR） 的缓存重新验证。  
  
- 该路由使用服务器端渲染 （SSR），并且位于配置为缓存 204 个响应的 CDN 后面。  
  
值得注意的是，在 Vercel 上托管的客户不受此问题的影响。  
  
如果被利用，该漏洞可能允许攻击者使用 204 响应使缓存中毒。  
  
这将导致所有后续用户收到空响应，从而导致受影响的静态页面或 SSR 页面被拒绝服务。该问题的 CVSS 评分为 7.5，表明严重性较高。  
  
Next.js 团队迅速做出了回应：  
- 删除可能在缓存中设置 204 响应的问题代码路径。  
  
- 通过不再依赖共享响应对象来填充缓存来消除争用条件。  
  
此修复已在版本 15.1.8 中发布。强烈建议运行 15.1.0 和 15.1.7 之间 Next.js 的自托管或本地部署的用户立即升级。  
  
使用早期主要版本的用户应确保其版本为 15.0.4 或更低版本。  
- 将 Next.js 升级到版本 15.1.8 或更高版本。  
  
- 查看 CDN 配置以确保不会为关键路由缓存 204 响应。  
  
- 监控应用程序日志中的异常 HTTP 204 响应。  
  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo5lNbibXUkeIxDGJmD2Md5vKicbNtIkdNvibicL87FjAOqGicuxcgBuRjjolLcGDOnfhMdykXibWuH6DV1g/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
