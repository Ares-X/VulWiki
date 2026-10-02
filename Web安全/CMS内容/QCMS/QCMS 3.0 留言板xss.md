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
title: "QCMS 3.0 留言板xss"
prerequisites: "来源所述条件，未列明部分仍待核：留言可提交，访客页面/管理员后台渲染恶意内容"
side_effects: "未执行；本文需注意的操作影响：payload、字段、请求全部图片无文本；从未经审核弹窗推断存储应补持久读取证据"
source_status: "unknown"
id: "vw-8ca6912491f044e39dc318a3"
entity_id: "ve-8ca6912491f044e39dc318a3"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：留言可提交，访客页面/管理员后台渲染恶意内容

- **操作与副作用边界（1）**：payload、字段、请求全部图片无文本；从未经审核弹窗推断存储应补持久读取证据。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **证据待核（2）**：数据库未过滤不等于输出无编码，输出sink未给。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（3）**：应拆访客自触发与管理员跨权限影响。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# QCMS 3.0 留言板xss

一、漏洞简介
------------

二、漏洞影响
------------

QCMS 3.0

三、复现过程
------------

![](./.resource/QCMS3.0留言板xss/media/rId24.png)

按照如图所示构造payload

![](./.resource/QCMS3.0留言板xss/media/rId25.png)

提交之后无需审核，直接先弹个窗。。

![](./.resource/QCMS3.0留言板xss/media/rId26.png)

登录后台再弹一个。。

![](./.resource/QCMS3.0留言板xss/media/rId27.png)

查看数据库，没有过滤直接插入

参考链接
--------

> https://xz.aliyun.com/t/7269
