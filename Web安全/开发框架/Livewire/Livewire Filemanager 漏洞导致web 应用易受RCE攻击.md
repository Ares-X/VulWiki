---
source: "gelusus/wxvl 公众号漏洞文库"
product: "Livewire Filemanager/第三方组件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2025-14894"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Livewire Filemanager 漏洞导致web 应用易受RCE攻击"
prerequisites: "来源所述条件，未列明部分仍待核：无受影响和修复版本，也无准确包坐标；鉴权前提未证明"
side_effects: "未执行；本文需注意的操作影响：storage:link被直接等同于PHP执行；符号链接只暴露路径，执行PHP还依赖Web服务器处理规则、上传位置及访问权限"
source_status: "unknown"
id: "vw-1b7c6e807ef95db23bd5c5b1"
entity_id: "ve-1b7c6e807ef95db23bd5c5b1"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：无受影响和修复版本，也无准确包坐标；鉴权前提未证明

代码与实验材料：只有概述，无请求、代码或可追溯复现

来源证据范围：代码卫士转载CybersecurityNews，缺CERT/CC及供应商直接说明

- **结论使用边界（1）**：第三方组件与Livewire核心混淆；依据：实际对象是LivewireFilemanagerComponent.php，不是所有Livewire或Laravel应用。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（2）**：storage:link被直接等同于PHP执行；依据：符号链接只暴露路径，执行PHP还依赖Web服务器处理规则、上传位置及访问权限。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（3）**：厂商态度与默认未鉴权均缺一手证据；依据：声称厂商故意省略验证，正文仅二手报道且无端点、版本或配置。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Livewire Filemanager 漏洞导致web 应用易受RCE攻击  
Abinaya
                    Abinaya  代码卫士   2026-01-20 10:11  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**一款广泛应用于Laravel web应用的嵌入式文件管理组件 Livewire Filemanager 中存在一个高危漏洞CVE-2025-14894，可导致未经身份验证的攻击者在易受攻击的服务器上执行任意代码。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
对 LivewireFilemanagerComponent.php 组件中的文件验证不当导致该漏洞。该工具未能执行正确的文件类型和MIME验证，导致攻击者直接通过 web 接口上传恶意 PHP 文件。一旦上传成功，只要在标准的 Laravel 设置流程中执行php artisan storage:link 命令，就可通过公开可访问的 /storage/ 目录被执行。  
  
值得注意的是，供应商故意未将文件类型验证纳入安全文档，将验证责任推给开发人员。然而，由于该严重漏洞位于该工具的架构中，因此无需其它防护措施，即导致上传文件被执行。成功利用该漏洞可导致攻击者以 web 服务器用户的权限执行远程代码，从而导致系统遭完全攻陷，如对 web 服务器进程可访问的所有文件拥有不受限的文件读写权限。攻击者之后可跳转到受陷的联网系统和基础设施。  
  
执行攻击无需身份验证，只需通过 Livewire Filemanager 的上传接口将 PHP webshell 上传到应用，之后通过存储URL访问文件，即可触发攻击执行。  
  
![](../../.resource/remote/fde592f1b6c2b4f60ebfdd7d572ca3724a71e5d2e9e8bb3d47004e635475b974.gif "")  
  
**受影响平台和状况**  
  
  
  
  
在该漏洞被披露时，Bee Interactive、Laravel和 Laravel Swiss厂商并未证实该漏洞的存在。CERT/CC 建议立即采取防护措施，如验证 php artisan storage:link 是否已被执行；如确认，则删除 web 服务能力。  
  
使用 Livewire Filemanager的组织机构应当立即在应用程序层执行文件上传限制机制（独立于Livewire功能）；执行严格的白名单策略，仅限上传安全的文件类型并应用全面的 MIME 类型验证。将上传的文件存储在 web 可访问目录之外。如果操作无需使用 web 服务，则关闭公开存储链接。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[OpenSSH 严重漏洞可导致 Moxa 以太网交换机易受RCE攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524868&idx=2&sn=734a45fb6b2c137eff46cd0261228384&scene=21#wechat_redirect)  
  
  
[趋势科技：速修复这个严重的 Apex Central RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524853&idx=1&sn=c4cd6fbd85899f9051551aad7c427db0&scene=21#wechat_redirect)  
  
  
[Veeam 修复备份服务器中的RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524822&idx=2&sn=bf38cc5485bf41c1eb57971488d1f356&scene=21#wechat_redirect)  
  
  
[AdonisJS 9.2 框架存在严重漏洞，可导致任意文件写入和RCE](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524804&idx=2&sn=a95d956157098ba83a9cc5da708ab3ba&scene=21#wechat_redirect)  
  
  
[CISA 将已遭利用的 Digiever NVR RCE漏洞纳入KEV](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524761&idx=2&sn=1b94ad55c3aaf6d0f95f5c0d1386a2e4&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://cybersecuritynews.com/livewire-filemanager-vulnerability/  
  
  
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
