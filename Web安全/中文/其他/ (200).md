---
cve: "CVE-2024-29027"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Parse Server注入漏洞(CVE-2024-29027）   
cexlife  飓风网络安全   2024-03-20 22:19  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu029TvXWh4RT40fpibgjqt0QPDLQGOdAj09ibbX2jicttsGyMiacfNlqcniaSZic2QETKu3szLpkicRoJ16hw/640?wx_fmt=png&from=appmsg "")  
  
**漏洞描述:**  
  
Parse Server是一款基于node.js的开源框架,近日监测到Parse Server中修复了一个注入漏洞（CVE-2024-29027),该漏洞的CVSS评分为9.0,Parse Server版本6.5.5和7.0.0-alpha.29之前,由于缺乏对Cloud Function名称和Cloud Job名称的字符串清理,当调用无效的Parse Server Cloud Function名称或Cloud Job 名称时可能导致服务器崩溃,或可能导致代码注入或远程代码执行等。**影响范围:**Parse Server版本< 6.5.57.0.0-alpha.1<= Parse Server版本< 7.0.0-alpha.29**安全措施:**升级版本:目前该漏洞已经修复,受影响用户可升级到Parse Server版本6.5.5、7.0.0-alpha.29及更高版本**下载链接:**https://github.com/parse-community/parse-server/releases**临时措施:**暂无**参考链接:**https://github.com/parse-community/parse-server/security/advisories/GHSA-6hh7-46r2-vf29  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
