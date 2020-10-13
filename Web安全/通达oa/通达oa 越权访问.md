通达oa 越权访问
===============

一、漏洞简介
------------

二、漏洞影响
------------

2013、2015版本

三、复现过程
------------

将get型访问转换成post,并且post参数\_SERVER,即可越权访问admin才能访问的⻚面。根据⽹上的通达
OA的源码找这些敏感地址,如: /general/system/database/

![](/Users/aresx/Documents/VulWiki/.resource/通达oa越权访问/media/rId24.png)

![](/Users/aresx/Documents/VulWiki/.resource/通达oa越权访问/media/rId25.png)

![](/Users/aresx/Documents/VulWiki/.resource/通达oa越权访问/media/rId26.png)

根据源码,几乎所有敏感的⻚面都可以使用这种方式进行越权访问,⽐如说设置⻆色权限的⻚面啊什么的。这个⻚
