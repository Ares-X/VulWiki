---
source: "hatch 补库批 20260928"
product: "WordPress Search Meter"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "WordPress Plugin - Search Meter 2.13.2 CSV Injection"
prerequisites: "来源所述条件，未列明部分仍待核：2.13.2 title; attacker search term stored and admin exports, Windows Excel with external/DDE execution accepted"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-3f020932993e9ce1e48e9d81"
entity_id: "ve-3f020932993e9ce1e48e9d81"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：2.13.2 title; attacker search term stored and admin exports, Windows Excel with external/DDE execution accepted

- **适用与权限边界（1）**：声称Excel打开即执行忽略Excel版本、保护视图和外部内容/DDE警告，不能无条件认定服务器RCE。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（2）**：无源码/CSV实际导出样本、原始来源或修复。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（3）**：空HTML代码围栏是转换噪声，简介和影响栏为空。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（4）**：应标客户端CSV公式注入并保留管理员导出交互。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# WordPress Plugin - Search Meter 2.13.2 CSV Injection

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

-   首先在搜索框里输入paylaod

```{=html}
<!-- -->
```
-   =cmd|' /C notepad'!'A1'

```{=html}
<!-- -->
```
-   然后访问
    http://www.0-sec.org/wordpress/wp-admin/index.php?page=search-meter%2Fadmin.php
    并且到处csv文件

-   之后，我们在Excel中打开文件，并使用逗号作为分隔符从外部文件导入数据

-   这时候payload就会被执行了
