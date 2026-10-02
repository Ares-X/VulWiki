---
source: "hatch 补库批 20260928"
product: "QCMS3.0"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "QCMS 3.0 任意文件上传"
prerequisites: "来源所述条件，未列明部分仍待核：系统设置logo上传权限、PHP目录可执行；内容hash去重"
side_effects: "未执行；本文需注意的操作影响：test.php内容只剩反引号，关键payload丢失；无上传接口/参数/完整请求；图片存在不等同证明PHP执行，需恢复结果文本；同内容重复上传被拒是有用条件应保留"
source_status: "unknown"
id: "vw-a6481da92f09b7406a53a559"
entity_id: "ve-a6481da92f09b7406a53a559"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：系统设置logo上传权限、PHP目录可执行；内容hash去重

- **结论使用边界（1）**：test.php内容只剩反引号，关键payload丢失；无上传接口/参数/完整请求。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（2）**：图片存在不等同证明PHP执行，需恢复结果文本；同内容重复上传被拒是有用条件应保留。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（3）**：标题漏后台。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# QCMS 3.0 任意文件上传

一、漏洞简介
------------

二、漏洞影响
------------

QCMS 3.0

三、复现过程
------------

![](./.resource/QCMS3.0任意文件上传/media/rId24.png)

漏洞产生点在系统设置上传logo处

构造一个test.php文件，内容为\`，点击上传

![](./.resource/QCMS3.0任意文件上传/media/rId25.png)

可以看到，上传后给出了路径

![](./.resource/QCMS3.0任意文件上传/media/rId26.png)

访问文件，发现上传成功

需要注意的是，每次上传后会将内容的hash保存到数据库中，如果再次上传时会检查数据库内容是否有重复，有则拒绝上传，因此如果第一遍上传有误，需要对内容进行简单的修改才能上传。

参考链接
--------

> https://xz.aliyun.com/t/7269
