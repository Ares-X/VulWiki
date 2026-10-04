---
source: "hatch 补库批 20260928"
product: "Discuz X3.1"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Discuz! X3.1 后台任意代码执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：Admin stats code, cache update, portal HTML and topic management; writable template directory"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-39439258dcea71ffcb6e7d1e"
entity_id: "ve-39439258dcea71ffcb6e7d1e"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Admin stats code, cache update, portal HTML and topic management; writable template directory

- **证据待核（1）**：All screenshots bare filenames and actual PHP input absent。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（2）**：Run-on numbered UI steps; no source/request/output evidence。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（3）**：Chain concept coherent but lacks stock permission/security boundary context。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Discuz! X3.1 后台任意代码执行漏洞

一、漏洞简介
------------

二、漏洞影响
------------

Discuz! X3.1

三、复现过程
------------

-   全局\--〉网站第三方统计代码\--〉插入php代码\[其他地方\<\>会被转意\]：    如插入    007uCUf6ly1fxlneom4cfj30om0l40vg.jpg

-   工具\--〉更新缓存\[为了保险起见，更新下系统缓存\]：    2.jpg

-   门户\--\> HTML管理\--〉设置：

1） 静态文件扩展名\[一定要设置成htm\] ：htm2) 专题HTML存放目录: template/default/portal3) 设置完，提交吧！

> **图片待核**：原归档在此处仅保留文件名 `3.jpg`，没有可对应的图片引用。

-   门户\--〉专题管理\--〉创建专题：

1）专题标题：xyz // 这个随便你写了2）静态化名称：portal\_topic\_222 //222为自定义文件名，自己要记住3）附加内容：选择上： 站点尾部信息

> **图片待核**：原归档在此处仅保留文件名 `4.jpg`，没有可对应的图片引用。

-   提交

-   回到门户\--〉专题管理,把刚才创建的专题开启，如下图 ：

> **图片待核**：原归档在此处仅保留文件名 `5.jpg`，没有可对应的图片引用。

-   把刚才的专题，生成

> **图片待核**：原归档在此处仅保留文件名 `6.jpg`，没有可对应的图片引用。

下面就是关键了，现在到了包含文件的时候了。

-   再新建一个专题：

1）专题标题，静态化名称，这2个随便写2）模板名：这个要选择我们刚才生成的页面：./template/default/portal/portal\_topic\_222.htm

> **图片待核**：原归档在此处仅保留文件名 `7.jpg`，没有可对应的图片引用。

-   然后提交，就执行了

> **图片待核**：原归档在此处仅保留文件名 `8.jpg`，没有可对应的图片引用。
