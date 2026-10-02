---
source: "wy876 漏洞文库"
id: "vw-1613f9501de5336ff23e4675"
entity_id: "ve-1613f9501de5336ff23e4675"
schema_version: "1"
fofa_unverified: "app.name=="
title: "Kyan 网络监控设备 run.php 远程命令执行漏洞"
product: "Kyan网络监控平台"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "先获凭据登录，角色/版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/Kyan/Kyan%E7%BD%91%E7%BB%9C%E7%9B%91%E6%8E%A7%E8%AE%BE%E5%A4%87run.php%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/un5hy49hzv7rnell"
source_status: "recorded"
---

# Kyan 网络监控设备 run.php 远程命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Kyan网络监控平台
- 本文讨论：hosts泄露+认证run.php命令能力
- 版本、权限与配置前提：先获凭据登录，角色/版本未知
- 资料类型：凭据泄露到run命令链摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 只有两URL无command请求或输出；是否设计Shell功能未论证
- fofa实际Hunter残缺字段，缺修复
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 产品版本和权限边界待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
Kyan 网络监控设备 run.php可在身份验证的情况下执行任意命令, 配合账号密码泄露漏洞，存在远程命令执行漏洞，可以获取服务器权限。

# 二、影响版本
+ Kyan 网络监控设备

# 三、资产测绘
+ hunter`app.name=="Kyan 网络监控设备"`
+ 特征


# 四、漏洞复现
1. 通过Kyan 网络监控设备密码泄露漏洞登录系统后台

```plain
/hosts
```


2. 访问`run.php`,即可执行命令

```plain
/run.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/un5hy49hzv7rnell>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
