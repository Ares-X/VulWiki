---
cve: "CVE-2024-38474"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Apache HTTP Server 信息泄露漏洞   
cexlife  飓风网络安全   2024-07-02 19:35  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu00EWSP9Y63QmKz849UWLzZGRApEDQ0dicAOPDZYmBJzVUiaCJRw74UCWhXmtydm4oWFhGIJBzpyXuOQ/640?wx_fmt=png&from=appmsg "")  
  
**1.CVE-2024-38474**  
  
**漏洞描述:**  
  
Apache HTTP Server是美国阿帕奇（Apache）基金会的一款开源网页服务器,Apache HTTP Server 2.4.59 及之前版本中 mod_rewrite模块存在替换编码问题,由于针对%3f的URL编码处理不当,攻击者可配置无法通过URL或仅作为CGI执行的脚本访问的目录,从而导致代码执行或源代码泄露,修复版本中通过默认禁用不安全的重写规则,增加UnsafeAllow3F选项来修复该漏洞。  
  
**影响范围:**apache2(-∞, 2.4.60-1)http_server@[2.4.0, 2.4.60)**修复方案:**将组件apache2升级至2.4.60-1及以上版本  
  
将组件http_server升级至2.4.60及以上版本  
  
  
**2.CVE-2024-38475**  
  
**漏洞描述:**Apache HTTP Server是美国阿帕奇（Apache）基金会的一款开源网页服务器,Apache HTTP Server 2.4.59 及更早版本中mod_rewrite模块在处理URL 重写时,如果使用反向引用或变量作为替换的第一部分,可能会导致输出转义不当,攻击者可借助此漏洞将URL映射到不应该被用户访问的文件系统位置,从而导致代码执行或源代码泄露,修复版本中通过默认禁用掉不安全的重写规则,增加UnsafePrefixStat选项来修复该漏洞。**影响范围:**apache2(-∞, 2.4.60-1)**修复方案:**将组件apache2升级至2.4.60-1及以上版本  
  
**参考链接:**https://httpd.apache.org/security/vulnerabilities_24.html  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
