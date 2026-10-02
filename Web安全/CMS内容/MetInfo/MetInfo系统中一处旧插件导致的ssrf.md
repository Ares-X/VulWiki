---
source: "hatch 补库批 20260928"
product: "MetInfo6.1.0 bundled UEditor"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "MetInfo系统中一处旧插件导致的ssrf"
prerequisites: "来源所述条件，未列明部分仍待核：旧UEditor remote crawler入口可达，get_headers能向目标发请求；权限未列"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-50352c46ee5b2c35f121ae4c"
entity_id: "ve-50352c46ee5b2c35f121ae4c"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：旧UEditor remote crawler入口可达，get_headers能向目标发请求；权限未列

- **证据待核（1）**：分析在controller.php处以image终止，缺最终action/source参数和完整URL。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（2）**：把get_headers错误等同端口未开放过强，DNS/TLS/HTTP行为也导致错误。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（3）**：应标UEditor组件版本/集成鉴权；无原始出处和成功响应文本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# MetInfo系统中隐藏的一处旧插件导致的ssrf

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

利用的话，ssrf嘛你可以扫描扫描端口咯。 我这里的话，简单说明利用一下

![](./.resource/MetInfo系统中一处旧插件导致的ssrf/media/rId24.png)

![](./.resource/MetInfo系统中一处旧插件导致的ssrf/media/rId25.png)

### 分析过程

文件：MetInfo\_v6.1.0\\app\\app\\ueditor\\php\\Uploader.class.php

![](./.resource/MetInfo系统中一处旧插件导致的ssrf/media/rId27.png)

get\_headers这里是验证资源是否存在的，不存在就不走下面了，所以这里可以用来判断端口，例如81端口不存在那么他这里就会直接报错了
\$this-\>stateInfo = \$this-\>getStateInfo(\"ERROR\_DEAD\_LINK\");

这个时候我还不清楚的\$this-\>fileField 的值是向哪里获取的=-=
又搜索了一下。

![](./.resource/MetInfo系统中一处旧插件导致的ssrf/media/rId28.png)

需要注意的是：\$type == \"remote\"
才能进入\$this-\>saveRemote();流程引起漏洞触发。

搜索一下

![](./.resource/MetInfo系统中一处旧插件导致的ssrf/media/rId29.png)

打开文件：MetInfo\_v6.1.0\\app\\app\\ueditor\\php\\action\_crawler.php
打开文件以后，虽然引入了Uploader.class.php
但是没有引入\$CONFIG所以直接调用代码会报错，那么就继续找引入

搜索一下

![](./.resource/MetInfo系统中一处旧插件导致的ssrf/media/rId30.png)

打开文件：MetInfo\_v6.1.0\\app\\app\\ueditor\\php\\controller.php

image
