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
title: "MKCMS v6.2 _ucenter_reg.php前台sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：注册端点submit/name可控"
side_effects: "未执行；本文需注意的操作影响：与5.0同入口同源码但6.2是不同版本证据，应关联保留不简单删除"
source_status: "unknown"
id: "vw-d1b15126980684f688341ce5"
entity_id: "ve-d1b15126980684f688341ce5"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：注册端点submit/name可控

- **操作与副作用边界（1）**：与5.0同入口同源码但6.2是不同版本证据，应关联保留不简单删除。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **事实待核（2）**：无PoC/响应/修复，只几行源码，能说明风险不等于复现完成。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# MKCMS v6.2 /ucenter/reg.php前台sql注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

MKCMS v6.2

三、复现过程
------------

`/ucenter/reg.php`的`name`参数，存在注入

    /ucenter/reg.php
    <?php 
    ...
    if(isset($_POST['submit'])){
    $username = stripslashes(trim($_POST['name']));
    // 检测用户名是否存在
    $query = mysql_query("select u_id from mkcms_user where u_name='$username'");
      ...

参考链接
--------

> https://xz.aliyun.com/t/7580\#toc-4
