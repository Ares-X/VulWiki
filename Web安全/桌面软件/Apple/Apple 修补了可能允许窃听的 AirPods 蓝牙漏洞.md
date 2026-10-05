---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-27867;CVE-2024-27812"
identifier_role: "primary"
primary_identifiers: "CVE-2024-27867;CVE-2024-27812"
referenced_identifiers: ""
identifier_status: "unknown"
title: "Apple 修补了可能允许窃听的 AirPods 蓝牙漏洞"
product: "Apple AirPods/Beats固件；visionOS ARKit Quick Look"
record_type: "advisory"
document_type: "双主题漏洞新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "蓝牙近距离、耳机尝试连接历史配对设备；visionOS恶意Web内容及3D对象创建"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Apple/Apple%20%E4%BF%AE%E8%A1%A5%E4%BA%86%E5%8F%AF%E8%83%BD%E5%85%81%E8%AE%B8%E7%AA%83%E5%90%AC%E7%9A%84%20AirPods%20%E8%93%9D%E7%89%99%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-cbb52ab998f83ca26340636c"
entity_id: "ve-cbb52ab998f83ca26340636c"
schema_version: "1"
---

# Apple 修补了可能允许窃听的 AirPods 蓝牙漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Apple AirPods/Beats固件；visionOS ARKit Quick Look
- 文献类型：双主题漏洞新闻
- 版本、权限及部署边界：蓝牙近距离、耳机尝试连接历史配对设备；visionOS恶意Web内容及3D对象创建
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 元数据只27867，后半独立讨论visionOS27812，应拆开产品和漏洞实体
2. 首句写固件更新可能允许未授权访问，语义反转，应明确更新修复此问题
3. 将耳机访问直接解释为窃听缺具体音频输入/状态证据；须与厂商影响描述区分
4. 列6A326/6F8但未逐型号映射，visionOS1.2修复范围与无交互条件需官方核验
5. 苹果公告/研究者引用未保留链接；大量调查表/公众号广告与HTML样式噪声

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<http://www.jsgjxx.com>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 信息安全大事件   2024-06-26 21:19  
  
Apple 发布了 AirPods的固件更新，可能允许恶意行为者以未经授权的方式访问耳机。  
  
该身份验证问题被跟踪为  
   
CVE-2024-27867，会影响 AirPods（第 2 代及后续机型）、AirPods Pro（所有型号）、AirPods Max、Powerbeats Pro 和 Beats Fit Pro。  
  
苹果在周二  
的一份公告中表示  
：“当你的耳机正在寻求与你之前配对的设备之一的连接请求时，蓝牙范围内的攻击者可能能够欺骗预期的源设备并访问你的耳机。  
  
换句话说，物理上接近的对手可以利用该漏洞窃听私人对话。苹果表示，这个问题已经通过改进状态管理得到解决。  
  
乔纳斯·德雷斯勒（Jonas Dreßler）因发现和报告该漏洞而受到赞誉。它已作为 AirPods 固件更新 6A326、AirPods 固件更新 6F8 和 Beats 固件更新 6F8 的一部分进行了修补。  
  
两周前，这家iPhone制造商推出了visionOS（1.2版）的更新  
，以弥补21个缺点，其中包括WebKit浏览器引擎中的七个缺陷。  
  
其中一个问题与逻辑缺陷   
（CVE-2024-27812） 有关，该缺陷可能导致在处理 Web 内容时出现拒绝服务 （DoS）。它说，这个问题已经通过改进的文件处理得到了解决。  
  
报告该漏洞的安全研究员瑞安·皮克伦（Ryan Pickren）将其描述为“世界上第一个空间计算黑客”，可以将其武器化，以“绕过所有警告，并用任意数量的动画3D对象强行填满你的房间”，而无需用户交互。  
  
该漏洞利用了   
Apple 在使用ARKit 快速查看功能  
在受害者房间中生成   
3D 对象时未能应用权限模型。更糟糕的是，即使在退出 Safari 后，这些动画对象仍会继续存在，因为它们由单独的应用程序处理。  
  
“此外，它甚至不需要这个锚标签被人类'点击'，”皮克伦  
说  
。“因此，编程 JavaScript 点击（即 document.querySelector（'a'）.click（））没有问题！这意味着我们可以启动任意数量的 3D、动画、声音创建对象，而无需任何用户交互。  
  
  
<table><tbody style="outline: 0px;visibility: visible;"><tr class="ue-table-interlace-color-single js_darkmode__0" data-style="outline: 0px; background-color: rgb(28, 28, 28); visibility: visible; color: rgb(205, 205, 205) !important;" style="outline: 0px;background-color: rgb(28, 28, 28);visibility: visible;color: rgb(205, 205, 205) !important;"><td width="557" valign="top" data-style="outline: 0px; word-break: break-all; hyphens: auto; border-color: rgb(76, 76, 76); background-color: rgb(255, 218, 169); visibility: visible; color: rgb(25, 25, 25) !important;" class="js_darkmode__1" style="outline: 0px;word-break: break-all;hyphens: auto;border-color: rgb(76, 76, 76);background-color: rgb(255, 218, 169);visibility: visible;color: rgb(25, 25, 25) !important;"><section style="outline: 0px;line-height: normal;visibility: visible;"><span style="outline: 0px;font-size: 12px;visibility: visible;color: rgb(0, 0, 0);">尊敬的读者：<br style="outline: 0px;visibility: visible;"/>感谢您花时间阅读我们提供的这篇文章。我们非常重视您的时间和精力，并深知信息对您的重要性。<br style="outline: 0px;visibility: visible;"/>我们希望了解您对这篇文章的看法和感受。我们真诚地想知道您是否认为这篇文章为您带来了有价值的资讯和启示，是否有助于您的个人或职业发展。<br style="outline: 0px;visibility: visible;"/>如果您认为这篇文章对您非常有价值，并且希望获得更多的相关资讯和服务，我们愿意为您提供进一步的定制化服务。请通过填写我们提供的在线表单，与我们联系并提供您的邮箱地址或其他联系方式。我们将定期向您发送相关资讯和更新，以帮助您更好地了解我们的服务和文章内容。</span></section><section style="outline: 0px;line-height: normal;visibility: visible;"><br style="outline: 0px;visibility: visible;"/></section><section style="outline: 0px;line-height: normal;text-indent: 0em;visibility: visible;"><span style="outline: 0px;color: rgb(0, 0, 0);">                       </span><img src="../../.resource/remote/0d554935043ebec0be7c22ee5229f3c7da39f4dedb812ed05346d2b7be862262.webp" class="rich_pages wxw-img" data-backh="106" data-backw="106" data-cropselx1="0" data-cropselx2="119" data-cropsely1="0" data-cropsely2="119" data-galleryid="" data-imgfileid="100005773" data-ratio="1" data-s="300,640" data-src="../../.resource/remote/0d554935043ebec0be7c22ee5229f3c7da39f4dedb812ed05346d2b7be862262.webp" data-type="png" data-w="1000" style="outline: 0px;font-family: 宋体;font-size: 14px;letter-spacing: 0.578px;text-align: center;visibility: visible !important;width: 119px !important;"/></section><section style="outline: 0px;line-height: normal;text-indent: 0em;"><span style="outline: 0px;font-family: 宋体;font-size: 12px;letter-spacing: 0.578px;text-align: center;color: rgb(0, 0, 0);">                               扫描二维码，参与调查</span></section><section style="outline: 0px;line-height: normal;"><br style="outline: 0px;letter-spacing: 0.544px;"/></section></td></tr></tbody></table>  
  
**END**  
  
  
  
点击下方，关注公众号  
  
获取免费咨询和安全服务  
  
![](../../.resource/remote/396c6c1e582fe7106413e1361e0478cb82d63662d432871e1fa160f844c53a79.webp "")  
  
  
  
  
安全咨询/安全集成/安全运营  
  
专业可信的信息安全应用服务商！  
  
http://www.jsgjxx.com  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
