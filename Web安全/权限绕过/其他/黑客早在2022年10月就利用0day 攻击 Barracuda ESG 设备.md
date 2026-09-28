---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  黑客早在2022年10月就利用0day 攻击 Barracuda ESG 设备   
Zeljka Zorz  代码卫士   2023-05-31 17:24  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**Barracuda 公司表示，黑客利用0day (CVE-2023-2868) 攻陷某些客户的 ESG 设备，并部署三种恶意软件和数据提取能力。该公司并未说明受影响组织机构的数量，但证实称，“CVE-2023-2868遭利用的最早证据可追溯至2022年10月。”**  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMRLUkAYjNjpjvnJQqumDKbMjwjUNnRp7Iu2MN5TW9J4CK0MWtzapXO6pBcibOzTpg5wJU2XyydZSug/640?wx_fmt=png "")  
  
  
**0day 遭利用，Barracuda ESG 设备被安装后门**  
  
  
5月23日，Barracuda 公司公开证实称，攻击者已利用 CVE-2023-2868 攻陷多家组织机构的邮件安全网关本地物理设备。今天，该公司证实称，修复该RCE漏洞的第一个补丁在5月20日应用到全球所有的 ESG 设备中，并且提供了“部署到所有受影响设备以阻止该事件并应对越权访问的”脚本。  
  
Mandiant 公司的网络安全专家协助分析指出，受影响设备上至少被释放了三种不同的恶意 payload：  
  
- **SALTWATER****：**为 Barracuda SMTP 守护进程 (bsmtpd) 设计的木马化模块，是具有代理和隧道能力的后门，可导致攻击者上传或下载任意文件并执行命令。  
  
- **SEASPY****：**一款 x64 ELF 持久后门，伪装成 Barracuda Networks 合法服务且自称为 PCAP 过滤器用于监控端口25的流量。  
  
- **SEASIDE****：**适用于 Barracuda SMTP 守护进程 (bsmtpd) 的基于 Lua 的模块，与攻击者的C2服务器建立连接并有助于建立反向shell（以提供系统访问权限）。  
  
  
  
Mandiant 公司提到，SEASPY 和 cd00r （公开发布的 PoC 后门）之间存在一些重合之处，但该恶意软件尚未证实与任何特定威胁行动者之间存在关联。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMRLUkAYjNjpjvnJQqumDKbMjwjUNnRp7Iu2MN5TW9J4CK0MWtzapXO6pBcibOzTpg5wJU2XyydZSug/640?wx_fmt=png "")  
  
  
**建议**  
  
  
Barracuda 公司对受影响 ESG 客户的建议是：  
  
- 确保受影响设备从 Barracuda 处接收并应用更新和安全补丁。  
  
- 如可能，删除受陷ESG设备并联系该公司获取新的 ESG 虚拟或硬件设备。  
  
- 审计网络日志并搜索由该公司共享的 IOC 和 IP信息。  
  
  
  
Barracuda 公司还提供 YARA 规则，帮助组织机构捕获利用该漏洞的恶意 TAR 文件。该公司指出，“后续我们将向所有设备部署一系列安全补丁。”  
  
CISA已将该漏洞加入必修清单中。  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511052&idx=3&sn=fb116392e405ae62e6c339117fffdb59&chksm=ea949d66dde31470758b6ee8f9dbecdb67ef6c0c8af277f26b83b60dbac95748d28db787a4b4&scene=21#wechat_redirect)  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[Barracuda 邮件网关遭 0day 漏洞利用攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516580&idx=2&sn=fee108ee4d61523b8dc544a5c1bfd2b8&chksm=ea94b0cedde339d822e3ed4ea277e795e733ad86df5ff4de2e3d1c97f16ea72d051b98a2395c&scene=21#wechat_redirect)  
  
  
[利用5个0day的安卓恶意软件 Predator 内部工作原理曝光](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516596&idx=2&sn=7cb9c52c6de509bd244e7ae651a5f1d9&chksm=ea94b0dedde339c84813054bbdbdd547ed52a95f29edf6a134aff5d6417917a6d6f16e49593a&scene=21#wechat_redirect)  
  
  
[趋势科技邮件加密网关中被曝存在高危缺陷](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247486525&idx=3&sn=be32a215aa587ebccb9954aac0f15594&chksm=ea973d57dde0b44193e90c9e25885b5946d730749a007f180a1dcac9d3d16b1046d5e50753b2&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://www.helpnetsecurity.com/2023/05/30/barracuda-esg-zero-day/  
  
  
题图：Pixabay License  
  
  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSf7nNLWrJL6dkJp7RB8Kl4zxU9ibnQjuvo4VoZ5ic9Q91K3WshWzqEybcroVEOQpgYfx1uYgwJhlFQ/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSN5sfviaCuvYQccJZlrr64sRlvcbdWjDic9mPQ8mBBFDCKP6VibiaNE1kDVuoIOiaIVRoTjSsSftGC8gw/640?wx_fmt=jpeg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ5iciaeKS21icDIWSVd0M9zEhicFK0rbCJOrgpc09iaH6nvqvsIdckDfxH2K4tu9CvPJgSf7XhGHJwVyQ/640?wx_fmt=gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
