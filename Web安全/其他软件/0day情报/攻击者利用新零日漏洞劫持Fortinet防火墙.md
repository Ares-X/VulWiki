---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  攻击者利用新零日漏洞劫持Fortinet防火墙   
AI小蜜蜂  FreeBuf   2025-02-12 10:53  
  
![图片](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR38jUokdlWSNlAjmEsO1rzv3srXShFRuTKBGDwkj4gvYy34iajd6zQiaKl77Wsy9mjC0xBCRg0YgDIWg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&tp=webp "")  
  
  
Fortinet近日发布警告，称威胁攻击者正在利用FortiOS和FortiProxy中的一个新零日漏洞（CVE-2025-24472，CVSS评分为8.1）来劫持Fortinet防火墙。该漏洞是一个身份验证绕过问题，远程攻击者可以通过构造恶意CSF代理请求获取超级管理员权限。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR38LWZibRwEuPn9hEibyTcrpiaXMEDNvJl7vyWrkcObibvKWPoTx1XIUgXcDZYbLyvAFKUiaqCYj7O9qANw/640?wx_fmt=jpeg&from=appmsg "")  
  
### 漏洞详情与受影响的版本  
  
  
该漏洞影响FortiOS 7.0.0到7.0.16版本，以及FortiProxy 7.0.0到7.0.19和7.2.0到7.2.12版本。Fortinet已在FortiOS 7.0.17及以上版本和FortiProxy 7.0.20/7.2.13及以上版本中修复了该漏洞。  
  
  
Fortinet将该漏洞添加到1月披露的CVE-2024-55591漏洞的咨询中。CVE-2024-55591同样是一个身份验证绕过漏洞，影响FortiOS 7.0.0至7.0.16版本和FortiProxy 7.0.0至7.0.19及7.2.0至7.2.12版本。攻击者可以通过构造针对Node.js websocket模块的请求来获取超级管理员权限。  
  
  
Fortinet在公告中表示：“鉴于报告显示该漏洞已被广泛利用，建议用户尽快采取措施。”  
  
### 攻击者的利用方式与临时缓解措施  
  
  
威胁攻击者利用这些漏洞创建非法管理员或本地用户，修改防火墙策略，并通过SSL VPN访问内部网络。Fortinet建议用户暂时禁用HTTP/HTTPS管理界面，或通过本地策略限制可访问的IP地址。  
  
  
Arctic Wolf的研究人员最近观察到针对Fortinet FortiGate防火墙的攻击，涉及未经授权的登录、账户创建和配置更改。该公司推测，攻击者很可能利用了目标系统中的零日漏洞。  
  
### Arctic Wolf观察到的攻击活动  
  
  
Arctic Wolf表示，此次攻击活动可分为四个阶段：  
1. **漏洞扫描**（2024年11月16日至2024年11月23日）  
  
1. **侦察**（2024年11月22日至2024年11月27日）  
  
1. **SSL VPN配置**（2024年12月4日至2024年12月7日）  
  
1. **横向移动**（2024年12月16日至2024年12月27日）  
  
Arctic Wolf在2024年12月12日向Fortinet报告了这一活动，FortiGuard Labs于2024年12月17日确认并开始调查。  
  
  
Fortinet提醒用户，鉴于该漏洞已被广泛利用，建议尽快更新到最新版本，并采取必要的防御措施，以保护其网络安全。  
  
  
【  
FreeBuf粉丝交流群招新啦！  
  
在这里，拓宽网安边界  
  
甲方安全建设干货；  
  
乙方最新技术理念；  
  
全球最新的网络安全资讯；  
  
群内不定期开启各种抽奖活动；  
  
FreeBuf盲盒、大象公仔......  
  
扫码添加小蜜蜂微信回复「加群」，申请加入群聊】  
  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3ich6ibqlfxbwaJlDyErKpzvETedBHPS9tGHfSKMCEZcuGq1U1mylY7pCEvJD9w60pWp7NzDjmM2BlQ/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&retryload=2&tp=webp "")  
  
  
![图片](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3ic5icaZr7IGkVcd3DT6vXW4B4LOZ1M7YkTPhS1AT2DQJaicFjtCxt5BRO7p5AOJqvH3EJABCd0BFqYQ/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  
  
  
  
  
  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651312407&idx=1&sn=60289b6b056aee1df1685230aa453829&token=1964067027&lang=zh_CN&scene=21#wechat_redirect)  
  
![图片](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR3icF8RMnJbsqatMibR6OicVrUDaz0fyxNtBDpPlLfibJZILzHQcwaKkb4ia57xAShIJfQ54HjOG1oPXBew/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&tp=webp "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
