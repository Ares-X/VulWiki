ShopXO v1.8.0 后台getshell
==========================

一、漏洞简介
------------

二、漏洞影响
------------

ShopXO 小于v1.8.0

三、复现过程
------------

默认后台密码admin shopxo

![](/Users/aresx/Documents/VulWiki/.resource/ShopXOv1.8.0后台getshell/media/rId24.png)

![](/Users/aresx/Documents/VulWiki/.resource/ShopXOv1.8.0后台getshell/media/rId25.png)

登入后台-》应用中心-》应用商店-》主题

随便下载一个主题

![](/Users/aresx/Documents/VulWiki/.resource/ShopXOv1.8.0后台getshell/media/rId26.png)

![](/Users/aresx/Documents/VulWiki/.resource/ShopXOv1.8.0后台getshell/media/rId27.png)

然后把下载下来的压缩包解压出来 把shell放入static目录

![](/Users/aresx/Documents/VulWiki/.resource/ShopXOv1.8.0后台getshell/media/rId28.png)

回到网站后台网站管理-》主题管理-》安装主题

![](/Users/aresx/Documents/VulWiki/.resource/ShopXOv1.8.0后台getshell/media/rId29.png)

shell地址

    http://www.0-sec.org/static/index/default/shell.php

> public是运行目录！！！
