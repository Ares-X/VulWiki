CatfishCMS 4.6.15 前台xss
=========================

一、漏洞简介
------------

二、漏洞影响
------------

CatfishCMS 4.6

三、复现过程
------------

### 代码分析

url：

    http://0-sec.org/cms/CatfishCMS-4.6.12/index.php/index/Index/pinglun

文件：application/index/controller/Index.php

方法：pinglun(

![](./.resource/CatfishCMS4.6.15前台xss/media/rId25.png)

文件：application\\index\\controller\\Common.php

过滤函数：filterJs()

![](./.resource/CatfishCMS4.6.15前台xss/media/rId26.png)

### 漏洞复现

首先注册一个用户

![](./.resource/CatfishCMS4.6.15前台xss/media/rId28.png)

![](./.resource/CatfishCMS4.6.15前台xss/media/rId29.png)

![](./.resource/CatfishCMS4.6.15前台xss/media/rId30.png)

![](./.resource/CatfishCMS4.6.15前台xss/media/rId31.png)
