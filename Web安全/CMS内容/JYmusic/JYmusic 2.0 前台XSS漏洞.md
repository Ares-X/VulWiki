---
source: "hatch 补库批 20260928"
product: "JYmusic2.0"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "JYmusic 2.0 前台XSS漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：会员登录并认证音乐人；管理员审核恶意音乐"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-503299bad5612d08d55e3bf8"
entity_id: "ve-503299bad5612d08d55e3bf8"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：会员登录并认证音乐人；管理员审核恶意音乐

- **证据待核（1）**：正文结束于导致在后台管理员审核的，明确缺失结尾。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（2）**：name/cover_url两个字段声称均可注入但无完整端点/请求/输出上下文或来源。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（3）**：应标存储型、音乐人到管理员跨权限，而非仅前台XSS。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# JYmusic 2.0 前台XSS漏洞

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

利用条件

    1.登录会员

    2.认证音乐人

上传音乐时，抓包，修改name或者cover\_url参数

值为：

    XSS"><script>alert(document.cookie)</script>>

此时提交的音乐就会存储到数据库中，由于name和cover\_url没有过滤，导致在后台管理员审核的
