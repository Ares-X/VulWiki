Eyoucms 1.42 后台插件getshell
=============================

一、漏洞简介
------------

需要进后台+知道后台插件密码

二、漏洞影响
------------

三、复现过程
------------

需要知道后台密码+后台插件密码

//如果第一次使用插件，那么密码可以直接设置，如果管理员设置过了，则可以选择爆破

插件有格式限制，可以从官网随便下个，解压后插入php文件重新打包上传

![](/Users/aresx/Documents/VulWiki/.resource/Eyoucms1.42后台插件getshell/media/rId24.png)

可以看出文件已成功解压到服务器

![](/Users/aresx/Documents/VulWiki/.resource/Eyoucms1.42后台插件getshell/media/rId25.png)

直接访问403，分析了下受.htaccess影响不能解析，在php文件目录增加该文件并删除php,重新上传该插件，即可解析

![](/Users/aresx/Documents/VulWiki/.resource/Eyoucms1.42后台插件getshell/media/rId26.png)

![](/Users/aresx/Documents/VulWiki/.resource/Eyoucms1.42后台插件getshell/media/rId27.png)
