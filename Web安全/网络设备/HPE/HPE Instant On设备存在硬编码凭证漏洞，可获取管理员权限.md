---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  HPE Instant On设备存在硬编码凭证漏洞，可获取管理员权限  
 FreeBuf   2025-07-21 10:03  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR38jUokdlWSNlAjmEsO1rzv3srXShFRuTKBGDwkj4gvYy34iajd6zQiaKl77Wsy9mjC0xBCRg0YgDIWg/640?wx_fmt=gif "")  
  
  
![image](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR385xfQfOZT3FGrBQUN2aE64DycpSrP5hNjqkVTPm6qRfIKd1BxvleAg5hKZ2iceqA7icUC43re9frrw/640?wx_fmt=jpeg&from=appmsg "")  
  
  
**Part01**  
## 高危漏洞详情  
##   
  
慧与（Hewlett-Packard Enterprise，HPE，前身为惠普）近日发布安全更新，修复Instant On接入点设备中存在的一个高危安全漏洞（CVE-2025-37103）。该漏洞CVSS评分为9.8分（满分10分），攻击者可利用该漏洞绕过身份验证，获取受影响系统的管理员权限。  
  
  
HPE在安全公告中表示："我们在HPE Networking Instant On接入点设备中发现存在硬编码登录凭证，任何知晓该凭证的人员均可绕过常规设备认证机制。成功利用该漏洞可使远程攻击者获得系统管理员权限。"  
  
  
**Part02**  
## 关联漏洞风险  
  
  
HPE同时修复了Instant On接入点设备命令行界面中的认证命令注入漏洞（CVE-2025-37102，CVSS评分7.2）。远程攻击者可在提升权限后，以特权用户身份在底层操作系统上执行任意命令。  
  
  
值得注意的是，攻击者可能将CVE-2025-37103和CVE-2025-37102组合利用，形成完整的攻击链：先获取管理员权限，再通过命令行界面注入恶意命令实施后续攻击活动。  
  
  
**Part03**  
## 修复方案  
  
  
HPE确认这两处漏洞由Ubisectech Sirius团队的ZZ发现并报告。目前漏洞已在HPE Networking Instant On软件3.2.1.0及以上版本中修复。HPE特别说明，其他设备（如Instant On交换机）不受此漏洞影响。  
  
  
虽然目前尚未发现这两个漏洞被实际利用的证据，但HPE仍建议用户尽快安装更新以防范潜在威胁。  
  
  
**参考来源：**  
  
Hard-Coded Credentials Found in HPE Instant On Devices Allow Admin Access  
  
https://thehackernews.com/2025/07/hard-coded-credentials-found-in-hpe.html  
  
  
###   
###   
###   
  
**推荐阅读**  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651324992&idx=1&sn=8303e67651ddba23a73497aeb18955fa&scene=21#wechat_redirect)  
  
### 电台讨论  
  
****  
  
  
  
![图片](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR3icF8RMnJbsqatMibR6OicVrUDaz0fyxNtBDpPlLfibJZILzHQcwaKkb4ia57xAShIJfQ54HjOG1oPXBew/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&tp=webp "")  
  
   
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
