---
source: "gelusus/wxvl 公众号漏洞文库"
product: "ASP.NET Core Data Protection"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-40372"
referenced_identifiers: "CVE-2025-55315"
identifier_role: "primary"
identifier_status: "unknown"
title: "ASP.NET Core Data Protection 身份 Cookie 验证问题（CVE-2026-40372，来源版本待核）"
prerequisites: "来源所述条件，未列明部分仍待核：Body gives Microsoft.AspNetCore.DataProtection10.0.0–10.0.6, fix10.0.7; managed authenticated-encryptor cases; distinguish app privilege from OS SYSTEM"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-3ee6b645a2bbbf037c783497"
entity_id: "ve-3ee6b645a2bbbf037c783497"
schema_version: "1"
---

## 核对与使用边界

- 明确更正：本文组件是 ASP.NET Core Data Protection，伪造应用身份 Cookie 不直接证明获得 Windows SYSTEM/root 或任意系统代码执行；权限以消费该 Cookie 的应用及后续授权为界。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Body gives Microsoft.AspNetCore.DataProtection10.0.0–10.0.6, fix10.0.7; managed authenticated-encryptor cases; distinguish app privilege from OS SYSTEM

代码与实验材料：No PoC, source excerpt explains HMAC validation and persistent forged sessions

来源证据范围：Named translator/author and BleepingComputer article URL; primary Microsoft advisory mentioned but not linked

- **凭据与会话边界（1）**：Lead overstates execution/OS privilege consequences without a demonstrated chain；依据：获得系统权限 versus later application-cookie/signing discussion。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **代码与转录边界（2）**：Truncated filename and missing primary CVE/package metadata；依据：Filename 严重的 ASP.NET.md; body 微软紧急修复严重的 ASP.NET 漏洞。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **来源与引用处置（3）**：Commercial links, recommendation list and social footer obscure actionable advisory。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  微软紧急修复严重的 ASP.NET 漏洞  
Sergiu Gatlan
                    Sergiu Gatlan  代码卫士   2026-04-23 10:40  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
****  
**微软发布紧急更新，修复了一个严重的 ASP.NET Core 权限提升漏洞 CVE-2026-40372。该漏洞位于 ASP.NET Core Data Protection 加密 API 中，可导致未经身份认证的攻击者通过伪造身份认证 cookie，在受影响设备上获得系统权限。**  
  
  
在本月补丁星期二期间，用户报告安装 .NET 10.0.6 更新后应用程序中出现解密失败问题后，微软发现该漏洞。微软在 .NET 10.0.7 的发布说明中表示：“Microsoft.AspNetCore.DataProtection 10.0.0 至 10.0.6 NuGet 包中存在一个回归问题，导致托管认证加密器在对负载的错误字节计算 HMAC 验证标签，并且在某些情况下会丢弃计算出的哈希值。在这些情况下，该认证漏洞可导致攻击者伪造能够通过 DataProtection 真实性检查的负载，并解密身份验证 cookie、防伪令牌、TempData、OIDC 状态等中先前受保护的负载。”  
  
微软在周二发布的安全公告中进一步解释称：“如果攻击者在存在漏洞的时间窗口内，利用伪造的负载以特权用户身份通过身份认证，可能诱使应用程序向自己颁发合法签名的令牌（如会话刷新令牌、API 密钥、密码重置链接等）。这些令牌在升级到 10.0.7 后仍然有效，除非更换 DataProtection 密钥环。”该漏洞还可能使攻击者泄露文件和修改数据，但不会影响系统的可用性。  
  
周二，微软高级项目经理 Rahul Bhandari 警告所有使用 ASP.NET Core Data Protection 的客户，尽快将 Microsoft.AspNetCore.DataProtection 包更新到 10.0.7，然后重部署，修复验证逻辑并确保任何伪造的负载都被自动拒绝。有关受影响平台、软件包及应用程序配置的更多信息，可参阅原始公告。  
  
去年十月份，微软还修复了 Kestrel Web 服务器中的一个 HTTP 请求走私漏洞（CVE-2025-55315），它被评定为ASP.NET Core 中“有史以来最高”的严重漏洞。成功利用 CVE-2025-55315 可使经过身份认证的攻击者劫持其它用户的凭据、绕过前端安全控制或导致服务器崩溃。  
  
本周一，微软发布了另一组带外更新，解决在安装 2026 年 4 月安全更新后影响 Windows Server 系统的问题。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[微软4月补丁星期二值得关注的漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525778&idx=2&sn=b5edef54c4ece70f1affe656616e58df&scene=21#wechat_redirect)  
  
  
[微软3月补丁星期二值得关注的漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525382&idx=1&sn=a2fde96ec371ca6512bbfc25b9f18f99&scene=21#wechat_redirect)  
  
  
[微软：AI已用于攻击的每个阶段](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525365&idx=2&sn=dff79e089be7ac2054e918366b567b52&scene=21#wechat_redirect)  
  
  
[微软2月补丁星期二值得关注的漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525101&idx=2&sn=973a3ab33cfe6290521da6d90b4c743e&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/microsoft/microsoft-releases-emergency-security-updates-for-critical-aspnet-flaw/  
  
  
题图：Pixa  
bay Licens  
e  
  
  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](../../.resource/remote/2c03ce3cc6bb81bca85bd412ed60e93c4bc0a295a1fc9d3739d8aca43497fbb4.jpg "")  
  
![](../../.resource/remote/b33054170f5acbf0023711f517b5bee9799a2f57b155a774d3945e6d78184e63.jpg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](../../.resource/remote/8a5c84b98d9b52b1d4f4306180ec26c9aa65342b326b5b98ad2f097b488152f4.gif "")  
  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
