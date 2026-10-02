---
cve: "CVE-2026-26198"
source: "gelusus/wxvl 公众号漏洞文库"
product: "ormar/聚合字段SQL注入"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-26198"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "'ormar' Python 库中发现严重 SQL 注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：0.9.9–0.22.0、0.23.0修复；需不可信列名传min/max"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-1b432ed2a493d9fa7d22c5dd"
entity_id: "ve-1b432ed2a493d9fa7d22c5dd"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：0.9.9–0.22.0、0.23.0修复；需不可信列名传min/max

代码与实验材料：SelectAction.get_text_clause/sqlalchemy.text路径明确，无API样例或各DB验证

来源证据范围：官方GHSA可追溯，未读取

- **适用与权限边界（1）**：未认证及全数据库影响过度泛化；依据：认证由宿主API决定、数据库权限限制读取范围；文后已限定用户可选字段应提升到简介。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **代码与转录边界（2）**：历史时长和产品拼写错误；依据：2021-03到2026-02接近五年而称近四年；ORMA拼写不是ormar。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  'ormar' Python 库中发现严重 SQL 注入漏洞  
sec随谈
                    sec随谈  sec随谈   2026-02-26 00:47  
  
流行的 Python 异步迷你对象关系映射器 (ORM) ormar 被发现存在重大安全  
 漏洞。ormar 为使用 Postgres、MySQL 和 SQLite 的开发人员提供桥梁。该漏洞编号为 CVE-2026-26198，CVSS 评分为 9.8，属于严重级别，可能导致整个数据库暴露给未经身份验证的攻击者。  
  
该库的下载量超过 441 万次，是许多 FastAPI 和异步 Python 应用程序的必备工具，因此这项发现的潜在影响范围非常广泛。  
  
该漏洞存在于库的聚合函数调用中，具体来说是 min() 和 max() 方法。根据技术报告，问题在于 ORM“在没有任何验证或清理的情况下，直接将用户提供的列名传递给 sqlalchemy.text() 来构建 SQL 表达式”。  
  
虽然像 sum() 和 avg() 这样的函数受到类型检查的部分保护，但 min() 和 max() 完全绕过了这些安全措施。这一疏忽使得攻击者可以将任意字符串注入到原始 SQL 查询中。报告警告说：“任何未经授权的用户都可以利用此漏洞，通过将子查询作为列参数注入，读取整个数据库内容，包括与查询模型无关的表。”  
  
安全分析追溯到该漏洞的根源可以追溯到 2021 年 3 月 12 日。存在漏洞的代码是在 0.9.9 版本中引入的，并且在近四年内完全没有改变。  
  
研究人员指出：“存在漏洞的 SelectAction.get_text_clause() 方法和 min()/max() 聚合函数是同时引入的……而且自那以后，存在漏洞的代码从未被修改过。” 这意味着目前任何运行 ORMA 版本介于 0.9.9 和 0.22.0 之间的应用程序都存在风险。  
  
由于许多开发者都遵循库的官方文档，因此该漏洞通常隐藏在标准的 API 设计中。报告强调，“具有用户可选聚合字段的 REST API”或“接受字段名作为参数的 GraphQL 解析器”是主要目标。  
  
研究人员使用标准的 FastAPI 应用程序演示了这种攻击，证明“任何将用户可控输入传递给 `Model.objects.min()` 或 `Model.objects.max()` 的 API 端点都会变成一个完整的 SQL 注入入口点”。该攻击已被证实适用于所有主流的受支持后端，包括 SQLite、PostgreSQL 和 MySQL。  
  
ormar 的维护者已迅速采取行动，修复了这个关键漏洞。该漏洞已在 0.23.0 版本中得到彻底解决。  
  
强烈建议开发人员和系统管理员审核其 Python 环境并立即升级其 ormar 依赖项。  
  
参考链接：  
  
https://github.com/collerek/ormar/security/advisories/GHSA-xxh2-68g9-8jqr  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
