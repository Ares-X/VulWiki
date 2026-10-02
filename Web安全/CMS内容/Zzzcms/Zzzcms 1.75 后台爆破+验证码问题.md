---
source: "hatch 补库批 20260928"
product: "ZZZCMS1.75 adminlogin"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Zzzcms 1.75 后台爆破+验证码问题"
prerequisites: "来源所述条件，未列明部分仍待核：knownbackend;validusername/passwordstillrequired; derivedcookieprefix;sessioncode reuse"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-1c50f2ca89d1e5e0e800d3d5"
entity_id: "ve-1c50f2ca89d1e5e0e800d3d5"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：knownbackend;validusername/passwordstillrequired; derivedcookieprefix;sessioncode reuse

- **凭据与会话边界（1）**：绕验证码不是绕账号密码，成功登录说明必须保留凭据条件。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **凭据与会话边界（2）**：zzz920_adminpass是Cookie名称不是值，正文名称/值混淆。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **凭据与会话边界（3）**：不刷新不过期只证明复用，需确认会话过期/失败次数限制才能论证无限暴力破解。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **凭据与会话边界（4）**：具体Cookie构造/报文全图，末尾image，后台3位路径枚举不是独立身份漏洞。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Zzzcms 1.75 后台爆破+验证码问题

一、漏洞简介
------------

二、漏洞影响
------------

Zzzcms 1.75

三、复现过程
------------

### 后台寻找

后台寻找方法，该后台大部分admin+三位数字，所以可以采用爆破的方式获取后台地址
该后台地址为admin371

![](./.resource/Zzzcms1.75后台爆破+验证码问题/media/rId25.png)

### 验证码问题

-   （一）管理员登录面验证码登录

在 admin371/login.php
19行可以看出get\_cookie(\'adminname\')不为空就可以绕过，如何获得get\_cookie(\'adminname\')的值

![](./.resource/Zzzcms1.75后台爆破+验证码问题/media/rId27.png)

在24行可以看出如果存在密码的话会返回cookie中adminpass值，根据返回的adminpass的形式可以推断出adminname的值

![](./.resource/Zzzcms1.75后台爆破+验证码问题/media/rId28.png)

可以看到adminpass为zzz920\_adminpass，所以推断adminname为zzz920\_adminname

![](./.resource/Zzzcms1.75后台爆破+验证码问题/media/rId29.png)

可以看到已经在无验证码的情况下已经登录成功了

![](./.resource/Zzzcms1.75后台爆破+验证码问题/media/rId30.png)

-   （二）验证码不刷新不过期

![](./.resource/Zzzcms1.75后台爆破+验证码问题/media/rId31.png)

在inc/zzz\_main.php中582行可以看到从SESSION中取code的值，在inc/imgcode.php中只要不刷新就不会重新生成code，导致验证码不过期

image
