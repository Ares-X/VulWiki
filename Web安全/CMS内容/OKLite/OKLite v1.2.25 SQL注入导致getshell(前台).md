---
cve: "CVE-2019-16131"
product: "OKLite1.2.25"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2019-16131"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "OKLite v1.2.25 SQL注入导致getshell(前台)"
prerequisites: "来源所述条件，未列明部分仍待核：留言上传可达；文件名SQL注入能增资源行，replace按oldid读可控路径；PHP目录可写"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "missing"
id: "vw-27b20807f1c1f1b0fd447dfb"
entity_id: "ve-27b20807f1c1f1b0fd447dfb"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：留言上传可达；文件名SQL注入能增资源行，replace按oldid读可控路径；PHP目录可写

- **适用与权限边界（1）**：16131另两篇是后台ZIP，不能合并成一个无认证漏洞，需核实编号。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（2）**：首次filename含固定session/时间/路径，oldid+1依赖插入顺序；未解释字段结构/替换权限。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（3）**：关键URL/action/请求未给，最后资源只/media/rId28.shtml)残片，多图尾部污染。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **事实待核（4）**：PHPOK2017已修复是引用背景非该产品CVE证据。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

OKLite v1.2.25 SQL注入导致getshell(前台)
========================================

一、漏洞简介
------------

这个漏洞在2017年在PHPOK当中就被畅师傅就被发现了。PHPOK系统被修复了，但是在OKLite当中还存在。

二、漏洞影响
------------

OKLite v1.2.25 版本

三、复现过程
------------

地址：<http://www.0-sec.org/index.php?id=message>

在线留言处上传一个图片并抓包，把文件名修改为：

    1','pf3qm0js3gb2s5f33r7lf14vl3','30'),('1',0x7265732f3230313931302f30342f,'shell.jpg','jpg',0x7265732f3230313931302f30352f7368656c6c2e706870,'1570161575','abc

![](./.resource/OKLitev1.2.25SQL注入导致getshell前台/media/rId25.png)/media/rId25.png)

上传成功之后会返回图片的id和保存的路径：

![](./.resource/OKLitev1.2.25SQL注入导致getshell前台/media/rId26.png)/media/rId26.png)

再次上传一个图片，把地址中的save改成replace，添加一个参数名为`oldid`，值为图片的id
+ 1。

图片的内容改为恶意的php代码：

![](./.resource/OKLitev1.2.25SQL注入导致getshell前台/media/rId27.png)/media/rId27.png)

上传完成之后可在`res\201910\05`目录下生成一个shell.php

/media/rId28.shtml)
