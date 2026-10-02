---
source: "wy876 漏洞文库"
id: "vw-941ad7b1eeb9408de9b26748"
entity_id: "ve-941ad7b1eeb9408de9b26748"
schema_version: "1"
fofa_unverified: "title="
title: "WIFISKY 7层流控路由器存在后台命令执行漏洞"
product: "WIFISKY 7层流控路由器"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "admin/admin登录；使用系统维护命令控制台"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/WIFISKY/WIFISKY7%E5%B1%82%E6%B5%81%E6%8E%A7%E8%B7%AF%E7%94%B1%E5%99%A8%E5%AD%98%E5%9C%A8%E5%90%8E%E5%8F%B0%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/em1kq8wstwsanpz7"
source_status: "recorded"
---

# WIFISKY 7层流控路由器存在后台命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：WIFISKY 7层流控路由器
- 本文讨论：默认/弱口令风险；未证明独立后台RCE漏洞
- 版本、权限与配置前提：admin/admin登录；使用系统维护命令控制台
- 资料类型：默认口令与管理控制台使用说明；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 合法管理员在明确命令控制台执行命令可能是预期功能，未指出安全边界绕过
- 无版本；弱口令默认属性无来源；fofa残缺
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 默认凭据厂商依据、控制台设计和角色权限待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
WIFISKY-7层流控路由器是深圳市领空技术有限公司（简称“领空技术"）的一款产品，深圳市领空技术有限公司是扎根深圳辐射的网络通讯设备供应商，致力于网络通讯设备产品的研究与开发。WIFISKY 7层流控路由器存在后台命令执行漏洞

# 二、影响版本
+ WIFISKY-7层流控路由器

# 三、资产测绘
+ fofa`title="WIFISKY 7层流控路由器"`
+ 特征


# 四、漏洞复现
通过弱口令登录系统

```http
admin/admin
```

使用弱口令登录后台，在系统维护->命令控制台中进行执行命令

```http
ifconfig && id
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/em1kq8wstwsanpz7>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
