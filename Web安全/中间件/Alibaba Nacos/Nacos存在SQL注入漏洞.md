---
source: "wy876 漏洞文库"
title: "Nacos存在SQL注入漏洞"
product: "Nacos Derby运维API"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "内置Derby、接口启用、认证缺失或管理员权限"
fofa_unverified: "app.name="
verification_source: "https://nacos-group.github.io/blog/announcement-derby-ops-api/"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-bf2f9edaef3b3cdc09fc89b3"
entity_id: "ve-bf2f9edaef3b3cdc09fc89b3"
schema_version: "1"
---

# Nacos存在SQL注入漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：内置Derby、接口启用、认证缺失或管理员权限
- 证据范围：sql参数本来用于执行运维查询，正文没有证明绕过认证或拼接注入

### 已有来源支持的更正

- 厂商明确该接口设计为执行Derby SQL，新版认证开启需admin，MySQL不可用

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- SQL注入标题缺根因依据，需区分功能滥用/未授权
- 缺版本/认证/结果/修复信息；fofa残缺错类别
- 可并入Derby统一条件说明，不独立制造同义条目

### 核验来源

- https://nacos-group.github.io/blog/announcement-derby-ops-api/

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
<font style="color:rgb(63, 63, 63);">Nacos 是阿里巴巴推出来的一个新开源项目，是一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。致力于帮助发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，可以快速实现动态服务发现、服务配置、服务元数据及流量管理。Nacos存在SQL注入漏洞。</font>

# <font style="color:rgb(51, 51, 51);">二、影响版本</font>
+ <font style="color:rgba(0, 0, 0, 0.9);">Nacos </font>

# <font style="color:rgba(0, 0, 0, 0.9);">三、资产测绘</font>
+ hunter`app.name="Nacos"`
+ 特征


# 四、漏洞复现
```plain
/nacos/v1/cs/ops/derby?&sql=SELECT%20*FROM%20users
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/orgycyhocbkyn07u>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
