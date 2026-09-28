---
cve: "CVE-2024-10524"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Wget服务器端请求伪造漏洞安全风险通告   
 嘉诚安全   2024-11-21 03:00  
  
**漏洞背景**  
  
  
  
  
  
  
  
  
近日，嘉诚安全监测到Wget中存在一个解析不当导致的服务器端请求伪造漏洞，漏洞编号为：  
CVE-2024-10524。  
  
  
GNU Wget是一个广泛使用的开源命令行工具，主要用于从网络上下载文件。它由GNU项目开发，支持HTTP、HTTPS和FTP协议，因此可以用于从各种类型的网络服务器获取文件。  
  
  
鉴于漏洞危害较大，嘉诚安全提醒相关用户尽快更新至安全版本，避免引发漏洞相关的网络安全事件。  
  
  
**漏洞详情**  
  
  
  
  
  
  
  
  
经研判，该漏洞为  
**中危**  
漏洞  
，  
已发现被  
**在野利用**  
。由于Wget在处理HTTP简写格式URL时解析不当，错误地将包含冒号（:）的用户输入解析为FTP请求，导致将原本应为HTTP请求的URL错误地解析为FTP请求。攻击者可通过控制简写URL中的用户信息部分（例如malwaredomain:aaa@reliableserver）来改变请求目标，从而将请求发送到恶意服务器，该漏洞可能导致服务器端请求伪造攻击、钓鱼攻击、MITM（中间人）攻击和数据泄露等。  
  
  
**危害影响**  
  
  
  
  
  
  
  
  
影响版本：  
  
Wget <= 1.24.5  
  
  
**处置建议**  
  
  
  
  
  
  
  
  
目前该漏洞已经修复，受影响用户可升级到Wget 1.25.0或更高版本。  
  
下载链接：  
  
https://mirror.team-cymru.com/gnu/wget/wget-1.25.0.tar.gz  
  
参考链接：  
  
https://jfrog.com/blog/cve-2024-10524-wget-zero-day-vulnerability/  
  
https://seclists.org/oss-sec/2024/q4/107  
  
https://git.savannah.gnu.org/cgit/wget.git/commit/?id=c419542d956a2607bbce5df64b9d378a8588d778  
  
https://nvd.nist.gov/vuln/detail/CVE-2024-10524  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1t8LLTibEW5NtxqlBL1HLib8jMO0PWtibWTWTFPOa3ND1lyaEQyBgp2fodg9A1XxvPjY7L6ILtK26MBGhofWE0ORw/640?wx_fmt=png&wx_ "")  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/sDiaO8GNKJrJnzIYoQAv2nF3pgKm4SgdFkzuniaicBHQxgSdu0U0xyYbNDOcNkDMWCjwJNwKnic9ASAhhxEpkFL6lg/640?wx_fmt=gif&wx_ "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
