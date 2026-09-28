---
cve: "CVE-2024-48063"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】PyTorch反序列化漏洞CVE-2024-48063   
cexlife  飓风网络安全   2024-11-01 22:03  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01YicPngeTnsAjetmBPNErNYao8WdEDobOLOIv5rAkyxaVQjuxbeHn6kVcGia1M8WXiaVMAgyXNv3zZQ/640?wx_fmt=png&from=appmsg "")  
  
**漏洞描述:**  
PyTorch是一个开源的深度学习框架,广泛用于机器学习和人工智能领域,PyTorch的分布式RPC框架中存在一个反序列化漏洞（CVE-2024-48063），其CVSS评分为9.8,目前该漏洞的利用细节及PoC已公开,PyTorch2.4.1及之前版本的分布式RPC框架中存在反序列化漏洞,由于RemoteModule在反序列化过程中没有适当地验证或清理输入数据,导致攻击者可以通过客户端将包含恶意方法的RemoteModule实例序列化为数据,并通过RPC框架发送到服务器触发反序列化,从而可能导致在服务器上远程执行任意命令。  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01YicPngeTnsAjetmBPNErNYCEFABf8jlqt7qCRoC9VnFUicnDnouiax2lkMgXsqGoVW2MEGNQ6HRUSQ/640?wx_fmt=png&from=appmsg "")  
**影响范围:**PyTorch <= 2.4.1**修复建议:**升级版本目前该漏洞已经修复,受影响用户可升级到以下版本:PyTorch>2.4.1**下载链接:**https://github.com/pytorch/pytorch/releases**临时措施:**暂无  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
