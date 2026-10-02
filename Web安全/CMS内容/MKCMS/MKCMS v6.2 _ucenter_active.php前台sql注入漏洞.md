---
source: "hatch 补库批 20260928"
product: "MKCMS6.2"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "MKCMS v6.2 _ucenter_active.php前台sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：公开active.php verify输入；旧mysql函数"
side_effects: "未执行；本文需注意的操作影响：注释和$nowtime粘连，版本/修复界限仅文章；勿将激活码验证流程副作用忽略"
source_status: "unknown"
id: "vw-2c9d143133bc6b013f0fe827"
entity_id: "ve-2c9d143133bc6b013f0fe827"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：公开active.php verify输入；旧mysql函数

- **结论使用边界（1）**：源码stripslashes+单引号拼接支持注入风险，日志仅sqlmap结论无实际载荷。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **实验改动边界（2）**：注释和$nowtime粘连，版本/修复界限仅文章；勿将激活码验证流程副作用忽略。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# MKCMS v6.2 /ucenter/active.php前台sql注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

MKCMS v6.2

三、复现过程
------------

`/ucenter/active.php?verify=1`存在注入

    /ucenter/active.php
    <?php
    ...
    $verify = stripslashes(trim($_GET['verify']));  //去掉了转义用的    $nowtime = time();
    $query = mysql_query("select u_id from mkcms_user where u_question='$verify'");
    $row = mysql_fetch_array($query);
    ...

sqlmap直接跑即可

    [INFO] GET parameter 'verify' appears to be 'MySQL >= 5.0.12 AND time-based blind (query SLEEP)' injectable
    [INFO] GET parameter 'verify' is 'Generic UNION query (NULL) - 1 to 20 columns' injectable

参考链接
--------

> https://xz.aliyun.com/t/7580\#toc-4
