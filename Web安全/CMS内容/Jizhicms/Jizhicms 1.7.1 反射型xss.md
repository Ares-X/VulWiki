---
source: "hatch 补库批 20260928"
product: "JizhiCMS1.7.1"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Jizhicms 1.7.1 反射型xss"
prerequisites: "来源所述条件，未列明部分仍待核：img路径的错误/路由输出反射；受害者访问URL"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-c7394171ec09c485b3738f02"
entity_id: "ve-c7394171ec09c485b3738f02"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：img路径的错误/路由输出反射；受害者访问URL

- **证据待核（1）**：唯一URL使用wiki.0-sec.org镜像域，不能等同真实JizhiCMS部署证据。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（2）**：缺响应上下文、转义点和截图文本；与215共同来源但独立XSS原语。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Jizhicms 1.7.1 反射型xss

一、漏洞简介
------------

二、漏洞影响
------------

Jizhicms 1.7.1

三、复现过程
------------

    https://wiki.0-sec.org/img/1'%3Cimg%20src=1%20onerror=alert(1)%3E--

![9.png](./.resource/Jizhicms1.7.1反射型xss/media/rId24.png)

四、参考链接
------------

> https://xz.aliyun.com/t/7775\#toc-2
