---
cve: "CVE-2025-48367"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Redis曝高危漏洞，认证客户端可致服务中断  
看雪学苑  看雪学苑   2025-07-07 09:59  
  
2025年7月7日，安全研究人员发现热门内存数据存储系统Redis存在一个严重的拒绝服务（DoS）漏洞，该漏洞编号为CVE-2025-48367，在CVSSv4评分体系中达到了7.0分的高危级别。此漏洞的存在，使得已认证的客户端有可能对Redis服务进行干扰，进而导致服务中断。  
  
  
此次漏洞是由安全研究员Gabriele Digregorio负责披露的，之后经过Redis开发团队的验证。其问题根源在于已认证用户对Redis多批量协议命令的滥用。虽然Redis的核心安全理念是信任已认证用户，但这一漏洞若被利用，依然会对服务器的性能造成影响，甚至可能引发服务宕机。  
  
  
Redis官方在安全公告中表示：“该问题的产生依赖于对Redis内置命令网络协议的滥用或误用，并且需要用户成功完成认证。从这方面来看，它并未违背Redis的安全模型……不过，仍然可能会对服务的可用性造成意想不到的影响。”  
  
  
值得关注的是，考虑到直接通过代码修复该漏洞可能会对Redis的正常功能和性能产生负面影响，Redis官方决定不采取这种方式。官方团队称：“我们经过评估认为，实施应用程序变更来防止这种情况的发生，会对Redis的合法功能和性能产生不利影响。因此，我们不打算针对这个问题进行修复，而是选择发布此安全公告。”  
  
  
尽管如此，Redis还是为四个活跃的版本分支发布了补丁，分别是8.0.3、7.4.5、7.2.10和6.2.19。这些补丁中包含了一些常规的稳定性改进，可能也涉及到了与该漏洞相关的缓解措施，具体内容可查看各版本的发布说明。  
  
  
鉴于该漏洞的特性，Redis官方给出了加强访问控制和身份验证的建议：  
  
-实施严格的身份认证措施，避免将Redis实例暴露在不可信的网络环境中；  
  
-将Redis的访问与企业的身份提供商进行集成，以实现更有效的访问控制；  
  
-相关人员应重新审视Redis的安全最佳实践，强化部署。  
  
  
  
资讯来源  
：  
securityonline.info  
  
转载请注明出处和本文链接  
  
  
  
﹀  
  
﹀  
  
﹀  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/Uia4617poZXP96fGaMPXib13V1bJ52yHq9ycD9Zv3WhiaRb2rKV6wghrNa4VyFR2wibBVNfZt3M5IuUiauQGHvxhQrA/640?wx_fmt=jpeg "")  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球分享**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球点赞**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球在看**  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibExiboJzOiafqGLvlOkrmU6NIr3qSr7ibpkIo2N5mhCTNXoMl37s2oRSIDw/640?wx_fmt=gif&from=appmsg "")  
  
点击阅读原文查看更多  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
