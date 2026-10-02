---
source: "wy876 漏洞文库"
title: "Nacos存在serviceSync未授权访问漏洞"
product: "Nacos控制台serviceSync与可能独立Nacos-Sync任务API"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "实际后端task/list服务开放且无认证，需确认组件及部署"
fofa_unverified: "app.name="
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-dba8f1ec39acd107f90931d1"
entity_id: "ve-dba8f1ec39acd107f90931d1"
schema_version: "1"
---

# Nacos存在serviceSync未授权访问漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：实际后端task/list服务开放且无认证，需确认组件及部署
- 证据范围：#/serviceSync是客户端片段，不发送给服务端；仅页面URL不能证明后端未授权

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 需确认/v1/task/list是否Nacos-Sync而非核心Server
- 无版本/响应/权限/修复依据，不能认定所有Nacos受影响
- fofa字段把Hunter app.name=错抽

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
<font style="color:rgb(63, 63, 63);">Nacos 是阿里巴巴推出来的一个新开源项目，是一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。致力于帮助发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，可以快速实现动态服务发现、服务配置、服务元数据及流量管理。Nacos存在serviceSync未授权访问漏洞</font>

# <font style="color:rgb(63, 63, 63);">二、影响版本</font>
+ <font style="color:rgb(63, 63, 63);">Nacos</font>

# <font style="color:rgb(63, 63, 63);">三、资产测绘</font>
+ hunter`app.name="Nacos"`
+ fofa`app="NACOS"`
+ 特征


# 四、漏洞复现
```plain
/nacos/#/serviceSync
```


```plain
/v1/task/list?pageSize=10&pageNum=1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/yx9zlsgguyq1p5v5>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
