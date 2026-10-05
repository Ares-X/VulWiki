---
cve: "CVE-2025-20124"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-b605ea0a27b8356b89c58a0b"
entity_id: "ve-b605ea0a27b8356b89c58a0b"
schema_version: "1"
title: "思科修补启用 Root CmdExec 和 PrivEsc 的关键 ISE 漏洞"
product: "Cisco ISE"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-20124; CVE-2025-20125"
referenced_identifiers: ""
prerequisites: "20124已认证Java反序列化root；20125有效只读凭据越权；3.1P10/3.2P7/3.3P4修复，3.4不受影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/%E6%80%9D%E7%A7%91%E4%BF%AE%E8%A1%A5%E5%90%AF%E7%94%A8%20Root%20CmdExec%20%E5%92%8C%20PrivEsc%20%E7%9A%84%E5%85%B3%E9%94%AE%20ISE%20%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  思科修补启用 Root CmdExec 和 PrivEsc 的关键 ISE 漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cisco ISE
- 本文讨论：CVE-2025-20124；CVE-2025-20125
- 版本、权限与配置前提：20124已认证Java反序列化root；20125有效只读凭据越权；3.1P10/3.2P7/3.3P4修复，3.4不受影响
- 资料类型：双漏洞通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 元数据只有20124；两漏洞已说明相互独立，不应误组成必需链
- 无原始研究/厂商公告URL；后半推广HTML调查表噪声
- 将任一缺陷均导致代码执行的总述超出20125敏感信息/配置/重启描述

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 20124具体所需权限及20125后果范围待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

 信息安全大事件   2025-02-06 12:08  
  
Cisco 发布了更新，以解决身份服务引擎 （ISE） 的两个关键安全漏洞，这些漏洞可能允许远程攻击者在易受攻击的设备上执行任意命令并提升权限。  
  
漏洞如下：  
- CVE-2025-20124（CVSS 评分：9.9）- 思科 ISE API 中存在不安全的 Java 反序列化漏洞，可能允许经过身份验证的远程攻击者在受影响的设备上以 root 用户身份执行任意命令。  
  
- CVE-2025-20125（CVSS 评分：9.1）- 思科 ISE API 中存在一个授权绕过漏洞，可允许具有有效只读凭证的经过身份验证的远程攻击者获取敏感信息、更改节点配置并重新启动节点  
  
攻击者可以通过向未指定的   
API 端点发送构建的序列化 Java 对象或 HTTP 请求来将任一缺陷武器化，从而导致权限提升和代码执行。  
  
  
思科表示，这两个漏洞并不相互依赖，也没有解决方法可以缓解它们。以下版本已解决这些问题：  
- 思科   
ISE 软件版本 3.0（迁移到固定版本）  
  
- 思科   
ISE 软件版本 3.1（在 3.1P10 中修复）  
  
- 思科   
ISE 软件版本 3.2（在 3.2P7 中修复）  
  
- 思科   
ISE 软件版本 3.3（在 3.3P4 中修复）  
  
- 思科   
ISE 软件版本 3.4（不易受攻击）  
  
虽然网络设备巨头公司表示，它不知道任何恶意利用这些漏洞的行为，但建议用户保持他们的系统处于最新状态，以获得最佳保护。  
  
<table><tbody style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"><tr class="ue-table-interlace-color-single js_darkmode__16" data-style="-webkit-tap-highlight-color: transparent; outline: 0px; background-color: rgb(28, 28, 28); visibility: visible; color: rgb(205, 205, 205) !important;" style="-webkit-tap-highlight-color: transparent;outline: 0px;background-color: rgb(28, 28, 28);visibility: visible;color: rgb(205, 205, 205) !important;"><td width="557" valign="top" data-style="-webkit-tap-highlight-color: transparent; outline: 0px; word-break: break-all; hyphens: auto; border-color: rgb(76, 76, 76); background-color: rgb(255, 218, 169); visibility: visible; color: rgb(25, 25, 25) !important;" class="js_darkmode__17" style="-webkit-tap-highlight-color: transparent;outline: 0px;word-break: break-all;hyphens: auto;border-color: rgb(76, 76, 76);background-color: rgb(255, 218, 169);visibility: visible;color: rgb(25, 25, 25) !important;"><section style="-webkit-tap-highlight-color: transparent;outline: 0px;line-height: normal;visibility: visible;"><span style="-webkit-tap-highlight-color: transparent;outline: 0px;font-size: 12px;visibility: visible;color: rgb(0, 0, 0);">尊敬的读者：<br style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"/>感谢您花时间阅读我们提供的这篇文章。我们非常重视您的时间和精力，并深知信息对您的重要性。<br style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"/>我们希望了解您对这篇文章的看法和感受。我们真诚地想知道您是否认为这篇文章为您带来了有价值的资讯和启示，是否有助于您的个人或职业发展。<br style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"/>如果您认为这篇文章对您非常有价值，并且希望获得更多的相关资讯和服务，我们愿意为您提供进一步的定制化服务。请通过填写我们提供的在线表单，与我们联系并提供您的邮箱地址或其他联系方式。我们将定期向您发送相关资讯和更新，以帮助您更好地了解我们的服务和文章内容。</span></section><section style="-webkit-tap-highlight-color: transparent;outline: 0px;line-height: normal;visibility: visible;"><br style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"/></section><section style="-webkit-tap-highlight-color: transparent;outline: 0px;line-height: normal;text-indent: 0em;visibility: visible;"><span style="-webkit-tap-highlight-color: transparent;outline: 0px;color: rgb(0, 0, 0);">                   </span><img src="../../.resource/remote/0d554935043ebec0be7c22ee5229f3c7da39f4dedb812ed05346d2b7be862262.webp" class="rich_pages wxw-img" data-backh="106" data-backw="106" data-cropselx1="0" data-cropselx2="119" data-cropsely1="0" data-cropsely2="119" data-galleryid="" data-imgfileid="100006566" data-ratio="1" data-s="300,640" data-src="../../.resource/remote/0d554935043ebec0be7c22ee5229f3c7da39f4dedb812ed05346d2b7be862262.webp" data-type="png" data-w="1000" style="-webkit-tap-highlight-color: transparent;outline: 0px;font-family: 宋体;font-size: 14px;letter-spacing: 0.578px;text-align: center;visibility: visible !important;width: 119px !important;"/></section><section style="-webkit-tap-highlight-color: transparent;outline: 0px;line-height: normal;text-indent: 0em;"><span style="-webkit-tap-highlight-color: transparent;outline: 0px;font-family: 宋体;font-size: 12px;letter-spacing: 0.578px;text-align: center;color: rgb(0, 0, 0);">                               扫描二维码，参与调查</span></section><section style="-webkit-tap-highlight-color: transparent;outline: 0px;line-height: normal;"><br style="-webkit-tap-highlight-color: transparent;outline: 0px;letter-spacing: 0.544px;"/></section></td></tr></tbody></table>  
  
  
**END**  
  
  
  
点击下方，关注公众号  
  
获取免费咨询和安全服务  
  
![](../../.resource/remote/396c6c1e582fe7106413e1361e0478cb82d63662d432871e1fa160f844c53a79.webp "")  
  
  
  
  
安全咨询/安全集成/安全运营  
  
专业可信的信息安全应用服务商！  
  
http://www.jsgjxx.com  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
