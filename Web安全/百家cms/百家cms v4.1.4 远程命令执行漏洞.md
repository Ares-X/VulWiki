百家cms v4.1.4 远程命令执行漏洞
===============================

一、漏洞简介
------------

二、漏洞影响
------------

百家cms v4.1.4

三、复现过程
------------

    # 需要后台权限
    http://www.0-sec.org/index.php?mod=site&act=weixin&do=setting&beid=1

首先需要在设置里将图片缩放打开

![](/Users/aresx/Documents/VulWiki/.resource/百家cmsv4.1.4远程命令执行漏洞/media/rId24.png)

本地创建`&命令&.txt`格式的文件

![](/Users/aresx/Documents/VulWiki/.resource/百家cmsv4.1.4远程命令执行漏洞/media/rId25.png)

访问payload，并进行上传

![](/Users/aresx/Documents/VulWiki/.resource/百家cmsv4.1.4远程命令执行漏洞/media/rId26.png)

命令执行

![](/Users/aresx/Documents/VulWiki/.resource/百家cmsv4.1.4远程命令执行漏洞/media/rId27.png)

参考链接
--------

> https://xz.aliyun.com/t/7542
