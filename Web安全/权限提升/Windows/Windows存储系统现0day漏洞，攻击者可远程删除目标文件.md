---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Windows存储系统现0day漏洞，攻击者可远程删除目标文件   
AI小蜜蜂  FreeBuf   2025-02-13 11:02  
  
![图片](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR38jUokdlWSNlAjmEsO1rzv3srXShFRuTKBGDwkj4gvYy34iajd6zQiaKl77Wsy9mjC0xBCRg0YgDIWg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&tp=webp "")  
  
  
Windows系统近日被曝出一个重大安全漏洞，攻击者可利用该漏洞远程删除受影响系统上的目标文件。该漏洞编号为CVE-2025-21391，于2025年2月11日披露，属于权限提升漏洞，严重性被评定为"重要"级别。  
  
  
![image](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3ibwYhX7nr1KguypdJBvFwHbgmkTULoKXMwlsupWd48kQYQhCX6vwk5EkPuWNCCwAd5AaTWkXUGFXQ/640?wx_fmt=jpeg&from=appmsg "")  
  
## 漏洞详情与风险分析  
  
****  
CVE-2025-21391利用了一个被称为"文件访问前链接解析不当"（CWE-59）的缺陷，使攻击者能够操纵文件访问权限。该漏洞的CVSS评分为7.1，属于中高风险的漏洞。  
  
  
攻击向量为本地（AV:L），攻击复杂度低（AC:L），所需权限也较低（PR:L），这意味着攻击者无需大量资源或高权限即可利用该漏洞。微软研究人员指出，CVSS评分显示该漏洞不会导致机密性丧失（C:N），但对完整性（I:H）和可用性（A:H）的影响重大。换句话说，虽然无法窃取敏感信息，但攻击者可以删除重要文件，可能导致系统运行中断。  
  
## 影响范围与缓解措施  
  
****  
该漏洞已在野被利用，状态显示为"已检测到利用"。成功利用该漏洞的攻击者可以删除目标文件，如果关键系统文件受到影响，可能导致服务不可用。受影响的Windows版本包括Windows Server 2016、Windows Server 2019、Windows Server 2022、Windows 10（版本1607、1809、21H2和22H2）以及Windows 11（版本22H2）。x64和ARM64架构的系统均受到影响。  
  
  
为防范该漏洞，建议用户尽快应用微软2025年2月发布的月度安全更新。用户应优先更新系统，以防潜在攻击，确保数据的完整性和可用性。  
  
  
  
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
