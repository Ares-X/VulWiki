---
source: "hatch 补库批 20260928"
product: "XDCMS1.0"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "XDCMS 1.0 sql注入漏洞（一）"
prerequisites: "来源所述条件，未列明部分仍待核：publicmemberlogin; historicalPHPhtmlspecialcharsENT_COMPAT; safefiltercasebypass"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-3372b5d57314c98131f1b88e"
entity_id: "ve-3372b5d57314c98131f1b88e"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：publicmemberlogin; historicalPHPhtmlspecialcharsENT_COMPAT; safefiltercasebypass

- **证据待核（1）**：具体PoC/SQL回显全截图，无完整请求。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（2）**：htmlspecialchars默认仅双引号是历史PHP行为，应记录测试PHP版本，不能当永久语言默认。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（3）**：过滤点阻止information_schema只说明该方法失败，不能据此泛称影响鸡肋或不可枚举。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（4）**：m/f参数解释却include使用m/c，变量说明不一致；图片后重复尾路径。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **事实待核（5）**：无修复/原始源。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# XDCMS 1.0 sql注入漏洞（一）

一、漏洞简介
------------

二、漏洞影响
------------

XDCMS 1.0

三、复现过程
------------

注入存在于用户登录页面：`/index.php?m=member&f=login`

![](./.resource/XDCMS1.0sql注入漏洞一/media/rId24.jpg)/media/rId24.jpg)

漏洞文件:`/modules/member/index.php`，`lines:112`

![](./.resource/XDCMS1.0sql注入漏洞一/media/rId25.jpg)/media/rId25.jpg)

    login_save()`在用户登录界面时调用，URL:`/index.php?m=member&f=login

参数m与f的包含方式为:`/ modules/$m/$c.php`

> index.php -\> system/common.inc.php -\> fun.inc.php -\>
> global.inc.php\[接受m、f参数的值\] -\> 包含modules/\$m/\$c.php

\$username值使用了`safe_html()`进行过滤，且过滤字符均可使用大小写绕过

htmlspecialchars()未设置第二个参数，导致仅对双引号"进行转义，单引号'不会被转义掉，因而存在注入

> 第二个参数详解：
>
> ENT\_COMPAT（默认值）：只转换双引号。
>
> ENT\_QUOTES：两种引号都转换。
>
> ENT\_NOQUOTES：两种引号都不转换。

![](./.resource/XDCMS1.0sql注入漏洞一/media/rId26.jpg)/media/rId26.jpg)

但此处注入由于过滤了`.`，无法通过information\_schema来获取表名，需去猜测，较为鸡肋

![](./.resource/XDCMS1.0sql注入漏洞一/media/rId27.jpg)/media/rId27.jpg)
