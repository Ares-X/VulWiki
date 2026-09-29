---
cve: "CVE-2026-23899"
source: "gelusus/wxvl 公众号漏洞文库"
---

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
