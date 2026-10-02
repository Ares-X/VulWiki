---
source: "hatch 补库批 20260928"
product: "GitLab Wiki slug/link handling"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Gitlab wiki 储存型xss"
prerequisites: "来源所述条件，未列明部分仍待核：Missing; authenticatedWikiwriter andvictimlinkinteraction implied"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-2630275116876faa239a9794"
entity_id: "ve-2630275116876faa239a9794"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Missing; authenticatedWikiwriter andvictimlinkinteraction implied

代码与实验材料：UIsteps plusjavascript:slug andrelativeMarkdownlink; no resultcode/version/patch

来源证据范围：Importbatchonly

- **事实待核（1）**：Emptydescription/impact and noaffectedversion/identifier/source; cannotvalidate storedXSS fromtextalone。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Gitlab wiki 储存型xss

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

-   1、登录到GitLab。

-   2、打开有权编辑Wiki页面的'Project'。

-   3、打开Wiki页面。

-   4、点击'New page'。

-   5、用'javascript:'填写'Page slug'表单。

-   6、点击'Createpage'。

-   7、填写每个表格：

```{=html}
<!-- -->
```
    Title: javascript:

    Format:Markdown

    Content: [XSS](.alert(1);)

![](./.resource/Gitlabwiki储存型xss/media/rId24.png)
