---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Libssh2 严重漏洞可导致攻击者执行远程代码"
product: "libssh2 SSH client library"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2026-55200"
referenced_identifiers: "CVE-2018-10933"
identifier_role: "primary"
cve: "CVE-2026-55200"
prerequisites: "<=1.11.1 claimed；接收恶意SSH对端数据；具体网络角色/编译平台未述"
source_status: "unknown"
side_effects: "含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。"
id: "vw-923e4efc2bc824559e9329f6"
entity_id: "ve-923e4efc2bc824559e9329f6"
schema_version: "1"
---

# Libssh2 严重漏洞可导致攻击者执行远程代码

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：<=1.11.1 claimed；接收恶意SSH对端数据；具体网络角色/编译平台未述
- 证据范围：整数溢出到堆写和潜在RCE概述，无PoC/原始公告

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- P0分类错误：SSH客户端库不是数据库；亦不能与libssh混淆
- 短commit7acf3df与完整97acf3df...前缀不一致
- 客户端库攻击方向应说明恶意服务器/对端及连接条件
- 缺厂商公告、准确安全发布版、利用成熟度依据；RCE仍为可能后果

### 操作风险与资料使用

- 含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

Abinaya
                    Abinaya  代码卫士   2026-06-24 09:06  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
****  
**广泛使用的libssh2库中存在一个严重的整数溢出转缓冲区溢出漏洞CVE-2026-55200（CVSS评分9.2），可导致远程攻击者通过特殊构造的SSH数据包执行任意代码。该漏洞影响所有使用libssh2 1.11.1及更早版本的应用和系统。由于libssh2广泛嵌入在SSH客户端、自动化框架和文件传输工具中，其影响范围覆盖企业环境、云服务和嵌入式系统。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
该漏洞于2026年6月17日披露，影响libssh2 1.11.1及更早版本，已在提交7acf3df中修复，官方补丁可通过项目的GitHub仓库获取。该漏洞存在于ssh2_transport_read()函数中，而该函数未能正确验证传入SSH数据包中的packet_length字段。由于缺少上限检查，攻击者可以提供异常大的packet_length值，触发整数溢出，导致堆越界写入。这种内存破坏条件允许攻击者覆盖相邻的内存结构，可能无需认证即可实现完全远程代码执行。由于攻击向量基于网络且无需用户交互，被利用的风险很高。成功利用该漏洞可能导致在受影响系统上实现远程代码执行，使攻击者能控制存在漏洞的应用程序。  
  
VulnCheck发布安全公告提到，该漏洞可能导致堆内存损坏，引发崩溃、拒绝服务条件，并可能使使用libssh2进行安全通信的系统完全受损。CVSS v4向量反映了攻击复杂度低，以及对机密性、完整性和可用性的高影响。安全研究员Tristan Madani负责任地披露了该漏洞，从而能够在漏洞遭大规模利用之前协调修复。  
  
该漏洞已在提交97acf3dfda80c91c3a8c9f2372546301d4a1a7a8引入的补丁中修复，该补丁对packet_length值实施了严格验证，以防止整数溢出和缓冲区溢出。强烈建议组织尽快将libssh2升级到已打补丁的版本。此外，安全团队应审查系统中静态链接或捆绑的libssh2版本，监控SSH流量中是否存在异常情况（如异常大的数据包大小），并在无法立即打补丁的情况下实施网络层控制措施。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Libssh CVE-2018-10933 扫描器和利用代码已发布，请尽快更新](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247488312&idx=3&sn=baf3ad7714b66b6a6b0394c75af295cb&scene=21#wechat_redirect)  
  
  
[NGINX 新漏洞可导致远程攻击者触发恶意代码](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526088&idx=3&sn=353fe1e4d9d79dec6b4cce44a35da5fe&scene=21#wechat_redirect)  
  
  
[Comet Backup 服务器严重漏洞可导致客户数据被远程泄露](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526149&idx=2&sn=58f20be37a8c71d4f0e7d16aa1e8f1b5&scene=21#wechat_redirect)  
  
  
[已存在13年的Apache ActiveMQ 严重漏洞可用于远程执行命令](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525686&idx=1&sn=51e7e391e06000c6fad494187241de39&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://cybersecuritynews.com/libssh2-vulnerability/  
  
  
题图：Pixa  
bay Licens  
e  
  
  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSf7nNLWrJL6dkJp7RB8Kl4zxU9ibnQjuvo4VoZ5ic9Q91K3WshWzqEybcroVEOQpgYfx1uYgwJhlFQ/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSN5sfviaCuvYQccJZlrr64sRlvcbdWjDic9mPQ8mBBFDCKP6VibiaNE1kDVuoIOiaIVRoTjSsSftGC8gw/640?wx_fmt=jpeg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ5iciaeKS21icDIWSVd0M9zEhicFK0rbCJOrgpc09iaH6nvqvsIdckDfxH2K4tu9CvPJgSf7XhGHJwVyQ/640?wx_fmt=gif "")  
  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
