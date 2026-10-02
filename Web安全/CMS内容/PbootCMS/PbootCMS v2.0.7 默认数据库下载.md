---
source: "hatch 补库批 20260928"
product: "PbootCMS2.0.7"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "PbootCMS v2.0.7 默认数据库下载"
prerequisites: "来源所述条件，未列明部分仍待核：使用默认SQLite且Web服务器公开data/pbootcms.db"
side_effects: "未执行；本文需注意的操作影响：默认路径无保护需服务器访问规则实证，非MySQL部署；后台不能改路径不等于配置文件不能改"
source_status: "unknown"
id: "vw-97748b89f39e20023341980a"
entity_id: "ve-97748b89f39e20023341980a"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：使用默认SQLite且Web服务器公开data/pbootcms.db

- **操作与副作用边界（1）**：默认路径无保护需服务器访问规则实证，非MySQL部署；后台不能改路径不等于配置文件不能改。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **证据待核（2）**：hash双MD5只口述无源码，图片复用SQLi条目rId24须核对。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（3）**：路径缺scheme但容易修，缺HTTP结果文本。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# PbootCMS v2.0.7 默认数据库下载

一、漏洞简介
------------

二、漏洞影响
------------

PbootCMS v2.0.7

三、复现过程
------------

默认的数据库路径是`/data/pbootcms.db`，且data目录下没有进行任何的判断，后台也没有提供修改数据库路径的功能，所以可直接下载。

    www.0-sec.org/data/pbootcms.db

![](./.resource/PbootCMSsql注入/media/rId24.png)

下载后用`sqlite3`打开就可以得到用户的hash，hash使用的是`md5(md5($pass))`生成的。

参考链接
--------

> https://xz.aliyun.com/t/7628
