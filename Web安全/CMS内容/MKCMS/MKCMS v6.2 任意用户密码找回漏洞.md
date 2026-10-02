---
source: "hatch 补库批 20260928"
product: "MKCMS6.2"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "MKCMS v6.2 任意用户密码找回漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：知道用户名邮箱，重置为有限随机密码后需在线猜测/验证码复用及无其他限速"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-fddaac8ccd2e836a0f75cd2d"
entity_id: "ve-fddaac8ccd2e836a0f75cd2d"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：知道用户名邮箱，重置为有限随机密码后需在线猜测/验证码复用及无其他限速

- **适用与权限边界（1）**：任意用户密码找回非直接接管，必须保留90000候选及爆破前提；与5.0固定密码机制有版本差异。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：90000范围源码只图，接口请求缺；结合261后台验证码是否适用会员登录需核实，不能直接跨流程假设。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# MKCMS v6.2 任意用户密码找回漏洞

一、漏洞简介
------------

二、漏洞影响
------------

MKCMS v6.2

三、复现过程
------------

任意用户密码找回这个问题主要是`/ucenter/repass.php`代码里，找回密码的逻辑有问题，第10行查询到`username`、
`email`能对应上之后，14行就直接重置密码了。。。而且密码的范围在12行有写，只有90000种可能，重置之后，burp跑一下不就ok了？（当然要结合验证码重用才能有效爆破）

![](./.resource/MKCMSv6.2任意用户密码找回漏洞/media/rId24.png)

参考链接
--------

> https://xz.aliyun.com/t/7580\#toc-4
