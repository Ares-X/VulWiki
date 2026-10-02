---
cve: "CVE-2025-20128"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-a6dcc6ce499a4f133d1a9e77"
entity_id: "ve-a6dcc6ce499a4f133d1a9e77"
schema_version: "1"
title: "思科修复 ClamAV 拒绝服务 (DoS) 漏洞，专家警告称概念验证 (PoC) 漏洞代码可用"
product: "ClamAV OLE2解析"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-20128"
referenced_identifiers: "CVE-2023-20032"
prerequisites: "扫描恶意OLE2文件；主漏洞版本只在图中；尾部1.0.0/0.105.1/0.103.7对应历史HFS+漏洞"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/%E6%80%9D%E7%A7%91%E4%BF%AE%E5%A4%8D%20ClamAV%20%E6%8B%92%E7%BB%9D%E6%9C%8D%E5%8A%A1%20%28DoS%29%20%E6%BC%8F%E6%B4%9E%EF%BC%8C%E4%B8%93%E5%AE%B6%E8%AD%A6%E5%91%8A%E7%A7%B0%E6%A6%82%E5%BF%B5%E9%AA%8C%E8%AF%81%20%28PoC%29%20%E6%BC%8F%E6%B4%9E%E4%BB%A3%E7%A0%81%E5%8F%AF%E7%94%A8.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  思科修复 ClamAV 拒绝服务 (DoS) 漏洞，专家警告称概念验证 (PoC) 漏洞代码可用   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：ClamAV OLE2解析
- 本文讨论：CVE-2025-20128
- 版本、权限与配置前提：扫描恶意OLE2文件；主漏洞版本只在图中；尾部1.0.0/0.105.1/0.103.7对应历史HFS+漏洞
- 资料类型：新闻通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 主漏洞影响产品/版本完全图片化，文本无修复版本
- 后半历史漏洞描述重复，容易错把历史版本当主漏洞范围
- 安全软件误归网络设备；仅二手新闻链接

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 主漏洞版本表及补丁未核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

会杀毒的单反狗  军哥网络安全读报   2025-01-27 01:00  
  
**导****读**  
  
  
  
思科发布安全更新，以解决 ClamAV 拒绝服务 (DoS) 漏洞（编号为 CVE-2025-20128）。思科 PSIRT 专家警告称，该漏洞的概念验证 (PoC) 漏洞代码已可用。  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/AnRWZJZfVaFcfciaMOiau5iaQo70v3TJKTMLb6EUcdQ9HOynD1NtC69kJCsbXiatwba8VSHQVzCp6Kj1YYNQWhBorg/640?wx_fmt=jpeg&from=appmsg "")  
  
  
该漏洞存在于 ClamAV 的对象链接与嵌入 2 (OLE2) 解密例程中。未经身份验证的远程攻击者可以利用此漏洞在易受攻击的设备上造成拒绝服务 (DoS) 情况。  
  
  
Cisco ClamAV（Clam AntiVirus）是一款开源防病毒引擎，旨在检测恶意软件、病毒和其他恶意威胁。它广泛用于电子邮件扫描、文件扫描和网络安全，尤其是在基于 Linux 的系统中。  
  
  
“此漏洞是由于边界检查中的整数下溢导致的，从而允许堆缓冲区溢出读取。攻击者可以通过提交包含 OLE2 内容的精心设计的文件来利用此漏洞，让受影响设备上的 ClamAV 进行扫描。”通报中写道。“成功利用此漏洞可让攻击者终止 ClamAV 扫描过程，从而导致受影响的软件出现 DoS 情况。”  
  
  
该中等影响漏洞会影响 Linux、Mac 和 Windows，可能会导致扫描崩溃并延迟或停止扫描操作。  
  
  
该漏洞影响以下产品：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/AnRWZJZfVaFcfciaMOiau5iaQo70v3TJKTMu6cctl4icUP8hAn6PKgaJu6kYyYdobu7VpicG0lFgSxw0rSRSQRu7CXA/640?wx_fmt=png&from=appmsg "")  
  
  
思科 PSIRT 尚未发现利用此漏洞的攻击。  
  
  
Google OSS-Fuzz 报告了此漏洞。  
  
  
2023 年 2 月，思科修复了ClamAV产品中的一个严重漏洞，编号为 CVE-2023-20032（CVSS 评分：9.8）。该漏洞位于 HFS+ 文件解析器组件中，攻击者可以触发该问题以在易受攻击的设备上执行远程代码或触发 DoS 条件。  
  
  
该问题被标记为 CVE-2023-20032  
    
（CVSS 分数：9.8），与驻留在 HFS+ 文件解析器中的远程代码执行情况有关。  
  
  
该漏洞影响 1.0.0 及更早版本、0.105.1 及更早版本以及 0.103.7 及更早版本。该公司感谢 Google 的 Simon Scannell 报告了此问题。  
  
  
该漏洞是影响 ClamAV 扫描库的缓冲区溢出问题，是由于缺少缓冲区大小检查造成的。  
  
  
新闻链接：  
  
https://securityaffairs.com/173446/uncategorized/cisco-fixed-clamav-dos-flaw.html  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/AnRWZJZfVaGC3gsJClsh4Fia0icylyBEnBywibdbkrLLzmpibfdnf5wNYzEUq2GpzfedMKUjlLJQ4uwxAFWLzHhPFQ/640?wx_fmt=jpeg "")  
  
扫码关注  
  
军哥网络安全读报  
  
**讲述普通人能听懂的安全故事**  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
