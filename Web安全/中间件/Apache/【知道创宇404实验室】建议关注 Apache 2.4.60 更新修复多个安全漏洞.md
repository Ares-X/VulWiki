---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【知道创宇404实验室】建议关注 Apache 2.4.60 更新修复多个安全漏洞   
 知道创宇404实验室   2024-07-02 17:41  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/3k9IT3oQhT0w1E5Vv5bUiciao6o2cu11sMdG8VhZckT7VYyIuheUxda7pAfjc9RTXFibtXgv0oVbb5A299nIB93UA/640?wx_fmt=png&from=appmsg "")  
  
2024年7月1日，Apache官方发布了最新的版本2.4.60 并修复了7个安全漏洞，其中包括4个important漏洞：  
- CVE-2024-38472 Windows Apache SSRF漏洞，允许通过SSRF和恶意请求或内容将NTML哈希泄露给恶意服务器。  
  
- CVE-2024-38474 Apache HTTP Server 2.4.59 及更早版本中的 mod_rewrite 模块存在替换编码问题，允许攻击者在配置允许但无法通过任何 URL 直接访问的目录中执行脚本，或泄露仅用于 CGI 执行的脚本源代码。  
  
- CVE-2024-38475 Apache HTTP Server 2.4.59 及更早版本中的 mod_rewrite 模块，由于输出转义处理不当，攻击者可以将 URL 映射到服务器允许但无法通过任何 URL 直接访问的文件系统位置，从而导致代码执行或源代码泄露。  
  
- CVE-2024-38477 Apache HTTP Server 2.4.59 及更早版本的 mod_proxy 中的空指针取消引用允许攻击者通过恶意请求使服务器崩溃。  
  
详细信息请参考官方更新公告，  
另外这些漏洞的具体细节及利用漏洞报告将在8月初的美国BlackHat上进行披露。  
  
**参考资料：**  
  
  
[1]  
https://httpd.apache.org/security/vulnerabilities_24.html  
  
[2]  
https://www.blackhat.com/us-24/briefings/schedule/#confusion-attacks-exploiting-hidden-semantic-ambiguity-in-apache-http-server-40227  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
