---
source: "hatch 补库批 20260928"
product: "CatfishCMS"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "CatfishCMS 4.5.7 xss"
prerequisites: "来源所述条件，未列明部分仍待核：4.5.7 title vs4.5 body; registered user comment; sink viewer unclear"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-8739c58283a2ad2e2df55966"
entity_id: "ve-8739c58283a2ad2e2df55966"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：4.5.7 title vs4.5 body; registered user comment; sink viewer unclear

- **事实待核（1）**：Tail contains escaped raw HTML instead of rendered reproduction。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（2）**：Exact filter bypass payload exists only in unviewed images。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（3）**：Source code screenshots but no precise original article reference。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# CatfishCMS 4.5.7 xss

一、漏洞简介
------------

二、漏洞影响
------------

CatfishCMS 4.5

三、复现过程
------------

### 漏洞分析

文件：application\\config.php

参数：default\_filter

![](./.resource/CatfishCMS4.5.7xss/media/rId25.png)

最后找到一处未过滤的地方

文件：application/index/controller/Index.php

方法：pinglun()

![](./.resource/CatfishCMS4.5.7xss/media/rId26.png)

过滤函数

文件：application\\index\\controller\\Common.php

方法：filterJs()

![](./.resource/CatfishCMS4.5.7xss/media/rId27.png)

可以看到只是简单的过滤

很简单就可以绕过\</p\> \<h3 id=\"复现\"\>复现\</h3\>

```html
<p>自己在此cms注册一个账号然后随便点击一篇文章</p> <p><img
src="https://wiki.0-sec.org/img/20200419/d5c4f5fa204c4109a5bb2ebf6f827dd9.png"
alt="image" class="large" onclick="window.open(this.src)"
/></p> <p><img
src="https://wiki.0-sec.org/img/20200419/16e03c0d17564b6698d4d7030b7f5b8c.png"
alt="image" class="large" onclick="window.open(this.src)"
/></p> <p><img
src="https://wiki.0-sec.org/img/20200419/fd3b149615864b18bb72584c04d0e838.png"
alt="image" class="large" onclick="window.open(this.src)"
/></p> <p><img
src="https://wiki.0-sec.org/img/20200419/cd0229da18524b94a9c48886719b9365.png"
alt="image" class="large" onclick="window.open(this.src)"
/></p>

```
