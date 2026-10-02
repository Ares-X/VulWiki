---
source: "hatch 补库批 20260928"
product: "PbootCMS version unspecified"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "PbootCMS csrf"
prerequisites: "来源所述条件，未列明部分仍待核：已登录管理员被引导顶层GET删除用户，跨站凭证策略"
side_effects: "未执行；本文需注意的操作影响：只在自身登录浏览器访问删除URL，未实际展示跨站Origin验证/CSRF PoC，短网址不自动证明绕过；版本缺，链接包含中文注释当路径，末image占位；删除现有用户为破坏性"
source_status: "unknown"
id: "vw-c6bc0c553cc5ec13dd931990"
entity_id: "ve-c6bc0c553cc5ec13dd931990"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：已登录管理员被引导顶层GET删除用户，跨站凭证策略

- **操作与副作用边界（1）**：只在自身登录浏览器访问删除URL，未实际展示跨站Origin验证/CSRF PoC，短网址不自动证明绕过。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **结论使用边界（2）**：添加用户有formcheck失败重要，不得泛化所有管理操作CSRF。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **实验改动边界（3）**：版本缺，链接包含中文注释当路径，末image占位；删除现有用户为破坏性。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# PbootCMS csrf

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

我将网站建立在本地，本来想测试添加用户的操作，但是发现这里有formcheck验证，所以失败了

![](./.resource/PbootCMScsrf/media/rId24.png)

然后我想到了删除用户位置，首先我使用管理员账号登陆，在删除用户的操作时抓包。发现很简单。只有一个id来判断删除哪个用户

![](./.resource/PbootCMScsrf/media/rId25.png)

于是我直接构造一个新的url，[http://127.0.0.1/cve/p/admin.php/User/del/ucode/10004（上面是10003）](http://127.0.0.1/cve/p/admin.php/User/del/ucode/10004（上面是10003）)

确认这个用户是存在的。然后访问<http://127.0.0.1/cve/p/admin.php/User/del/ucode/10004>

![](./.resource/PbootCMScsrf/media/rId28.png)

删除成功

![](./.resource/PbootCMScsrf/media/rId29.png)

但是这样很容易被熟悉的管理员识别，我们可以利用段网站来进行攻击。

短网址生成网站<https://www.ft12.com/>

<http://127.0.0.1/cve/p/admin.php/User/del/ucode/10004>

可以缩短为<http://u6.gg/gPCcN>

访问这个短网址，也可以变为[http://127.0.0.1/cve/p/admin.php/User/del/ucode/10004触发漏洞](http://127.0.0.1/cve/p/admin.php/User/del/ucode/10004触发漏洞)

image
