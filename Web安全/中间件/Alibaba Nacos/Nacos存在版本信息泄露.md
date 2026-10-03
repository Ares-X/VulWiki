---
source: "wy876 漏洞文库"
title: "Nacos存在版本信息泄露"
product: "Nacos console server state"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "server/state公开可达并返回版本"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-56c8b7e313f974995ab872ea"
entity_id: "ve-56c8b7e313f974995ab872ea"
schema_version: "1"
previous_fofa_unverified: "app.name="
fofa: "icon_hash=\"13942501\""
---

# Nacos存在版本信息泄露

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：server/state公开可达并返回版本
- 证据范围：仅一个正常状态接口路径，没有敏感后果或设计访问边界证据

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 应标信息项/加固建议，不与RCE等量建漏洞
- 无版本/响应/修复；fofa抽取残缺
- 可归入产品识别辅助资料

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# <font style="color:rgb(51, 51, 51);">一、漏洞简介</font>
<font style="color:rgb(63, 63, 63);">Nacos 是阿里巴巴推出来的一个新开源项目，是一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。致力于帮助发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，可以快速实现动态服务发现、服务配置、服务元数据及流量管理。Nacos存在版本信息泄露</font>

# <font style="color:rgb(51, 51, 51);">二、影响版本</font>
+ <font style="color:rgba(0, 0, 0, 0.9);">Nacos </font>

# <font style="color:rgba(0, 0, 0, 0.9);">三、资产测绘</font>
+ hunter`app.name="Nacos"`
+ fofa `icon_hash="13942501"`
+ 特征


# 四、漏洞复现
```plain
/nacos/v1/console/server/state
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/uvzl7c4yx4hiuq9k>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
