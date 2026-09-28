---
cve: "CVE-2024-23636"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】SOFARPC反序列化漏洞CVE-2024-23636   
cexlife  飓风网络安全   2024-01-24 22:25  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu026bGn3UVrmHMibaF1faP3DcwicUtmfibE3iab2tEMgP2KDSx6piaCCnTtuSWQic0lh0E8mQVxaacmMoLiaA/640?wx_fmt=png&from=appmsg "")  
  
**漏洞描述:**  
  
SOFARPC是一个高性能、高扩展性、生产级的 Java RPC 框架,近日监测到SOFARPC中修复了一个反序列化漏洞（CVE-2024-23636),该漏洞的CVSSv3评分为9.8。由于SOFARPC 默认使用 SOFA Hessian 协议来反序列化接收到的数据，而 SOFA Hessian 协议使用黑名单机制来限制危险类的反序列化。SOFARPC 版本5.12.0之前,威胁者可通过Gadget链（只依赖于JDK，不依赖任何第三方组件）绕过SOFA Hessian黑名单保护机制,导致远程代码执行。**影响范围:**SOFARPC < 5.12.0**安全措施:****升级版本**目前已通过添加黑名单修复了该漏洞，受影响用户可升级到SOFARPC版本**5.12.0****下载链接:**https://github.com/sofastack/sofa-rpc/releases/tag/v5.12.0**临时措施:**SOFARPC还提供了添加额外黑名单的方法。用户可以添加类似-Drpc_serialize_blacklist_override=org.apache.xpath.这样的类来避免该问题**参考链接:**https://github.com/sofastack/sofa-rpc/security/advisories/GHSA-7q8p-9953-pxvr  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
