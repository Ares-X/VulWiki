---
source: "hatch 补库批 20260928"
product: "JYmusic1.x"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "JYmusic 1.x 版本 前台getshell"
prerequisites: "来源所述条件，未列明部分仍待核：注册并登录会员，头像目录支持PHP执行"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-41f0d7e011fd8a85b1c80599"
entity_id: "ve-41f0d7e011fd8a85b1c80599"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：注册并登录会员，头像目录支持PHP执行

- **适用与权限边界（1）**：1.x范围过宽；前台getshell需认证不可漏。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **代码与转录边界（2）**：抓包改后缀的请求/参数和payload只图；参考链接章节空白，注册一个用句子截断。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# JYmusic 1.x 版本 前台getshell

一、漏洞简介
------------

二、漏洞影响
------------

1.x版本

三、复现过程
------------

访问前台，注册一个用

注册成功后点击右上角设置，个人资料，头像设置

抓包，修改文件后缀为.php

![](./.resource/JYmusic1.x版本前台getshell/media/rId24.png)

![](./.resource/JYmusic1.x版本前台getshell/media/rId25.png)

上传成功后访问个人中心，这里头像已经换了，审查元素查看头像的文件路径

![](./.resource/JYmusic1.x版本前台getshell/media/rId26.png)

访问<http://0-sec.org/Uploads/Avatars/uid_2/128.php>

![](./.resource/JYmusic1.x版本前台getshell/media/rId28.png)

成功解析，通过这种办法上传一个phpinfo

![](./.resource/JYmusic1.x版本前台getshell/media/rId29.png)

访问文件

![](./.resource/JYmusic1.x版本前台getshell/media/rId30.png)

四、参考链接
------------
