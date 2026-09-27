---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  CERT/CC 警告：二进制解析器漏洞允许 Node.js 特权级代码执行  
Rhinoer
                    Rhinoer  犀牛安全   2026-02-03 16:02  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qvpgicaewUBlibkAjaR8rHFBibnQTUkSKXUOCLor13Mo0xCcbahUtCn0ApmaqkVcg2xY4IiaicfGH72xrIKU77Kef2g/640?wx_fmt=png&from=appmsg "")  
  
流行的二进制解析器 npm 库中披露了一个安全漏洞，如果被成功利用，可能会导致执行任意 JavaScript 代码。  
  
该漏洞编号为**CVE-2026-1245** （CVSS 评分：6.5），影响2.3.0 版本之前的所有模块版本，2.3.0 版本已修复此问题。该漏洞的补丁已于 2025 年 11 月 26 日发布。  
  
Binary-parser 是一个广泛使用的 JavaScript 解析器构建器，允许开发者解析二进制数据。它支持多种常见数据类型，包括整数、浮点数、字符串和数组。该软件包每周的下载量约为 13,000 次。  
  
根据CERT 协调中心 (CERT/CC) 发布的公告，该漏洞与用户提供的值（例如解析器字段名称和编码参数）缺乏清理有关，因为当 JavaScript 解析器代码在运行时使用“Function”构造函数动态生成时，就会出现此问题。  
  
值得注意的是，npm 库将 JavaScript 源代码构建为一个字符串，该字符串表示解析逻辑，并使用 Function 构造函数对其进行编译，然后将其缓存为可执行函数，以便高效地解析缓冲区。  
  
然而，由于 CVE-2026-1245 漏洞，攻击者控制的输入可能未经充分验证就进入生成的代码，导致应用程序解析不受信任的数据，从而执行任意代码。仅使用静态硬编码解析器定义的应用程序不受此漏洞影响。  
  
CERT/CC表示：“在受影响的应用程序中，如果使用不受信任的输入构建解析器定义，攻击者可能能够以Node.js进程的权限执行任意JavaScript代码。根据部署环境的不同，这可能导致访问本地数据、篡改应用程序逻辑或执行系统命令。”  
  
安全研究员 Maor Caplan 因发现并报告此漏洞而受到表彰。建议 binary-parser 用户升级到 2.3.0 版本，并避免将用户可控的值传递给解析器字段名或编码参数。  
  
  
信息来源：The Hacker News  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
