Jizhicms 1.7.1 后台任意文件夹压缩下载
=====================================

一、漏洞简介
------------

二、漏洞影响
------------

Jizhicms 1.7.1

三、复现过程
------------

这个的漏洞触发同样位于CMS的插件部分,只需要替换filepath的值为要打包的文件夹即可打包网站下载![1.png](/Users/aresx/Documents/VulWiki/.resource/Jizhicms1.7.1后台任意文件夹压缩下载/media/rId24.png)根据url定位到漏洞位置，位于/A/c/PluginsController.php中的output函数，该函数主要是获取用户输入的文件名然后进行压缩在发送给客户端,还是这个frparam函数，由前文可知该函数没有对传入的参数进行过滤的话，从而导致了可以进行目录穿越，然后可以压缩不同的目录下载任意文件，条件只需要知道文件夹名字![2.png](/Users/aresx/Documents/VulWiki/.resource/Jizhicms1.7.1后台任意文件夹压缩下载/media/rId25.png)

参考链接
--------

> https://xz.aliyun.com/t/7775\#toc-3
