---
source: "白阁文库 BaizeSec/bylibrary"
product: "DedeCMS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "DedeCMS_v5.7_shops_delivery_存储型XSS"
prerequisites: "来源所述条件，未列明部分仍待核：5.7UTF8SP2/2017-03-15; shop enabled; admin delivery des field; admin/customer display"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-fd326159a7dacd05b0c31b95"
entity_id: "ve-fd326159a7dacd05b0c31b95"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：5.7UTF8SP2/2017-03-15; shop enabled; admin delivery des field; admin/customer display

- **证据待核（1）**：Same substantive article as index56 with clean local image references and no polluted navigation/incorrect CNVD。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（2）**：Precise root-cause/output-encoding distinction and provenance; exact payload only image。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# DedeCMS_v5.7_shops_delivery_存储型XSS

## Affected Version

DedeCMS-V5.7-UTF8-SP2  （ 发布日期  2017-03-15 ）

需要站点启用商城功能。

下载地址： 链接: https://pan.baidu.com/s/1bprjPx1 密码: mwdq


## PoC

该漏洞比较鸡肋，需要登录 管理员后台通过 添加配送方式 功能 ，添加后在前后台都会触发 存储型 XSS

之所以会触发是因为在系统对 管理员输入的 配送方式-描述字段（des）在入库前只进行 addslashes 转义特殊字符处理，其实这没毛病

重要的是取出数据库的数据输出到页面前没进行 HTML 实体编码处理直接输出导致最终的 XSS

测试：

1. 后台添加 配送方式

![](./.resource/DedeCMS_v5.7_shops_delivery_存储型XSS/media/add_delivery.png)

2. 添加成功后直接展示配送方式列表，触发 XSS

![](./.resource/DedeCMS_v5.7_shops_delivery_存储型XSS/media/show_delivery.png)

3. 此外，这个 XSS 在前台用户购买东西选择配送方式的时候也会触发

![](./.resource/DedeCMS_v5.7_shops_delivery_存储型XSS/media/front_xssed.png)

## References

1. https://www.seebug.org/vuldb/ssvid-92863


---

> 来源：白阁文库 BaizeSec/bylibrary
