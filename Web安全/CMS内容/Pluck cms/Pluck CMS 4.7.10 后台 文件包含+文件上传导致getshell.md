---
source: "hatch 补库批 20260928"
product: "PluckCMS4.7.10 and older tests"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Pluck CMS 4.7.10 后台 文件包含+文件上传导致getshell"
prerequisites: "来源所述条件，未列明部分仍待核：后台语言设置与文件上传权限，配置能指向已有图片马并全局包含"
side_effects: "未执行；本文需注意的操作影响：全文所有截图位置空白，没有源码/完整cont1值/上传请求，只有langpref.php路径"
source_status: "unknown"
id: "vw-054b1ae4a1d313468b4398dd"
entity_id: "ve-054b1ae4a1d313468b4398dd"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台语言设置与文件上传权限，配置能指向已有图片马并全局包含

- **事实待核（1）**：声称最旧4.7.2又分析v4.7.1，版本叙述冲突；仅两版测试不能称全版本通用。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（2）**：全文所有截图位置空白，没有源码/完整cont1值/上传请求，只有langpref.php路径。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（3）**：与363同后台但语言包含不同sink，不能按getshell全并。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Pluck CMS 4.7.10 后台 文件包含+文件上传导致getshell

一、漏洞简介
------------

二、漏洞影响
------------

Pluck CMS Pluck CMS \<=4.7.10

三、复现过程
------------

### 1、分析过程

目前最新版本为4.7.10，个人测试github上最旧的4.7.2版本仍然存在该漏洞，框架本身语言选择模块数据注入导致的文件包含漏洞，官方更新版本并没有对这部分代码进行修改，可以认为是全版本通用的。该漏洞是在复现\"我怎么这么帅\"在先知发表的《Pluck
CMS 4.7.10远程代码执行漏洞分析》之余审计其他代码发现的，在此致谢。

v4.7.1分析 从入口文件admin.php查看:



查看language.php,满足指定的文件存在，并传入的cont1参数和原本设置的\$langpref参数不等，进入save\_language(\$cont1)。



调用save\_file方法。



由于只有一个数据，直接182写入php文件。



至此，langpref的值变成可控值，这个值对应的文件，用于控制网站的语言选择，会自动被全局php文件包含。可以包含上传功能点上传的图种文件解析其中的一句话导致getshell。文件上传功能点使用白名单，但是没有进行重命名，所以路径可以简单猜解。



### 2、复现过程

文件上传一个可以写一句话木马的php图种。





上述参数保存于php文件：

    \data\settings\langpref.php



由于该参数是网站语言控制的php文件，访问任意网页，包含langpref对应的文件。



访问生成的php一句话木马。


