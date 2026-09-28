---
cve: "CVE-2025-49826"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Next.js 允许攻击者通过缓存中毒触发 DoS漏洞  
 网安百色   2025-07-06 11:31  
  
已在流行的基于 React 的 Web 框架 Next.js 中发现并解决了一个名为 CVE-2025-49826 的严重漏洞。  
  
根据 Vercel 的一份报告，该漏洞存在于 >=15.1.0 和 <15.1.8 版本中，允许攻击者利用缓存中毒错误，可能导致受影响的应用程序出现拒绝服务 （DoS） 情况。  
  
<table><thead><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong msttexthash="7326319" msthash="35" style="box-sizing: border-box;font-weight: bold;"><span leaf="">CVE 编号</span></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong msttexthash="19282198" msthash="36" style="box-sizing: border-box;font-weight: bold;"><span leaf="">受影响的版本</span></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong msttexthash="4044495" msthash="37" style="box-sizing: border-box;font-weight: bold;"><span leaf="">严厉</span></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong msttexthash="4085822" msthash="38" style="box-sizing: border-box;font-weight: bold;"><span leaf="">冲击</span></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong msttexthash="11081083" msthash="39" style="box-sizing: border-box;font-weight: bold;"><span leaf="">固定位置</span></strong></td></tr></thead><tbody><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">漏洞：CVE-2025-49826</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">&gt;=15.1.0 &lt;15.1.8</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">7.5</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">通过缓存中毒进行 DoS</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">15.1.8</span></section></td></tr></tbody></table>## 技术细节  
  
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
