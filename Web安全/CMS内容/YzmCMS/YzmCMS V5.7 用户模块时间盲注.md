---
source: "hatch 补库批 20260928"
product: "YzmCMS5.7"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "YzmCMS V5.7 用户模块时间盲注"
prerequisites: "来源所述条件，未列明部分仍待核：memberordersearchpermission;yzm_order hasatleastonerow;oldMySQLsleep;rechargecreatesorder evenonpaymenterror"
side_effects: "未执行；本文需注意的操作影响：空表不sleep及支付未配置仍生成订单是有价值负结果/副作用，应保留"
source_status: "unknown"
id: "vw-907de61c6d75757257c5ac4c"
entity_id: "ve-907de61c6d75757257c5ac4c"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：memberordersearchpermission;yzm_order hasatleastonerow;oldMySQLsleep;rechargecreatesorder evenonpaymenterror

- **操作与副作用边界（1）**：空表不sleep及支付未配置仍生成订单是有价值负结果/副作用，应保留。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **结论使用边界（2）**：睡眠可能随匹配行数累积，单sleep1不是固定1秒判定，需要基线。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（3）**：标题用户模块但未明确登录/角色，源码关键where只图；double&amp;&amp;URL轻微噪声。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（4）**：不可为了检测随意充值建订单，需测试专用数据；无修复但xz来源明确。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# YzmCMS V5.7 用户模块时间盲注

一、漏洞简介
------------

二、漏洞影响
------------

YzmCMS V5.7

三、复现过程
------------

`application/member/controller/order.class.php`:76行

这里直接拼接了where条件，type这里就有问题

![1.png](./.resource/YzmCMSV5.7用户模块时间盲注/media/rId24.png)

构造url

    http://www.0-sec.org/member/order/order_search.html?of=id&or=DESC&dosubmit=1&&t_type=sleep(1)

调试跟一下可以看到如果传入的是数组会手动拆分进行预编译处理，但是我们这里是str
不是数组 所以就直接跳过处理

![2.png](./.resource/YzmCMSV5.7用户模块时间盲注/media/rId25.png)直接带入数据库，完成sleep

![3.png](./.resource/YzmCMSV5.7用户模块时间盲注/media/rId26.png)

看了下语句发现这里利用的时候有一个小问题，首先这里是查数据数，在该表没数据的情况下是不会sleep的，所以要先在yzm\_order中插入一条数据。![4.png](./.resource/YzmCMSV5.7用户模块时间盲注/media/rId27.png)

    SELECT COUNT(*) AS total FROM `yzmcms` . `yzm_order` WHERE 1=1 AND `type` = sleep(1);

使用在线充值，会产生一条订单的数据

![5.png](./.resource/YzmCMSV5.7用户模块时间盲注/media/rId28.png)

在没有配置支付的情况下会报错，但是这个订单是创建了。

![6.png](./.resource/YzmCMSV5.7用户模块时间盲注/media/rId29.png)![7.png](./.resource/YzmCMSV5.7用户模块时间盲注/media/rId30.png)这样就可以执行sleep了

![8.png](./.resource/YzmCMSV5.7用户模块时间盲注/media/rId31.png)

时间注入![9.png](./.resource/YzmCMSV5.7用户模块时间盲注/media/rId32.png)

参考链接
--------

> https://xz.aliyun.com/t/7985\#toc-1
