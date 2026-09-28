---
cve: "CVE-2025-42989"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  SAP 2025年6月安全补丁日修复关键NetWeaver漏洞  
鹏鹏同学  黑猫安全   2025-06-12 01:20  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/8dBEfDPEceibIHGEHhMzClCFv0WQBE8TGbvCjae2LEklBZD5j4Pxu5LoiaicOE8JGXDbGFKRLibj6ZGy89uo6B0wrQ/640?wx_fmt=png&from=appmsg "")  
  
SAP 2025年6月安全补丁修复了关键NetWeaver漏洞（编号CVE-2025-42989，CVSS评分9.6），该漏洞可能导致攻击者绕过授权检查并提升权限。  
  
根据安全公告显示："RFC入站处理未对认证用户执行必要的授权检查，导致权限提升。成功利用此漏洞将严重影响应用程序的完整性和可用性。"该漏洞存在于SAP远程函数调用(RFC)框架中，允许经过认证的攻击者绕过关键检查机制，威胁系统完整性与可用性。  
  
安全公司Onapsis发布报告指出："SAP安全补丁#3600840（CVSS评分9.6）修复了SAP NetWeaver应用服务器AS ABAP中RFC框架的关键授权缺失漏洞。特定条件下，认证攻击者在使用事务型RFC(tRFC)或队列型RFC(qRFC)时可绕过S_RFC授权对象检查，实现权限提升，从而严重影响应用程序完整性和可用性。"  
  
2025年6月安全补丁日共修复了5个高危漏洞：  
1. CVE-2025-42982（CVSS 8.8）- SAP GRC（AC插件）信息泄露  
  
1. CVE-2025-42983（CVSS 8.5）- SAP商务仓库及插件基础模块授权缺失  
  
1. CVE-2025-23192（CVSS 8.2）- SAP商务对象BI工作区跨站脚本(XSS)漏洞  
  
1. CVE-2025-42977（CVSS 7.6）- SAP NetWeaver Visual Composer目录遍历漏洞  
  
1. CVE-2025-42994（CVSS 7.5）- SAP MDM服务器多重漏洞  
  
此外，这家软件巨头还修复了6个中危漏洞和2个低危漏洞。SAP发布的公告中未提及上述漏洞已被利用的情况。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
