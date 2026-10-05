---
cve: "CVE-2024-42448; CVE-2024-42449"
source: "gelusus/wxvl 公众号漏洞文库"
title: "Veeam 针对服务提供商控制台中的严重 RCE 漏洞发布补丁"
product: "Veeam Service Provider Console"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2024-42448; CVE-2024-42449"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "42448从已获服务器授权的管理agent机器进入，不是任意公网匿名用户；42449条件需另核"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-7159af6599704dbf1e3da413"
entity_id: "ve-7159af6599704dbf1e3da413"
schema_version: "1"
---

# Veeam 针对服务提供商控制台中的严重 RCE 漏洞发布补丁

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：42448从已获服务器授权的管理agent机器进入，不是任意公网匿名用户；42449条件需另核
- 证据范围：列VSPC7/8至8.1.0.21377及修复8.1.0.21999，RCE与NTLM泄露/删除文件分开叙述

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 元数据漏42449，需按每个CVE标注代理授权前提
- 厂家无缓解方案表述应标当时状态及来源
- 长HTML调查/广告占正文主要篇幅，应清理

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

 信息安全大事件   2024-12-04 11:53  
  
Veeam 发布了安全更新，以解决影响服务提供商控制台 （VSPC） 的关键缺陷，该缺陷可能为在易受攻击的实例上远程执行代码铺平道路。  
  
该漏洞被跟踪为   
CVE-2024-42448，CVSS 评分为 9.9 分（满分 10.0 分）。该公司指出，该错误是在内部测试期间发现的。  
  
Veeam 在一份公告中表示：“从 VSPC 管理代理机器，在管理代理在服务器上获得授权的情况下，可以在 VSPC 服务器机器上执行远程代码执行 （RCE）。  
  
Veeam 修补的另一个缺陷与漏洞（CVE-2024-42449，CVSS 评分：7.1）有关，该漏洞可能被滥用于泄露 VSPC 服务器服务帐户的 NTLM 哈希值并删除 VSPC 服务器计算机上的文件。  
  
这两个已识别的漏洞都影响   
Veeam 服务提供商控制台 8.1.0.21377 以及 7 和 8 版本的所有早期版本。版本 8.1.0.21999 中已解决这些问题。  
  
Veeam 进一步表示，没有缓解措施来解决问题，唯一的解决方案是升级到最新版本的软件。  
  
随着   
Veeam 产品中的缺陷被威胁行为者滥用来部署勒索软件，用户必须尽快采取行动保护其实例。  
  
<table><tbody style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"><tr class="ue-table-interlace-color-single js_darkmode__4" data-style="-webkit-tap-highlight-color: transparent; outline: 0px; background-color: rgb(28, 28, 28); visibility: visible; color: rgb(205, 205, 205) !important;" style="-webkit-tap-highlight-color: transparent;outline: 0px;background-color: rgb(28, 28, 28);visibility: visible;color: rgb(205, 205, 205) !important;"><td width="557" valign="top" data-style="-webkit-tap-highlight-color: transparent; outline: 0px; word-break: break-all; hyphens: auto; border-color: rgb(76, 76, 76); background-color: rgb(255, 218, 169); visibility: visible; color: rgb(25, 25, 25) !important;" class="js_darkmode__5" style="-webkit-tap-highlight-color: transparent;padding: 5px 10px;outline: 0px;word-break: break-all;hyphens: auto;border-color: rgb(76, 76, 76);background-color: rgb(255, 218, 169);visibility: visible;color: rgb(25, 25, 25) !important;"><section style="-webkit-tap-highlight-color: transparent;outline: 0px;line-height: normal;visibility: visible;"><span style="-webkit-tap-highlight-color: transparent;outline: 0px;font-size: 12px;visibility: visible;color: rgb(0, 0, 0);">尊敬的读者：<br style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"/>感谢您花时间阅读我们提供的这篇文章。我们非常重视您的时间和精力，并深知信息对您的重要性。<br style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"/>我们希望了解您对这篇文章的看法和感受。我们真诚地想知道您是否认为这篇文章为您带来了有价值的资讯和启示，是否有助于您的个人或职业发展。<br style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"/>如果您认为这篇文章对您非常有价值，并且希望获得更多的相关资讯和服务，我们愿意为您提供进一步的定制化服务。请通过填写我们提供的在线表单，与我们联系并提供您的邮箱地址或其他联系方式。我们将定期向您发送相关资讯和更新，以帮助您更好地了解我们的服务和文章内容。</span></section><section style="-webkit-tap-highlight-color: transparent;outline: 0px;line-height: normal;visibility: visible;"><br style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"/></section><section style="-webkit-tap-highlight-color: transparent;outline: 0px;line-height: normal;text-indent: 0em;visibility: visible;"><span style="-webkit-tap-highlight-color: transparent;outline: 0px;color: rgb(0, 0, 0);">                   </span><img src="../../.resource/remote/0d554935043ebec0be7c22ee5229f3c7da39f4dedb812ed05346d2b7be862262.webp" class="rich_pages wxw-img" data-backh="106" data-backw="106" data-cropselx1="0" data-cropselx2="119" data-cropsely1="0" data-cropsely2="119" data-galleryid="" data-imgfileid="100006408" data-ratio="1" data-s="300,640" data-src="../../.resource/remote/0d554935043ebec0be7c22ee5229f3c7da39f4dedb812ed05346d2b7be862262.webp" data-type="png" data-w="1000" style="-webkit-tap-highlight-color: transparent;outline: 0px;font-family: 宋体;font-size: 14px;letter-spacing: 0.578px;text-align: center;visibility: visible !important;width: 119px !important;"/></section><section style="-webkit-tap-highlight-color: transparent;outline: 0px;line-height: normal;text-indent: 0em;"><span style="-webkit-tap-highlight-color: transparent;outline: 0px;font-family: 宋体;font-size: 12px;letter-spacing: 0.578px;text-align: center;color: rgb(0, 0, 0);">                               扫描二维码，参与调查</span></section><section style="-webkit-tap-highlight-color: transparent;outline: 0px;line-height: normal;"><br style="-webkit-tap-highlight-color: transparent;outline: 0px;letter-spacing: 0.544px;"/></section></td></tr></tbody></table>  
  
  
**END**  
  
  
  
点击下方，关注公众号  
  
获取免费咨询和安全服务  
  
![](../../.resource/remote/396c6c1e582fe7106413e1361e0478cb82d63662d432871e1fa160f844c53a79.webp "")  
  
  
  
  
安全咨询/安全集成/安全运营  
  
专业可信的信息安全应用服务商！  
  
http://www.jsgjxx.com  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
