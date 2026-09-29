---
cve: "CVE-2025-20128"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  思科修复 ClamAV 拒绝服务 (DoS) 漏洞，专家警告称概念验证 (PoC) 漏洞代码可用   
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
