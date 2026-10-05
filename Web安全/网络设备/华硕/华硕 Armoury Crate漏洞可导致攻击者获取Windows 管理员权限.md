---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-a1f70467cf36f845d6221716"
entity_id: "ve-a1f70467cf36f845d6221716"
schema_version: "1"
title: "华硕 Armoury Crate漏洞可导致攻击者获取Windows 管理员权限"
product: "ASUS Armoury Crate AsIO3.sys驱动"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-3464"
referenced_identifiers: ""
prerequisites: "本地已有代码执行/低权限账户；测试5.9.13.0，称5.9.9.0–6.1.18.0"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E5%8D%8E%E7%A1%95/%E5%8D%8E%E7%A1%95%20Armoury%20Crate%E6%BC%8F%E6%B4%9E%E5%8F%AF%E5%AF%BC%E8%87%B4%E6%94%BB%E5%87%BB%E8%80%85%E8%8E%B7%E5%8F%96Windows%20%E7%AE%A1%E7%90%86%E5%91%98%E6%9D%83%E9%99%90.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  华硕 Armoury Crate漏洞可导致攻击者获取Windows 管理员权限  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：ASUS Armoury Crate AsIO3.sys驱动
- 本文讨论：CVE-2025-3464
- 版本、权限与配置前提：本地已有代码执行/低权限账户；测试5.9.13.0，称5.9.9.0–6.1.18.0
- 资料类型：Windows本地提权新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 错归网络设备/华硕路由器实际Windows硬件管理软件
- MSRs翻译为特定模型注册表，应寄存器；硬链接更换/进程身份说明过简
- 无Talos/ASUS公告直链或明确安全版本；元数据漏CVE

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 安全版本、驱动版本对应关系和TOCTOU细节待官方研究核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Bill Toulas  代码卫士   2025-06-17 10:40  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**华硕Armoury Crate软件中存在一个高危漏洞，可导致威胁人员在Windows设备上提权至系统权限。该漏洞是CVE-2025-3464，CVSS评分8.8。**  
  
![](../../.resource/remote/36b36005e60183d3603e8c2d5f0b55ab066f22ab6e7dafe7c44c0fa65d02a936.png "")  
  
  
该漏洞可用于绕过授权，影响 Armoury Crate 系统管理软件的 AsIO3.sys 版本。Armoury Crate 是华硕 Windows 的官方系统控制软件，为控制RGB灯光 (Aura Sync)、调整风扇弧度、管理性能配置和华硕外围设备以及下载驱动和固件更新提供统一接口。  
  
为了执行所有这些功能并提供底层系统监控，该软件套件使用内核驱动访问和控制硬件特性。思科Talos团队的研究员 Marcin “Icewall” Noga 报送了该漏洞。  
  
思科Talos 团队发布安全公告提到，该漏洞在于驱动基于 AsusCertService.exe的硬编码 SHA-256哈希和一个PID允许列表验证调用函数，而非使用正确的OS级别的访问控制。利用该漏洞需要创建从一个非恶意测试app到一个虚假可执行文件的硬链接。攻击者启动该app，暂停并将该硬链接指向 AsusCertService.exe。当该驱动检查该文件的 SHA-256哈希时，它会读取现已链接的可信二进制，使该测试 app 绕过授权并获得对驱动的访问权限。这就使得攻击者能够获得底层系统权限，从而直接访问物理内存、I/O端口和特定模型的注册表 (MSRs)，从而导致OS易受攻陷。  
  
值得注意的是，攻击者必须已经在该系统（恶意软件感染、钓鱼攻击、受陷低权限账户）才能利用CVE-2025-3464。然而，该漏洞在全球计算机上大量部署，因此这个庞大的攻击面足以吸引攻击者的火力。  
  
研究人员已正式开漏洞影响 Armoury Crate 5.9.13.0版本，但华硕在安全通告中提到，该漏洞影响5.9.9.0至6.1.18.0之间的所有版本。要缓解该漏洞，建议打开 Armoury Crate app，进入“设置＞更新中心＞检查更新＞更新”应用最新更新。  
  
2月份，思科将该漏洞报送给华硕，但截止目前尚未出现在野利用。不过，“华硕强烈建议用户将 Armoury Crate 更新至最新版本”。  
  
Windows 内核驱动漏洞可导致本地提权后果，非常受黑客欢迎，包括勒索团伙、恶意软件团伙以及政府机构威胁组织等。  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[华硕修复严重的DriverHub 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522987&idx=1&sn=dd6c1684116b2d65b1efe7c80afe5945&scene=21#wechat_redirect)  
  
  
[华硕修复严重的AMI 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522841&idx=1&sn=b39cd7520c5b0c63d3c0e807374feeb2&scene=21#wechat_redirect)  
  
  
[华硕：启用AiCloud 的路由器中存在严重的认证绕过漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522801&idx=1&sn=be29e21bdd328bab3ee1bbc42562d47e&scene=21#wechat_redirect)  
  
  
[华硕：严重的远程绕过漏洞影响7款路由器](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519766&idx=1&sn=e5617e80059a29c20c16b011271e8511&scene=21#wechat_redirect)  
  
  
[华硕证实菲律宾员工数据被泄露在黑客论坛](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519060&idx=2&sn=6105a3152e4cf58dc7f6100cc53d066c&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/asus-armoury-crate-bug-lets-attackers-get-windows-admin-privileges/  
  
  
  
题图：  
Pixabay Licen  
se  
  
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
