---
source: "gelusus/wxvl 公众号漏洞文库"
product: "Spring Boot Actuator/管理端点暴露"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Spring Boot Actuator未授权访问漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：影响版本全在截图，无文本；默认暴露按版本/端点不同"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-2d6b2583926f4c6ac7dfdb96"
entity_id: "ve-2d6b2583926f4c6ac7dfdb96"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：影响版本全在截图，无文本；默认暴露按版本/端点不同

代码与实验材料：只有GET/actuator根发现页面与图，不能证明敏感端点可读写；User-Agent折行不合法

来源证据范围：公众号无官方文档或实验源

- **适用与权限边界（1）**：根发现响应不能证明XXE/RCE或敏感未授权；依据：/actuator正常可见health等有限链接，需分别验证端点内容、访问控制和附加组件。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（2）**：升级不是错误暴露配置充分修复；依据：应按端点暴露、网络隔离和授权策略处理；图标指纹只提示技术栈。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Spring Boot Actuator未授权访问漏洞  
原创 安服仔
                    安服仔  北风漏洞复现文库   2026-01-22 02:11  
  
# 免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。  
#   
#   
  
01  
  
—  
  
漏洞名称  
# Spring Boot Actuator未授权访问漏洞  
  
02  
  
—  
  
影响版本  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhIeFgGgZGib2C4AQiclG5OfictvUdB50xqYsZMdkB6zHanNbEuyRBxZXqTmzZySppJdMicfqPqtZyrTPA/640?wx_fmt=png&from=appmsg "")  
  
03  
  
—  
  
漏洞简介  
  
Actuator是  
Spring Boot  
提供的服务监控和管理中间件。当  
Spring Boot   
应用程序运行时，它会自动将多个端点注册到路由进程中。而由于对这些端点的错误配置，就有可能导致一些系统信息泄露、XXE、甚至是RCE等安全问题。  
  
  
04  
  
—  
  
资产测绘  
```
icon_hash="116323821"
```  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhIeFgGgZGib2C4AQiclG5Ofict9SO0mRRWNxB3dgpFR6m8R3wib7d3ndAdia8f74rbSdAfFiaticWWFJ5Z7w/640?wx_fmt=png&from=appmsg "")  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhIx4W8J0QTbck1e0YcBXo70U5CPPVmuBX9iaavHvqlGkW0rtqiaX4dbMpmhiaLfbTPA4oYOLahpk4LMg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1 "")  
  
05  
  
—  
  
漏洞复现  
  
 POC  
  
```
GET /actuator HTTP/1.1
Host: your-ip
User-Agent: Mozilla/5.0 (Windows NT 10.0;
Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116
Safari/537.36
Accept-Encoding: gzip, deflate
Accept: */*
Connection: close
Accept-Charset: utf-8
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhIeFgGgZGib2C4AQiclG5OfictbEtrl24T9BJibgibo86qfLhW8Itf9fmjdGS1F62APy0I9t7DddKKe7tw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhIeFgGgZGib2C4AQiclG5OfictwEL2UF6wVKc8oeaASu9icB45r3YaHWVgtAm5YhbhiakzB2yTbZEhagMg/640?wx_fmt=png&from=appmsg "")  
  
  
06  
  
—  
  
修复建议  
  
  
升级到最新版本或者**启用身份验证与授权**  
  
07  
  
—  
  
往期回顾  
  
  
  
  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
