---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-64289aa69dbf6205b5aed30a"
entity_id: "ve-64289aa69dbf6205b5aed30a"
schema_version: "1"
title: "Cisco Webex 漏洞可让黑客通过会议链接获取代码执行权限"
product: "Cisco Webex App（主）；Secure Network Analytics / Nexus Dashboard / CSLU（关联）"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-20236"
referenced_identifiers: "CVE-2025-20178; CVE-2025-20150; CVE-2024-20439"
prerequisites: "需用户点击会议链接并下载文件，以用户权限执行；无版本表"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/Cisco%20Webex%20%E6%BC%8F%E6%B4%9E%E5%8F%AF%E8%AE%A9%E9%BB%91%E5%AE%A2%E9%80%9A%E8%BF%87%E4%BC%9A%E8%AE%AE%E9%93%BE%E6%8E%A5%E8%8E%B7%E5%8F%96%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%9D%83%E9%99%90.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Cisco Webex 漏洞可让黑客通过会议链接获取代码执行权限   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cisco Webex App（主）；Secure Network Analytics / Nexus Dashboard / CSLU（关联）
- 本文讨论：CVE-2025-20236
- 版本、权限与配置前提：需用户点击会议链接并下载文件，以用户权限执行；无版本表
- 资料类型：多漏洞新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- Webex客户端误归网络设备；不能省略用户交互前提
- 只列BleepingComputer名称而无具体来源URL
- 无受影响/修复版本；跨所有OS影响断言待官方确认

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 平台范围、修复版本未验证
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Rhinoer  犀牛安全   2025-05-05 16:00  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qvpgicaewUBkQ5YJHoFGVzHoiaXZ3e8hBq65voCFBvQIDKRROicYEZzaIqbrp1ta5Rw0xTr5GPjKriarhsQ1ojRO8g/640?wx_fmt=png&from=appmsg "")  
  
思科发布了针对高严重性 Webex 漏洞的安全更新，该漏洞允许未经身份验证的攻击者使用恶意会议邀请链接获取客户端远程代码执行。  
  
该安全漏洞编号为 CVE-2025-20236，是在 Webex 自定义 URL 解析器中发现的，可通过诱骗用户下载任意文件来利用该漏洞，从而使攻击者能够在低复杂度攻击中在运行未修补软件的系统上执行任意命令。  
  
思科在本周发布的安全公告中解释道： “此漏洞是由于 Cisco Webex App 处理会议邀请链接时输入验证不足造成的。”  
  
攻击者可以通过诱骗用户点击精心设计的会议邀请链接并下载任意文件来利用此漏洞。成功利用此漏洞可使攻击者以目标用户的权限执行任意命令。  
  
无论操作系统或系统配置如何，此安全漏洞都会影响 Cisco Webex App 的安装。目前尚无解决方法，因此需要更新软件来阻止潜在的漏洞利用尝试。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qvpgicaewUBkQ5YJHoFGVzHoiaXZ3e8hBqoVaCQGw5wPJ0C8BUhCppDS3ibDVQibzyhibaN8UJuiaA6kIs8CjibgRqWNA/640?wx_fmt=png&from=appmsg "")  
  
本周，思科还发布了针对安全网络分析基于 Web 的管理界面中的权限提升漏洞（ CVE-2025-20178 ）的安全补丁，该漏洞可以让具有管理员凭据的攻击者以 root 身份运行任意命令。  
  
思科还解决了 Nexus Dashboard 漏洞（CVE-2025-20150），该漏洞允许未经身份验证的攻击者远程枚举 LDAP 用户帐户并确定哪些用户名有效。  
  
然而，该公司的产品安全事件响应小组 (PSIRT) 没有发现任何野外概念验证漏洞，也没有发现任何证据表明存在针对未修复本周三安全漏洞的系统进行恶意活动。  
  
本月初，思科还警告管理员修补一个关键的思科智能许可实用程序 (CSLU) 静态凭证漏洞 (CVE-2024-20439)，该漏洞暴露了一个内置的后门管理员帐户，目前正被积极利用进行攻击。  
  
3 月底，CISA 将 CVE-2024-20439 漏洞添加到其已知被利用漏洞目录中，并命令美国联邦机构在 4 月 21 日之前的三周内保护其网络免受持续攻击。  
  
  
信息来源：  
BleepingComputer  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
