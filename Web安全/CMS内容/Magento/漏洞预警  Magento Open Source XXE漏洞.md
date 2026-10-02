---
cve: "CVE-2024-34102"
source: "gelusus/wxvl 公众号漏洞文库"
product: "Adobe Commerce + Magento Open Source"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-34102"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "漏洞预警  Magento Open Source XXE漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：文章称未认证XML外部实体；RCE链的额外条件未列"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-a776fa1b59acbb7c3cc82508"
entity_id: "ve-a776fa1b59acbb7c3cc82508"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：文章称未认证XML外部实体；RCE链的额外条件未列

- **事实待核（1）**：每个分支写&lt;=上界但无下界，扁平比较会混入已修复不同分支，应结构化分支。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（2）**：XXE到任意命令/代码执行没有链说明，作为潜在影响不能当直达PoC。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **事实待核（3）**：修复只Adobe主页没有安全公告/具体版本，缺请求源码及独立披露链接。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  漏洞预警 | Magento Open Source XXE漏洞   
浅安  浅安安全   2024-06-22 08:30  
  
**0x00 漏洞编号**  
- # CVE-2024-34102  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Adobe Magento Open Source是Adobe公司的一套开源的PHP电子商务系统，Magento Open Source提供所有基本的商务功能，可用于从头开始建立独特的线上商店。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SXaqpBYiaDTgZPe9XeqSxh7yOLFz89okSbeNCBvI3EH8Uib9OBmh9gZnjOuukml79kZ7pXrfwQsicNnw/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2024-34102**  
  
**漏洞类型：**  
XXE  
  
**影响：**  
执行任意命令  
  
**简述：**  
Adobe Commerce和Magento Open Sourc多个受影响版本中存在XML外部实体引用限制不当，未经身份验证的威胁者可发送引用外部实体的恶意设计的XML文档来利用该漏洞，成功利用可能导致任意代码执行。  
###   
  
**0x04 影响版本**  
- Adobe Commerce <= 2.4.7  
  
- Adobe Commerce <= 2.4.6-p5  
  
- Adobe Commerce <= 2.4.5-p7  
  
- Adobe Commerce <= 2.4.4-p8  
  
- Adobe Commerce <= 2.4.3-ext-7  
  
- Adobe Commerce <= 2.4.2-ext-7  
  
- Adobe Commerce <= 2.4.1-ext-7  
  
- Adobe Commerce <= 2.4.0-ext-7  
  
- Adobe Commerce <= 2.3.7-p4-ext-7  
  
- Magento Open Source <= 2.4.7  
  
- Magento Open Source <= 2.4.6-p5  
  
- Magento Open Source <= 2.4.5-p7  
  
- Magento Open Source <= 2.4.4-p8  
  
**0x05****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.adobe.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
