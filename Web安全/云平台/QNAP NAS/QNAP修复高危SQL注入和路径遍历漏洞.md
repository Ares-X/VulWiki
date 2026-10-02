---
source: "gelusus/wxvl 公众号漏洞文库"
title: "QNAP修复高危SQL注入和路径遍历漏洞"
product: "QNAP多产品"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。"
id: "vw-3a182d7a583996b61005bb40"
entity_id: "ve-3a182d7a583996b61005bb40"
schema_version: "1"
---

# QNAP修复高危SQL注入和路径遍历漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 59384/59387/53594/52871/53597均未进入元数据
- 区分Qfiling、MARS/HDP、macOS客户端及License Center
- NAS App Center更新建议不适用于macOS客户端
- SQL注入至代码执行结论及认证条件待原始公告核实
- 移除广告

### 操作风险与资料使用

- 含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

Ddos  代码卫士   2026-01-05 10:34  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**网络附加存储 (NAS) 巨头威联通 (QNAP) 发布了一系列安全公告，修复了多个可能导致攻击者窃取敏感数据、注入恶意代码或导致核心服务崩溃的严重漏洞。安全更新涵盖了从基于Mac的客户端工具到Qfiling和多应用恢复服务（MARS）等核心后端服务的广泛软件。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
威联通在公告中披露了两个高危漏洞（CVSS评分8.1）以及多个较低严重性但仍具威胁的漏洞，其中最严重漏洞可导致远程攻击者入侵NAS系统本身。  
  
Qfiling路径遍历漏洞（CVE-2025-59384，CVSS评分8.1）影响威联通自动化文件整理工具Qfiling，可被远程攻击者用于“读取意外文件或系统数据的内容”，已在Qfiling 3.13.1及以上版本中修复。  
  
多应用恢复服务 (MARS) SQL注入漏洞（CVE-2025-59387，CVSS评分8.1）可被远程攻击者用于“执行未授权代码或命令”，从而可能获取系统深层访问权限。该漏洞已在MARS 1.2.1.1686及以上版本（注：新版本已更名为“HDP for WordPress”）中修复。  
  
依赖QNAP桌面工具的Mac用户也需立即更新。威联通在适用于macOS系统的Qfinder Pro、Qsync和QVPN Device Client中发现了一个路径遍历漏洞（CVE-2025-53594）。虽然该漏洞因需要本地用户账户才能利用，严重性评级较低（CVSS 4.4），但仍存在风险。威联通在公告中提醒称：“若本地攻击者获取用户账户，可利用此漏洞读取意外文件或系统数据内容。”   
  
已修复版本包括：  
  
- Qfinder Pro (Mac)：7.13.0+  
  
- Qsync (Mac)：5.1.5+  
  
- QVPN Device Client (Mac)：2.2.8+  
  
  
  
此外，威联通还修复了License Center中的两个漏洞：  
  
- 越界读取漏洞（CVE-2025-52871）：可用于“获取秘密数据”。  
  
- 缓冲区溢出漏洞（CVE-2025-53597）：管理员级别攻击者可能 “修改内存或导致进程崩溃”。  
  
  
  
这两个漏洞均已在License Center 2.0.36版本中修复。威联通建议所有用户立即登录QTS或QuTS hero管理员界面，打开App Center并应用所有可用更新，保护设备安全。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[QNAP修复Pwn2Own大赛上发现的7个 NAS 0day 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524352&idx=1&sn=32cb3690b5c7841d5cd484997fc1a32b&scene=21#wechat_redirect)  
  
  
[QNAP 提醒注意 Windows 备份软件中的严重 ASP.NET 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524292&idx=2&sn=358d93e91985d5c3e0efde32e60d34a6&scene=21#wechat_redirect)  
  
  
[QNAP修复Pwn2Own大赛利用的多个漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521736&idx=2&sn=37cc8cc02d4dc7c59168f8bb841938a9&scene=21#wechat_redirect)  
  
  
[QNAP提醒注意NAS设备中严重的认证绕过漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519033&idx=2&sn=59f095fb0e0636ab2257aaf9cc7d7e27&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://securityonline.info/qnap-patches-high-severity-sql-injection-and-path-traversal-flaws/  
  
  
题图：Pixabay License  
  
  
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
