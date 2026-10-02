---
source: "hatch 补库批 20260928"
product: "JizhiCMS1.7.1 user/userinfo"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Jizhicms 1.7.1 ._user_userinfo.html sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：会员登录修改资料；province/city/address进入SQL"
side_effects: "未执行；本文需注意的操作影响：多图指SQL上传链不同场景；没有过滤说明不足以单独证明SQLi，应补查询拼接链"
source_status: "unknown"
id: "vw-a4659808d4b1684f8ad7cf12"
entity_id: "ve-a4659808d4b1684f8ad7cf12"
schema_version: "1"
---

## 核对与使用边界


本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：会员登录修改资料；province/city/address进入SQL

- **证据待核（1）**：完整请求只是正常空字段，无注入payload；源码/SQL证据在图。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（2）**：多图指SQL上传链不同场景；没有过滤说明不足以单独证明SQLi，应补查询拼接链。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **凭据与会话边界（3）**：请求含会话样例，认证前提仍待核验。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Jizhicms 1.7.1 ./user/userinfo.html sql注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

Jizhicms 1.7.1

三、复现过程
------------

在更改个人资料处

    POST /user/userinfo.html HTTP/1.1
    Host: 127.0.0.1:8091
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
    Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
    Accept-Encoding: gzip, deflate
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 138
    Origin: http://127.0.0.1:8091
    Connection: close
    Referer: http://127.0.0.1:8091/user/userinfo.html
    Cookie: PHPSESSID=84mcpgsvrgnfag0fnl3ngjm2eo
    Upgrade-Insecure-Requests: 1

    litpic=&file=&username=test&tel=&email=1%401.com&sex=0&province=&city=&address=&password=&repassword=&signature=&submit=%E6%8F%90%E4%BA%A4

在userinfo函数中可以看到只对tel ,pass sex
repass等参数进行了过滤，并不涉及province city
address等地址，意味着可以随意拼接sql语句触发 sql注入漏洞![1.png](./.resource/Jizhicms1.7.1._user_userinfo.htmlsql注入漏洞/media/rId24.png)![2.png](./.resource/Jizhicms1.7.1._user_userinfo.htmlsql注入漏洞/media/rId25.png)通过mysql监控工具可以看到已经带入查询，触发了sql注入漏洞![3.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId26.png)通过sqlmap跑一下![4.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId27.png)

参考链接
--------

> https://xz.aliyun.com/t/7861\#toc-2
