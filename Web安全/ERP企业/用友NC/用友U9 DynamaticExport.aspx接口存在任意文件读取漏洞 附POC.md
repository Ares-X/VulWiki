---
source: "gelusus/wxvl 公众号漏洞文库"
title: "用友U9 DynamaticExport.aspx文件读取线索"
product: "用友U9"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知"
prerequisites: "未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BNC/%E7%94%A8%E5%8F%8BU9%20DynamaticExport.aspx%E6%8E%A5%E5%8F%A3%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E%20%E9%99%84POC.md"
id: "vw-35b7b377195d66c42430dc08"
entity_id: "ve-35b7b377195d66c42430dc08"
schema_version: "1"
---

# 用友U9 DynamaticExport.aspx文件读取线索

## 条目说明

- 对象与具体问题：用友U9；DynamaticExport.aspx文件读取线索
- 版本、配置及部署条件：未知
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 错放用友NC；U9需独立产品目录
- 标题附POC但文本没有请求参数，复现全图片且付费引流
- 版本仅产品名、整改只有打补丁，应补根因和具体补丁

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

2025-7-14更新  南风漏洞复现文库   2025-07-14 15:45  
  
   
  
  
免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。  
### 1. 用友U9简介  
  
微信公众号搜索：南风漏洞复现文库  
该文章 南风漏洞复现文库 公众号首发  
  
用友U9秉承互联网基因，是全球第一款基于SOA云架构的多组织企业互联网应用平台。  
### 2.漏洞描述  
  
用友U9聚焦中型和中大型制造企业，全面支持业财税档一体化、设计制造一体化、计划执行一体化、营销服务一体化、项目制造一体化等数智制造场景，赋能组织变革和商业创新，融合产业互联网资源实现连接、共享、协同，助力制造企业高质量发展。  
  
CVE编号:  
  
CNNVD编号:  
  
CNVD编号:  
### 3.影响版本  
  
用友U9  
  
![用友U9 DynamaticExport.aspx接口存在任意文件读取漏洞](https://mmbiz.qpic.cn/sz_mmbiz_png/HsJDm7fvc3ZTCxJ0eHuW2q7SMyshDpjHIgMvP0EWnGYrPeaK2keAsNFw9ibueGLmrAN2eqmry7QO0LSq6qIApVg/640?wx_fmt=png&from=appmsg "null")  
  
用友U9 DynamaticExport.aspx接口存在任意文件读取漏洞  
### 4.fofa查询语句  
  
body="logo-u9.png"  
### 5.漏洞复现  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3ZTCxJ0eHuW2q7SMyshDpjHpeNibrPPnyILJicTyXibEibg0TtWQ8fbNdrKy0iaMIbDknJJ2R0BYM6P5Uw/640?wx_fmt=jpeg&from=appmsg "null")  
  
### 6.POC&EXP  
  
本期漏洞及往期漏洞的批量扫描POC及POC工具箱已经上传知识星球：南风网络安全  
1: 更新poc批量扫描软件，承诺，一周更新8-14个插件吧，我会优先写使用量比较大程序漏洞。  
2: 免登录，免费fofa查询。  
3: 更新其他实用网络安全工具项目。  
4: 免费指纹识别，持续更新指纹库。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3ZTCxJ0eHuW2q7SMyshDpjHRdicjDByXfvTg9eWN0ZZjEwncHrAXx9SvEe3bGY2xUhxKpmqfrQWceQ/640?wx_fmt=jpeg&from=appmsg "null")  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3ZTCxJ0eHuW2q7SMyshDpjHtF5YYpolBrA5Iib0KrSfZCGfwFMryZEkxeaakMOfh0liaVMsSt30UF1g/640?wx_fmt=jpeg&from=appmsg "null")  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3ZTCxJ0eHuW2q7SMyshDpjHH7N5TtVzP8nnW4WpAJVDaxibNicwEGyN0A9yg7OnUe9OSlTpwnWKCYOw/640?wx_fmt=jpeg&from=appmsg "null")  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3ZTCxJ0eHuW2q7SMyshDpjHibpLjLcVGObNwQLILqiapFgRZhwhrkTGBQr6JHQMEL8icdN7icOB80GPiaQ/640?wx_fmt=jpeg&from=appmsg "null")  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3ZTCxJ0eHuW2q7SMyshDpjHLCRyUhibIdibK8ETXaictZHU7v9sOFSE3I0Ou7ylButZnSQEW5LZfcnEw/640?wx_fmt=jpeg&from=appmsg "null")  
  
### 7.整改意见  
  
打补丁  
### 8.往期回顾  
  
  
   
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
