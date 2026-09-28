---
cve: "CVE-2024-3661"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  TunnelVision漏洞曝光，几乎可监听所有VPN   
FreeBuf  商密君   2024-05-13 23:09  
  
近日，安全企业Leviathan Security Group披露了一个名为TunnelVision的安全漏洞，它可将用户的VPN流量外泄给位于同一局域网络上的黑客，该漏洞被追踪为CVE-2024-3661。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3icbJZfib5NgYxBe30Z0AbBCowiaMYo54dX9FanNhVBJj2j3icficvJYsic2M94RopZlg3GAOWwgUBfbDtw/640?wx_fmt=png&from=appmsg&wxfrom=13&tp=wxpic "")  
  
  
根据研究人员的说明，TunnelVision是一种可绕过VPN封装的新型网络技术，借由操作系统所内置的、用来自动分配IP地址的动态主机配置协议（Dynamic Host Configuration Protocol，DHCP），就可迫使目标用户的流量离开VPN信道，进而让黑客可窥探其流量，由于该手法并未破坏VPN所控制的信道，因而不会触发VPN的网络自动断开（Kill Switch）机制，而让用户误以为自己的流量仍受到VPN保护。  
  
  
如果用户连接的对象是个HTTP网站，那么传输内容将会被一览无遗，若是访问加密的HTTPS网站，黑客就只能查看用户所连接的对象。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3icbJZfib5NgYxBe30Z0AbBCocacjLJ5iawibPQZCaYzsRhIjubaggfSpcpQhdTeQjX7OBWzicup45Rlmg/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
开发过程，图源：利维坦  
  
  
安全研究人员指出，至少从 2002 年开始这个漏洞就已经出现，但目前还没有已知的恶意利用案例。  
  
  
但Leviathan已通过电子前线基金会（EFF）及CISA通知了全球超过50个VPN供应商，另也提醒VPN企业不应夸大VPN的安全性，因为它们并无法保证用户在不受信任网络上的流量可被保护，例如公共Wi-Fi。  
  
  
**缓解「隧道视像」攻击**  
  
  
  
Leviathan 表示，大多数 VPN 客户端通常都有这种情况，它们使用系统级路由规则，没有防泄漏保护措施。TunnelVision CVE-2024-3661 漏洞影响 Windows、Linux、macOS 和 iOS。由于 Android 不支持 DHCP 选项 121，它是唯一不受 TunnelVision 攻击影响的主要操作系统。  
  
  
攻击者可以通过多种方式增加恶意服务器访问的机会，包括针对合法服务器的 DHCP 攻击和 ARP 欺骗。  
  
  
Leviathan 建议 VPN 用户采取以下缓解措施：  
  
- 在 Linux 上使用网络命名空间，将网络接口和路由表与系统其他部分隔离，防止恶意 DHCP 配置影响 VPN 流量。  
  
- 配置 VPN 客户端，拒绝所有不使用 VPN 接口的入站和出站流量。例外情况应仅限于必要的 DHCP 和 VPN 服务器通信。  
  
- 配置系统在连接 VPN 时忽略 DHCP 选项 121。这可以防止应用恶意路由选择指令，但在某些配置下可能会中断网络连接。  
  
- 通过个人热点或虚拟机（VM）内进行连接。这样可以将 DHCP 交互与主机系统的主网络接口隔离，降低恶意 DHCP 配置的风险。  
  
- 避免连接到不受信任的网络，尤其是在处理敏感数据时，因为这些网络是此类攻击的主要环境。  
  
Leviathan已找到在Linux系统上防范TunnelVision攻击的缓解措施，但该措施存在一个侧信道，可被用来执行针对性的拒绝服务攻击，或是借由流量分析将流量目的去匿名化。  
  
  
同时，他们鼓励VPN 提供商增强客户端软件，并实施自己的 DHCP 处理程序，或集成额外的安全检查，以阻止应用有风险的 DHCP 配置。  
  
  
编辑：陈十九  
  
审核：商密君  
  
**征文启事**  
  
大家好，为了更好地促进同业间学术交流，商密君现开启征文活动，只要你对商用密码、网络安全、数据加密等有自己的独到见解和想法，都可以积极向商密君投稿，商密君一定将您的声音传递给更多的人。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/1HyKzSU2XXNcXmbiaiaCljdXpwzOEQ9QTBXMibM6rZTOnbTSwTmCXncQLria2vuLGxn8QPtznzBc0as8vBxWIjrWxQ/640?wx_fmt=jpeg "")  
  
来源：FreeBuf  
  
注：内容均来源于互联网，版权归作者所有，如有侵权，请联系告知，我们将尽快处理。  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/1HyKzSU2XXOdeQx0thlyozF2swQTEN9iaaBNDG0jTKfAgqgdesve8x5IEWNvYxjF6sAWjO1TPCZVsWd0oiaDn3uw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1HyKzSU2XXMyyClGk1cttkSBbJicAn5drpXEbFIeChG9IkrslYEylRF4Z6KNaxNafDwr5ibcYaZXdnveQCNIr5kw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1HyKzSU2XXMZPiaDBD8yxbIHiciauWK4tuiaMcJkA69QYZ9T4jmc3fdN6EA7Qq9A8E3RWcTKhxVEU1QjqOgrJMu2Qg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
点分享  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1HyKzSU2XXMZPiaDBD8yxbIHiciauWK4tuiaiaRXdw4BFsc7MxzkVZaKGgtjWA5GKtUfm3hlgzsBtjJ0mnh9QibeFOGQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
点点赞  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1HyKzSU2XXMZPiaDBD8yxbIHiciauWK4tuiaeiaNlRO9954g4VS87icD7KQdxzokTGDIjmCJA563IwfStoFzPUaliauXg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
点在看  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
