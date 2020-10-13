稻草人cms 1.1.5 安装过程信息泄露和getshell
==========================================

一、漏洞简介
------------

二、漏洞影响
------------

稻草人cms 1.1.5

三、复现过程
------------

安装时使用D盾来做文件监控，bp重新发包抓包。我们先看安装之后的：

![1.png](/Users/aresx/Documents/VulWiki/.resource/稻草人cms1.1.5安装过程信息泄露和getshell/media/rId24.png)这里看到txt文件，访问一下![2.png](/Users/aresx/Documents/VulWiki/.resource/稻草人cms1.1.5安装过程信息泄露和getshell/media/rId25.png)![3.png](/Users/aresx/Documents/VulWiki/.resource/稻草人cms1.1.5安装过程信息泄露和getshell/media/rId26.png)可以看到有敏感信息泄露而且通过D盾文件监控我们发现有配置文件的写入![4.png](/Users/aresx/Documents/VulWiki/.resource/稻草人cms1.1.5安装过程信息泄露和getshell/media/rId27.png)根据经验，我们测试一下内容可不可控，如果可控我们可以想办法写木马进去。经过测试，（这里正常回显不报错），

    tablepre=dcr_qy_';?><?php phpinfo()?>

![5.png](/Users/aresx/Documents/VulWiki/.resource/稻草人cms1.1.5安装过程信息泄露和getshell/media/rId28.png)![6.png](/Users/aresx/Documents/VulWiki/.resource/稻草人cms1.1.5安装过程信息泄露和getshell/media/rId29.png)成功写入\--我们去看一下源码：![7.png](/Users/aresx/Documents/VulWiki/.resource/稻草人cms1.1.5安装过程信息泄露和getshell/media/rId30.png)可以看到这里就是我们的写入点这里虽然引入了配置文件起到了过滤作用，但是并没有对我们写入做任何限制\--

    include "../include/common.func.php";
    include "../include/app.info.php";

参考链接
--------

> https://xz.aliyun.com/t/7904\#toc-1
