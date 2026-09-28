---
cve: "CVE-2025-32819"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  网络安全厂商SonicWall修复SMA 100系列设备高危漏洞 攻击者可组合利用执行任意代码   
鹏鹏同学  黑猫安全   2025-05-11 23:00  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/8dBEfDPEceibod01MkGXBORy4xnoicKSz6icPv9naUnjicG49B86zG1NgALC9lAAibAGiaZFmMz5pg3pzmBn4G2gRX3g/640?wx_fmt=png&from=appmsg "")  
  
漏洞详情：  
1. CVE-2025-32819（CVSS 8.8分）  
  
- 类型：SSL VPN用户身份认证后任意文件删除漏洞  
  
- 影响：通过绕过路径遍历检查，攻击者可删除任意文件导致设备恢复出厂设置  
  
1. CVE-2025-32820（CVSS 8.3分）  
  
- 类型：SSL VPN用户路径遍历漏洞  
  
- 影响：认证攻击者可修改设备任意目录写入权限  
  
1. CVE-2025-32821（CVSS 6.7分）  
  
- 类型：SSL VPN管理员命令注入漏洞  
  
- 影响：攻击者可通过文件上传功能注入Shell命令参数  
  
技术分析：  
  
Rapid7研究团队于2025年4月发现这三个漏洞可形成完整攻击链：  
1. 利用低权限SSL VPN会话Cookie  
  
1. 通过删除数据库文件重置管理员密码  
  
1. 获取/bin目录写入权限  
  
1. 执行反向Shell载荷实现root级远程代码执行  
  
安全预警：  
- 受影响版本：10.2.1.15-81sv之前所有版本  
  
- 修复方案：立即升级至10.2.1.15-81sv版本  
  
- 潜在威胁：根据私有IOC证据，该漏洞可能已被在野利用  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
