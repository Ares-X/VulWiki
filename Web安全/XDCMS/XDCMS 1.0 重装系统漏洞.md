XDCMS 1.0 重装系统漏洞
======================

一、漏洞简介
------------

需要知道db密码

二、漏洞影响
------------

XDCMS 1.0

三、复现过程
------------

漏洞文件：`install/index.php` ，`line：12`

![](/Users/aresx/Documents/VulWiki/.resource/XDCMS1.0重装系统漏洞/media/rId24.jpg)

造成重装漏洞是由于12-14行存在变量覆盖漏洞，可以将`$insLockfile`变量重置为0

让step=4执行安装数据库，提供其中需要的变量。dbhost dbname dbuser dbpass
dbpre dblang adminuser adminpwd 。构造

    http://www.0-sec.org/install/?insLockfile=xyz0sec

不过db的用户及口令还需要借助其他方法获得。

![](/Users/aresx/Documents/VulWiki/.resource/XDCMS1.0重装系统漏洞/media/rId25.jpg)
