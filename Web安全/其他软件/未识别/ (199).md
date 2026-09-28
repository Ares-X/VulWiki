---
cve: "CVE-2024-22259"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Spring Web UriComponentsBuilder URL解析不当漏洞(CVE-2024-22259)   
cexlife  飓风网络安全   2024-03-15 17:50  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu03CLaYGQTp5cksic0W2QEApZM2vTgbCc5esyjyLpXicZS2yjt0r6Dxia7BsfjpwGTGzDlxeaqlZvxyTQ/640?wx_fmt=png&from=appmsg "")  
  
**漏洞描述：**SpringFramework是一个开源的Java应用程序框架,UriComponentsBuilder是SpringWeb中用于构建和操作URI的工具类,由于对CVE-2024-22243的修复不充分,攻击者可构造一下两类 url 绕过主机名验证,导致开放重定向或SSRF漏洞:1、包含以http开头的scheme但不包含host2、url中的host以`[` 开头但不以 `]`结尾  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu03CLaYGQTp5cksic0W2QEApZaE5F9vxI7pjvwH2DlN7w5rlRhlIxRyjXCvLpcJzGUbSw3oteucZINQ/640?wx_fmt=png&from=appmsg "")  
  
**影响范围:**org.springframework:spring-web[6.1.0, 6.1.5)org.springframework:spring-web[6.0.0, 6.0.18)org.springframework:spring-web(-∞, 5.3.33)**修复方案:**将 org.springframework:spring-web 升级至 6.1.5 及以上版本将 org.springframework:spring-web 升级至 6.0.18 及以上版本将 org.springframework:spring-web 升级至 5.3.33 及以上版本**参考链接:**https://spring.io/security/cve-2024-22259https://github.com/spring-projects/spring-framework/commit/1d2b55e670bcdaa19086f6af9a5cec31dd0390f0  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
