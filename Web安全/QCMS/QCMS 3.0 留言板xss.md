QCMS 3.0 留言板xss
==================

一、漏洞简介
------------

二、漏洞影响
------------

QCMS 3.0

三、复现过程
------------

![](./.resource/QCMS3.0留言板xss/media/rId24.png)

按照如图所示构造payload

![](./.resource/QCMS3.0留言板xss/media/rId25.png)

提交之后无需审核，直接先弹个窗。。

![](./.resource/QCMS3.0留言板xss/media/rId26.png)

登录后台再弹一个。。

![](./.resource/QCMS3.0留言板xss/media/rId27.png)

查看数据库，没有过滤直接插入

参考链接
--------

> https://xz.aliyun.com/t/7269
