---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Array Networks SSL VPN 产品曝严重漏洞，已被黑客利用   
原创 技术修道场  技术修道场   2024-12-09 00:39  
  
美国网络安全和基础设施安全局 (CISA) 警告称，黑客正在积极利用 Array Networks AG 和 vxAG ArrayOS SSL VPN 产品中的一个远程代码执行漏洞。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wWBwsDOJT4ic36icMGWKhdHVHorEXdiaVqX598wjicqALgD6ShQPAsh5Il8E6OZmskUiaRG6hCqOdShcMfiatC51OOcQ/640?wx_fmt=png&from=appmsg "")  
  
图片来源于网络  
  
**漏洞细节**  
  
该漏洞编号为 CVE-2023-28461，CVSS 严重性评分为 9.8，已被列入 CISA 的“已知被利用漏洞”（KEV）目录。  
  
该漏洞可通过易受攻击的 URL 进行利用，是一个身份验证不当问题，允许在 Array AG 系列和 vxAG 9.4.0.481 及更早版本中执行远程代码。  
  
Array Networks 在一份安全公告中表示：“（CVE-2023-28461）是一个 Web 安全漏洞，允许攻击者在无需身份验证的情况下，使用 HTTP 标头中的 flags 属性浏览文件系统或在 SSL VPN 网关上执行远程代码。”  
  
该漏洞于去年 3 月 9 日披露，Array Networks 大约一周后发布了 Array AG 9.4.0.484 版本修复了该漏洞。  
  
**受影响产品和用户**  
  
Array Networks AG 系列（硬件设备）和 vxAG 系列（虚拟设备）是 SSL VPN 产品，可提供对企业网络、企业应用程序和云服务的安全远程和移动访问。  
  
据该供应商称，全球超过 5,000 家客户使用这些产品，包括企业、服务提供商和政府机构。  
  
**CISA 的建议**  
  
CISA 没有提供有关谁在利用该漏洞以及目标组织的任何详细信息，但“根据活跃利用的证据”将其添加到了 KEV 目录中。  
  
该机构建议所有联邦机构和关键基础设施组织在 12 月 16 日之前应用安全更新和可用的缓解措施，或者停止使用该产品。  
  
**修复和缓解措施**  
  
受影响产品的安全更新可通过 Array 支持门户获得。如果无法立即安装更新，该供应商还在安全公告中提供了一组用于缓解该漏洞的命令。  
  
但是，组织应首先测试这些命令的效果，因为它们可能会对客户端安全功能、VPN 客户端自动升级功能以及门户用户资源功能产生负面影响。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
