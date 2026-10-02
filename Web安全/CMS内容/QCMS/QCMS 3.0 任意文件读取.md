---
source: "hatch 补库批 20260928"
product: "QCMS3.0"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "QCMS 3.0 任意文件读取"
prerequisites: "来源所述条件，未列明部分仍待核：后台模板预览权限，base64路径可控且可读"
side_effects: "未执行；本文需注意的操作影响：两图均引用文件上传文章，证据对应需核对；无代码/响应文本"
source_status: "unknown"
id: "vw-7aabd6c3c7221959c3fcc9f7"
entity_id: "ve-7aabd6c3c7221959c3fcc9f7"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台模板预览权限，base64路径可控且可读

- **适用与权限边界（1）**：标题任意读未列后台，例子只Controller/admin.php相对穿越。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：两图均引用文件上传文章，证据对应需核对；无代码/响应文本。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（3）**：有原始先知链接可回源。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# QCMS 3.0 任意文件读取

一、漏洞简介
------------

二、漏洞影响
------------

QCMS 3.0

三、复现过程
------------

用seay扫了一下后发现的漏洞

漏洞在后台模板代码预览处，构造payload例如

    http://www.0-sec.org/backend/template/tempview/Li4vLi4vLi4vQ29udHJvbGxlci9hZG1pbi5waHA=.html

即可读取Controller文件下admin.php文件源码

![](./.resource/QCMS3.0任意文件上传/media/rId24.png)

跟源码对比下，确实是读到了

![](./.resource/QCMS3.0任意文件上传/media/rId25.png)

参考链接
--------

> https://xz.aliyun.com/t/7269
