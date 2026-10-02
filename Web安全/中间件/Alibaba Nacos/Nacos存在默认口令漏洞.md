---
source: "wy876 漏洞文库"
title: "Nacos存在默认口令漏洞"
product: "Nacos Console"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "管理员账户仍使用公开默认口令且登录服务可达"
fofa_unverified: "app.name="
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-7baafb7010aa46370143b9df"
entity_id: "ve-7baafb7010aa46370143b9df"
schema_version: "1"
---

# Nacos存在默认口令漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：管理员账户仍使用公开默认口令且登录服务可达
- 证据范围：仅nacos/nacos，不涉及代码漏洞或独立验证

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 版本只Nacos过宽，安装初始化政策随版本变化
- 不是所有部署默认凭据仍有效，需用配置风险分类
- 缺修复说明和厂家链接，fofa残缺

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
<font style="color:rgb(63, 63, 63);">Nacos 是阿里巴巴推出来的一个新开源项目，是一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。致力于帮助发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，可以快速实现动态服务发现、服务配置、服务元数据及流量管理。Nacos存在默认口令漏洞。</font>

# <font style="color:rgb(51, 51, 51);">二、影响版本</font>
+ <font style="color:rgba(0, 0, 0, 0.9);">Nacos </font>

# <font style="color:rgba(0, 0, 0, 0.9);">三、资产测绘</font>
+ hunter`app.name="Nacos"`
+ 特征


# 四、漏洞复现
```plain
nacos/nacos
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/sfeezle5mv21kuf2>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
