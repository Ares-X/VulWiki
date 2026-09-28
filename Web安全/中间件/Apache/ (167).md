---
cve: "CVE-2024-37358"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Apache James拒绝服务漏洞安全风险通告   
 嘉诚安全   2025-02-08 02:59  
  
**漏洞背景**  
  
  
  
  
  
  
  
  
近日，嘉诚安全监测到Apache James拒绝服务漏洞，漏洞编号为：  
CVE-2024-37358。  
  
  
Apache James（Java Apache Mail Enterprise Server）是一个开源的邮件服务器，支持SMTP、IMAP 和 POP3 协议。它基于Java开发，可扩展并支持模块化架构，适用于企业级邮件处理。James 具备邮件存储、用户管理、邮件过滤等功能，并可集成LDAP、数据库等外部系统，适用于构建自定义邮件解决方案。  
  
  
鉴于漏洞危害较大，嘉诚安全提醒相关用户尽快更新至安全版本，避免引发漏洞相关的网络安全事件。  
  
  
**漏洞详情**  
  
  
  
  
  
  
  
  
经研判，该漏洞为  
**高危**  
漏洞  
。该漏洞影响Apache James，  
攻击者可滥用IMAP字面量（IMAP literals）触发无限制的内存分配和长时间计算，从而导致拒绝服务（DoS）。该漏洞可被认证用户和未认证用户利用，可能导致服务器资源耗尽，影响正常业务运行。  
  
  
**危害影响**  
  
  
  
  
  
  
  
  
影响版本：  
  
Apache James Server ≤ 3.7.5  
  
3.8.0 ≤ Apache James Server ≤ 3.8.1  
  
  
**处置建议**  
  
  
  
  
  
  
  
  
1.升级版本  
  
官方已在 3.7.6 和 3.8.2 版本中修复此问题，通过限制对 IMAP 字面量的不当使用，以降低漏洞风险。  
  
下载链接：https://james.apache.org/download.cgi#Apache_James_Server/  
  
2.通用建议  
  
定期更新系统补丁，减少系统漏洞，提升服务器的安全性。  
  
加强系统和网络的访问控制，修改防火墙策略，关闭非必要的应用端口或服务，减少将危险服务（如SSH、RDP等）暴露到公网，减少攻击面。  
  
使用企业级安全产品，提升企业的网络安全性能。  
  
加强系统用户和权限管理，启用多因素认证机制和最小权限原则，用户和软件权限应保持在最低限度。  
  
启用强密码策略并设置为定期修改。  
  
3.参考链接  
  
https://lists.apache.org/thread/1pxsh11v5s3fkvhnqvkmlqwt3fgpcrqc  
  
https://nvd.nist.gov/vuln/detail/CVE-2024-37358  
  
https://github.com/apache/james-project/commit/6dd3ad9ea1f6a9bc887d2c7af3f5aa30a60ec769  
  
https://github.com/apache/james-project/commit/b2f3c06edfd37b409121bf04c56a6f026048a77e  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1t8LLTibEW5NtxqlBL1HLib8jMO0PWtibWTWTFPOa3ND1lyaEQyBgp2fodg9A1XxvPjY7L6ILtK26MBGhofWE0ORw/640?wx_fmt=png&wx_ "")  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/sDiaO8GNKJrLftD6NkjwibfelSiaDSA8r1TnUsJzNguibKyupaNJsEgic28FoR6ROXp2XFyNticXHhFOibN80WcAKXvHw/640?wx_fmt=gif&from=appmsg "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
