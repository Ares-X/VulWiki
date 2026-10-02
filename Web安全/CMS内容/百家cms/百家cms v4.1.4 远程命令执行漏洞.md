---
source: "hatch 补库批 20260928"
product: "百家CMS4.1.4"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "百家cms v4.1.4 远程命令执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：backendupload;imagescalingenabled; shellcommandconstructedfromfilename; OSshellsemantics"
side_effects: "未执行；本文需注意的操作影响：&命令&文件名需具体shell/OS及缩放工具，未给exec调用和完整上传请求；所有图片同716远程文件上传四图，需核错误复用"
source_status: "unknown"
id: "vw-609402a80571efe451e2f2f5"
entity_id: "ve-609402a80571efe451e2f2f5"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：backendupload;imagescalingenabled; shellcommandconstructedfromfilename; OSshellsemantics

- **证据待核（1）**：&amp;命令&amp;文件名需具体shell/OS及缩放工具，未给exec调用和完整上传请求。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（2）**：所有图片同716远程文件上传四图，需核错误复用。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（3）**：需要开启缩放是重要非默认条件，应保留而不是直接后台任意命令。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（4）**：缺修复/确切payload，xz7542是可回源入口。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 百家cms v4.1.4 远程命令执行漏洞

一、漏洞简介
------------

二、漏洞影响
------------

百家cms v4.1.4

三、复现过程
------------

    # 需要后台权限
    http://www.0-sec.org/index.php?mod=site&act=weixin&do=setting&beid=1

首先需要在设置里将图片缩放打开

![](./.resource/百家cmsv4.1.4远程文件上传漏洞/media/rId24.png)

本地创建`&命令&.txt`格式的文件

![](./.resource/百家cmsv4.1.4远程文件上传漏洞/media/rId25.png)

访问payload，并进行上传

![](./.resource/百家cmsv4.1.4远程文件上传漏洞/media/rId26.png)

命令执行

![](./.resource/百家cmsv4.1.4远程文件上传漏洞/media/rId27.png)

参考链接
--------

> https://xz.aliyun.com/t/7542
