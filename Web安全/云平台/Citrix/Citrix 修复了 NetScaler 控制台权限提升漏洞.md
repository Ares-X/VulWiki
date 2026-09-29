---
cve: "CVE-2024-12284"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Citrix 修复了 NetScaler 控制台权限提升漏洞   
鹏鹏同学  黑猫安全   2025-02-21 06:05  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/8dBEfDPEce9Y0U0UUkU9ibec9VSJAnicyibickmUwOj8VOFZA1icxpRXIcROAtt9Iq6VGSjHNPBy6tZicyJ9hQic37noQ/640?wx_fmt=png&from=appmsg "")  
  
Citrix发布了安全更新，以解决一个高危安全漏洞（CVE-2024-12284，CVSS评分8.8），该漏洞影响NetScaler Console（前身为NetScaler ADM）和NetScaler Agent。  
  
此漏洞是权限管理不当，可能在特定条件下允许攻击者提升权限。安全公告指出：“在NetScaler Console（前身为NetScaler ADM）和NetScaler Agent中发现了一个漏洞。” 受影响的版本包括：NetScaler Agent 13.1（低于13.1-56.18）、NetScaler Console 14.1（低于14.1-38.53）、NetScaler Console 13.1（低于13.1-56.18）、NetScaler Agent 14.1（低于14.1-38.53）。  
  
Citrix指出，只有已认证并拥有NetScaler Console访问权限的用户才能利用此漏洞。“该问题源于权限管理不足，可能被已认证的恶意攻击者利用来执行未经授权的命令。但是，只有已认证并拥有NetScaler Console访问权限的用户才能利用此漏洞，因此威胁面仅限于已认证的用户。Cloud Software Group建议将外部身份验证配置为NetScaler Console的最佳实践。”NetScaler发布的安全公告中写道。“此外，对自托管NetScaler Console的潜在影响最小，因为NetScaler Agent已部署的当前前提条件显著降低了影响范围。”   
  
Cloud Software Group通过发布以下版本解决了此漏洞：NetScaler Console 14.1-38.53及更高版本；NetScaler Console 13.1-56.18及13.1的更高版本；NetScaler Agent 14.1-38.53及更高版本；NetScaler Agent 13.1-56.18及13.1的更高版本。建议客户尽快更新其版本，因为没有解决此漏洞的变通方法。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
