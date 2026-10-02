---
source: "hatch 补库批 20260928"
product: "ThinkPHP / debug 数据库异常"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Thinkphp 5.0.24 mysql账号密码泄露"
prerequisites: "来源所述条件，未列明部分仍待核：5.0.24样例，需debug及MySQL可外连；未证明仅该版"
side_effects: "未执行；本文需注意的操作影响：建议的验证方式会造成可用性风险；用高线程爆破建立大量连接以触发错误，不是无副作用检查；屏蔽throw不是可靠修复；注释异常传播会隐藏数据库故障且改变控制流，原文虽不推荐仍应删除或明确风险"
source_status: "unknown"
id: "vw-cb6434b67b0be73f5c757f01"
entity_id: "ve-cb6434b67b0be73f5c757f01"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：5.0.24样例，需debug及MySQL可外连；未证明仅该版

代码与实验材料：以大量数据库连接触发错误，可能耗尽生产连接；内容/结果仅图

来源证据范围：知乎文章来源

- **操作与副作用边界（1）**：建议的验证方式会造成可用性风险；依据：用高线程爆破建立大量连接以触发错误，不是无副作用检查。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **适用与权限边界（2）**：信息暴露与版本缺陷混淆；依据：debug报错泄露配置未给框架补丁或精确数据，不能仅5.0.24判定。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **实验改动边界（3）**：屏蔽throw不是可靠修复；依据：注释异常传播会隐藏数据库故障且改变控制流，原文虽不推荐仍应删除或明确风险。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Thinkphp 5.0.24 mysql账号密码泄露

一、漏洞简介
------------

Thinkphp 5.0.24
在开启debug的模式下，可通过高线程爆破mysql导致tp报错泄露mysql账号密码。

二、漏洞影响
------------

Thinkphp 5.0.24

三、复现过程
------------

利用条件：

-   开启debug模式
-   mysql开启外连

![](./.resource/Thinkphp5.0.24mysql账号密码泄露/media/rId24.png)

通过MySQL爆破工具，来建立大量链接

![](./.resource/Thinkphp5.0.24mysql账号密码泄露/media/rId25.png)

![](./.resource/Thinkphp5.0.24mysql账号密码泄露/media/rId26.png)

连接数到达一定的程度以后就会抛出错误

导致泄漏出MySql帐号密码

![](./.resource/Thinkphp5.0.24mysql账号密码泄露/media/rId27.png)

修复方案
--------

-   关闭tp5 debug选项（推荐）

-   注释掉thinkphp\\library\\think\\db\\Connection.php
    中305行附近的throw \$e;（不推荐）

参考链接
--------

> https://zhuanlan.zhihu.com/p/131414060
