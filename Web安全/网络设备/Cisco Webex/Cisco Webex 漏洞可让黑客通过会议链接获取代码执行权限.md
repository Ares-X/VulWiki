---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Cisco Webex 漏洞可让黑客通过会议链接获取代码执行权限   
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
