---
cve: "CVE-2021-21980"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  记一次 Fake-POC 投毒项目的追溯  
 蚁景网安   2026-04-27 08:48  
  
0x01 前言  
  
之前某  
一次写关于  
Vcenter漏洞文章的时候，了解了一个比较冷门的漏洞，CVE-2021-21980：VMware vCenter Server文件读取漏洞。  
  
先是在nuclei-templates里面搜了一  
下，没找到有模版，就在github中搜了一下漏洞编号，找到了今天的主角：Osyanina/westone-CVE-2021-21980-scanner  
```
https://github.com/Osyanina/westone-CVE-2021-21980-scanner
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1ibQk9EuuJNrPC54licew9WyWYib97X2NpC0DNCAOUmSUVTrsbObJq7UZA/640?wx_fmt=png&from=appmsg "")  
  
  
**0x02 追溯过程**  
  
**2.1、about和README信息分析**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1ghnd1fnCicvbeZBV1HBQbOeaVleiaKXMA6204UcCoZTAt7rribSnI5G3g/640?wx_fmt=png&from=appmsg "")  
  
  
从项目的about信息来看，这是一个检测CVE-2021-21980漏洞的扫描器，这里没什么问题。  
  
从项目的README信息来看，这个漏洞是VMware VCenter 及更早版本的未授权文件读取、SSRF和XSS漏洞。这里就很有问题了，从公开的360cert信息来看，CVE-2021-21980是一个文件读取漏洞，**并不涉及SSRF和XSS**  
。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1o6NneMRHCZiczv3lPbkuYoTBcAZpXSe07sD7XaIgL27cJGYy5nSlowQ/640?wx_fmt=png&from=appmsg "")  
  
  
具体链接  
：  
  
https://cert.360.cn/warning/detail?id=4d4d73e332ff08a42571f8cc7d6aa770  
  
  
再说回这个README描述的漏洞信息，很明显是VMware vCenter - Server-Side Request Forgery/Local File Inclusion/Cross-Site Scripting。此处的漏洞名称参考nuclei-templates的信息。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1sqB2WEfhvv3PbrRkLFNN2hIq89kdfwgNfaaMLibN0kxB8LY3tRmH90w/640?wx_fmt=png&from=appmsg "")  
  
  
在nuclei的poc中有一个referer的链接。  
  
https://github.com/l0ggg/VMware_vCenter  
，访问后正是该漏洞的详情，里面包含了漏洞的测试截图和POC：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj15dpiaGSIbCh8We40y1N46Px1NBlv7biaPuP3k95NOiabRJkFLqzXYzTWQ/640?wx_fmt=png&from=appmsg "")  
  
  
到这里其实已经真相大白了，这个POC是一个假的POC，大概率是后门。  
  
### 2.2、关于扫描exe的分析  
  
下载可执行程序的exe，计算sha1值。  
```
mimikatz@mimikatzdeMBP Downloads % shasum -a 1 CVE-2021-21980.exe
2ee2cdf0c6331e5422ec5fda9d8403686ca239e4  CVE-2021-21980.exe
```  
  
virustotal查杀结果：10/71  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1AFwB7xIy2YvJnlcybKV0C5d2zCxDicxrKhne62Z92iax0iaH8DIDPuX8A/640?wx_fmt=png&from=appmsg "")  
  
  
微步在线查杀结果：3/25  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1icviboebYWc9BiavuLDib9tqTmnZyTtKSrTDP9EjDrAOibyWepxj9sKNKLQ/640?wx_fmt=png&from=appmsg "")  
  
  
**网络外联情况：**  
  
微步：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1Ywqz6cPKLrbZaeyoOLCwSy8fwHvibwQHGszYdOWRStL5bBSY7eakUeg/640?wx_fmt=png&from=appmsg "")  
  
  
virustotal：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj170PukHpJtM2LiaQy1AffE4T3uceZa3FWyM0xvib9eB6TrjgSn3WWbibzQ/640?wx_fmt=png&from=appmsg "")  
```
13.107.4.52
192.229.211.108
20.49.157.6
20.99.184.37
20.99.186.246
23.216.147.67
23.216.147.76
95.101.143.10
95.101.143.24
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1AdiarGWhdYiaublTF5rIb7yNvQCZnRwNDkibIuHk2zjnyTB5Qy1CWK0hQ/640?wx_fmt=png&from=appmsg "")  
  
  
关注的时间重点放在2023年5月29日。  
  
### 2.3、关于IP地址的追踪  
#### 2.3.1、13.107.4.52 - lockbit 3.0  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1DpTFJtFvEJNLuG5UHp4jqgUN8VlpySumA65jKE0QCs57TO3HApos3A/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1p4DGDn8ONNn8D9SENiaxUtnWd0DNerutibPKpIEybkRHpoq0S1BfqCaA/640?wx_fmt=png&from=appmsg "")  
  
  
在微步里面查询这个IP，有323个通信样本，老带恶人了。查看安全博客相关，发现了一篇与LockBit 3.0的勒索案例研究相关的文章提到了该IP地址。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1CKytUp790tIXVjiccABy5K1uSMUNUl1dcDCUj7q7HlwJG3Q0nE3iclzA/640?wx_fmt=png&from=appmsg "")  
  
  
查看文章发现在分析LockBit 3.0的时候发现该IP地址与勒索使用的Resume5.exe有网络连接的情况。  
  
https://x.threatbook.com/v5/article?threatInfoID=41875  
  
原文章：  
  
https://blog.criminalip.io/2022/09/23/lockbit-3-0-ransomware/  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1xWhic8o4qSH5sQkibNjiaibibjLwKmQV8g6LtCZnb4c9XX0J6vI64Gk65Sg/640?wx_fmt=png&from=appmsg "")  
  
  
时间是在2022年9月11日，而发现的时间是在2023年5月29日。这说明这玩意儿确实可能是LockBit 3.0的一个投毒的基础设施。  
  
#### 2.3.2、192.229.211.108-恶意  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1NHXmBr3308H27KicNPr2G2ItT0K8nCoBMBXPP748K77166RFRYUMfNA/640?wx_fmt=png&from=appmsg "")  
  
  
样本时间有2023年4月的，实锤属于恶意基础设施：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1b9jPPnw045ciagbrOE6AXy0nXxAibSwiaAZfOvbBojHxQKTStNQTic0n4w/640?wx_fmt=png&from=appmsg "")  
  
  
**2.3.3、20.49.157.6**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1Ktcv7J0NS78vUtneAATAeCDzOxSYia5o13DfXh8wKoefMWnlWnDovCQ/640?wx_fmt=png&from=appmsg "")  
  
#### 2.3.4、20.99.184.37-恶意  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1AcMibQiadjsHmqeVULamQUXLxc8k5PkPtKf7kvwbyQOFkMpep7rLWXQg/640?wx_fmt=png&from=appmsg "")  
  
  
恶意基础设施+1：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1aJNJQlGAVC0DoWnbibahBEBuOx08iaDL0F9UHVHQgCUaltMVaQibegydg/640?wx_fmt=png&from=appmsg "")  
  
#### 2.3.5、20.99.186.246-恶意  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1Ezmkp9foy7AdhxZ4ogicPvLtXv72gicXT2IYV4icbufY955LOLE4ibtY1Q/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1TWMhYyK4h4fbiaibqqBWnBVFwBkTH4bAWQYxXlNqQyM3cBo364cheUWA/640?wx_fmt=png&from=appmsg "")  
  
#### 2.3.6、23.216.147.67  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1WSw9ZjQB4b9gDKAelE7pF9Vob2POSDQkFJeukOjk0AUGnkOKiauDlvg/640?wx_fmt=png&from=appmsg "")  
  
#### 2.3.7、23.216.147.76-MuddyWater组织  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj102W3dz6NftmlwjMvkmvE1ibdmHfDQEWOmFRfibxw0S5QFickMKbXQzuvA/640?wx_fmt=png&from=appmsg "")  
  
  
https://www.secrss.com/articles/51028  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1y7e2SrmwRydrPeQZ5ScdAbRuwRLJphccAdfmnyvZZ8B89r27bJUicsQ/640?wx_fmt=png&from=appmsg "")  
  
  
**2.3.8、95.101.143.10**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1XocmqMxuJ13eouFn24aHLXHnpkvX3wf81H9uBqwiaKMva0I2oWbfCbA/640?wx_fmt=png&from=appmsg "")  
  
****  
**2.3.9、95.101.143.24-恶意**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1zIUTROA6WQUMkzKahRpGSZfNknd5SbiaYXibNE5HBhLePZicMb9wicY0Yw/640?wx_fmt=png&from=appmsg "")  
  
  
恶意样本通讯：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj13ejfCZ6BWSrKrHHF1fU6jAmVgBiaBpO6hrkCxPLqGaoSXHYnlVJq7OQ/640?wx_fmt=png&from=appmsg "")  
  
  
**2.4、github账户追溯**  
  
类似案例：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj1KfiaCHeD7M9JgemxVibgzLbF3HfQiaEOYjCgCMSEWyYRM1X8iarSo975KQ/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj10kUIq672KG3fzkhAxtaDayNRQyCNr3O35Kiay8ZAFdpMicd2dQCqIOsw/640?wx_fmt=png&from=appmsg "")  
  
  
从他的项目里面还发现了一个中文项目，判断应该是国人。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcLllrXPCiaoI75UCbicT5Gj14prBgMaVHLWQPlLH3tbpdpfjDtw7icNT1bR9mcANacKmn3We7upb94g/640?wx_fmt=png&from=appmsg "")  
  
  
**0x03 总结**  
  
从微步在线和  
virustotal的检测数据以及其他溯源博客等多个层面来看，该项目确实为投毒项目。  
希望大  
家能保护好自己吧，用项目之前尽量不使用打包成exe的项目，如要使用，建议virustotal和微步云沙箱中跑跑看，无外联后再做打算。  
  
  
![图片](https://mmbiz.qpic.cn/mmbiz_gif/7QRTvkK2qC6iavic0tIJIoZCwKvUYnFFiaibgSm6mrFp1ZjAg4ITRicicuLN88YodIuqtF4DcUs9sruBa0bFLtX59lQQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=15 "")  
  
学  
习  
网安实战技术  
，戳  
“阅读原文”  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
