---
cve: "CVE-2018-12290"
source: "白阁文库 BaizeSec/bylibrary"
product: "yii2-statemachine-demo/误分SpringBoot"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2018-12290"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "yii2-statemachine v2.x.x存在XSS漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：v2.x.x无commit/修复边界"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-0aa946e42d88a063592e501f"
entity_id: "ve-0aa946e42d88a063592e501f"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：v2.x.x无commit/修复边界

代码与实验材料：role脚本URL，无响应，截图节空

来源证据范围：demo官方项目与CVE链接/发现者日期

- **适用与权限边界（1）**：分类和产品边界错误；依据：PHP Yii2应用在SpringBoot目录；库与demo需区分。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：缺输出上下文；依据：仅role请求无反射HTML、截图或补丁。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# yii2-statemachine v2.x.x存在XSS漏洞

### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|yii2-statemachine v2.x.x存在XSS漏洞|2018-06-12|longer|[https://github.com/ptheofan/yii2-statemachine-demo](https://github.com/ptheofan/yii2-statemachine-demo) | [https://github.com/ptheofan/yii2-statemachine-demo](https://github.com/ptheofan/yii2-statemachine-demo) |v2.x.x| [CVE-2018-12290](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-12290)|  

#### 漏洞概述  

> 由于role参数过滤不严格，导致可以插入js代码造成跨站脚本攻击。如将role参数赋值为`guest'%22()%26%25<acx><ScRiPt%20>prompt(123555)</ScRiPt>`，并进行get方式提交，可造成跨站脚本攻击。   

### POC实现代码如下：  

> exp代码如下：  

``` html
https://127.0.0.1/?role=guest'%22()%26%25<acx><ScRiPt%20>prompt(123555)</ScRiPt>
```
### POC截图效果如下：


---

> 来源：白阁文库 BaizeSec/bylibrary
