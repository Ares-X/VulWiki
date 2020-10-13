PbootCMS v2.0.7 默认数据库下载
==============================

一、漏洞简介
------------

二、漏洞影响
------------

PbootCMS v2.0.7

三、复现过程
------------

默认的数据库路径是`/data/pbootcms.db`，且data目录下没有进行任何的判断，后台也没有提供修改数据库路径的功能，所以可直接下载。

    www.0-sec.org/data/pbootcms.db

![](./.resource/PbootCMSv2.0.7默认数据库下载/media/rId24.png)

下载后用`sqlite3`打开就可以得到用户的hash，hash使用的是`md5(md5($pass))`生成的。

参考链接
--------

> https://xz.aliyun.com/t/7628
