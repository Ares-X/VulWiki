---
cve: "CVE-2025-5137"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】DedeCMS信息泄露漏洞(CVE-2025-5137)   
cexlife  飓风网络安全   2025-05-27 10:52  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01EV80twSLgfl9M33TqNanYfibwIxsa6dD7mkcf5ZLia6hryzEL8LuAia4gjuhCHX4uwKGGImdhPTpVg/640?wx_fmt=png&from=appmsg "")  
  
漏洞描述:  
  
在DеdеCMS 5.7.117中发现了一个漏洞,该漏洞已被分类为严重。受影响的是文件dеdе/ѕуѕ_vеrifiеѕ.рhр?асtiоn=ɡеtfilеѕ中的未知函数,该组件存在不完全修复的CVE-2018-9175,对参数rеfilеѕ的操作导致代码注入可以远程发起攻击,该漏洞利用已公开,可能被使用。   
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01EV80twSLgfl9M33TqNanYMC1YpkuJ4x7ibBW1caribf1iccnOdFGJ0ZLicicQGc7MMicpYNkhDsBfibKicg/640?wx_fmt=png&from=appmsg "")  
  
攻击场景:  
  
攻击者可能通过构造特定请求,利用未知函数中的参数rеfilеѕ的操作,导致代码注入和信息泄露。  
  
影响产品:  
  
DedeCMS V5.7.117   
  
检测方法:  
  
可以通过检查dede/sys_verifies.php文件的版本来确认是否受影响,或通过尝试构造特定请求来验证漏洞是否存在。   
  
修复建议:  
  
建议加强对rеfilеѕ参数的过滤,例如过滤空格、点、$符号等。官方补丁尚未发布,用户应尽快更新到最新版本以避免风险。  
  
缓解方案:  
  
在未修复漏洞之前,建议限制对dеdе/ѕуѕ_vеrifiеѕ.рhр的访问,仅允许受信任的管理员使用,并监控系统日志以检测异常活动。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
