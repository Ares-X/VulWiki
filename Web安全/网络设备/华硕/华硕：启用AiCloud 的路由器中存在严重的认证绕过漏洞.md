---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-89aca5585b644e709f1a1bc8"
entity_id: "ve-89aca5585b644e709f1a1bc8"
schema_version: "1"
title: "华硕：启用AiCloud 的路由器中存在严重的认证绕过漏洞"
product: "ASUS AiCloud路由器"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-2492"
referenced_identifiers: ""
prerequisites: "AiCloud启用；列382/386/388/102固件分支未到具体build"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E5%8D%8E%E7%A1%95/%E5%8D%8E%E7%A1%95%EF%BC%9A%E5%90%AF%E7%94%A8AiCloud%20%E7%9A%84%E8%B7%AF%E7%94%B1%E5%99%A8%E4%B8%AD%E5%AD%98%E5%9C%A8%E4%B8%A5%E9%87%8D%E7%9A%84%E8%AE%A4%E8%AF%81%E7%BB%95%E8%BF%87%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  华硕：启用AiCloud 的路由器中存在严重的认证绕过漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：ASUS AiCloud路由器
- 本文讨论：CVE-2025-2492
- 版本、权限与配置前提：AiCloud启用；列382/386/388/102固件分支未到具体build
- 资料类型：认证绕过新闻预警；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 元数据漏主CVE；受影响具体型号及固定build未列，只有二手链接
- 未授权函数执行不能自行升级为任意系统命令执行
- 关闭全部WAN相关服务是广义加固，需与该洞必要缓解区分

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 具体影响和补丁/无利用状态待官方时点核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Bill Toulas  代码卫士   2025-04-21 09:32  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**华硕提醒称，启用 AiCloud 的路由器中存在一个认证绕过漏洞，可导致远程攻击者在设备上执行未授权函数执行。**  
  
该漏洞的编号是CVE-2025-2492，CVSS v4评分为9.2，可通过一个特殊构造的请求遭远程利用且无需认证，使其尤为危险。华硕在安全通告中提到，“某些华硕路由器固件系列中存在一个认证控制不当漏洞。一个构造请求即可触发该漏洞。”  
  
AiCloud 是很多华硕路由器内置的基于云的远程访问特性，可将路由器转换为小型的私有云服务器。用户可通过AiCloud 访问从任何地方经由互联网连接到该路由器的USB驱动上的文件，远程访问流媒体、访问家庭网络和其它云存储服务之间的同步文件，并通过链接与他人共享文件。  
  
该漏洞位于 AiCloud 中，影响大量机型。华硕已为多个固件分支发布修复方案，包括 3.0.0.4_382系列、3.0.0.4_386系列、3.0.0.4_388系列和3.0.0.6_102系列。  
  
建议用户升级至相关型号的最新固件版本，可从厂商的支持门户或产品查询页面获得相关信息。另外，华硕还给出如何申请固件更新的详细指南。华硕还建议用户使用唯一密码保护无线网络安全和路由器管理员页面，并确保密码至少为10个字符长度且由字母、数字和字符组成。  
  
建议已达生命周期产品的受影响用户完全禁用 AiCloud 并关闭 WAN 的互联网访问权限、端口转发、DDNS、VPN服务器、DMZ、端口触发和FTP服务。  
  
虽然尚未有关于CVE-2025-2492已遭活跃利用或公开 PoC 利用的报告，但攻击者一般都会通过恶意软件利用这些漏洞或将其纳入 DDoS 僵尸网络中。因此，强烈建议用户尽快升级至最新固件版本。  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[华硕：严重的远程绕过漏洞影响7款路由器](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519766&idx=1&sn=e5617e80059a29c20c16b011271e8511&scene=21#wechat_redirect)  
  
  
[华硕证实菲律宾员工数据被泄露在黑客论坛](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519060&idx=2&sn=6105a3152e4cf58dc7f6100cc53d066c&scene=21#wechat_redirect)  
  
  
[华硕路由器易遭多个RCE漏洞影响](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517570&idx=1&sn=34fd77e3506951e7f7fd62a7ab442b2c&scene=21#wechat_redirect)  
  
  
[华硕紧急修复多个严重的路由器漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516769&idx=1&sn=e00e30e1c0b1187da247a4f936d2761e&scene=21#wechat_redirect)  
  
  
[华硕修复可禁用安全启动程序的UEFI漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514814&idx=2&sn=d77760825e29cde63586a63c502a43c9&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/asus-warns-of-critical-auth-bypass-flaw-in-routers-using-aicloud/  
  
  
  
题图：  
Pixabay   
License  
  
****  
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
