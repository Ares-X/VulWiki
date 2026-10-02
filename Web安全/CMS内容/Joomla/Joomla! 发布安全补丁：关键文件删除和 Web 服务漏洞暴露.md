---
cve: "CVE-2026-23899"
source: "gelusus/wxvl 公众号漏洞文库"
product: "Joomla CMS com_joomlaupdate/Web services"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-23898; CVE-2026-23899"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Joomla! 发布安全补丁：关键文件删除和 Web 服务漏洞暴露"
prerequisites: "来源所述条件，未列明部分仍待核：删除漏洞更新机制权限/配置与Web服务访问条件未详述"
side_effects: "未执行；本文需注意的操作影响：删除安全脚本绕过保护属于后续推断，未有链证明"
source_status: "unknown"
id: "vw-de964c6e22801587031ee717"
entity_id: "ve-de964c6e22801587031ee717"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：删除漏洞更新机制权限/配置与Web服务访问条件未详述

- **结论使用边界（1）**：frontmatter只23899遗漏同等主漏洞23898。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（2）**：将未经授权直接等同未经身份验证，可能混淆权限不足与无需登录，需官方公告核对。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（3）**：统一两漏洞版本范围/CVSS可能掩盖差异，应逐CVE关联；给两个官方安全公告直链值得保留。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **操作与副作用边界（4）**：删除安全脚本绕过保护属于后续推断，未有链证明。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Joomla! 发布安全补丁：关键文件删除和 Web 服务漏洞暴露  
sec随谈
                    sec随谈  sec随谈   2026-04-03 01:06  
  
Joomla! CMS 发布了一系列关键安全更新，以解决两个高危**漏洞**——CVE -2026-23898和CVE-2026-23899——这两个漏洞的 CVSSv4 评分均为 8.6。  
  
这些**缺陷**直接影响到平台的更新和 API 机制，攻击者可能利用这些缺陷破坏网站的完整性或访问受限数据。  
  
第一个**漏洞**CVE-2026-23898 存在于 com_joomlaupdate 组件中。由于自动更新服务器机制中缺乏基本的输入验证，攻击者可以触发服务器上任意文件的删除。  
  
攻击者可以通过删除关键配置文件或安全相关脚本，实现以下目标：  
- 使网站崩溃：删除必要的系统文件，导致网站立即停止服务。  
- 绕过保护：删除安全插件或 .htaccess 文件，为更具侵入性的二次攻击铺平道路。  
第二个威胁 CVE-2026-23899 涉及 Joomla Web 服务端点中不正确的访问检查。  
  
Web 服务旨在允许外部应用程序与内容管理系统 (CMS) 进行交互，但其安全防护本应十分严格。此漏洞允许未经授权的用户访问这些端点，实际上使未经身份验证的用户能够窥探本应由管理员访问的数据或功能。  
  
这些漏洞几乎影响所有现代版本的CMS。  
- 受影响的安装版本：Joomla! CMS 版本 4.0.0 至 5.4.3，以及 6.0.0 至 6.0.3。  
- 解决方案：强烈建议管理员立即升级到5.4.4或6.0.4版本，以修复这些安全漏洞。  
参考链接：  
  
https://developer.joomla.org/security-centre/1031-20260305-core-arbitrary-file-deletion-in-com-joomlaupdate.html  
  
https://developer.joomla.org/security-centre/1032-20260306-core-improper-access-check-in-webservice-endpoints.html  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
