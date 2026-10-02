---
source: "wy876 漏洞文库"
title: "Apace Druid存在未授权漏洞"
product: "Apache Druid控制台/API"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "控制台或特定API暴露且缺访问控制，具体配置未给"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-d2a7b16dbbc03a605cc2bb87"
entity_id: "ve-d2a7b16dbbc03a605cc2bb87"
schema_version: "1"
---

# Apace Druid存在未授权漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：控制台或特定API暴露且缺访问控制，具体配置未给
- 证据范围：复现仅直接访问地址+端口，未指具体路径/数据/操作，不能判断实质越权

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- <0.20.1与前篇文件读取范围相同但无鉴权漏洞依据
- 缺端口/响应/鉴权对照/修复，是低信息模板
- Apace拼错，应并入产品安全配置检查

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
<font style="color:rgb(36, 41, 46);">Apache Druid是一个实时分析型数据库，旨在对大型数据集进行快速的查询分析（"OLAP"查询)。Druid最常被当做数据库来用以支持实时摄取、高性能查询和高稳定运行的应用场景，同时，Druid也通常被用来助力分析型应用的图形化界面，或者当做需要快速聚合的高并发后端API，Druid最适合应用于面向事件类型的数据。Apace Druid存在未授权漏洞</font>

# <font style="color:rgb(36, 41, 46);">二、影响版本</font>
+ Apache Druid < 0.20.1

# 三、资产测绘
```java
title="Apache Druid"
```


# 四、漏洞复现
直接访问地址+端口


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fm299en8btqeseh1>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
