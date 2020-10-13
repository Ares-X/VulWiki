微擎 低权限后台getshell
=======================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

/web/index.php?c=site&a=editor

这个文件可以编辑html，然后前台会解析成php

没测试最新版

比如编辑专题：/web/index.php?c=site&a=editor&do=page&multiid=0

上架抓包

![](/Users/aresx/Documents/VulWiki/.resource/微擎低权限后台getshell/media/rId24.png)

改html内容为php

![](/Users/aresx/Documents/VulWiki/.resource/微擎低权限后台getshell/media/rId25.png)

复制前台url

![](/Users/aresx/Documents/VulWiki/.resource/微擎低权限后台getshell/media/rId26.png)

访问之

![](/Users/aresx/Documents/VulWiki/.resource/微擎低权限后台getshell/media/rId27.png)

四、参考链接
------------

> <https://www.t00ls.net/viewthread.php?tid=54258&extra=&page=1>
