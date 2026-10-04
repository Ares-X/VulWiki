---
source: "hatch 补库批 20260928"
product: "EmpireCMS7.5 ViewImg"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "EmpireCMS 7.5 前台xss"
prerequisites: "来源所述条件，未列明部分仍待核：会员空间功能启用（默认关闭）；受害者点击图片链接"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-cc4245b71c833cbb060b4682"
entity_id: "ve-cc4245b71c833cbb060b4682"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：会员空间功能启用（默认关闭）；受害者点击图片链接

- **结论使用边界（1）**：说明javascript URL进入a/href并点击触发，不能描述为访问即触发或img/src自动执行。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（2）**：全部证据为1.png至6.png纯文字占位；缺源码文本和来源。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（3）**：应标DOM型XSS而非笼统前台XSS。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# EmpireCMS 7.5 前台xss

一、漏洞简介
------------

该漏洞是由于javascript获取url的参数,没有经过任何过滤,直接当作a标签和img标签的href属性和src属性输出。

利用条件：需要开启会员空间功能

二、漏洞影响
------------

EmpireCMS 7.5

三、复现过程
------------

需要开启会员空间功能(默认关闭),登录后台开启会员空间功能。

> **图片待核**：原归档在此处仅保留文件名 `1.png`，没有可对应的图片引用。

漏洞出现的位置在/e/ViewImg/index.html,浏览代码,发现如下代码存在漏洞

分析代码:通过Request函数获取地址栏的url参数,并作为img和a标签的src属性和href属性,然后经过document.write输出到页面。2.png

跟进Request函数

分析代码:通过window.location获取当前url地址,根据传入的url参数,获取当前参数的起始位置和结束位置。

例如,地址是:`index.html?url=javascript:alert(document.cookie)`,经过Request函数处理就变成`javascript:alert(document.cookie)`

> **图片待核**：原归档在此处仅保留文件名 `3.png`，没有可对应的图片引用。

url地址经过Request函数处理之后,然后把url地址中的参数和值部分直接拼接当作a标签的href属性的值和img标签的src标签的值。

> **图片待核**：原归档在此处仅保留文件名 `4.png`，没有可对应的图片引用。

通过上面的分析,可以发现代码没有对url的参数做过滤就直接拼接成a和img标签的属性的值,因此可以构造payload:?
?url=javascript:alert(/xss/)

浏览器访问`http://www.0-sec.org/e/ViewImg/index.html?url=javascript:alert(/xss/)`

> **图片待核**：原归档在此处仅保留文件名 `5.png`，没有可对应的图片引用。

点击图片便可触发

> **图片待核**：原归档在此处仅保留文件名 `6.png`，没有可对应的图片引用。
