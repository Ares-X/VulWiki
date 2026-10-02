---
source: "hatch 补库批 20260928"
product: "CmsEasy"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "CmsEasy 7.3.8 sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：7.3.8; admin language add_action/edit_action; blacklist bypass using benchmark asserted"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-42f234d4373392f9019771e9"
entity_id: "ve-42f234d4373392f9019771e9"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：7.3.8; admin language add_action/edit_action; blacklist bypass using benchmark asserted

- **证据待核（1）**：No textual payload, HTTP endpoint/auth session or source code; all decisive evidence screenshots。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（2）**：Intro empty; file path implies admin scope but title omits it。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（3）**：Precise original source present; two related sinks should retain separate endpoints。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# CmsEasy 7.3.8 sql注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

CmsEasy 7.3.8

三、复现过程
------------

漏洞代码位于lib/admin/language\_admin.php的add\_action函数

![](./.resource/CmsEasy7.3.8sql注入漏洞/media/rId24.png)

在测试后发现CmsEasy
V7.3.8框架已经对SQLi进行了转义和过滤，包括（select、\*
、sleep等等），为了确定具体的过滤名单，从源码中查找检测函数

##### 但是经过一番搜索后，源码中发现实际调用的注入检测函数并没有被定义，仔细研究后确定是在几个加密混淆的核心代码中实现了。。（闭源一定意味着安全吗？）------通过一番周折后得到函数

![](./.resource/CmsEasy7.3.8sql注入漏洞/media/rId26.png)

显而易见，这样简单的过滤很容易被部分SQLi关键组成字符绕过，导致SQL注入，例如，可以使用benchmark函数来代替sleep以达到基于时间的注入。除了通过得到源码来明确黑名单的，用fuzz同样可以得到过滤的黑名单，之后再想办法绕过

而类似的漏洞成因在同一个文件的edit\_action函数中也存在

![](./.resource/CmsEasy7.3.8sql注入漏洞/media/rId27.png)

这两处接口都存在SQL注入漏洞，提交的payload绕过过滤黑名单后可以进行利用

![](./.resource/CmsEasy7.3.8sql注入漏洞/media/rId28.png)

![](./.resource/CmsEasy7.3.8sql注入漏洞/media/rId29.png)

参考链接
--------

> https://xz.aliyun.com/t/7273
