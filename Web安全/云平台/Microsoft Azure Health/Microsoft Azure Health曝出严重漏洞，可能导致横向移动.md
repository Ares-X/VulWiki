---
cve: "CVE-2024-38109"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Microsoft Azure Health曝出严重漏洞，可能导致横向移动   
小薯条  FreeBuf   2024-08-15 19:01  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR38jUokdlWSNlAjmEsO1rzv3srXShFRuTKBGDwkj4gvYy34iajd6zQiaKl77Wsy9mjC0xBCRg0YgDIWg/640?wx_fmt=gif "")  
  
  
近日，研究人员发现了一个服务器端请求伪造（SSRF）漏洞（CVE-2024-38109），利用该漏洞可访问服务内的跨租户资源，有可能导致横向移动。  
  
> Azure 健康机器人服务（Azure Health Bot Service）是一个专为医疗机构创建和部署人工智能驱动的虚拟健康助手而设计的云平台，最近被发现存在多个权限升级漏洞。  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3icqks1s5Is6QNT7fmvNRVKGF0YCtWOJicmYIMuElwXbuzgvdQTJUeVCWZbFI26ibDHn5z1koh5l2FnQ/640?wx_fmt=png&from=appmsg "")  
  
  
**Azure 健康机器人服务中的权限升级漏洞**  
  
##   
  
Azure 健康机器人服务使医疗保健提供商能够创建面向患者的聊天机器人，与患者信息门户或医学参考数据库等外部数据源交互。Tenable 研究人员发现，旨在允许机器人与外部数据源交互的「数据连接」功能可通过服务器端请求伪造（SSRF）攻击被利用。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3icqks1s5Is6QNT7fmvNRVKGalaoiaNvG0rBUwnFlXlSZ4S76zPvAMD0DMlKwjDqZCZtdUtc9LTHBHQ/640?wx_fmt=png&from=appmsg "")  
  
来源：tenable官网  
  
  
通过利用数据连接和第三方请求 API，研究人员执行了各种测试连接，发现 Azure 的内部元数据服务 (IMDS) 等常见端点最初无法访问。  
  
  
然而，通过将数据连接配置到自己控制的外部主机，并利用重定向响应（301/302 状态代码），研究人员得以绕过服务器端缓解措施，访问 Azure 的内部元数据服务 (IMDS)。  
  
  
通过有效的元数据响应，研究人员获得了 management.azure.com 的访问令牌，随后通过 API 调用列出了他们可以访问的订阅。这导致列出了属于其他客户的数百个资源，显示了跨租户信息。  
  
  
在向微软安全响应中心（MSRC）报告了初步发现后，  
微软 MSRC 确认了该问题属实，并于 2024 年 6 月 17 日开始调查该问题，并在一周内发布了修复程序。  
截至 7 月 2 日，MSRC 证实所有受影响的环境都已打上了补丁。  
根据微软针对 CVE-2024-38109 漏洞的安全更新指南，此 CVE 所记录的漏洞无需客户采取行动即可解决。  
  
  
研究人员重新测试了最初的概念验证，发现修复方法只是拒绝数据连接端点的重定向状态代码，从而消除了攻击载体。  
  
  
然而，在测试过程中，FHIR（快速医疗互操作性资源）端点的验证机制中又发现了第二个漏洞。虽然这个问题的影响有限，但研究人员立即停止了调查，并向微软报告了这一发现，选择尊重 MSRC 关于访问跨租户资源的指导意见。该问题的修复程序已于 7 月 12 日前完成。  
  
  
研究人员澄清说，他们发现的漏洞涉及人工智能聊天机器人服务底层架构中的弱点，而不是人工智能模型本身。  
  
  
【  
FreeBuf粉丝交流群招新啦！  
  
在这里，拓宽网安边界  
  
甲方安全建设干货；  
  
乙方最新技术理念；  
  
全球最新的网络安全资讯；  
  
群内不定期开启各种抽奖活动；  
  
FreeBuf盲盒、大象公仔......  
  
扫码添加小蜜蜂微信回复「加群」，申请加入群聊  
】  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3ich6ibqlfxbwaJlDyErKpzvETedBHPS9tGHfSKMCEZcuGq1U1mylY7pCEvJD9w60pWp7NzDjmM2BlQ/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oQ6bDiaGhdyodyXHMOVT6w8DobNKYuiaE7OzFMbpar0icHmzxjMvI2ACxFql4Wbu2CfOZeadq1WicJbib6FqTyxEx6Q/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3icEEJemUSFlfufMicpZeRJZJ61icYlLmBLDpdYEZ7nIzpGovpHjtxITB6ibiaC3R5hoibVkQsVLQfdK57w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
> https://thecyberexpress.com/flaws-microsoft-azure-health-bot-service/  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3icEEJemUSFlfufMicpZeRJZJ7JfyOicficFrgrD4BHnIMtgCpBbsSUBsQ0N7pHC7YpU8BrZWWwMMghoQ/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
[](http://mp.weixin.qq.com/s?__biz=Mzg2MTAwNzg1Ng==&mid=2247494714&idx=1&sn=fe28fee45c1508a1645fd04c2b18ca82&chksm=ce1f16a5f9689fb3996529f7738a1b7dc3960f3fc5bd31c7d1505dbd3a179d5b3bfd6c66e5f3&scene=21#wechat_redirect)  
  
[](http://mp.weixin.qq.com/s?__biz=Mzg2MTAwNzg1Ng==&mid=2247494663&idx=1&sn=8220aadcd0c1496c6ecbae5bc5fddee1&chksm=ce1f1698f9689f8e004a21a851d5d2987d45054bf636fad5abba5b977ae3ab342ce2a73b26f8&scene=21#wechat_redirect)  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651253272&idx=1&sn=82468d927062b7427e3ca8a912cb2dc7&scene=21#wechat_redirect)  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR3icF8RMnJbsqatMibR6OicVrUDaz0fyxNtBDpPlLfibJZILzHQcwaKkb4ia57xAShIJfQ54HjOG1oPXBew/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&tp=webp "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
