---
source: "gelusus/wxvl 公众号漏洞文库"
product: "PHP/libxml HTTP charset处理"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2025-1219"
referenced_identifiers: "CVE-2020-0796"
identifier_role: "primary"
identifier_status: "unknown"
title: "关键 PHP 漏洞允许黑客绕过验证以加载恶意内容"
prerequisites: "来源所述条件，未列明部分仍待核：影响写8.3<8.3.18而修复写8.3.19，其他分支8.1.32/8.2.28/8.4.5；无下界"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-1ca3132a7c09d5d8ecde21a8"
entity_id: "ve-1ca3132a7c09d5d8ecde21a8"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：影响写8.3&lt;8.3.18而修复写8.3.19，其他分支8.1.32/8.2.28/8.4.5；无下界

代码与实验材料：重定向首Content-Type错误选取机制明确，PoC代码丢失只剩标识符

来源证据范围：CybersecurityNews二手报道，无PHP公告

- **事实待核（1）**：8.3分支版本自相矛盾；依据：8.3.18在影响上界与安全版本之间未被解释。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **代码与转录边界（2）**：转录/翻译损坏关键复现；依据：函数or、content-type漂移、PHP译作菲律宾语、redirect.php示例只三个词。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **证据待核（3）**：验证绕过影响缺实际应用上下文；依据：错误charset不等于所有DOM/SimpleXML使用均可加载恶意内容，需说明可控重定向与后续输出。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  关键 PHP 漏洞允许黑客绕过验证以加载恶意内容   
邑安科技  邑安全   2025-04-01 17:23  
  
更多全球网络安全资讯尽在邑安全  
  
![](../../.resource/remote/201bd6328fc83146f8c118d33ebe1b2f521dcd8314da4188e6ce7ff3e59b4eb7.png "")  
  
已在 PHP 的 libxml 流中发现了一个严重漏洞，该漏洞可能会影响依赖 DOM 或 SimpleXML 扩展进行 HTTP 请求的 Web 应用程序。  
  
该漏洞被跟踪为  CVE-2025-1219，涉及在请求重定向资源时错误地处理标头，从而导致文档误读和验证绕过等安全风险。content-type  
  
该漏洞影响 PHP 版本：  
- 低于 8.1.32  
  
- 低于 8.2.28  
  
- 低于 8.3.18  
  
- 8.4.5 以下  
  
## 漏洞的详细信息  
  
当 HTTP 流包装器遵循重定向时，会出现此问题。它不会在执行后续请求之前清除以前捕获的标头，而是将多个请求的标头附加到单个数组中。  
  
这将生成一个包含来自所有请求的标头的数组，其中来自最终请求的标头排在最后。  
  
函数 or 扫描此数组中的标头以确定响应的字符集。  
```
php_libxml_input_buffer_create_filename()
php_libxml_sniff_charset_from_stream()
content-type
```  
  
但是，它会从上到下按顺序处理标头，并在遇到的第一个标头处停止。content-type  
  
根据 PHP  
报告，此标头可能与包含正在解析的 HTML 正文的最终响应不对应。因此，可能会使用不正确的字符集解析文档，从而导致潜在的安全问题。  
  
此漏洞可允许攻击者通过利用不正确的字符集检测来纵文档的解析方式。例如：  
- 文档可能会被误解，从而改变其预期含义。  
  
- 如果文档解析不正确，则可能会绕过验证过程。  
  
- 使用类似 的方法导出此类文档可能会导致保留原始字符集的意外输出。->saveHtml()  
使用 PHP 的 DOM 或 SimpleXML 扩展进行   
HTTP 请求的应用程序特别容易受到攻击。  
## 概念验证  
  
概念验证 （PoC） 演示了如何利用此漏洞：  
1.重定向脚本 （） 发送指定 charset （） 的标头并重定向到另一个资源。

```
redirect.php
content-type
utf-16
```  
2.当通过 PHP 的 DOMDocument 或 SimpleXML 扩展访问时，初始标头被错误地用于解析，而不是最终响应。content-type  
此行为可能导致不正确的解析和验证绕过，如导出的 HTML 内容在作后仍保留其原始字符集的情况中所示。  
  
PHP 开发人员已在以下版本中解决了此问题：  
- PHP 8.1.32 版本  
  
- 菲律宾语 8.2.28  
  
- PHP 8.3.19  
  
- 菲律宾语 8.4.5  
  
## 缓解步骤  
  
为了防范 CVE-2025-1219，强烈建议用户将其 PHP 安装更新到上面列出的补丁版本之一：  
1. 使用 检查当前版本。php -v  
1. 通过软件包管理器更新您的系统，或从   
php.net下载更新的二进制文件。  
  
1. 更新后重新启动任何依赖 PHP 的服务。  
  
CVE-2025-1219 突出了 PHP 使用 libxml 流处理 HTTP 重定向的方式中的一个严重缺陷，从而对通过 HTTP 请求解析文档的应用程序构成风险。该漏洞凸显了定期更新软件以应对新出现的安全威胁的重要性。  
  
原文来自: cybersecuritynews.com  
  
原文链接:   
https://cybersecuritynews.com/critical-php-vulnerability-let-hackers-bypass-the-validation/  
  
欢迎收藏并分享朋友圈，让五邑人网络更安全  
  
![](../../.resource/remote/83ae91c3bc56f5917ffcf104a4039d82991163da413f4c7ceb47ecc7293d366c.jpg "")  
  
欢迎扫描关注我们，及时了解最新安全动态、学习最潮流的安全姿势！  
  
推荐文章  
  
1  
  
[新永恒之蓝？微软SMBv3高危漏洞（CVE-2020-0796）分析复现](http://mp.weixin.qq.com/s?__biz=MzUyMzczNzUyNQ==&mid=2247488913&idx=1&sn=acbf595a4a80dcaba647c7a32fe5e06b&chksm=fa39554bcd4edc5dc90019f33746404ab7593dd9d90109b1076a4a73f2be0cb6fa90e8743b50&scene=21#wechat_redirect)  
  
  
2  
  
[重大漏洞预警：ubuntu最新版本存在本地提权漏洞（已有EXP）　](http://mp.weixin.qq.com/s?__biz=MzUyMzczNzUyNQ==&mid=2247483652&idx=1&sn=b2f2ec90db499e23cfa252e9ee743265&chksm=fa3941decd4ec8c83a268c3480c354a621d515262bcbb5f35e1a2dde8c828bdc7b9011cb5072&scene=21#wechat_redirect)  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
